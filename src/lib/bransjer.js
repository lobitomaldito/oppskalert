/* Én landingsside per bransje: /nettside-for-<slug>.
 *
 * Valgt etter hvem som faktisk kjøper (prospects der stage='sold') og hvem
 * som svarer ja på kald mail (viewet nisje_resultat), 12.11.2026. Søkevolumet
 * på «nettside for <bransje>» er lite eller skjult i Google-dataene, så sidene
 * lever av tre andre ting: lenken i kald mail og demoer, AI-svar på «hvem lager
 * nettsider for fysioterapeuter», og at leseren kjenner igjen sin egen hverdag.
 *
 * Hver side har egne fakta, egne punkter og egne spørsmål. Sider der bare
 * bransjeordet er byttet ut, er det Google kaller innhold i stor skala og
 * straffer (se ~/.claude/assets/seo/klynger.md punkt 2). Kan to sider bytte
 * tekst uten at noen merker det, er én av dem overflødig.
 *
 * Vanlig ESM uten Vite-funksjoner: api/sitemap.xml.js og scripts/prerender.mjs
 * importerer fila i Node (felle 2 i CLAUDE.md). */

import { prismodeller } from './site.js';

const pris = (id) => prismodeller.find((p) => p.id === id)?.fra;

/* Prissvaret er likt i form for alle bransjer, men eksemplet i siste setning
   er bransjens eget. Tallene hentes fra prismodeller, så de følger prissiden. */
const prisSvar = (hvaDeTrenger) =>
  `Enkel, én side med det viktigste, koster ${pris('enkel')} kr eks. mva. Medium, med alle sidene du har i dag og tekster skrevet for Google og AI-søk, koster ${pris('medium')} kr. Komplett, med ${hvaDeTrenger} og tre måneder SEO, starter på ${pris('komplett')} kr. Hosting er med i prisen, du eier siden, og du ser et gratis utkast før du bestemmer deg.`;

/* Bildene er fra Pexels (gratis til kommersiell bruk). Fotografene står i
   public/bransjer/KREDITT.md. */

export const RUTE_BRANSJE = (slug) => `/nettside-for-${slug}`;

export const bransjer = [
  {
    slug: 'terapeut',
    bilder: [
      { src: '/bransjer/terapeut-1.webp', alt: 'To kvinner i samtale i et lyst terapirom' },
      { src: '/bransjer/terapeut-2.webp', alt: 'Terapeut som lytter til en klient' },
    ],
    meny: 'Nettside for terapeut',
    tittel: 'Nettside for terapeut og psykolog, fast pris',
    beskrivelse:
      'Nettside for terapeuter, psykologer og coacher. Pris, ventetid og første time forklart på siden, og ingen Meta-piksel. Fast pris, gratis utkast.',
    sokeord: ['nettside for terapeut', 'nettside for psykolog', 'hjemmeside terapeut', 'nettside coach'],
    h1: 'Nettside for terapeuter,',
    uthevet: 'som gjør første steg lettere.',
    lede: `Jeg lager nettsider for terapeuter, psykologer og coacher til fast pris fra ${pris('enkel')} kr eks. mva. Den som leter etter terapi, vil vite hva en time koster, om du har ledig tid og hvordan første time foregår, før de tør å ta kontakt. Siden svarer på det, i en rolig tone.`,
    avsnitt: [
      {
        tittel: 'Det klientene lurer på',
        uthevet: 'før de skriver til deg.',
        tekst: [
          'Å kontakte en terapeut er et stort steg for mange. De fleste leser siden flere ganger først, og leter etter tre svar: hva en time koster, hvor lenge de må vente, og om du jobber med det de strever med. Mangler svaret, blir det ofte ingen henvendelse.',
          'Derfor står pris og varighet i teksten på siden, i tillegg til på prissiden. Temaene du jobber med får hver sin side, med ordene folk skriver i søket, som «parterapi i Tønsberg». Det er de sidene Google og ChatGPT viser når noen spør.',
        ],
      },
      {
        tittel: 'Personvern',
        uthevet: 'uten sporing hos Facebook.',
        tekst: [
          'En nettside for helse og terapi skal ikke sende besøkendes data til Meta. I Sverige fikk Apoteket 37 millioner svenske kroner i bot i 2024 for helsedata som gikk til Meta gjennom pikselen på nettsiden.',
          'Sidene jeg lager har ingen Meta-piksel, og ingenting lagres i nettleseren før den besøkende har sagt ja, slik ekomloven krever fra 2025.',
        ],
      },
      {
        tittel: 'Timebestilling',
        uthevet: 'i systemet du bruker.',
        tekst: [
          `Bruker du et bookingsystem, kan siden vise ledige timer derfra, så klientene slipper å ringe. Det hører til Komplett, fra ${pris('komplett')} kr. Skal siden kobles til en timebok du har fra før, får du prisen før jeg begynner.`,
        ],
      },
    ],
    punktTittel: 'Det klientene',
    punktUthevet: 'ser etter.',
    punkter: [
      'Pris per time og hvor lang timen er, skrevet i teksten',
      'Ventetid eller neste ledige time',
      'Hvem du er, utdanningen din og hvilke foreninger du er medlem av',
      'Temaene du jobber med, hver på sin egen side',
      'Om timene er på kontoret, på video eller begge deler',
      'Hvordan første time foregår',
      'Taushetsplikt, og hva som skjer med det de skriver til deg',
      'Ingen sporing av besøkende uten samtykke',
    ],
    caser: ['samtaleverkstedet', 'katrin-brubakk', 'melanie-dahl'],
    faq: [
      { q: 'Hva koster en nettside for en terapeut?', a: prisSvar('timebestilling') },
      {
        q: 'Kan jeg endre tekstene selv?',
        a: 'Ja. Du endrer tekst og bilder selv i et redigeringspanel på siden. Jeg skriver første versjon ut fra det du sender meg og det klientene dine søker på, og du retter det som ikke stemmer faglig før noe publiseres.',
      },
      {
        q: 'Hvordan blir jeg funnet når noen søker etter terapeut der jeg bor?',
        a: 'Med en egen side for hvert tema og hvert sted der du har kontor, en utfylt Google-bedriftsprofil og omtaler. Står du i kataloger som klienter bruker, skal navn, adresse og telefon være likt der og på siden.',
      },
    ],
  },
  {
    slug: 'klinikk',
    bilder: [
      { src: '/bransjer/klinikk-1.webp', alt: 'Fysioterapeut som behandler en pasient på benken' },
      { src: '/bransjer/klinikk-2.webp', alt: 'Behandler som undersøker en pasient på en klinikk' },
    ],
    meny: 'Nettside for klinikk',
    tittel: 'Nettside for klinikk og behandler, fast pris',
    beskrivelse:
      'Nettside for fysioterapeuter, osteopater, naprapater og andre behandlere. En side per plage og behandling, med pris og ventetid. Fast pris, gratis utkast.',
    sokeord: ['nettside for klinikk', 'nettside fysioterapeut', 'nettside osteopat', 'hjemmeside behandler'],
    h1: 'Nettside for klinikker,',
    uthevet: 'der pasienten finner svaret selv.',
    lede: `Jeg lager nettsider for fysioterapeuter, osteopater, naprapater og andre behandlere til fast pris fra ${pris('enkel')} kr eks. mva. Pasienter søker på plagen sin, som «vondt i nakken» eller «trykkbølge pris», og velger klinikken som svarer tydelig på pris, ventetid og om de trenger henvisning.`,
    avsnitt: [
      {
        tittel: 'Pasienten søker på plagen',
        uthevet: 'og på prisen.',
        tekst: [
          'Få søker etter yrket alene. De søker på det som gjør vondt, og på hva behandlingen koster. En side per plage og per behandling, med pris og hvor mange timer det vanligvis tar, er det som gjør at klinikken dukker opp på de søkene.',
          'Hos en osteopat jeg har laget side for, var trykkbølgebehandling det største søket klinikken solgte, rundt 820 søk i måneden fordelt på fire søkeord. Klinikken hadde ingen side om det.',
        ],
      },
      {
        tittel: 'Kartet viser deg',
        uthevet: 'nærmest kontoret.',
        tekst: [
          'Ligger klinikken øverst i kartet når du søker fra kontoret, sier det lite om hva pasientene ser. Samme klinikk lå som nummer 1 målt fra egen adresse og utenfor topp 20 målt fra et sted 3 km unna.',
          'Google-profilen, med riktig kategori, alle behandlinger med pris og omtaler, flytter kartet mer enn noe på selve nettsiden. Når jeg tar SEO for en klinikk, måler jeg kartet fra tre punkter før og etter, så du ser om det virket.',
        ],
      },
      {
        tittel: 'Nøktern fagtone',
        uthevet: 'som tåler kollegers blikk.',
        tekst: [
          'Tekst om helse skal være saklig. Ingen løfter om at smerten forsvinner, og ingen utropstegn. Du leser gjennom alt før det publiseres, og retter det som ikke stemmer faglig.',
        ],
      },
    ],
    punktTittel: 'Det pasientene',
    punktUthevet: 'ser etter.',
    punkter: [
      'Pris per behandling og hvor lang timen er',
      'Om de trenger henvisning, og om Helfo eller forsikring dekker noe',
      'En side per behandling og per vanlig plage',
      'Ledig tid, eller en lenke rett til timeboken',
      'Hvem som behandler, med utdanning og autorisasjon',
      'Adresse, parkering og kollektivtransport',
      'Google-profilen koblet til siden, med samme navn, adresse og telefon',
      'Ingen sporing av besøkende uten samtykke',
    ],
    caser: [],
    eksempel: { rute: '/eksempler/tannlege', tekst: 'Se et eksempel på en klinikkside' },
    faq: [
      { q: 'Hva koster en nettside for en klinikk?', a: prisSvar('timebestilling') },
      {
        q: 'Trenger jeg en side for hver plage?',
        a: 'Ikke for alle. Jeg måler hva folk søker på der du holder til, og lager sider for plagene og behandlingene som har søk og som du faktisk tar imot. For en osteopat ble det sju plagesider og én side om trykkbølge.',
      },
      {
        q: 'Kan siden kobles til timeboken jeg bruker?',
        a: `Ja. Jeg kobler siden til timeboken du bruker i dag, så pasientene ser ledige timer der. Det hører til Komplett, fra ${pris('komplett')} kr, og du får prisen før jeg begynner.`,
      },
    ],
  },
  {
    slug: 'foredragsholder',
    bilder: [
      { src: '/bransjer/foredragsholder-1.webp', alt: 'Foredragsholder på scenen foran et fullt publikum' },
      { src: '/bransjer/foredragsholder-2.webp', alt: 'Foredragsholder på en scene med skjerm bak seg' },
    ],
    meny: 'Nettside for foredragsholder',
    tittel: 'Nettside for foredragsholder, fast pris',
    beskrivelse:
      'Nettside for foredragsholdere og kursholdere. Video fra scenen, en side per foredrag og et bookingskjema arrangøren faktisk fyller ut. Fast pris, gratis utkast.',
    sokeord: ['nettside for foredragsholder', 'hjemmeside foredragsholder', 'nettside kursholder'],
    h1: 'Nettside for foredragsholdere,',
    uthevet: 'skrevet for den som booker.',
    lede: `Jeg lager nettsider for foredragsholdere og kursholdere til fast pris fra ${pris('enkel')} kr eks. mva. Den som skal booke deg, er ofte en HR-leder eller en arrangør med tre navn på lista. De vil se deg på scenen, forstå hva salen sitter igjen med, og vite hvordan de bestiller.`,
    avsnitt: [
      {
        tittel: 'Arrangøren bestemmer seg',
        uthevet: 'på video.',
        tekst: [
          'Et klipp på ett minutt fra en ekte scene gjør mer enn en lang tekst om deg. Det skal ligge øverst, og det skal laste uten å gjøre siden treg på mobil.',
          'Under det står foredragene dine som egne sider, med tittel, hvem det passer for, lengde og hva publikum tar med seg. Det er de sidene som dukker opp når noen søker etter foredrag om et tema.',
        ],
      },
      {
        tittel: 'Gjør det enkelt',
        uthevet: 'å booke deg.',
        tekst: [
          'Et skjema som spør om dato, sted, antall deltakere og tema, gir deg det du trenger for å svare med en gang. Pressebilder og en kort og en lang biografi til nedlasting sparer arrangøren for en e-post.',
        ],
      },
      {
        tittel: 'Talerlisten',
        uthevet: 'og din egen side.',
        tekst: [
          'Står du på en talerliste, kommer forespørslene derfra. Din egen side er det arrangøren finner når de googler navnet ditt etterpå, og den avgjør hva de tenker før de ringer.',
        ],
      },
    ],
    punktTittel: 'Det arrangøren',
    punktUthevet: 'ser etter.',
    punkter: [
      'Video fra scenen, øverst på siden',
      'Én side per foredrag, med lengde og målgruppe',
      'Hvem du har holdt foredrag for, med sitater',
      'Bookingskjema med dato, sted og antall deltakere',
      'Pressebilder og biografi til nedlasting',
      'Pris eller fra-pris, hvis du vil vise den',
      'Rask lasting på mobil, også med video',
    ],
    caser: ['steinar-husby', 'katrin-brubakk', 'tore-sunde-rasmussen', 'alpha-negotiations'],
    faq: [
      { q: 'Hva koster en nettside for en foredragsholder?', a: prisSvar('et bookingskjema som regner ut pris') },
      {
        q: 'Kan jeg legge til nye foredrag selv?',
        a: 'Ja. Du legger til, endrer og fjerner foredrag i redigeringspanelet, og bytter video og bilder uten å be meg om hjelp.',
      },
    ],
  },
  {
    slug: 'handverker',
    bilder: [
      { src: '/bransjer/handverker-1.webp', alt: 'Snekker som måler opp et bord på byggeplassen' },
      { src: '/bransjer/handverker-2.webp', alt: 'Tømrer med motorsag på en takkonstruksjon' },
    ],
    meny: 'Nettside for håndverker',
    tittel: 'Nettside for håndverker, fast pris',
    beskrivelse:
      'Nettside for snekkere, maskinentreprenører, trefellere og takstmenn. Bilder av jobbene, området du dekker og et skjema for prisanslag. Fast pris, gratis utkast.',
    sokeord: ['nettside for håndverker', 'hjemmeside snekker', 'lage hjemmeside til snekker', 'nettside håndverker'],
    h1: 'Nettside for håndverkere,',
    uthevet: 'som gir flere forespørsler.',
    lede: `Jeg lager nettsider for snekkere, maskinentreprenører, trefellere, takstmenn og andre håndverkere til fast pris fra ${pris('enkel')} kr eks. mva. Kunden vil se jobber du har gjort, vite om du tar oppdrag der de bor, og få et prisanslag uten å vente på at du ringer tilbake.`,
    avsnitt: [
      {
        tittel: 'Bilder av jobbene',
        uthevet: 'selger mest.',
        tekst: [
          'Før- og etterbilder fra ekte oppdrag, tatt med telefonen, er det kundene ser mest på. Siden bygges slik at du legger inn nye bilder selv fra mobilen etter hver jobb.',
        ],
      },
      {
        tittel: 'Svar kunden',
        uthevet: 'mens du står på taket.',
        tekst: [
          'De fleste håndverkere har ikke tid til å ta telefonen midt i en jobb. Et skjema som spør om type oppdrag, sted og når det skal gjøres, gir deg det du trenger for å ringe tilbake med et svar.',
          'En takstmann jeg har laget side for, har et prisestimat kunden regner ut selv før de tar kontakt. Et hagefirma har bestilling på under ett minutt.',
        ],
      },
      {
        tittel: 'Området du dekker,',
        uthevet: 'skrevet inn på siden.',
        tekst: [
          'Kunder søker på jobben og stedet. Står kommunene du tar oppdrag i på siden, og Google-profilen har riktig kategori og omtaler, dukker du opp i kartet når noen søker i nærheten.',
        ],
      },
    ],
    punktTittel: 'Det kundene',
    punktUthevet: 'ser etter.',
    punkter: [
      'Bilder fra ekte jobber, gjerne før og etter',
      'Hvilke kommuner du tar oppdrag i',
      'Skjema for befaring eller prisanslag',
      'Telefonnummer som kan trykkes på fra mobilen',
      'Godkjenninger, fagbrev og forsikring',
      'Omtaler fra Google rett på siden',
      'Org.nummer og firmainformasjon',
    ],
    caser: ['jakobsen-takst', 'woxen-hage'],
    eksempel: { rute: '/eksempler/handverker', tekst: 'Se et eksempel på en håndverkerside' },
    faq: [
      { q: 'Hva koster en nettside for en håndverker?', a: prisSvar('en priskalkulator for kundene') },
      {
        q: 'Kan jeg legge inn bilder selv fra telefonen?',
        a: 'Ja. Du logger inn på siden fra mobilen og legger inn nye bilder og tekst i redigeringspanelet. Det tar et par minutter etter en jobb.',
      },
    ],
  },
  {
    slug: 'yogastudio',
    bilder: [
      { src: '/bransjer/yogastudio-1.webp', alt: 'Yogatime i et lyst studio' },
      { src: '/bransjer/yogastudio-2.webp', alt: 'Rolig yogatime med nybegynnere' },
    ],
    meny: 'Nettside for yogastudio',
    tittel: 'Nettside for yogastudio, fast pris',
    beskrivelse:
      'Nettside for yogastudioer, treningsstudioer og personlige trenere. Timeplan fra bookingen, tydelige priser og en side for nybegynnere. Fast pris, gratis utkast.',
    sokeord: ['nettside for yogastudio', 'nettside yoga', 'hjemmeside treningsstudio', 'nettside personlig trener'],
    h1: 'Nettside for yogastudioer,',
    uthevet: 'med timeplanen foran.',
    lede: `Jeg lager nettsider for yogastudioer, treningsstudioer og personlige trenere til fast pris fra ${pris('enkel')} kr eks. mva. Den som vurderer en time, vil se timeplanen, hva en drop-in eller et klippekort koster, og om timen passer for nybegynnere.`,
    avsnitt: [
      {
        tittel: 'Timeplanen',
        uthevet: 'rett fra bookingen.',
        tekst: [
          'Bruker du et bookingsystem, kan siden hente timeplanen derfra, så du slipper å oppdatere den to steder. Hos Prana Yoga Studio ligger timeplanen fra bookingen rett på forsiden.',
        ],
      },
      {
        tittel: 'Nybegynnere',
        uthevet: 'trenger sitt eget svar.',
        tekst: [
          'Mange som aldri har gått på yoga, lurer på hva de skal ha med, hvilken time de skal velge og om de klarer det. En egen side om første time senker terskelen, og den svarer på det folk søker på før de melder seg på.',
        ],
      },
      {
        tittel: 'Prisene',
        uthevet: 'uten innlogging.',
        tekst: [
          'Drop-in, klippekort og medlemskap i en enkel tabell, med hva som er inkludert. Står prisen bare i bookingsystemet, må den besøkende logge inn for å se den, og mange gir opp før det.',
        ],
      },
    ],
    punktTittel: 'Det de nye',
    punktUthevet: 'ser etter.',
    punkter: [
      'Timeplan som oppdateres fra bookingen',
      'Priser for drop-in, klippekort og medlemskap',
      'En side for nybegynnere og første time',
      'Lærerne, med utdanning og stilene de underviser i',
      'Adresse, garderobe og hva du bør ta med',
      'Bilder fra salen og timene',
      'Påmelding som virker på mobil',
    ],
    caser: ['prana-yoga'],
    faq: [
      { q: 'Hva koster en nettside for et yogastudio?', a: prisSvar('timeplan fra bookingsystemet') },
      {
        q: 'Kan timeplanen hentes fra bookingsystemet jeg bruker?',
        a: `Ja. Jeg kobler siden til bookingsystemet du bruker i dag, så timeplanen hentes derfra. Det hører til Komplett, fra ${pris('komplett')} kr, og du får prisen før jeg begynner.`,
      },
    ],
  },
];

export const finnBransje = (slug) => bransjer.find((b) => b.slug === slug);
