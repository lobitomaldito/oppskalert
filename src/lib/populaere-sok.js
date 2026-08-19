/* Samleside for populære søk.
 *
 * Egen fil, ikke site.js, fordi dette settet bare brukes av én rute og
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
 */

/* Ruten hører egentlig hjemme i `ruter` i site.js. Den ligger her fordi
   site.js var under arbeid i en annen sesjon da denne siden ble laget.
   Flytt den inn i `ruter` ved neste opprydding, og oppdater importen i
   Layout.jsx. */
export const RUTE_VANLIGE_SPORSMAL = '/vanlige-sporsmal';

export const populaereSok = [
  {
    // «hva koster en nettside» 70/mnd KD 0, pluss prisklyngen på 720/mnd samlet
    q: 'Hva koster en nettside i Norge?',
    a: 'Regn med 5 000 til 15 000 kroner for en malbasert side, og fra 25 000 og oppover hos de fleste byråer som bygger fra bunnen. Hos meg starter en håndbygd nettside på 7 990 kroner eks. mva som engangspris, eller 690 kroner i måneden hvis jeg skal drifte den også. Prisen avhenger av hvor mange sider og funksjoner du trenger, men du får den fast og skriftlig før jeg begynner.',
    til: { tekst: 'Se hele prislisten', rute: '/priser' },
  },
  {
    // «nettsideleverandør» 90/mnd KD 0, høyest CPC i tabellen
    q: 'Hva bør jeg kreve av en nettsideleverandør?',
    a: 'Fire ting: fast pris før arbeidet starter, at du eier koden og innholdet etterpå, ingen bindingstid, og at du får se noe ferdig før du betaler. Klarer ikke leverandøren å love alle fire, er det verdt å spørre hvorfor. Selv bygger jeg hele demoen ferdig innen 3 virkedager, og du bestemmer deg etterpå.',
    til: { tekst: 'Slik jobber jeg', rute: '/metode' },
  },
  {
    // «søkemotoroptimalisering» 590/mnd KD 9, størst volum med kjøpsintensjon
    q: 'Hva er søkemotoroptimalisering?',
    a: 'Søkemotoroptimalisering, ofte forkortet SEO, er arbeidet med å gjøre nettsiden lesbar og relevant nok til at Google viser den høyt når folk søker. Det består av tre lag: at robotene i det hele tatt får lest siden, at innholdet svarer på det folk søker etter, og at andre nettsteder lenker til deg. Rekkefølgen er viktig. En side Google ikke får lest rangerer ikke uansett hvor gode ordene er.',
    til: { tekst: 'Mer om søkemotoroptimalisering', rute: '/sokemotoroptimalisering' },
  },
  {
    // «nettside ai» 140/mnd KD 0. Spørsmålet er også selve AEO-argumentet.
    q: 'Hvordan blir bedriften min synlig i ChatGPT og AI-søk?',
    a: 'Det viktigste er at siden leveres som ferdig HTML. De fleste AI-crawlere kjører ikke JavaScript, så en nettside som bygges opp i nettleseren er helt tom for dem, selv om den ser fin ut for deg. Utover det hjelper tre ting: en llms.txt i roten, strukturerte data om hva bedriften gjør og hvor den holder til, og overskrifter som er formulert som spørsmål med svaret rett under. Det er avsnitt som siteres.',
    til: { tekst: 'Slik jobber jeg med søk', rute: '/sokemotoroptimalisering' },
  },
  {
    // «hvordan lage nettside» 210/mnd KD 15
    q: 'Hvordan lager man en nettside?',
    a: 'Kort fortalt: sikre domenet, bestem hva siden skal få folk til å gjøre, skriv teksten, bygg den, og koble på måling. Rekkefølgen betyr mer enn verktøyet. De fleste begynner med design og oppdager for sent at de mangler tekst. Skal du gjøre det selv, sett av noen kvelder. Skal jeg gjøre det, tar det 1 til 2 uker fra du sier ja.',
    til: { tekst: 'Se de fire stegene', rute: '/metode' },
  },
  {
    // «billig nettside» 70/mnd KD 0, høy CPC
    q: 'Er en billig nettside verdt det?',
    a: 'Noen ganger, ja. Trenger du bare et sted å vise åpningstider og et telefonnummer, holder det lenge med en enkel side. Problemet oppstår når den billige siden er treg, ikke kan endres uten leverandøren, eller er bygget slik at Google ikke får lest den. Da har du betalt lite for noe som ikke gjør en jobb, og det er dyrere enn å gjøre det riktig en gang.',
    til: { tekst: 'Sammenlign alternativene', rute: '/sammenlign' },
  },
  {
    // «webdesign oslo» 140/mnd KD 17 + «webutvikler oslo» 260/mnd KD 16
    q: 'Hva koster webdesign i Oslo?',
    a: 'Prisnivået i Oslo ligger typisk fra 25 000 kroner og oppover for en skreddersydd bedriftsside. Jeg holder til i Oslo og starter på 7 990 kroner, fordi jeg er én person uten kontorleie og fordi jeg bygger med AI som fjerner ukene som pleide å gå med til førsteutkast og standardkode. Du kan møte meg fysisk hvis du vil, men de fleste tar det på telefon.',
    til: { tekst: 'Webdesign i Oslo', rute: '/webdesign-oslo' },
  },
  {
    q: 'Hvor lang tid tar det å lage en nettside?',
    a: 'Demoen din er ferdig innen 3 virkedager. Fra du sier ja til at siden står live på ditt eget domene går det som regel 1 til 2 uker. Det som styrer tempoet er nesten alltid hvor fort du rekker å svare, ikke hvor fort jeg jobber. Større løsninger med nettbutikk eller innlogging tar lenger, og da sier jeg fra på forhånd.',
    til: { tekst: 'Slik går det til', rute: '/metode' },
  },
  {
    q: 'Trenger jeg ny nettside, eller holder det å pusse opp den jeg har?',
    a: 'Ofte holder det å pusse opp. Er strukturen grei og siden bare treg eller dårlig skrevet, er det dumt å betale for alt på nytt. Send meg adressen, så ser jeg over den gratis og sier ærlig fra hva jeg ville gjort. Det tar meg under 30 minutter, og noen ganger er svaret at du ikke trenger meg.',
    til: { tekst: 'Ta kontakt', rute: '/kontakt' },
  },
  {
    // «lage nettbutikk» 210/mnd KD 15
    q: 'Hva koster det å lage nettbutikk?',
    a: 'En nettbutikk koster mer enn en vanlig nettside, fordi betaling, frakt og lager må virke sammen. Regn med at det starter et sted mellom 2 og 3 ganger prisen på en vanlig side. Til gjengjeld er det ett av få nettsideprosjekter der du kan regne hjem investeringen direkte, siden butikken selger mens du sover.',
    til: { tekst: 'Om nettbutikk', rute: '/lage-nettbutikk' },
  },
  {
    q: 'Bør jeg velge WordPress, Wix eller en håndkodet nettside?',
    a: 'Wix passer hvis du vil gjøre alt selv og siden er enkel. WordPress passer hvis du trenger mye funksjonalitet og har noen til å vedlikeholde den, for pluginene må oppdateres og sikkerhetshull må tettes. Håndkodet passer hvis du vil ha en rask side som ser ut som deg og ikke som en mal, og som du slipper å tenke på. Jeg bygger det siste, men sier fra hvis noe av det andre passer deg bedre.',
    til: { tekst: 'Se sammenligningen', rute: '/sammenlign' },
  },
  {
    // «google min bedrift» 590/mnd KD 16
    q: 'Hva er Google Bedriftsprofil, og trenger jeg den?',
    a: 'Ja, hvis du har kunder i nærområdet. Google Bedriftsprofil er den gratis oppføringen som gir deg kartnål, åpningstider og anmeldelser når folk søker etter tjenesten din pluss et stedsnavn. For en lokal håndverker eller frisør gir den ofte flere henvendelser enn selve nettsiden det første halvåret. Den koster ingenting og tar 20 minutter å sette opp.',
    til: { tekst: 'Les hele guiden', rute: '/blogg/google-min-bedrift' },
  },
  {
    q: 'Eier jeg nettsiden og koden min selv?',
    a: 'Ja, alltid. Betaler du engangspris, får du alle filene overlevert og eier hele greia. Velger du at jeg drifter siden, eier du fortsatt både innholdet og designet, og du kan ta det med deg til noen andre når du vil. 0 måneders bindingstid og 0 dagers oppsigelsestid. Det er verdt å spørre enhver leverandør om dette skriftlig før du signerer.',
    til: { tekst: 'Se prismodellene', rute: '/priser' },
  },
  {
    q: 'Hva er forskjellen på et byrå og en frilanser?',
    a: 'Et byrå har flere folk med hver sin spesialitet, og prosjektlederen din er sjelden den som gjør arbeidet. En frilanser er billigere og du snakker med den som faktisk bygger, men kapasiteten er begrenset. Oppskalert er det siste: én person, som både tegner, koder, skriver og setter opp serveren. Ringer du, tar jeg telefonen selv.',
    til: { tekst: 'Om meg', rute: '/om' },
  },
  {
    q: 'Hva koster drift og vedlikehold av en nettside?',
    a: 'Fra 149 kroner i måneden hos meg for hosting, domene, SSL, backup og oppdateringer. Vil du at jeg også skal gjøre innholdsendringer for deg, koster det 690 i måneden. Til sammenligning starter driftsavtaler hos byråer flest rundt 2 500 i måneden. Alt uten bindingstid, så du kan bytte nivå eller avslutte når du vil.',
    til: { tekst: 'Se driftsnivåene', rute: '/drift' },
  },
];

export const populaereSokSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: populaereSok.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};
