import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import { Avsnitt, Brodtekst, Punktliste } from '../components/Landingsside';
import Omtaler from '../components/Omtaler';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Målsøkeord: «ny nettside» (320/mnd, KD 16) og «nye nettsider» (50/mnd).
   Målt i Search Console 27. august 2026 over 28 dager: null visninger på
   begge. Ingen side på nettstedet var skrevet for søket. Det nærmeste var
   «lage nye nettsider», 9 visninger på posisjon 50,8, som traff
   /blogg/hvordan-lage-nettside, altså en gjør-det-selv-guide og ikke et
   tilbud. Konkurrenten raskweb.no ligger på 2. plass på det samme søket med
   forsiden sin, så terskelen er ikke teknisk, den er at det må finnes en
   side som svarer på søket.

   Avgrensning mot naboinnhold, samme mønster som de andre landingssidene:
   /nettside-til-bedrift svarer på OM bedriften trenger en side og hva den må
   inneholde. /nettside-design eier det visuelle. /priser eier pris, og det
   skal ikke stå en prisliste her. /webdesign-oslo eier det lokale.
   /blogg/bytte-nettside er informasjonssøket, «fem tegn på at det er på
   tide», og lenker opp hit. Denne siden eier det kommersielle: du skal ha en
   ny side, hva skjer nå.

   Vinkelen er flyttingen. Det er det eneste i denne klyngen ingen av
   konkurrentene skriver om, og det er den reelle innvendingen: folk utsetter
   en ny side fordi de er redde for å miste det de har i Google. */

const CANONICAL = 'https://oppskalert.no/ny-nettside';

const nyNettsideSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ny nettside',
    serviceType: 'Ny nettside for små og mellomstore bedrifter',
    description:
      'Ny nettside til fast pris, med flytting fra den gamle uten nedetid og uten å miste plasseringene i Google. Ferdig demo før du bestemmer deg.',
    areaServed: { '@type': 'Country', name: 'Norge' },
    provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
    url: CANONICAL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
      { '@type': 'ListItem', position: 2, name: 'Ny nettside', item: CANONICAL },
    ],
  },
  lagFaqSchema(landingsSporsmal.nyNettside),
];

const punkter = [
  'Alle gamle adresser sendes videre, så ingen lenke utenfra ender i en feilside',
  'Domenet beholdes og står i ditt navn, uansett hvem som eide det før',
  'Innholdet som allerede rangerer blir med over, ikke skrevet om for moro skyld',
  'E-post på domenet flyttes først, så den aldri er nede',
  'Den gamle siden står live til den nye er testet og godkjent av deg',
  'Ny side lastes på under ett sekund, håndkodet uten maler og plugins',
  'Du ser en ferdig demo med ditt eget innhold før du betaler noe',
];

const NyNettsidePage = () => (
  <Shell>
    <SEO
      title="Ny nettside til fast pris, uten nedetid"
      description="Ny nettside for små bedrifter. Jeg flytter deg fra den gamle uten nedetid og uten å miste plasseringene i Google, og du ser en ferdig demo før du betaler."
      keywords={['ny nettside', 'nye nettsider', 'ny hjemmeside', 'bytte nettside']}
      canonical={CANONICAL}
      jsonLd={nyNettsideSchema}
    />
    <SideTopp
      tittel="Ny nettside,"
      uthevet="uten at du mister det du har."
      lede="De fleste utsetter en ny side fordi de er redde for hva som skjer med Google, e-posten og domenet. Det er den delen jeg tar meg av, og den er ferdig før du merker noe."
    />
    <Brodtekst>
      <Avsnitt tittel="Når en side har" uthevet="gjort seg ferdig.">
        <p>
          En nettside slutter sjelden å virke. Den slutter å prestere, og det
          skjer så langsomt at ingen legger merke til dagen det snudde. Den
          laster tregere enn den gjorde, den ser ut som årstallet den ble laget,
          og du må sende en e-post til noen for å rette en skrivefeil.
        </p>
        <p>
          Kjenner du deg igjen i mer enn ett av de punktene, har jeg skrevet ned{' '}
          <Link to={`${ruter.blogg}/bytte-nettside`} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            fem tegn på at det er på tide å bytte
          </Link>
          , med hva du bør sjekke først. Er du allerede forbi den vurderingen,
          er det resten av denne siden som er relevant.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Flyttingen er der" uthevet="det pleier å gå galt.">
        <p>
          Den vanligste skaden jeg rydder opp i er ikke et stygt design. Det er
          en bedrift som fikk en ny side og mistet halve trafikken sin i samme
          slengen, fordi ingen tok vare på adressene de gamle sidene hadde.
        </p>
        <p>
          Hver adresse på den gamle siden har en verdi i Google som er bygget
          opp over år. Byttes adressen uten at den gamle sendes videre til den
          nye, forsvinner den verdien, og med den plasseringen i søk. Det samme
          gjelder lenker fra andre nettsteder, fra en katalog eller en avis:
          de peker på den gamle adressen, og hvis den er borte, peker de på
          ingenting.
        </p>
        <p>
          Derfor kartlegger jeg hver eneste adresse på den gamle siden før noe
          annet skjer, og setter opp en permanent videresending fra hver av dem
          til den nye. Den gamle siden står live helt til du har sett den nye og
          sagt ja. E-posten på domenet flyttes først, slik at den aldri er nede,
          heller ikke i timene selve byttet skjer.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Dager," uthevet="ikke måneder.">
        <p>
          Et byrå bruker gjerne seks til ti uker på en ny nettside. Det er ikke
          fordi arbeidet tar så lang tid, men fordi prosessen er full av ledd:
          briefmøter, interne godkjenningsrunder og en prosjektleder som
          videreformidler mellom deg og den som faktisk bygger.
        </p>
        <p>
          Her finnes ikke de leddene. Du snakker med meg fra første samtale til
          siden er live, og jeg bygger den første versjonen før du har levert
          noe som helst. Du trenger å oppgi navnet på bedriften. Resten finner
          jeg selv. Se{' '}
          <Link to={ruter.metode} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            hvordan jeg jobber
          </Link>{' '}
          for stegene, eller{' '}
          <Link to={ruter.arbeid} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            sidene jeg har levert
          </Link>{' '}
          hvis du heller vil se resultatet enn å lese om prosessen.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Hva den" uthevet="kommer til å koste.">
        <p>
          Fast pris, oppgitt før jeg skriver en linje kode. Du velger selv om du
          vil betale én gang og eie alt, eller ha hosting, sikkerhet og
          vedlikehold inkludert i en månedspris.
        </p>
        <p>
          Begge modellene med tall står på{' '}
          <Link to={ruter.priser} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            prissiden
          </Link>
          . Vil du regne på ditt eget omfang først, tar{' '}
          <Link to={ruter.kalkulator} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            kalkulatoren
          </Link>{' '}
          under ett minutt og krever ingen e-postadresse.
        </p>
      </Avsnitt>
    </Brodtekst>

    <Punktliste
      tittel="Hva som følger med"
      uthevet="når du bytter."
      lede="Dette er ikke tillegg som prises separat. Det er det som må til for at en ny side ikke koster deg det den gamle hadde bygget opp."
      punkter={punkter}
    />

    <Omtaler />

    <FAQ
      tittel="Det folk lurer på"
      uthevet="før de bytter side."
      sporsmal={landingsSporsmal.nyNettside}
    />

    <DemoSkjema
      tittel="Vil du se hvordan"
      uthevet="den nye kan bli?"
      lede="Fortell meg kort om bedriften, så bygger jeg et utkast med ditt innhold. Uforpliktende, og du hører fra meg innen 24 timer."
    />
  </Shell>
);

export default NyNettsidePage;
