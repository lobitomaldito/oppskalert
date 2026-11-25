export default {
  slug: "gir-nettsiden-kunder",
  klynge: "nettside",
  title: "Måle nettsiden: slik ser du om den gir henvendelser og telefoner",
  description: "Slik måler du om nettsiden gir kunder: telefoner, skjema og henvendelser fra Google, med Search Console, Bedriftsprofilen og ett spørsmål til hver ny kunde.",
  publishDate: "2026-11-12",
  keywords: ["måle nettside", "google search console", "gir nettsiden kunder"],
  hero: "/blogg/gir-nettsiden-kunder.webp",
  svar: "Du ser om nettsiden gir kunder ved å telle handlingene som kan bli til salg: utfylte skjema, trykk på telefonnummeret og samtaler der kunden sier hvor de fant deg. Search Console viser hvilke søk som sender folk til siden, Google Bedriftsprofil viser trykk på ringeknappen, og et merket skjema i Analytics viser hvor mange som tar kontakt.",
  faq: [
    { q: "Er Google Search Console gratis?", a: "Ja. Search Console er Googles egen tjeneste, og den viser klikk, visninger, klikkrate og gjennomsnittlig plassering for siden din i Google-søk." },
    { q: "Teller et trykk på telefonnummeret som en samtale?", a: "Nei. Et trykk betyr bare at noen åpnet telefonen med nummeret ditt. Om samtalen ble gjennomført og ble til en kunde, må du notere selv, for eksempel ved å spørre hvor de fant deg." },
    { q: "Trenger jeg samtykke for å måle besøk på nettsiden?", a: "Bruker du informasjonskapsler til analyse, trenger du som hovedregel samtykke. Kravet står i ekomloven § 3-15 og har gjeldt med samtykke etter GDPR-standard siden 1. januar 2025." },
  ],
  content: `## Besøk er et mellomsteg

En nettside gir kunder når besøkende gjør noe som kan bli til salg: ringer, sender et skjema, bestiller time eller ber om tilbud. Besøkstallet sier bare at noen kom inn. To hundre besøk fra folk som søkte på «rørlegger Bergen» kan være verdt mer enn to tusen fra folk som lette etter en definisjon.

Derfor bør målingen starte i andre enden. Skriv ned de to eller tre handlingene som faktisk gir deg inntekt. For de fleste småbedrifter er det telefon, kontaktskjema og booking. Alt annet du måler, skal forklare hvorfor de tallene går opp eller ned.

## Search Console viser hva folk søkte på

[Google Search Console](https://support.google.com/webmasters/answer/7576553?hl=no) er gratis og viser fire tall for siden din i Google-søk. Klikk er hvor mange som klikket seg inn fra søkeresultatet. Visninger er hvor mange ganger siden ble vist. Klikkraten er klikk delt på visninger. Plassering er gjennomsnittet for det øverste treffet ditt.

Det nyttigste er fanen med søk. Der ser du ordene folk faktisk brukte. Står det tjenesten og byen din, kommer det riktige folk. Står det mest navnet ditt, finner nye kunder deg ikke ennå, og da er det jobben en [plan for søkemotoroptimalisering](/sokemotoroptimalisering) skal løse. I SEO-abonnementet mitt får du dette som en månedsrapport med vanlige ord: hvem som fant deg, og på hva.

## Telefonen er ofte den viktigste kanalen

Mange småbedrifter får flere henvendelser på telefon enn i skjema, særlig på mobil. Google Bedriftsprofil teller hvor mange som trykket på ringeknappen, hvor mange som trykket på lenken til nettsiden, og hvor mange som ba om veibeskrivelse. Tallene er bare tilgjengelige for en verifisert profil, og ringeknappen telles bare når telefonnummeret står i profilen. Profilen viser også søkeordene folk brukte, oppdatert ved starten av hver måned. Mer om profilen står i [innlegget om Google Bedriftsprofil](/blogg/google-min-bedrift).

På nettsiden kan et trykk på telefonnummeret registreres som en hendelse. Husk hva det tallet er: noen åpnet telefonen med nummeret ditt ferdig utfylt. Om samtalen ble gjennomført, og om den ble til en jobb, vet bare du.

## Merk de handlingene som betyr noe i Analytics

I Google Analytics kan du gjøre en vanlig hendelse om til en nøkkelhendelse. Du går til Admin, Datavisning og Hendelser, og trykker på stjernen ved hendelsen du vil følge, for eksempel et sendt skjema. En standard Analytics-konto kan ha opptil 30 slike, ifølge [Googles hjelpeside om nøkkelhendelser](https://support.google.com/analytics/answer/13128484). For en liten bedrift holder det med to eller tre: sendt skjema, trykk på telefon og trykk på booking.

Når du kobler Search Console til Analytics, kan du se hvilke landingssider fra Google som ender i en nøkkelhendelse. Da vet du hvilken side som henter kunder, og hvilken som bare henter lesere. Det er grunnlaget for å bestemme hva som skal skrives om neste måned.

## Samtykke gjør at tallene blir for lave

Siden 1. januar 2025 krever ekomloven § 3-15 samtykke etter GDPR-standard for informasjonskapsler og lignende teknologi. [Nkom lister to smale unntak](https://nkom.no/internett/informasjonskapsler-cookies): overføring av kommunikasjon, og det som er strengt nødvendig for å levere tjenesten brukeren ber om. Analyse er ikke blant dem, så regn med at du trenger et samtykke før Analytics kan telle besøket.

Konsekvensen er at alle som sier nei, blir borte fra statistikken. Analytics viser derfor færre henvendelser enn du får. Bruk tallene til å sammenligne måned mot måned og side mot side, og la innboksen og telefonloggen være fasiten. Search Console og Bedriftsprofilen teller i Googles egne systemer, uten informasjonskapsler på siden din, og påvirkes ikke av samtykket.

## Det enkleste målet er ett spørsmål

Den sikreste målingen koster ingenting: spør hver ny kunde hvor de fant deg. Skriv svaret i en enkel liste med dato, kanal og om det ble oppdrag. Etter tre måneder har du et bilde som ingen verktøy gir deg alene, fordi du ser hele veien fra søk til betalt faktura.

Svarene blir ikke perfekte. Folk husker feil, og mange har sett deg flere steder før de ringer. Men når en stadig større andel svarer «på Google», har nettsiden begynt å gjøre jobben sin. Står tallet stille selv om visningene i Search Console vokser, ligger problemet på nettsiden, ofte i hvor tydelig det står hva du gjør og hvordan man tar kontakt.

## Dette kan du gjøre denne uken

Åpne Search Console og se på søkene fra de siste tre månedene. Finn de fem søkene som ligner mest på det en kunde ville skrevet, og noter hvilken side de lander på. Sjekk at telefonnummeret står i Bedriftsprofilen, og lag en enkel liste der du skriver ned hvor hver ny kunde kom fra. Om tre måneder kan du sammenligne listen med tallene, og da ser du om nettsiden gir kunder eller bare besøk. Lurer du på hva som avgjør hvor fort det går, kan du lese om [SEO for småbedrifter](/blogg/seo-for-smabedrifter).`,
};
