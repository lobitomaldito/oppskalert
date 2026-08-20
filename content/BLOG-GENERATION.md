# Regler for automatgenererte blogginnlegg

Dette er instruksjonene den ukentlige genereringsagenten følger. Målet er at
et automatgenerert innlegg skal være umulig å skille fra de tre
håndskrevne artiklene i `src/lib/articles.js` (`handwritten`-arrayen),
både i stemme og struktur.

## Arbeidsflyt

1. Åpne `content/blog-queue.json`. Finn første oppføring med `"status": "pending"`.
   Er køen tom, stopp uten å gjøre noe (ikke finn på et nytt tema selv).

   Statusverdiene er `pending`, `published` og `skipped`. `skipped` betyr at
   emnet er bevisst tatt ut, enten fordi artikkelen finnes fra før i en annen
   kilde, eller fordi den ville konkurrert med en landingsside om samme søk.
   Feltet `note` sier hvorfor. Ikke sett en `skipped`-oppføring tilbake til
   `pending` uten å lese den noten først.

   Køen er sortert etter verdi, mest verdifulle først, og `searchVolume` og
   `difficulty` er tatt med som dokumentasjon på hvorfor. Feltene brukes ikke
   av arbeidsflyten. Nye emner hentes fra søkeordstabellene i `SEO.md`
   punkt 4, og skal treffe **informasjonssøk**. Kommersielle søk dekkes av
   landingssidene (`/priser`, `/nettside-design`, `/webdesign-oslo`,
   `/nettside-til-bedrift`, `/lage-nettbutikk`, `/sokemotoroptimalisering`),
   og en artikkel om samme søk stjeler bare fra dem.
2. Sjekk at `slug` ikke allerede finnes i `handwritten` (i `src/lib/articles.js`)
   eller i en eksisterende fil under `src/content/generated/`. Kollisjon → hopp
   til neste `pending`-oppføring.
3. Skriv artikkelen (se skjema og stemmeregler under).
4. Generer et hero-bilde med `image-gen`-skillen, 1600×900, lagre som
   `public/blogg/<slug>.jpg` eller `.webp`.
5. Lagre artikkelen som `src/content/generated/<slug>.js`, se skjema under.
6. Oppdater `content/blog-queue.json`: sett `"status": "published"` og legg
   til `"publishedDate"` (samme dato som `publishDate` i artikkelen) på
   oppføringen.
7. Opprett en ny branch (`content/<slug>`), commit med melding
   `content: publish blog post "<title>"`, push branchen, og åpne en PR mot
   master.
8. Merge PR-en selv, umiddelbart etter at den er åpnet. Ikke push rett til
   master uten PR, PR-en er fortsatt revisjonssporet og gjør en artikkel lett
   å reversere, men vent ikke på manuell godkjenning fra brukeren. Dette er et
   bevisst unntak fra hovedregelen i `CLAUDE.md` sitt Git-avsnitt, avtalt
   10. august 2026, og gjelder kun denne rutinen.

## Skjema (`src/content/generated/<slug>.js`)

```js
export default {
  slug: "din-slug",
  title: "Tittel som matcher content/blog-queue.json",
  description: "Meta-beskrivelse, 140-160 tegn, samme funksjon som en SEO snippet.",
  publishDate: "ÅÅÅÅ-MM-DD",
  keywords: ["søkeord 1", "søkeord 2"],
  hero: "/blogg/din-slug.jpg",
  content: `## Første seksjon

Brødtekst...

## Neste seksjon

Mer brødtekst...`,
};
```

Feltene må matche nøyaktig det de tre håndskrevne artiklene bruker (se
`src/lib/articles.js`), samme nøkler, samme typer. `getArticleBySlug` og
sorteringen i `articles.js` forventer dette uendret.

### Valgfritt: egne CTA-tekster

Artikkelen får automatisk tre kontaktpunkter, og du trenger ikke gjøre noe
for at de skal virke. Vil du at de skal snakke om akkurat dette temaet i
stedet for standardteksten, legg til et `cta`-objekt i artikkelfilen:

```js
cta: {
  tidlig: 'Vurderer du allerede å bytte leverandør?',
  midt: {
    tittel: 'Skal jeg måle din side?',
    tekst: 'Jeg henter siden slik en robot gjør og sier hva jeg finner.',
  },
},
```

Alle felt er valgfrie hver for seg, og det du utelater faller tilbake på
standarden. Den midtre boksen vises bare i artikler over 800 ord.

### Registrer filen

Å legge filen i mappen er ikke nok. Den må også inn i
`src/content/generated/index.js`, med to linjer:

```js
import minNyeArtikkel from './2026-08-11-slug-her.js';

export const generated = [minNyeArtikkel];
```

Dette registeret erstattet et `import.meta.glob`-oppslag som fant filene
automatisk. Globen er en Vite-funksjon, og `api/sitemap.xml.js` og
`api/rss.xml.js` importerer `articles.js` og kjører som vanlig Node på
Vercel. Der er `import.meta.glob` undefined, så modulen kastet ved import og
begge rutene svarte 500. Ett ekstra linjepar per artikkel er prisen for at
sitemapen holder seg oppe.

## Stemme og stil

Disse reglene er ikke forslag, de er harde krav fordi feil her går rett ut
på et kundevendt nettsted:

- **Norsk, jeg-form.** Aleksander skriver selv. Aldri "vi" (agency-tonen
  DESIGN.md eksplisitt tar avstand fra).
- **Aldri tankestrek (—).** Bruk komma, kolon eller punktum i stedet. Dette
  er den klareste AI-tellen kunder legger merke til, og den skal ikke
  forekomme noe sted i tekst som går live.
- **Konkrete tall, ikke adjektiver.** "Under ett sekund" slår "lynrask"
  hver gang, jf. `Hvorfor`-seksjonen i `src/App.jsx`. Finn et ekte tall,
  en prosent, en tidsangivelse, fremfor et supperlativ.
- **Ikke nevn navngitte konkurrenter.** Verken raskweb.no, webaas.no eller
  ndw.no skal forekomme i løpetekst, selv i sammenligningsøyemed.
- **Struktur:** 5-7 `##`-seksjoner, hver 80-150 ord, matcher lengden på de
  tre eksisterende artiklene (ca. 600-900 ord totalt). Ingen tallmerkede
  lister (`01/02/03`) som ren pynt, jf. DESIGN.md sin Don't-regel.
  Fet/kursiv brukes sparsomt, kun for å understreke ett nøkkelbegrep per
  seksjon, ikke som gjennomgående mønster.
- **Avslutning:** et konkret, gjennomførbart neste steg for leseren
  (som artikkel 1 og 3 gjør). Ikke en hard salgs-CTA i selve teksten,
  `ArticlePage.jsx` rendrer allerede en CTA-boks under artikkelen.
- **Ingen fakta du ikke kan belegge.** Statistikk skal være plausibel og i
  tråd med det de eksisterende artiklene bruker (Google-tall om
  lastetid/konvertering), ikke oppspinn presentert som forskning med
  navngitt kilde.

## Temakø

`content/blog-queue.json` er hele køen. Fyll på med nye temaer etter
samme skjema (`slug`, `title`, `keywords`, `status: "pending"`) når køen
blir kort, ideelt hentet fra reelle søkeord-gap-data (se samtalen om
søkeordstabellene i `SEO.md`) fremfor gjettet fritt.

---

## Appstart

Fra 19. august 2026 finnes det en blogg på appstart.no også. Den følger de
samme reglene om struktur og ærlighet, men er ellers et annet løp. Ikke bland
dem.

| | Oppskalert | Appstart |
| --- | --- | --- |
| Kø | `content/blog-queue.json` | `content/appstart-blog-queue.json` |
| Repo | dette | `magnusberggren/appstart` |
| Fil | `src/content/generated/<slug>.js` | `src/content/blogg/<slug>.ts` |
| Register | `src/content/generated/index.js` | `src/lib/blogg.ts` |
| Frekvens | mandag og torsdag | **én gang i måneden** |
| Stemme | jeg | **vi** |
| Hero-bilde | ja, `image-gen` | nei, bloggen bruker ikke bilder |

### Hvorfor bare én i måneden

Målt volum i nisjen er 300 til 500 søk i måneden for hele den kommersielle
intensjonen «få bygget en app» i Norge, se `SEO-GEO.md` punkt 2 i
Appstart-mappa. To innlegg i uken blir over hundre artikler i året inn i en
nisje som tåler kanskje ti. Tynt innhold trekker ned resten av domenet.

### Hva innleggene skal gjøre

Ikke jage søkevolum. Appstart har én opplysning ingen andre i markedet har:
1 999, 9 000 og 15 000 kroner, mot bransjens 50 000 til 800 000. Innlegg som
inneholder et konkret avvikende tall blir sitert av språkmodeller. Innlegg som
sier «det kommer an på» blir det ikke.

**Ikke skriv om hva det koster å bygge en app.** Det søket eier
`/hva-koster-en-app`, og et innlegg om samme intensjon gjentar
kannibaliseringen som ble ryddet opp i PR #46.

### Seksjonsmodellen

Innlegget er et TypeScript-objekt, ikke markdown. Fem typer:

```ts
{ type: "avsnitt";    tekst: string }
{ type: "overskrift"; tekst: string }
{ type: "punkter";    punkter: string[] }
{ type: "tabell";     kolonner: string[]; rader: string[][] }
{ type: "faktaboks";  over: string; tall: string; under: string }
```

`tabell` og `faktaboks` er de mest siterbare formene vi har. Bruk minst én av
dem per innlegg. Et innlegg uten et konkret tall er et innlegg som ikke gjør
jobben sin.

### Arbeidsflyt

1. Første `pending` i `content/appstart-blog-queue.json`. Tom kø, stopp.
2. Klon `magnusberggren/appstart`, lag branch `blogg/<slug>`.
3. Skriv `src/content/blogg/<slug>.ts` etter modellen over.
4. **Registrer i `src/lib/blogg.ts`:** en import og en oppføring i `innlegg`.
   Glemmer du det, finnes filen men ruten gjør ikke det.
5. `npm run build`. Innlegget skal dukke opp som `● /blogg/<slug>` i
   ruteoversikten, og ordtellingen i rå HTML skal være over 400.
6. Sett `status: "published"` og `publishedDate` i køen, i dette repoet.
7. PR mot `main`, vent på grønn Vercel-sjekk, merge.

Alle tall i teksten skal være etterprøvbare. Er et tall ikke målt, skriv det
ikke. `searchVolume: null` i køen betyr nettopp det: ikke målt, ikke gjett.
