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
