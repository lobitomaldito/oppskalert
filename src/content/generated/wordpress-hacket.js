export default {
  slug: "wordpress-hacket",
  title: "WordPress hacket? Slik tar du det de første timene",
  description: "WordPress hacket? Tegnene du ser etter, hva du gjør de første timene, når du må melde til Datatilsynet og hvordan du hindrer at det skjer igjen.",
  publishDate: "2026-11-12",
  keywords: ["wordpress hacket", "hacket nettside", "wordpress hacket hva gjør jeg"],
  hero: "",
  svar: "Tegn på at WordPress-siden er hacket er advarsler fra Google eller nettleseren, omdirigeringer til fremmede sider, innhold du ikke har lagt inn og ukjente administratorbrukere. Kontakt webhotellet, bytt alle passord, ta en kopi av siden slik den er, og rydd opp før du ber Google om ny vurdering i Search Console.",
  faq: [
    { q: "Hva er den vanligste grunnen til at WordPress blir hacket?", a: "Utvidelser og temaer som ikke er oppdatert. Av de 11 334 nye sårbarhetene Patchstack registrerte i 2025, lå 91 prosent i utvidelser og 9 prosent i temaer." },
    { q: "Må jeg melde fra til Datatilsynet hvis nettsiden er hacket?", a: "Hvis angriperen kan ha fått tilgang til personopplysninger, for eksempel henvendelser fra kontaktskjemaet, skal bruddet som hovedregel meldes innen 72 timer etter at du ble kjent med det. Unntaket er når bruddet sannsynligvis ikke gir risiko for de det gjelder." },
    { q: "Hvor lang tid tar det før Google fjerner advarselen?", a: "Når alt er ryddet, ber du om ny vurdering i Search Console. Google oppgir at vurderingen kan ta fra noen dager til noen uker." },
  ],
  content: `## Tegn på at siden er hacket

Et hack er ikke alltid synlig på forsiden. Noen angrep legger inn spamsider under domenet ditt og lar forsiden være som før. Disse tegnene er de vanligste:

- Google merker siden din som mulig hacket i søkeresultatene, eller nettleseren stopper besøkende med en rød advarsel.
- Besøkende sendes videre til en annen side du ikke har noe med.
- Du finner sider, lenker eller tekst du ikke har lagt inn selv, gjerne når du søker på site:dittdomene.no i Google.
- Det har dukket opp administratorbrukere du ikke kjenner.
- Webhotellet har sendt e-post om skadelig kode eller stengt kontoen.

Har du Search Console koblet til siden, sjekk rapporten [Sikkerhetsproblemer](https://support.google.com/webmasters/answer/9044101). Der står det hva Google har funnet, og på hvilke adresser.

## De første timene

Målet de første timene er å stoppe skaden og ta vare på sporene. Oppryddingen kan vente til i morgen.

Start med webhotellet. De kan se loggene, stenge siden midlertidig og ofte skanne hele kontoen. Har du en avtale med noen om [drift av nettsiden](/drift), er det dem du ringer først. Får du ikke logget inn i WordPress, kan webhotellet gi deg tilgang til filene på annen måte.

Ta så en kopi av alle filene og databasen slik de er nå, også om de er infisert. Kopien viser hva som er endret, og den trengs hvis du må dokumentere hva som har skjedd. Bytt deretter alle passord som har med siden å gjøre: administratorbrukerne i WordPress, innloggingen til webhotellet, FTP eller SFTP, databasen og e-postkontoen som brukes til å nullstille passord. Bytt dem fra en maskin du stoler på.

## Rydd opp, eller få hjelp til det

En ren sikkerhetskopi fra før angrepet er den raskeste veien tilbake. Men vet du ikke når angrepet startet, kan kopien også være infisert. Har du ingen ren kopi, er rekkefølgen slik: skann filene med et sikkerhetsverktøy, slett ukjente administratorbrukere, last ned WordPress på nytt fra wordpress.org og erstatt kjernefilene, og slett alle utvidelser og temaer du ikke bruker.

Det viktigste steget er å finne ut hvordan angriperen kom inn. Fjerner du den skadelige koden uten å tette hullet, kommer den ofte tilbake. Typiske innganger er en utdatert utvidelse eller et svakt passord.

Få hjelp hvis koden kommer tilbake etter at du har fjernet den, hvis du ikke vet hva du ser på i databasen, eller hvis siden har vært infisert lenge. Feil sletting i databasen kan gjøre vondt verre.

## Når du må melde til Datatilsynet

Har siden et kontaktskjema, en bookingløsning eller kundeinnlogging, kan angriperen ha sett personopplysninger. Da kan det være et brudd på personopplysningssikkerheten. Etter [personvernforordningen artikkel 33](https://lovdata.no/lov/2018-06-15-38/gdpr/a33) skal slike brudd meldes til Datatilsynet uten ugrunnet opphold, og om mulig senest 72 timer etter at du ble kjent med dem. Unntaket er når bruddet sannsynligvis ikke gir risiko for dem opplysningene gjelder.

Fristen løper fra du fikk vite om bruddet, også om du ikke har oversikten ennå. Du kan melde det du vet, og sende resten etterpå.

## Be Google om ny vurdering

Når alt er ryddet og hullet er tettet, går du til rapporten Sikkerhetsproblemer i Search Console og ber om en ny vurdering. Skriv kort hva som var galt og hva du har gjort. Google oppgir at en slik vurdering kan ta fra noen dager til noen uker. Ikke send en ny forespørsel mens den første fortsatt behandles.

## Slik hindrer du at det skjer igjen

Oppdateringer er det viktigste tiltaket. Patchstack, som samler sårbarheter i WordPress, registrerte [11 334 nye sårbarheter i 2025](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/). 91 prosent av dem lå i utvidelser og 9 prosent i temaer. WordPress installerer mindre sikkerhetsoppdateringer av kjernen automatisk, men utvidelsene må du som regel følge med på selv.

Resten er enkle vaner. Slett utvidelser og temaer du ikke bruker, også de som er deaktivert. Slå på totrinnsinnlogging for alle administratorer, og gi andre brukere bare de rettighetene de trenger. Ta sikkerhetskopier jevnlig, og lagre dem et annet sted enn på samme server som siden. Hva som ellers bør gås gjennom fast, står i [innlegget om vedlikehold av nettside](/blogg/vedlikehold-av-nettside).

## Hvis du vil slippe WordPress

WordPress er et godt verktøy når noen følger med på det. Har du ingen som gjør det, og siden mest består av faste sider med tekst, bilder og et skjema, finnes det enklere løsninger. En håndkodet side uten utvidelser har færre deler som kan bli utdaterte. Jeg har satt de to opp mot hverandre i [sammenligningen med WordPress](/sammenlign/wordpress).

Det du kan gjøre i dag, uansett hva du velger: logg inn, se gjennom listen over brukere og utvidelser, og slett det du ikke kjenner igjen eller ikke bruker.`,
};
