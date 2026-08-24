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
/* To endepunkt, ikke ett.
 *
 * Målt 24. august 2026: api.indexnow.org og www.bing.com/indexnow svarer
 * begge 403 UserForbiddedToAccessSite på vår nøkkel, mens yandex.com
 * svarer 202. Nøkkelfilen er den samme i alle tre kallene, og den er
 * verifisert lesbar: 200, ingen redirect, riktig innhold, riktig
 * content-type, og lesbar med bingbots egen user agent. Nettstedet er
 * dessuten verifisert i Bing Webmaster Tools, sjekket mot deres eget
 * API. Det er altså Bings forkontroll av nøkkelen som avviser, ikke noe
 * på vår side.
 *
 * Det gjør ikke innsendingen tapt. IndexNow er et delt nettverk: en
 * innsending til én deltaker deles med de andre. Etter Yandex-kallet
 * dukket URL-en opp i Bings egen IndexNow-logg med kilde «Self».
 *
 * Derfor sendes det til begge. Slutter Bing å avvise nøkkelen, virker
 * det direkte uten at noen må huske å endre noe her. */
const ENDEPUNKTER = [
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
];
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

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  });

  /* Feilmeldingen skrives ut ordrett fra svaret, ikke oversatt fra
     statuskoden. Den forrige versjonen mappet 403 til «nøkkelfilen ble
     ikke funnet», og den etiketten kostet en time med å lete etter en
     fil som hele tiden svarte 200. Den ekte teksten fra Bing er
     «UserForbiddedToAccessSite», som peker et helt annet sted. */
  for (const endepunkt of ENDEPUNKTER) {
    const navn = new URL(endepunkt).hostname;
    try {
      const res = await fetch(endepunkt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
      });
      const tekst = (await res.text().catch(() => '')).trim().slice(0, 200);
      const ok = res.status === 200 || res.status === 202;
      console.log(
        `indexnow: ${urlList.length} URLer -> ${navn} ${res.status}${ok ? ' mottatt' : ''}${tekst && !ok ? ` ${tekst}` : ''}`,
      );
    } catch (err) {
      // Ett endepunkt som er nede skal ikke stanse det andre.
      console.log(`indexnow: ${navn} feilet, ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.warn('indexnow: hoppet over,', err.message);
});
