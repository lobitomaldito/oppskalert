# Regler for automatgenererte blogginnlegg

Dette er instruksjonene den ukentlige genereringsagenten følger. Målet er at
et automatgenerert innlegg skal være umulig å skille fra de tre
håndskrevne artiklene i `src/lib/articles.js` (`handwritten`-arrayen),
både i stemme og struktur.

## Arbeidsflyt

1. Åpne `content/blog-queue.json`. Finn første oppføring med `"status": "pending"`.
   Er køen tom, stopp uten å gjøre noe (ikke finn på et nytt tema selv).
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
   master. Ikke merge selv, ikke push til master direkte, brukeren skal
   godkjenne hver artikkel før den går live.

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
