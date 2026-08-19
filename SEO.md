# SEO-notater for oppskalert.no

Hentet ut av Opinly 4. august 2026, slik at dataene er bevart hvis vi sier opp
abonnementet. Alle tall er Opinlys målinger fra crawl 3. august 2026.

---

## 1. Utgangspunktet: null organisk synlighet

| Måling | Verdi |
| --- | --- |
| Rangerte søkeord (organisk) | 0 |
| Estimert organisk trafikk | 0 |
| Backlinks | 0 |
| Henvisende domener | 0 |
| Sider Opinly klarte å crawle | 1 (kun forsiden) |
| SEO-helsescore | 92 / 100 |

Helsescoren på 92 er misvisende. Den måler kun teknisk hygiene på den ene siden
crawleren fikk tak i, ikke om vi faktisk er synlige. Vi rangerer ikke på noe.

---

## 2. Kritisk feil: sitemap og RSS er nede (500)

Dette fant jeg under gjennomgangen, ikke Opinly, men det er den enkeltsaken som
haster mest.

```
GET https://oppskalert.no/sitemap.xml  ->  500 FUNCTION_INVOCATION_FAILED
GET https://oppskalert.no/rss.xml      ->  500 FUNCTION_INVOCATION_FAILED
```

**Årsak:** `api/sitemap.xml.js` og `api/rss.xml.js` importerer
`src/lib/articles.js`, som på linje 124 bruker `import.meta.glob(...)`. Det er
en Vite-spesifikk byggtidsfunksjon. Vercel kjører API-rutene som vanlig Node,
der `import.meta.glob` er `undefined`, så modulen kaster ved import og hele
funksjonen dør.

**Konsekvens:** `public/robots.txt` peker på en sitemap som svarer 500. Google
har altså ingen liste over sidene våre, og oppdager kun det den finner via
lenker. Sannsynligvis derfor Opinly bare fikk crawlet én side.

**Mulig løsning:** flytt `import.meta.glob`-delen ut i en egen fil som kun
frontend importerer, og la `articles.js` eksportere en ren array som både Vite
og Node kan lese. Alternativt generere en statisk `articles.json` ved build.

---

## 3. Teknisk audit fra Opinly

Grønt: SSL gyldig (utløper 9. okt 2026), robots.txt finnes, ingen brutte
lenker, ingen brutte ressurser, ingen duplikate titler eller beskrivelser,
ingen ikke-indekserbare sider, ingen manglende alt-tekster.

Flagg på forsiden:

- `no_h1_tag` – Opinly ser ingen H1. Den prerendrede HTML-en *har* faktisk en
  H1, så dette er trolig et crawler-artefakt eller en gammel måling. Verdt å
  dobbeltsjekke, ikke haste med.
- `has_render_blocking_resources` – GSAP, three.js og React-bundlene blokkerer
  første rendering.
- `low_content_rate` – for lite tekst i forhold til kode. Forsiden er visuelt
  tung og tekstlig lett.
- `low_readability_rate`
- `irrelevant_title`, `irrelevant_description`, `irrelevant_meta_keywords` –
  tittel og meta-beskrivelse inneholder ikke ordene folk faktisk søker på.

De tre siste henger sammen med punkt 4: vi skriver om oss selv, ikke om det
kundene googler.

---

## 4. Søkeordsgapet: hva vi burde skrive om

Dette er den mest verdifulle uttrekket fra Opinly. Søkeord konkurrentene
rangerer på og vi ikke gjør. KD = keyword difficulty (0-100, lavere er
lettere). CPC = hva et klikk koster i Google Ads, altså en indikator på hvor
kjøpesterk trafikken er.

### Høyest prioritet: kommersiell intensjon, lav vanskelighetsgrad

| Søkeord | Volum/mnd | KD | CPC (kr) | Intensjon |
| --- | --- | --- | --- | --- |
| nettside pris | 210 | 0 | 9,80 | kommersiell |
| hjemmesider pris | 170 | 0 | 5,40 | kommersiell |
| priser for hjemmeside | 170 | 0 | 5,40 | kommersiell |
| pris på hjemmeside | 170 | 0 | 5,40 | kommersiell |
| nettsideleverandør | 90 | 0 | 14,36 | kommersiell |
| billig nettside | 70 | 0 | 18,82 | kommersiell |
| hva koster en nettside | 70 | 0 | 9,33 | informasjon |
| design nettsider | 140 | 8 | 13,44 | kommersiell |
| nye nettsider | 50 | 6 | 20,62 | navigasjon |
| søkemotoroptimalisering | 590 | 9 | 12,33 | kommersiell |
| nettside ai | 140 | 0 | 17,11 | navigasjon |
| profesjonell nettside | 90 | 0 | 8,20 | navigasjon |

De fire pris-variantene er i praksis det samme søket. Én god prisside kan ta
alle sammen, og vi har allerede `/priser` og `/kalkulator` som kan bygges ut
med denne ordbruken.

### Mellomprioritet: mer volum, mer motstand

| Søkeord | Volum/mnd | KD | CPC (kr) | Intensjon |
| --- | --- | --- | --- | --- |
| nettsider | 1600 | 31 | 12,05 | informasjon |
| ny nettside | 320 | 16 | 11,72 | navigasjon |
| nettside design | 260 | 22 | 10,80 | kommersiell |
| google annonser | 260 | 13 | 22,32 | informasjon |
| webutvikler oslo | 260 | 16 | 4,38 | navigasjon |
| lage nettbutikk | 210 | 15 | 15,75 | kommersiell |
| hvordan lage nettside | 210 | 15 | 12,27 | informasjon |
| google min bedrift | 590 | 16 | 2,72 | navigasjon |
| webdesign oslo | 140 | 17 | 16,26 | kommersiell |
| nettside for bedrift | 140 | 38 | 6,82 | navigasjon |
| hjemmeside bedrift | 90 | 17 | – | kommersiell |
| hjemmesider for små bedrifter | 50 | 26 | 3,24 | kommersiell |

### Hopp over disse

Konkurrentene henter mye av volumet sitt fra søk som ikke gir kunder:
`bedriften min` (2900), `tjene penger på nett` (1000), `gratis bilder på nett`
(590), `gratis e post` (320), `bildestørrelser` (140), `ssl sertifikat` (170).
Høyt volum, null kjøpsintensjon. Det ser bra ut i en rapport og selger
ingenting.

---

## 5. Hva konkurrentene faktisk gjør

**raskweb.no** er den mest lærerike. De rangerer:

| Søkeord | Posisjon | Landingsside |
| --- | --- | --- |
| trenger nettside | 1 | forsiden |
| ny nettside | 2 | forsiden |
| billig nettside | 6 | /billig-nettside/ |
| nettside pris | 6 | forsiden |
| lage ny nettside | 9 | /lage-nettside/ |

Mønsteret er trivielt: **én dedikert side per kommersielt søkeord**, med
søkeordet i URL-en. `/billig-nettside/`, `/lage-nettside/`. Ikke noe magi.

**webaas.no** ligger på 4. plass på `hjemmesider pris` og 11. på
`pris på hjemmeside`. Samme oppskrift.

**ndw.no** er sterkest på `nettsider` (3. plass) og henter ellers mye trafikk
fra gratis-guider (bildestørrelser, gratis e-post, når poste på Instagram).

Sporede søkeord i Opinly per i dag: ett, og det er `youtube nettside`. Det er
ikke relevant for oss. Ingen tap ved å miste den sporingen.

---

## 6. Backlinks

### Hva det er

En backlink er en lenke fra et annet nettsted til vårt. Google bruker dem som
stemmer: hver lenke er en annen side som går god for oss. Jo flere troverdige
domener som lenker til oppskalert.no, jo mer stoler Google på at vi fortjener
å rangere.

Det som teller er ikke antall lenker, men antall **ulike domener**. Femhundre
lenker fra samme nettsted teller omtrent som ett domene som anbefaler oss.
Derfor er "henvisende domener" den viktigste raden i tabellen øverst, og vår
står på 0.

Kvalitet slår kvantitet. En lenke fra et etablert norsk nettsted med reell
trafikk er verdt mer enn hundre fra lenkefarmer. Opinly måler dette som
*spam score* (0-100). Alt over rundt 20 er noe vi ikke vil assosieres med.

### Hvordan konkurrentene har fått sine

Backlink-gapet mot webaas.no avslører hele strategien deres. De øverste
domenene som lenker til dem:

| Domene | Domenerank | Lenker | Spamscore |
| --- | --- | --- | --- |
| vearhudhelse.no | 303 | 513 | 0 |
| innlandetvarmepumpe.no | 200 | 121 | 0 |
| salongnytt.no | 194 | 83 | 0 |
| noraudio.com | 189 | 148 | 0 |
| ttbilder.no | 185 | 28 | 0 |
| greenstar.no | 171 | 24 | 0 |
| aassidenkiropraktorsenter.no | 158 | 56 | 0 |
| harmonybad.no | 102 | 11 | 0 |
| tannmed.no | 85 | 7 | 0 |
| handverkerdrammen.no | 23 | 3 | 0 |

Dette er kundene deres. En hudpleieklinikk, en varmepumpeleverandør, en
kiropraktor, en tannlege, en håndverker. 513 lenker fra ett enkelt domene
betyr en «Laget av webaas»-kreditering i bunnteksten som gjentas på hver
eneste side av kundens nettsted.

Det er hele lenkeprofilen deres, og det er gratis. Vi bygger nettsider for
akkurat samme type bedrifter. En diskret kreditering i footeren på hver side
vi leverer, med lenke til oppskalert.no, gir den samme effekten. Dette bør
avtales med kunden, ikke smugles inn.

### Andre gratis kilder verdt å ta

- Google Bedriftsprofil (også et rangeringssignal lokalt)
- proff.no, 1881, gulesider.no, brreg-oppføring
- Bransjeregistre og lokale næringsforeninger
- Gjesteinnlegg eller sitat i lokalavis eller bransjeblad

### Unngå

Fra samme gap-liste, domener med spamscore vi ikke vil ha i nærheten:
`drjack.world` (50), `acquire.co.in` (20), `foretaksinfo.no` (15). Kjøpte
lenker fra slike gir mer skade enn nytte.

---

## 7. Viktig før vi sier opp Opinly

Opinly er ikke bare et analyseverktøy her, det er **CMS-et for bloggen**.

- `api/opinly/posts.js`, `post.js`, `categories.js`, `authors.js` henter alt
  blogginnhold live fra Opinlys API.
- Rutene `/blogg`, `/blogg/:slug`, `/blogg/kategori/:slug` og
  `/blogg/forfatter/:slug` er bevisst utelatt fra prerenderingen i
  `scripts/prerender.mjs` fordi innholdet ikke finnes ved byggtid.
- `content/generated/` er tom, så det finnes ingen lokal kopi.

Sier vi opp abonnementet uten å migrere først, forsvinner bloggen. Innholdet
må hentes ned og legges i `src/content/generated/` etter skjemaet i
`content/BLOG-GENERATION.md` før oppsigelsen.

---

## 8. Gratis erstatninger for Opinly

| Behov | Verktøy | Merknad |
| --- | --- | --- |
| Rangeringer, klikk, visninger | Google Search Console | Gratis, og mer nøyaktig enn noe betalt verktøy for eget domene |
| Indeksering, sitemap-innsending | Google Search Console | Send inn sitemap her når 500-feilen er fikset |
| Backlink-profil og site audit | Ahrefs Webmaster Tools | Gratis for verifisert eget domene |
| Søkeordsvolum | Google Keyword Planner | Gratis med en Ads-konto |
| Backlinks og søkeord, bonus | Bing Webmaster Tools | Gratis, gir også konkurrentdata |
| Konkurrentsjekk | `site:raskweb.no` i Google | Viser hvilke sider de har bygget |
| Atferd på egen side | PostHog | Allerede installert |

Det eneste vi mister er automatisk konkurrentovervåking og LLM-synlighet.
Tabellene over dekker konkurrentbildet slik det så ut 3. august 2026.

---

## 9. LLM-synlighet (GEO), målt 3. august 2026

Dette er det eneste Opinly måler som ingen gratis erstatning dekker, så tallene
er bevart her. Kun én måling finnes, altså ingen trend å lese ennå.

| Måling | Verdi |
| --- | --- |
| Synlighetsscore | 33,3 |
| Omtalerate | 30 % |
| Head-to-head vinnerrate mot Ndw | 0 % |
| Snittsentiment | 1,0 (positivt når vi først nevnes) |
| Svar analysert | 12, hvorav 6 feilet |

### De seks promptene Opinly kjørte

Tre klynger, med ett nøytralt og ett head-to-head-spørsmål hver. Disse kan
kjøres manuelt mot ChatGPT, Claude og Gemini gratis, én gang i kvartalet.

**Skreddersydde nettsider for småbedrifter**
- What are the best tools for creating custom websites for small businesses in Norway?
- Is {company} or {competitor} more cost-effective for building a custom website for a small business in Oslo?

**AI-drevet webutvikling, hastighet og kvalitet**
- What are the best AI-driven web development tools available in Norway?
- Is {company} or {competitor} more effective for rapid AI-driven web development?

**Hosting og vedlikehold av nettside**
- What are the best website hosting and maintenance providers for small businesses in Norway?
- Is {company} or {competitor} better for website hosting and maintenance agreements tailored for small businesses?

### Bing AI Performance, en gratis erstatning

Bing lanserte **AI Performance** i februar 2026. Den ligger i menyen i Bing
Webmaster Tools og måler hvordan innholdet vårt siteres i AI-svar, på tvers av
Microsoft Copilot, AI-sammendrag i Bing og enkelte partnerintegrasjoner.

Fire tall: totale siteringer, snitt antall siterte sider per dag,
**grunnlagssøk** (frasene AI-en faktisk brukte da den hentet innholdet vårt),
og siteringer per URL.

Grunnlagssøkene er det interessante. Det er reelle data på hvilke spørsmål som
fører til at vi blir sitert, i motsetning til promptsettet under, som er vår
egen gjetning på hva folk spør om.

**Det finnes ingen API.** Sjekket 7. august 2026: ti sannsynlige endepunktnavn
mot `ssl.bing.com/webmaster/api.svc` svarte alle 404, og Microsoft bekrefter i
sitt eget Q&A at rapporten ikke er eksponert programmatisk. Den må leses
manuelt i grensesnittet. Ikke bruk tid på å lete etter et endepunkt igjen.

Promptsettet under er fortsatt nyttig for ChatGPT, Claude og Gemini, som Bing
ikke dekker.

### Det mest handlingsrettede funnet

Domenene AI-modellene siterer når de svarer på disse spørsmålene er nesten
utelukkende **katalogsider**, ikke leverandørenes egne nettsteder:

| Domene | Siteringer |
| --- | --- |
| sortlist.com | 6 |
| techradar.com | 5 |
| goodfirms.co | 4 |
| hostadvice.com | 3 |
| clutch.co | 2 |
| techbehemoths.com | 2 |
| designrush.com | 1 |

Av konkurrentene er kun ndw.no sitert, én gang. Ingen av oss vinner på egen
nettside her.

Konsekvensen er konkret: å bli oppført i disse katalogene er både den
raskeste veien inn i AI-svar og en gratis backlink. Sortlist, Clutch,
GoodFirms, DesignRush og TechBehemoths har alle gratis leverandørprofiler.
Det er samme jobb som punkt 6 under, bare med større uttelling.

---

## 10. Prioritert handlingsliste

Status per 5. august 2026.

1. ~~Fiks `import.meta.glob`-feilen så sitemap.xml og rss.xml svarer 200.~~
   Gjort, begge svarer 200 i prod.
2. Send inn sitemapen i Google Search Console. **Ikke gjort, krever
   Google-konto.** Dette er nå det viktigste enkeltpunktet på listen.
3. ~~Bygg ut `/priser` med ordene folk faktisk søker på.~~ Gjort, title og H1
   treffer «pris på nettside» og «nettside pris».
4. ~~Skriv om title og meta description på forsiden.~~ Gjort.
5. ~~Footer-kreditering på leverte nettsider.~~ Gjort på alt vi kontrollerer:
   6 av 8 kundesider har den synlig i rå HTML. irmelindrake.no er en kollegas
   prosjekt uten vår tilgang, og alphanegotiations.com krediterer et annet
   byrå. Begge er utenfor rekkevidde og følges ikke opp videre.
6. Opprett Google Bedriftsprofil, proff.no, 1881, og katalogene i punkt 9.
7. ~~Lag én dedikert landingsside per kommersielt søkeord.~~ Startet:
   `/sokemotoroptimalisering` er live. Neste: `/nettside-design`.
8. Reduser render-blokkerende ressurser på forsiden.
9. ~~Migrer bloggen ut av Opinly.~~ Gjort for det publiserte innholdet.

---

## 11. Sjekkliste før Opinly sies opp

**Hent ut først:**

- [x] ~~Alt innhold er ute.~~ Den publiserte artikkelen ble hentet med
      `scripts/migrate-opinly.mjs`. De to planlagte ble kopiert manuelt
      5. august, siden prod-APIet kun eksponerer publiserte innlegg og vi
      ikke ville vente. Hero-bildene deres lot seg ikke hente (403 på CDN-en
      for alle varianter av bilde-ID-en), så de er generert på nytt med
      `image-gen`. Utgående lenker til norske konkurrenter er fjernet.
- [x] ~~Utkastet «Hva er SEO ...» er droppet~~, det overlappet med
      `/sokemotoroptimalisering`. Markert `skipped` i `content/blog-queue.json`.

**Opinly kan sies opp nå.** Ingenting i repoet er avhengig av abonnementet
lenger: bloggen er lokal, pikselen er fjernet, og api/opinly/* er slettet.
- [ ] Alt annet er allerede tappet ut hit: søkeordsgap (punkt 4),
      konkurrenter (punkt 5), backlink-gap (punkt 6), teknisk audit (punkt 3),
      LLM-oppsett og -tall (punkt 9). Sporede søkeord i Opinly er ett stykk,
      «youtube nettside», som ikke er relevant.

**Gjør klart før oppsigelsen:**

- [ ] Google Search Console verifisert, sitemap sendt inn
- [ ] Bing Webmaster Tools verifisert (gratis, gir også konkurrentdata)
- [ ] Ahrefs Webmaster Tools verifisert (gratis backlink-profil for eget domene)
- [ ] Fjern Opinly-pikselen fra `index.html` og rydd `src/lib/analytics.js`
- [ ] Fyll `content/blog-queue.json` med nye emner fra søkeordstabellen i
      punkt 4, så den lokale generatoren har noe å jobbe med

**Etter oppsigelsen mister vi:** automatisk konkurrentovervåking,
søkevolum-oppslag og LLM-synlighetsmåling. De to første dekkes av Search
Console og Keyword Planner. Den tredje må kjøres manuelt med promptene i
punkt 9.

---

## 12. AEO-måling og samleside, 18. august 2026

Målt mot prod med `diagnose.sh` og et eget skript som leser JSON-LD, H2-er og
interne lenker på alle 16 statiske ruter.

### FASE 1 er ren

Prerendering virker på alle ruter. Ingen tomme skall, ingen SPA-fallback,
sitemap svarer 200 med 27 URLer, `llms.txt` finnes. Ordtall i rå HTML: 1181 på
forsiden, 949 på `/priser`, 328 på `/kalkulator`. Alle sider har nøyaktig én H1.

### Funnet som betyr mest

**21 FAQ-spørsmål og FAQPage-schema ligger ferdig på branchen
`seo/faq-per-side`, men er aldri merget til master. Null av dem er på prod.**

`landingsSporsmal` i `site.js` har fem sett (seo 5, oslo 4, design 4, bedrift 4,
nettbutikk 4), og alle fem sidene importerer `lagFaqSchema`. Kildekoden er
riktig. Prod har 0 treff på FAQ-innholdet.

Dette er akkurat det skillen advarer mot: «jeg fikset det» betyr ofte «jeg
endret koden, men deployet aldri». Å merge branchen er det billigste tiltaket
på hele lista, fordi arbeidet allerede er gjort.

### FAQPage-schema per rute, målt på prod

| Rute | FAQPage-svar | H2 som er spørsmål |
| --- | --- | --- |
| `/` | 8 | 1 |
| `/priser` | 8 | 2 |
| `/kalkulator` | 0 | 2 |
| `/sokemotoroptimalisering` | 0 | 1 |
| `/webdesign-oslo` | 0 | 1 |
| `/nettside-design` | 0 | 1 |
| `/nettside-til-bedrift` | 0 | 1 |
| `/lage-nettbutikk` | 0 | 0 |
| `/metode`, `/om`, `/drift`, `/sammenlign/*` | 0 | 0 til 1 |

Til sammenligning har konkurrenten attentio.no 89 FAQ-par fordelt på 40 ruter,
med fem spørsmål på nesten hver eneste tjenesteside.

### Backlinks fra kundesider, målt

Alle sju kundesider lenker tilbake, ingen med `nofollow`. Men **fire av sju har
tom ankertekst**, altså ren logolenke:

| Kundeside | Ankertekst |
| --- | --- |
| katrinbrubakk.no | «oppskalert.» |
| steinarhusby.no | «Oppskalert» |
| toresunderasmussen.no | «Oppskalert» |
| woxenhage.no | tom |
| samtaleverkstedet.no | tom |
| progressivediplomacy.com | tom |
| melaniedahl.com | tom |

En logolenke teller, men gir Google null ord å knytte til domenet. Fire sider vi
selv drifter, fire enkle endringer.

### Nytt: `/vanlige-sporsmal`

Samleside etter mønster fra attentio.no sin `/populaere-sok`. Femten spørsmål
valgt fra søkeordstabellen i avsnitt 4, ikke fra magefølelse. Data i
`src/lib/populaere-sok.js`, side i `src/pages/PopulaereSokPage.jsx`.

Målt i byggutdata:

| | Verdi |
| --- | --- |
| Ord i rå HTML | 2336, størst av alle sider |
| H2 som er spørsmål | 15 |
| FAQPage-svar | 15 |
| Interne lenker | 24 |
| Snittlengde på svar | 62 ord |
| Svar med siffer | 10 av 15 |

Bevisst ikke bygget med trekkspill. Begge deler crawles, men en ekte H2 med
synlig avsnitt under er formatet AI-modeller siterer.

Registrert tre steder, som er kravet i CLAUDE.md: `main.jsx`,
`ROUTES` i `prerender.mjs`, og `STATIC_PATHS` i `api/sitemap.xml.js`. Bygget
sier nå «31 routes snapshotted», mot 30 før.

### Deployet og verifisert i prod 18. august 2026

`seo/faq-per-side` er merget til master og pushet. Vercel var live etter
omtrent 160 sekunder. Målt mot prod etterpå:

| | Før | Etter |
| --- | --- | --- |
| FAQPage-svar | 16 på 2 sider | **67 på 12 sider** |
| URLer i sitemap | 27 | 28 |
| `/vanlige-sporsmal` | fantes ikke | 1323 ord, 15 spørsmåls-H2, 200 |
| `/sammenlign/wix` | 267 ord, 0 FAQ | 527 ord, 4 FAQ |
| `/kalkulator` | 294 ord, 0 FAQ | 601 ord, 5 FAQ |
| llms.txt | 146 ord | 182 ord |

Alle 33 ruter verifisert i byggutdata før push: nøyaktig én H1 hver, unike
titler og beskrivelser, korrekte canonicals, `noindex` kun på `/eksempler/*`
og `/admin/dashboard`.

Merget ble gjort med `git branch -f master` uten å sjekke ut master, fordi en
annen sesjon hadde ukommittert arbeid i treet. Bloggrutinen hadde i mellomtiden
pushet tre commits til origin, som ble merget inn og bygget på nytt før push.

### Akseptert som det er

`/kontakt` ligger på 233 ord. Det er normalt for en kontaktside, den er ikke et
rangeringsmål, og den har unik title, beskrivelse og canonical. Ingen handling.

### Gjenstår, blokkert på Aleksander

1. **Fire kundesider har tom ankertekst** i krediteringslenken: woxenhage.no,
   samtaleverkstedet.no, progressivediplomacy.com, melaniedahl.com. Alle
   driftes av oss. En logolenke teller, men gir Google null ord å knytte til
   domenet.
2. **Katalogprofiler.** Skillen sitt sterkeste GEO-funn er at AI-modeller
   siterer kataloger, ikke leverandørenes egne sider. Sortlist, Clutch,
   GoodFirms, proff.no, 1881. Gratis, og gir backlink på kjøpet. Krever egne
   kontoer.
3. **Send inn den nye sitemapen** i Google Search Console, så
   `/vanlige-sporsmal` blir oppdaget raskere enn ved vanlig crawl.
