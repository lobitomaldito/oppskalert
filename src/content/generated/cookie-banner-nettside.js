export default {
  slug: "cookie-banner-nettside",
  klynge: "nettside",
  title: "Cookie-banner på nettsiden: når må du be om samtykke?",
  description: "Trenger nettsiden et cookie-banner? Slik er reglene i ekomloven § 3-15 fra 2025, hva Consent Mode v2 er, og når en side klarer seg uten banner i det hele tatt.",
  publishDate: "2026-11-12",
  keywords: ["cookie banner", "informasjonskapsler nettside", "samtykke cookies"],
  hero: "",
  svar: "En norsk nettside må ha samtykke før den lagrer eller leser informasjonskapsler og lignende på besøkendes enhet. Det følger av ekomloven § 3-15, som gjelder fra 1. januar 2025. Unntaket er det som er strengt nødvendig for tjenesten den besøkende har bedt om, så en side uten analyseverktøy, annonsepiksler og innebygd innhold fra andre trenger ofte ikke banner.",
  faq: [
    { q: "Trenger jeg cookie-banner hvis jeg bruker Google Analytics?", a: "Ja. Datatilsynet skriver at du i praksis må ha gyldig forhåndssamtykke fra de besøkende for å bruke sporingsverktøy. Verktøyet skal ikke lagre eller lese noe før den besøkende har sagt ja." },
    { q: "Erstatter Consent Mode v2 cookie-banneret?", a: "Nei. Consent Mode sender bare den besøkendes valg videre til Googles verktøy. Samtykket må fortsatt samles inn med et banner eller en tilsvarende løsning." },
    { q: "Hvem fører tilsyn med reglene om informasjonskapsler?", a: "Nkom og Datatilsynet har felles tilsyn med ekomloven § 3-15. Begge har veiledning om informasjonskapsler på nettsidene sine." },
  ],
  content: `## Hva loven sier

Reglene står i [ekomloven § 3-15](https://lovdata.no/dokument/NL/lov/2024-12-13-76/KAPITTEL_3), som trådte i kraft 1. januar 2025. Den sier at det ikke er lov å lagre eller hente opplysninger på brukerens enhet uten at brukeren er informert og har gitt samtykke. Informasjonen skal si hvilke opplysninger som behandles, hva de brukes til og hvem som behandler dem. Samtykket skal oppfylle kravene i personvernforordningen.

To ting er verdt å merke seg. Regelen gjelder informasjonskapsler (cookies) og annen teknologi som lagrer eller henter noe fra enheten. Og den gjelder uansett om opplysningene er personopplysninger eller ikke. Nkom og Datatilsynet har felles tilsyn med bestemmelsen.

Før 2025 holdt det i praksis at nettleseren var innstilt på å godta informasjonskapsler. Det gjør det ikke lenger.

## Når du trenger samtykke

Loven har to unntak. Det ene gjelder ren overføring av kommunikasjon i nettet, og angår sjelden en bedriftsside. Det andre gjelder lagring som er strengt nødvendig for å levere en tjeneste brukeren uttrykkelig har bedt om, for eksempel å huske innholdet i en handlekurv den besøkende selv har fylt.

Alt annet krever samtykke. Om analyse og sporing skriver Datatilsynet at du [i praksis må samle inn gyldig forhåndssamtykke](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/rad-for-analyse-og-sporing-pa-nettsted/) for å bruke sporingsverktøy. Det gjelder analyseverktøy, annonsepiksler fra Meta og Google, og innhold du bygger inn fra andre som selv setter informasjonskapsler.

Mange får en overraskelse når de ser hva siden faktisk laster. Et innebygd YouTube-klipp, et kart eller en chatboble kan sette informasjonskapsler uten at du har bedt om det. Skal du vurdere hva en [nettside til bedrift](/nettside-til-bedrift) trenger av banner, må du derfor først vite hva den laster.

## Slik skal banneret virke

Samtykket skal gis gjennom en aktiv handling, og det skal være like lett å si nei som å si ja. Datatilsynet advarer mot å gjemme «avvis» i undermenyer eller gjøre det mer tungvint enn «godta». Ferdig avkryssede bokser holder ikke, og samtykket skal kunne trekkes tilbake like lett som det ble gitt.

Det viktigste tekniske kravet er rekkefølgen. Ingen sporing skal starte før den besøkende har trykket ja. Et banner som vises mens analyseverktøyet allerede har satt sine informasjonskapsler, oppfyller ikke loven, selv om det ser riktig ut.

## Hva Consent Mode v2 er

Consent Mode er Googles måte å la Google Analytics og Google Ads følge det den besøkende har valgt i banneret. I [versjon 2](https://developers.google.com/tag-platform/security/concepts/consent-mode) sendes fire signaler: om informasjonskapsler for annonser kan lagres, om informasjonskapsler for analyse kan lagres, om brukerdata kan sendes til Google for annonsering, og om annonsene kan tilpasses personen.

Det finnes to varianter. I grunnvarianten lastes ikke Googles kode før den besøkende har svart på banneret. I den avanserte varianten lastes koden med en gang, men sender bare målinger uten informasjonskapsler til samtykket er gitt.

Consent Mode samler ikke inn samtykke selv. Du trenger fortsatt et banner eller en samtykkeløsning, og Google krever at annonsører samler inn samtykke fra besøkende i EØS og sender signalene videre for å bruke måling, tilpassede annonser og [remarketing](/blogg/remarketing).

## Når siden klarer seg uten banner

En side som bare setter strengt nødvendige informasjonskapsler, eller ingen i det hele tatt, trenger ikke be om samtykke etter § 3-15. For mange små bedrifter er det fullt mulig: tekst, bilder, kontaktskjema og telefonnummer krever ingen sporing.

Det forutsetter at siden ikke henter noe fra andre som setter informasjonskapsler. Fonter er et eksempel verdt å kjenne til. Google oppgir at Google Fonts ikke setter informasjonskapsler, men den besøkendes IP-adresse sendes til Google hver gang fontene lastes fra Googles servere. Det er et personvernspørsmål, og det slipper du helt ved å legge fontfilene på din egen server. Det gjør jeg på alle sidene jeg lager.

Har siden et kontaktskjema, behandler du personopplysninger uansett. Da skal du etter personvernforordningen artikkel 13 informere om hvem du er, hva opplysningene brukes til og hvilket rettslig grunnlag du har. Det hører hjemme i personvernerklæringen, ikke i et cookie-banner.

## Sjekk din egen side

Åpne siden i et privat vindu i Chrome, trykk F12 og se under Application og Cookies hva som er satt før du har trykket på noe. Se også under Network etter adresser som ikke er ditt eget domene. Finner du informasjonskapsler fra analyse- eller annonseverktøy før noen har sagt ja, må banneret eller oppsettet rettes. Finner du ingen, og siden ikke laster noe fra andre, kan det hende du ikke trenger banneret du har i dag.`,
};
