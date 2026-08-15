import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import { Avsnitt, Brodtekst, Punktliste } from '../components/Landingsside';
import Omtaler from '../components/Omtaler';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Målsøkeord: «nettside for bedrift» (140/mnd) og «hjemmeside bedrift»
   (90/mnd). Høyere KD enn de andre landingssidene, så denne vinner ikke på
   uker. Den lever på å svare grundigere enn de som rangerer i dag.

   Avgrensning: skrevet for den som lurer på OM bedriften trenger en side og
   hva den bør inneholde. /nettside-design eier det visuelle, /priser eier
   pris, /webdesign-oslo eier det lokale. */

const CANONICAL = 'https://oppskalert.no/nettside-til-bedrift';

const bedriftSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Nettside til bedrift',
    serviceType: 'Nettside for små og mellomstore bedrifter',
    description:
      'Nettside til bedrift med fast pris og gratis demo først. Bygget for at kunder skal finne deg, forstå hva du selger og ta kontakt.',
    areaServed: { '@type': 'Country', name: 'Norge' },
    provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
    url: CANONICAL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
      { '@type': 'ListItem', position: 2, name: 'Nettside til bedrift', item: CANONICAL },
    ],
  },
  lagFaqSchema(landingsSporsmal.bedrift),
];

const punkter = [
  'Tydelig svar på hva du selger, over folden, uten scrolling',
  'Kontaktinformasjon som er synlig fra hver eneste side',
  'Referanser eller kundeomtaler, det som bygger tillit raskest',
  'Riktig firmainformasjon: orgnr, adresse, ansvarlig',
  'Personvernerklæring og samtykke som holder mot GDPR',
  'Universell utforming, som er lovpålagt for virksomheter mot allmennheten',
  'Google Bedriftsprofil koblet til, så du finnes i lokale søk',
  'Sider som lastes ferdig for søkemotorer og AI-assistenter',
];

const NettsideBedriftPage = () => (
  <Shell>
    <SEO
      title="Nettside til bedrift, fast pris og gratis demo"
      description="Trenger bedriften din en ny nettside? Slik ser en side ut som faktisk skaffer kunder, hva den må inneholde for å være lovlig, og hva den koster. Demo før du bestemmer deg."
      keywords={['nettside for bedrift', 'hjemmeside bedrift', 'nettside til bedrift', 'bedriftsnettside']}
      canonical={CANONICAL}
      jsonLd={bedriftSchema}
    />
    <SideTopp
      tittel="Nettside til bedriften,"
      uthevet="uten prosjektet."
      lede="De fleste småbedrifter trenger ikke en stor prosess. De trenger en side som svarer på hva du gjør, viser at du er til å stole på, og gjør det enkelt å ta kontakt."
    />
    <Brodtekst>
      <Avsnitt tittel="Hva siden faktisk" uthevet="skal utrette.">
        <p>
          Spørsmålet er sjelden om bedriften trenger en nettside. Det er hva den
          skal gjøre. Skal den skaffe henvendelser, eller er den mest et sted å
          sende folk som allerede har hørt om deg?
        </p>
        <p>
          Svaret endrer alt. Skal den skaffe henvendelser, må den bygges rundt de
          søkene kundene dine faktisk gjør, og lede mot ett tydelig neste steg.
          Skal den bekrefte at du er seriøs, holder det med noe raskt, ryddig og
          oppdatert. Begge deler er legitimt. Å betale for det første og få det
          andre er det som irriterer folk.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Det som er lovpålagt," uthevet="og ofte glemt.">
        <p>
          To ting rammer også enkeltpersonforetak, og de blir oversett i de fleste
          malbaserte sider.
        </p>
        <p>
          <strong className="text-primary font-semibold">Universell utforming.</strong>{' '}
          Nettsteder som retter seg mot allmennheten skal følge WCAG 2.1 nivå AA.
          I praksis: nok kontrast mellom tekst og bakgrunn, beskrivende alt-tekst
          på bilder, og at hele siden kan brukes med tastatur alene. Rundt én av
          fem har behov for slike tilpasninger, så det er også fem prosent færre
          tapte kunder.
        </p>
        <p>
          <strong className="text-primary font-semibold">Personvern.</strong> Har
          du et kontaktskjema eller analyseverktøy, behandler du personopplysninger.
          Da trengs en personvernerklæring og et samtykke der det er like enkelt å
          si nei som ja. Forhåndsavkryssede bokser er ikke lov.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Du eier den," uthevet="uansett hva som skjer.">
        <p>
          Den vanligste fellen jeg rydder opp i er bedrifter som ikke eier sin egen
          side. Domenet står i leverandørens navn, koden ligger på deres plattform,
          og den dagen du vil bytte, starter du på nytt.
        </p>
        <p>
          Hos meg står domenet i ditt navn fra dag én, og du får koden. Velger du
          en driftsavtale, er det fordi du vil slippe det tekniske, ikke fordi du
          er låst. Se{' '}
          <Link to={ruter.drift} className="text-accent hover:text-highlight transition-colors">
            drift og support
          </Link>{' '}
          for hva den dekker, eller{' '}
          <Link to={ruter.priser} className="text-accent hover:text-highlight transition-colors">
            prisene
          </Link>{' '}
          for begge modellene.
        </p>
      </Avsnitt>
    </Brodtekst>

    <Punktliste
      tittel="Sjekkliste for"
      uthevet="en bedriftsside."
      lede="Gå gjennom din nåværende side med denne. Mangler mer enn tre punkter, er det verdt en prat."
      punkter={punkter}
    />

    <Omtaler />

    <FAQ
      tittel="Det folk lurer på"
      uthevet="om bedriftsnettsider."
      sporsmal={landingsSporsmal.bedrift}
    />

    <DemoSkjema
      tittel="Skal jeg se på"
      uthevet="siden dere har i dag?"
      lede="Fortell meg kort om bedriften, så henter jeg siden slik en robot gjør og sier hva jeg finner. Uforpliktende."
    />
  </Shell>
);

export default NettsideBedriftPage;
