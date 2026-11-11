export default {
  slug: "moderne-nettside",
  title: "Moderne nettside i 2026: fem krav en bedriftsside må oppfylle",
  description: "En moderne nettside i 2026 må fungere på mobil, laste raskt, følge kravene til universell utforming, spørre om samtykke og vise kontaktinfo tydelig.",
  publishDate: "2026-11-12",
  keywords: ["moderne nettside", "krav til nettside 2026", "moderne hjemmeside bedrift"],
  hero: "",
  svar: "En moderne bedriftsnettside må fungere på mobil, fordi det er mobilversjonen Google leser, og laste raskt nok til å bestå Googles Core Web Vitals. Den må følge minst 35 krav i WCAG 2.0, som gjelder private virksomheter uansett størrelse, spørre om samtykke før sporing, og vise telefon og e-post på hver side.",
  faq: [
    { q: "Må små bedrifter følge kravene til universell utforming?", a: "Ja. Uutilsynet skriver at reglene gjelder uansett hvor mange ansatte virksomheten har, hva den omsetter for og hvilken organisasjonsform den har. Private virksomheter skal minst følge 35 suksesskriterier i WCAG 2.0." },
    { q: "Hva regnes som god lastetid?", a: "Google regner det som godt når det største elementet på siden er synlig innen 2,5 sekunder, siden svarer på trykk innen 200 millisekunder, og innholdet flytter seg lite mens siden laster (CLS under 0,1)." },
    { q: "Trenger nettsiden et cookie-banner?", a: "Bare hvis siden bruker informasjonskapsler eller lignende teknologi som ikke er strengt nødvendig, for eksempel analyse eller annonsesporing. Da krever ekomloven samtykke før verktøyet tas i bruk, og det skal ikke være tyngre å avslå enn å godta." },
  ],
  content: `## Fem krav som skiller en moderne nettside fra en gammel

En moderne bedriftsnettside i 2026 må oppfylle fem krav: den fungerer på mobil, laster raskt, følger kravene til universell utforming, spør om samtykke før sporing og gjør det lett å ta kontakt. To av dem er lovkrav. De tre andre avgjør om Google viser siden og om de som kommer dit tar kontakt.

Hvilke sider en liten bedrift trenger, og hva du kan droppe, har jeg skrevet om i [hjemmesider for små bedrifter](/blogg/hjemmesider-for-sma-bedrifter). Her handler det om kravene hver side må oppfylle. Alle fem er med når jeg lager en [ny nettside](/ny-nettside).

## Mobilen er versjonen Google leser

Google bruker mobilversjonen av siden når den indekserer og rangerer. Det kalles mobile-first-indeksering, og står i [Googles egen dokumentasjon](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing). Mangler noe på mobilversjonen, finnes det ikke for Google.

I praksis betyr det tre ting du kan sjekke på din egen telefon: teksten kan leses uten å zoome, knappene er store nok til å treffe med tommelen, og telefonnummeret ringer når du trykker på det. Har du en eldre telefon i skuffen, test på den også. Der merkes en tung side først. Hvordan du tester resten, står i [responsiv nettside](/blogg/responsiv-nettside).

## Hastighet måles i tre tall

Google måler opplevd hastighet med Core Web Vitals, tre tall med faste grenser. Det største elementet på siden skal være synlig innen 2,5 sekunder (LCP). Siden skal svare på et trykk innen 200 millisekunder (INP). Og innholdet skal flytte seg lite mens det laster, med en CLS under 0,1. Google skriver at de [sterkt anbefaler gode Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

De vanligste grunnene til at en side bommer, er store bilder, mange tillegg og skrifter som hentes fra andre servere. Sidene jeg lager er håndkodet, og fontene ligger på samme server som siden. Hva tallene betyr for din side, forklarer jeg i [Core Web Vitals](/ordliste/core-web-vitals).

## Universell utforming gjelder også småbedrifter

Mange tror kravene til universell utforming bare gjelder kommuner og store selskaper. Uutilsynet skriver at reglene gjelder uansett hvor mange ansatte virksomheten har, hva den omsetter for og hvilken organisasjonsform den har. Kravet gjelder nettløsninger som er rettet mot kunder i Norge og er en hovedkanal for virksomheten. Private personers hjemmesider er unntatt.

Private virksomheter skal minst følge 35 suksesskriterier i WCAG 2.0 på nivå A og AA. Offentlig sektor har 48. Unntak gis bare i unntakstilfeller, og [Uutilsynet skriver at terskelen er høy](https://www.uutilsynet.no/regelverk/kva-seier-forskrifta/153).

Fire av kravene treffer nesten alle småbedrifter: bilder har en beskrivende tekst, teksten har nok kontrast mot bakgrunnen, alt kan brukes med tastatur, og hvert felt i kontaktskjemaet har en synlig etikett.

## Samtykke før sporing

Fra 1. januar 2025 krever ekomloven § 3-15 samtykke før en nettside lagrer eller leser informasjon på besøkendes enhet, med mindre det er strengt nødvendig for tjenesten. Samtykket må være gyldig etter personvernforordningen. Datatilsynet skriver i [rådene om analyse og sporing](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/rad-for-analyse-og-sporing-pa-nettsted/) at det må hentes inn før verktøyet tas i bruk, og i veiledningen fra 2025 at det ikke skal kreve ekstra klikk å avslå.

Bruker du analyse eller annonsepiksler, trenger du altså et banner som er satt opp riktig. Bruker siden bare informasjonskapsler som er strengt nødvendige, trenger du ikke et samtykkebanner. Mer om dette i [cookie-banner på nettsiden](/blogg/cookie-banner-nettside).

## Kontaktinformasjonen skal synes på hver side

Den som har bestemt seg for å ringe, skal slippe å lete. Sett telefonnummer og e-post i bunnen av hver side, og gjør nummeret trykkbart på mobil. Har du et kontaktskjema, spør bare om det du trenger for å svare: navn, telefon eller e-post, og hva det gjelder. Skriv hva som skjer etter at skjemaet er sendt, for eksempel at du ringer tilbake samme dag.

Lokale kunder finner deg ofte via kartet før de kommer til nettsiden. Sørg for at adresse, telefon og åpningstider er like der og på siden. Slik gjør du det i [Google Bedriftsprofil](/blogg/google-min-bedrift).

## Sjekk din egen side i kveld

Du trenger ikke en konsulent for å se hvor du står. Lim adressen inn i [PageSpeed Insights](https://pagespeed.web.dev/) og se om de tre tallene er grønne på mobil. Åpne siden på telefonen og trykk på telefonnummeret. Gå gjennom forsiden med tabulatortasten og se om du når alle lenkene. Åpne siden i et privat vindu og sjekk om avslå-knappen er like synlig som godta-knappen. Etter de fire sjekkene vet du hva som må fikses først.`,
};
