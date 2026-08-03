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
    fra: '7 990',
    enhet: 'kr',
    periode: 'engangspris',
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
];

export const alltidMed = [
  'Skreddersydd design, håndkodet',
  'Optimalisert for mobil og desktop',
  'Grunnleggende SEO og AI-søk',
  'Tekster ferdigskrevet',
  'Kontaktskjema',
  'Domene- og SSL-oppsett',
  'Google Analytics og Search Console',
  'Lynrask, uten tunge plugins',
];

/* ---------------------------------------------------------------
   DRIFT. Tre nivåer under "Driftet av meg"-paraplyen. Prisene her
   er den eneste kilden — /drift, forsidens Priser-kort og FAQ leser
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

export const driftNotat = 'Alle priser eks. mva. Ingen bindingstid — bytt nivå eller avslutt når du vil.';

/* ---------------------------------------------------------------
   KALKULATOR. Selvbetjent prisestimat. Grunnpris etter omfang,
   pluss flate påslag per funksjon. Alt er fortsatt skreddersydd og
   håndkodet — det finnes bevisst ingen "mal"-tier, siden det ville
   motsagt alltidMed over. Tallene er godkjent 2026-08-03; endre kun
   her, så følger kalkulatoren automatisk med.
   --------------------------------------------------------------- */
export const kalkulatorOmfang = [
  { id: '1', label: '1 side', beskrivelse: 'Landingsside eller digitalt visittkort', min: 7990, max: 9990 },
  { id: '2-5', label: '2–5 sider', beskrivelse: 'Den vanlige bedriftsnettsiden', min: 12900, max: 16900 },
  { id: '6-10', label: '6–10 sider', beskrivelse: 'Flere tjenester, mer innhold', min: 18900, max: 24900 },
  { id: '10+', label: '10+ sider', beskrivelse: 'Stor struktur eller egen funksjonalitet', min: 27900, max: 36900 },
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
   kunden uansett vurderer. Ingen Shopify-side — nettbutikk selges
   ikke som eget spor i dag, så den sammenligningen ville vært mot
   noe jeg ikke tilbyr.
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
  intro: 'WordPress er gratis å laste ned. Det som koster er alt rundt: hosting, plugins, og noen som følger med når noe går galt — for noe går alltid galt før eller siden.',
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
   --------------------------------------------------------------- */
export const stegene = [
  {
    tittel: 'Jeg bygger demoen din',
    tid: 'Få dager',
    desc: 'Du sender meg noen linjer om bedriften, eller bare navnet, så finner jeg resten selv. Så bygger jeg et ferdig utkast av den nye siden din. Ikke en skisse i PowerPoint, men en ekte side du kan åpne på mobilen og klikke rundt i.',
    punkter: ['Koster ingenting, uansett hva du lander på', 'Du trenger ikke levere noe på forhånd', 'Demoen ligger på en privat lenke bare du får'],
  },
  {
    tittel: 'Du sier hva du synes',
    tid: 'Ditt tempo',
    desc: 'Se på den i fred og ro, gjerne sammen med noen. Liker du den ikke, sier du fra. Jeg sletter den, og ingen skylder noen noe. Liker du retningen, justerer jeg farger, tekst og struktur til den sitter. Det er nå vi blir enige om prisen, og den er fast.',
    punkter: ['Ingen forpliktelse før du sier ja', 'Fast pris avtalt før jeg gjør ferdig', 'Du bestemmer hva som skal med'],
  },
  {
    tittel: 'Jeg lanserer',
    tid: '1–2 uker',
    desc: 'Domene, SSL og lynrask hosting. Har du en gammel side, flytter jeg deg over uten nedetid. Jeg kobler på Google, tester på ekte mobiler, og sier fra når alt er oppe.',
    punkter: ['Domene og SSL ordner jeg', 'Søkemotor-oppsett fra dag én', 'Gammel side byttes uten nedetid'],
  },
  {
    tittel: 'Jeg passer på, hvis du vil',
    tid: 'Løpende',
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
    a: 'Engangspris starter på 7 990 kr eks. mva, og da eier du alt. Vil du heller at jeg drifter siden for deg, starter det på 690 kr i måneden. Endelig pris avhenger av antall sider og funksjoner, men du får alltid en fast pris før jeg begynner, og en gratis demo først, så du ser resultatet før du betaler noe.',
  },
  {
    q: 'Hva er en gratis demo, og hva forplikter det meg til?',
    a: 'Absolutt ingenting. Jeg bygger et ferdig, klikkbart utkast av din nye nettside, med ditt innhold, helt uten kostnad. Liker du den ikke, sletter jeg den og du har ikke betalt en krone. Du betaler først når du har sagt ja til noe du faktisk er fornøyd med.',
  },
  {
    q: 'Hvor lang tid tar det?',
    a: 'Demoen er som regel klar på få dager. Fra du godkjenner den til siden er oppe på ditt eget domene, går det vanligvis en til to uker. Tempoet styres mest av hvor raskt du rekker å gi tilbakemelding. Jeg er sjelden flaskehalsen.',
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
    a: 'Ja, alltid. Riktig struktur, metadata og hastighet ligger i bunn fra start, og alt jeg leverer er fullt responsivt. Det ser like bra ut på mobilen i bilen som på skjermen på kontoret. Jeg setter også opp Analytics og Search Console, så du kan se hva som faktisk skjer.',
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
   Utledes fra samme liste som vises, så de aldri kommer ut av synk. */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: sporsmal.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* ---------------------------------------------------------------
   PORTEFØLJE. Ekte sider i drift for ekte norske bedrifter.
   --------------------------------------------------------------- */
export const prosjekter = [
  { img: '/websider/woxen-hage.webp', navn: 'Woxen Hage', bransje: 'Hagestell · Oslo', url: 'https://www.woxenhage.no/', domene: 'woxenhage.no' },
  { img: '/websider/katrin-brubakk.webp', navn: 'Katrin Brubakk', bransje: 'Psykolog · foredrag', url: 'https://katrinbrubakk.no', domene: 'katrinbrubakk.no' },
  { img: '/websider/alpha-negotiations.webp', navn: 'Alpha Negotiations', bransje: 'Forhandling', url: 'https://alphanegotiations.com', domene: 'alphanegotiations.com' },
  { img: '/websider/progressive-diplomacy.webp', navn: 'Progressive Diplomacy', bransje: 'Rådgivning', url: 'https://progressivediplomacy.com', domene: 'progressivediplomacy.com' },
  { img: '/websider/irmelin-drake-ny.webp', navn: 'Irmelin Drake', bransje: 'Ledelse', url: 'https://irmelindrake.no', domene: 'irmelindrake.no' },
  { img: '/websider/steinar-husby.webp', navn: 'Steinar Husby', bransje: 'Foredrag', url: 'https://steinarhusby.no', domene: 'steinarhusby.no' },
  { img: '/websider/samtaleverkstedet.webp', navn: 'Samtaleverkstedet', bransje: 'Terapi', url: 'https://samtaleverkstedet.no', domene: 'samtaleverkstedet.no' },
  { img: '/websider/tore-sunde-rasmussen.webp', navn: 'Tore Sunde-Rasmussen', bransje: 'Rådgivning', url: 'https://toresunderasmussen.no', domene: 'toresunderasmussen.no' },
  { img: '/websider/oppskalert.webp', navn: 'Oppskalert', bransje: 'Denne siden', url: 'https://oppskalert.no', domene: 'oppskalert.no' },
];

/* Kundeomtaler gjengis ordrett slik de ble skrevet. De er ikke
   skrevet om til "jeg"-tonen, for de er ikke mine ord. */
export const omtaler = [
  { sitat: 'Jeg fikk en vennlig henvendelse fra Aleksander i Oppskalert, og ble raskt imponert over kunnskapen og kompetansen deres. Det var lett å si ja til at de skulle oppgradere hjemmesiden min, og jeg er absolutt fornøyd med både samarbeidet og resultatet!', navn: 'Guro Brakestad', firma: 'Familieterapeut og foredragsholder' },
  { sitat: 'Jeg ble veldig fornøyd med resultatet og de leverte raskt!', navn: 'Katrin Brubakk', firma: 'katrinbrubakk.no' },
  { sitat: 'Oppskalert forsto raskt hva vi trengte og leverte en nettside som virkelig representerer oss. Profesjonelt, effektivt og en glede å samarbeide med.', navn: 'Thoralf Stenvold', firma: 'Progressive Diplomacy' },
  { sitat: 'Kjempefornøyd :)', navn: 'Irmelin Drake', firma: 'irmelindrake.no' },
];
