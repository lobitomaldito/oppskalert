export default {
  slug: "synlig-i-google",
  title: "Synlig på Google: hvorfor nettsiden din ikke dukker opp",
  description: "Kommer ikke nettsiden opp på Google? Slik finner, leser og lagrer Google sider, og slik sjekker du i Search Console hva som holder din side ute.",
  publishDate: "2026-11-12",
  keywords: ["synlig på google", "komme opp på google", "nettside vises ikke på google"],
  hero: "",
  svar: "Før en side kan vises på Google, må Google finne den, lese den og lagre den i indeksen sin. Opprett en gratis konto i Search Console, slå opp adressen i URL-inspeksjonen og be om indeksering hvis den mangler. Det kan ta fra dager til uker, og Google garanterer aldri at en side blir tatt med.",
  faq: [
    { q: "Hvor lang tid tar det før en ny nettside kommer på Google?", a: "Google skriver at gjennomsøkingen kan ta fra dager til uker, og at indeksering aldri er garantert. Å be om indeksering av samme adresse flere ganger gjør det ikke raskere." },
    { q: "Kan jeg betale Google for å komme høyere opp i søkeresultatene?", a: "Ikke i de vanlige søkeresultatene. Google tar ikke betalt for å gjennomsøke en side oftere eller for å rangere den høyere. Betalt plass kjøpes som annonser, som er en egen ordning." },
    { q: "Hvorfor finner jeg ikke nettsiden min når jeg søker på firmanavnet?", a: "Oftest er siden ikke indeksert ennå, eller den har en noindex-merking. Slå opp adressen i URL-inspeksjonen i Search Console, så oppgir Google grunnen." },
  ],
  content: `## Tre steg før en side kan vises på Google

Google må finne siden, lese den og lagre den før den kan dukke opp i et søk. Google kaller stegene gjennomsøking, indeksering og visning av resultater, og skriver selv at ikke alle sider kommer gjennom alle tre. Det finnes ikke noe sentralt register over nettsider, så Google må oppdage nye sider på egen hånd.

To ting er greie å vite fra start. Google tar ikke betalt for å gjennomsøke en side oftere eller for å rangere den høyere. Og selv en side som følger alle reglene, er ikke garantert å bli indeksert. Begge deler står i Googles egen forklaring av [hvordan søket fungerer](https://developers.google.com/search/docs/fundamentals/how-search-works).

## Slik sjekker du om Google kjenner siden din

Skriv site:dittdomene.no i søkefeltet på Google. Kommer det treff som peker til nettsiden din, er den i indeksen. Kommer det ingenting, har Google ikke lagret noen av sidene.

Søket er grovt. Google skriver at det ikke nødvendigvis viser alle sidene som er indeksert, så en side som mangler i lista, kan likevel være med. For et sikkert svar på én bestemt side bruker du URL-inspeksjonen i Search Console, som jeg kommer til under. Mangler hele domenet eller mange av sidene, er det dette jeg ser på først når jeg tar på meg [søkemotoroptimalisering](/sokemotoroptimalisering) for en bedrift.

## Search Console er det første du setter opp

Google Search Console er gratis. Du trenger ikke være registrert der for å komme med i Google, men uten kontoen ser du ikke hvordan Google ser siden din. Du legger inn domenet, bekrefter at du eier det, og får tre ting du trenger:

- URL-inspeksjonen, som sier om en bestemt adresse er indeksert, og hvorfor hvis den mangler.
- En oversikt over hvilke sider som er med, og hvilke som er holdt utenfor.
- Resultatrapporten, med søkene du vises på, antall visninger og klikk, og gjennomsnittlig plassering.

Har du en ny side du vil ha med, limer du inn adressen i URL-inspeksjonen og ber om indeksering. Det er en kvote på hvor mange adresser du kan sende inn slik, og å sende samme adresse flere ganger gjør det ikke raskere. Google skriver at gjennomsøkingen kan ta fra dager til uker.

## Lenker og sitemap viser Google veien

Google finner nye sider ved å følge lenker fra sider de alt kjenner. En ny tjenesteside som ingen andre sider lenker til, kan bli liggende lenge uten å bli oppdaget. Lenk derfor til hver nye side fra minst én side som finnes fra før, for eksempel menyen eller forsiden.

Den andre veien er en sitemap: en fil som lister adressene på nettstedet. Du sender den inn under Sitemaps i Search Console. Google skriver at et nettsted med rundt 500 sider eller færre, der alle viktige sider kan nås via lenker fra forsiden, ikke nødvendigvis trenger en sitemap. De fleste nettsteder har likevel nytte av en, og den hjelper særlig rett etter en lansering eller en flytting.

## Vanlige grunner til at siden holdes ute

Når en side mangler i Google, er det oftest en av disse:

- Siden har en noindex-merking. Den brukes ofte på testversjoner av nye nettsider, og blir av og til med over til den ferdige siden.
- Siden ligger bak passord eller innlogging.
- Ingen andre sider lenker til den, og den står ikke i noen sitemap.
- Domenet er nytt, og Google har ikke vært innom ennå.

En misforståelse er verdt å rydde opp i. Mange tror robots.txt er måten å holde en side utenfor Google på. Fila styrer hvilke adresser roboten får hente, og Google skriver at den ikke er laget for å holde sider ute av søket. Til det skal du bruke noindex eller passord. Har du derimot sperret en side i robots.txt ved et uhell, får ikke Google lest innholdet. URL-inspeksjonen viser begge deler.

## Indeksert, men fortsatt usynlig

Viser URL-inspeksjonen at siden er med, men ingen finner den, er problemet et annet. Da handler det om hvor godt siden svarer på søket sammenlignet med de andre treffene. Sjekk resultatrapporten. Vises du på søk med mange visninger, men ligger langt nede, må teksten på siden bli bedre. Vises du ikke på søkene du vil ha, mangler du sannsynligvis en egen side om akkurat det.

For lokale bedrifter teller kartet i tillegg, og der er det [Google Bedriftsprofil](/blogg/google-min-bedrift) som avgjør. Fart, mobilvisning og resten av det tekniske går jeg gjennom i innlegget om [teknisk SEO](/blogg/teknisk-seo).

## Gjør dette i dag

Opprett Search Console, legg inn domenet og send inn sitemapen hvis du har en. Lim inn adressen til forsiden og til den viktigste tjenestesiden i URL-inspeksjonen. Står det at en av dem ikke er indeksert, les grunnen Google oppgir, rett den og be om indeksering. Kom tilbake om en uke og se om statusen har endret seg.`,
};
