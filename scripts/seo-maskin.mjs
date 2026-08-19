#!/usr/bin/env node
/* SEO-maskinen: leser Search Console for hver side i seo/sider.json, finner
 * det som er verdt å gjøre noe med, og skriver funnene til fil.
 *
 * Skriptet tar ingen beslutninger om tekst. Det leverer tall og rangerte
 * funn. Å skrive en ny title er språkarbeid, og det gjøres av den planlagte
 * oppgaven som leser seo/funn.json etterpå. Delingen er med vilje: tall skal
 * være deterministiske og etterprøvbare, formuleringer skal ikke.
 *
 * Bruk:
 *   node scripts/seo-maskin.mjs            # alle sider i sider.json
 *   node scripts/seo-maskin.mjs oppskalert # bare én, matcher på navn
 *
 * Ut:
 *   seo/funn.json      maskinlesbart, input til den planlagte oppgaven
 *   seo/funn.md        lesbart for mennesker
 *
 * FEM FELLER I GSC-APIET, alle funnet ved å gå i dem 19. august 2026.
 * Se SEO.md punkt 12. Ikke fjern noen av motgiftene under uten å lese den.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const KONFIG = path.join(ROOT, 'seo', 'sider.json');
const PERIODE_DAGER = 28;

/* ---------- oppsett ---------- */

const lesEnv = () => {
  const ut = {};
  for (const navn of ['.env.local', '.env']) {
    const fil = path.join(ROOT, navn);
    if (!fs.existsSync(fil)) continue;
    for (const linje of fs.readFileSync(fil, 'utf8').split('\n')) {
      const m = linje.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !(m[1] in ut)) ut[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return ut;
};

const env = lesEnv();
let token = null;

async function accessToken() {
  if (token) return token;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const d = await res.json();
  if (!res.ok) {
    throw new Error(
      d.error === 'invalid_grant'
        ? 'refresh-tokenet er utløpt. Kjør: npm run gsc auth'
        : `token: ${d.error_description || d.error}`
    );
  }
  token = d.access_token;
  return token;
}

async function api(sti, body) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3${sti}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const tekst = await res.text();
  if (!res.ok) throw new Error(`${res.status}: ${tekst.slice(0, 200)}`);
  return tekst ? JSON.parse(tekst) : {};
}

const iso = (d) => d.toISOString().slice(0, 10);
const periode = (fraDager, tilDager = 0) => ({
  startDate: iso(new Date(Date.now() - fraDager * 864e5)),
  endDate: iso(new Date(Date.now() - tilDager * 864e5)),
});

/* FELLE 1: rowLimit gir de FØRSTE radene, ikke de største. APIet sorterer på
   klikk, og på et nytt domene er alle klikk null, så rekkefølgen faller
   tilbake på alfabetisk. En rowLimit på 25 ga en tabell som stoppet ved «d».
   Paginer til det er tomt, sorter selv etterpå. */
async function hentAlt(eiendom, dimensjoner, per) {
  const rader = [];
  const side = 25000;
  for (let start = 0; ; start += side) {
    const d = await api(`/sites/${encodeURIComponent(eiendom)}/searchAnalytics/query`, {
      ...per,
      dimensions: dimensjoner,
      rowLimit: side,
      startRow: start,
      dataState: 'final',
    });
    const nye = d.rows || [];
    rader.push(...nye);
    if (nye.length < side) break;
  }
  return rader;
}

/* FELLE 2: totaler fra søkedata er feil. Google holder tilbake sjeldne søk av
   personvernhensyn, uten å si fra. Oppskalert.no har 7 klikk målt på «page»
   og 0 målt på «query»+«page». En spørring med TOM dimensions-array gir de
   ekte totalene i én rad. Trikset er lånt fra claude-seo (issue #130). */
async function ekteTotaler(eiendom, per) {
  const d = await api(`/sites/${encodeURIComponent(eiendom)}/searchAnalytics/query`, {
    ...per,
    dimensions: [],
    rowLimit: 1,
    dataState: 'final',
  });
  const r = (d.rows || [])[0];
  return r
    ? { klikk: r.clicks, visninger: r.impressions, ctr: r.ctr, posisjon: r.position }
    : { klikk: 0, visninger: 0, ctr: 0, posisjon: 0 };
}

/* ---------- analysene ---------- */

/* Forventet CTR per posisjon. Konservative tall, kun brukt til å rangere
   muligheter mot hverandre, aldri til å love noen et trafikktall. */
const FORVENTET_CTR = { 1: 0.28, 2: 0.15, 3: 0.1, 5: 0.06, 8: 0.03, 12: 0.015, 20: 0.005 };
const forventet = (pos) => {
  const nøkler = Object.keys(FORVENTET_CTR).map(Number).sort((a, b) => a - b);
  for (const k of nøkler) if (pos <= k) return FORVENTET_CTR[k];
  return 0.002;
};

const erMerkevare = (sok, merkevare = []) => {
  const s = sok.toLowerCase();
  return merkevare.some((m) => s.includes(m.toLowerCase()));
};

/* FELLE 3: merkevaresøk ser ut som kannibalisering, men er det ikke. Google
   viser med rette flere sider når noen søker på firmanavnet, det er normale
   sitelinks. Ekte kannibalisering krever at søket IKKE er merkevaren, og at
   selv den beste av sidene ligger dårligere enn posisjon 10. Uten begge
   filtrene flagget den første versjonen «steinar husby» og «guro brakestad»
   som problemer, altså ren støy. */
function finnKannibalisering(par, merkevare) {
  const perSok = new Map();
  for (const r of par) {
    const sok = r.keys[0];
    if (erMerkevare(sok, merkevare)) continue;
    if (!perSok.has(sok)) perSok.set(sok, []);
    perSok.get(sok).push(r);
  }
  const funn = [];
  for (const [sok, sider] of perSok) {
    if (sider.length < 2) continue;
    const sortert = [...sider].sort((a, b) => a.position - b.position);
    if (sortert[0].position <= 10) continue; // beste side klarer seg alt
    funn.push({
      sok,
      visninger: sider.reduce((s, r) => s + r.impressions, 0),
      sider: sortert.map((r) => ({ url: r.keys[1], posisjon: +r.position.toFixed(1), visninger: r.impressions })),
      spenn: +(sortert[sortert.length - 1].position - sortert[0].position).toFixed(1),
    });
  }
  return funn.sort((a, b) => b.visninger - a.visninger);
}

/* Nesten på førstesiden. Posisjon 5 til 20 er der arbeid gir mest igjen:
   nær nok til å flyttes, langt nok unna til å være usynlig i dag. */
function finnNaere(par, merkevare) {
  return par
    .filter((r) => !erMerkevare(r.keys[0], merkevare))
    .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 10)
    .map((r) => ({
      sok: r.keys[0],
      url: r.keys[1],
      visninger: r.impressions,
      posisjon: +r.position.toFixed(1),
      ctr: +(r.ctr * 100).toFixed(1),
      poeng: Math.round(r.impressions * Math.max(0, forventet(3) - r.ctr)),
    }))
    .sort((a, b) => b.poeng - a.poeng);
}

/* Forfall: sider som mistet klikk mot forrige periode. Krever et gulv, ellers
   blir 2 klikk til 1 klikk meldt som 50 % fall hver eneste uke. */
function finnForfall(naa, forrige) {
  const før = new Map(forrige.map((r) => [r.keys[0], r]));
  return naa
    .map((r) => {
      const f = før.get(r.keys[0]);
      if (!f || f.clicks < 5) return null;
      const endring = (r.clicks - f.clicks) / f.clicks;
      if (endring > -0.3) return null;
      return { url: r.keys[0], før: f.clicks, naa: r.clicks, endring: Math.round(endring * 100) };
    })
    .filter(Boolean)
    .sort((a, b) => a.endring - b.endring);
}

/* ---------- per side ---------- */

async function analyser(side) {
  /* FELLE 4: www og apex er to eiendommer med delte tall. Legg søsteren i
     «ogsaa», så summeres de her i stedet for å se ut som to svake nettsteder. */
  const eiendommer = [side.eiendom, ...(side.ogsaa || [])];
  const per = periode(PERIODE_DAGER);
  const perFør = periode(PERIODE_DAGER * 2, PERIODE_DAGER);

  const par = [];
  const sider = [];
  const siderFør = [];
  let totaler = { klikk: 0, visninger: 0, posisjon: 0 };

  for (const e of eiendommer) {
    par.push(...(await hentAlt(e, ['query', 'page'], per)));
    sider.push(...(await hentAlt(e, ['page'], per)));
    siderFør.push(...(await hentAlt(e, ['page'], perFør)));
    const t = await ekteTotaler(e, per);
    totaler.klikk += t.klikk;
    totaler.visninger += t.visninger;
    totaler.posisjon = t.posisjon || totaler.posisjon;
  }

  /* FELLE 5: at sitemap.xml svarer 200 betyr ikke at Google vet om den. To av
     ni eiendommer serverte gyldige sitemaps som aldri var sendt inn. */
  let sitemap = [];
  try {
    const d = await api(`/sites/${encodeURIComponent(side.eiendom)}/sitemaps`);
    sitemap = (d.sitemap || []).map((s) => ({
      sti: s.path,
      sistLest: (s.lastDownloaded || '').slice(0, 10) || null,
      urler: s.contents?.[0]?.submitted ?? null,
      feil: s.errors ?? 0,
    }));
  } catch { /* manglende tilgang skal ikke felle hele kjøringen */ }

  return {
    navn: side.navn,
    eiendom: side.eiendom,
    modus: side.modus,
    repo: side.repo || null,
    totaler,
    sitemapMangler: sitemap.length === 0,
    sitemapFeil: sitemap.filter((s) => s.feil > 0),
    kannibalisering: finnKannibalisering(par, side.merkevare),
    naere: finnNaere(par, side.merkevare).slice(0, 10),
    forfall: finnForfall(sider, siderFør),
  };
}

/* ---------- rapport ---------- */

const md = (alle) => {
  const l = [`# SEO-funn, ${iso(new Date())}`, '', `Siste ${PERIODE_DAGER} dager, målt mot Search Console.`, ''];
  for (const s of alle) {
    if (s.feil) { l.push(`## ${s.navn}`, '', `Feilet: ${s.feil}`, ''); continue; }
    l.push(`## ${s.navn} (${s.modus})`, '');
    l.push(`${s.totaler.klikk} klikk, ${s.totaler.visninger} visninger, snittposisjon ${s.totaler.posisjon.toFixed(1)}.`, '');
    if (s.sitemapMangler) l.push('- **Ingen sitemap sendt inn.**', '');
    if (s.sitemapFeil.length) l.push(`- **Sitemap med feil:** ${s.sitemapFeil.map((f) => f.sti).join(', ')}`, '');
    if (s.kannibalisering.length) {
      l.push('### Kannibalisering', '', '| Søk | Visninger | Sider |', '| --- | --- | --- |');
      for (const k of s.kannibalisering.slice(0, 5)) {
        l.push(`| ${k.sok} | ${k.visninger} | ${k.sider.map((x) => `${x.url.replace(/^https?:\/\/[^/]+/, '') || '/'} pos ${x.posisjon}`).join(' vs ')} |`);
      }
      l.push('');
    }
    if (s.naere.length) {
      l.push('### Nesten på førstesiden', '', '| Søk | Side | Visninger | Posisjon | Poeng |', '| --- | --- | --- | --- | --- |');
      for (const n of s.naere.slice(0, 5)) {
        l.push(`| ${n.sok} | ${n.url.replace(/^https?:\/\/[^/]+/, '') || '/'} | ${n.visninger} | ${n.posisjon} | ${n.poeng} |`);
      }
      l.push('');
    }
    if (s.forfall.length) {
      l.push('### Forfall', '');
      for (const f of s.forfall.slice(0, 5)) l.push(`- ${f.url.replace(/^https?:\/\/[^/]+/, '')}: ${f.før} til ${f.naa} klikk (${f.endring} %)`);
      l.push('');
    }
    if (!s.kannibalisering.length && !s.naere.length && !s.forfall.length && !s.sitemapMangler) {
      l.push('Ingenting å gjøre denne uken.', '');
    }
  }
  return l.join('\n');
};

/* ---------- kjør ---------- */

const konfig = JSON.parse(fs.readFileSync(KONFIG, 'utf8'));
const filter = process.argv[2]?.toLowerCase();
const valgte = konfig.sider
  .filter((s) => s.modus !== 'av')
  .filter((s) => !filter || s.navn.toLowerCase().includes(filter));

if (!valgte.length) {
  console.error(`Ingen sider matchet «${filter}». Velg blant: ${konfig.sider.map((s) => s.navn).join(', ')}`);
  process.exit(1);
}

const alle = [];
for (const side of valgte) {
  process.stdout.write(`${side.navn} ... `);
  try {
    const r = await analyser(side);
    alle.push(r);
    console.log(`${r.totaler.klikk} klikk, ${r.kannibalisering.length} kannibalisering, ${r.naere.length} nære`);
  } catch (err) {
    alle.push({ navn: side.navn, eiendom: side.eiendom, modus: side.modus, feil: err.message });
    console.log(`feilet: ${err.message}`);
  }
}

fs.mkdirSync(path.join(ROOT, 'seo'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'seo', 'funn.json'), JSON.stringify({ dato: iso(new Date()), dager: PERIODE_DAGER, sider: alle }, null, 2));
fs.writeFileSync(path.join(ROOT, 'seo', 'funn.md'), md(alle));
console.log(`\nseo/funn.json og seo/funn.md skrevet for ${alle.length} sider.`);
