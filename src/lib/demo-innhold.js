/* Innholdet fra studio-mal-demoen, ordrett.

   Hentet programmatisk ut av demoens egne datablokker 19. august 2026, ikke
   skrevet av for hand, sa teksten er identisk med den som ble godkjent.
   Kilden er mal3.src.html, se inspirasjon/demo-studio-mal.md.

   Prisene er det ene unntaket: demoen sier 9 999, siden sier 6 990 fra
   30. september 2026, se prismodeller i site.js.

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
    },
    "forEtter": {
      "kilde": "Den gamle siden lå på medutlagtsjarm.no og er hentet fra nettarkivet slik den sto 14. mars 2025. Den nye er målt 30. september 2026.",
      "rader": [
        {
          "punkt": "Adresse",
          "for": "medutlagtsjarm.no",
          "na": "steinarhusby.no",
          "hvorfor": "Den som har hørt ham, søker på navnet hans. Den gamle adressen sender videre."
        },
        {
          "punkt": "Tittelen i søketreffet",
          "for": "«Start - Steinar Husby»",
          "na": "Navnet, yrket og hva foredraget heter",
          "hvorfor": "Tittelen er den blå lenken folk klikker på. «Start» sier ingenting om hva han gjør."
        },
        {
          "punkt": "Teksten siden ber Google vise i søketreffet",
          "for": "Ingen",
          "na": "«Steinar Husby holder humørfylte foredrag om livsmestring og positiv holdning. Book ham til ditt neste arrangement.»",
          "hvorfor": "Det er disse linjene folk leser før de velger hvilket treff de klikker på."
        },
        {
          "punkt": "Hovedoverskrifter på forsiden",
          "for": "Fem, to av dem tomme",
          "na": "Én",
          "hvorfor": "Google bruker hovedoverskriften til å forstå hva siden handler om. Fem stykker gir fem ulike svar."
        }
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
  },
  /* Melanie Dahl og Alpha Negotiations. Lagt inn 30. september 2026, de
     to første casene med før og etter.

     forEtter er valgfritt. Hvert tall under er målt: den gamle
     siden fra nettarkivet (web.archive.org) på datoen i `kilde`, den nye
     direkte samme dag, begge med ~/.claude/assets/for-etter/ta-for.mjs.
     `for.bilde` er de øverste 1440 x 1080 px av den gamle forsiden, og
     finnes bare der arkivet hadde siden med stilarket i behold. Steinar
     Husby over har derfor tabell uten bilde.

     Hver rad har en `hvorfor` uten fagord. Klarer du ikke å skrive den,
     skal raden ut. Og spør kunden før en gammel side vises her. */
  {
    "slug": "melanie-dahl",
    "tittel": "To yrker, to innganger, én rolig side",
    "ingress": "Skuespiller og mental trener for scenekunstnere. De to yrkene henger sammen, men de har hver sin kjøper: den ene skal booke en forestilling, den andre leter etter en coach.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Innholdsstruktur med to innganger",
      "Redigering rett på siden",
      "Domenet flyttet, 56 gamle adresser sendt videre",
      "Hosting"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Innebygd redigering"
    ],
    "utfordring": {
      "t": "43 undersider og to helt ulike besøkende",
      "a": [
        "Den gamle siden hadde vokst med karrieren. Hver forestilling, hvert kurs og hver film hadde fått sin egen side, og fra forsiden gikk det lenker til 43 av dem.",
        "En teatersjef som vil se hva hun har spilt, og en skuespiller som sliter med prestasjonsangst, kom inn samme sted og måtte finne fram selv."
      ]
    },
    "losning": {
      "t": "To dører på forsiden",
      "a": [
        "Forsiden er delt i to: <b>Coaching</b> til venstre og <b>Scenekunst</b> til høyre. Du velger side før du har lest en eneste setning, og derfra handler alt om det du kom for.",
        "Scenearbeidet er det som gir coachingen troverdighet, så de to halvdelene ligger under samme navn. Coachingsiden er lys, scenesiden er mørk.",
        "Melanie endrer tekst og bilder selv, rett på siden. De 56 gamle adressene sender videre til riktig ny side, så ingen lenke fra før ender i en feilmelding."
      ]
    },
    "forEtter": {
      "for": { "bilde": "/websider/for/melanie-dahl.webp", "tatt": "mars 2025" },
      "kilde": "Den gamle siden er hentet fra nettarkivet slik den sto 16. mars 2025. Den nye er målt 30. september 2026.",
      "rader": [
        {
          "punkt": "Undersider lenket fra forsiden",
          "for": "43",
          "na": "5",
          "hvorfor": "Den som leter etter en coach, slipper å lete seg forbi tretti teaterforestillinger først."
        },
        {
          "punkt": "Sideadresser med navn som «new-page-5»",
          "for": "5",
          "na": "Ingen",
          "hvorfor": "Adressen står i søketreffet og i hver lenke som deles. Den skal si hva siden handler om."
        },
        {
          "punkt": "Hovedoverskrift på forsiden",
          "for": "Sto som vanlig tekst",
          "na": "«Hva kan jeg hjelpe deg med?»",
          "hvorfor": "Google bruker hovedoverskriften til å forstå hva siden handler om."
        },
        {
          "punkt": "Teksten siden ber Google vise i søketreffet",
          "for": "«Melanie Dahl, skuespiller, skuespillerinne, oslo»",
          "na": "«Skuespiller på scenen, mental trener bak den. Melanie Dahl hjelper scenekunstnere gjennom prestasjonsangst, usikkerhet og frykten for ikke å være god nok.»",
          "hvorfor": "Det er disse linjene folk leser før de velger hvilket treff de klikker på."
        },
        {
          "punkt": "Filer som hentes før forsiden vises",
          "for": "12",
          "na": "6",
          "hvorfor": "Færre filer gir kortere ventetid på mobilnett."
        }
      ]
    }
  },
  {
    "slug": "alpha-negotiations",
    "tittel": "En forhandlingsekspert, forklart på ett kvarter",
    "ingress": "Kurs og foredrag om forhandlinger, holdt av en foreleser ved Handelshøyskolen BI med bakgrunn fra Nordea, HSBC London og Danske Markets. Den gamle siden viste lite av det.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Innholdsstruktur",
      "Presseside og e-bok",
      "Søkeoppsett",
      "Hosting"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Selvhostede fonter"
    ],
    "utfordring": {
      "t": "Tung fagbakgrunn i en ferdig mal",
      "a": [
        "Stein-Erik Mellemseter foreleser ved Handelshøyskolen BI og har skrevet om forhandlinger i E24. Den gamle siden var en ferdig WordPress-mal med arkivbilder av håndtrykk, og hovedoverskriften på forsiden var «Hjem».",
        "Den som vurderer en foredragsholder til ledergruppa, bruker noen minutter på å avgjøre om han er verdt en telefon. På den gamle siden gikk de minuttene med til å lete."
      ]
    },
    "losning": {
      "t": "Bevisene først",
      "a": [
        "Rett under overskriften står <b>tolv logoer</b> fra kunder og samarbeidspartnere, og portrettet er tatt foran BI. Svaret på om han er verdt en telefon kommer før du har rullet.",
        "Anmeldelsene følger rett etter, signert med navn og arbeidsgiver.",
        "Fagstoffet har fått egne sider: 52 forhandlingsråd som hver svarer på ett spørsmål, i tillegg til presseoppslag og e-bok."
      ]
    },
    "forEtter": {
      "for": { "bilde": "/websider/for/alpha-negotiations.webp", "tatt": "april 2026" },
      "kilde": "Den gamle siden er hentet fra nettarkivet slik den sto 12. april 2026. Den nye er målt 30. september 2026.",
      "rader": [
        {
          "punkt": "Filer som hentes før forsiden vises",
          "for": "54",
          "na": "6",
          "hvorfor": "Færre filer gir kortere ventetid på mobilnett."
        },
        {
          "punkt": "Andre selskaper som får beskjed om hvert besøk",
          "for": "To: Google og HubSpot",
          "na": "Ingen",
          "hvorfor": "Hver av dem ser IP-adressen til den som åpner siden."
        },
        {
          "punkt": "Hovedoverskrifter på forsiden",
          "for": "To: «Hjem» og «Alpha Negotiations»",
          "na": "Én: «Skap større verdi i forhandlinger.»",
          "hvorfor": "Google bruker hovedoverskriften til å forstå hva siden handler om. «Hjem» forteller ingenting."
        },
        {
          "punkt": "Teksten siden ber Google vise i søketreffet",
          "for": "«Enda bedre forhandlinger»",
          "na": "«Kurs og foredrag om forhandlinger. Mange års erfaring fra Nordea, HSBC London og Danske Markets. Foreleser ved Handelshøyskolen BI.»",
          "hvorfor": "Det er disse linjene folk leser før de velger hvilket treff de klikker på."
        },
        {
          "punkt": "Bilde når lenken deles",
          "for": "Ingen",
          "na": "Eget bilde",
          "hvorfor": "En lenke uten bilde blir lett oversett på LinkedIn og i en melding."
        }
      ]
    }
  },
  /* Jakobsen Takst & Bygg. Lagt inn 9. oktober 2026. Forsiden som vises
     er hero 2, den klassiske, som tar opp igjen den gamle forsiden. Robert
     har sagt ja til at den gamle siden vises. Hele den frosne kopien ligger
     i kunderepoet under arkiv/gammel-side-2026-09-30. */
  {
    "slug": "jakobsen-takst",
    "tittel": "Takst i Harstad, med prisestimat før du ringer",
    "ingress": "Robert Jakobsen er sertifisert takstmann i Norsk Takst og tømrermester, og har taksert boliger i Harstad-regionen siden 2015. Oppdragene kommer fra boligselgere, meglere, advokater og banker.",
    "gjort": [
      "Ny nettside fra bunnen",
      "Prisestimat med spesifikasjon",
      "Egen side for hver tjeneste",
      "Søkeoppsett for lokale søk",
      "Hosting"
    ],
    "tek": [
      "Håndkodet front-end",
      "Statisk hosting",
      "Selvhostede fonter",
      "Redigering rett på siden"
    ],
    "utfordring": {
      "t": "Prisen lå på en egen side, med «fra» foran",
      "a": [
        "Den gamle siden var bygget på et ferdig WordPress-tema. Prislista lå på en underside, og nesten hver linje endte med «avhengig av størrelse og type, be om tilbud». Reisetid, kilometer og ferje sto i et eget avsnitt over.",
        "Den som skal selge bolig, vil vite omtrent hva taksten koster før de ringer. På den gamle siden måtte de regne det ut selv."
      ]
    },
    "losning": {
      "t": "Kjent forside, prisen regnet ut",
      "a": [
        "Forsiden beholder det kundene kjenner fra før: huset, logomerket og den røde knappen. Det nye ligger under.",
        "Rett etter tjenestene står et <b>prisestimat</b>. Du velger oppdrag, boligtype, areal og antall våtrom, og får en pris med hver linje spesifisert. Reise og energimerking står forklart der de gjelder.",
        "Hver av de fem tjenestene har fått sin egen side, og uttalelsene står med fullt navn, blant dem to fra DNB Eiendom og en advokat."
      ]
    },
    "forEtter": {
      "for": {
        "bilde": "/websider/for/jakobsen-takst.webp",
        "tatt": "september 2026"
      },
      "kilde": "Den gamle siden er frosset 30. september 2026. Den nye er målt 9. oktober 2026.",
      "rader": [
        {
          "punkt": "Hvor du finner prisen",
          "for": "På en egen side, med «fra» og «be om tilbud»",
          "na": "Regnes ut på forsiden, linje for linje",
          "hvorfor": "Den som skal selge bolig, vil vite omtrent hva taksten koster før de tar kontakt."
        },
        {
          "punkt": "Andre selskaper som får beskjed om hvert besøk",
          "for": "To: Google Fonts og BootstrapCDN",
          "na": "Ingen",
          "hvorfor": "Hver av dem ser IP-adressen til den som åpner siden."
        },
        {
          "punkt": "Hovedoverskrifter på forsiden",
          "for": "To: «Din Takstmann i Harstad Regionen» og «Viktighet av tilstandsrapporten»",
          "na": "Én: «Din takstmann i Harstad-regionen»",
          "hvorfor": "Google bruker hovedoverskriften til å forstå hva siden handler om. To overskrifter gir to svar."
        },
        {
          "punkt": "Teksten siden ber Google vise i søketreffet",
          "for": "«Din Takstmann i Harstad Regionen Tjenester En grundig og detaljert beskrivelse av boligens status. En vurdering av markedsverdien på boligen/eiendommen. Vur ...»",
          "na": "«Sertifisert takstmann i Harstad. Tilstandsrapport, verditakst, forhåndstakst og skadetakst for bolig, tomt og fritidsbolig. Ring 928 42 296.»",
          "hvorfor": "Det er disse linjene folk leser før de velger hvilket treff de klikker på."
        }
      ]
    }
  }
];

/* Sju tjenester. De tre siste er AI-tilbudet: chatbot, automatikk og app. */
/* Seks kort, ikke sju. Sju ga en tredje rad med to tomme plasser i et
   tre-kolonners grid, altså en hel rad brukt på ett kort. Chatbot og app
   er slått sammen til ett kort, samme navn som prismodellen de hører til.
   Teksten er kuttet til én til to linjer per kort med vilje: kortet skal
   kunne leses i forbifarten, detaljene ligger på undersidene. */
export const tjenester = [
  {
    "ikon": "<rect x=\"2.5\" y=\"4\" width=\"19\" height=\"16\" rx=\"2\"/><path d=\"M2.5 9h19\"/><path d=\"M6 6.5h.01M8.5 6.5h.01\"/>",
    "navn": "Ny nettside",
    "tekst": "Håndkodet, ikke dratt sammen av moduler. Laster på under ett sekund."
  },
  {
    "ikon": "<path d=\"M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8Z\"/><path d=\"M8.5 7V5.5a3.5 3.5 0 0 1 7 0V7\"/>",
    "navn": "Nettbutikk",
    "tekst": "Betaling, frakt og lager som virker fra dag én. Du legger inn varene, jeg tar resten."
  },
  {
    "ikon": "<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"M15.5 15.5 21 21\"/><path d=\"M10.5 7v7M7 10.5h7\"/>",
    "navn": "Bli funnet i Google",
    "tekst": "Struktur, tekst og fart fra start. Du ser selv hvem som finner deg, også i AI-søk."
  },
  {
    "ikon": "<path d=\"M12 3 4 6v6c0 4.5 3.2 7.9 8 9 4.8-1.1 8-4.5 8-9V6Z\"/><path d=\"m9 12 2.2 2.2L15.5 10\"/>",
    "navn": "Jeg passer på siden",
    "tekst": "Hosting, backup og overvåking. Skal et bilde byttes, tar det som regel én e-post."
  },
  {
    "ikon": "<path d=\"M4 5.5h16v10H12l-4.5 3.5V15.5H4Z\"/><path d=\"M8.5 10h.01M12 10h.01M15.5 10h.01\"/>",
    "navn": "Chatbot eller app",
    "tekst": "Skal siden svare på spørsmålene selv, eller kundene logge inn?"
  },
  {
    "ikon": "<path d=\"M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21\"/><path d=\"m5.6 5.6 2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\"/>",
    "navn": "Mindre dobbeltarbeid",
    "tekst": "Skjemaer som tastes inn to steder, tilbud som skal sendes. Jeg kobler sammen det du har."
  }
];

export const stegene = [
  {
    "tid": "48 timer",
    "navn": "Jeg bygger utkastet ditt",
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

/* Omtalene.  kobler en omtale til casesiden den handler om,
   der det finnes en. To av fire har en i dag: Guro Brakestad og Irmelin
   Drake står uten fordi prosjektene deres ikke ligger som case.

   Grunnen til at koblingen er et felt og ikke et navneoppslag: «Katrin
   Brubakk» er både et personnavn og en slug, mens «Thoralf Stenvold» og
   «progressive-diplomacy» ikke ligner på hverandre i det hele tatt. Et
   oppslag på navn ville truffet den ene og bommet på den andre.

   Poenget med koblingen: omtalen gjør mest nytte på siden som viser
   arbeidet den handler om. På forsiden er den én av fire i en karusell
   der leseren ikke vet hvilket prosjekt sitatet gjelder. På casesiden
   står den rett under arbeidet den beskriver. */
export const omtaler = [
  {
    "sitat": "Jeg fikk en vennlig henvendelse fra Aleksander i Oppskalert, og ble raskt imponert over kunnskapen og kompetansen deres. Det var lett å si ja.",
    "navn": "Guro Brakestad",
    "rolle": "Familieterapeut og foredragsholder"
  },
  {
    "sitat": "Jeg ble veldig fornøyd med resultatet, og de leverte raskt!",
    "navn": "Katrin Brubakk",
    "rolle": "katrinbrubakk.no",
    "caseSlug": "katrin-brubakk"
  },
  {
    "sitat": "Oppskalert forsto raskt hva vi trengte og leverte en nettside som virkelig representerer oss. Profesjonelt, effektivt og en glede å samarbeide med.",
    "navn": "Thoralf Stenvold",
    "rolle": "Progressive Diplomacy",
    "caseSlug": "progressive-diplomacy"
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
    "Engangspris begynner på 6 990 kroner eks. mva, og da eier du alt selv med en gang. Vil du heller betale 0 kroner i dag, kan du leie til eie: 1 290 i måneden uten binding, og siden er din når 12 måneder er betalt. Etterpå kan du ta drift til 690 i måneden, eller la være. Hva det ender på hos akkurat deg kommer an på hvor mange sider og funksjoner du trenger, men du får alltid en fast pris fra meg før jeg begynner. Og du får se utkastet først, så du vet nøyaktig hva du betaler for."
  ],
  [
    "Hvorfor er prisen lavere enn hos andre?",
    "Fordi jeg er \u00e9n person uten kontorleie, selgere eller prosjektledere, og fordi jeg bygger med AI som fjerner ukene som pleide \u00e5 g\u00e5 med til f\u00f8rsteutkast og standardkode. Det er hele forklaringen p\u00e5 at en h\u00e5ndbygd side starter p\u00e5 6 990 kroner og ikke 25 000."
  ],
  [
    "Hva forplikter et gratis utkast meg til?",
    "Ingenting i det hele tatt. Jeg lager et ferdig utkast av siden din, med ditt innhold, og sender deg en privat lenke. Liker du det ikke, sier du fra, så sletter jeg det. Du betaler først når du har sagt ja til noe du faktisk er fornøyd med."
  ],
  [
    "Hvor lang tid tar det?",
    "Utkastet er klart innen 48 timer. Fra du sier ja til at siden står på ditt eget domene, går det stort sett en til to uker. Det som styrer tempoet er som regel hvor fort du rekker å svare meg, ikke hvor fort jeg jobber."
  ],
  [
    "Eier jeg siden selv etterpå?",
    "Ja. Betaler du engangspris, får du alle filene og eier hele greia med en gang. Velger du leie til eie, er tekstene, bildene og domenet dine hele veien, og filene blir dine når 12 måneder er betalt. Ingen av modellene har binding, og uansett modell låser jeg ingenting inne."
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

/* Slår opp omtalen som hører til én casesiden. Returnerer undefined for
   de casene som ikke har en, og da vises ingen sitatblokk. */
export const omtaleForCase = (slug) => omtaler.find((o) => o.caseSlug === slug);
