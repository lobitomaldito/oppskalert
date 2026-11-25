# Redesign-demo, runde 1

**Lenke:** https://claude.ai/code/artifact/a5f47fca-372d-4b50-aa1b-54b485cf616e
(privat til du deler den selv)

Laget 16. august 2026. Strukturen fra [increo-no.md](increo-no.md) oversatt til
Oppskalerts egen palett og stemme. Kildefila ligger i sesjonens scratchpad, ikke
i repoet, fordi den har to ulisensierte fonter bakt inn som data-URI-er.

## Hva demoen faktisk tester

Fem grep, alle hentet fra analysen:

1. **Én aksentfarge** i stedet for `sandy-brown` og `banana-cream` side om side.
   `banana-cream` er degradert til statuslampe, ikke lenger en CTA-farge.
2. **H1 i aksentfargen**, ikke i ivory.
3. **Redaksjonell venstremarg** som seksjonsmal, og null eyebrow-etiketter.
4. **Referansekort i kundens farge**, asymmetrisk rutenett som bytter side per rad.
5. **Avslutning med ett ansikt**, telefonnummer og e-post som klikkbare brikker.

To ting i tillegg som ikke kom fra Increo:

- **Prosessen er merket med varighet**, ikke med 01 / 02 / 03. Tallet bærer
  ingen informasjon, «Få dager» og «1–2 uker» gjør det. Det tar samtidig hånd
  om anti-referansen i `PRODUCT.md`.
- **`prefers-reduced-motion` er implementert.** Increo har null slike regler.
  Vår `PRODUCT.md` krever det motsatte.

## Brytere i demoen

Nede til venstre, begge er demo-verktøy og ikke en del av designet.

**Farge.** Fire mørke paletter, én aksent hver, alle sjekket mot WCAG AA.
Kundefargene på referansekortene bytter ikke: siden skifter drakt, kundene
beholder sin egen.

| Palett | Grunn | Aksent | Kontrast H1 |
| --- | --- | --- | --- |
| Midnatt (dagens) | `#201335` | `#ffb17a` | 9,8:1 |
| Skog | `#12241d` | `#edb98a` | 9,2:1 |
| Blekk | `#101728` | `#ff9270` | 8,2:1 |
| Vin | `#2a1418` | `#e8b06a` | 9,0:1 |

**Vekt.** Fire trinn. Bytter bare de store gradene, brødtekst og knapper står i
400 uansett, for det er bare i display vekten synes.

| | Grotesk | Antikva |
| --- | --- | --- |
| Lett (standard) | Suisse 300 | Sectra Fine Book |
| Normal | Suisse 400 | Sectra Fine Book |
| Halvfet | Suisse 600 | Sectra Fine Bold |
| Fet | Suisse 700 | Sectra Fine Bold |

«Fet» er Increos register. «Lett» er gallerispråket. Det er den enkeltbryteren
som flytter uttrykket mest.

**Hero.** Fire tekster. «Dagens» er den som ligger live nå.

## Om heroteksten

Jeg leste heroen til fem byråer for å se hvilken grammatikk som brukes:

| | Herotekst | Grammatikk |
| --- | --- | --- |
| Increo | «En partner for innovasjon og digital transformasjon.» | Kategori, vi-form |
| Heydays | «Heydays is a design studio creating brands and digital products…» | Kategori, vi-form |
| ANTI | «We solve complex brand problems for companies with unreasonable ambitions.» | Kategori, vi-form |
| Netlife | «Vi lager digitale tjenester som fungerer i praksis…» | Kategori, vi-form |
| Basic/Dept | «BASIC/DEPT® is a global branding and digital design agency…» | Kategori, vi-form |
| **Designjoy** | **«Design subscriptions for everyone» / «Pause or cancel anytime.»** | **Tilbud, risiko fjernet** |

Fem av seks bruker den samme lange vi-setningen. Den fungerer for dem fordi
kjøperen deres allerede vet at han trenger et byrå, og bare skal velge hvilket.

Oppskalerts kjøper vet ikke det. Han er skeptisk, brent før, og har null
tålmodighet (`PRODUCT.md`). Da er Designjoy den rette modellen: si hva du gir,
og fjern risikoen i første setning. Designjoy er dessuten det eneste
énpersonsstudioet i settet.

Anbefalt: **«Du ser den ferdige nettsiden din før du betaler noe.»** Den sier
tilbudet, fjerner risikoen, er i jeg-form implisitt, og inneholder søkeordet
«nettside», som dagens H1 «Nettsider som faktisk selger» også gjør, men uten å
love noe konkret.

## Fonter

Åtte filer, 371 kB til sammen, alle bakt inn som data-URI.

| Familie i CSS | Fil | Vekt | Glyffer | kB |
| --- | --- | --- | --- | --- |
| `Suisse` | SuisseIntl-Light | 300 | 489 | 30 |
| `Suisse` | SuisseIntl-Regular | 400 | 952 | 50 |
| `Suisse` | SuisseIntl-SemiBold | 600 | 952 | 51 |
| `Suisse` | SuisseIntl-Bold | 700 | 952 | 51 |
| `Sectra` | GT Sectra Regular | 400 | 500 | 45 |
| `Sectra` | GT Sectra Medium | 500 | 500 | 47 |
| `SectraFine` | GT Sectra Fine Book | 400 | 500 | 47 |
| `SectraFine` | GT Sectra Fine Bold | 700 | 500 | 47 |

Alle åtte har full norsk dekning, sjekket glyff for glyff: æ ø å Æ Ø Å é É « » –.
Merk at **Light bare har 489 glyffer** mot 952 i de tre andre Suisse-vektene.
Den er nok til norsk, men den er et redusert kutt.

**«Fine» er ikke en vekt, det er et optisk snitt.** GT Sectra Fine har tynnere
hårstreker og skarpere overganger, tegnet for store grader. Derfor står alle
store overskrifter, sitatet og prisene i `SectraFine`, mens kundenavn og
småtekst står i tekstsnittet `Sectra`. Å bruke tekstsnittet i 3 rem er like galt
som å bruke Fine i 1 rem. Det er denne delingen, ikke vekten, som gjør mest for
uttrykket.

`font-synthesis: none` står globalt, så nettleseren aldri lager falsk halvfet.

### Ingen av dem kan gå live som det står

Alle åtte er **kommersielle snitt uten lisens** i pakkene fra OnlineWebFonts,
som oppgir CC BY 4.0. Det er ikke riktig for noen av dem:

- **Suisse Int&rsquo;l**, Swiss Typefaces. Lisensfeltet i fontfila sier ordrett
  «Please refer to the license you accepted when purchasing» og peker til
  swisstypefaces.com.
- **GT Sectra** og **GT Sectra Fine**, Grilli Type. Tomt lisensfelt, `fsType 8`.

Skal dette lanseres: kjøp webfont-lisens hos Swiss Typefaces og Grilli Type,
eller bytt til nærmeste lisensierte i vårt eget bibliotek. Suisse-erstatning:
`satoshi`, `geist` eller `schibsted-grotesk`. Sectra-erstatning: `recia` eller
`zodiak`. Ingen av erstatningene har et eget optisk displaysnitt, så delingen
mellom Fine og tekst må da erstattes med bevisste valg av vekt og sperring i
stedet. Det er en reell nedgradering, ikke bare et bytte.

## Ikke bygget i demoen

Case-mal med grått faktapanel, blogg, prisside, skjema. Demoen er én side.
