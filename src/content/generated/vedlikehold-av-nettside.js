export default {
  slug: "vedlikehold-av-nettside",
  title: "Vedlikehold av nettside: hva du gjør selv og hva du setter bort",
  description: "Vedlikehold av nettside handler om oppdateringer, sikkerhetskopier, domene, sertifikat og innhold. Her er hva du kan gjøre selv, og hva du bør sette bort.",
  publishDate: "2026-11-12",
  keywords: ["vedlikehold nettside", "vedlikehold av nettside", "vedlikeholde nettside"],
  hero: "",
  svar: "Vedlikehold av en nettside er to jobber: den tekniske, med oppdateringer, sikkerhetskopier, domene og sertifikat, og innholdet, med priser, åpningstider, ansatte og kontaktskjema. Innholdet kan de fleste holde ved like selv. Den tekniske delen er lurt å sette bort hvis ingen har tid til å følge den opp hver måned.",
  faq: [
    { q: "Hvor ofte bør en nettside oppdateres?", a: "Programvare og utvidelser bør sjekkes hver måned, og sikkerhetsoppdateringer installeres så snart de kommer. Innhold som priser og åpningstider oppdateres når noe endrer seg." },
    { q: "Hvor lenge varer et SSL-sertifikat?", a: "Det varierer med utstederen. Sertifikater fra Let's Encrypt, som mange webhotell bruker, varer i 90 dager og må fornyes automatisk. Stopper fornyelsen, får besøkende en advarsel i nettleseren." },
    { q: "Trenger en nettside uten WordPress vedlikehold?", a: "Mindre, men ikke null. Domenet, sertifikatet, sikkerhetskopiene og innholdet må følges opp uansett hva siden er bygget med. Det som faller bort, er oppdateringene av publiseringsverktøy og utvidelser." },
  ],
  content: `## Hva vedlikehold av en nettside er

Vedlikehold er alt som må gjøres for at siden fortsatt virker og stemmer etter at den er lansert. Det deler seg i to. Den tekniske delen holder siden oppe og trygg: oppdateringer, sikkerhetskopier, domene og sertifikat. Innholdsdelen holder siden riktig: priser, åpningstider, ansatte, tjenester og kontaktskjema.

Hvor mye teknisk vedlikehold siden trenger, avhenger av hva den er bygget med. En WordPress-side med ti utvidelser har ti ting som må oppdateres i tillegg til WordPress selv. En håndkodet side uten utvidelser har langt færre. Hva jeg gjør for sidene jeg drifter, står på siden om [drift og serviceavtale](/drift).

## Oppdateringer og sikkerhet

Bruker siden et publiseringsverktøy som WordPress, er oppdateringene den viktigste jobben. De fleste sikkerhetshullene som blir funnet i WordPress, ligger i utvidelser og temaer, og en oppdatering er som regel det som tetter dem. WordPress installerer mindre sikkerhetsoppdateringer av kjernen automatisk, men utvidelser og temaer må som regel følges opp for hånd.

Under publiseringsverktøyet ligger programmeringsspråket serveren kjører, for WordPress er det PHP. Hver versjon får sikkerhetsrettelser i en begrenset periode. Ifølge [php.net](https://www.php.net/supported-versions.php) slutter PHP 8.2 å få sikkerhetsrettelser 31. desember 2026. Spør webhotellet hvilken versjon siden din kjører, og når den skal oppgraderes.

Hva du gjør hvis det først går galt, står i [innlegget om hacket WordPress](/blogg/wordpress-hacket).

## Sikkerhetskopier du har prøvd

En sikkerhetskopi er bare verdt noe hvis den kan hentes tilbake. Tre ting bør være på plass: kopien tas automatisk, den lagres et annet sted enn på samme server som siden, og noen har prøvd å hente den tilbake minst én gang.

Ta alltid en kopi rett før du oppdaterer. WordPress anbefaler det selv i sin egen veiledning for oppgradering, fordi en oppdatering av og til kan knekke en utvidelse eller et tema. Med en fersk kopi tar det minutter å gå tilbake.

Spør også webhotellet hvor langt tilbake kopiene deres går, og om du kan hente dem ut selv. Oppdager du et problem to uker etter at det oppsto, hjelper det lite om de eldste kopiene bare er en uke gamle. Da er feilen med i alle sammen.

## Domene og sertifikat

To ting kan ta ned en side som ellers virker fint: et utløpt domene og et utløpt [SSL-sertifikat](/ordliste/ssl-sertifikat).

Domenet fornyes hos registraren, ofte med et kort som er registrert der. Utløper kortet, eller e-posten om fornyelse går til en adresse ingen leser, kan domenet bli stående ufornyet. Sjekk hvem som står som eier av [domenet](/ordliste/domene), og at varslene går til en innboks du leser.

Sertifikatet er det som gir hengelåsen i nettleseren. Sertifikater fra Let's Encrypt, som mange webhotell bruker, [varer i 90 dager](https://letsencrypt.org/docs/profiles/) og fornyes automatisk. Stopper fornyelsen, får besøkende en advarsel i stedet for siden din.

## Innhold, skjema og Google

Innholdsdelen er den som oftest blir glemt. Gå gjennom siden én gang i måneden og se etter priser som har endret seg, ansatte som har sluttet, tjenester du ikke tilbyr lenger og åpningstider som ikke stemmer med Google-profilen din.

Send deg selv en melding gjennom kontaktskjemaet samme dag. Et skjema som slutter å levere e-post, gir ingen feilmelding. Du merker det bare ved at henvendelsene uteblir.

Har du Search Console, ta en titt på om det har kommet nye feil eller sider som ikke blir indeksert. Og kjør forsiden gjennom PageSpeed Insights av og til. Har den blitt tregere, finner du de vanligste årsakene i [innlegget om treg nettside](/blogg/treg-nettside).

## Hva du gjør selv, og hva du setter bort

Innhold og skjema kan du gjøre selv. Det krever ingen teknisk kunnskap, bare at noen har det i kalenderen. Sidene jeg lager har et redigeringspanel der du endrer tekst og bilder direkte, så en prisendring tar et par minutter.

Oppdateringer, sikkerhetskopier og feilretting er lurt å sette bort hvis du ikke har tid eller lyst til å gjøre det hver måned. Det avgjørende er at det er avtalt hvem som har ansvaret. Det verste er at alle tror noen andre følger med. Hva det koster å sette det bort, har jeg svart på i [spørsmålet om drift av nettside](/vanlige-sporsmal/hva-koster-drift-av-nettside).

## En rutine du kan starte med

Sett av en fast dag i måneden og gjør fire ting: sjekk at det finnes en sikkerhetskopi fra siste uke, installer oppdateringer, send en test gjennom kontaktskjemaet, og les gjennom forsiden og prissiden. Skriv ned når domenet og eventuelle betalte lisenser fornyes, og legg datoene i kalenderen med en ukes varsel. Det dekker det meste som får en nettside til å slutte å virke.`,
};
