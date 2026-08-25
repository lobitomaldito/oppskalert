// Én kilde til sannhet for navigasjon, priser, prosess, FAQ og portefølje.
// Sidene importerer herfra i stedet for å duplisere tekst. Det er slik
// "jeg"-tonen holder seg konsistent når innholdet ligger på fem ruter.

export const kontakt = {
  navn: 'Aleksander MacKee',
  telefon: '974 09 897',
  tel: '+4797409897',
  epost: 'team@oppskalert.no',
  linkedin: 'https://www.linkedin.com/in/aleks-mackee-bbba9120b/',
  orgnr: '935 067 049',
  sted: 'Oslo, Norge',
  morselskap: 'PotentialAIze AS',
};

export const ruter = {
  hjem: '/',
  arbeid: '/arbeid',
  priser: '/priser',
  metode: '/metode',
  om: '/om',
  kontakt: '/kontakt',
  blogg: '/blogg',
  kalkulator: '/kalkulator',
  drift: '/drift',
  sammenlign: '/sammenlign',
  sammenlignWix: '/sammenlign/wix',
  sammenlignWordpress: '/sammenlign/wordpress',
  seo: '/sokemotoroptimalisering',
  webdesignOslo: '/webdesign-oslo',
  nettsideDesign: '/nettside-design',
  nettsideBedrift: '/nettside-til-bedrift',
  nettbutikk: '/lage-nettbutikk',
  personvern: '/personvern',
};

export const navLenker = [
  { label: 'Arbeid', to: ruter.arbeid },
  { label: 'Priser', to: ruter.priser },
  { label: 'Metode', to: ruter.metode },
  { label: 'Om meg', to: ruter.om },
  { label: 'Blogg', to: ruter.blogg },
];

/* ---------------------------------------------------------------
   PRISER. To modeller. Tallene er plassholdere; endre dem her,
   så følger forsiden, prissiden og FAQ-en etter av seg selv.
   --------------------------------------------------------------- */
export const prisNotat = 'Alle priser er eks. mva. Du får alltid fast pris før jeg skriver en linje kode.';

export const prismodeller = [
  {
    id: 'engangs',
    navn: 'Engangspris',
    fra: '9 999',
    enhet: 'kr',
    // Tom med vilje: navnet er allerede «Engangspris», så en periode som
    // sier «engangspris» ble til «Engangspris · engangspris» på kortet.
    periode: '',
    tagline: 'Du eier alt. Én faktura, så er du ferdig.',
    passerDeg: [
      'Du vil eie løsningen hundre prosent',
      'Du har eget hosting, eller noen som fikser det',
      'Du vil bli ferdig og videre',
    ],
    inkludert: [
      'Komplett nettside, håndbygd for deg',
      'Alle filer overlevert, du eier dem',
      'SEO-grunnoppsett fra dag én',
      'Hjelp med oppsett på ditt eget hosting',
    ],
    fremhevet: false,
  },
  {
    id: 'drift',
    navn: 'Driftet av meg',
    fra: '690',
    enhet: 'kr/mnd',
    periode: 'ingen binding',
    tagline: 'Jeg passer på alt. Du slipper å tenke teknisk igjen.',
    passerDeg: [
      'Du vil bruke tiden på bedriften, ikke på nettsiden',
      'Du vil sende en e-post og få ting endret',
      'Du vil ha én forutsigbar månedskostnad',
    ],
    inkludert: [
      'Alt i engangspris, pluss:',
      'Hosting, domene og SSL',
      'Rimelige innholdsendringer inkludert',
      'Backup og oppetidsovervåking',
      'Support direkte fra meg, ikke en helpdesk',
    ],
    fremhevet: true,
  },
  {
    /* Tredje modell, lagt til 21. august 2026. To grunner.

       Kommersielt: chatbot og web-app er tjenester som skal selges, og de
       sto bare nevnt i tjenestekortene uten noe sted å be om pris.

       Visuelt: to kort i et 1fr 1fr-rutenett stod tynt på brede skjermer,
       og drift-rutenettet rett under har allerede tre. Nå er de like.

       `fra` er en tekst og ikke et tall her, med vilje. Disse prosjektene
       har ikke en meningsfull startpris: en chatbot trent på fem sider og
       en app med innlogging er ikke samme jobb. Å oppgi et «fra»-tall
       ville vært et tall jeg ikke kan stå for, og prissiden finnes for å
       unngå nettopp det. Se `erForesporsel` der kortet rendres. */
    id: 'skreddersom',
    navn: 'Chatbot eller app',
    fra: 'Forespør pris',
    erForesporsel: true,
    enhet: '',
    periode: 'etter omfang',
    tagline: 'Skal siden svare for deg, eller skal kundene logge inn?',
    passerDeg: [
      'Du får de samme spørsmålene om og om igjen',
      'Du taster det samme inn i to systemer',
      'Kundene dine skal bestille eller følge noe over tid',
    ],
    inkludert: [
      'Chatbot trent på din egen bedrift',
      'Automatikk mellom verktøyene du har fra før',
      'App til iPhone og Android, hvis du faktisk trenger en',
      'Fast pris før jeg begynner, som ellers',
    ],
    fremhevet: false,
  },
];

export const alltidMed = [
  'Skreddersydd design, håndkodet',
  'Optimalisert for mobil og desktop',
  'Synlig i Google, og i AI-søk',
  'Tekster ferdigskrevet',
  'Kontaktskjema',
  'Domene- og SSL-oppsett',
  'Google Analytics og Search Console',
  'Lynrask, uten tunge plugins',
];

/* ---------------------------------------------------------------
   DRIFT. Tre nivåer under "Driftet av meg"-paraplyen. Prisene her
   er den eneste kilden. /drift, forsidens Priser-kort og FAQ leser
   alle herfra, så en prisjustering skjer på ett sted.
   --------------------------------------------------------------- */
export const driftNivaer = [
  {
    id: 'grunn',
    navn: 'Grunndrift',
    fra: '149',
    enhet: 'kr/mnd',
    tagline: 'Du redigerer selv. Jeg passer på det tekniske i bakgrunnen.',
    inkludert: [
      'Hosting, domene og SSL',
      'Månedlig backup',
      'Sikkerhets- og programvareoppdateringer',
      'E-post support innen 3 virkedager',
    ],
    fremhevet: false,
  },
  {
    id: 'drift',
    navn: 'Driftet av meg',
    fra: '690',
    enhet: 'kr/mnd',
    tagline: 'Jeg passer på alt. Du slipper å tenke teknisk igjen.',
    inkludert: [
      'Alt i Grunndrift, pluss:',
      'Rimelige innholdsendringer inkludert',
      'Backup og oppetidsovervåking hyppigere',
      'Support direkte fra meg, ikke en helpdesk',
    ],
    fremhevet: true,
  },
  {
    id: 'prioritert',
    navn: 'Prioritert',
    fra: '1 290',
    enhet: 'kr/mnd',
    tagline: 'For deg som vil ha raskest svar og en side som stadig forbedres.',
    inkludert: [
      'Alt i Driftet av meg, pluss:',
      'Raskere responstid på endringer',
      'Flere endringer inkludert per måned',
      'Kvartalsvis SEO-gjennomgang',
    ],
    fremhevet: false,
  },
];

export const driftNotat = 'Alle priser eks. mva. Ingen bindingstid. Bytt nivå eller avslutt når du vil.';

/* ---------------------------------------------------------------
   KALKULATOR. Selvbetjent prisestimat. Grunnpris etter omfang,
   pluss flate påslag per funksjon. Alt er fortsatt skreddersydd og
   håndkodet. Det finnes bevisst ingen "mal"-tier, siden det ville
   motsagt alltidMed over. Tallene er godkjent 2026-08-03; endre kun
   her, så følger kalkulatoren automatisk med.

   manedspris er det veiledende "eller X kr/mnd"-alternativet til
   engangsestimatet (godkjent 2026-08-04), Driftet av meg skalert med
   omfang, siden en flat 690 kr/mnd uansett prosjektstørrelse ville
   undervurdert et stort nettbutikk-prosjekt kraftig. Upåvirket av
   tillegg/haster, med vilje: et enkelt tall er lettere å stå for enn et
   utregnet ett. */
export const kalkulatorOmfang = [
  { id: '1', label: '1 side', beskrivelse: 'Landingsside eller digitalt visittkort', min: 9999, max: 12900, manedspris: 690 },
  { id: '2-5', label: '2–5 sider', beskrivelse: 'Den vanlige bedriftsnettsiden', min: 12900, max: 16900, manedspris: 890 },
  { id: '6-10', label: '6–10 sider', beskrivelse: 'Flere tjenester, mer innhold', min: 18900, max: 24900, manedspris: 1190 },
  { id: '10+', label: '10+ sider', beskrivelse: 'Stor struktur eller egen funksjonalitet', min: 27900, max: 36900, manedspris: 1590 },
];

export const kalkulatorTillegg = [
  { id: 'booking', label: 'Booking-løsning', min: 3500, max: 4500 },
  { id: 'nettbutikk', label: 'Nettbutikk / betaling', min: 5500, max: 7500 },
  { id: 'sprak', label: 'Flere språk', min: 2500, max: 3500 },
  { id: 'seo', label: 'Utvidet SEO-pakke', min: 3000, max: 4000 },
  { id: 'integrasjon', label: 'Integrasjoner (CRM/regnskap)', min: 4000, max: 5500 },
];

// Haster-tillegget er en hastighetspremie, ikke en funksjon, derfor
// prosent på totalen i stedet for et flatt kronebeløp.
export const kalkulatorHaster = { minFaktor: 1.15, maxFaktor: 1.20 };

/* ---------------------------------------------------------------
   SAMMENLIGN. Ærlige side-mot-side med de vanligste DIY-alternativene
   kunden uansett vurderer. Fortsatt ingen Shopify-side: nettbutikk er
   ikke et eget spor i prismodellen, så den sammenligningen ville vært
   mot noe med udefinert pris. Landingssiden /lage-nettbutikk finnes
   likevel, fordi søket eksisterer, men den oppgir bevisst ingen fastpris
   og henviser til en samtale i stedet. Endres dette, endre begge steder.
   --------------------------------------------------------------- */
export const sammenlignOversikt = [
  {
    slug: 'wix',
    navn: 'Wix',
    rute: '/sammenlign/wix',
    kort: 'Bygge selv med en drag-and-drop-bygger, eller få det gjort for deg? Pris over tid, eierskap og hastighet side om side.',
  },
  {
    slug: 'wordpress',
    navn: 'WordPress',
    rute: '/sammenlign/wordpress',
    kort: 'Fleksibelt, men hvem vedlikeholder det? Sikkerhet, plugin-oppdateringer og hva det faktisk koster over tid.',
  },
];

export const sammenlignWix = {
  navn: 'Wix',
  intro: 'Wix er et solid verktøy for å bygge en nettside selv. Spørsmålet er ikke om det virker, men om det er din tid eller din nettside som skal betale for det.',
  rader: [
    ['Hvem bygger siden', 'Du, i byggeren deres', 'Jeg, fra første skisse til lansering'],
    ['Pris', 'Abonnement, hver måned, for alltid', 'Fastpris én gang, eller drift du kan si opp'],
    ['Eierskap', 'Låst til Wix sin plattform', 'Du eier filene, kan ta dem med deg videre'],
    ['Hastighet og SEO', 'Tyngre byggerkode, varierende', 'Håndkodet og lettvekt fra dag én'],
    ['Din tid', 'Du bygger og vedlikeholder selv', 'Jeg bygger, du godkjenner en gratis demo først'],
    ['Support', 'Generisk chat-support', 'Direkte med meg, ikke en helpdesk'],
  ],
  konklusjon: 'Har du tid og lyst til å lære et byggeverktøy, og bedriften tåler at nettsiden ser sånn ut, er Wix et fint sted å starte. Vil du ha en side som er bygget for å konvertere, uten at du selv må bli webdesigner, er det dette jeg gjør.',
};

export const sammenlignWordpress = {
  navn: 'WordPress',
  intro: 'WordPress er gratis å laste ned. Det som koster er alt rundt: hosting, plugins, og noen som følger med når noe går galt, for noe går alltid galt før eller siden.',
  rader: [
    ['Grunnkostnad', 'Gratis kjerne, betal for hosting og plugins løpende', 'Fastpris inkluderer alt fra start'],
    ['Vedlikehold', 'Du eller en utvikler må oppdatere jevnlig', 'Håndkodet, uten plugins å holde ved like'],
    ['Sikkerhet', 'Mest angrepne CMS i verden, krever årvåkenhet', 'Ingen CMS, ingen kjent angrepsflate'],
    ['Ytelse', 'Kan bli tung med mange plugins', 'Lynrask fra første linje kode'],
    ['Eierskap', 'Du eier siden, men trenger teknisk kompetanse for å drifte den', 'Du eier siden, jeg drifter den om du vil slippe'],
    ['Fleksibilitet', 'Enormt plugin-økosystem for spesialbehov', 'Skreddersydd funksjonalitet bygget direkte inn'],
  ],
  konklusjon: 'Trenger du et enormt plugin-økosystem eller har en intern utvikler som følger med, kan WordPress være riktig. De fleste små bedrifter jeg møter vil heller ha en side som bare virker, uten en liste over oppdateringer som venter på dem hver måned.',
};

/* ---------------------------------------------------------------
   METODE. En ekte sekvens, så nummerering er fortjent her
   (og bare her, ikke som stillas over hver seksjon).

   To tekstlengder med vilje: `kort` er én til to setninger skrevet for
   kortet på forsiden, `desc` er den lange versjonen på /metode. Å kutte
   desc ned automatisk (første setning, tegngrense) ville gjort at copyen
   på forsiden endret seg i det stille hver gang noen redigerte desc.
   --------------------------------------------------------------- */
export const stegene = [
  {
    tittel: 'Jeg bygger demoen din',
    tid: '48 timer',
    kort: 'Send meg navnet på bedriften, så finner jeg resten selv. Du får en ekte side å klikke i, ikke en skisse.',
    desc: 'Du sender meg noen linjer om bedriften, eller bare navnet, så finner jeg resten selv. Så bygger jeg et ferdig utkast av den nye siden din. Ikke en skisse i PowerPoint, men en ekte side du kan åpne på mobilen og klikke rundt i.',
    punkter: ['Koster ingenting, uansett hva du lander på', 'Du trenger ikke levere noe på forhånd', 'Demoen ligger på en privat lenke bare du får'],
  },
  {
    tittel: 'Du sier hva du synes',
    tid: 'Ditt tempo',
    kort: 'Se på den i fred og ro. Liker du den ikke, sletter jeg den, og du skylder meg ingenting.',
    desc: 'Se på den i fred og ro, gjerne sammen med noen. Liker du den ikke, sier du fra. Jeg sletter den, og ingen skylder noen noe. Liker du retningen, justerer jeg farger, tekst og struktur til den sitter. Det er nå vi blir enige om prisen, og den er fast.',
    punkter: ['Ingen forpliktelse før du sier ja', 'Fast pris avtalt før jeg gjør ferdig', 'Du bestemmer hva som skal med'],
  },
  {
    tittel: 'Jeg lanserer',
    tid: '1–2 uker',
    kort: 'Domene, SSL og hosting ordner jeg. Har du en gammel side, byttes den uten nedetid.',
    desc: 'Domene, SSL og lynrask hosting. Har du en gammel side, flytter jeg deg over uten nedetid. Jeg kobler på Google, tester på ekte mobiler, og sier fra når alt er oppe.',
    punkter: ['Domene og SSL ordner jeg', 'Søkemotor-oppsett fra dag én', 'Gammel side byttes uten nedetid'],
  },
  {
    tittel: 'Jeg passer på, hvis du vil',
    tid: 'Løpende',
    kort: 'Med driftsavtale følger jeg med videre. Trenger du en endring, sender du en e-post.',
    desc: 'Velger du driftsavtale, følger jeg med videre: hosting, backup, overvåking og support. Trenger du å bytte et bilde eller legge til en ansatt, sender du en e-post, og som regel er det gjort samme dag. Velger du engangspris, får du alle filene og hjelp til å komme i gang selv.',
    punkter: ['Rimelige endringer inkludert i driftsavtalen', 'Du eier innholdet uansett modell', 'Bytt modell senere om behovet endrer seg'],
  },
];

/* ---------------------------------------------------------------
   FAQ. Spørsmålene folk faktisk stiller før de sier ja.
   --------------------------------------------------------------- */
export const sporsmal = [
  {
    q: 'Hva koster en nettside for en liten bedrift?',
    a: 'Engangspris starter på 9 999 kr eks. mva, og da eier du alt. Vil du heller at jeg drifter siden for deg, starter det på 690 kr i måneden. Endelig pris avhenger av antall sider og funksjoner, men du får alltid en fast pris før jeg begynner, og en gratis demo først, så du ser resultatet før du betaler noe.',
  },
  {
    q: 'Hva er en gratis demo, og hva forplikter det meg til?',
    a: 'Absolutt ingenting. Jeg bygger et ferdig, klikkbart utkast av din nye nettside, med ditt innhold, helt uten kostnad. Liker du den ikke, sletter jeg den og du har ikke betalt en krone. Du betaler først når du har sagt ja til noe du faktisk er fornøyd med.',
  },
  {
    q: 'Hvor lang tid tar det?',
    a: 'Demoen er som regel klar på 48 timer. Fra du godkjenner den til siden er oppe på ditt eget domene, går det vanligvis en til to uker. Tempoet styres mest av hvor raskt du rekker å gi tilbakemelding. Jeg er sjelden flaskehalsen.',
  },
  {
    q: 'Eier jeg nettsiden selv?',
    a: 'Ja. Med engangspris får du alle filene overlevert og eier hele løsningen. Velger du drift hos meg, eier du fortsatt innholdet og designet, og du kan når som helst ta med deg siden videre til noen andre. Ingen binding, ingen låsing.',
  },
  {
    q: 'Hva om jeg ikke liker utkastet?',
    a: 'Da sier du fra, så justerer vi. Eller vi avslutter der, helt uforpliktende. Det er hele poenget med å bygge demoen først: du risikerer ingenting ved å la meg prøve.',
  },
  {
    q: 'Er siden optimalisert for Google og mobil?',
    a: 'Ja, alltid. Riktig struktur, metadata og hastighet ligger i bunnen fra start, og alt jeg leverer er fullt responsivt. Det ser like bra ut på mobilen i bilen som på skjermen på kontoret. Jeg setter også opp Analytics og Search Console, så du kan se hva som faktisk skjer.',
  },
  {
    q: 'Hvem er det egentlig jeg snakker med?',
    a: 'Meg. Aleksander. Jeg designer, koder, skriver og setter opp serveren selv, så det er ingen prosjektleder i mellom og ingen kø. Sender du en e-post, leses den av personen som faktisk bygger siden din.',
  },
  {
    q: 'Hva skjer etter at siden er lansert?',
    a: 'Det bestemmer du. Enten drifter du siden selv med full kontroll, eller så tar jeg hosting, backup, overvåking og rimelige innholdsendringer til en fast månedspris. Trenger du en endring, sender du en e-post, og som regel er det gjort samme dag.',
  },
];

/* Google leser dette og kan vise spørsmålene direkte i søkeresultatet.
   Utledes alltid fra den samme listen som vises på siden, så schema og
   synlig tekst ikke kan komme ut av synk. */
export const lagFaqSchema = (liste) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: liste.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const faqSchema = lagFaqSchema(sporsmal);

/* Nettstedets adresse ett sted, så schema-hjelperne under slipper å
   gjenta den i hver fil. */
export const NETTSTED = 'https://oppskalert.no';

/* Brødsmuler som strukturert data.
 *
 * Google bruker dem til å bytte ut den nakne URL-en i søkeresultatet med
 * en lesbar sti («oppskalert.no › Vanlige spørsmål › Hva koster …»), og
 * de forteller samtidig hvilken side som er forelder til hvilken. Uten
 * dem framstår hver underside som løsrevet, også når den ligger tre nivå
 * ned i menyen.
 *
 * Tar en liste av { navn, rute }. Forsiden legges på som første ledd her,
 * så ingen kaller kan glemme den. Siste ledd skal være siden man står
 * på, og den skal ha `rute` selv om den peker på seg selv: Google
 * forventer et item på hvert ledd.
 *
 *   lagBrodsmuleSchema([
 *     { navn: 'Vanlige spørsmål', rute: '/vanlige-sporsmal' },
 *     { navn: item.q, rute: `/vanlige-sporsmal/${item.slug}` },
 *   ])
 */
export const lagBrodsmuleSchema = (steg) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ navn: 'Forside', rute: '/' }, ...steg].map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.navn,
    item: `${NETTSTED}${s.rute === '/' ? '/' : s.rute}`,
  })),
});

/* ---------------------------------------------------------------
   FAQ per side.

   Hver rute som viser en FAQ skal ha sitt eget sett. Grunnen er ikke
   variasjon for variasjonens skyld: to ruter som viser den samme
   FAQPage-en er duplisert strukturert data på to URLer, og da velger
   Google én av dem og forkaster den andre. /priser og forsiden delte
   nøyaktig samme åtte spørsmål fram til 13. august 2026.

   Avgrensningen mellom sidene er den samme som for brødteksten, og den
   står i kommentaren øverst i hver sidefil: /priser eier pris,
   /webdesign-oslo eier det lokale, /nettside-design eier det visuelle.
   Derfor svarer landingssidene bevisst kort på pris og lenker videre,
   i stedet for å gjenta prislisten og konkurrere med /priser.
   --------------------------------------------------------------- */

/* /priser. Prisspesifikke spørsmål, ingen overlapp med listen over.
   Tallene skal alltid stemme med `pakker` og `prismodeller` lenger oppe
   i denne filen. Endrer du prisene der, endre dem her også. */
export const prisSporsmal = [
  {
    q: 'Hva koster en nettside i Norge i 2026?',
    a: 'Hos meg starter en enkel landingsside på 9 999 kr eks. mva. En vanlig bedriftsnettside på to til fem sider ligger mellom 12 900 og 16 900 kr, seks til ti sider mellom 18 900 og 24 900 kr, og over ti sider fra 27 900 kr. Du får alltid en fast pris før jeg skriver en linje kode, og du kan regne ut ditt eget estimat i kalkulatoren.',
  },
  {
    q: 'Hva er forskjellen på engangspris og driftsavtale?',
    a: 'Engangspris betyr at du betaler én gang, får alle filene og eier hele løsningen. Driftsavtale betyr at jeg bygger siden og passer på den videre, fra 690 kr i måneden, med hosting, backup, overvåking og rimelige endringer inkludert. Det er den samme siden i begge tilfeller. Forskjellen er om du vil eie det tekniske selv, eller la meg ta det.',
  },
  {
    q: 'Kommer det noe på toppen av prisen?',
    a: 'Prisene er eks. mva, og domenet kommer i tillegg. Et .no-domene koster typisk 100 til 300 kr i året, og det står i ditt navn fra dag én. Ut over det er det ingen oppstartsavgift, ingen lisenser og ingen plugin-abonnementer, for siden er håndkodet og har ikke noe å abonnere på.',
  },
  {
    q: 'Hva koster det å endre noe etter at siden er lansert?',
    a: 'Har du driftsavtale, er rimelige endringer inkludert. Skal du bytte et bilde, rette en tekst eller legge til en ansatt, sender du en e-post, og som regel er det gjort samme dag. Har du engangspris, avtaler vi pris per jobb, eller du gjør det selv i filene du allerede eier.',
  },
  {
    q: 'Kan jeg bytte mellom modellene senere?',
    a: 'Ja, begge veier. Det er ingen bindingstid på driftsavtalen, så du kan si opp når du vil. Innholdet og designet er ditt uansett hvilken modell du står på, så du står aldri fast, og overgangen finner vi ut av når den er aktuell.',
  },
  {
    q: 'Hvorfor fast pris og ikke timepris?',
    a: 'Fordi timepris flytter risikoen over på deg. Går jobben tregere enn ventet, er det du som betaler for det. Med fast pris avtalt før jeg begynner vet du nøyaktig hva sluttsummen blir, og det er min jobb å treffe estimatet. Vokser omfanget underveis, sier jeg fra og vi avtaler det nye tallet før jeg gjør noe.',
  },
];

/* De fem søkeordsdrevne landingssidene. Fire til fem spørsmål hver, valgt
   ut fra hva folk faktisk spør om akkurat det temaet. */
export const landingsSporsmal = {
  seo: [
    {
      q: 'Hvor lang tid tar det før søkemotoroptimalisering gir resultater?',
      a: 'På et nytt domene ser du gjerne de første visningene i Search Console etter noen uker, og posisjonene setter seg over et par måneder. Har du et etablert domene og problemet er teknisk, går det fortere: retter vi en sitemap som svarer med feilmelding, kan sidene være indeksert i løpet av dager. Alle som lover deg resultater neste uke selger deg noe annet enn de sier.',
    },
    {
      q: 'Kan du garantere at jeg havner først i Google?',
      a: 'Nei, og ingen kan det. Google er ikke en knapp noen kan trykke på. Det jeg kan love er at du får se målingene selv. Search Console settes opp på ditt eget domene med tilgang til deg, så du ser hvilke søk du dukker opp på, hvor mange som klikker, og om kurven peker riktig vei.',
    },
    {
      q: 'Hva er forskjellen på å rangere i Google og å bli sitert av ChatGPT?',
      a: 'Google sender folk til siden din. En AI-assistent svarer i stedet for deg, og nevner deg bare hvis den har noe å nevne. Kravene overlapper mye, men de fleste AI-crawlere kjører ikke JavaScript i det hele tatt, så en side som Google så vidt klarer å tolke er helt tom for dem. Ferdig lest tekst, strukturerte data og en llms.txt er det som skiller.',
    },
    {
      q: 'Må jeg kjøpe en ny nettside for at du skal jobbe med søk?',
      a: 'Nei. Jeg begynner med å hente siden du har slik en robot gjør, og si hva jeg finner. Ofte ligger de største funnene i ting som kan rettes på siden som allerede står der. Er selve fundamentet problemet, sier jeg det rett ut, og så er det ditt valg hva du gjør med det.',
    },
    {
      q: 'Hva koster søkemotoroptimalisering hos deg?',
      a: 'Det er ikke et eget abonnement. Søkemotoroptimalisering ligger inne som grunnarbeid i alle nye sider jeg bygger, og som en kvartalsvis gjennomgang i det øverste driftsnivået. Trenger du en engangsjobb på en side du allerede har, avtaler vi fast pris etter at jeg har sett hva som faktisk står i veien.',
    },
  ],

  oslo: [
    {
      q: 'Må jeg møte deg fysisk?',
      a: 'Nei, men du kan. Jeg holder til på Røa og tar gjerne en kaffe før vi begynner, hvis det gjør beslutningen lettere. Ellers går det meste på e-post og telefon. Uansett snakker du med meg hele veien, ikke med en prosjektkoordinator som videreformidler.',
    },
    {
      q: 'Jobber du bare med bedrifter i Oslo?',
      a: 'Nei, jeg jobber over hele landet. Men søker noen etter webdesign i Oslo, leter de som regel etter noen de kan ringe og holde ansvarlig, og da spiller det inn at jeg faktisk sitter her. For selve jobben betyr geografien lite.',
    },
    {
      q: 'Hvorfor spiller det inn for søk at bedriften ligger i Oslo?',
      a: 'Fordi lokale søk rangeres på andre signaler enn vanlige søk. Google Bedriftsprofil må være koblet riktig, adressen må stå likt på tvers av oppføringer, og siden må gjøre det tydelig for søkemotorene hvor du holder til. Det bygger jeg inn fra start, ikke som et tillegg etterpå.',
    },
    {
      q: 'Hvor lang tid tar det fra start til lansering?',
      a: 'Demoen er som regel klar på 48 timer. Fra du godkjenner den til siden er oppe på ditt eget domene går det vanligvis en til to uker. Har du en gammel side, byttes den uten nedetid. Tempoet styres mest av hvor raskt du rekker å gi tilbakemelding.',
    },
  ],

  design: [
    {
      q: 'Bruker du maler?',
      a: 'Nei. Jeg tegner strukturen for din bedrift og koder den for hånd. Maler er raske fordi noen andre har tatt alle valgene, men de har tatt dem for en annen bedrift enn din. Du ender med seksjoner du ikke trenger, og mangler den ene som ville solgt.',
    },
    {
      q: 'Kan jeg bruke logoen og fargene vi har fra før?',
      a: 'Ja, og som regel bør du. Har du en visuell identitet som fungerer, bygger jeg videre på den. Har du bare en logo og ingen retning ellers, foreslår jeg typografi og farger som kler den, og du sier hva du synes før noe er låst.',
    },
    {
      q: 'Får jeg se designet før jeg betaler?',
      a: 'Ja, hele siden. Ikke en skisse i et presentasjonsverktøy, men en ekte side du kan åpne på mobilen og klikke rundt i, bygget med ditt innhold. Er retningen feil, sier du det, og det har ikke kostet deg noe.',
    },
    {
      q: 'Hva om jeg vil endre designet senere?',
      a: 'Det går fint. Siden er håndkodet uten maler og plugins under, så en endring ett sted knekker sjelden noe et annet sted. Har du driftsavtale, sender du en e-post. Har du engangspris, eier du filene og kan gjøre det selv eller sette det bort til hvem du vil.',
    },
  ],

  bedrift: [
    {
      q: 'Hva må en bedriftsnettside inneholde for å være lovlig?',
      a: 'To ting rammer også enkeltpersonforetak. Nettsteder rettet mot allmennheten skal følge WCAG 2.1 nivå AA, altså nok kontrast mellom tekst og bakgrunn, beskrivende alt-tekst på bilder, og at hele siden kan brukes med tastatur alene. Og har du et kontaktskjema eller et analyseverktøy, behandler du personopplysninger, så du trenger personvernerklæring og et samtykke der det er like enkelt å si nei som ja. Forhåndsavkryssede bokser er ikke lov.',
    },
    {
      q: 'Hva trenger jeg å ha klart før vi setter i gang?',
      a: 'Navnet på bedriften. Resten finner jeg selv, og jeg bygger demoen før du har levert noe som helst. Har du bilder, tekster eller en logo du vil bruke, tar jeg gjerne imot det, men det er ikke noe du trenger å vente på før vi kommer i gang.',
    },
    {
      q: 'Kan du flytte nettsiden vi har i dag?',
      a: 'Ja. Har du en gammel side, flytter jeg deg over uten nedetid, og de gamle adressene sendes videre, så du ikke mister det du har bygget opp i Google. Står domenet i en tidligere leverandørs navn, hjelper jeg deg med å få det over i ditt eget.',
    },
    {
      q: 'Hvem eier nettsiden etterpå?',
      a: 'Du. Domenet står i ditt navn fra dag én, og du eier innholdet og designet uansett hvilken modell du velger. Velger du driftsavtale, er det fordi du vil slippe det tekniske, ikke fordi du er låst. Du kan når som helst ta med deg siden videre til noen andre.',
    },
  ],

  nettbutikk: [
    {
      q: 'Hva koster det å lage en nettbutikk?',
      a: 'Nettbutikk er den ene leveransen jeg ikke oppgir fastpris på før vi har snakket sammen. Fem produkter uten varianter og ti tusen produkter med lager, størrelser og regnskapsintegrasjon er to helt forskjellige jobber. Det du får er en fast pris før jeg skriver en linje kode, akkurat som på alt annet.',
    },
    {
      q: 'Kan kundene betale med Vipps?',
      a: 'Ja. I Norge er Vipps ikke et alternativ, det er forventningen. Vipps og kort settes opp og testes før butikken åpner, og Vipps er tilgjengelig fra første skjerm i kassen, ikke gjemt bak et valg lenger nede.',
    },
    {
      q: 'Hvordan fungerer frakt?',
      a: 'Frakt settes opp mot Bring eller Posten, med riktige priser i kassen. Det viktigste er at fraktprisen er synlig tidlig, og ikke dukker opp som en overraskelse i siste skjermbilde. Det er en av de vanligste grunnene til at folk forlater handlekurven.',
    },
    {
      q: 'Kan jeg legge inn og endre produkter selv?',
      a: 'Ja. Du får lagerstyring og ordreoversikt du klarer å bruke uten opplæring. Å legge til et produkt, justere en pris eller se hva som er solgt skal du kunne gjøre selv, uten å sende meg en e-post om det.',
    },
  ],
};

/* ---------------------------------------------------------------
   PORTEFØLJE. Ekte sider i drift for ekte norske bedrifter.
   --------------------------------------------------------------- */
/* Porteføljen. Rekkefølgen er den fra studio-mal-demoen, se
   inspirasjon/demo-studio-mal.md.

   `full` er en fullsides-fangst på 640 x 2500 som ruller sakte inni en
   nettleserramme på kortet. `til` er hvor langt den rammen skal rulle, i
   prosent av bildehøyden, og er MÅLT per side, ikke satt likt for alle:
   fangsten er 2500 px høy uansett hvor lang siden faktisk er, så en kort
   side har blank plass nederst. Ruller den like langt som en lang side,
   står kortet tomt i halve runden. Målt 19. august 2026 med
   scratchpad-skriptet fangst.mjs, som skriver ut anbefalt verdi selv.

   Regnestykket: 2500 / 640 = 3,906. Vinduet står i 4:3 og viser
   0,75 / 3,906 = 19,2 % av bildet av gangen. Endres fangsthøyden eller
   vindusformatet, må `til` regnes om for alle.

   irmelindrake.no er ute av visningslisten. Det er en kollegas prosjekt
   uten vår tilgang, står i CLAUDE.md som utenfor rekkevidde. Den ligger
   igjen nederst uten `full`, så den fortsatt finnes for eventuelle
   lenker, men vises ikke i rammene på forsiden.

   alphanegotiations.com var ute av samme grunn (HTTP 500, footer som
   krediterte et annet byrå), men er tilbake fra 25. august 2026: begge
   feilene var rettet ved ny måling. Se kommentaren ved oppføringen. */
/* Porteføljebildene finnes i to oppløsninger. Filnavnet er 1x, det samme
   navnet med @2x er dobbelt så bredt. Skjermbildene ble tidligere servert
   i 640 px og vist på 646, altså halv oppløsning på enhver 2x-skjerm, og
   det er den eneste fotografien på siden. srcSet lar 1x-skjermer slippe å
   laste den tunge fila. Legger du inn et nytt prosjekt, skyt begge to. */
export const toganger = (src) => `${src} 1x, ${src.replace('.webp', '@2x.webp')} 2x`;

export const prosjekter = [
  { img: '/websider/woxen-hage.webp', slug: 'woxen-hage', full: '/websider/full/woxen-hage.webp', til: '-81%', navn: 'Woxen Hage', bransje: 'Hagestell · Oslo', url: 'https://www.woxenhage.no/', domene: 'woxenhage.no' },
  { img: '/websider/katrin-brubakk.webp', slug: 'katrin-brubakk', full: '/websider/full/katrin-brubakk.webp', til: '-81%', navn: 'Katrin Brubakk', bransje: 'Psykolog · foredrag', url: 'https://katrinbrubakk.no', domene: 'katrinbrubakk.no' },
  /* Melanie Dahl. Lagt inn 21. august 2026, hentet fra arbeid en annen
     sesjon hadde liggende ukommittert i hovedtreet.

     Merk --til: -33% og ikke -79% som de andre. Fangsten hennes er
     640 x 715, ikke 640 x 2500, fordi melaniedahl.com sin forside faktisk
     bare er 1358 px høy. Det er en todelt inngangsside, Coaching og
     Scenekunst, ikke en lang side. Vinduet viser derfor 67 % av bildet av
     gangen i stedet for 19 %, og rullelengden må regnes ut fra det.
     Kopierer man -79% hit, ruller kortet langt forbi bunnen av bildet. */
  { img: '/websider/melanie-dahl.webp', slug: 'melanie-dahl', full: '/websider/full/melanie-dahl.webp', til: '-34%', navn: 'Melanie Dahl', bransje: 'Skuespill · mental trening', url: 'https://www.melaniedahl.com/', domene: 'melaniedahl.com' },
  /* Alpha Negotiations. Satt tilbake 25. august 2026. Sto ute av arrayen
     siden 21. august fordi siden svarte HTTP 500 og footeren krediterte
     et annet byrå, se CLAUDE.md. Begge var feil ved ny måling: siden
     svarer 200, og footeren peker nå til oppskalert.no. Både --til og
     bildene er tatt på nytt, det gamle skjermbildet hadde en Design
     Lab-knapp brent inn nede til venstre fra en tidligere demo-versjon.
     @2x skutt samtidig med samme rådata, se toganger() over.

     Til er -71%, ikke -79% som de fleste andre: forsiden er 3319 px høy,
     ikke lang nok til å fylle den vanlige 5000 px-fangsten, så bildet er
     640 x 1660, samme prinsipp som Melanie Dahl over. */
  { img: '/websider/alpha-negotiations.webp', slug: 'alpha-negotiations', full: '/websider/full/alpha-negotiations.webp', til: '-71%', navn: 'Alpha Negotiations', bransje: 'Forhandling', url: 'https://alphanegotiations.com', domene: 'alphanegotiations.com' },
  { img: '/websider/samtaleverkstedet.webp', slug: 'samtaleverkstedet', full: '/websider/full/samtaleverkstedet.webp', til: '-79%', navn: 'Samtaleverkstedet', bransje: 'Terapi', url: 'https://samtaleverkstedet.no', domene: 'samtaleverkstedet.no' },
  { img: '/websider/steinar-husby.webp', slug: 'steinar-husby', full: '/websider/full/steinar-husby.webp', til: '-81%', navn: 'Steinar Husby', bransje: 'Foredrag', url: 'https://steinarhusby.no', domene: 'steinarhusby.no' },
  { img: '/websider/progressive-diplomacy.webp', slug: 'progressive-diplomacy', full: '/websider/full/progressive-diplomacy.webp', til: '-79%', navn: 'Progressive Diplomacy', bransje: 'Rådgivning', url: 'https://progressivediplomacy.com', domene: 'progressivediplomacy.com' },
  { img: '/websider/tore-sunde-rasmussen.webp', slug: 'tore-sunde-rasmussen', full: '/websider/full/tore-sunde-rasmussen.webp', til: '-74%', navn: 'Tore Sunde-Rasmussen', bransje: 'Rådgivning', url: 'https://toresunderasmussen.no', domene: 'toresunderasmussen.no' },
  { img: '/websider/oppskalert.webp', navn: 'Oppskalert', bransje: 'Denne siden', url: 'https://oppskalert.no', domene: 'oppskalert.no' },
  { img: '/websider/irmelin-drake-ny.webp', navn: 'Irmelin Drake', bransje: 'Ledelse', url: 'https://irmelindrake.no', domene: 'irmelindrake.no' },
];

/* Kundeomtaler gjengis ordrett slik de ble skrevet. De er ikke
   skrevet om til "jeg"-tonen, for de er ikke mine ord. */
export const omtaler = [
  { sitat: 'Jeg fikk en vennlig henvendelse fra Aleksander i Oppskalert, og ble raskt imponert over kunnskapen og kompetansen deres. Det var lett å si ja til at de skulle oppgradere hjemmesiden min, og jeg er absolutt fornøyd med både samarbeidet og resultatet!', navn: 'Guro Brakestad', firma: 'Familieterapeut og foredragsholder' },
  { sitat: 'Jeg ble veldig fornøyd med resultatet og de leverte raskt!', navn: 'Katrin Brubakk', firma: 'katrinbrubakk.no' },
  { sitat: 'Oppskalert forsto raskt hva vi trengte og leverte en nettside som virkelig representerer oss. Profesjonelt, effektivt og en glede å samarbeide med.', navn: 'Thoralf Stenvold', firma: 'Progressive Diplomacy' },
  { sitat: 'Kjempefornøyd :)', navn: 'Irmelin Drake', firma: 'irmelindrake.no' },
];

/* ---------------------------------------------------------------
   KUNDEVURDERING. Stjernescoren som vises i heroen.

   Står som null med vilje. Så lenge den er null, rendres ingenting,
   verken stjerner eller tekst. Det er det trygge utgangspunktet.

   Grunnen til at den ikke bare er hardkodet til fem stjerner:
   markedsføringsloven krever siden 2022 at en næringsdrivende som
   viser fram kundevurderinger skal kunne dokumentere at de er ekte og
   opplyse hvordan de er samlet inn. En stjernescore ingen kunde har
   gitt er en oppdiktet måling, ikke en avrunding. Det står også som
   anti-referanse i PRODUCT.md under «Unmeasured numbers».

   Skal den fylles ut, må alle fire feltene være ekte og etterprøvbare:

     export const vurdering = {
       score: 5,          // faktisk snitt, ikke avrundet oppover
       antall: 7,          // antall vurderinger snittet bygger på
       kilde: 'Google',    // hvor de ligger, med navn kunden kjenner igjen
       url: 'https://...', // direktelenke dit, så påstanden kan sjekkes
     };

   Lenken er ikke pynt. Den er dokumentasjonen.

   Merk om SEO: ikke legg dette inn som aggregateRating i JSON-LD.
   Google regner vurderinger en virksomhet publiserer om seg selv som
   «self-serving», og de er ikke kvalifisert for stjerner i søkeresultatet.
   Ligger vurderingene på Google Bedriftsprofil, viser Google dem uansett
   selv i kartoppføringen, uten at vi trenger å merke dem opp her. */
export const vurdering = null;

/* ---------------------------------------------------------------
   HERO-BEVIS. Én navngitt kundeuttalelse rett under knappen.

   Dette står her i stedet for en stjernescore, og det er et bevisst
   valg, ikke en midlertidig løsning. Google Bedriftsprofilen har per
   19. august 2026 én anmeldelse. En femmer bygget på én anmeldelse er
   ikke ulovlig i seg selv, men å vise snittet uten å oppgi antallet er
   en villedende utelatelse etter markedsføringsloven § 7: 5 av 5 fra én
   og 5 av 5 fra femti er to helt ulike opplysninger, og leseren kan
   ikke skille dem uten tallet.

   Et navngitt sitat har ikke det problemet. Det er etterprøvbart i seg
   selv, det er konkret, og det sier noe en score ikke sier.

   `indeks` peker inn i omtaler i demo-innhold.js, så teksten aldri
   kommer ut av synk med omtaleseksjonen lenger nede på siden.
   Kortest mulige sitat vinner her: heroen tåler én linje, ikke fire.

   Bytt til `vurdering`-visningen når profilen har nok anmeldelser til
   at snittet betyr noe. Rundt ti er der tallet begynner å bære. */
export const heroBevis = {
  indeks: 1,
  /* Google Bedriftsprofilen. kgmid-formen er kanonisk og knyttet til
     oppføringen selv, i motsetning til en share.google-lenke, som er en
     delingslenke og kan slutte å virke.

     Merk hvordan denne brukes i App.jsx: den gjør IKKE navnet under
     sitatet klikkbart. Sitatet er hentet direkte fra kunden, ikke fra
     Google, og en lenke på navnet ville antydet at akkurat den
     uttalelsen ligger på profilen. Den står som en egen, merket lenke
     ved siden av i stedet. */
  url: 'https://www.google.com/search?kgmid=/g/11z60rck3w',
};
