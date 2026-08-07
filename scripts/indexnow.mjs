#!/usr/bin/env node
/* Melder alle URL-er i sitemapen til IndexNow, som deler innsendingen med
 * Bing, Yandex, Seznam og Naver i ett kall. Google deltar ikke, så dette
 * erstatter ikke sitemapen, det supplerer den.
 *
 * Nøkkelen er offentlig med vilje: den ligger som ren tekst på
 * https://oppskalert.no/<nøkkel>.txt, og det er nettopp den filen som beviser
 * at vi eier domenet. Den er ingen hemmelighet og skal committes.
 *
 * Kjøres som en del av `postbuild`, men **kun** på Vercels
 * produksjonsbygg. Uten den vakten ville hvert preview-bygg meldt inn
 * prod-URL-er, og lokale `npm run build` ville sendt trafikk til et API vi
 * ikke trenger å plage.
 *
 * Skriptet feiler aldri bygget. Et IndexNow-kall som ikke går gjennom er en
 * tapt hurtigmelding, ikke en ødelagt deploy.
 *
 * Manuelt:  node scripts/indexnow.mjs
 *           node scripts/indexnow.mjs https://oppskalert.no/en-enkelt-side
 */

const HOST = 'oppskalert.no';
const KEY = '08b4b4d36bf172a50dfe1e71f2abe687';
const ENDEPUNKT = 'https://api.indexnow.org/indexnow';
const SITEMAP = `https://${HOST}/sitemap.xml`;

// IndexNow tar opptil 10 000 URL-er per kall. Vi er langt under, men behold
// grensen så et framtidig innholdsbyggverk ikke sprenger den stille.
const MAKS = 10000;

/* --auto settes kun av postbuild. I den modusen melder vi bare inn fra
   Vercels produksjonsbygg: et preview-bygg ville meldt inn prod-URL-er, og et
   lokalt `npm run build` under utvikling ville pinget API-et for hver eneste
   kjøring. Kjører du skriptet direkte, går det alltid. */
const auto = process.argv.includes('--auto');
if (auto && process.env.VERCEL_ENV !== 'production') {
  console.log('indexnow: hopper over, kun produksjonsbygg melder inn automatisk');
  process.exit(0);
}

async function urlerFraSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`sitemap svarte ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const fraArgv = process.argv.slice(2).filter((a) => a.startsWith('http'));
  const urlList = (fraArgv.length ? fraArgv : await urlerFraSitemap()).slice(0, MAKS);

  if (!urlList.length) {
    console.log('indexnow: ingen URL-er å melde inn');
    return;
  }

  const res = await fetch(ENDEPUNKT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });

  // 200 og 202 betyr mottatt. 403 betyr at nøkkelfilen ikke ble funnet, som
  // nesten alltid er at deployen ikke er ute ennå.
  const merknad = { 200: 'mottatt', 202: 'mottatt, valideres', 403: 'nøkkelfilen ble ikke funnet' }[res.status] || '';
  console.log(`indexnow: ${urlList.length} URLer -> ${res.status} ${merknad}`);
}

main().catch((err) => {
  console.warn('indexnow: hoppet over,', err.message);
});
