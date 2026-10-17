# increo.no

Analysert 16. august 2026. Målt i headless Chromium på 1440 og 375 px bredde,
forside, `/arbeider` og case-siden `/arbeider/posten-moderne`.

**Hva det er:** teknologi- og designbyrå i Oslo og Trondheim, del av 99x
(600 ansatte). Kunder i logostripa: Britannia, Santander, Nikita, XXL,
Helsedirektoratet, Brasport. Bygget i Webflow.

**Hvorfor det er relevant for oss:** de selger til et helt annet segment enn
oss, så posisjoneringen er ubrukelig. Håndverket er ikke det. Siden løser tre
problemer vi også har: hvordan en mørk hero slipper å se generisk ut, hvordan
en seksjon får hierarki uten eyebrow-etikett, og hvordan en referanseportefølje
beviser noe i stedet for å pynte.

---

## 1. Det som gjør siden god

### 1.1 Én aksentfarge gjør hele jobben

Hele paletten, hentet fra CSS-variablene deres:

| Rolle | Verdi | Brukt til |
| --- | --- | --- |
| Base | `#133e34` | Hero, mega-meny, mørke seksjoner, all brødtekst på lyst |
| Base mørkere | `#0c3127` | Dybde i mørke flater |
| Mellomgrønn | `#115846` | Seksjonen med referansekortene |
| **Aksent** | `#2eecc7` | Alle knapper, alle tag-piller |
| **Aksent lys** | `#43f6d3` | H1 |
| Pust | `#f9f3ef` | Lyse band som bryter det mørke |
| Grå | `#f2f4f7` | Teknologi-seksjonen, logostripa |

Det er det. Ingen sekundær aksent, ingen gradient, ingen tredje merkevarefarge.
Fordi bare én farge er lys og mettet, trenger ingen knapp å rope: øyet finner
den uansett hvor den står.

Vi har to konkurrerende aksenter i `DESIGN.md` (`sandy-brown #ffb17a` og
`banana-cream #fce762`). To varme aksenter i samme temperatur betyr at ingen av
dem eier CTA-en.

### 1.2 H1 er farget, ikke hvit

Det enkleste og mest effektive grepet på hele siden. H1 står i mint `#43f6d3`
på mørk grønn `#133e34`, ikke i hvitt.

Effekten: heroen leses som merkevaren i stedet for «enda en mørk hero med hvit
tekst». Og kontrasten holder godt, jeg regnet den ut: **rundt 8,7:1**, altså
langt over AA. Knappene (`#133e34` på `#2eecc7`) ligger på **rundt 7,9:1**.

Grepet er gratis å kopiere og vi har fargene til det allerede.

### 1.3 Et redaksjonelt to-kolonners rutenett er ryggraden

Hver eneste seksjon på forsiden følger samme mal:

```
[ venstre kolonne ]        [ høyre kolonne ]
seksjonsoverskrift         selve innholdet
(38,4 px, vekt 700)        (liste, piller, tekst)
```

«Dette kan vi», «Noen av områdene vi jobber med», «Arbeider vi har gjort»,
«Teknologi vi bruker», «Artikler»: alle like. Den tomme venstrekolonnen er
ikke sløsing, den er selve hierarkiet. Overskriften er alene om plassen sin,
så den trenger ingen etikett over seg for å lese som en overskrift.

**Dette er svaret på anti-referansen vår.** `PRODUCT.md` sier at eyebrow over
hver seksjon skal vekk. Increo viser hva som erstatter den: posisjon.

Artikkellista tar det ett hakk lenger og kjører tre kolonner: lite bilde til
venstre, tittel og ingress i midten, kategorimerke i bitteliten skrift helt ute
til høyre. Kategorien er tilgjengelig uten å ta noe oppmerksomhet.

### 1.4 Referansekortene bærer kundens farge, ikke byråets

Hvert kort er en fargeflate med en enhetsmockup som ligger oppå:

- Ecura: mørk grønn
- Posten Moderne: korall
- Eplehuset ElevMac: blå
- Urmaker Bjerke: fotografi

Fargen er kundens, ikke Increos grønn. Porteføljen ser derfor ut som en
portefølje av *forskjellige* merkevarer, som er akkurat det et byrå skal bevise.
Increos egen grønn trekker seg unna i den seksjonen.

Rutenettet er asymmetrisk og bytter side per rad: smalt kort til venstre og
bredt til høyre i første rad, motsatt i andre. Det bryter rutenett-monotonien
uten et eneste triks, bare med to kolonnebredder.

Sirkulær pilknapp nede til høyre på hvert kort. Ingen «Les mer»-lenke.

### 1.5 Case-malen har en ryggrad

`/arbeider/posten-moderne`, rekkefølge nedover:

1. Brødsmuler: `Arbeider | tittel`
2. Kundenavn som eyebrow, H1 i venstre kolonne, ingress i høyre
3. Hero-bilde i kundens farge, avrundede hjørner
4. Smal brødtekstkolonne, forskjøvet mot høyre, med lenker i løpeteksten
5. **Grå faktapanel: «Dette har vi gjort» / «Teknologi» / «Besøk nettsted»**
6. Mørkegrønn seksjon: «Utfordringen: ...»
7. Hvit seksjon: «Løsningen: ...»
8. Avslutning: rundt portrettbilde, «Snakk med Sebastian Krohn», e-post og
   telefon som klikkbare brikker, og skjema rett under

Faktapanelet i punkt 5 er det smarteste elementet på siden. Det betjener tre
ting samtidig: den som skanner får svaret på to sekunder, kjøperen får
teknologivalgene svart på hvitt, og hver lenke er intern lenking til
tjenestesidene. Vi har ingenting som gjør den jobben.

Avslutningen i punkt 8 er også rett for oss, og hos oss enda mer naturlig:
Aleksander *er* den ene personen, ikke én av mange konsulenter.

### 1.6 Lead-magneten står som element nummer to

Rett under heroen, i et lyst band som bryter det mørke:

> Strategisk mulighetsverksted - Gratis workshop
> **Få klarhet i det digitale prosjektet ditt på bare to timer**

Samme mekanikk som vår «Bestill gratis demo», men skarpere på to punkter: den
setter en **varighet** (to timer) og lover et **utfall** (klarhet), ikke bare et
produkt. Det senker terskelen mer enn ordet «gratis» gjør alene.

Plasseringen er poenget: den kommer før tjenestene, før referansene, før alt.

### 1.7 Showreel i stedet for stockfoto

Heroen avsluttes med et stort avrundet kort som spiller en showreel-video av
ekte kundesider i bevegelse. `autoplay`, `loop`, `muted`, `playsinline`, og en
**synlig pauseknapp** nede til høyre.

To ting: det er bevis i stedet for pynt, og pauseknappen er en
tilgjengelighetsdetalj de fleste byråer hopper over. (De har samtidig glemt
`prefers-reduced-motion` helt, se punkt 2.2.)

### 1.8 Interstate som eneste skrift

Interstate (Tobias Frere-Jones, tegnet etter amerikansk motorveiskilting) via
Adobe Typekit. Åpne buer, høy x-høyde, litt sær `a` og `g`. Leser som
konstruert, ikke som moteriktig, og er hverken Inter eller DM Sans.

Prisen: **12 separate fontfiler, rundt 230 kB**, fra tredjepart, bak et
render-blokkerende Typekit-script. Vi hoster selv og trenger ikke betale den.

Nærmeste i vårt eget bibliotek på uttrykk: `archivo`, `schibsted-grotesk`,
`familjen-grotesk`. Ingen av dem er en kopi, men de sitter i samme
konstruerte-grotesk-familie.

### 1.9 Typeskalaen kollapser rent

| | 1440 px | 375 px |
| --- | --- | --- |
| H1 | 83,2 / 104 px, vekt 700 | 38,4 / 48 px |
| H2 seksjon | 38,4 / 53,8 px, vekt 700 | |
| H2 mindre | 32 / 38,4 px | |
| H3 kort-eyebrow | 16 / 22,4 px, vekt 500 | |
| Brødtekst | 18 px | 18 px |

Mobil-H1 er nøyaktig samme størrelse som desktop-H2. Det finnes i praksis bare
to overskriftsstørrelser i systemet. Hamburgeren måler 54 × 44 px, altså over
minstemålet for berøring.

### 1.10 Detaljer verdt å merke seg

- **Mega-menyen** er full bredde og samme mørkegrønn som heroen, så den føles
  som en forlengelse av siden. Tre kolonner, der de **to tjenestene de helst
  vil selge får en beskrivelse** og resten er nakne lenker. Hierarki i menyen.
- **Hjørneradius** er systematisert: `40px` på store flater, `14px` på små,
  `26px` (pille) på knapper.
- **Seksjonsluft** er bare 80 px topp og bunn, mye strammere enn vår
  `6rem`/`8rem`. Det funker fordi rutenettet bærer hierarkiet.
- **Knappene** er piller, `#2eecc7` med mørk grønn tekst, `10px 24px`,
  18 px / vekt 500, alltid med en pil `→`. Overgang `0.2s`.
- **Undersider** starter med et kort mørkegrønt band (H1 + ett avsnitt), ikke
  en full skjermhøyde. Kortene under bryter overgangen mellom mørkt og lyst.
- **Tittel og H1 er ulike** på case-siden. Title er spørsmålsformet («Hvordan
  Increo utviklet teknologien bak kunstmuseet PoMo»), H1 er redaksjonell. Det
  er bevisst AEO-arbeid, og de har en artikkel om nettopp det på forsiden.
- **hreflang** no/en med et komplett engelsk speil på `/en/work/...`.

---

## 2. Det jeg ikke ville kopiert

### 2.1 Sporingsstakken

Målt på forsiden: **80 forespørsler**, og disse tredjepartene lastes:

Google Tag Manager, GA4, Facebook Pixel (400 kB utpakket, den tyngste enkeltfila
på siden), Hotjar, Intellimize, Cookie Information, HubSpot-skjema, SuperOffice,
jQuery 3.5.1.

Samtidig sier cookie-teksten «Vi tar personvern på alvor». Vi kjører PostHog og
ingenting annet. Det skal det fortsette å være, og det er et salgsargument i
seg selv.

### 2.2 Null `prefers-reduced-motion`

Jeg gikk gjennom alle stilark på siden: **null** media queries for
`prefers-reduced-motion`. Alle scroll-avsløringer og videoen kjører uansett hva
brukeren har bedt om i systeminnstillingene.

`PRODUCT.md` krever det motsatte av oss: et alternativ for hver animasjon.

### 2.3 Alt-tekst

**11 av 20 bilder** på PoMo-casen mangler `alt`.

### 2.4 Tynn strukturert data

Bare `Organization`-JSON-LD, ingen `Article` eller `CreativeWork` på
case-sidene. Vi ligger foran her allerede. Dessuten dobbel `og:image` på casen.

### 2.5 Webflow-gjeld synlig i markupen

Klassenavn som `div-block-107`, `text-block-73`, `div-block-arbeider`, og en
komplett Untitled UI-palett (grå 50 til 900 pluss lilla `#7f56d9`) som ligger
igjen i CSS-variablene uten å brukes. Stilarket er på 213 kB. En mal som aldri
ble ryddet.

---

## 3. Konkret å ta med inn i redesignet

Rangert. De fem første er de som faktisk endrer hvordan siden ser ut.

**Gjør:**

1. **Kutt til én aksentfarge.** Velg mellom `sandy-brown` og `banana-cream`,
   ikke begge. Den som ikke vinner blir en nøytral dekorfarge, ikke en CTA.
2. **Farg H1 i aksenten** i stedet for ivory. Sjekk kontrasten mot
   `midnight-violet` før det låses.
3. **Innfør to-kolonners redaksjonelt rutenett** som seksjonsmal, og fjern
   eyebrow-etikettene samtidig. De to henger sammen: rutenettet er det som gjør
   etiketten unødvendig.
4. **Referansekortene får kundens farge**, ikke vår, og et asymmetrisk rutenett
   som bytter side per rad.
5. **Bygg en ordentlig case-mal** med grått faktapanel («Dette gjorde jeg» /
   «Teknologi» / «Besøk nettstedet») og avslutning med Aleksanders bilde,
   telefon og skjema.

**Senere:**

- Showreel av ekte kundesider med synlig pauseknapp, i stedet for stillbilder
- Sett varighet og utfall på gratistilbudet, ikke bare «gratis demo»
- Mega-meny der de to tjenestene vi helst vil selge får en beskrivelse

---

## 4. Der Increo og vårt system kolliderer

Tre ting som ikke skal importeres, uansett hvor godt de virker der:

1. **Temperaturen.** Increo er kjølig og institusjonell. Vi er varm og
   én-person. Lån strukturen, ikke tonen. Grepene over fungerer like godt varmt.
2. **Ingen serif, ingen tekstur.** Increo har én skrift og flate flater. Vår
   filmkorn-overlay og serif-kursiven er differensieringen vår mot akkurat den
   typen byrå. Behold dem.
3. **Seksjonsluften.** 80 px funker hos dem fordi rutenettet bærer hierarkiet.
   Strammer vi inn fra `6rem`/`8rem` uten å innføre rutenettet først, blir det
   bare trangt.

---

## 5. Målte verdier

| | Verdi |
| --- | --- |
| Bygget på | Webflow, jQuery 3.5.1, Webflow IX2 |
| Skrift | Interstate, Adobe Typekit, 12 filer, ca. 230 kB |
| Stilark | 213 kB, én fil |
| Forespørsler forside | 80 |
| Innholdsbredde | 1280 px (container maks 1600 px) |
| Seksjonsluft | 80 px topp og bunn, 160 px på én |
| Hjørneradius | 40 px stor, 14 px liten, 26 px knapp |
| Brødtekst | 18 px |
| Dokumenthøyde forside | 7905 px ved 1440 px bredde |
| Kontrast H1 | ca. 8,7:1 |
| Kontrast knapp | ca. 7,9:1 |
| `prefers-reduced-motion` | 0 regler |
| Bilder uten alt (PoMo-case) | 11 av 20 |
| JSON-LD | Kun `Organization` |
| Språk | `lang="no"`, hreflang no + en |
