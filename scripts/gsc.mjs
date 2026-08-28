#!/usr/bin/env node
/* Google Search Console fra kommandolinjen.
 *
 * Hva den er til: lese ytelsestall uten å klikke rundt i grensesnittet, og
 * gjøre oppsettet for en ny kundeside til ett kall i stedet for et kvarter
 * med skjemaer.
 *
 * Hva den IKKE kan: be Google indeksere en vanlig side. Indexing API-en er
 * offisielt begrenset til JobPosting og BroadcastEvent, og å bruke den til
 * vanlige sider er utenfor det Google tillater. Sitemapen er den støttede
 * veien, og den sendes inn herfra.
 *
 * Engangsoppsett, se README-blokken nederst i filen:
 *   1. Google Cloud-prosjekt med Search Console API + Site Verification API
 *   2. OAuth-klient av typen «Desktop app»
 *   3. Legg client id og secret i .env.local
 *   4. node scripts/gsc.mjs auth      (åpner nettleseren én gang)
 *
 * Bruk:
 *   node scripts/gsc.mjs sok [dager]      # søkene du vises på
 *   node scripts/gsc.mjs sider [dager]    # sidene som får trafikk
 *   node scripts/gsc.mjs klynge <ord> [dager]  # hvilken side eier hvert søk
 *   node scripts/gsc.mjs sitemap          # status på innsendte sitemaps
 *   node scripts/gsc.mjs sitemap:send     # send inn sitemap.xml på nytt
 *   node scripts/gsc.mjs sjekk <url>      # er URL-en indeksert?
 *   node scripts/gsc.mjs sider-liste      # alle eiendommer du har tilgang til
 *   node scripts/gsc.mjs legg-til <url>   # legg til en ny eiendom
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENV = path.join(ROOT, '.env.local');
const argv = process.argv.slice(2);
const sideFlagg = argv.indexOf('--side');
const SITE = sideFlagg !== -1 ? argv.splice(sideFlagg, 2)[1] : 'https://oppskalert.no/';

/* webmasters gir lese OG skrive (sitemap-innsending, legge til eiendom).
   siteverification trengs først når vi skal verifisere kundesider herfra. */
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/siteverification',
  /* Analytics Data API er skrivebeskyttet her. Uten dette svarer
     analyticsadmin og analyticsdata 403 ACCESS_TOKEN_SCOPE_INSUFFICIENT,
     selv om tokenet er ferskt. Legger du til et scope, må `npm run gsc auth`
     kjøres på nytt: eksisterende refresh-token bærer bare de gamle. */
  'https://www.googleapis.com/auth/analytics.readonly',
].join(' ');

/* ---------- .env.local ---------- */

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

const skrivEnv = (nøkkel, verdi) => {
  let s = fs.existsSync(ENV) ? fs.readFileSync(ENV, 'utf8') : '';
  const re = new RegExp(`^${nøkkel}=.*$`, 'm');
  if (re.test(s)) s = s.replace(re, `${nøkkel}=${verdi}`);
  else s += `${s && !s.endsWith('\n') ? '\n' : ''}${nøkkel}=${verdi}\n`;
  fs.writeFileSync(ENV, s);
};

const env = lesEnv();
const CLIENT_ID = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    'Mangler GOOGLE_CLIENT_ID og GOOGLE_CLIENT_SECRET i .env.local.\n' +
      'Se oppsettet øverst i scripts/gsc.mjs. Filen er dekket av .gitignore.'
  );
  process.exit(1);
}

/* ---------- OAuth ---------- */

async function byttToken(params) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, ...params }),
  });
  const d = await res.json();
  if (!res.ok) {
    /* invalid_grant betyr nesten alltid at refresh-tokenet er utløpt. Det
       skjer automatisk etter sju dager så lenge OAuth-appen står i
       «Testing» i Google Cloud. Sett den til «In production» for å slippe. */
    if (d.error === 'invalid_grant') {
      throw new Error(
        'refresh-tokenet er utløpt eller trukket tilbake.\n' +
          '  Kjør: npm run gsc auth\n' +
          '  Skjer dette hver uke, står OAuth-appen i «Testing» i Google Cloud.\n' +
          '  Sett publiseringsstatus til «In production», så varer tokenet.'
      );
    }
    throw new Error(`token: ${d.error_description || d.error || res.status}`);
  }
  return d;
}

/* Engangsflyt. Google tillater loopback-redirect på vilkårlig port for
   klienttypen «Desktop app», så vi slipper å registrere en fast URL. */
async function auth() {
  const server = http.createServer();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const redirect = `http://127.0.0.1:${port}`;

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirect,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent', // tvinger fram refresh_token også ved ny godkjenning
  }).toString();

  console.log('\nÅpne denne i nettleseren og godkjenn:\n');
  console.log(url.toString());
  console.log('\nVenter ...');

  const kode = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('tidsavbrudd etter 5 minutter')), 300000);
    server.on('request', (req, res) => {
      const q = new URL(req.url, redirect).searchParams;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        q.get('code')
          ? '<h1>Ferdig</h1><p>Du kan lukke denne fanen.</p>'
          : `<h1>Feil</h1><p>${q.get('error') || 'ukjent'}</p>`
      );
      clearTimeout(timer);
      q.get('code') ? resolve(q.get('code')) : reject(new Error(q.get('error') || 'ingen kode'));
    });
  }).finally(() => server.close());

  const d = await byttToken({ code: kode, redirect_uri: redirect, grant_type: 'authorization_code' });
  if (!d.refresh_token) throw new Error('fikk ingen refresh_token, prøv på nytt');
  skrivEnv('GOOGLE_REFRESH_TOKEN', d.refresh_token);
  console.log('\nrefresh_token lagret i .env.local. Du trenger ikke gjøre dette igjen.');
}

let cachetToken = null;
async function accessToken() {
  if (cachetToken) return cachetToken;
  const rt = lesEnv().GOOGLE_REFRESH_TOKEN;
  if (!rt) {
    console.error('Ingen GOOGLE_REFRESH_TOKEN. Kjør: node scripts/gsc.mjs auth');
    process.exit(1);
  }
  const d = await byttToken({ refresh_token: rt, grant_type: 'refresh_token' });
  cachetToken = d.access_token;
  return cachetToken;
}

async function api(sti, { metode = 'GET', body, base = 'https://www.googleapis.com/webmasters/v3' } = {}) {
  const res = await fetch(`${base}${sti}`, {
    method: metode,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const tekst = await res.text();
  if (!res.ok) throw new Error(`${res.status}: ${tekst.slice(0, 300)}`);
  return tekst ? JSON.parse(tekst) : {};
}

/* ---------- utskrift ---------- */

const tabell = (rader) => {
  if (!rader.length) return console.log('  (ingen data ennå)');
  const kol = Object.keys(rader[0]);
  const bredde = kol.map((k) => Math.max(k.length, ...rader.map((r) => String(r[k] ?? '').length)));
  const linje = (v) => '  ' + v.map((s, i) => String(s ?? '').padEnd(bredde[i])).join('  ');
  console.log(linje(kol));
  rader.forEach((r) => console.log(linje(kol.map((k) => r[k]))));
};

const iso = (d) => d.toISOString().slice(0, 10);
const periode = (dager) => {
  const slutt = new Date();
  const start = new Date(slutt.getTime() - dager * 864e5);
  return { startDate: iso(start), endDate: iso(slutt) };
};

/* rowLimit 25 gir de 25 FORSTE radene, ikke de storste. APIet sorterer paa
   klikk, og med et nytt domene er alle klikk null, saa rekkefolgen faller
   tilbake paa alfabetisk. Hent bredt og sorter paa visninger her i stedet. */
async function ytelse(dimensjon, dager, antall = 25) {
  const d = await api(`/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    metode: 'POST',
    body: { ...periode(dager), dimensions: [dimensjon], rowLimit: 5000 },
  });
  const rader = (d.rows || []).sort((a, b) => b.impressions - a.impressions).slice(0, antall);
  return rader.map((r) => ({
    [dimensjon === 'query' ? 'søk' : 'side']: r.keys[0].replace('https://oppskalert.no', '') || '/',
    klikk: r.clicks,
    visninger: r.impressions,
    ctr: (r.ctr * 100).toFixed(1) + ' %',
    posisjon: r.position.toFixed(1),
  }));
}

/* ---------- kommandoer ---------- */

const kommandoer = {
  auth,

  async sok([dager = '28']) {
    console.log(`  siste ${dager} dager\n`);
    tabell(await ytelse('query', Number(dager)));
  },

  async sider([dager = '28']) {
    console.log(`  siste ${dager} dager\n`);
    tabell(await ytelse('page', Number(dager)));
  },

  /* Krysser søk mot side. `sok` og `sider` hver for seg skjuler den vanligste
     og dyreste feilen vi har: at flere av våre egne sider byr på det samme
     søket, og at Google velger feil en.

     Begge funnene 27. og 28. august 2026 kom herfra, og ingen av dem var
     synlige i `sok` eller `sider` alene:

       oppskalert.no  «nettside pris»   /kalkulator posisjon 97,3, mens
                      /priser lå på 90,4. 22 av 39 søk i prisklyngen traff
                      et verktøy i stedet for prissiden.
       appstart.no    «app pris»        fire egne sider bød på det samme.
                      Bloggposten lå på 16,3, pengesiden på 75,2.

     Ordet er et regulært uttrykk mot søket, ikke mot siden, så `klynge pris`
     tar «app pris», «prisliste» og «hva koster» hvis du skriver det. */
  async klynge([ord, dager = '90']) {
    const kortSti = (u) => u.replace(SITE.replace(/\/$/, ''), '') || '/';
    if (!ord) return console.error('  bruk: klynge <ord> [dager]   f.eks. klynge pris');
    let re;
    try {
      re = new RegExp(ord, 'i');
    } catch {
      return console.error(`  «${ord}» er ikke et gyldig regulært uttrykk`);
    }

    const d = await api(`/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
      metode: 'POST',
      body: { ...periode(Number(dager)), dimensions: ['query', 'page'], rowLimit: 5000 },
    });

    const rader = (d.rows || [])
      .filter((r) => re.test(r.keys[0]))
      .sort((a, b) => b.impressions - a.impressions);

    console.log(`  siste ${dager} dager, søk som treffer /${ord}/\n`);
    if (!rader.length) return console.log('  (ingen søk i denne klyngen)');

    tabell(
      rader.map((r) => ({
        søk: r.keys[0],
        side: kortSti(r.keys[1]),
        visninger: r.impressions,
        posisjon: r.position.toFixed(1),
      }))
    );

    /* Selve poenget: si fra hvilke søk som har mer enn én av våre egne sider
       på seg, så man slipper å lese det ut av tabellen manuelt. */
    const perSok = new Map();
    for (const r of rader) {
      if (!perSok.has(r.keys[0])) perSok.set(r.keys[0], []);
      perSok.get(r.keys[0]).push(r);
    }
    const delte = [...perSok.entries()].filter(([, v]) => v.length > 1);
    if (!delte.length) return console.log('\n  Ingen søk deles av flere sider.');

    console.log(`\n  ${delte.length} søk der flere av våre egne sider konkurrerer:\n`);
    for (const [sok, treff] of delte.sort((a, b) => b[1].length - a[1].length)) {
      const beste = treff.reduce((a, b) => (a.position <= b.position ? a : b));
      const sum = treff.reduce((n, r) => n + r.impressions, 0);
      console.log(`  ${sok}  (${treff.length} sider, ${sum} visninger)`);
      for (const r of treff.sort((a, b) => a.position - b.position)) {
        const merke = r === beste ? ' <- best' : '';
        console.log(
          `      ${r.position.toFixed(1).padStart(5)}  ${kortSti(r.keys[1])}${merke}`
        );
      }
    }
  },

  async sitemap() {
    const d = await api(`/sites/${encodeURIComponent(SITE)}/sitemaps`);
    tabell(
      (d.sitemap || []).map((s) => ({
        sitemap: s.path.replace(SITE, ''),
        sistLest: (s.lastDownloaded || '').slice(0, 10) || 'aldri',
        urler: s.contents?.[0]?.submitted ?? '?',
        feil: s.errors ?? 0,
        advarsler: s.warnings ?? 0,
        venter: s.isPending ? 'ja' : 'nei',
      }))
    );
  },

  async 'sitemap:send'() {
    const feed = encodeURIComponent(`${SITE}sitemap.xml`);
    await api(`/sites/${encodeURIComponent(SITE)}/sitemaps/${feed}`, { metode: 'PUT' });
    console.log('  sitemap.xml sendt inn på nytt');
  },

  async sjekk([url]) {
    if (!url) return console.error('  bruk: sjekk <url>');
    const d = await api('/urlInspection/index:inspect', {
      metode: 'POST',
      base: 'https://searchconsole.googleapis.com/v1',
      body: { inspectionUrl: url, siteUrl: SITE },
    });
    const r = d.inspectionResult?.indexStatusResult || {};
    console.log(`  indeksstatus : ${r.coverageState || 'ukjent'}`);
    console.log(`  robots       : ${r.robotsTxtState || '-'}`);
    console.log(`  sist crawlet : ${(r.lastCrawlTime || '').slice(0, 10) || 'aldri'}`);
    console.log(`  canonical    : ${r.googleCanonical || '-'}`);
  },

  async 'sider-liste'() {
    const d = await api('/sites');
    tabell((d.siteEntry || []).map((s) => ({ eiendom: s.siteUrl, tilgang: s.permissionLevel })));
  },

  async 'legg-til'([url]) {
    if (!url) return console.error('  bruk: legg-til <https://domene.no/>');
    await api(`/sites/${encodeURIComponent(url)}`, { metode: 'PUT' });
    console.log(`  ${url} lagt til. Den må fortsatt verifiseres.`);
  },
};

const [cmd, ...rest] = argv;
if (!cmd || !kommandoer[cmd]) {
  console.error(`Ukjent kommando. Velg en av: ${Object.keys(kommandoer).join(', ')}`);
  process.exit(1);
}

kommandoer[cmd](rest).catch((err) => {
  console.error('feil:', err.message);
  process.exit(1);
});
