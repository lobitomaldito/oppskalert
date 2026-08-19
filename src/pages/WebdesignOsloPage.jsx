import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import { Avsnitt } from '../components/Landingsside';
import Portfolio from '../components/Portfolio';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { kontakt, lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Bygget på faktiske Search Console-data, ikke på søkeordslisten. Forsiden
   fikk i uke 31 visninger på «webdesign i oslo», «webdesigner oslo»,
   «webdesign firma» og «webdesign bedrift» uten at noen side var laget for
   dem. Google prøvde å rangere forsiden på lokale søk fordi det ikke fantes
   noe bedre. Denne siden er det bedre.

   Avgrensning mot naboinnhold: /blogg/webutvikler-oslo eier «webutvikler
   oslo» (informasjonssøk, priser og leverandørtyper). Denne eier «webdesign
   oslo» og bedriftsvariantene, altså kommersielt søk. Ikke skriv prisguide
   her, lenk til /priser i stedet. */

const CANONICAL = 'https://oppskalert.no/webdesign-oslo';

const webdesignOsloSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Oppskalert, webdesign i Oslo',
    description:
      'Webdesign i Oslo for små og mellomstore bedrifter. Håndkodede nettsider med fast pris, gratis demo før du bestemmer deg, og én kontaktperson hele veien.',
    url: CANONICAL,
    telephone: kontakt.tel,
    email: kontakt.epost,
    founder: { '@type': 'Person', name: kontakt.navn },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ostadalsveien 66',
      addressLocality: 'Oslo',
      postalCode: '0753',
      addressCountry: 'NO',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 59.9482, longitude: 10.6483 },
    areaServed: [
      { '@type': 'City', name: 'Oslo' },
      { '@type': 'AdministrativeArea', name: 'Viken' },
    ],
    priceRange: 'fra 7 990 kr',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
      { '@type': 'ListItem', position: 2, name: 'Webdesign i Oslo', item: CANONICAL },
    ],
  },
  lagFaqSchema(landingsSporsmal.oslo),
];

const Innhold = () => {
  const container = useReveal(70);
  return (
    <section ref={container} className="seksjon pt-0">
      <div className="wrap flex flex-col gap-14 md:gap-20">
        <Avsnitt tittel="Design som" uthevet="skaffer kunder.">
          <p>
            Et pent design som ingen handler av er en dyr plakat. Jeg tegner ikke
            nettsider for å vinne priser, jeg tegner dem for at en besøkende skal
            skjønne hva du gjør innen to sekunder og vite hva neste steg er.
          </p>
          <p>
            I praksis betyr det færre valg per skjerm, tydelig hierarki, og at
            kontaktpunktet aldri er mer enn ett klikk unna. Alt er håndkodet, uten
            tunge maler og plugins, så siden laster på under ett sekund. Over
            halvparten av de som besøker en norsk bedriftsside kommer fra mobil,
            og de venter ikke.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Hvorfor Oslo" uthevet="faktisk spiller inn.">
          <p>
            Søker noen «webdesign i Oslo» leter de sjelden etter det beste byrået i
            verden. De leter etter noen de kan møte, ringe og holde ansvarlig.
          </p>
          <p>
            Jeg holder til på Røa og tar gjerne en kaffe før vi begynner. Du
            snakker med meg gjennom hele prosjektet, fra første skisse til
            lansering. Ingen prosjektkoordinator som videreformidler til en
            utvikler du aldri møter.
          </p>
          <p>
            Lokalt betyr også noe teknisk. En bedrift som skal finnes av folk i
            Oslo trenger Google Bedriftsprofil koblet riktig, konsistent
            adresseinformasjon på tvers av oppføringer, og struktur på siden som
            gjør det tydelig for søkemotorene hvor du holder til. Det bygger jeg
            inn fra starten, ikke som et tillegg etterpå.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Du ser resultatet" uthevet="før du betaler.">
          <p>
            De fleste byråer ber om en signatur før de viser deg noe. Jeg gjør det
            motsatte: du får en ferdig demo av din egen side, med ditt innhold, helt
            uforpliktende. Liker du den ikke, koster den ingenting.
          </p>
          <p>
            Det er mulig fordi jeg jobber alene med moderne verktøy, uten
            møterekker og interne godkjenningsrunder. Leveringstiden måles i dager,
            ikke måneder.
          </p>
          <p>
            Prisen er fast og oppgitt på forhånd. Se{' '}
            <Link to={ruter.priser} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
              hva en nettside koster
            </Link>{' '}
            eller regn det ut selv i{' '}
            <Link to={ruter.kalkulator} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
              kalkulatoren
            </Link>
            .
          </p>
        </Avsnitt>
      </div>
    </section>
  );
};

const punkter = [
  'Design og utvikling av hele siden, håndkodet fra bunnen',
  'Mobil først, med lastetid under ett sekund',
  'Tekst skrevet for det kundene dine faktisk søker på',
  'Google Bedriftsprofil og lokale oppføringer satt opp riktig',
  'Strukturerte data, så du er lesbar for Google og AI-assistenter',
  'Du eier koden, innholdet og domenet, fra dag én',
];

const Inkludert = () => {
  const container = useReveal(60);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Hva du"
          uthevet="får levert."
          lede="Samme leveranse uansett om du sitter på Grünerløkka eller i Bærum."
        />
        <ul data-reveal className="grid gap-3.5 md:grid-cols-2 max-w-[62rem]">
          {punkter.map((p) => (
            <li key={p} className="flex items-start gap-3 font-body text-[0.95rem] text-primary/85 leading-relaxed">
              <Check className="w-4 h-4 text-ink mt-1 flex-shrink-0" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p data-reveal className="font-body text-[0.95rem] text-primary/80 mt-8 max-w-[56ch] leading-relaxed">
          Trenger du hjelp til å bli synlig i søk på toppen av selve siden, se{' '}
          <Link to={ruter.seo} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
            søkemotoroptimalisering
          </Link>
          . Vil du at jeg tar det tekniske løpende, se{' '}
          <Link to={ruter.drift} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
            drift og support
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

const WebdesignOsloPage = () => (
  <Shell>
    <SEO
      title="Webdesign i Oslo til fast pris"
      description="Webdesign i Oslo for små bedrifter. Håndkodede nettsider som laster på under ett sekund, fast pris fra 7 990 kr, og en ferdig demo gratis før du bestemmer deg."
      keywords={['webdesign oslo', 'webdesigner oslo', 'webdesign firma', 'webdesign bedrift']}
      canonical={CANONICAL}
      jsonLd={webdesignOsloSchema}
    />
    <SideTopp
      tittel="Webdesign i Oslo,"
      uthevet="til fast pris."
      lede="Håndkodede nettsider for små bedrifter i Oslo-området. Du snakker med meg hele veien, og du ser en ferdig demo før du bestemmer deg for noe som helst."
    />
    <Innhold />
    <Portfolio tittel="Sider jeg" uthevet="har levert." limit={6} visAlleLenke />
    <Inkludert />
    <FAQ
      tittel="Det folk lurer på"
      uthevet="før de tar kontakt."
      sporsmal={landingsSporsmal.oslo}
    />
    <DemoSkjema
      tittel="Vil du se hvordan"
      uthevet="din kan bli?"
      lede="Fortell meg kort om bedriften, så bygger jeg et utkast med ditt innhold. Uforpliktende, og du hører fra meg innen 24 timer."
    />
  </Shell>
);

export default WebdesignOsloPage;
