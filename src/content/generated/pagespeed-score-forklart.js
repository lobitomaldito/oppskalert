export default {
  slug: "pagespeed-score-forklart",
  klynge: "nettside",
  title: "PageSpeed Insights forklart: hva tallene betyr for bedriften",
  description: "PageSpeed Insights forklart for bedriftseiere: hva LCP, INP og CLS måler, grenseverdiene Google bruker, forskjellen på feltdata og labdata, og hva du gjør nå.",
  publishDate: "2026-11-12",
  keywords: ["pagespeed insights", "pagespeed score", "core web vitals"],
  hero: "/blogg/pagespeed-score-forklart.webp",
  svar: "PageSpeed Insights viser to ting: målinger fra ekte Chrome-brukere de siste 28 dagene, og en poengsum fra en simulert test. Det som teller mest, er de tre målingene fra ekte brukere: LCP bør være 2,5 sekunder eller mindre, INP 200 millisekunder eller mindre, og CLS 0,1 eller mindre. Poengsummen fra 0 til 100 er nyttig for feilsøking.",
  faq: [
    { q: "Hvorfor får jeg ulik PageSpeed-score hver gang jeg tester?", a: "Poengsummen kommer fra en simulert test, og den påvirkes av forhold som nettverk, annonser og A/B-tester på siden, enheten du tester fra og utvidelser i nettleseren. Små utslag fra gang til gang er normalt." },
    { q: "Hva betyr det når PageSpeed ikke viser data fra ekte brukere?", a: "Da har siden for få besøk fra Chrome-brukere til å gi et grunnlag. PageSpeed viser i så fall tall for hele nettstedet, og har heller ikke det nok data, vises bare den simulerte testen." },
    { q: "Hva er en god PageSpeed-score?", a: "90 eller mer regnes som god, 50 til 89 trenger forbedring, og under 50 er dårlig. Poengsummen er regnet ut fra den simulerte testen." },
  ],
  content: `## To typer tall på samme side

[PageSpeed Insights](https://pagespeed.web.dev/) er Googles gratis verktøy for å måle hvor rask en nettside oppleves. Rapporten har to deler som ofte blir blandet sammen.

Øverst står feltdata: målinger fra ekte Chrome-brukere som har besøkt siden de siste 28 dagene. Under står labdata: en test Google kjører der og da, på en simulert enhet og et simulert nettverk. [Googles egen forklaring](https://developers.google.com/speed/docs/insights/v5/about) sier at feltdata viser hva brukerne faktisk opplevde, mens labdata er nyttig til å finne årsaken til et problem.

Poengsummen fra 0 til 100 som de fleste ser på, kommer fra labdelen. Den sier noe om siden i én test. Feltdataene sier hvordan det har gått for de besøkende den siste måneden.

## LCP: hvor fort hovedinnholdet kommer

LCP står for Largest Contentful Paint. Den måler hvor lang tid det tar før det største bildet eller tekstblokken i synsfeltet er ferdig tegnet. På de fleste bedriftssider er det hovedbildet øverst eller den store overskriften.

Grensene fra [web.dev](https://web.dev/articles/lcp) er 2,5 sekunder eller mindre for godt, og over 4 sekunder for dårlig. Alt imellom trenger forbedring.

Vanlige årsaker til høy LCP er et for stort bilde, en treg server eller fonter og skript som må lastes før siden kan vises. Mens den besøkende venter, er tilbakeknappen ett trykk unna. Mer om dette står i [innlegget om treg nettside](/blogg/treg-nettside).

## INP: hvor fort siden svarer når du trykker

INP står for Interaction to Next Paint. Den måler hvor lang tid det tar fra noen trykker, klikker eller skriver til siden viser at den har reagert. Målingen følger hele besøket og rapporterer en verdi nær den tregeste reaksjonen. INP ble en fast del av Core Web Vitals i 2024.

Grensene fra [web.dev](https://web.dev/articles/inp) er 200 millisekunder eller mindre for godt, og over 500 millisekunder for dårlig.

En høy INP kjennes som en meny som henger, eller et skjema der knappen ikke reagerer med en gang. En vanlig årsak er mye JavaScript som kjører samtidig, for eksempel fra tillegg og sporingsskript.

## CLS: om siden hopper mens du leser

CLS står for Cumulative Layout Shift. Den måler hvor mye innholdet flytter seg uventet mens siden er åpen. Flytting som skjer rett etter at brukeren selv trykker på noe, telles ikke.

Grensene fra [web.dev](https://web.dev/articles/cls) er 0,1 eller mindre for godt, og over 0,25 for dårlig.

Du har sett det: du skal trykke på telefonnummeret, et banner dukker opp, og du trykker på noe annet. Typiske årsaker er bilder uten oppgitt størrelse, informasjonskapselbannere som skyver innholdet ned, og fonter som bytter størrelse når de lastes inn.

## Slik leser du vurderingen

Google ser på den 75. persentilen av besøkene, altså verdien som tre av fire besøk er bedre enn. Siden består vurderingen av [Core Web Vitals](/ordliste/core-web-vitals) når alle tre målingene er gode på det nivået. Mangler det nok data for INP, holder det at LCP og CLS er gode.

Har siden for få besøk til å gi egne feltdata, viser PageSpeed tall for hele nettstedet. Har heller ikke nettstedet nok data, ser du bare labdelen. Det skjer ofte på sider med få besøk, og da er labtestene det beste du har.

Poengsummen er delt i tre: 90 til 100 er grønn og god, 50 til 89 er oransje og trenger forbedring, og 0 til 49 er rød. Google skriver at mye av variasjonen fra test til test skyldes forhold utenfor siden, som nettverk, annonser, enheten du tester fra og utvidelser i nettleseren. Test flere ganger før du trekker konklusjoner.

Google anbefaler gode verdier for Core Web Vitals og skriver at de er i tråd med det rangeringssystemene belønner. Relevante svar på det folk søker etter, må likevel være på plass først. En rask side om feil tema rangerer ikke.

## Hva du gjør med tallene

Test de tre sidene som betyr mest: forsiden, den viktigste tjenestesiden og kontaktsiden. Feltdataene er delt i mobil og datamaskin, så se på begge, og start med mobil.

Se først på feltdataene. Er alle tre grønne, er det sjelden lurt å bruke penger på å jage en høyere poengsum. Er én av dem rød, se på forslagene under labdelen og send dem til den som drifter siden. Mange av dem, som store bilder og manglende bildestørrelser, kan rettes uten å bygge siden på nytt. Ligger problemet i et tungt tema eller mange tillegg, er det ofte grunnmuren som må byttes.

Sidene jeg bygger, håndkodes uten tillegg, og fontene ligger på samme server som siden. Da slipper siden å vente på tillegg og på en ekstern fontserver. Hvordan jeg jobber med en [ny nettside](/ny-nettside), står på egen side.

## Neste steg

Åpne PageSpeed Insights, lim inn adressen til tjenestesiden som gir deg flest henvendelser, og velg mobil. Skriv ned LCP, INP og CLS fra feltdataene, eller labverdiene hvis feltdata mangler. Er én av dem rød, har du funnet stedet å begynne.`,
};
