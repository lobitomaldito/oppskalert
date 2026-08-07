#!/usr/bin/env node
/* Leser data ut av Bing Webmaster Tools, så du slipper å klikke deg gjennom
 * grensesnittet for å se hvordan det går.
 *
 * Merk hva dette IKKE er til: innsending av URL-er er allerede automatisk via
 * scripts/indexnow.mjs, som kjører på hver produksjonsdeploy og ikke trenger
 * noen nøkkel. Verdien her ligger i lesingen, særlig `lenker`: Bing gir
 * innkommende lenker gratis, og det er nettopp det vi mistet med Opinly.
 *
 * Nøkkelen er en hemmelighet. Den ligger i .env.local (dekket av .gitignore)
 * og skal aldri committes eller limes inn i en chat:
 *
 *   BING_API_KEY=...
 *
 * Bruk:
 *   node scripts/bing.mjs kvote      # hvor mange URL-er du kan sende inn
 *   node scripts/bing.mjs sok        # søkene du vises på, med klikk og posisjon
 *   node scripts/bing.mjs sider      # sidene som får trafikk
 *   node scripts/bing.mjs lenker     # innkommende lenker per side
 *   node scripts/bing.mjs trafikk    # klikk og visninger over tid
 *   node scripts/bing.mjs problemer  # crawl-problemer Bing har funnet
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://oppskalert.no/';
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';

/* Node --env-file finnes fra 20.6, men det er unødvendig å binde skriptet til
   en Node-versjon for å lese én linje. */
function lesEnvLocal() {
  for (const navn of ['.env.local', '.env']) {
    const fil = path.join(ROOT, navn);
    if (!fs.existsSync(fil)) continue;
    for (const linje of fs.readFileSync(fil, 'utf8').split('\n')) {
      const m = linje.match(/^\s*BING_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  return process.env.BING_API_KEY || null;
}

const KEY = lesEnvLocal();
if (!KEY) {
  console.error(
    'Fant ingen BING_API_KEY.\n' +
      'Hent den i Bing Webmaster Tools under API access, og legg den i .env.local:\n' +
      '  BING_API_KEY=din-nøkkel-her\n' +
      '.env.local er allerede dekket av .gitignore.'
  );
  process.exit(1);
}

async function kall(metode, params = {}) {
  const url = new URL(`${BASE}/${metode}`);
  url.searchParams.set('apikey', KEY);
  url.searchParams.set('siteUrl', SITE);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url);
  const tekst = await res.text();
  if (!res.ok) throw new Error(`${metode}: ${res.status} ${tekst.slice(0, 200)}`);
  try {
    return JSON.parse(tekst).d;
  } catch {
    throw new Error(`${metode}: fikk ikke JSON tilbake: ${tekst.slice(0, 200)}`);
  }
}

// Bing returnerer datoer som /Date(1754352000000)/
const dato = (s) => {
  const m = String(s || '').match(/\/Date\((\d+)/);
  return m ? new Date(Number(m[1])).toISOString().slice(0, 10) : '';
};

const tabell = (rader) => {
  if (!rader.length) return console.log('  (ingen data ennå)');
  const kol = Object.keys(rader[0]);
  const bredde = kol.map((k) => Math.max(k.length, ...rader.map((r) => String(r[k] ?? '').length)));
  const linje = (v) => '  ' + v.map((s, i) => String(s ?? '').padEnd(bredde[i])).join('  ');
  console.log(linje(kol));
  rader.forEach((r) => console.log(linje(kol.map((k) => r[k]))));
};

const kommandoer = {
  async kvote() {
    const d = await kall('GetUrlSubmissionQuota');
    console.log(`  daglig igjen: ${d.DailyQuota}   månedlig igjen: ${d.MonthlyQuota}`);
  },

  async sok() {
    const d = await kall('GetQueryStats');
    tabell(
      (d || [])
        .sort((a, b) => b.Impressions - a.Impressions)
        .slice(0, 25)
        .map((q) => ({
          søk: q.Query,
          visninger: q.Impressions,
          klikk: q.Clicks,
          posisjon: q.AvgImpressionPosition,
        }))
    );
  },

  async sider() {
    const d = await kall('GetPageStats');
    tabell(
      (d || [])
        .sort((a, b) => b.Impressions - a.Impressions)
        .slice(0, 25)
        .map((p) => ({ side: p.Query, visninger: p.Impressions, klikk: p.Clicks }))
    );
  },

  async lenker() {
    const d = await kall('GetLinkCounts', { page: 0 });
    tabell(
      (d || [])
        .sort((a, b) => b.Count - a.Count)
        .slice(0, 25)
        .map((l) => ({ side: l.Url, innkommende: l.Count }))
    );
  },

  async trafikk() {
    const d = await kall('GetRankAndTrafficStats');
    tabell(
      (d || [])
        .slice(-14)
        .map((r) => ({ dato: dato(r.Date), visninger: r.Impressions, klikk: r.Clicks }))
    );
  },

  async problemer() {
    const d = await kall('GetCrawlIssues');
    if (!d || !d.length) return console.log('  ingen crawl-problemer');
    tabell(d.slice(0, 25).map((i) => ({ url: i.Url, problem: i.Issues, kode: i.HttpCode })));
  },
};

const cmd = process.argv[2];
if (!cmd || !kommandoer[cmd]) {
  console.error(`Ukjent kommando. Velg en av: ${Object.keys(kommandoer).join(', ')}`);
  process.exit(1);
}

kommandoer[cmd]().catch((err) => {
  console.error('feil:', err.message);
  process.exit(1);
});
