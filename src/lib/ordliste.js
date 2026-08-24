/* Ordliste. Ti begreper en kunde møter når han kjøper nettside.
 *
 * Ikke en SEO-ordbok. Begrepene er valgt fordi de dukker opp i ekte
 * samtaler før et kjøp, som regel som «hva betyr egentlig …» midt i et
 * tilbud kunden har fått fra noen andre. Et byrå som selger SEO trenger
 * en ordliste over rangeringsfaktorer. Jeg selger nettsider, og da er
 * det domene, webhotell, SSL og CMS folk snubler i.
 *
 * Ti, ikke femti. En ordliste der halvparten av oppføringene er skrevet
 * for å fylle en liste er tynt innhold, og tynt innhold drar ned resten
 * av nettstedet i stedet for å løfte det. Femti tynne sider er verre enn
 * ingen ordliste.
 *
 * Reglene for definisjonene, de samme som for svarene i
 * populaere-sok.js:
 *   1. Første setning ER definisjonen. Ingen oppvarming.
 *   2. Hver definisjon har minst ett konkret tall.
 *   3. Ett internt lenkemål per begrep.
 *   4. Ingen særskriving, ingen tankestrek.
 *
 * Feltene:
 *   slug        adressen under /ordliste/
 *   term        oppslagsordet slik det skrives i teksten
 *   tittel      <title>. Formulert som spørsmålet folk faktisk søker
 *   beskrivelse meta description, maks rundt 155 tegn
 *   kort        definisjonen. Står øverst på begge sider, ordrett likt
 *   utdyping    [{ t, a }] som blir H2 med avsnitt på oppslagssiden
 *   til         siden som utdyper, én per begrep
 *   relatert    to slugs i denne lista
 *
 * NB: `ROUTES` i scripts/prerender.mjs og `STATIC_PATHS` i
 * api/sitemap.xml.js utleder rutene herfra. Et nytt begrep trenger
 * ingen registrering andre steder.
 */

export const RUTE_ORDLISTE = '/ordliste';

export const ordliste = [
  {
    slug: 'cms',
    term: 'CMS',
    tittel: 'Hva er et CMS?',
    beskrivelse: 'Et CMS er verktøyet du logger inn i for å endre tekst og bilder uten å røre koden. Se når du trenger et, og når det bare er et system til å vedlikeholde.',
    kort: 'Et CMS, eller publiseringsløsning, er verktøyet du logger inn i for å endre tekst og bilder på nettsiden uten å røre koden. WordPress er det mest kjente. Uten et CMS må du be leverandøren om hver endring. Med et CMS bytter du åpningstidene selv på to minutter, men du har også ett system til som må oppdateres og sikres.',
    utdyping: [
      {
        t: 'Trenger du et i det hele tatt?',
        a: 'Regn på hvor ofte du faktisk endrer noe. Bytter du tekst to ganger i året, er en e-post til den som bygde siden billigere enn et system du skal holde oppdatert resten av tiden. Publiserer du hver uke, eller har flere som skal skrive, trenger du et. Det er frekvensen som avgjør, ikke størrelsen på bedriften.',
      },
      {
        t: 'Headless CMS, uten stammespråket',
        a: 'Et vanlig CMS styrer både hvordan innholdet lagres og hvordan siden ser ut. Et headless CMS gjør bare det første, og overlater utseendet til nettsiden. Fordelen er at siden kan være håndbygd og lynrask samtidig som du redigerer innholdet selv. Ulempen er at du ikke kan flytte på ting i designet på egen hånd, bare bytte innholdet.',
      },
    ],
    til: { tekst: 'Sammenlign plattformene', rute: '/sammenlign' },
    relatert: ['webhotell', 'domene'],
  },
  {
    slug: 'responsivt-design',
    term: 'Responsivt design',
    tittel: 'Hva er responsivt design?',
    beskrivelse: 'Responsivt design betyr at siden endrer oppsett etter skjermen, i stedet for at det finnes en egen mobilversjon. Se hvordan du tester din egen på ett minutt.',
    kort: 'Responsivt design betyr at nettsiden endrer oppsett etter skjermen den vises på, i stedet for at det finnes én mobilversjon og én for PC. Samme adresse, samme innhold, ny plassering. Over halvparten av besøkene til en norsk småbedrift kommer fra mobil, så mobilen er hovedversjonen, ikke unntaket.',
    utdyping: [
      {
        t: 'Forskjellen på responsivt og «den funker på mobil»',
        a: 'Mange sider krymper bare desktopversjonen ned til mobilbredde. Da blir teksten liten, knappene trange, og siden blir lengre på mobil enn på PC fordi alt legges i én kolonne. En ekte responsiv side stokker om: den slår sammen det som kan slås sammen, skjuler det som ikke betyr noe på en liten skjerm, og setter det viktigste øverst.',
      },
      {
        t: 'Slik tester du din egen',
        a: 'Åpne siden på din egen telefon og gjør tre ting. Les brødteksten uten å zoome. Trykk på telefonnummeret med tommelen, ikke pekefingeren. Og tell hvor mange ganger du må dra for å komme til bunnen. Må du zoome, bommer du på nummeret, eller drar du mer enn seks til åtte ganger, er siden stablet, ikke tilpasset.',
      },
    ],
    til: { tekst: 'Mer om responsive nettsider', rute: '/blogg/responsiv-nettside' },
    relatert: ['core-web-vitals', 'landingsside'],
  },
  {
    slug: 'domene',
    term: 'Domene',
    tittel: 'Hva er et domene?',
    beskrivelse: 'Domenet er adressen folk skriver for å komme til nettsiden din. Du leier det per år for rundt 150 kroner. Det viktigste er hvem som står som eier.',
    kort: 'Domenet er adressen folk skriver inn for å komme til nettsiden din, for eksempel dittfirma.no. Du eier det ikke for alltid, du leier det per år, typisk for rundt 150 kroner. Det viktigste med et domene er hvem som står oppført som eier: står leverandøren der i stedet for bedriften din, kan du ikke ta adressen med deg.',
    utdyping: [
      {
        t: 'Sjekk hvem som eier ditt i dag',
        a: 'For .no-adresser ligger eieren offentlig hos Norid. Søk opp domenet ditt der, og se hva som står under abonnent. Det skal være organisasjonsnummeret ditt. Står det et byrå eller en privatperson, be om å få det overført før du gjør noe annet. Uten domenet må du starte på ny adresse, og alt du har bygget opp i Google følger med den gamle.',
      },
      {
        t: 'Punktum no eller punktum com',
        a: 'Selger du i Norge, ta .no. Den signaliserer norsk virksomhet, og Norid krever organisasjonsnummer, som i seg selv er et lite tillitssignal. Skal du selge ut av landet, ta .com i tillegg og la den ene peke på den andre. Å eie begge koster noen hundrelapper i året og fjerner spørsmålet for godt.',
      },
    ],
    til: { tekst: 'Guide til norske domener', rute: '/blogg/norsk-domene' },
    relatert: ['webhotell', 'ssl-sertifikat'],
  },
  {
    slug: 'webhotell',
    term: 'Webhotell',
    tittel: 'Hva er et webhotell?',
    beskrivelse: 'Webhotellet er plassen nettsiden ligger på. Prisen spenner fra 50 kroner i måneden til flere tusen, og valget betyr mest for hvor raskt siden laster.',
    kort: 'Et webhotell er plassen nettsiden ligger på, altså maskinen som sender siden til den som besøker den. Prisen spenner fra rundt 50 kroner i måneden for en delt server til flere tusen for egen kapasitet. For en vanlig bedriftsside betyr valget mest for hvor raskt siden laster, ikke for hvor mye lagringsplass du får.',
    utdyping: [
      {
        t: 'Delt server, og hva det koster deg',
        a: 'På det billigste nivået deler du maskin med flere hundre andre nettsteder. Får en av dem plutselig mye trafikk, blir din side treg samtidig, uten at du har gjort noe. Det er den vanligste forklaringen på en side som er rask om morgenen og treg om ettermiddagen. Lagringsplassen du sammenligner på i prislisten er sjelden det som blir problemet.',
      },
      {
        t: 'Hva som faktisk avgjør farten',
        a: 'Tre ting, i denne rekkefølgen: hvor mye som må lastes ned (bilder er nesten alltid verstingen), om siden sendes ferdig eller må bygges opp i nettleseren, og hvor langt unna serveren står. En norsk side på en server i USA taper et par hundre millisekunder på avstanden alene. Ligger siden statisk på et nett av servere, forsvinner både avstanden og naboproblemet.',
      },
    ],
    til: { tekst: 'Se hva drift koster', rute: '/drift' },
    relatert: ['domene', 'core-web-vitals'],
  },
  {
    slug: 'ssl-sertifikat',
    term: 'SSL-sertifikat',
    tittel: 'Hva er et SSL-sertifikat?',
    beskrivelse: 'SSL-sertifikatet er det som gjør at adressen begynner med https og at nettleseren viser siden som trygg. Det er gratis, og uten det får du en rød advarsel.',
    kort: 'Et SSL-sertifikat er det som gjør at adressen begynner med https og at nettleseren viser siden som trygg. Det krypterer det som sendes mellom besøkende og server, så et utfylt skjema ikke kan leses av andre underveis. Det er gratis gjennom Let’s Encrypt, og en side uten det får en rød advarsel i Chrome før noen rekker å lese et ord.',
    utdyping: [
      {
        t: 'Hva som skjer når det utløper',
        a: 'Sertifikater varer typisk 90 dager og fornyes automatisk. Går fornyelsen i stå, og det skjer, møter besøkende en helside som sier at forbindelsen ikke er privat. De fleste snur der. Det er ikke nedetid, siden er teknisk oppe, men effekten er den samme, og den kan vare i dagevis før noen oppdager det. Derfor er overvåking av sertifikatet en del av drift, ikke en engangsjobb.',
      },
      {
        t: 'Gratis mot betalt',
        a: 'Et gratis sertifikat fra Let’s Encrypt krypterer nøyaktig like sterkt som et du betaler for. Det du kjøper for pengene er en garantiordning og en grundigere kontroll av at bedriften finnes, noe som betyr noe for en bank og ikke for en håndverker. For en vanlig bedriftsside er gratisvarianten riktig svar.',
      },
    ],
    til: { tekst: 'Hva som inngår i drift', rute: '/drift' },
    relatert: ['webhotell', 'redirect-301'],
  },
  {
    slug: 'landingsside',
    term: 'Landingsside',
    tittel: 'Hva er en landingsside?',
    beskrivelse: 'En landingsside er laget for én handling. Ingen meny som frister videre, ingen fem konkurrerende knapper. Brukes typisk for annonser og kampanjer.',
    kort: 'En landingsside er en side laget for én ting: at den som kommer dit gjør én bestemt handling. Ingen meny som frister videre, ingen fem konkurrerende knapper. Den brukes typisk til en annonse eller en kampanje, der du vet nøyaktig hva folk søkte på før de klikket, og kan svare på akkurat det i overskriften.',
    utdyping: [
      {
        t: 'Hvorfor menyen fjernes',
        a: 'Hver lenke ut av siden er en mulighet til å gjøre noe annet enn det du betalte for at de skulle gjøre. Betaler du for klikket, er en meny med ni valg ni måter å miste det på. På en vanlig forside er menyen riktig, fordi besøkende kommer med ulike ærend. På en landingsside har alle det samme ærendet, og da er navigasjon bare avsporing.',
      },
      {
        t: 'Én side per tjeneste slår én side om alt',
        a: 'Samme prinsipp gjelder uten annonser. Selger du fire tjenester, rangerer du bedre og selger mer med fire sider som hver svarer på ett søk, enn med én side som nevner alle fire. Google får noe entydig å vise, og leseren slipper å lete. Det er derfor jeg lager egne sider for hver tjeneste i stedet for en lang forside.',
      },
    ],
    til: { tekst: 'Om nettsidedesign', rute: '/nettside-design' },
    relatert: ['konverteringsrate', 'metabeskrivelse'],
  },
  {
    slug: 'konverteringsrate',
    term: 'Konverteringsrate',
    tittel: 'Hva er en konverteringsrate?',
    beskrivelse: 'Konverteringsraten er andelen besøkende som gjør det du vil. 500 besøk og 10 skjemaer er 2 prosent. For en norsk bedriftsside er 1 til 3 prosent vanlig.',
    kort: 'Konverteringsraten er andelen besøkende som gjør det du vil at de skal gjøre. Får siden 500 besøk i måneden og 10 sender inn skjemaet, er konverteringsraten 2 prosent. For en norsk bedriftsside er 1 til 3 prosent vanlig. Tallet er mer verdt enn besøkstallet, fordi det er det eneste som sier om siden faktisk virker.',
    utdyping: [
      {
        t: 'Hva du må måle før tallet betyr noe',
        a: 'Du trenger to ting: antall ekte besøk, og antall ganger noen gjorde handlingen. Det første er vanskeligere enn det høres ut, fordi en god del av trafikken til en liten norsk side er roboter og e-postskannere. Teller du dem med, ser konverteringsraten kunstig lav ut og du ender med å fikse en side som virker. Skill ut botene før du regner.',
      },
      {
        t: 'Dobling er ofte billigere enn dobbelt så mye trafikk',
        a: 'Går du fra 1 til 2 prosent, har du doblet antall henvendelser uten en eneste ny besøkende. Det krever som regel tre ting: at det står tydelig hva du vil de skal gjøre, at handlingen gjentas etter hver seksjon i stedet for bare nederst, og at prisen står et sted. Å doble trafikken i stedet tar måneder og koster penger hver måned.',
      },
    ],
    til: { tekst: 'Slik bygges en side for konvertering', rute: '/blogg/hvordan-bygge-en-nettside-for-konvertering' },
    relatert: ['landingsside', 'core-web-vitals'],
  },
  {
    slug: 'core-web-vitals',
    term: 'Core Web Vitals',
    tittel: 'Hva er Core Web Vitals?',
    beskrivelse: 'Tre tall Google måler på ekte besøk: LCP under 2,5 sekunder, INP under 200 millisekunder, CLS under 0,1. De måler det besøkende faktisk opplever.',
    kort: 'Core Web Vitals er tre tall Google måler på ekte besøk: hvor lang tid det største elementet bruker på å bli synlig (LCP), hvor raskt siden svarer på det du trykker på (INP), og hvor mye innholdet hopper mens det laster (CLS). Google bruker dem som rangeringssignal, men den beste grunnen til å bry seg er at de måler det besøkende faktisk opplever.',
    utdyping: [
      {
        t: 'Tre tall, tre grenser',
        a: 'LCP skal under 2,5 sekunder, INP under 200 millisekunder, CLS under 0,1. Grensene gjelder for de raskeste 75 prosentene av besøkene, ikke for snittet, så en side som er rask for deg på kontornettet kan fortsatt stryke. CLS er den folk undervurderer: det er tallet som fanger at knappen flytter seg akkurat idet du trykker, fordi et bilde over lastet ferdig.',
      },
      {
        t: 'Feltdata mot labdata',
        a: 'En hastighetstest du kjører selv er labdata: én måling, på din linje, akkurat nå. Google rangerer på feltdata, som er ekte besøk samlet over 28 dager, mest fra mobil på 4G. Derfor kan en side score 98 i testen og likevel stryke i Search Console. Er de to tallene uenige, er det feltdataene som gjelder.',
      },
    ],
    til: { tekst: 'Hva treghet koster', rute: '/blogg/mobilhastighet-nettside-koster-millioner' },
    relatert: ['webhotell', 'responsivt-design'],
  },
  {
    slug: 'metabeskrivelse',
    term: 'Metabeskrivelse',
    tittel: 'Hva er en metabeskrivelse?',
    beskrivelse: 'De to linjene under tittelen i Google. Ikke et rangeringssignal, men den avgjør om noen klikker på deg framfor de fire andre treffene. Rundt 155 tegn.',
    kort: 'Metabeskrivelsen er de to linjene som står under tittelen i et Google-treff. Den er ikke et rangeringssignal, men den avgjør om noen klikker på deg framfor de fire andre treffene på skjermen. Skriv den selv på rundt 155 tegn, ellers plukker Google en tilfeldig setning fra siden, og den setningen er sjelden den du ville valgt.',
    utdyping: [
      {
        t: 'Hva som gjør at Google bytter den ut',
        a: 'Google overstyrer beskrivelsen din når den mener et annet avsnitt svarer bedre på det som ble søkt. Det skjer oftest når beskrivelsen er generisk markedsføring uten ord fra selve søket. Skriver du den med de samme ordene folk faktisk bruker, og lar den si noe konkret som et tall eller en frist, blir den stående langt oftere.',
      },
      {
        t: 'Én per side, aldri gjenbrukt',
        a: 'Den vanligste feilen på en liten bedriftsside er at alle sidene arver samme beskrivelse fra forsiden. Da ser fem treff identiske ut i søkeresultatet, og Google får ingen hjelp til å skille dem. Skriv én per side som sier hva akkurat den siden svarer på. Har du femten sider, er det femten setninger, og det er en times jobb.',
      },
    ],
    til: { tekst: 'Mer om søkemotoroptimalisering', rute: '/sokemotoroptimalisering' },
    relatert: ['landingsside', 'redirect-301'],
  },
  {
    slug: 'redirect-301',
    term: '301-redirect',
    tittel: 'Hva er en 301-redirect?',
    beskrivelse: 'En permanent videresending fra gammel til ny adresse. Uten den mister du både lenkene andre har lagt ut og plasseringen sidene hadde i Google.',
    kort: 'En 301-redirect er en permanent videresending fra en gammel adresse til en ny. Bytter du nettside og lar de gamle adressene dø, mister du både lenkene andre har lagt ut og plasseringen sidene hadde i Google. En 301 flytter det meste av begge deler over til den nye adressen, og den koster ingenting å sette opp.',
    utdyping: [
      {
        t: 'Den dyreste feilen i en relansering',
        a: 'En bedrift bytter nettside, får noe som er penere og raskere, og ser trafikken falle med 60 prosent den påfølgende måneden. Forklaringen er nesten alltid den samme: adressene endret seg og ingen satte opp videresendinger. Hver gamle adresse som svarer 404 er en side Google fjerner, og en lenke noen andre har lagt ut som slutter å virke. Lag lista over gamle adresser før den gamle siden slås av, ikke etter.',
      },
      {
        t: '301 mot 302',
        a: '301 sier permanent, 302 sier midlertidig. Forskjellen er hva Google gjør med den gamle adressen: ved 301 flyttes verdien over og den nye adressen overtar plassen, ved 302 beholdes den gamle i indeksen fordi Google venter på at du skal komme tilbake. Bruker du 302 på en flytting som er permanent, blir du stående mellom to stoler i månedsvis.',
      },
    ],
    til: { tekst: 'Ny side eller pusse opp?', rute: '/vanlige-sporsmal/ny-nettside-eller-pusse-opp' },
    relatert: ['metabeskrivelse', 'domene'],
  },
];

export const finnBegrep = (slug) => ordliste.find((o) => o.slug === slug);

export const begrepRute = (slug) => `${RUTE_ORDLISTE}/${slug}`;

const NETTSTED = 'https://oppskalert.no';

/* Samlesiden er selve ordlista: ett DefinedTermSet med alle ti i.
   hasDefinedTerm peker på hver enkelt oppslagsside, så settet og
   oppføringene henger sammen som én struktur og ikke som ti løse sider
   som tilfeldigvis ligner. */
export const ordlisteSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Ordliste for deg som skal kjøpe nettside',
  url: `${NETTSTED}${RUTE_ORDLISTE}`,
  hasDefinedTerm: ordliste.map((o) => ({
    '@type': 'DefinedTerm',
    name: o.term,
    description: o.kort,
    url: `${NETTSTED}${begrepRute(o.slug)}`,
  })),
};

/* Oppslagssiden: ett DefinedTerm som peker tilbake på settet.
 *
 * Bevisst uten FAQPage i tillegg, selv om det er fristende fordi
 * FAQ-oppmerking siteres godt. Utdypingene her er ikke formulert som
 * spørsmål, de er avsnitt. Å tvinge dem inn i en Question-node ville
 * vært oppmerking som beskriver noe annet enn det som står på siden,
 * og det er akkurat den typen schema Google slutter å stole på.
 * Spørsmålsformatet har sin egen plass, under /vanlige-sporsmal. */
export const begrepSchema = (item) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: item.term,
  description: item.kort,
  url: `${NETTSTED}${begrepRute(item.slug)}`,
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Ordliste for deg som skal kjøpe nettside',
    url: `${NETTSTED}${RUTE_ORDLISTE}`,
  },
});
