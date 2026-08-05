import { createClient } from '@supabase/supabase-js';
import { spamGrunnForLagretRad } from '../_lib/spam.js';

// Samme Supabase-prosjekt som analytics_events skrives til fra klienten,
// men her brukes service-role-nøkkelen (kun server-side) for å kunne lese
// tilbake det anon-nøkkelen bevisst ikke får lov til å se.
const SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';

// PostHog-prosjektet er ikke hemmelig (VITE_POSTHOG_TOKEN er allerede
// offentlig i klienten), men POSTHOG_API_KEY (en personal API key) er det,
// og hentes derfor kun server-side her.
const POSTHOG_PROJECT_ID = '239572';
const POSTHOG_HOST = 'https://eu.posthog.com';

// Alt som ikke kommer fra produksjonsdomenet holdes utenfor tallene:
// prerenderen kjørte tidligere mot 127.0.0.1 (rettet i lib/posthog.js, men
// historikken ligger der), og preview-deployer på *.vercel.app er deg selv
// som tester. Endres domenet må dette følge med, ellers blir alle tall null.
const PRODUKSJONSVERT = "properties.$host LIKE '%oppskalert.no'";

// /admin/* er ditt eget dashbord, og hendelsene derfra må ut av HELE
// settet, ikke bare av sidevisningene. Ellers teller klikk på PIN-knappen
// som engasjement og tiden du sitter i dashbordet som lesetid.
const IKKE_ADMIN = "NOT startsWith(coalesce(properties.$pathname, '/'), '/admin')";

// Bare du har PIN-en, så enhver nettleser som har åpnet /admin er deg. Det
// er det eneste sikre eier-signalet vi har, og det er verdt mye: én eneste
// distinct_id sto for 190 av hendelsene i måleperioden. Uten dette filteret
// er dashbordet i praksis et speil.
const IKKE_EIER = `distinct_id NOT IN (
  SELECT distinct_id FROM events
  WHERE event = '$pageview' AND startsWith(coalesce(properties.$pathname, '/'), '/admin')
    AND timestamp > now() - INTERVAL 180 DAY
)`;

const TILLATTE_PERIODER = [7, 30, 90];

// Terskelen for at en økt teller som et menneske: over ett minutt, eller
// klikk kombinert med mer enn én side.
//
// Målt på ekte data 5. august. En ren tidsterskel på 10 sekunder slapp
// gjennom 61 av 86 økter og var ubrukelig, fordi posthog-js fortsetter å
// sende $web_vitals i cirka 30 sekunder etter innlasting. Skannerøkter ser
// derfor ut som 28 til 44 sekunder, ikke som null.
//
// Klikk alene holder heller ikke: fire økter klikket seg gjennom samtlige
// valgknapper i demo-skjemaet på under 45 sekunder, på én side, uten å
// navigere. To av dem kom fra Dublin og Amsterdam. Det er en skanner som
// trykker på alt den finner i DOM-en, ikke et menneske som velger. Derfor
// kreves navigasjon i tillegg til klikk.
//
// Etter begge reglene overlever bare norske økter, og alle ser ut som ekte
// forløp.
const ENGASJERT_SEKUNDER = 60;
const erEngasjert = (sider, sekunder, klikk) =>
  sekunder >= ENGASJERT_SEKUNDER || (klikk > 0 && sider > 1);

// Rekkefølgen betyr noe: gemini.google.com må fanges som AI-søk før
// google-regelen tar den som vanlig søk.
const KILDEREGLER = [
  { treff: /(^|\.)(chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com|gemini\.google\.com)$/, navn: 'AI-søk' },
  { treff: /(^|\.)google\./, navn: 'Google-søk' },
  { treff: /(^|\.)(bing\.com|duckduckgo\.com|ecosia\.org|kvasir\.no|yahoo\.)/, navn: 'Annet søk' },
  { treff: /(^|\.)(linkedin\.com|lnkd\.in|facebook\.com|instagram\.com|x\.com|t\.co)$/, navn: 'Sosiale medier' },
];

const kategoriserKilde = (utm, ref) => {
  const tagget = (utm || '').trim();
  if (tagget) {
    if (/signatur/i.test(tagget)) return 'E-postsignatur';
    if (/kald.?e-?post/i.test(tagget)) return 'Kald e-post';
    return tagget;
  }
  const domene = (ref || '').trim().toLowerCase();
  if (!domene || domene === '$direct') return 'Direkte';
  return KILDEREGLER.find((r) => r.treff.test(domene))?.navn || domene;
};

// Feil som ikke er dine å fikse. De skjules bak en knapp i stedet for å
// slettes, så du fortsatt kan se dem hvis et mønster endrer seg.
const STOYMONSTRE = [
  {
    treff: /Object Not Found Matching Id|MethodName:update/i,
    hvorfor: 'Injisert av Microsoft Outlook sin lenkeskanner, ikke av koden din.',
  },
  {
    treff: /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i,
    hvorfor: 'Gammel fane åpen under en deploy. Siden laster seg selv på nytt nå (se main.jsx).',
  },
  {
    treff: /was released because another request stole it|lock broken by another request|NavigatorLockAcquireTimeout/i,
    hvorfor: 'Supabase-auth som kolliderte mellom faner. Fikset med persistSession: false.',
  },
  {
    treff: /ResizeObserver loop/i,
    hvorfor: 'Kjent nettleserstøy uten synlig effekt for brukeren.',
  },
  {
    treff: /^Script error\.?$/i,
    hvorfor: 'Feil i et skript fra et annet domene, som regel en nettleserutvidelse.',
  },
];

const klassifiser = (melding, type) => {
  const tekst = `${type || ''} ${melding || ''}`;
  return STOYMONSTRE.find((m) => m.treff.test(tekst)) || null;
};

async function posthogSporring(query, merkelapp) {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
    });
    if (!res.ok) {
      console.error(`dashboard-data: ${merkelapp} feilet`, res.status, await res.text());
      return null;
    }
    const { results } = await res.json();
    return results || [];
  } catch (err) {
    console.error(`dashboard-data: ${merkelapp} feilet`, err);
    return null;
  }
}

// Aggregeres per økt, ikke per sidevisning, fordi det er på øktnivå det er
// mulig å skille et menneske fra en e-postskanner: varighet og klikk gir
// bare mening for en økt. Hver rad er én økt, med kilden og landingssiden
// fra dens første sidevisning. Volumet er under hundre økter i måneden, så
// det er billigere enn en haug med uniq-kall. Grensen er en
// sikkerhetsventil, ikke en forventet mengde.
async function hentSesjoner(dager) {
  const rader = await posthogSporring(
    `
    SELECT
      if(min(timestamp) >= now() - INTERVAL ${dager} DAY, 'na', 'forrige') AS periode,
      toDate(min(timestamp)) AS dag,
      any(distinct_id) AS person,
      countIf(event = '$pageview') AS sider,
      dateDiff('second', min(timestamp), max(timestamp)) AS sekunder,
      countIf(event IN ('$autocapture', '$rageclick')) AS klikk,
      argMinIf(properties.utm_source, timestamp, event = '$pageview') AS utm,
      argMinIf(properties.$referring_domain, timestamp, event = '$pageview') AS ref,
      argMinIf(properties.$pathname, timestamp, event = '$pageview') AS landing
    FROM events
    WHERE timestamp > now() - INTERVAL ${dager * 2} DAY
      AND ${PRODUKSJONSVERT}
      AND properties.$session_id IS NOT NULL
      AND ${IKKE_ADMIN}
      AND ${IKKE_EIER}
    GROUP BY properties.$session_id
    HAVING sider > 0
    LIMIT 50000
    `,
    'sesjons-spørring',
  );
  if (!rader) return null;

  const tomKilde = () => ({ okter: 0, engasjerteOkter: 0, visninger: 0, personer: new Set() });
  const tomSide = () => ({ visninger: 0, personer: new Set() });

  const na = {
    visninger: 0,
    alle: new Set(),
    engasjerte: new Set(),
    perDag: new Map(),
    perKilde: new Map(),
    perSti: new Map(),
  };
  const forrige = { visninger: 0, alle: new Set(), engasjerte: new Set() };

  for (const [periode, dag, person, sider, sekunder, klikk, utm, ref, landing] of rader) {
    const engasjert = erEngasjert(sider, sekunder, klikk);
    const bunke = periode === 'na' ? na : forrige;

    bunke.visninger += sider;
    bunke.alle.add(person);
    if (engasjert) bunke.engasjerte.add(person);
    if (periode !== 'na') continue;

    if (!na.perDag.has(dag)) na.perDag.set(dag, { visninger: 0, personer: new Set() });
    const dagCelle = na.perDag.get(dag);
    dagCelle.visninger += sider;
    if (engasjert) dagCelle.personer.add(person);

    const kilde = kategoriserKilde(utm, ref);
    if (!na.perKilde.has(kilde)) na.perKilde.set(kilde, tomKilde());
    const kildeCelle = na.perKilde.get(kilde);
    kildeCelle.okter += 1;
    kildeCelle.visninger += sider;
    if (engasjert) {
      kildeCelle.engasjerteOkter += 1;
      kildeCelle.personer.add(person);
    }

    // Landingssiden, ikke alle sider i økten: spørsmålet er hvor folk kommer
    // inn, og bare den første sidevisningen er hentet ut per økt.
    if (landing) {
      if (!na.perSti.has(landing)) na.perSti.set(landing, tomSide());
      const stiCelle = na.perSti.get(landing);
      stiCelle.visninger += 1;
      if (engasjert) stiCelle.personer.add(person);
    }
  }

  return {
    sidevisninger: { na: na.visninger, forrige: forrige.visninger },
    besokende: { na: na.alle.size, forrige: forrige.alle.size },
    engasjerte: { na: na.engasjerte.size, forrige: forrige.engasjerte.size },
    dager: [...na.perDag.entries()]
      .map(([dato, v]) => ({ dato, visninger: v.visninger, personer: v.personer.size }))
      .sort((a, b) => a.dato.localeCompare(b.dato)),
    kilder: [...na.perKilde.entries()]
      .map(([kilde, v]) => ({
        kilde,
        personer: v.personer.size,
        okter: v.okter,
        engasjerteOkter: v.engasjerteOkter,
        visninger: v.visninger,
      }))
      .sort((a, b) => b.personer - a.personer || b.okter - a.okter),
    sider: [...na.perSti.entries()]
      .map(([sti, v]) => ({ sti, visninger: v.visninger, personer: v.personer.size }))
      .sort((a, b) => b.personer - a.personer || b.visninger - a.visninger),
  };
}

// Én rad per ekte besøk, med hvor de er fra, hvilken vei de gikk, og hva de
// trykket på. Klikketekstene kommer fra $autocapture sin elements_chain, så
// «Booking-løsning» og «Bestill gratis demo» leses rett av uten at noe måtte
// instrumenteres i koden.
//
// groupArray har ingen garantert rekkefølge i ClickHouse, derfor sorteres
// stiene eksplisitt på tidsstempel. Uten det blir «veien» tilfeldig stokket.
async function hentBesokende(dager) {
  const rader = await posthogSporring(
    `
    SELECT
      min(timestamp) AS start,
      argMinIf(properties.$geoip_city_name, timestamp, event = '$pageview') AS by,
      argMinIf(properties.$geoip_country_name, timestamp, event = '$pageview') AS land,
      argMinIf(properties.$device_type, timestamp, event = '$pageview') AS enhet,
      argMinIf(properties.utm_source, timestamp, event = '$pageview') AS utm,
      argMinIf(properties.$referring_domain, timestamp, event = '$pageview') AS ref,
      countIf(event = '$pageview') AS sider,
      dateDiff('second', min(timestamp), max(timestamp)) AS sekunder,
      countIf(event IN ('$autocapture', '$rageclick')) AS klikk,
      arrayMap(x -> x.2, arraySort(x -> x.1, groupArrayIf((timestamp, properties.$pathname), event = '$pageview'))) AS stier,
      arrayDistinct(arrayFlatten(groupArrayIf(elements_chain_texts, event = '$autocapture'))) AS klikket
    FROM events
    WHERE timestamp > now() - INTERVAL ${dager} DAY
      AND ${PRODUKSJONSVERT}
      AND properties.$session_id IS NOT NULL
      AND ${IKKE_ADMIN}
      AND ${IKKE_EIER}
    GROUP BY properties.$session_id
    HAVING sider > 0
    ORDER BY start DESC
    LIMIT 200
    `,
    'besøks-spørring',
  );
  if (!rader) return null;

  return rader
    .filter(([, , , , , , sider, sekunder, klikk]) => erEngasjert(sider, sekunder, klikk))
    .slice(0, 25)
    .map(([start, by, land, enhet, utm, ref, , sekunder, klikk, stier, klikket]) => ({
      start,
      sted: [by, land].filter(Boolean).join(', ') || 'ukjent sted',
      enhet,
      sekunder,
      klikk,
      kilde: kategoriserKilde(utm, ref),
      // En SPA rendrer forsiden flere ganger i samme økt, så «/ → / → /»
      // er én side sett tre ganger, ikke tre steg. Slås sammen med teller.
      vei: (stier || []).reduce((ut, sti) => {
        const siste = ut[ut.length - 1];
        if (siste && siste.sti === sti) siste.ganger += 1;
        else ut.push({ sti, ganger: 1 });
        return ut;
      }, []),
      klikket: (klikket || []).map((t) => (t || '').trim()).filter(Boolean).slice(0, 8),
    }));
}

// posthog-js sin exception-autocapture (capture_exceptions: true i
// lib/posthog.js) skriver til $exception med $exception_list, en liste av
// {type, value, ...}. $current_url og $browser er det som gjør en feil mulig
// å reprodusere, og antall unike rammede skiller «én person med en rar
// utvidelse» fra «alle som trykker på knappen».
async function hentFeil(dager) {
  const rader = await posthogSporring(
    `
    SELECT
      properties.$exception_list[1].type AS type,
      properties.$exception_list[1].value AS melding,
      count() AS antall,
      uniq(distinct_id) AS rammede,
      min(timestamp) AS forst,
      max(timestamp) AS sist,
      argMax(properties.$current_url, timestamp) AS url,
      argMax(properties.$browser, timestamp) AS nettleser,
      argMax(properties.$os, timestamp) AS os
    FROM events
    WHERE event = '$exception'
      AND timestamp > now() - INTERVAL ${dager} DAY
      AND ${PRODUKSJONSVERT}
    GROUP BY type, melding
    ORDER BY antall DESC
    LIMIT 40
    `,
    'feil-spørring',
  );
  if (!rader) return null;

  const ekte = [];
  const stoy = [];
  for (const [type, melding, antall, rammede, forst, sist, url, nettleser, os] of rader) {
    const kjent = klassifiser(melding, type);
    const feil = { type, melding, antall, rammede, forst, sist, url, nettleser, os };
    if (kjent) stoy.push({ ...feil, hvorfor: kjent.hvorfor });
    else ekte.push(feil);
  }
  return { ekte, stoy };
}

// Alle track()-kall går også til PostHog (se lib/analytics.js), så hele
// veien fram til en henvendelse kan telles på samme distinct_id som
// sidevisningene. Kalkulatoren er en sidevei og ikke et obligatorisk steg,
// så tallene er «hvor mange gjorde dette», ikke en streng sekvens.
async function hentTrakt(dager) {
  const rader = await posthogSporring(
    `
    SELECT
      multiIf(
        event = '$pageview', 'besok',
        startsWith(event, 'kalkulator_'), 'kalkulator',
        event = 'demo_form_steg1_fullfort', 'steg1',
        event = 'demo_request_submitted', 'sendt',
        'annet'
      ) AS steg,
      uniq(distinct_id) AS personer
    FROM events
    WHERE timestamp > now() - INTERVAL ${dager} DAY
      AND ${PRODUKSJONSVERT}
      AND (
        (event = '$pageview' AND ${IKKE_ADMIN})
        OR startsWith(event, 'kalkulator_')
        OR event IN ('demo_form_steg1_fullfort', 'demo_request_submitted')
      )
    GROUP BY steg
    `,
    'trakt-spørring',
  );
  if (!rader) return null;

  const personer = Object.fromEntries(rader.map(([steg, antall]) => [steg, antall]));
  const besok = personer.besok || 0;
  const steg = [
    { navn: 'Besøkte siden', personer: besok },
    { navn: 'Brukte priskalkulatoren', personer: personer.kalkulator || 0 },
    // Navnet må stemme med FRAFALL_ETTER i DashboardPage.jsx, som bruker
    // det til å avgjøre hvor et frafallstall faktisk gir mening.
    { navn: 'Åpnet skjemaet', personer: personer.steg1 || 0 },
    { navn: 'Sendte inn forespørsel', personer: personer.sendt || 0 },
  ];
  return steg.map((s) => ({ ...s, andel: besok ? s.personer / besok : 0 }));
}

export default async function handler(req, res) {
  const expectedPin = process.env.DASHBOARD_PIN;
  if (!expectedPin) {
    res.status(500).json({ error: 'DASHBOARD_PIN er ikke satt' });
    return;
  }

  const pin = req.headers['x-dashboard-pin'];
  if (pin !== expectedPin) {
    res.status(401).json({ error: 'Feil PIN' });
    return;
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY er ikke satt' });
    return;
  }

  const onsket = Number(req.query?.dager);
  const dager = TILLATTE_PERIODER.includes(onsket) ? onsket : 30;

  const supabase = createClient(SUPABASE_URL, serviceKey);

  const fra = new Date(Date.now() - dager * 86400000);
  const fraForrige = new Date(Date.now() - dager * 2 * 86400000);

  // Leads leses kun her, med service-role-nøkkelen. Anon-rollen har ingen
  // SELECT-policy på tabellen (og siden api/demo-request.js overtok
  // skrivingen, heller ingen INSERT), så dette er eneste sted innsendte
  // skjema kan leses tilbake fra.
  const { data: leadsData, error: leadsError } = await supabase
    .from('demo_foresporsler')
    .select('id, navn, epost, firma, melding, status, spam_grunn, created_at')
    .gte('created_at', fraForrige.toISOString())
    .order('created_at', { ascending: false })
    .limit(200);

  if (leadsError) {
    console.error('dashboard-data: kunne ikke hente leads', leadsError);
  }

  // Skrevet av en ukentlig cloud-agent (se /reports i repoet for historikk
  // og den fulle rapporten som markdown).
  const { data: reportsData, error: reportsError } = await supabase
    .from('weekly_reports')
    .select('id, week_start, week_end, summary, report_markdown, stats, created_at')
    .order('week_start', { ascending: false })
    .limit(12);

  if (reportsError) {
    console.error('dashboard-data: kunne ikke hente ukentlige rapporter', reportsError);
  }

  // Rader som kom inn før anon-INSERT ble stengt har status 'ny' selv om de
  // åpenbart er bot-innsendinger. Backfillen i migrasjonen tok de kjente,
  // men vurderingen kjøres også her, så alt som slapp inn i mellomtiden
  // havner riktig sted uten en ny migrering.
  const alleLeads = (leadsData || []).map((l) => {
    const grunn = l.status === 'spam' ? l.spam_grunn || 'merket som spam' : spamGrunnForLagretRad(l);
    return { ...l, erSpam: Boolean(grunn), spamGrunn: grunn };
  });

  const iPerioden = (l) => new Date(l.created_at) >= fra;
  const ekteLeads = alleLeads.filter((l) => !l.erSpam);
  const spamLeads = alleLeads.filter((l) => l.erSpam && iPerioden(l));

  const [trafikk, feil, trakt, besokende] = await Promise.all([
    hentSesjoner(dager),
    hentFeil(dager),
    hentTrakt(dager),
    hentBesokende(dager),
  ]);

  // Trakten må måle mot samme nevner som «Ekte besøkende» over. Ellers står
  // det at 1 av 71 brukte kalkulatoren, altså 1 %, når sannheten er 1 av 7
  // mennesker. De 64 andre var skannere som aldri kunne blitt en henvendelse.
  // Stegene under toppen teller allerede bare folk som gjorde noe aktivt, så
  // bare nevneren trenger å byttes.
  const traktMotEngasjerte = (steg, engasjerte) => {
    if (!steg?.length || !engasjerte) return steg;
    return steg.map((s, i) =>
      i === 0
        ? { ...s, personer: engasjerte, andel: 1 }
        : { ...s, andel: Math.min(1, s.personer / engasjerte) },
    );
  };

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    periode: { dager, engasjertSekunder: ENGASJERT_SEKUNDER },
    // null betyr «PostHog svarte ikke», og vises som et eget varsel i
    // dashbordet i stedet for å bli tegnet som en null.
    posthogTilgjengelig: trafikk !== null,
    sidevisninger: trafikk?.sidevisninger ?? null,
    besokende: trafikk?.besokende ?? null,
    engasjerte: trafikk?.engasjerte ?? null,
    henvendelser: {
      na: ekteLeads.filter(iPerioden).length,
      forrige: ekteLeads.filter((l) => !iPerioden(l)).length,
    },
    dager: trafikk?.dager ?? [],
    kilder: trafikk?.kilder ?? [],
    sider: trafikk?.sider ?? [],
    besokende_liste: besokende ?? [],
    trakt: traktMotEngasjerte(trakt, trafikk?.engasjerte?.na) ?? [],
    feil: feil ?? { ekte: [], stoy: [] },
    leads: ekteLeads.filter(iPerioden),
    spam: spamLeads,
    rapporter: reportsData || [],
  });
}
