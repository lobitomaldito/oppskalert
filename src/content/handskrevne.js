/* De tre håndskrevne artiklene fra mai 2026. Flyttet ut av src/lib/articles.js
   12.11.2026, så ArticlePage kan laste én artikkel om gangen (se lastere.js). */

const handwritten = [
  {
    slug: "mobilhastighet-nettside-koster-millioner",
    klynge: "nettside",
    title: "Mobilhastighet på nettside: Hvorfor 3 sekunder koster millioner",
    description: "Når nettsiden din laster tregt, forsvinner kundene. Her er hvorfor tre-sekundersregelen er kritisk for omsetningen, og hva du gjør med det.",
    publishDate: "2026-05-01",
    keywords: ["mobilhastighet nettside", "nettside laster tregt"],
    hero: "/blogg/mobilhastighet-nettside-koster-millioner.jpg",
    svar: "En side som bruker mer enn tre sekunder på mobil, mister mange av de besøkende før de har sett noe. De vanligste årsakene og hva du kan rette selv står i [treg nettside](/blogg/treg-nettside).",
    content: `Du har brukt titusenvis av kroner på annonser for å få besøkende til siden din. Men så snart de klikker, skjer det ingenting. Skjermen forblir hvit mens en liten sirkel spinner i det uendelige. Dette er ikke bare en irriterende teknisk detalj, det er et aktivt tap av penger. Når **mobilhastigheten på nettsiden din** faller under den magiske grensen på tre sekunder, har du allerede mistet over halvparten av de potensielle kundene dine.

## Hastighet er den viktigste konverteringsfaktoren du har

Data fra Google viser at hele 53 % av mobilbrukerne forlater en side som tar mer enn tre sekunder å laste. Det er ikke fordi nordmenn er spesielt utålmodige, men fordi vi har vent oss til at ting skal skje med en gang. Hvis siden din **laster tregt**, tolker hjernen det som et tegn på at bedriften enten er uprofesjonell eller utilgjengelig. Hvert ekstra sekund du legger til i lastetid, reduserer konverteringsraten din med i gjennomsnitt 7 %.

## Time to Interactive er det eneste tallet som betyr noe

Mange byråer skryter av at nettsiden er «lett» eller at bildene er optimalisert. Men de glemmer ofte *Time to Interactive* (TTI), altså når knappen faktisk kan trykkes på. Det hjelper lite at logoen dukker opp raskt hvis brukeren må vente i seks sekunder før menyen eller kontaktknappen svarer. Siden din kan se ferdig ut, men hvis den ikke er interaktiv, er den i praksis ubrukelig for en kunde som er klar til å kjøpe.

## Mobilhastighet påvirker mer enn bare kundene

Det er ikke bare menneskelige besøkende som straffer deg for treg lastetid. Googles algoritmer har for lengst tatt inn over seg brukeropplevelse som en rangeringsfaktor. Ved å ignorere ytelse, sender du et signal til søkemotorene om at siden din ikke er verdt å prioritere. Du ender opp med å betale mer for hvert klikk i annonsemarkedet, fordi kvalitetsskåren din synker i takt med lastehastigheten.

## Teknisk gjeld dreper salgstrakten din

De fleste bedrifter sitter fast med nettsider bygget på tunge, utdaterte rammeverk eller «page builders» med for mye kode. Denne tekniske gjelden er som et anker for hastigheten. En side som veier over 2 MB vil nesten alltid slite med å holde seg under 3-sekundersregelen på 4G-nett. Ved å fjerne unødvendige skript og optimalisere bildestørrelser, kan du ofte halvere lastetiden uten å endre det visuelle uttrykket nevneverdig.

## Fra treghet til konvertering

For å snu utviklingen må du slutte å se på nettsiden som et statisk utstillingsvindu. Betrakt den som en maskin som skal levere leads. Hvis maskinen er treg, blir produksjonen lav. Den gode nyheten er at ytelsesoptimalisering ofte gir umiddelbar uttelling. Jeg har sett bedrifter øke konverteringen med 20–40 % bare ved å fokusere på at innholdet er synlig og interaktivt innenfor det første sekundet.

## Hva bør du gjøre nå?

Ikke stol på antakelser eller hva byrået ditt sa for to år siden. Gå til Google PageSpeed Insights i dag. Skriv inn din egen adresse og se på tallet for «Largest Contentful Paint». Hvis det er over 2,5 sekunder, har du et konkret forbedringspotensial. Start med å fjerne tunge videoer som spiller automatisk og minimer antall tredjeparts-skript som kjører i bakgrunnen.`,
  },
  {
    slug: "myten-om-den-dyre-nettsiden-ai-prisbilde",
    klynge: "pris",
    title: "Myten om den dyre nettsiden: Slik endrer AI prisbildet",
    description: "Må en nettside koste 100 000 kroner? Her er hvorfor prisene spriker, hva AI har endret, og tre spørsmål du bør stille før du signerer.",
    publishDate: "2026-05-01",
    keywords: ["billig nettside norge", "AI nettside"],
    hero: "/blogg/myten-om-den-dyre-nettsiden-ai-prisbilde.jpg",
    svar: "Nei, en nettside til en liten bedrift trenger ikke koste 100 000 kroner. Hos meg koster den fra 6 990 kr eks. mva. Om en billig side er verdt pengene, står i [er en billig nettside verdt det?](/vanlige-sporsmal/er-billig-nettside-verdt-det), og hva AI faktisk klarer i [AI og nettsider](/blogg/nettside-ai).",
    /* Skrevet om 12.11.2026. Den gamle teksten (mai 2026) hadde påstander uten
       kilde: et rørleggertilbud på 120 000 kr, «fra 40 til under 5 timer», «80 %»
       av timene, «53 %» som forlater en treg side og «30 % overskredet». Prisspennet
       under er lest i søkeresultatene på «hva koster en nettside» 12.11.2026. */
    updatedDate: "2026-11-12",
    content: `Tilbud på nettsider til små bedrifter spriker mye. Prisguidene på første side i Google for «hva koster en nettside» oppga 12. november 2026 alt fra rundt 10 000 til over 150 000 kroner for en bedriftsside. Det meste av forskjellen er timer: hvor mange timer leverandøren regner med, og hva timen koster.

## Hvorfor koster nettsider så forskjellig?

En nettside priset etter timer blir dyr når mange timer går til noe annet enn selve siden: møter, prosjektledelse, runder med endringer og venting på tekst. Kommer det lisenser eller abonnement på plattformen i tillegg, øker prisen igjen.

En fast pris snur det. Da har leverandøren regnet på omfanget før arbeidet starter, og timene som går med, er leverandørens problem. Be alltid om prisen skriftlig, og om hva som skjer hvis du vil endre noe underveis.

## Hva har AI endret?

Jeg bruker AI-verktøy til de delene av jobben som gjentar seg: oppsett, struktur, første utkast av tekstene ut fra det du har fra før, og kontroll av koden. Jeg leser, retter og tester alt selv før du ser det. Det er det som gjør at et ferdig utkast er klart på 48 timer, og at prisen kan være fast fra 6 990 kr eks. mva.

Hva AI-verktøyene klarer alene, og hva de ikke klarer, står i [AI og nettsider](/blogg/nettside-ai).

## Blir en AI-laget side en mal som ligner alle andre?

Den kan bli det, hvis ingen gjør mer enn å trykke på en knapp. Det som skiller en side fra malen, er det samme som før: tekst med ordene kundene dine bruker, bilder av deg og stedet ditt, og en side per tjeneste.

Sidene jeg lager, er håndkodet, uten WordPress og programtillegg. Hvor raskt en side laster, kan du sjekke selv med Googles PageSpeed Insights. Hva tallene betyr, står i [PageSpeed forklart](/blogg/pagespeed-score-forklart).

## Hvorfor du ser utkastet før prisen avtales

Jeg bygger utkastet først, med ditt innhold, før vi blir enige om noe. Liker du det ikke, sletter jeg det, og ingen skylder noen noe. Liker du retningen, justerer jeg til den sitter, og det er da vi avtaler fast pris.

Da slipper du å betale for møter om hvordan siden kanskje skal bli. Du ser den, og bestemmer deg ut fra det.

## Tre spørsmål før du signerer

1. Kan jeg se et ferdig utkast før jeg betaler?
2. Er prisen fast, og hva er med i den?
3. Hvem eier domenet, tekstene og koden etterpå?

Flere spørsmål og hva svarene bør være, står i [krav til nettsideleverandør](/vanlige-sporsmal/krav-til-nettsideleverandor).`,
  },
  {
    slug: "hvordan-bygge-en-nettside-for-konvertering",
    klynge: "design",
    title: "Nettside konvertering: Slik bygger du en ekte salgsmaskin",
    description: "Slutt å kaste penger på pent design som ikke selger. Slik gjør konverteringsarkitektur hjemmesiden din til en side som faktisk skaffer kunder.",
    publishDate: "2026-05-01",
    keywords: ["nettside konvertering", "hjemmeside til bedrift"],
    hero: "/blogg/hvordan-bygge-en-nettside-for-konvertering.jpg",
    svar: "En nettside gir henvendelser når den besøkende raskt ser hva du tilbyr, hva det koster og hvordan de tar kontakt. Fem grep i designet står i [øke salget med design](/blogg/design-oker-salget).",
    content: `## Estetikk er den dyreste feilen du kan gjøre

Bedriftseiere bruker ofte 100 000 kroner på en ny nettside fordi den gamle «ser utdatert ut». Seks måneder senere viser tallene at ingenting har endret seg. En studie viser at 70 % av de besøkende forlater en side med dårlig struktur før de i det hele tatt ser tilbudet ditt.

Du kjøper ikke et nytt maleri for å øke salget. Du bygger en salgsmaskin. Problemet er ikke fargene eller fontene, men konverteringsarkitekturen som ligger under overflaten.

## Informasjonsarkitektur dikterer hvor kunden trykker

Brukeren din er utålmodig. Innen to sekunder har de bestemt seg for om de blir eller går. Hvis de må lete etter hva du faktisk selger, har du allerede tapt 40 % av de potensielle kundene.

En god nettside for konvertering følger en logisk sti. Den leder brukeren fra et konkret problem til en spesifikk løsning, og ender med en tydelig oppfordring til handling. Hvis nettsiden til bedriften din krever mer enn to klikk for å finne kontaktinformasjon eller kjøpsknapp, er det for mye friksjon.

## Mobilhastighet er ikke et teknisk valg, det er økonomi

Jeg ser ofte sider med tunge bildegallerier som bruker fire sekunder på å rendre. Hvert sekund ekstra lastetid reduserer konverteringsraten med omtrent 7–10 %.

Det hjelper ikke med verdens beste copy hvis siden er for treg til å vise den. Jeg bruker verktøy som Firecrawl for å strippe ned unødvendig kode og sikre at innholdet når øynene til kunden umiddelbart. Hastighet er den lavest hengende frukten for å øke salget ditt.

## Bruk data, ikke magefølelse

Tradisjonelle byråer selger deg det de synes er «pent». Jeg selger det som beviselig flytter brukere nedover trakten. Hver eneste seksjon på en nettside bør ha et formål: enten å bygge tillit, fjerne innvendinger, eller lede til neste steg.

Ved å teste knappetekster ser jeg ofte forskjeller på 20–30 % i klikkrate bare ved å endre fra «Kontakt oss» til «Få gratis demo». Små endringer i arkitekturen gir store utslag i bunnlinjen.

## Veien videre for nettsiden din

Å bygge en konverterende nettside handler om å forstå kundens reise fra start til slutt. Det handler om å fjerne alt som distraherer og forsterke alt som selger. Hvis du er usikker på om siden din presterer, se på analyseverktøyene dine i dag: hvor faller folk av? Det er der arkitekturen din svikter.

Ta en kritisk gjennomgang av din egen side i kveld. Er hovedbudskapet ditt synlig før du scroller? Hvis ikke, har du et klart forbedringspunkt å starte med.`,
  },
];

export default handwritten;
