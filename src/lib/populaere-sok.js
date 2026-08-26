/* Samleside for populære søk, pluss én egen side per spørsmål.
 *
 * Egen fil, ikke site.js, fordi dette settet bare brukes av to ruter og
 * site.js allerede er stor nok.
 *
 * Hvert spørsmål er valgt fra søkeordstabellen i SEO.md, ikke fra
 * magefølelse. `sok` og `volum` står i kommentaren så det er mulig å se
 * hvorfor spørsmålet er med når noen rydder her om et halvt år.
 *
 * Reglene for svarene, utledet av 89 FAQ-par hos konkurrentene:
 *   1. Svaret begynner med svaret. Ja, nei, et tall. Aldri oppvarming.
 *   2. Hvert svar har minst ett konkret tall.
 *   3. Ett internt lenkemål per svar, der det finnes en side som utdyper.
 *   4. Ingen særskriving. «pris på nettside», aldri «nettside pris».
 *
 * Spørsmålene står som ekte H2 med synlig svar under, ikke i et
 * trekkspill. Begge deler crawles, men et avsnitt under en H2 som er et
 * spørsmål er det formatet AI-modeller siterer.
 *
 * ---------------------------------------------------------------
 * HVORFOR HVERT SPØRSMÅL HAR EGEN URL
 *
 * Samlesiden alene svarer på femten spørsmål under én adresse med én
 * title. Google og AI-modellene får da ett dokument å vurdere, og
 * titelen kan bare handle om ett av spørsmålene.
 *
 * Med `slug` får hvert spørsmål sin egen adresse, sin egen title, sin
 * egen meta-beskrivelse og sitt eget FAQPage-schema med akkurat ett
 * spørsmål i. Det er formatet som siteres, fordi modellen slipper å
 * gjette hvilket av femten avsnitt som svarer på spørsmålet den fikk.
 *
 * Feltene:
 *   slug       adressen under /vanlige-sporsmal/
 *   tittel     <title>. Kan avvike fra q, som er formulert for lesing
 *   beskrivelse meta description, maks rundt 155 tegn
 *   a          kortsvaret. Står øverst på begge sider, ordrett likt
 *   utdyping   [{ t, a }] som blir H2 med avsnitt på undersiden.
 *              Uten den blir undersiden 90 ord og tynn. Med den lander
 *              den på rundt 350, som er nok til å stå alene
 *   relatert   to slugs som lenkes nederst. Håndplukket, ikke naboer
 *              i arrayen, fordi rekkefølgen her følger søkevolum
 *
 * NB: legges det til et spørsmål her, må ingenting registreres andre
 * steder. Både `ROUTES` i scripts/prerender.mjs og `STATIC_PATHS` i
 * api/sitemap.xml.js utleder rutene fra denne arrayen.
 */

/* Ruten hører egentlig hjemme i `ruter` i site.js. Den ligger her fordi
   site.js var under arbeid i en annen sesjon da denne siden ble laget.
   Flytt den inn i `ruter` ved neste opprydding, og oppdater importen i
   Layout.jsx. */
export const RUTE_VANLIGE_SPORSMAL = '/vanlige-sporsmal';

export const populaereSok = [
  {
    // «hva koster en nettside» 70/mnd KD 0, pluss prisklyngen på 720/mnd samlet
    slug: 'hva-koster-en-nettside',
    q: 'Hva koster en nettside i Norge?',
    tittel: 'Hva koster en nettside i Norge?',
    beskrivelse: 'Malbasert side ligger på 5 000 til 15 000 kroner, byråer fra bunnen på 25 000 og oppover. Hos meg starter en håndbygd side på 9 999 kroner eks. mva.',
    a: 'Regn med 5 000 til 15 000 kroner for en malbasert side, og fra 25 000 og oppover hos de fleste byråer som bygger fra bunnen. Hos meg starter en håndbygd nettside på 9 999 kroner eks. mva som engangspris, eller 1 290 kroner i måneden på abonnement med 12 måneders binding. Prisen avhenger av hvor mange sider og funksjoner du trenger, men du får den fast og skriftlig før jeg begynner.',
    utdyping: [
      {
        t: 'Hva er det du faktisk betaler for?',
        a: 'Ikke koden. Selve byggingen er den minste posten. Det meste av tiden går til å bestemme hva siden skal få folk til å gjøre, skrive teksten som får dem til å gjøre det, og finne bilder som ikke ser ut som stockfoto. En side med ferdig tekst og ferdige bilder er billigere enn en der jeg må lage begge deler, og det er der spennet mellom to tilbud som ser like ut som regel ligger.',
      },
      {
        t: 'Hvorfor spriker prisene så mye?',
        a: 'Fordi «nettside» dekker alt fra en ferdig mal du fyller inn selv på en kveld, til noe som er tegnet, skrevet og kodet for deg alene. Et byrå har i tillegg prosjektleder, designer og utvikler på samme jobb, og kontorleie på toppen. Jeg er én person uten mellomledd, og det er hele forklaringen på at samme leveranse kan koste 9 999 hos meg og 40 000 et annet sted.',
      },
      {
        t: 'Hva bør du ha skriftlig før du sier ja?',
        a: 'Fire ting: totalprisen, ikke et timeestimat. Hva som skjer hvis omfanget endrer seg underveis. At du eier filene når siden er levert. Og hva det koster å drifte den etterpå. Mangler ett av de fire i tilbudet, er det verdt å spørre om det før du signerer, ikke etter.',
      },
    ],
    relatert: ['hva-koster-drift-av-nettside', 'er-billig-nettside-verdt-det'],
    til: { tekst: 'Se hele prislisten', rute: '/priser' },
  },
  {
    // «nettsideleverandør» 90/mnd KD 0, høyest CPC i tabellen
    slug: 'krav-til-nettsideleverandor',
    q: 'Hva bør jeg kreve av en nettsideleverandør?',
    tittel: 'Hva bør du kreve av en nettsideleverandør?',
    beskrivelse: 'Fast pris før arbeidet starter, eierskap til kode og innhold, ingen bindingstid, og noe ferdig å se på før du betaler. Klarer ikke leverandøren alle fire, spør hvorfor.',
    a: 'Fire ting: fast pris før arbeidet starter, at du eier koden og innholdet etterpå, ingen bindingstid, og at du får se noe ferdig før du betaler. Klarer ikke leverandøren å love alle fire, er det verdt å spørre hvorfor. Selv bygger jeg hele demoen ferdig innen 3 virkedager, og du bestemmer deg etterpå.',
    utdyping: [
      {
        t: 'Fast pris, ikke timeestimat',
        a: 'Et timeestimat flytter all risiko over på deg. Går prosjektet over, er det du som betaler for det. En fast pris tvinger leverandøren til å tenke gjennom omfanget før arbeidet starter, som er nøyaktig den samtalen du vil ha tatt uansett. Be om totalprisen skriftlig, og om hva som skjer hvis du ombestemmer deg underveis.',
      },
      {
        t: 'Eierskap til kode og innhold',
        a: 'Spør direkte: hvis jeg vil bytte leverandør om to år, hva får jeg med meg? Svaret bør være alt. Filene, teksten, bildene og domenet. Noen leverandører bygger på egne plattformer der siden slutter å eksistere den dagen du sier opp. Det er en gyldig modell, men du skal vite det før du signerer, ikke oppdage det når du vil videre.',
      },
      {
        t: 'Se noe ferdig før du betaler',
        a: 'En skisse i PowerPoint sier lite om hvordan siden føles å bruke. Be om noe du kan åpne på mobilen og klikke rundt i. Klarer ikke leverandøren å vise deg det uten forskudd, har du ingen måte å vurdere kvaliteten på før pengene er ute.',
      },
    ],
    relatert: ['byra-eller-frilanser', 'eier-jeg-nettsiden-selv'],
    til: { tekst: 'Slik jobber jeg', rute: '/metode' },
  },
  {
    // «søkemotoroptimalisering» 590/mnd KD 9, størst volum med kjøpsintensjon
    slug: 'hva-er-sokemotoroptimalisering',
    q: 'Hva er søkemotoroptimalisering?',
    tittel: 'Hva er søkemotoroptimalisering (SEO)?',
    beskrivelse: 'SEO er arbeidet med å gjøre nettsiden lesbar og relevant nok til at Google viser den høyt. Tre lag: at robotene får lest siden, at innholdet svarer, og at andre lenker til deg.',
    a: 'Søkemotoroptimalisering, ofte forkortet SEO, er arbeidet med å gjøre nettsiden lesbar og relevant nok til at Google viser den høyt når folk søker. Det består av tre lag: at robotene i det hele tatt får lest siden, at innholdet svarer på det folk søker etter, og at andre nettsteder lenker til deg. Rekkefølgen er viktig. En side Google ikke får lest rangerer ikke uansett hvor gode ordene er.',
    utdyping: [
      {
        t: 'De tre lagene, i den rekkefølgen de må løses',
        a: 'Først teknikken: siden må svare raskt, den må sende ferdig HTML, og robotene må ikke stenges ute av robots.txt eller en innloggingsvegg. Så innholdet: overskriftene må bruke ordene folk faktisk søker på, ikke bransjeordene du bruker internt. Til slutt lenkene: andre nettsteder som peker til deg. De to første kan du fikse på en uke. Det tredje tar måneder, og det er derfor det er sist.',
      },
      {
        t: 'Hvor lang tid går det før det virker?',
        a: 'For et nytt domene: regn med 3 til 6 måneder før du ser noe som ligner stabil trafikk, og lenger på ord med mye konkurranse. For en side som allerede finnes i Google, kan tekniske rettelser gi utslag på under to uker, fordi siden allerede er indeksert og det bare er vurderingen som endrer seg. Lover noen topplassering på fire uker, er det enten et ord ingen søker på, eller en påstand som ikke holder.',
      },
      {
        t: 'Det du kan gjøre selv, gratis',
        a: 'Sett opp Google Search Console og Google Bedriftsprofil. Begge er gratis, tar under en time til sammen, og Search Console er det eneste stedet du ser hva folk faktisk søkte på før de klikket. Skriv deretter én side per tjeneste du selger, med tjenesten og stedet i overskriften. De to grepene alene flytter de fleste småbedrifter forbi konkurrenter som aldri har rørt temaet.',
      },
    ],
    relatert: ['synlig-i-chatgpt-og-ai-sok', 'google-bedriftsprofil'],
    til: { tekst: 'Mer om søkemotoroptimalisering', rute: '/sokemotoroptimalisering' },
  },
  {
    // «nettside ai» 140/mnd KD 0. Spørsmålet er også selve AEO-argumentet.
    slug: 'synlig-i-chatgpt-og-ai-sok',
    q: 'Hvordan blir bedriften min synlig i ChatGPT og AI-søk?',
    tittel: 'Hvordan blir bedriften synlig i ChatGPT og AI-søk?',
    beskrivelse: 'Det viktigste er at siden leveres som ferdig HTML. De fleste AI-crawlere kjører ikke JavaScript, så en side som bygges opp i nettleseren er helt tom for dem.',
    a: 'Det viktigste er at siden leveres som ferdig HTML. De fleste AI-crawlere kjører ikke JavaScript, så en nettside som bygges opp i nettleseren er helt tom for dem, selv om den ser fin ut for deg. Utover det hjelper tre ting: en llms.txt i roten, strukturerte data om hva bedriften gjør og hvor den holder til, og overskrifter som er formulert som spørsmål med svaret rett under. Det er avsnitt som siteres.',
    utdyping: [
      {
        t: 'Slik sjekker du din egen side på ett minutt',
        a: 'Åpne siden din, høyreklikk og velg «vis kilde». Det du ser der er det roboten ser. Finner du teksten fra forsiden, er du i orden. Ser du bare noen script-tagger og en tom div, bygges siden opp i nettleseren og roboten får ingenting. Mange moderne sider ser helt ferdige ut for deg og er helt tomme for en AI-crawler, og forskjellen er usynlig fra utsiden.',
      },
      {
        t: 'Hva llms.txt faktisk gjør',
        a: 'Det er en tekstfil i roten av nettstedet, etter samme mønster som robots.txt, som lister opp hva bedriften gjør og hvilke sider som er de viktigste. Ingen søkemotor krever den, og Google bruker den ikke. Den er billig å lage og gir modellen en ryddig oppsummering å hente fra, men den redder ikke en side roboten ikke får lest. Rekkefølgen er alltid HTML først, llms.txt etterpå.',
      },
      {
        t: 'Skriv overskriftene som spørsmål',
        a: 'En modell som skal svare på «hva koster en nettside i Oslo» leter etter et avsnitt som besvarer akkurat det. Har du en overskrift som stiller spørsmålet og et avsnitt rett under som svarer med et tall i første setning, er du et lett sitat. Har du samme informasjon spredd over fire avsnitt i en brosjyretekst, er du det ikke. Denne siden er bygget etter den regelen.',
      },
    ],
    relatert: ['hva-er-sokemotoroptimalisering', 'krav-til-nettsideleverandor'],
    til: { tekst: 'Slik jobber jeg med søk', rute: '/sokemotoroptimalisering' },
  },
  {
    // «hvordan lage nettside» 210/mnd KD 15
    slug: 'hvordan-lage-nettside',
    q: 'Hvordan lager man en nettside?',
    tittel: 'Hvordan lager man en nettside?',
    beskrivelse: 'Sikre domenet, bestem hva siden skal få folk til å gjøre, skriv teksten, bygg den, koble på måling. Rekkefølgen betyr mer enn verktøyet.',
    a: 'Kort fortalt: sikre domenet, bestem hva siden skal få folk til å gjøre, skriv teksten, bygg den, og koble på måling. Rekkefølgen betyr mer enn verktøyet. De fleste begynner med design og oppdager for sent at de mangler tekst. Skal du gjøre det selv, sett av noen kvelder. Skal jeg gjøre det, tar det 1 til 2 uker fra du sier ja.',
    utdyping: [
      {
        t: 'Domenet først, alltid',
        a: 'Kjøp domenet før du bestemmer navnet endelig. Det koster rundt 150 kroner i året hos en norsk registrar, og et navn du ikke får domenet til er et navn du kommer til å angre på. Sjekk samtidig at det er ledig på Facebook og Instagram hvis du skal bruke dem. Sett opp e-post på domenet med en gang: en henvendelse fra post@dittfirma.no leses annerledes enn en fra en gratis e-postadresse.',
      },
      {
        t: 'Teksten er flaskehalsen, ikke designet',
        a: 'Nesten alle nettsideprosjekter som stopper opp, stopper på tekst. Designet er ferdig, og så ligger prosjektet stille i seks uker fordi ingen har skrevet hva bedriften faktisk gjør. Skriv derfor teksten før du tegner noe. Trenger du et sted å starte: hva selger du, hvem er det til, hva koster det, og hva skal folk gjøre nå. Fire spørsmål, fire avsnitt, så har du en forside.',
      },
      {
        t: 'Koble på måling fra dag én',
        a: 'Uten måling vet du ikke om siden virker, og da har du ingen grunnlag for å endre den. Du trenger to ting: Google Search Console, som viser hva folk søkte på før de fant deg, og et enkelt besøksverktøy som viser hvilke sider som leses. Begge er gratis. Kobler du dem på i etterkant, mister du historikken fra de første månedene, som er akkurat den perioden du kommer til å ville sammenligne mot senere.',
      },
    ],
    relatert: ['hvor-lang-tid-tar-en-nettside', 'wordpress-wix-eller-handkodet'],
    til: { tekst: 'Se de fire stegene', rute: '/metode' },
  },
  {
    // «billig nettside» 70/mnd KD 0, høy CPC
    slug: 'er-billig-nettside-verdt-det',
    q: 'Er en billig nettside verdt det?',
    tittel: 'Er en billig nettside verdt det?',
    beskrivelse: 'Noen ganger, ja. Trenger du bare åpningstider og et telefonnummer, holder en enkel side lenge. Problemet er når den er treg, låst til leverandøren eller ulesbar for Google.',
    a: 'Noen ganger, ja. Trenger du bare et sted å vise åpningstider og et telefonnummer, holder det lenge med en enkel side. Problemet oppstår når den billige siden er treg, ikke kan endres uten leverandøren, eller er bygget slik at Google ikke får lest den. Da har du betalt lite for noe som ikke gjør en jobb, og det er dyrere enn å gjøre det riktig en gang.',
    utdyping: [
      {
        t: 'Når billig faktisk er riktig valg',
        a: 'Har du all kundetilgang gjennom Facebook, anbefalinger eller en markedsplass, og nettsiden bare skal bekrefte at bedriften finnes, så gjør en enkel side jobben. Det samme gjelder hvis du er i en testfase og ikke vet om konseptet holder. Da er poenget å komme raskt ut, ikke å bygge noe som varer i fem år. Bygg billig, se hva som skjer, og bygg ordentlig når du vet at det er verdt det.',
      },
      {
        t: 'De tre kostnadene som ikke står i tilbudet',
        a: 'Tiden din, når du må mase på noen for å endre et telefonnummer. Kundene som ikke ringte, fordi siden brukte fem sekunder på å laste på mobil. Og regningen for å bygge alt på nytt om to år, fordi den gamle siden ikke kan flyttes. Ingen av de tre står i prisen du sammenligner på. De dukker opp etterpå, og til sammen er de nesten alltid større enn det du sparte.',
      },
    ],
    relatert: ['hva-koster-en-nettside', 'wordpress-wix-eller-handkodet'],
    til: { tekst: 'Sammenlign alternativene', rute: '/sammenlign' },
  },
  {
    // «webdesign oslo» 140/mnd KD 17 + «webutvikler oslo» 260/mnd KD 16
    slug: 'hva-koster-webdesign-i-oslo',
    q: 'Hva koster webdesign i Oslo?',
    tittel: 'Hva koster webdesign i Oslo?',
    beskrivelse: 'Prisnivået i Oslo ligger typisk fra 25 000 kroner for en skreddersydd bedriftsside. Jeg holder til i Oslo og starter på 9 999 kroner eks. mva.',
    a: 'Prisnivået i Oslo ligger typisk fra 25 000 kroner og oppover for en skreddersydd bedriftsside. Jeg holder til i Oslo og starter på 9 999 kroner, fordi jeg er én person uten kontorleie og fordi jeg bygger med AI som fjerner ukene som pleide å gå med til førsteutkast og standardkode. Du kan møte meg fysisk hvis du vil, men de fleste tar det på telefon.',
    utdyping: [
      {
        t: 'Hvorfor Oslo-prisene ligger høyere',
        a: 'Det er ikke arbeidet som er dyrere, det er overheadet. Et kontor i sentrum, en prosjektleder mellom deg og den som bygger, og et selgerledd som må tjenes inn. Ingen av delene havner i nettsiden din. Skal du sammenligne to tilbud, sammenlign hva du får levert og hvem du faktisk snakker med underveis, ikke adressen på fakturaen.',
      },
      {
        t: 'Trenger du å møte noen fysisk?',
        a: 'Sjelden, men det er greit å ha muligheten. De fleste prosjektene mine går på telefon og e-post, og siden demoen er noe du kan åpne på mobilen, er det lite som må forklares i et møte. Vil du likevel ta en kaffe før du bestemmer deg, holder jeg til i Oslo og stiller opp. Er du utenfor byen, endrer det verken pris eller leveringstid.',
      },
    ],
    relatert: ['hva-koster-en-nettside', 'byra-eller-frilanser'],
    til: { tekst: 'Webdesign i Oslo', rute: '/webdesign-oslo' },
  },
  {
    slug: 'hvor-lang-tid-tar-en-nettside',
    q: 'Hvor lang tid tar det å lage en nettside?',
    tittel: 'Hvor lang tid tar det å lage en nettside?',
    beskrivelse: 'Demoen er ferdig innen 3 virkedager. Fra du sier ja til at siden står live på ditt eget domene går det som regel 1 til 2 uker.',
    a: 'Demoen din er ferdig innen 3 virkedager. Fra du sier ja til at siden står live på ditt eget domene går det som regel 1 til 2 uker. Det som styrer tempoet er nesten alltid hvor fort du rekker å svare, ikke hvor fort jeg jobber. Større løsninger med nettbutikk eller innlogging tar lenger, og da sier jeg fra på forhånd.',
    utdyping: [
      {
        t: 'Hva som faktisk styrer tempoet',
        a: 'Tre ting, i denne rekkefølgen: hvor raskt du gir tilbakemelding, om teksten finnes fra før, og om du har bilder som kan brukes. Er alle tre på plass, er en til to uker realistisk. Mangler teksten, kan det samme prosjektet ta seks uker, og de fem ekstra går med til å vente på et avsnitt. Jeg skriver gjerne førsteutkastet selv for å unngå akkurat den ventingen.',
      },
      {
        t: 'Når det tar lengre tid',
        a: 'Nettbutikk med betaling, frakt og lager tar 3 til 6 uker fordi tre systemer skal snakke sammen og alle må testes. Innlogging og kundeportaler tar lenger igjen. Skal siden flyttes fra en gammel leverandør, kommer det som regel en uke på toppen til å sette opp videresendinger, slik at gamle lenker ikke dør og rangeringen i Google følger med over.',
      },
    ],
    relatert: ['hvordan-lage-nettside', 'hva-koster-nettbutikk'],
    til: { tekst: 'Slik går det til', rute: '/metode' },
  },
  {
    slug: 'ny-nettside-eller-pusse-opp',
    q: 'Trenger jeg ny nettside, eller holder det å pusse opp den jeg har?',
    tittel: 'Trenger du ny nettside, eller holder det å pusse opp?',
    beskrivelse: 'Ofte holder det å pusse opp. Er strukturen grei og siden bare treg eller dårlig skrevet, er det dumt å betale for alt på nytt. Send meg adressen, så ser jeg over den gratis.',
    a: 'Ofte holder det å pusse opp. Er strukturen grei og siden bare treg eller dårlig skrevet, er det dumt å betale for alt på nytt. Send meg adressen, så ser jeg over den gratis og sier ærlig fra hva jeg ville gjort. Det tar meg under 30 minutter, og noen ganger er svaret at du ikke trenger meg.',
    utdyping: [
      {
        t: 'Fire tegn på at det holder å pusse opp',
        a: 'Siden laster på under to sekunder. Du kan endre tekst og bilder selv uten å be noen om hjelp. Den ser riktig ut på mobil. Og den ligger allerede i Google på firmanavnet ditt. Stemmer alle fire, er problemet nesten alltid teksten og strukturen, ikke teknikken. Da er ny tekst og en opprydding i menyen en langt billigere jobb enn en ny side.',
      },
      {
        t: 'Tre tegn på at du bør bygge nytt',
        a: 'Siden er bygget på en plattform som ikke støttes lenger, og ingen tør å røre den. Den er treg på mobil uansett hva som fjernes. Eller den er bygget slik at innholdet ikke finnes i kildekoden, som betyr at både Google og AI-modeller ser en tom side. Det siste er det dyreste å leve med, fordi det ikke synes for deg og likevel koster deg alle besøkende du kunne fått fra søk.',
      },
    ],
    relatert: ['hva-koster-en-nettside', 'synlig-i-chatgpt-og-ai-sok'],
    til: { tekst: 'Ta kontakt', rute: '/kontakt' },
  },
  {
    // «lage nettbutikk» 210/mnd KD 15
    slug: 'hva-koster-nettbutikk',
    q: 'Hva koster det å lage nettbutikk?',
    tittel: 'Hva koster det å lage nettbutikk?',
    beskrivelse: 'En nettbutikk starter et sted mellom 2 og 3 ganger prisen på en vanlig nettside, fordi betaling, frakt og lager må virke sammen.',
    a: 'En nettbutikk koster mer enn en vanlig nettside, fordi betaling, frakt og lager må virke sammen. Regn med at det starter et sted mellom 2 og 3 ganger prisen på en vanlig side. Til gjengjeld er det ett av få nettsideprosjekter der du kan regne hjem investeringen direkte, siden butikken selger mens du sover.',
    utdyping: [
      {
        t: 'Hvorfor en nettbutikk koster mer',
        a: 'En vanlig nettside har én ting som kan gå galt: at noen ikke finner kontaktskjemaet. En nettbutikk har betaling som må gå gjennom, frakt som må regnes riktig ut, lager som må stemme, kvitteringer som må sendes, og retur som må håndteres. Hvert av leddene må testes hver for seg og sammen. Det er testingen, ikke designet, som skiller de to prisene.',
      },
      {
        t: 'Kostnadene som kommer hver måned',
        a: 'Betalingsløsningen tar en andel av hvert salg, typisk rundt 2 prosent pluss et fast beløp per transaksjon. Kommer det en fraktintegrasjon eller et regnskapssystem på toppen, har de egne månedspriser. Regn ut hva de faste kostnadene blir ved null salg før du starter, så vet du hva butikken må omsette for bare for å gå i null.',
      },
    ],
    relatert: ['hvor-lang-tid-tar-en-nettside', 'hva-koster-en-nettside'],
    til: { tekst: 'Om nettbutikk', rute: '/lage-nettbutikk' },
  },
  {
    slug: 'wordpress-wix-eller-handkodet',
    q: 'Bør jeg velge WordPress, Wix eller en håndkodet nettside?',
    tittel: 'WordPress, Wix eller håndkodet nettside?',
    beskrivelse: 'Wix passer hvis du vil gjøre alt selv. WordPress hvis du trenger mye funksjonalitet og har noen til å vedlikeholde. Håndkodet hvis du vil ha fart og slippe å tenke på det.',
    a: 'Wix passer hvis du vil gjøre alt selv og siden er enkel. WordPress passer hvis du trenger mye funksjonalitet og har noen til å vedlikeholde den, for pluginene må oppdateres og sikkerhetshull må tettes. Håndkodet passer hvis du vil ha en rask side som ser ut som deg og ikke som en mal, og som du slipper å tenke på. Jeg bygger det siste, men sier fra hvis noe av det andre passer deg bedre.',
    utdyping: [
      {
        t: 'Wix: enkelt, helt til det blir trangt',
        a: 'Du kommer i gang på en ettermiddag uten å kunne noe teknisk, og du får hosting og sikkerhet inkludert. Prisen er at du er låst til plattformen. Siden kan ikke flyttes ut, du styrer ikke hva som lastes inn, og på mobil er malene sjelden så raske som en side bygget for formålet. Det holder lenge for en enkel bedriftsside, og blir en vegg den dagen du vil noe eget.',
      },
      {
        t: 'WordPress: kraftig, men må passes på',
        a: 'Rundt fire av ti nettsteder i verden kjører WordPress, og det finnes en plugin for nesten alt. Baksiden er at hver plugin er kode noen andre vedlikeholder, og at et sikkerhetshull i en av dem er et hull i siden din. Har du noen som holder oppdateringene i gang, er det et solid valg. Har du ikke det, blir siden sakte utrygg uten at det synes utenfra.',
      },
      {
        t: 'Håndkodet: raskest, men du trenger noen',
        a: 'En side som er skrevet for formålet laster på under ett sekund, har ingen plugins som kan ryke, og ser ut som bedriften din i stedet for som en mal. Du trenger derimot noen når noe skal endres i strukturen, med mindre du kjøper en driftsavtale. Det er byttehandelen: du gir opp å skru på alt selv, og får til gjengjeld fart, sikkerhet og et uttrykk som ikke går igjen hos tusen andre.',
      },
    ],
    relatert: ['er-billig-nettside-verdt-det', 'hva-koster-drift-av-nettside'],
    til: { tekst: 'Se sammenligningen', rute: '/sammenlign' },
  },
  {
    // «google min bedrift» 590/mnd KD 16
    slug: 'google-bedriftsprofil',
    q: 'Hva er Google Bedriftsprofil, og trenger jeg den?',
    tittel: 'Hva er Google Bedriftsprofil, og trenger du den?',
    beskrivelse: 'Ja, hvis du har kunder i nærområdet. Den gratis oppføringen gir deg kartnål, åpningstider og anmeldelser, og tar 20 minutter å sette opp.',
    a: 'Ja, hvis du har kunder i nærområdet. Google Bedriftsprofil er den gratis oppføringen som gir deg kartnål, åpningstider og anmeldelser når folk søker etter tjenesten din pluss et stedsnavn. For en lokal håndverker eller frisør gir den ofte flere henvendelser enn selve nettsiden det første halvåret. Den koster ingenting og tar 20 minutter å sette opp.',
    utdyping: [
      {
        t: 'Slik setter du den opp',
        a: 'Søk opp «Google Bedriftsprofil», logg inn med en Google-konto som tilhører bedriften og ikke deg privat, og fyll ut navn, kategori, adresse og åpningstider. Google sender et verifiseringskort i posten eller ringer deg. Legg inn minst ti bilder av ekte arbeid, ikke stockfoto, og skriv beskrivelsen med de samme ordene folk søker på. Hele jobben tar rundt 20 minutter pluss ventetiden på verifisering.',
      },
      {
        t: 'Feltet folk glemmer',
        a: 'Kategorien. Den styrer hvilke søk du i det hele tatt er med i, og de fleste velger den bredeste som finnes og blir dermed usynlig for de spesifikke søkene. Velg den kategorien som beskriver hovedtjenesten din presist, og legg de andre til som sekundærkategorier. Sjekk deretter at navn, adresse og telefonnummer står ordrett likt her som på nettsiden din. Google sammenligner dem, og uenighet svekker begge.',
      },
    ],
    relatert: ['hva-er-sokemotoroptimalisering', 'synlig-i-chatgpt-og-ai-sok'],
    til: { tekst: 'Les hele guiden', rute: '/blogg/google-min-bedrift' },
  },
  {
    slug: 'eier-jeg-nettsiden-selv',
    q: 'Eier jeg nettsiden og koden min selv?',
    tittel: 'Eier du nettsiden og koden din selv?',
    beskrivelse: 'Ja, alltid. Betaler du engangspris, får du alle filene overlevert. Velger du drift, eier du fortsatt innhold og design, og kan ta det med deg når du vil.',
    a: 'Ja, alltid. Betaler du engangspris, får du alle filene overlevert og eier hele greia med en gang. Velger du abonnement, eier du innholdet og designet hele veien, og filene er dine når de 12 avtalte månedene er betalt. På ren drift er det 0 måneders bindingstid og 0 dagers oppsigelsestid. Det er verdt å spørre enhver leverandør om dette skriftlig før du signerer.',
    utdyping: [
      {
        t: 'Hva eierskap betyr i praksis',
        a: 'At du kan gå til en hvilken som helst annen utvikler med filene, og at han kan jobbe videre på dem. Det er testen. En leverandør kan godt si at du «eier siden din» og likevel bygge den på en plattform der filene ikke kan hentes ut. Spør konkret: hvis jeg ber om alt i dag, hva får jeg i mappen? Svaret bør være HTML, CSS, bilder og teksten, ikke en lenke til et administrasjonspanel.',
      },
      {
        t: 'Domenet er det viktigste av alt',
        a: 'Sjekk at domenet er registrert på bedriften din, ikke på leverandøren. Det tar to minutter å slå opp på en domenesøketjeneste, og det er den ene tingen som virkelig kan låse deg fast: uten domenet må du starte forfra med ny adresse, og all rangering i Google følger med den gamle. Står feil eier der i dag, be om å få det overført før du gjør noe annet.',
      },
    ],
    relatert: ['krav-til-nettsideleverandor', 'hva-koster-drift-av-nettside'],
    til: { tekst: 'Se prismodellene', rute: '/priser' },
  },
  {
    slug: 'byra-eller-frilanser',
    q: 'Hva er forskjellen på et byrå og en frilanser?',
    tittel: 'Byrå eller frilanser til nettsiden?',
    beskrivelse: 'Et byrå har flere spesialister, men prosjektlederen din er sjelden den som gjør jobben. En frilanser er billigere og du snakker med den som bygger, men kapasiteten er begrenset.',
    a: 'Et byrå har flere folk med hver sin spesialitet, og prosjektlederen din er sjelden den som gjør arbeidet. En frilanser er billigere og du snakker med den som faktisk bygger, men kapasiteten er begrenset. Oppskalert er det siste: én person, som både tegner, koder, skriver og setter opp serveren. Ringer du, tar jeg telefonen selv.',
    utdyping: [
      {
        t: 'Det du får hos et byrå',
        a: 'Kapasitet og forutsigbarhet. Blir én person syk, tar en annen over. Trenger prosjektet plutselig video, animasjon og en kampanje samtidig, finnes folkene allerede i huset. For store prosjekter med mange interessenter er det en reell fordel. Prisen er at et ledd mellom deg og arbeidet skal betales, og at beskjeder må gjennom det leddet begge veier.',
      },
      {
        t: 'Det du gir opp hos en frilanser',
        a: 'Kapasitet, ærlig talt. Én person kan ta et begrenset antall prosjekter samtidig, og blir vedkommende syk, står prosjektet. Til gjengjeld snakker du hele veien med den som faktisk bygger, og ingenting går tapt i oversettelsen mellom det du sa og det som blir laget. For en bedriftsside på fem til ti sider er det byttet de fleste tjener på.',
      },
    ],
    relatert: ['krav-til-nettsideleverandor', 'hva-koster-webdesign-i-oslo'],
    til: { tekst: 'Om meg', rute: '/om' },
  },
  {
    slug: 'hva-koster-drift-av-nettside',
    q: 'Hva koster drift og vedlikehold av en nettside?',
    tittel: 'Hva koster drift og vedlikehold av en nettside?',
    beskrivelse: 'Fra 149 kroner i måneden for hosting, domene, SSL, backup og oppdateringer. 690 i måneden hvis jeg også gjør innholdsendringer for deg. Ingen bindingstid.',
    a: 'Fra 149 kroner i måneden hos meg for hosting, domene, SSL, backup og oppdateringer. Vil du at jeg også skal gjøre innholdsendringer for deg, koster det 690 i måneden. Til sammenligning starter driftsavtaler hos byråer flest rundt 2 500 i måneden. Alt uten bindingstid, så du kan bytte nivå eller avslutte når du vil.',
    utdyping: [
      {
        t: 'Hva som ligger i drift',
        a: 'Fem ting: at siden faktisk er oppe, at domenet fornyes i tide, at sikkerhetssertifikatet er gyldig, at det finnes en sikkerhetskopi å hente tilbake fra, og at det som må oppdateres blir oppdatert. Ingen av delene synes så lenge de virker, og alle fem synes samme dag de ikke gjør det. Et utløpt sertifikat gir besøkende en rød advarselsside, og det tar under et minutt å miste tilliten der.',
      },
      {
        t: 'Hva som skjer om ingen drifter siden',
        a: 'Sjelden noe, i lang tid. Så utløper domenet en fredag, eller et sikkerhetshull i en plugin blir utnyttet, og siden er borte eller full av lenker du ikke har lagt inn. Google fjerner den fra søkeresultatene raskt når det skjer, og å komme tilbake tar lenger tid enn å falle ut. Kjøper du ikke drift av meg, sørg for at noen har ansvaret. Det viktigste er at det ikke er ingen.',
      },
    ],
    relatert: ['hva-koster-en-nettside', 'eier-jeg-nettsiden-selv'],
    til: { tekst: 'Se driftsnivåene', rute: '/drift' },
  },
];

/* Oppslag brukes av undersiden, av `relatert`-blokken og av
   prerender/sitemap, som begge utleder rutene herfra. */
export const finnSporsmal = (slug) => populaereSok.find((s) => s.slug === slug);

export const sporsmalRute = (slug) => `${RUTE_VANLIGE_SPORSMAL}/${slug}`;

/* Samlesidens schema: alle femten spørsmålene i ett FAQPage. */
export const populaereSokSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: populaereSok.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* Undersidens schema: ett FAQPage med ett spørsmål i.
 *
 * Utdypingene legges med som egne Question-noder, ikke slått sammen med
 * kortsvaret. Slår man dem sammen, blir acceptedAnswer et avsnitt på 400
 * ord, og da er det ikke lenger et svar en modell kan sitere. Hver
 * utdyping er formulert som et eget spørsmål nettopp fordi den skal
 * kunne stå alene. */
export const sporsmalSchema = (item) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } },
    ...(item.utdyping ?? []).map(({ t, a }) => ({
      '@type': 'Question',
      name: t,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  ],
});
