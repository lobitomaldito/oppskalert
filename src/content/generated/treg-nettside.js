export default {
  slug: "treg-nettside",
  klynge: "nettside",
  title: "Treg nettside? De vanligste årsakene og hva du gjør selv",
  description: "Treg nettside? De vanligste årsakene er store bilder, skript fra andre, tunge utvidelser og en treg server. Slik måler du gratis og finner hva som bremser.",
  publishDate: "2026-11-12",
  keywords: ["treg nettside", "nettsiden laster tregt", "hvorfor er nettsiden treg"],
  hero: "",
  svar: "En treg nettside skyldes som regel store bilder, skript fra andre tjenester, tunge utvidelser i publiseringsverktøyet eller en server som svarer sent. Mål siden gratis i PageSpeed Insights, start med bildene og skriptene, og se om tallene for mobil blir bedre.",
  faq: [
    { q: "Hvorfor er nettsiden rask på PC, men treg på mobil?", a: "PageSpeed Insights tester mobilversjonen med en mellomklassetelefon på et tregt mobilnett. Store bilder og mange skript merkes mye mer der enn på en PC med fast linje." },
    { q: "Hva er en god score i PageSpeed Insights?", a: "Google regner 90 eller mer som bra, 50 til 89 som noe som bør forbedres, og under 50 som dårlig. Tallene fra ekte brukere i Core Web Vitals sier mer enn scoren." },
    { q: "Hjelper det å bytte webhotell?", a: "Bare hvis serveren er problemet. Bruker serveren lang tid på å svare før noe i det hele tatt lastes, kan et bedre webhotell hjelpe. Er det bildene eller skriptene som bremser, endrer et nytt webhotell lite." },
  ],
  content: `## Slik finner du ut om siden din er treg

Gå til [PageSpeed Insights](https://pagespeed.web.dev), lim inn adressen til siden din og trykk analyser. Verktøyet er gratis og laget av Google. Du får to typer tall, og det er nyttig å vite forskjellen.

Øverst ligger tall fra ekte besøkende, samlet over de siste 28 dagene. De finnes bare hvis siden har nok trafikk. Under ligger en testmåling, der Google laster siden med en mellomklassetelefon på et tregt mobilnett. Derfor kan en side som føles rask på kontoret, få dårlige tall på mobil. Scoren går til 100, og Google regner 90 eller mer som bra og under 50 som dårlig. Hva scoren betyr i detalj, har jeg skrevet om i [innlegget om PageSpeed-scoren](/blogg/pagespeed-score-forklart).

Hvorfor treghet koster deg kunder, har jeg gått gjennom i [innlegget om mobilhastighet](/blogg/mobilhastighet-nettside-koster-millioner). Her handler det om hva som gjør siden treg, og hva du kan gjøre med det.

## Tre tall Google faktisk ser på

Google måler brukeropplevelsen med tre tall som kalles [Core Web Vitals](/ordliste/core-web-vitals). Grensene for å være god står på [web.dev](https://web.dev/articles/vitals):

- **LCP**, tiden til det største elementet øverst på siden er lastet, bør være 2,5 sekunder eller mindre.
- **INP**, hvor raskt siden reagerer når noen trykker på noe, bør være 200 millisekunder eller mindre. Det erstattet det eldre målet FID i 2024.
- **CLS**, hvor mye innholdet hopper rundt mens siden laster, bør være 0,1 eller mindre.

Google skriver at gode tall her er i tråd med det kjernesystemene for rangering prøver å belønne. Gode tall gir ingen garanti for plass øverst, men en treg side starter med et handikap.

## Bilder er den vanligste årsaken

Et bilde rett fra mobilkameraet er mange ganger større enn det en nettside trenger. Lastes det opp som det er, må hver besøkende laste ned hele filen, også på mobilnett.

Det er tre ting du kan gjøre selv. Skaler bildet ned til bredden det faktisk vises i på siden. Komprimer det med et gratis verktøy før opplasting. Og lagre det som WebP der publiseringsverktøyet støtter det: Google oppgir at WebP-bilder er [25 til 34 prosent mindre](https://developers.google.com/speed/webp) enn JPEG med samme kvalitet. Start med bildet øverst på forsiden, for det er ofte det som avgjør LCP.

## Skript fra andre tjenester

Den nest vanligste årsaken er kode som lastes fra andre selskaper: chatbobler, sporingspiksler fra annonseplattformer, innebygde videoer og kart, bookingmoduler og tagger lagt inn for kampanjer som er avsluttet for lengst. Hvert skript må hentes fra en annen server, og noen av dem henter flere skript igjen.

Slik ser du dem: åpne siden i Chrome, trykk F12, velg fanen Network og last siden på nytt. Alle adresser som ikke er ditt eget domene, er tredjeparter. Gå gjennom listen og spør for hvert av dem om noen faktisk bruker tallene eller funksjonen. En sporingspiksel fra en kampanje i fjor kan fjernes i dag.

## Utvidelser, maler og serveren

Bruker du WordPress eller et lignende verktøy, legger hver utvidelse ofte til egne filer som lastes på alle sider, også der funksjonen ikke brukes. Tunge sidebyggere gjør det samme. Deaktiver og slett utvidelser du ikke bruker, og test siden på nytt etter hver endring, så du ser hva som hjalp.

Serveren kan også være flaskehalsen. Tiden fra nettleseren spør til serveren svarer, kalles TTFB, og web.dev skriver at de fleste sider bør ha [0,8 sekunder eller mindre](https://web.dev/articles/ttfb). Ligger du langt over, kan mellomlagring (caching) eller et bedre [webhotell](/ordliste/webhotell) hjelpe. Ligger du under, er det sjelden serveren du bør bruke penger på.

## Når det lønner seg å bygge nytt

Bilder, skript og opprydding løser mye. Men noen sider er bygget slik at de aldri blir raske: en mal som laster kode for funksjoner du ikke har, en sidebygger som lager mange lag med kode rundt hver overskrift, eller en samling utvidelser som er avhengige av hverandre. Da kan du bruke mange timer på å lappe uten at mobiltallene flytter seg.

Sidene jeg lager, er håndkodet uten utvidelser, med fonter som ligger på samme server som siden og bilder som skaleres før de lastes opp. Vurderer du å bytte, kan du se hvordan jeg jobber med [ny nettside](/ny-nettside).

## Hva du kan gjøre i dag

Kjør forsiden og den viktigste tjenestesiden gjennom PageSpeed Insights og noter mobiltallene. Bytt ut de tre største bildene med nedskalerte WebP-filer, fjern ett skript du ikke bruker, og mål på nytt. Flytter tallene seg, vet du hvor problemet lå. Står de stille, er det sannsynligvis malen eller serveren, og da er det tid for å få noen til å se på koden.`,
};
