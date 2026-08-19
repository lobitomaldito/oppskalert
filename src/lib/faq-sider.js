/* FAQ for de fire rutene som manglet en, og som samtidig lå under 310 ord
 * i rå HTML. Begge problemene løses av det samme grepet.
 *
 * Egen fil fordi site.js var under arbeid i en annen sesjon. Slå den
 * sammen med `landingsSporsmal` ved neste opprydding.
 *
 * Samme regler som resten: svaret begynner med svaret, hvert svar har et
 * tall, og ingen særskriving.
 */

export const faqKalkulator = [
  {
    q: 'Hvor nøyaktig er kalkulatoren?',
    a: 'Den treffer som regel innenfor et par tusen kroner, fordi den regner på de samme faktorene jeg selv bruker: antall sider, om du trenger nettbutikk eller booking, og om teksten finnes fra før. Den vet derimot ingenting om bedriften din, så tallet er et anslag og ikke et tilbud. Prisen du får skriftlig fra meg er fast.',
  },
  {
    q: 'Må jeg oppgi e-post for å se prisen?',
    a: 'Nei. Du får tallet på skjermen med en gang, uten skjema og uten at jeg vet at du var her. Jeg synes det er rart å kreve kontaktinfo for å svare på hva noe koster.',
  },
  {
    q: 'Hvorfor er prisen lavere enn hos andre?',
    a: 'Fordi jeg er én person uten kontorleie, selgere eller prosjektledere, og fordi jeg bygger med AI som fjerner ukene som pleide å gå med til førsteutkast og standardkode. Det er hele forklaringen på at en håndbygd side starter på 9 999 kroner og ikke 25 000.',
  },
  {
    q: 'Hva er ikke med i prisen?',
    a: 'Domenet ditt, som koster rundt 100 til 200 kroner i året hos registraren, og innhold jeg ikke kan lage selv, som profesjonell fotografering. Hosting, SSL, oppsett og tekstene er med. Trenger du noe utover det, sier jeg fra før vi starter, ikke etterpå.',
  },
  {
    q: 'Hva om jeg vil ha noe kalkulatoren ikke dekker?',
    a: 'Send meg en linje om hva det er, så regner jeg på det. Kalkulatoren dekker det de fleste trenger, men innlogging, integrasjon mot et fagsystem eller flerspråklig innhold krever at jeg ser på det konkret. Du får uansett fast pris før jeg begynner.',
  },
];

export const faqSammenlign = [
  {
    q: 'Hvorfor anbefaler du noen ganger andre enn deg selv?',
    a: 'Fordi det stemmer oftere enn folk tror. Trenger du bare en enkel side du oppdaterer selv, er en byggeklossløsning til noen hundrelapper i måneden riktig svar, og da sier jeg det. Jeg vil heller ha 10 kunder som passer enn 20 som angrer.',
  },
  {
    q: 'Hva koster de ulike alternativene over tid?',
    a: 'En byggeklossløsning koster lite i starten og fortsetter å koste hver måned så lenge siden lever. En håndbygd side fra meg koster 9 999 kroner én gang, og så 0 hvis du hoster den selv. Krysningspunktet ligger typisk mellom år 2 og år 4, avhengig av hvilken plan du velger.',
  },
  {
    q: 'Kan jeg flytte siden min bort fra deg senere?',
    a: 'Ja, når som helst. Du eier koden, designet og innholdet uansett hvilken modell du velger, og du har 0 dagers oppsigelsestid. Det er verdt å sjekke det samme hos alle du vurderer, for det er her forskjellene er størst.',
  },
  {
    q: 'Hvor mye tid må jeg regne med å bruke selv?',
    a: 'Bygger du selv, regn med 20 til 40 timer for en enkel bedriftsside, og at du fortsatt eier vedlikeholdet etterpå. Bygger jeg den, bruker du typisk 1 til 2 timer til sammen: du sender meg navnet på bedriften, ser på demoen, og sier hva du vil endre.',
  },
];

export const faqWix = [
  {
    q: 'Er Wix bra nok for en liten bedrift?',
    a: 'Ofte ja. Har du én side med kontaktinfo og noen bilder, og du vil endre den selv uten å ringe noen, er Wix et fornuftig valg. Det blir dyrt over tid og tregt når siden vokser, men for en enkel side som skal stå i noen få år, er det ikke feil.',
  },
  {
    q: 'Kan jeg flytte en Wix-side til deg?',
    a: 'Innholdet ja, selve siden nei. Wix-sider kan ikke eksporteres, så en flytting betyr i praksis at jeg bygger på nytt med teksten og bildene dine som utgangspunkt. Det er mindre arbeid enn det høres ut, og det tar de samme 3 virkedagene til demoen står klar.',
  },
  {
    q: 'Blir en Wix-side funnet i Google?',
    a: 'Ja, men den starter med en ulempe. Wix legger på mye kode siden ikke trenger, og det gjør den tregere, som Google måler direkte. Du kan rangere på Wix, det krever bare at innholdet er tydelig bedre enn konkurrentens.',
  },
  {
    q: 'Hva koster Wix egentlig i året?',
    a: 'Planene ligger typisk mellom 1 500 og 4 000 kroner i året avhengig av nivå, pluss domenet. Det høres lite ut, men over 5 år er det 7 500 til 20 000 kroner du aldri eier noe for. En håndbygd side koster 9 999 én gang.',
  },
];

export const faqWordPress = [
  {
    q: 'Er WordPress fortsatt et godt valg?',
    a: 'Ja, hvis du har noen til å vedlikeholde det. WordPress driver rundt 40 prosent av verdens nettsteder og kan gjøre nesten hva som helst. Prisen er at pluginene må oppdateres og sikkerhetshull må tettes, og det er den jobben folk undervurderer.',
  },
  {
    q: 'Hva skjer hvis jeg ikke oppdaterer WordPress?',
    a: 'Da blir siden et innbruddsmål. De aller fleste WordPress-hack skjer gjennom utdaterte plugins, ikke gjennom passordet ditt. En side som står uoppdatert i 6 måneder er reelt eksponert, og opprydding etter et innbrudd koster mer enn vedlikeholdet ville gjort.',
  },
  {
    q: 'Kan du overta WordPress-siden jeg allerede har?',
    a: 'Ja. Jeg kan enten drifte den som den er fra 149 kroner i måneden, eller bygge den om hvis det lønner seg. Send meg adressen, så ser jeg over den gratis og sier ærlig fra hva jeg ville gjort. Det tar meg under 30 minutter.',
  },
  {
    q: 'Hvorfor bygger du ikke i WordPress?',
    a: 'Fordi en håndkodet side laster på under 1 sekund og ikke har plugins som kan brekke. For en bedriftsside med 5 til 15 undersider trenger du ikke fleksibiliteten WordPress gir, og da betaler du bare vedlikeholdskostnaden uten å få noe igjen for den.',
  },
];
