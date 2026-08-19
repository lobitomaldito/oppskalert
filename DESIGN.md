---
name: Oppskalert
description: A colorless shell for a founder-led Norwegian web agency; every color on the page comes from the client work on display, except one deliberate signature dot.
colors:
  felt: "#e6e5f6"
  felt-dyp: "#dcdaf1"
  felt-kant: "#cbc9e4"
  hvit: "#ffffff"
  blekk: "#12111d"
  blekk-flate: "#1c1a2b"
  blekk-kant: "#2e2b42"
  blekk-mykt: "#5c5a70"
  kritt: "#f3f2fb"
  kritt-mykt: "#a09eb8"
  prikk: "#b8551a"
  prikk-lys: "#ffb17a"
typography:
  wordmark:
    fontFamily: "'Merke', system-ui, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.035em"
    textTransform: lowercase
    lineHeight: 1
  hero:
    fontFamily: "'Suisse', system-ui, sans-serif"
    fontWeight: 700
    fontSize: "clamp(2.0625rem, 8.4vw, 5.25rem)"
    lineHeight: 1
    letterSpacing: "-0.04em"
  page-heading:
    fontFamily: "'Suisse', system-ui, sans-serif"
    fontWeight: 700
    fontSize: "clamp(2rem, 5.2vw, 3.75rem)"
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  section-heading:
    fontFamily: "'Suisse', system-ui, sans-serif"
    fontWeight: 700
    fontSize: "clamp(1.5rem, 3.2vw, 2.375rem)"
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  title:
    fontFamily: "'Suisse', system-ui, sans-serif"
    fontWeight: 600
    fontSize: "1.0625rem"
    letterSpacing: "-0.012em"
  body:
    fontFamily: "'Suisse', system-ui, sans-serif"
    fontWeight: 400
    fontSize: "clamp(0.9375rem, 0.3vw + 0.875rem, 1rem)"
    lineHeight: 1.6
  label:
    fontFamily: "'Suisse', system-ui, sans-serif"
    fontWeight: 400
    fontSize: "0.8125rem"
    letterSpacing: normal
    textTransform: none
  quote:
    fontFamily: "'SectraFine', Georgia, serif"
    fontWeight: 400
    fontSize: "clamp(1.25rem, 2.9vw, 2rem)"
    lineHeight: 1.34
    letterSpacing: "-0.018em"
  price:
    fontFamily: "'SectraFine', Georgia, serif"
    fontWeight: 400
    fontSize: "clamp(2.25rem, 4.5vw, 3rem)"
    lineHeight: 1
    letterSpacing: "-0.025em"
rounded:
  base: "14px"
  lg: "22px"
  full: "999px"
spacing:
  maks: "78rem"
  kant: "clamp(1.25rem, 5vw, 3.5rem)"
  luft: "clamp(5rem, 10vw, 9rem)"
components:
  button:
    backgroundColor: "{colors.blekk}"
    textColor: "{colors.kritt}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.25rem"
  button-hover:
    backgroundColor: "{colors.hvit}"
    textColor: "{colors.blekk}"
  button-on-dark:
    backgroundColor: "{colors.kritt}"
    textColor: "{colors.blekk}"
    hoverBackgroundColor: "{colors.prikk-lys}"
  pill:
    backgroundColor: transparent
    textColor: "{colors.blekk-mykt}"
    border: "1px solid {colors.felt-kant}"
    rounded: "{rounded.full}"
    padding: "0.5rem 0.95rem"
  card-service:
    backgroundColor: "{colors.hvit}"
    rounded: "{rounded.base}"
    padding: "clamp(1.5rem, 2.5vw, 2rem)"
  card-price:
    backgroundColor: "{colors.hvit}"
    rounded: "{rounded.base}"
    border: "1px solid transparent, {colors.blekk} when featured"
  card-testimonial:
    backgroundColor: "{colors.blekk}"
    textColor: "{colors.kritt}"
    rounded: "{rounded.lg}"
  panel-fact:
    backgroundColor: "{colors.felt}"
    rounded: "{rounded.lg}"
  browser-frame:
    backgroundColor: "{colors.hvit}"
    rounded: "{rounded.base}"
    shadow: "0 0 0 1px rgba(18,17,29,.09), 0 1.25rem 2.5rem -1.5rem rgba(18,17,29,.28)"
  footer:
    backgroundColor: "{colors.blekk}"
    textColor: "{colors.kritt}"
---

# Design System: Oppskalert

## 1. Overview

**Dette dokumentet beskriver systemet som gjelder fra 19. august 2026.**
Det forrige systemet, «Midnattsverkstedet» (mørk aubergine `#201335`, elfenben,
fersken), er lagt ned. Finner du referanser til midnattsverksted, dusty grape
eller banana cream andre steder i kodebasen eller i eldre notater, er de
utdatert. Denne fila beskriver kun det som faktisk står i `src/index.css`.

**Creative North Star: Det fargeløse skallet.** Malen er hentet fra det
nederlandske designstudioet mammutstudios.com (se
`inspirasjon/demo-studio-mal.md`). Hele siden veksler mellom ett blekt
periwinkle-felt (`#e6e5f6`) og rent hvitt. Ingen aksentflater, ingen
gradienter, ingen fargede kort. Skallet er bevisst dempet ned til to
nøytraler og ett blekk, fordi jobben til Oppskalert er å bygge sider for
andre, og de sidene skal være det eneste med farge på skjermen.

Sitat fra designnotatet, som er selve grunnlaget for alt i denne fila:

> Ingen aksentfarge. All farge på siden kommer fra kundearbeidet, som er den
> eneste fargen som beviser noe.

Mørkt forekommer nøyaktig tre steder på hele siden: bunnteksten (`.bunn`),
sitatkortet (`.sitatkort`) og fylte knapper (`.knapp`, som som standard har
mørk bakgrunn uansett hvilken seksjon de står i). Utenfor de tre stedene er
`--blekk` alltid tekst, aldri bakgrunn.

**Nøkkelegenskaper:**
- Ett blekt nøytralt felt og ett hvitt, ingen tredje flate
- Ingen aksentfarge i skallet, kundeskjermbildene bærer all fargen
- Ett signaturgrep: punktumet i ordmerket, i to verdier fordi det ene faller
  under lesbar kontrast på det andre feltet
- Flatt som standard: dybde kommer av tone og kant, skygge er reservert to
  steder
- Suisse Int'l bærer nesten all tekst, GT Sectra Fine rasjonert til to steder

## 2. Colors

> **Tokens.** Paletten finnes i to former med vilje. Hex-navnene (`--felt`,
> `--blekk`) er demoens egne og brukes av komponentklassene i
> `@layer components`. RGB-triplene (`--bg`, `--ink`, `--room`, `--room-ink`,
> `--surface`) er de Tailwind leser gjennom `tailwind.config.js`, slik at
> utility-klassene på de andre rutene treffer samme palett. Endres en farge,
> må begge former endres, de er ikke koblet automatisk. Se seksjon 6 for hele
> Tailwind-koblingen.

### Feltet
- **Felt** (`#e6e5f6`): standard sidebakgrunn. **15,0:1** kontrast mot blekk tekst.
- **Felt-dyp** (`#dcdaf1`): vannmerketonen bak hero-overskriften, og den dype
  varianten av feltet i priskalkulator og lignende.
- **Felt-kant** (`#cbc9e4`): hårfine kanter på piller, kort og lister på det
  lyse feltet.
- **Hvit** (`#ffffff`): løftede flater. Tjenestekort, priskort, dropdown-menyen
  og nettleserrammene rundt kundeskjermbildene.

### Blekket
- **Blekk** (`#12111d`): standard tekstfarge på feltet og på hvitt, **15,0:1**
  på felt. Samme verdi er også den ENESTE bakgrunnsfargen i de tre mørke
  sonene (bunntekst, sitatkort, fylte knapper). Blekk bytter altså jobb alt
  ettersom hvor den står, aldri begge samtidig i samme setning.
- **Blekk-flate** (`#1c1a2b`): en anelse lysere enn blekk, brukt inni de mørke
  sonene selv (f.eks. hover på sitatkortets pilknapper), for å gi dem egen
  dybde uten å forlate mørket.
- **Blekk-kant** (`#2e2b42`): hårfine kanter inni de mørke sonene.
- **Blekk-mykt** (`#5c5a70`): dempet tekst på feltet og på hvitt. **5,4:1** på
  felt, godkjent for løpende tekst.

### Kritt
- **Kritt** (`#f3f2fb`): lys tekst, kun på mørk bakgrunn. **16,8:1** på blekk.
- **Kritt-mykt** (`#a09eb8`): dempet lys tekst, kun på mørk bakgrunn. **7,2:1**
  på blekk.

### Punktumet, den ene aksenten
- **Prikk** (`#b8551a`, clay): punktumet i ordmerket når det står på det lyse
  feltet.
- **Prikk-lys** (`#ffb17a`, peach): punktumet når ordmerket står på mørk
  bakgrunn (bunntekst, sitatkort). To verdier av samme grunn: fersken faller
  til **1,4:1** på det blekke feltet og blir praktisk talt usynlig der, clay
  gjør ikke det.

### Navngitte regler

**Ingen-aksent-regelen.** Det finnes ingen aksentfarge i skallet. All farge på
siden kommer fra kundearbeidet som vises fram, i nettleserrammene på
arbeidssiden og forsiden. Punktumet i ordmerket er det ENESTE unntaket, og det
er et bevisst, rasjonert signaturgrep, ikke en åpning for mer farge andre
steder. Legg aldri til en fargeflate, en gradient eller en farget kant i
skallet selv. Beviset skal komme fra jobben, ikke fra byrået. Se seksjon 5 for
det fulle bildet av hvor punktumfargen faktisk brukes i koden i dag, for det
er noen flere steder enn selve ordmerket.

**Kritt-fellen.** `--kritt` (og Tailwind-klassene `text-ink` / `text-primary`,
som peker på samme token) er lys tekst, og den er KUN riktig på mørk bakgrunn.
På det lyse feltet er den praktisk talt usynlig: kritt på felt gir en
kontrast langt under lesbar terskel. Denne nøyaktige feilen ble gjort under
redesignet og ga **21 målte kontrastbrudd på én og samme side**, fordi
`text-ink`/`text-primary` ble brukt på komponenter som i virkeligheten stod
på det lyse feltet, ikke på mørk bunn. Sjekk alltid hvilken bakgrunn en
komponent faktisk står på før du velger tekstfarge. Riktig lys-felt-par er
`text-room-ink` (se seksjon 6), ikke `text-ink` eller `text-primary`.

## 3. Typography

**Suisse Int'l** (Swiss Typefaces, vekt 300/400/600/700, selvhostet fra
`public/fonts/`) bærer nesten all tekst på siden: overskrifter, ingress,
brødtekst, knapper, etiketter, navigasjon. Kontrast lages med vekt og
størrelse, ikke med flere familier.

**GT Sectra Fine** (Grilli Type) slipper til nøyaktig to steder: sitatet i
`.sitatkort blockquote` og pristallene i `.pris .tall`. Aldri et tredje sted.
Det er det eneste antikva-innslaget på hele siden, og det er rasjonert med
vilje slik at det beholder vekten av et unntak.

**Plus Jakarta Sans, vekt 800** er låst til ordmerket alene, under
CSS-navnet `Merke`. Den brukes ingen andre steder på siden.

`font-synthesis: none` står satt globalt på `body`. Ingen falsk halvfet eller
kursiv noe sted, siden Suisse er levert som faste vektfiler og ikke en
variabel font.

**Lisenssperre.** Suisse Int'l og GT Sectra Fine, slik filene ligger i
`public/fonts/` nå, er ikke lisensiert for kommersiell bruk. Se
`FONTLISENS.md` i repo-roten og advarselen øverst i `src/index.css`. Dette er
en byggesperre for hele branchen, ikke bare en fotnote her.

### Hierarki
- **Wordmark** (Merke, 800, lowercase, tracking −0,035em): «oppskalert.» i
  toppnavigasjon og bunntekst, samt vannmerket blåst opp bak hero-h1.
- **Hero** (Suisse, 700, `clamp(2,0625rem, 8,4vw, 5,25rem)`, line-height 1,
  tracking −0,04em): forsidens h1 alene.
- **Sidetopp** (Suisse, 700, `clamp(2rem, 5,2vw, 3,75rem)`, line-height 1,02,
  tracking −0,038em): h1 på undersider som `/arbeid`, `/priser`.
- **Seksjonsoverskrift** (Suisse, 700, `clamp(1,5rem, 3,2vw, 2,375rem)`,
  line-height 1,12, tracking −0,028em): h2 i introduksjon, seksjonstopp, FAQ.
- **Tittel** (Suisse, 600, 1,0625rem, tracking −0,012em): kortoverskrifter i
  tjenestekort.
- **Brødtekst** (Suisse, 400, `clamp(0,9375rem, 0,3vw + 0,875rem, 1rem)`,
  line-height 1,6): all løpende tekst.
- **Etikett** (Suisse, 400, 0,8125rem, ingen sperring, ingen VERSALER): status-
  piller, brødsmuler, kort metatekst.
- **Sitat** (SectraFine, 400, `clamp(1,25rem, 2,9vw, 2rem)`, line-height 1,34,
  tracking −0,018em): kun testimonial-sitatet.
- **Pristall** (SectraFine, 400, `clamp(2,25rem, 4,5vw, 3rem)`, line-height 1,
  tracking −0,025em): kun tallet i priskortene, valutategn og periode ved
  siden av står i Suisse.

### Navngitte regler

**SectraFine er rasjonert.** Antikvaen får to og bare to jobber: sitatet og
pristallet. Legg den aldri på en overskrift, en knapp eller en etikett.
Overforbruk fjerner nøyaktig den vekten unntaket har i dag.

**Ingen sperret VERSAL-eyebrow.** Etiketter (`.etikett`) står med vanlig
bokstavform og en liten prikk foran, aldri i sperret store bokstaver. Det er
et bevisst brudd med det forrige systemet og med den generiske «byrå-siden»-
looken forøvrig.

## 4. Elevation

Flatt som standard. Dybde kommer av tone (hvitt kort på blekt felt) og
hårfine kanter (`--felt-kant`, `--blekk-kant`), ikke av en skyggeskala.
Tjenestekort, priskort, faktapanelet og sitatkortet har alle null skygge i
hviletilstand.

Kun to komponenter har en ekte `box-shadow`, og begge har en fysisk grunn til
det:

- **Nettleserrammen** (`.ramme`, rundt kundeskjermbildene):
  `0 0 0 1px rgba(18,17,29,.09), 0 1,25rem 2,5rem -1,5rem rgba(18,17,29,.28)`
  i ro, dypere på hover sammen med et løft på `-4px`. Den fortjener skyggen
  fordi den fremstiller et ekte, fysisk nettleservindu.
- **Dropdown-menyen** (`.meny-liste`, mobilnavigasjonen):
  `0 1,5rem 3rem -1,5rem rgba(18,17,29,.35)`. Den fortjener skyggen fordi den
  bokstavelig talt flyter over resten av siden.

### Navngitt regel

**Fortjent skygge.** En `box-shadow` er reservert de to stedene noe faktisk
er løftet fysisk over resten av flaten: skjermbilde-rammen og en flytende
meny. Trenger et flatt innholdskort mer hierarki, er svaret en kant eller en
tonevalg, ikke en skygge.

## 5. Components

### Knapper
Én komponent, `.knapp`, pille-formet (`border-radius: 999px`) og lik overalt
i markup. Som standard er bakgrunnen `--blekk` og teksten `--kritt`, altså en
mørk pille selv på det lyse feltet: dette er en av de tre stedene mørkt
faktisk vises. På hover glir en hvit flate opp bakfra (`translateY(101% → 0)`
på 0,4s) og teksten går til blekk. Står knappen inni en mørk seksjon
(`.paa-blekk`), snus paletten: bakgrunn kritt, tekst blekk, og hover-flaten
blir `--prikk-lys` i stedet for hvit, altså punktumfargen igjen.

### Piller og etiketter
`.pille` er en tynn, kantet pille med en liten pulserende prikk foran
(`.lys`, `puls` 2,6s), brukt til statuslinjer («Se mer ↓», kapasitetsvisning).
Prikken bruker `--prikk` på lyst felt og `--prikk-lys` på mørkt. `.etikett`
er samme idé uten kant: en liten fylt prikk foran vanlig, usperret tekst.

### Navigasjon
`.topp` er sticky, feltfarget (ikke frostet glass som i forrige system), med
lenker som får en tynn understrek på hover og aktiv side. Under 56rem
kollapser lenkene til en rund menyknapp (`.meny`) som åpner en hvit
dropdown med skygge (se seksjon 4).

### Hero
Sentrert og innholdshøy, ikke skjermhøy. `.hero` har ingen `min-height:
100vh` noe sted i CSS-en, høyden er ren padding
(`clamp(3,5rem, 8vw, 7rem)` topp, `clamp(2rem, 4vw, 3rem)` bunn). Bak
overskriften ligger ordmerket blåst opp til vannmerke i `--felt-dyp`
(`.vannmerke`), IKKE i punktumfargen: `.vannmerke i { color: inherit }`
overstyrer punktum-regelen med vilje, fordi et 23rem-stort oransje punktum
ville blitt en fargeklosse midt i heroen. Det er det ene stedet aksenten
bevisst blir nøytralisert igjen.

### Kort
Tre kortvarianter, alle på hvitt (`--hvit`) mot det blekke feltet, alle uten
skygge i ro:
- **Tjenestekort** (`.tjeneste`): 14px-radius, kant som dukker opp først på
  hover.
- **Priskort** (`.pris`): samme radius, fremhevet variant får en 1px
  blekk-kant, aldri en aksentkant.
- **Faktapanel** (`.fakta`, på case-sider): 22px-radius, bakgrunn `--felt`
  i stedet for hvitt, altså den eneste kortformen som IKKE er hvit.

### Sitatkort
`.sitatkort` er den andre av de tre mørke sonene: bakgrunn blekk, tekst
kritt, 22px-radius. Selve sitatet står i GT Sectra Fine. Karuselknappene
bruker `--blekk-flate` og `--blekk-kant` for egen dybde inni det mørke
kortet.

### Nettleserramme (arbeid)
`.ramme` er stedet all faktisk farge på siden kommer fra: et hvitt, skygget
vindu som ruller sakte gjennom et ekte fullsides skjermbilde av
kundeprosjektet. Se seksjon 4 for skyggeverdien. Dette er selve beviset
ingen-aksent-regelen bygger på.

### Nummerert liste, to bruksmåter
`.nummerert` brukes to steder med to ulike regler. På forsidens
introduksjonsliste er markørene ORD (Arbeid, Pris, Prosess, Neste), ikke tall,
fordi listen er navigasjon og ikke en sekvens. På `/metode` beholder samme
komponent varigheter som markør («3 virkedager», «1–2 uker»), fordi der ER
det en ekte rekkefølge. `(01) (02) (03)`-tallmarkører som ren pynt er en
anti-referanse, se `PRODUCT.md`, og ble aktivt fjernet fra forsiden under
redesignet av nøyaktig denne grunnen.

### Bunntekst
Den tredje mørke sonen. `.bunn` er blekk med kritt-tekst, og avsluttes med
ordmerket i full bredde, skalert med `clamp()` i vw og beskåret av sidekanten.
CTA-lenken (`.bunn-post`) får en punktum-farget understrek på hover.

### Punktum-regelen: den fulle sannheten

Punktumet i ordmerket er systemets ENESTE tiltenkte aksentbruk, og det skal
forbli slik i alt nytt arbeid. Men et grep gjennom `src/index.css` viser at
tokenet `--prikk` / `--prikk-lys` i dag faktisk brukes fire steder, ikke ett:

1. `.merke i`, ordmerkets eget punktum, lyst felt (clay)
2. `.paa-blekk .merke i`, samme punktum på mørk bunn (peach)
3. `.pille .lys`, den pulserende statusprikken (samme signaturgrep i
   miniatyr, ikke en ny fargeflate)
4. `.paa-blekk .knapp::before`, hover-flaten på knapper i mørke seksjoner
   (peach i stedet for hvit)
5. `.bunn-post:hover`, punktum-farget understrek på bunntekstens CTA-lenke

De fire siste er varianter av samme idé (en liten, levende detalj eller et
hover-avslør), ikke en ny, selvstendig aksentbruk, men de bør stå oppført her
slik at en fremtidig økt som griper etter `var(--prikk-lys)` vet at flere
steder allerede bruker den, i stedet for å anta at ordmerket er alene om det.

## 6. Tailwind-kobling

Kodebasen bruker både rene CSS-klasser fra `@layer components` (`.knapp`,
`.pille`, `.tjeneste` osv.) og Tailwind-utilities på de sidene som ikke er
bygget om ennå. Tailwind-navnene fra forrige system er beholdt, men pekes nå
om til den nye paletten via `rgb(var(--x) / <alpha-value>)` i
`tailwind.config.js`:

| Tailwind-klasse | RGB-token | Faktisk farge | Riktig kontekst |
| --- | --- | --- | --- |
| `bg-background`, `bg-deep` | `--bg`, `--bg-deep` | blekk | mørk bakgrunn |
| `text-primary`, `text-ink`, `darkText` | `--ink` | kritt | tekst KUN på mørk bakgrunn |
| `bg-room`, `bg-room-deep` | `--room`, `--room-deep` | felt / felt-dyp | lys bakgrunn |
| `text-room-ink` | `--room-ink` | blekk | tekst på lys bakgrunn |
| `bg-surface` | `--surface` | hvit | løftede kort |
| `text-accent`, `bg-accent` | `--signal` | prikk-lys | definert, men ikke i bruk i JSX ennå, punktumet styles i dag av `.merke`-klassen direkte |
| `text-room-signal` | `--room-signal` | prikk | samme, definert men ubrukt i JSX |
| `highlight` | `--signal-hi` | banana cream, `#fce762` | arv fra forrige system, ikke i bruk i det nye |

Tommelfingerregel: **mørk-par og lys-par bytter aldri plass**. `bg-background`
hører sammen med `text-primary`/`text-ink`. `bg-room` og `bg-surface` hører
sammen med `text-room-ink` (eller bare vanlig `.blekk`-arvet tekstfarge, som
er default på `body`). Se kritt-fellen i seksjon 2 for hva som skjer når de
blandes.

### Kjent Tailwind-feil: `/8` og `/12`

Vilkårlige opasitetsbrøker `/8` og `/12` kompilerer stille til HELT
gjennomsiktig i dette prosjektet, verifisert med en isolert build-test.
`/5`, `/10`, `/15`, `/20`, `/40`, `/70` og `/80` fungerer som forventet. Bruk
aldri `/8` eller `/12` på en fargeklasse her, verken på `bg-*/opacity` eller
`text-*/opacity`. Skal du ha en opasitet i det området, bruk `/10` eller `/15`
i stedet og juster om nødvendig.

## 7. Do's and Don'ts

### Gjør:
- **Hold skallet fargeløst.** To nøytraler og ett blekk. All farge kommer fra
  kundeskjermbildene i nettleserrammene (ingen-aksent-regelen).
- **Sjekk bakgrunnen før du velger tekstfarge.** `--kritt` / `text-ink` /
  `text-primary` er kun for mørk bunn. Bruk `text-room-ink` eller arvet
  `.blekk`-tekst på feltet og på hvitt (kritt-fellen).
- **Ration GT Sectra Fine** til sitatet og pristallet. Ikke et tredje sted.
- **Bruk ord, ikke tall, som markør** i en navigasjonsliste. Tall er kun
  riktig når listen er en ekte sekvens med varighet, som på `/metode`.
- **Bruk skygge kun på nettleserrammen og dropdown-menyen.** Alt annet får
  dybde av tone og kant.
- **Bruk `/10` eller `/15` i stedet for `/8` eller `/12`** på opasitetsbrøker,
  se den kjente Tailwind-feilen i seksjon 6.

### Ikke:
- **Ikke legg til en aksentflate, gradient eller fargekant** i skallet selv.
  Punktumet i ordmerket er det eneste unntaket, og det er allerede rasjonert
  helt til kanten, se seksjon 5.
- **Ikke bruk `text-ink`/`text-primary` på det lyse feltet eller på hvite
  kort.** Dette produserte 21 målte kontrastbrudd på én side under
  redesignet.
- **Ikke sperr etiketter i VERSALER.** `.etikett` bruker vanlig bokstavform
  med en liten prikk foran.
- **Ikke deploy denne branchen** før Suisse Int'l og GT Sectra Fine er
  lisensiert og filene i `public/fonts/` byttet ut. Se `FONTLISENS.md`.
- **Ikke bruk `/8` eller `/12`** på en opasitetsbrøk i Tailwind i dette
  prosjektet, de kompilerer til usynlig.
