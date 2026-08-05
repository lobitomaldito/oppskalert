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
// prerenderen kjørte tidligere mot 127.0.0.1 og la igjen 25 sidevisninger
// per bygg (rettet i lib/posthog.js, men historikken ligger der), og
// preview-deployer på *.vercel.app er deg selv som tester, ikke besøkende.
// Endres domenet må dette følge med, ellers blir alle tall null.
const PRODUKSJONSVERT = "properties.$host LIKE '%oppskalert.no'";

// /admin/* er ditt eget dashbord. Det lå på åttendeplass over mest besøkte
// sider, som er et selvportrett, ikke innsikt.
const IKKE_ADMIN = "(properties.$pathname IS NULL OR NOT startsWith(properties.$pathname, '/admin'))";

const TILLATTE_PERIODER = [7, 30, 90];

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

// Rådene hentes ut per hendelse i stedet for ferdig aggregert, fordi hver
// bøtte (dag, kilde, sti) også skal ha unike besøkende, og det krever at
// samme distinct_id kan telles i flere bøtter samtidig. Volumet er noen
// hundre rader i måneden, så det er billigere enn seks separate uniq-kall.
// Grensen er en sikkerhetsventil, ikke en forventet mengde.
async function hentTrafikk(dager) {
  const rader = await posthogSporring(
    `
    SELECT
      if(timestamp >= now() - INTERVAL ${dager} DAY, 'na', 'forrige') AS periode,
      toDate(timestamp) AS dag,
      multiIf(
        properties.utm_source IS NOT NULL AND properties.utm_source != '', properties.utm_source,
        properties.$referring_domain IS NOT NULL AND properties.$referring_domain != '' AND properties.$referring_domain != '$direct', properties.$referring_domain,
        'direkte'
      ) AS kilde,
      properties.$pathname AS sti,
      distinct_id
    FROM events
    WHERE event = '$pageview'
      AND timestamp > now() - INTERVAL ${dager * 2} DAY
      AND ${PRODUKSJONSVERT}
      AND ${IKKE_ADMIN}
    LIMIT 50000
    `,
    'trafikk-spørring',
  );
  if (!rader) return null;

  const tom = () => ({ visninger: 0, besokende: new Set() });
  const na = { total: tom(), perDag: new Map(), perKilde: new Map(), perSti: new Map() };
  const forrige = { total: tom() };

  for (const [periode, dag, kilde, sti, distinctId] of rader) {
    const bunke = periode === 'na' ? na : forrige;
    bunke.total.visninger += 1;
    bunke.total.besokende.add(distinctId);
    if (periode !== 'na') continue;

    for (const [kart, nokkel] of [[na.perDag, dag], [na.perKilde, kilde], [na.perSti, sti]]) {
      if (nokkel === null || nokkel === undefined) continue;
      if (!kart.has(nokkel)) kart.set(nokkel, tom());
      const celle = kart.get(nokkel);
      celle.visninger += 1;
      celle.besokende.add(distinctId);
    }
  }

  const listeAv = (kart, navn) =>
    [...kart.entries()]
      .map(([nokkel, v]) => ({ [navn]: nokkel, visninger: v.visninger, besokende: v.besokende.size }))
      .sort((a, b) => b.visninger - a.visninger);

  return {
    sidevisninger: { na: na.total.visninger, forrige: forrige.total.visninger },
    besokende: { na: na.total.besokende.size, forrige: forrige.total.besokende.size },
    dager: [...na.perDag.entries()]
      .map(([dato, v]) => ({ dato, visninger: v.visninger, besokende: v.besokende.size }))
      .sort((a, b) => a.dato.localeCompare(b.dato)),
    kilder: listeAv(na.perKilde, 'kilde'),
    sider: listeAv(na.perSti, 'sti'),
  };
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

  const [trafikk, feil, trakt] = await Promise.all([
    hentTrafikk(dager),
    hentFeil(dager),
    hentTrakt(dager),
  ]);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    periode: { dager },
    // null betyr «PostHog svarte ikke», og vises som et eget varsel i
    // dashbordet i stedet for å bli tegnet som en null.
    posthogTilgjengelig: trafikk !== null,
    sidevisninger: trafikk?.sidevisninger ?? null,
    besokende: trafikk?.besokende ?? null,
    henvendelser: {
      na: ekteLeads.filter(iPerioden).length,
      forrige: ekteLeads.filter((l) => !iPerioden(l)).length,
    },
    dager: trafikk?.dager ?? [],
    kilder: trafikk?.kilder ?? [],
    sider: trafikk?.sider ?? [],
    trakt: trakt ?? [],
    feil: feil ?? { ekte: [], stoy: [] },
    leads: ekteLeads.filter(iPerioden),
    spam: spamLeads,
    rapporter: reportsData || [],
  });
}
