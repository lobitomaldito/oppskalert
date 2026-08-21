/* Innholdet fra studio-mal-demoen, ordrett.

   Hentet programmatisk ut av demoens egne datablokker 19. august 2026, ikke
   skrevet av for hand, sa teksten er identisk med den som ble godkjent.
   Kilden er mal3.src.html, se inspirasjon/demo-studio-mal.md.

   Prisene er det ene unntaket: demoen sier 9 999, og den er hevet til 9 999
   etter beslutning 19. august 2026.

   Feltet ikon er ra SVG-innmat og settes med dangerouslySetInnerHTML. Det er
   trygt her fordi strengene er vare egne konstanter i denne fila, ikke noe
   som kommer utenfra. Kommer innholdet en dag fra et CMS, ma dette bygges om.
*/

/* En side per prosjekt, med tanken bak i stedet for bare et bilde.
   Feltet i peker pa indeksen i prosjekter i site.js, som eier bildene. */
export const caser = [
  {
    "slug": "woxen-hage",
    "i": 0,
    "tittel": "Hagehjelp bestilt på under ett minutt",
    "ingress": "Hagestell i Oslo konkurrerer mot naboens sønn og en annonse på Finn. Siden måtte gjøre det raskere å be om befaring enn å ringe rundt.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Tekster skrevet",
      "Bilder og bildebehandling",
      "Søkeoppsett for lokale søk",
      "Hosting og drift"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Skjema med varsling"
    ],
    "utfordring": {
      "t": "Hagearbeid kjøpes på impuls",
      "a": [
        "Noen ser ut på hekken en lørdag, bestemmer seg der og da, og søker. Den som gjør det enklest å be om pris, vinner jobben. Ikke den som har finest side.",
        "Da hjelper det ikke å ha en side som er pen å bla i. Den må svare på hva, hvor og hva det koster, før du har rukket å scrolle."
      ]
    },
    "losning": {
      "t": "Alt som avgjør, i første skjerm",
      "a": [
        "Overskriften sier både tjenesten og byen, så du vet på ett blikk om det er deg. Under står de fire tjenestene med ordene folk faktisk bruker: plenklipp, hekk, luking, bortkjøring.",
        "Det finnes bare <b>én handling</b> på hele siden, og det er gratis befaring. Den gjentas etter hver seksjon i stedet for at det dukker opp fem konkurrerende knapper.",
        "Under ligger «Tre enkle steg», som fjerner den siste innvendingen: hva skjer egentlig etter at jeg trykker?"
      ]
    }
  },
  {
    "slug": "katrin-brubakk",
    "i": 1,
    "tittel": "Foredrag og terapi samlet på én rolig side",
    "ingress": "Barnepsykolog, feltarbeider for Leger Uten Grenser og foredragsholder. Tre roller som lett drar en nettside i tre retninger.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Innholdsstruktur for to målgrupper",
      "Tidslinje for priser og foredrag",
      "Søkeoppsett",
      "Hosting og drift"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Bookingskjema"
    ],
    "utfordring": {
      "t": "To kjøpere som ikke ligner hverandre",
      "a": [
        "En arrangør som skal booke foredrag, og en forelder eller kollega som leter etter fagpersonen. De vil vite helt forskjellige ting, og de tåler helt forskjellig tone.",
        "I tillegg er stoffet tungt. Katrin jobber med barn i krig. En lys, kommersiell salgsside ville vært feil på en måte som er vanskelig å reparere."
      ]
    },
    "losning": {
      "t": "Alvoret bærer designet",
      "a": [
        "Siden er mørk, stille og satt i antikva. Det er ikke et stilvalg for å være pen, det er fordi tonen må matche innholdet før noen tror på det.",
        "Prisene og foredragene ligger som en <b>tidslinje</b> i stedet for en skrytepunktliste. Den gjør jobben med å bygge tillit uten at hun må skryte i førsteperson.",
        "Booking finnes på hver skjerm, men roper aldri. Arrangøren finner den når hun er klar, ikke før."
      ]
    }
  },
  {
    "slug": "samtaleverkstedet",
    "i": 2,
    "tittel": "Terapi som tør å være varm i tonen",
    "ingress": "Veiledning for ledere og folk i omsorgsyrker. Den som leter er som regel sliten når hun leter, og da betyr tonen mer enn tjenestelista.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Tekster og struktur",
      "Portrettfoto satt inn",
      "Søkeoppsett",
      "Hosting og drift"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Kontaktskjema"
    ],
    "utfordring": {
      "t": "Kjøperen er sliten når hun kommer",
      "a": [
        "Folk som søker etter veiledning for utbrenthet er ikke i humør til å bli solgt til. En side med store løfter og aggressive knapper skyver dem bort.",
        "Samtidig må siden fortsatt gjøre en jobb. Det hjelper ikke å være vennlig hvis ingen forstår hva som tilbys eller hvordan man tar kontakt."
      ]
    },
    "losning": {
      "t": "Rolig først, tydelig rett etterpå",
      "a": [
        "Fargene er varme og dempede, og portrettet kommer tidlig. Du ser hvem du skal snakke med før du ser hva det koster.",
        "I stedet for en tjenesteliste er innholdet delt i <b>tre navngitte veier</b>, så leseren kjenner seg igjen i én av dem i stedet for å måtte velge fra en meny.",
        "Én setning midt på siden navngir tilstanden leseren er i. Det er den setningen folk husker, og den gjør mer for konverteringen enn noen knapp."
      ]
    }
  },
  {
    "slug": "steinar-husby",
    "i": 3,
    "tittel": "Én foredragsholder, ett tydelig løfte",
    "ingress": "Foredrag om livsmestring, solgt til kurskomiteer og HR-folk som sitter med tjue navn på en liste og skal velge ett.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Tekster og struktur",
      "Referanselogoer og tall",
      "Anmeldelser hentet inn",
      "Hosting og drift"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Bookingskjema"
    ],
    "utfordring": {
      "t": "Kjøperen sammenligner tjue navn",
      "a": [
        "Ingen leser en foredragsholderside fra topp til bunn. Den som booker skanner etter tre ting: har han holdt foredrag for noen jeg kjenner, hva handler det om, og er andre fornøyd.",
        "Klarer ikke siden å svare på alle tre innen første skjermhøyde, blir navnet strøket fra lista."
      ]
    },
    "losning": {
      "t": "Bevis før beskrivelse",
      "a": [
        "Rett under heroen står <b>logostripa</b> med de som allerede har booket ham. Det er det raskeste svaret på det første spørsmålet.",
        "Så kommer tre harde tall: land besøkt, bøker solgt, score på Talerlisten. Målte tall, ikke adjektiver.",
        "Selve foredraget er delt i tre navngitte temaer i et trekkspill, så en kurskomité kan lese akkurat det de lurer på uten å lese alt. Anmeldelsene nederst er signert med navn og stilling."
      ]
    }
  },
  {
    "slug": "progressive-diplomacy",
    "i": 4,
    "tittel": "Rådgivning over landegrenser, forklart enkelt",
    "ingress": "Geopolitisk økonomi, handel og forhandlinger. Fagfeltet er tungt, og kjøperen har ikke tid til å tyde det.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Innholdsstruktur",
      "Engelsk og norsk",
      "Søkeoppsett",
      "Hosting og drift"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "To språk"
    ],
    "utfordring": {
      "t": "Fagtyngde som stenger folk ute",
      "a": [
        "Rådgivning innen geopolitikk selges til folk som selv er travle og velinformerte. De skanner, de leser ikke.",
        "Skriver du fagfeltet slik det står i en artikkel, mister du dem. Skriver du det for enkelt, mister du troverdigheten. Marginen er smal."
      ]
    },
    "losning": {
      "t": "Institusjonelt uttrykk, korte lister",
      "a": [
        "Fargen og typografien er bevisst institusjonell. Den signaliserer alvor før et eneste ord er lest, og kjøper deg lov til å skrive kortere.",
        "Fagfeltene står som <b>tre linjer</b>, ikke tre avsnitt: geopolitisk økonomi, handel og bærekraftig utvikling, forhandlinger. Den som kjenner feltet trenger ikke mer.",
        "En «Aktuelt»-seksjon viser at praksisen er levende. Uten den ser en rådgiverside død ut, uansett hvor pen den er."
      ]
    }
  },
  {
    "slug": "tore-sunde-rasmussen",
    "i": 5,
    "tittel": "Fra visittkort til noe som faktisk ringer",
    "ingress": "To ganger på Everest og seks av de sju toppene. Historien var sterk nok, men den lå ikke noe sted en arrangør kunne finne den.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Tekster og struktur",
      "Video lagt inn",
      "Ekspedisjonsbilder",
      "Hosting og drift"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Video",
      "Bookingskjema"
    ],
    "utfordring": {
      "t": "Historien var produktet, men usynlig",
      "a": [
        "Når det du selger er en opplevelse, holder det ikke å beskrive den. Arrangøren må kjenne den før hun tør å sette navnet på programmet.",
        "Den gamle siden var i praksis et digitalt visittkort. Alt det som gjør Tore verdt å booke, lå utenfor den."
      ]
    },
    "losning": {
      "t": "La bildene og stemmen gjøre jobben",
      "a": [
        "Fotografiene fra ekspedisjonene er ikke pynt, de er selve argumentet, og de får fylle flatene helt ut.",
        "<b>Video ligger midt på siden</b>, ikke gjemt under «Om». En arrangør som skal bruke penger vil høre stemmen før hun bestemmer seg, og da skal hun slippe å lete.",
        "Tallene står som en rad rett under heroen: to Everest-turer, seks av sju topper, score på Talerlisten. Bookingknappen følger med hele veien ned."
      ]
    }
  }
];

/* Sju tjenester. De tre siste er AI-tilbudet: chatbot, automatikk og app. */
export const tjenester = [
  {
    "ikon": "<rect x=\"2.5\" y=\"4\" width=\"19\" height=\"16\" rx=\"2\"/><path d=\"M2.5 9h19\"/><path d=\"M6 6.5h.01M8.5 6.5h.01\"/>",
    "navn": "Ny nettside",
    "tekst": "Jeg koder den for hånd i stedet for å dra den sammen i en byggeklossbygger. Da laster den på under ett sekund, den ser ut som deg og ikke som en mal, og du slipper en side som blir tregere for hvert år som går."
  },
  {
    "ikon": "<path d=\"M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8Z\"/><path d=\"M8.5 7V5.5a3.5 3.5 0 0 1 7 0V7\"/>",
    "navn": "Nettbutikk",
    "tekst": "Betaling, frakt og lager som virker fra første dag. Du legger inn varene selv, det er lettere enn du tror, og jeg ordner resten."
  },
  {
    "ikon": "<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"M15.5 15.5 21 21\"/><path d=\"M10.5 7v7M7 10.5h7\"/>",
    "navn": "Bli funnet i Google og i AI-søk",
    "tekst": "Jeg legger struktur, tekst og fart på plass fra start. Analytics settes opp samtidig, så du kan se selv hvem som faktisk finner deg."
  },
  {
    "ikon": "<path d=\"M12 3 4 6v6c0 4.5 3.2 7.9 8 9 4.8-1.1 8-4.5 8-9V6Z\"/><path d=\"m9 12 2.2 2.2L15.5 10\"/>",
    "navn": "Jeg passer på siden, hvis du vil",
    "tekst": "Vil du slippe å tenke på det tekniske, tar jeg hosting, backup og overvåking. Trenger du å bytte et bilde, sender du en e-post, og som regel er det gjort samme dag."
  },
  {
    "ikon": "<path d=\"M4 5.5h16v10H12l-4.5 3.5V15.5H4Z\"/><path d=\"M8.5 10h.01M12 10h.01M15.5 10h.01\"/>",
    "navn": "Chatbot som svarer for deg",
    "tekst": "En robot trent på din egen bedrift, som svarer på de vanlige spørsmålene hele døgnet og sier fra til deg når noen er klar til å kjøpe. Den kobles på nettsiden din, og du kan overta samtalen selv når du vil."
  },
  {
    "ikon": "<path d=\"M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21\"/><path d=\"m5.6 5.6 2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\"/>",
    "navn": "Få bort det du gjør manuelt",
    "tekst": "Skjemaer som må skrives inn et annet sted, tilbud som skal sendes, purringer som glemmes. Jeg kobler sammen verktøyene du allerede bruker og lar maskinen ta mellomarbeidet. Du bytter ikke ut noe, du slipper bare å gjøre det to ganger."
  },
  {
    "ikon": "<rect x=\"7\" y=\"2.5\" width=\"10\" height=\"19\" rx=\"2.5\"/><path d=\"M10.5 5.5h3\"/><path d=\"M11 18.5h2\"/>",
    "navn": "App, hvis du faktisk trenger en",
    "tekst": "De fleste trenger det ikke, og da sier jeg det. Men skal kundene dine bestille, logge inn eller følge noe over tid, bygger jeg app til iPhone og Android på samme måte som nettsidene: håndkodet, ikke satt sammen av moduler."
  }
];

export const stegene = [
  {
    "tid": "3 virkedager",
    "navn": "Jeg bygger demoen din",
    "tekst": "Send meg navnet på bedriften, så finner jeg resten selv. Du får en ekte side å klikke i, ikke en skisse i PowerPoint. Den ligger på en privat lenke bare du får."
  },
  {
    "tid": "Ditt tempo",
    "navn": "Du sier hva du synes",
    "tekst": "Se på den i fred og ro, gjerne sammen med noen. Liker du den ikke, sletter jeg den, og du skylder meg ingenting. Liker du retningen, justerer vi til den sitter. Det er nå vi blir enige om prisen, og den er fast."
  },
  {
    "tid": "1–2 uker",
    "navn": "Jeg lanserer",
    "tekst": "Domene, SSL og hosting ordner jeg. Har du en gammel side, byttes den uten nedetid. Jeg kobler på Google, tester på ekte mobiler, og sier fra når alt er oppe."
  },
  {
    "tid": "Løpende",
    "navn": "Jeg passer på, hvis du vil",
    "tekst": "Med driftsavtale følger jeg med videre. Trenger du en endring, sender du en e-post, og som regel er det gjort samme dag. Velger du engangspris, får du alle filene og hjelp til å komme i gang selv."
  }
];

export const omtaler = [
  {
    "sitat": "Jeg fikk en vennlig henvendelse fra Aleksander i Oppskalert, og ble raskt imponert over kunnskapen og kompetansen deres. Det var lett å si ja.",
    "navn": "Guro Brakestad",
    "rolle": "Familieterapeut og foredragsholder"
  },
  {
    "sitat": "Jeg ble veldig fornøyd med resultatet, og de leverte raskt!",
    "navn": "Katrin Brubakk",
    "rolle": "katrinbrubakk.no"
  },
  {
    "sitat": "Oppskalert forsto raskt hva vi trengte og leverte en nettside som virkelig representerer oss. Profesjonelt, effektivt og en glede å samarbeide med.",
    "navn": "Thoralf Stenvold",
    "rolle": "Progressive Diplomacy"
  },
  {
    "sitat": "Kjempefornøyd :)",
    "navn": "Irmelin Drake",
    "rolle": "irmelindrake.no"
  }
];

/* Sporsmal og svar som par. Forste element er sporsmalet. */
export const sporsmal = [
  [
    "Hva kommer dette til å koste meg?",
    "Engangspris begynner på 9 999 kroner eks. mva, og da eier du alt selv. Vil du heller at jeg passer på siden for deg, koster det fra 690 i måneden. Hva det ender på hos akkurat deg kommer an på hvor mange sider og funksjoner du trenger, men du får alltid en fast pris fra meg før jeg begynner. Og du får se demoen først, så du vet nøyaktig hva du betaler for."
  ],
  [
    "Hvorfor er prisen lavere enn hos andre?",
    "Fordi jeg er \u00e9n person uten kontorleie, selgere eller prosjektledere, og fordi jeg bygger med AI som fjerner ukene som pleide \u00e5 g\u00e5 med til f\u00f8rsteutkast og standardkode. Det er hele forklaringen p\u00e5 at en h\u00e5ndbygd side starter p\u00e5 9 999 kroner og ikke 25 000."
  ],
  [
    "Hva forplikter en gratis demo meg til?",
    "Ingenting i det hele tatt. Jeg lager et ferdig utkast av siden din, med ditt innhold, og sender deg en privat lenke. Liker du den ikke, sier du fra, så sletter jeg den. Du betaler først når du har sagt ja til noe du faktisk er fornøyd med."
  ],
  [
    "Hvor lang tid tar det?",
    "Demoen er klar innen tre virkedager. Fra du sier ja til at siden står på ditt eget domene, går det stort sett en til to uker. Det som styrer tempoet er som regel hvor fort du rekker å svare meg, ikke hvor fort jeg jobber."
  ],
  [
    "Eier jeg siden selv etterpå?",
    "Ja. Betaler du engangspris, får du alle filene og eier hele greia. Velger du drift hos meg, eier du fortsatt både innholdet og designet, og du kan ta med deg siden til noen andre når som helst. Ingen binding, ingen låsing, ingen oppsigelsestid."
  ],
  [
    "Jeg har allerede en nettside. Trenger jeg ny?",
    "Kanskje ikke. Send meg adressen, så ser jeg over den gratis og sier ærlig fra om det holder å fikse det som er der. Noen ganger er det bare farten eller teksten som er problemet, og da er det dumt av deg å betale for en helt ny side."
  ],
  [
    "Hvem er det jeg snakker med?",
    "Meg. Aleksander. Jeg tegner, koder, skriver og setter opp serveren selv. Sender du en e-post, blir den lest av personen som faktisk bygger siden din, ikke av en support-adresse."
  ]
];
