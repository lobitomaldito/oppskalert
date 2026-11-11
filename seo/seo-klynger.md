# SEO-klynger: oppskalert.no

Laget 11.11.2026 etter `~/.claude/assets/seo/klynger.md`. Data:

- Search Console, 90 dager (11.8 til 9.11.2026), søk krysset mot side: 978 rader, 31 349
  visninger, 15 klikk. Totalen fra søk er lavere enn den ekte (felle 2 i `SEO.md`): `seo/funn.md`
  viser 46 klikk og 11 801 visninger på 28 dager.
- OpenSEO 11.11.2026: søkevolum for 58 ord, toppresultater på mobil i Norge for 8 søk, sidene
  hentet med curl og målt. 115 kreditter brukt (6 628 til 6 513).
- Prod målt med curl 11.11.2026: sitemap (67 adresser), tittel, H1 og første avsnitt på 30 sider,
  krediteringslenkene på 11 kundesider.
- Priser fra `~/.claude/assets/tilbud/MAL.md`, alle eks. mva.

## Nytt i denne planen

Bygger på `SEO.md` (søkeordsgap, landingssider, kataloger), `seo/funn.md` (9.11) og
`content/blog-queue.json`. Dette er nytt:

1. Sidene er ordnet i fem klynger med én pengeside hver, og hver side har en vei videre.
2. SEO-pengesiden er nesten usynlig: Google bruker spørsmålssiden for et kjøpssøk (funn 3).
3. Kjøpssøk på gjør-det-selv-guiden: 185 visninger på «noen til å bygge en nettside for meg» (funn 4).
4. Nettbutikk er den største kommersielle gruppen i Search Console, og det selges ikke (funn 5).
5. Krediteringslenkene er rettet siden august: alle ni kundesider vi målte har tekst i lenken nå.

## Pågående test: ikke rør prisklyngen før 25.11

Parasite SEO-testen (`oppskalert ringeapp/docs/ideer/2026-11-11-parasite-seo-test.md`) startet i
dag. Dag 0: «hva koster en nettside» snitt plass 57,1, «nettside pris» 76,6, 0 klikk. LinkedIn-
artikkelen og tre Gamma-presentasjoner skal måles på dag 14, 25.11.2026.

Endrer vi `/priser` eller `/blogg/hva-koster-nettside` før det, vet vi ikke hva som flyttet
plassen. Derfor:

- **Venter til etter 25.11:** alt i klynge 1 som rører `/priser` og `/blogg/hva-koster-nettside`,
  og den nye terapeutsiden i klynge 3 («nettside for terapeut» er ett av testsøkene).
- **Kan gjøres nå:** klynge 2, 4 og 5, og spørsmålssidene i klynge 1 som ikke er testsøk
  (`/vanlige-sporsmal/er-billig-nettside-verdt-det`, `/vanlige-sporsmal/krav-til-nettsideleverandor`).

## Det Search Console sier

1. **Nesten alle klikk er merkevaresøk.** 10 av 15 klikk er «oppskalert». De fem andre: «hagehjelp»
   (Woxen Hage-casen), «webdesign pris», «pris hjemmeside» og to tilfeldige spørsmål.
2. **Prisklyngen landet på en side som ikke finnes lenger.** «nettside pris» 154 visninger på plass
   88,1 og «hva koster en nettside» 121 på 87,5 gikk til `/kalkulator`, som sender videre til
   `/priser` siden 30.9.2026. `/priser` selv har 176 visninger på 90 dager. Artikkelen
   `/blogg/hva-koster-nettside` står bedre: plass 5,3 på «hva koster en nettside» (70 visninger)
   og 13,0 på «hvor mye koster en nettside» (63). Filen er ikke delt på dato, så jeg vet ikke hvor
   mye av kalkulatortallet som er fra før videresendingen.
3. **SEO-pengesiden har 37 visninger.** `/sokemotoroptimalisering` har 37 visninger på 90 dager.
   Spørsmålssiden `/vanlige-sporsmal/hva-er-sokemotoroptimalisering` har 2 369, på plass 41 til 81,
   blant annet «søkemotoroptimalisering» 670 visninger på plass 74. OpenSEO kaller det søket
   kommersielt: 390 i måneden, KD 3. Google velger spørsmålssiden til et kjøpssøk.
4. **Folk som vil kjøpe, havner på gjør-det-selv-guiden.** Sju søk av typen «noen til å bygge en
   nettside for meg» gir 185 visninger på `/blogg/hvordan-lage-nettside`, plass 21 til 28.
5. **Nettbutikk er den største kommersielle gruppen.** 22 søk på plass 8 til 30 gir 1 591
   visninger, de fleste på `/lage-nettbutikk` og `/vanlige-sporsmal/hva-koster-nettbutikk`
   («lage nettbutikk» 505 visninger på plass 29,0). Aleksander droppet tre nettbutikker som hadde sagt
   ja 6.11.2026. Det må avgjøres før noe mer gjøres der (spørsmål 1).

Bransjesøk finnes nesten ikke: ingen søk på terapeut, psykolog eller klinikk i hele filen, og
OpenSEO gir tomt volum for «nettside for terapeut», «nettside for psykolog», «nettside for
håndverker» og ti lignende. Det eneste er «lage hjemmeside til snekker», 240 visninger fordelt på
tre sider.

## Løft først

Kommersielle søk på plass 8 til 30 med minst 10 visninger: **42 rader, 2 239 visninger**, på 15
sider. Nettbutikk-radene (1 591 visninger) står utenfor til spørsmål 1 er besvart. Tittel, H1 og
første avsnitt er lest i rå HTML på prod 11.11.2026.

| Side | Søk (visninger, plass) | Tittel / H1 / 1. avsnitt | Hva mangler | Når |
|---|---|---|---|---|
| `/` | hjemmeside (329; 12,8), webdesigner oslo (78; 10,3), webdesign firma (59; 10,2), webdesign bedrift (58; 9,7), webdesign i oslo (34; 13,3) og seks til, til sammen 652 | ja (webdesign, bedrift, Oslo) / nei / nei | «webdesign» og «hjemmeside» i første avsnitt under H1. Forslag: «Webdesign og ny hjemmeside for bedrifter i hele Norge, fast pris fra 6 990 kr.» Uten Oslo: 87 % av de kommersielle visningene er søk uten by (17 011 mot 2 448 for Oslo, 0 klikk på Oslo-søkene), og ingen andre byer finnes i dataene. `/webdesign-oslo` står, men ingen nye bysider (Aleksander 11.11.2026). H1-en kan stå. | nå |
| `/` | webhosting (154; 12,7), web hosting (101; 15,9), hjemmeside hosting (24; 9,7), nettside hosting (10; 16,2) | nei / nei / nei | Ordet hører hjemme på `/drift`, som har det i tittelen. Lenk fra forsiden til `/drift` med teksten «webhosting». Folk som søker «webhosting» leter ofte etter et webhotell alene, som vi ikke selger. Lav prioritet. | nå |
| `/vanlige-sporsmal/krav-til-nettsideleverandor` | nettsideleverandør (287; 10,6) | ja / ja / nei | Ordet i første setning, og en lenke til `/priser`. 70 søk i måneden, KD 0. | nå |
| `/blogg/hvordan-lage-nettside` | sju «bygge en nettside for meg»-søk, til sammen 185, plass 20,9 til 28,4 | nei / nei / delvis («setter du det bort til meg») | En H2 som svarer på kjøpet: «Vil du at noen bygger nettsiden for deg?», med de tre prisene og lenke til `/priser`. | nå |
| `/vanlige-sporsmal/er-billig-nettside-verdt-det` | billig nettside (182; 18,5) | ja / ja / delvis («den billige siden») | Laveste pris i første avsnitt: «Enkel koster 6 990 kr eks. mva.» Søket har høyest klikkpris i prisgruppen (17,38 kr), altså kjøpere. | nå |
| `/blogg/webutvikler-oslo` | webutvikler oslo (103; 26,7), bra webutviklere (44; 26,8) | ja / ja / nei (åpner med en fortelling) | «Kort svar» øverst med pris og leveringstid, og lenke til `/webdesign-oslo` med teksten «webdesign i Oslo». Samme søk deler seg på tre sider (`funn.md`). | nå |
| `/nettside-design` | nettsidedesign (91; 15,5) | nei («Design av nettsider som selger») / ja / nei | Tittel: «Nettsidedesign for små bedrifter, fast pris \| Oppskalert». | nå |
| `/webdesign-oslo` | webdesigner oslo (39; 28,1), webdesign pris (19; 12,7), pris webdesign (17; 19,7), web design pris (13; 22,4) | ja / ja / nei | Pris i første avsnitt (står bare i beskrivelsen). «webdesigner oslo» ligger bedre på forsiden (10,3), la forsiden ta det. | nå |
| `/blogg/hva-koster-nettside` | hvor mye koster en nettside (63; 13,0) | ja / ja / nei (første avsnitt er en lenkeboks) | «Kort svar» med de tre prisene før lenkeboksen, FAQPage, `dateModified`, og 2027 i tittelen (Veniro og undrumdesign.no bruker alt 2027). | etter 25.11 |
| `/blogg/responsiv-nettside` | responsiv hjemmeside oslo (67; 20,0) | delvis / delvis / ja | Lenke videre til `/ny-nettside` etter testen på egen telefon. | nå |
| `/blogg/hjemmesider-for-sma-bedrifter` | hjemmeside bedriften (34; 26,8), hjemmeside utvikling (18; 26,4) | ja / ja / nei (lenkeboks) | «Kort svar» før lenkeboksen. | nå |
| `/vanlige-sporsmal/hva-koster-drift-av-nettside` | drift av nettstedet (28; 23,1), vedlikehold av nettside (13; 24,4) | ja / ja / nei | «drift» i første setning. Googles utdrag sier fortsatt «450 i måneden», siden sier 550: be om ny indeksering. | nå |
| `/vanlige-sporsmal/ny-nettside-eller-pusse-opp` | trenger nettside (26; 10,4), trenger ny nettside (11; 24,5) | ja / ja / nei | Lenke til `/ny-nettside` i første avsnitt. | nå |
| `/vanlige-sporsmal/hvor-lang-tid-tar-en-nettside` | lage hjemmeside til snekker (36; 14,9) | nei / nei / nei | Feil side for søket. Det mater klynge 3 (håndverkere). | etter spørsmål 2 |
| `/ordliste` | kjøpe nettside (10; 29,1) | nei / nei / nei | For lite til å flytte. Ignorer. | |

Det første som gjelder alle bloggartiklene: tre av fem målte artikler åpner med lenkeboksen «Leter
du egentlig bare etter en pris?» i stedet for et svar. Artiklene med «Kort svar» først
(`responsiv-nettside`, `hvordan-lage-nettside`) står bedre. Boksen bør komme etter svaret i malen.

### Informasjonssøk med mange visninger

| Søk (visninger, plass) | Side | Vei videre? |
|---|---|---|
| søkemotoroptimalisering (670; 74), seo (423; 43), hva er søkemotoroptimalisering (328; 46), hva er seo (248; 81), seo optimalisering (188; 74) | `/vanlige-sporsmal/hva-er-sokemotoroptimalisering` | **Ja.** Se klynge 4. Lenken til pengesiden står i dag midt i teksten med «Mer om søkemotoroptimalisering». Flytt den til første avsnitt. |
| lage nettside (394), designe nettside (288), lage hjemmeside (251), lage nettsider (209) og 20 til, plass 47 til 76 | `/vanlige-sporsmal/hvordan-lage-nettside` (sender til bloggen siden 28.9) | **Ja,** via H2-en over. Gjør-det-selv-folk blir kunder når de ser timene det tar. |
| responsiv nettside (635; 10,1), mobiltilpasset nettside (182; 32) | `/blogg/responsiv-nettside` | **Ja,** lenke til `/ny-nettside`. |
| hvordan bli synlig på google (234; 49), google bedriftsprofil (279; 38), google bedrift (223; 43) | `/blogg/google-min-bedrift`, `/vanlige-sporsmal/google-bedriftsprofil` | **Ja,** lenke til `/sokemotoroptimalisering`. To sider om samme søk deler plassene: la én av dem eie det. |
| drifte nettsider (254; 53), drift av nettside (159; 41) | `/vanlige-sporsmal/hva-koster-drift-av-nettside` | **Ja,** dette er kjøpere. Se klynge 5. |
| cms (760; 52), konverteringsrate (265; 30), responsivt webdesign (239; 56), webhotell (215; 47), domene (183 + 180), landingsside (181; 37), 301 omdirigering | `/ordliste/*`, `/blogg/norsk-domene` | **Ignorer.** Ingen kjøpere. Ordlisten lenker allerede ut i bunnteksten, det holder. |

## Klyngene

Fem klynger, én per det Oppskalert selger. Volum er OpenSEO (søk i måneden, Norge). «GSC» betyr
at OpenSEO ga tomt og at Search Console er eneste kilde.

### Klynge 1: Pris på nettside

**De fem øverste på «nettside pris»** (mobil, 11.11): one.com (guide, 1 535 ord), nettify.no/priser
(prisliste, 1 400 ord), hønefossvekst.no, alexweb.no og kodemagisk.no (artikler, 619 til 1 510 ord).
**På «hva koster en nettside»:** tennet.no øverst med en priskalkulator, så marketin.no, uniweb.no,
revedigital.no og nordicsync.no (artikler, 1 065 til 3 412 ord, fire av fem med FAQ).

- **Alle dekker:** et prisspenn for markedet, hva som driver prisen, hosting og drift etterpå.
  Fire av fem på «nettside pris» har årstallet 2026 i tittelen.
- **Ingen dekker:** leie til eie. Ingen av de ti sidene på de to søkene nevner det. Bare to av fem
  på «nettside pris» regner ut hva siden koster over tre år (hønefossvekst, kodemagisk: «600 kr i
  måneden i tre år blir 21 600 kr»).
- **Sidetype:** artikkel med egne priser vinner. Prislisten (nettify) og kalkulatoren (tennet) er
  unntakene.
- **Lengde:** vår artikkel er rundt 800 ord, de fem øverste på «hva koster en nettside» 1 065 til
  3 412.

**Vinkelen vår:** regnestykket over tre år med egne tall. Fra `MAL.md`: Medium kjøpt med
serviceavtale 32 700 kr over tre år (12 900 + 36 × 550), leie til eie 32 280 kr (19 080 + 24 × 550).
Leie til eie er 1 590 kr i måneden uten binding. Det er en ny H2 i artikkelen, ingen ny side:
«nettside abonnement» og «leie nettside» har ikke målt volum.

| Side | Søkeord (volum) | Status | Vei videre |
|---|---|---|---|
| **Pengeside:** `/priser` | nettside pris (170, KD 0), pris hjemmeside (70), hjemmeside pris (70), pris på nettside (10). Synlig tekst: «pris på nettside» | finnes | gratis utkast (`/kontakt`) |
| `/blogg/hva-koster-nettside` | hva koster en nettside (50), hvor mye koster en nettside (40), hva koster en hjemmeside (20) | finnes, etter 25.11: kort svar, H2 om tre år, FAQPage, 2027 | `/priser` |
| `/vanlige-sporsmal/er-billig-nettside-verdt-det` | billig nettside (50, KD 0) | finnes, løft nå | `/priser` |
| `/sammenlign/wix`, `/sammenlign/wordpress` | byrå mot Wix og WordPress. «wix eller wordpress» 10, KD 48 | finnes | `/priser` |
| `/vanlige-sporsmal/hva-koster-webdesign-i-oslo` | fast pris mot timepris. «timepris webdesign» 10, KD 39 | finnes. Timepris utenfor fastpris er 1 200 kr (`MAL.md`) | `/priser` |
| `/vanlige-sporsmal/krav-til-nettsideleverandor` | nettsideleverandør (70, KD 0) | finnes, løft nå | `/priser` |
| `/vanlige-sporsmal/eier-jeg-nettsiden-selv` | (spørsmål) | finnes | `/priser` |
| `/vanlige-sporsmal/hvor-lang-tid-tar-en-nettside` | (spørsmål) | finnes | `/priser` |

Veien: spørsmålssidene → `/blogg/hva-koster-nettside` → `/priser` → gratis utkast.

**Kalkulatoren finnes ikke.** Den ble fjernet 30.9.2026 (commit `db78e98`) fordi den regnet pris av
sidetall og tillegg, og prisen settes ikke slik. `/kalkulator` sender til `/priser`. Kalkulatoren
øverst på «hva koster en nettside» (tennet.no) spør nettopp etter antall sider, som strider mot
regelen i `MAL.md` om at antall undersider ikke styrer prisen. Forslaget er derfor en
nivåvelger: tre ja/nei-spørsmål (holder én side, skal du bli funnet i søk, trenger du booking eller
et verktøy) som peker på Enkel 6 990, Medium 12 900 eller Komplett fra 19 900, med regnestykket
over tre år under. Den skal ligge **på `/priser`**, på samme adresse: i august tok en egen
`/kalkulator` over prissøkene og lå på plass 94 til 100 (commit `1b01aaa`). Pengesiden i klyngen
er fortsatt `/priser`. Bygges bare om Aleksander vil (spørsmål 4), og etter 25.11.

### Klynge 2: Ny nettside og webdesign

Kjernen. Pengesidene finnes alle, og problemet fra `SEO.md` 19.8 står fortsatt: forsiden slår
landingssidene på deres egne søk. Ingen nye sider her før det er løst.

**De fem øverste på «ny nettside»** (210, KD 0): mosswebdesign.no (forside, fast pris fra 8 990),
no.wix.com, zennet.no/ny-nettside (tjenesteside), hornmedia.no (artikkel, 2 312 ord), mojomedia.no
(tjenesteside, 557 ord). Tjenestesider med pris i utdraget vinner. Vår `/ny-nettside` har 27
visninger på plass 37,9. Ingen av de fem lover å flytte siden uten at du mister plassene i Google;
hjemmesidehelten.no (nr. 9) gjør det. Den vinkelen har `/ny-nettside` allerede.

| Side | Søkeord (volum) | Status | Vei videre |
|---|---|---|---|
| **Pengeside:** `/` | webdesign bedrift, webdesign firma, hjemmeside (720, KD 44) | finnes, løft nå | `/priser`, gratis utkast |
| `/ny-nettside` | ny nettside (210, KD 0) | finnes | `/priser` |
| `/nettside-til-bedrift` | nettside til bedrift (110, KD 0) | finnes | `/priser` |
| `/webdesign-oslo` | webdesign oslo (90, KD 10), webdesign pris (10) | finnes, løft nå | `/priser` |
| `/nettside-design` | nettsidedesign (GSC 91 visninger) | finnes, ny tittel | `/priser` |
| `/blogg/webutvikler-oslo` | webutvikler oslo (GSC 103), webutvikling oslo (GSC 749, plass 37,6) | finnes, kort svar | `/webdesign-oslo` |
| `/blogg/hvordan-lage-nettside` | lage nettside, og «bygge nettside for meg» (GSC 185) | finnes, ny H2 | `/priser` |
| `/vanlige-sporsmal/ny-nettside-eller-pusse-opp`, `/blogg/bytte-nettside` | trenger ny nettside | finnes | `/ny-nettside` |
| `/vanlige-sporsmal/byra-eller-frilanser` | byrå eller frilanser | finnes | `/om`, `/priser` |

Veien: spørsmål → tjenesteside → `/priser` → gratis utkast.

### Klynge 3: Nettside for terapeut og klinikk (og håndverker)

Terapi og helse har gitt flest positive svar på kald mail (`demo-laget`-testen, 9.11), og flere av
de siste kundene er terapeuter og klinikker (Terapihusene, Terapihjelp, Lillebekk Osteopati i
`laerdommer.md`). Klyngen mangler pengeside.

**Søket «nettside for terapeut»** (volum ikke målbart, OpenSEO gir tomt): på mobil viser de sju
øverste terapitilbud (polarpsykologtjenester.no, vixly.com og svenske og danske nettterapitjenester).
Nettsidebyråene kommer bare i én av tre lesninger: nettify.no/nettside-terapeut (best plass 1, 5 203
ord, FAQ, pris per måned), skailandconsulting.no (best 4, 1 625 ord, FAQ, gratis designutkast),
raskenettsider.no (best 6, 174 ord). Google er usikker på om søkeren vil ha terapi eller nettside.

- **Alle tre byråene dekker:** trygghet og ro i designet, timebestilling, FAQ.
- **Ingen dekker:** engangspris (nettify og raskenettsider oppgir månedspris, skailand ingen pris i
  rå HTML), og personvern ved sporing. Meta-piksel på en helseside er en bøterisiko (`laerdommer.md`, Terapihusene, og `MAL.md`
  om Meta-annonser for helse og terapi). Ingen av de tre nevner det.
- **Sidetype:** tjenesteside med FAQ.

| Side | Søkeord (volum) | Status | Vei videre |
|---|---|---|---|
| **Pengeside:** `/nettside-for-terapeut` | nettside for terapeut, nettside for psykolog (tomt volum, GSC 0) | **ny**, etter 25.11 (testsøk) | `/priser`, gratis utkast |
| H2 på pengesiden: «Hva koster en nettside for en terapeut?» | Enkel 6 990, Medium 12 900, Komplett fra 19 900 med booking. Prisen øker når siden kobles til en timebok kunden har fra før (`MAL.md`) | ny (seksjon) | `/priser` |
| `/vanlige-sporsmal/sporing-pa-nettside-for-terapeut` | hvorfor terapeutsider ikke bør ha Meta-piksel | **ny**, bare om spørsmål 3 gir fakta | `/nettside-for-terapeut` |
| `/arbeid/samtaleverkstedet`, `/arbeid/katrin-brubakk` | case | finnes | `/nettside-for-terapeut` |
| **Pengeside 2:** `/nettside-for-handverker` | lage hjemmeside til snekker (GSC 240 visninger på tre sider) | **ny**, venter på spørsmål 2 | `/priser` |
| `/arbeid/jakobsen-takst`, `/arbeid/woxen-hage` | case | finnes | `/nettside-for-handverker` |

Lag ikke flere bransjesider uten målt søk. Kommer det visninger i Search Console etter 4 uker,
følger spørsmålssidene.

### Klynge 4: SEO

**De fem øverste på «søkemotoroptimalisering»** (390, KD 3): planmedia.no (tjenesteside, 432 ord),
josefsen.no (tips, 613), oase.io (FAQ-artikkel, 898), evidi.com (ordbok, 381), seoweb.no
(tjenesteside, 1 576, FAQ). Wikipedia og snl.no ligger rett under. **På «seo pris»** (70, KD 0):
mediseo.no/pricing (prisliste, alle tre lesninger), så marketin.no, seoalive.com, coperformance.no og
webworld.no (artikler, 898 til 3 005 ord).

- **Alle dekker:** hva SEO er, teknikk, innhold og lenker.
- **Ingen dekker:** pris. Ingen av de fem øverste på «søkemotoroptimalisering» har et kronebeløp i
  rå HTML. På «seo pris» oppgir artiklene spenn fra 5 000 til 200 000 kr i måneden. Vi har fast pris
  fra 2 990 kr i måneden, og AI-sjekken (ble kunden nevnt i ChatGPT og Google AI). To av fem nevner
  AI-søk.
- **Sidetype:** blandet. Tjenestesider og forklaringer side om side, så pengesiden må både forklare
  og selge.

| Side | Søkeord (volum) | Status | Vei videre |
|---|---|---|---|
| **Pengeside:** `/sokemotoroptimalisering` | søkemotoroptimalisering (390, KD 3), seo byrå (320, KD 0), lokal seo (50, KD 0) | finnes, løft nå: tittel «Søkemotoroptimalisering for små bedrifter, fra 2 990 kr/mnd», pris og hva som inngår i første avsnitt | `/kontakt` |
| `/vanlige-sporsmal/hva-koster-seo` | hva koster seo (90, KD 0), seo pris (70, KD 0) | **ny** | `/sokemotoroptimalisering` |
| `/blogg/seo-eller-google-annonser` | SEO mot annonser, «hvorfor er seo dyrt» (GSC 30; 18,0) | finnes | `/sokemotoroptimalisering` |
| `/vanlige-sporsmal/hva-er-sokemotoroptimalisering` | hva er seo (informasjon) | finnes, lenke til pengesiden i første avsnitt | `/sokemotoroptimalisering` |
| `/vanlige-sporsmal/synlig-i-chatgpt-og-ai-sok` | synlig i ChatGPT | finnes | `/sokemotoroptimalisering` |
| `/vanlige-sporsmal/google-bedriftsprofil`, `/blogg/google-min-bedrift` | google bedriftsprofil (GSC 279 + 223) | finnes, to sider på samme søk: velg én | `/sokemotoroptimalisering` |

Veien: `/vanlige-sporsmal/hva-er-sokemotoroptimalisering` → `/vanlige-sporsmal/hva-koster-seo` →
`/sokemotoroptimalisering` → kontakt. Pengesiden skal ha minst like mange lenker inn fra klyngen
som spørsmålssiden, med teksten «søkemotoroptimalisering».

### Klynge 5: Drift og hosting

**De fem øverste på «drift av nettside»** (OpenSEO 10, men Search Console har 159 visninger på
akkurat dette søket og 254 på «drifte nettsider»): redweb.no (WordPress-drift), snilletips.no,
alexweb.no (1 701 ord), reboot.no (byråforside), nettsidedrift.no/priser (prisliste). Vår
spørsmålsside kom på plass 9 i én av tre lesninger.

- **Alle dekker:** sikkerhet, oppdateringer, backup, hosting.
- **Ingen dekker:** en side som ikke trenger plugin-oppdateringer. Tre av de øverste selger
  WordPress-drift, og prisene i utdragene ligger på 490 til 690 kr i måneden (indexdevelopment.no,
  digispace.no, nettsidepartneren.no).
- **Sidetype:** tjenesteside med pris.
- **Lengde:** `/drift` har 360 ord og 3 H2. De øverste ligger på 500 til 1 700.

| Side | Søkeord (volum) | Status | Vei videre |
|---|---|---|---|
| **Pengeside:** `/drift` | drift av nettside (GSC 159), webhosting (140, KD 29) | finnes, løft nå: H1 med «drift av nettside», serviceavtale 550 kr/mnd og hosting inkludert i første avsnitt, flere ord | `/kontakt` |
| `/vanlige-sporsmal/hva-koster-drift-av-nettside` | drifte nettsider, vedlikehold av nettside | finnes, be om ny indeksering (utdraget viser 450) | `/drift` |
| `/sammenlign/wordpress`, ny H2: «Driftsavtale for WordPress, eller en side uten plugins?» | driftsavtale wordpress (GSC 19 + 10 + 9 + 5, plass 9 til 14) | finnes, ny seksjon | `/ny-nettside` |
| `/vanlige-sporsmal/eier-jeg-nettsiden-selv` | (spørsmål) | finnes | `/drift` |

Bunnteksten lenker til `/drift` med teksten «Drift og support», som ingen søker på. Bytt til «Drift
og hosting».

### Nettbutikk: venter på spørsmål 1

`/lage-nettbutikk` og `/vanlige-sporsmal/hva-koster-nettbutikk` har 1 591 visninger på plass 8 til
30, og `/lage-nettbutikk` lenkes fra bunnteksten på alle sider. Selges ikke nettbutikk, bør de to
sidene få `noindex` eller sendes videre, og bunntekstlenken ut. Selges det, trenger klyngen en pris:
`MAL.md` sier «etter omfang», og nettbutikk med varianter og lager er utenfor fastpris.

## Fakta vi mangler fra Aleksander

1. **Nettbutikk:** skal `/lage-nettbutikk` og nettbutikk-spørsmålet ut av Google, eller selger du
   enkle nettbutikker likevel? (Klynge «nettbutikk», 1 591 visninger.)
2. **Bransjer:** hvilke bransjer har faktisk kjøpt, og selger du til håndverkere? Kan Terapihusene,
   Terapihjelp, Lillebekk og Byggeria vises som case? De står ikke under `/arbeid` i dag. (Klynge 3.)
3. **Terapeutsiden:** hvilke timebøker kobler du mot, og kan siden love «ingen Meta-piksel og ingen
   sporing hos Facebook» som fast standard? (Klynge 3.)
4. **Nivåvelger:** vil du ha tre ja/nei-spørsmål på `/priser` som peker på et nivå, selv om
   kalkulatoren ble fjernet fordi prisen settes etter samtalen? (Klynge 1.)
5. **SEO-prisen:** kan `/vanlige-sporsmal/hva-koster-seo` vise SEO fra 2 990 kr/mnd og omskrevet
   SEO-tekst 4 900 kr engangs, og har du en kunde som vil stå med før- og ettertall fra Search
   Console? (Klynge 4.)

## Utenfor siden

- **Krediteringslenker, målt 11.11.2026.** Alle ni kundesider vi målte lenker til oppskalert.no med
  tekst: steinarhusby.no og woxenhage.no («webdesign for bedrifter»), progressivediplomacy.com
  («webdesign i Oslo»), alphanegotiations.com, jtob.no («webdesign for takst- og fagbedrifter»),
  samtaleverkstedet.no, melaniedahl.com, katrinbrubakk.no og toresunderasmussen.no. De fire tomme
  ankertekstene fra `SEO.md` 18.8 er rettet. Neste grep er å la lenketeksten følge bransjen og
  klyngen, slik jtob.no gjør: «nettside for terapeut» på terapeutsidene når klynge 3 finnes.
  terapihjelp.no og terapihusene.no har ingen lenke i rå HTML i dag (terapihusene.no kjører fortsatt
  WordPress). Legg den inn ved lansering, avtalt med kunden.
- **Kataloger.** Fortsatt det AI-svarene siterer mest (`seo/llm-synlighet.json`: techradar,
  sortlist, goodfirms, hostadvice). Teksten ligger klar i `content/katalogprofil.md`. Nytt fra dagens
  søk: gulesider.no og no.trustpilot.com (kategorien «Nettsidedesigner») står på første side for
  «nettsideleverandør», og proff.no på plass 10. Valg for Aleksander: gulesider, Trustpilot og
  proff i tillegg til de fem utenlandske. Sortlist-grepene fra `SEO.md` 19.8 (flere kategorier,
  arbeider, omtaler) står uåpnet.
- **Google-profil.** «nettsideleverandør» viser kartpakken i alle tre lesninger. Sjekk at profilen
  har kategorien Webdesigner og lenker til `/priser`, og at omtalene (4,9 på siden) står der.
- **Parasite-testen** er utenfor siden og går til 25.11. Ingenting her endrer den.

## Måling

**Dag 1 (11.11.2026):** Search Console-filen over (90 dager), `funn.md` 9.11 (28 dager: 46 klikk,
11 801 visninger, snittplass 42,7), og testens dag 0-tabell. Plass per pengeside i dag:

| Klynge | Pengeside | Søk | Plass i dag (90 d) |
|---|---|---|---|
| 1 | `/priser` | nettside pris | 76,6 snitt (testen) |
| 2 | `/` | hjemmeside | 12,8 |
| 3 | `/nettside-for-terapeut` | nettside for terapeut | ikke på side 1 (testen) |
| 4 | `/sokemotoroptimalisering` | søkemotoroptimalisering | 74,0, på spørsmålssiden |
| 5 | `/drift` | drift av nettside | 40,7, på spørsmålssiden |

**Ny måling:**

- **25.11.2026:** testens dag 14. Først etter den rører vi klynge 1 og lager terapeutsiden.
- **4 uker etter publisering** av hver klynge: plass, visninger og klikk på pengesidens søk, og om
  Google har byttet til pengesiden (punkt 4 og 5 i tabellen over er det viktigste tegnet).
- **12 uker:** det samme, pluss henvendelser fra «Få et gratis utkast» per landingsside i
  ringeappen, og de seks AI-promptene fra `SEO.md` punkt 9.
- Be om indeksering i Search Console for hver endret side samme dag (punkt 8 i
  `underside-oppskrift.md`).

## Usikkert

- `/kalkulator`-tallene kan være fra før 30.9. Search Console-filen er ikke delt på dato.
- OpenSEO-volumet for «drift av nettside» (10) og Search Console (159 visninger) spriker. Jeg har
  brukt Search Console der de er uenige.
- Søkeresultatene er lest uinnlogget på mobil gjennom OpenSEO, ikke på google.no i Chrome.
  Testmålingen bruker Chrome, så plassene er ikke direkte sammenlignbare.
- Ordtall på konkurrentsidene er målt i rå HTML. Sider som bygges med JavaScript kan være lengre
  enn tallet sier.
