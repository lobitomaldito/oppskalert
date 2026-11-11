export default {
  slug: "logo-farger-typografi",
  title: "Typografi og farger på nettsiden: slik virker logo og skrift",
  description: "Slik virker logo, farger og typografi på nettsiden: kontrastkravene i WCAG, hvor mange skrifter du trenger, og hvorfor skriftene bør ligge på din egen server.",
  publishDate: "2026-11-12",
  keywords: ["typografi nettside", "farger logo", "kontrast nettside"],
  hero: "",
  svar: "Logo, farger og skrift avgjør om nettsiden er lett å lese og om den ser ut som din bedrift. Brødtekst skal ha et kontrastforhold på minst 4,5:1 mot bakgrunnen, og stor tekst minst 3:1. Skriftene bør ligge på din egen server, fordi Google Fonts lastet fra Google sender den besøkendes IP-adresse til Google.",
  faq: [
    { q: "Hvor mye kontrast må teksten på en nettside ha?", a: "Etter WCAG-standarden minst 4,5:1 for vanlig tekst og 3:1 for stor tekst, det vil si rundt 24 piksler, eller 18,5 piksler i fet skrift. Tekst som er del av en logo, har ikke noe kontrastkrav." },
    { q: "Gjelder kravene til universell utforming for private bedrifter?", a: "Ja. Ifølge Uutilsynet skal private virksomheters nettløsninger minst oppfylle 35 suksesskriterier i WCAG 2.0, og kontrastkravet for tekst er blant dem." },
    { q: "Er det lov å bruke Google Fonts på nettsiden?", a: "Henter du skriftene fra Googles servere, får Google den besøkendes IP-adresse. Google skriver selv at du kan unngå det ved å laste ned skriftene og legge dem på din egen server." },
  ],
  content: `## Hva gjør logo, farger og skrift på en nettside?

På en nettside har logo, farger og skrift to jobber. De skal få siden til å se ut som din bedrift, og de skal gjøre teksten lett å lese. Den første jobben er smak. Den andre har klare tall og regler, og det er den mange sider glipper på.

Logoen står øverst og forteller besøkende at de er på riktig sted. Fargene styrer hvor øyet går. Skriften avgjør om folk orker å lese et avsnitt på mobilen. Når jeg lager [design av nettsider](/nettside-design), bestemmer jeg disse tre før noe annet, fordi alt annet på siden bygger på dem.

## Hvor mye kontrast trenger teksten?

Kontrastkravet er det mest konkrete i faget. Den internasjonale standarden WCAG sier at [vanlig tekst skal ha et kontrastforhold på minst 4,5:1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) mot bakgrunnen. Stor tekst, det vil si minst 18 punkt, eller 14 punkt i fet skrift, skal ha minst 3:1. Omregnet til skjerm tilsvarer det rundt 24 og 18,5 piksler.

Kravet gjelder norske bedrifter også. Ifølge [Uutilsynet](https://www.uutilsynet.no/regelverk/kva-seier-forskrifta/153) skal private virksomheters nettløsninger minst følge 35 suksesskriterier i WCAG 2.0, alle på nivå A og AA bortsett fra tre som gjelder lyd og video. Kontrastkravet er et AA-krav og står ikke blant unntakene.

Lys grå tekst på hvit bakgrunn er den vanligste feilen. Den ser elegant ut på en stor skjerm og blir vanskelig å lese på en mobil i sollys. Kontrasten kan sjekkes med gratis verktøy på nettet før fargene velges.

## Hvordan bør fargene brukes?

En god fargepalett på en nettside er liten. En hovedfarge som kjennes igjen fra logoen, én aksentfarge som bare brukes på knapper og det viktigste, og et par nøytrale toner til tekst og bakgrunn. Med flere farger enn det begynner de å konkurrere om oppmerksomheten.

Logofargen passer ikke alltid til tekst eller knapper. En lys gul eller lys grønn logo kan fungere godt på et skilt, men gi for lav kontrast som tekstfarge på hvit bakgrunn. WCAG tar høyde for logoen: tekst som er del av en logo eller et merkenavn, har ikke noe kontrastkrav. Resten av siden har det. Løsningen er ofte en mørkere variant av logofargen til tekst og knapper.

## Hvor mange skrifter trenger du?

To holder for nesten alle: én til overskrifter og én til brødtekst. Alternativt én skriftfamilie med flere vekter. Hver ekstra skrift er en fil til som må lastes før teksten vises, og et brudd til i uttrykket.

Til brødtekst bør du velge en skrift som er laget for skjerm, med tydelig forskjell på tegn som l, I og 1, og der æ, ø og å er tegnet like godt som resten av alfabetet. Overskriftene kan ha mer personlighet. Der kan bedriften skille seg ut, så lenge brødteksten forblir lett å lese.

## Hvorfor skriftene bør ligge på din egen server

Mange nettsider henter skriftene sine direkte fra Google Fonts. Det er gratis og raskt å sette opp, og det har en personvernside. Google skriver selv i spørsmål og svar-sidene for Google Fonts at når en besøkende åpner en side som henter skrifter derfra, sender nettleseren den besøkendes IP-adresse, hvilken fil som hentes, og informasjon om nettleser, operativsystem og hvilken side skriften skal vises på. Google oppgir at opplysningene ikke brukes til å lage brukerprofiler eller til målrettet reklame.

[Datatilsynet](https://www.datatilsynet.no/rettigheter-og-plikter/personopplysninger/) regner en dynamisk IP-adresse som en opplysning som indirekte kan identifisere en person. Står det i personvernerklæringen din at du ikke deler data med tredjeparter, stemmer det dårlig med skrifter fra Google. Google oppgir selv løsningen: last ned skriftene og legg dem på din egen server, så går ingen forespørsel til Google. Alle sidene jeg lager har selvhostede skrifter av denne grunnen.

## Hva du kan sjekke på din egen side i dag

Ta tre sjekker på ti minutter. Åpne siden på mobilen ute i dagslys og se om brødteksten er lett å lese. Kjør tekstfargen og bakgrunnsfargen gjennom en kontrastsjekker og se om du kommer over 4,5:1. Og høyreklikk på siden i nettleseren på PC-en, velg «Vis sidekilde» og søk etter «googleapis». Finner du det, hentes skriftene trolig fra Google. Vil du se hvordan farger og skrift henger sammen med resten av uttrykket, kan du lese om [hva en grafisk profil består av](/blogg/grafisk-profil), eller om [designgrepene som gir flere henvendelser](/blogg/design-oker-salget).`,
};
