import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { Shell, SeksjonTopp } from './components/Layout';
import Portfolio from './components/Portfolio';
import Omtaler from './components/Omtaler';
import Metode from './components/Metode';
import Priser from './components/Priser';
import FAQ from './components/FAQ';
import DemoSkjema from './components/DemoSkjema';
import { faqSchema, kontakt, ruter } from './lib/site';
import { useReveal } from './lib/useReveal';

/* Heroen hadde ti ting på én skjerm: navbar-ordmerke, kicker, H1, avsnitt,
   to knapper, en svartidslinje, en trippel og et kjempeordmerke. Fire av dem
   sa det samme.

   Ute nå:
   - Kjempeordmerket. Navbaren bærer allerede navnet, så det var merkevaren
     to ganger på første skjerm, og det største objektet der sa ingenting nytt.
     Med det ute forsvant også GSAP-en herfra: prikkespretten og scroll-fadingen
     var det eneste den drev.
   - Kickeren. Siste versaletikett på forsiden, og «én person, hele jobben»
     er allerede jeg-formen i avsnittet under.
   - «Svar innen 24 timer», som var et fjerde element i knapperaden.
   - Siste setning i avsnittet. Trippelen under sier det samme, bare skannbart. */
const Hero = () => (
  <section className="relative flex flex-col justify-center overflow-hidden md:min-h-[100dvh]">
    <div className="wrap pt-32 pb-16 md:py-36">
      <h1
        className="hero-elem font-display font-extrabold text-primary"
        style={{ fontSize: 'clamp(2.9rem, 8vw, 5.75rem)', lineHeight: 0.98, letterSpacing: '-0.035em', maxWidth: '14ch' }}
      >
        Nettsider som faktisk <span className="text-accent">selger</span>.
      </h1>

      <p className="hero-elem font-body text-base md:text-lg text-primary/85 mt-7 max-w-[46ch] leading-relaxed">
        Jeg bygger den ferdig, viser deg den gratis, og lanserer den på dager, ikke måneder.
      </p>

      <div className="hero-elem mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
        <Link
          to={ruter.kontakt}
          className="inline-flex items-center gap-2 bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform duration-300 hover:scale-[1.03]"
        >
          Bestill gratis demo <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={ruter.arbeid}
          className="inline-flex items-center gap-2 border border-primary/25 hover:border-primary/60 px-7 py-4 rounded-full font-sans font-bold text-sm transition-colors duration-300"
        >
          Se arbeidet
        </Link>
      </div>

      {/* Risikoavlastningen. Dette er argumentene som gjør at folk tør å
          trykke på knappen over, så de skal ha vekt nok til å bli lest.
          Stablet på mobil skilles de tre av samme border-t-per-rad som
          Hvorfor-seksjonens tre punkter lenger ned, samme grep, ikke to.
          Fra sm og opp står de side om side, og da gjør avstanden jobben
          en strek ellers ville gjort, så border-t flytter til kun ul-en. */}
      <ul className="hero-elem mt-12 md:mt-14 grid sm:grid-cols-3 sm:gap-x-10 max-w-[46rem] sm:border-t sm:border-primary/15 sm:pt-7">
        {[
          ['Gratis utkast', 'før du bestemmer deg'],
          ['Du betaler', 'først når du er fornøyd'],
          ['Ingen binding', 'du eier alt selv'],
        ].map(([k, v]) => (
          <li key={k} className="font-body border-t border-primary/15 py-5 sm:border-t-0 sm:py-0">
            <span className="block font-bold text-base md:text-lg text-primary leading-snug">{k}</span>
            <span className="block text-[0.95rem] md:text-base text-primary/80 mt-1">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* Hvorfor det betyr noe. Konkrete tall i stedet for adjektiver.
   «Under ett sekund» slår «lynrask» hver gang. */
const Hvorfor = () => {
  const container = useReveal(100);

  return (
    <section ref={container} className="seksjon">
      <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-start">
        <div data-reveal>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.03em]">
            Nettsiden er det første håndtrykket bedriften din gir.
          </h2>
          <p className="font-body text-[0.95rem] md:text-base text-primary/85 mt-5 leading-relaxed max-w-[48ch]">
            Jeg sørger for at det sitter. Sidene er håndkodet, ikke stemplet ut av en mal, og de er bygget for å gjøre besøkende til kunder, ikke bare for å se pene ut.
          </p>
          {/* Redaksjonell lenke til landingssiden, ikke pynt. Målt i Search
              Console over 28 dager: på «webdesign i oslo» lå forsiden på
              snittposisjon 17,5 med 42 visninger, /webdesign-oslo på 66,3 med
              51 visninger. Forsiden nevner «webdesign» én gang og «Oslo» tre
              ganger, landingssiden fem og tolv, så det er ikke relevans som
              skiller dem: /webdesign-oslo hadde bare footerlenken å leve av.
              Denne lenken flytter det lokale signalet dit det hører hjemme. */}
          <p className="font-body text-[0.95rem] md:text-base text-primary/85 mt-4 leading-relaxed max-w-[48ch]">
            Sitter du i hovedstaden, har jeg skrevet om{' '}
            <Link to={ruter.webdesignOslo} className="text-accent hover:text-highlight transition-colors">
              webdesign i Oslo
            </Link>{' '}
            for seg, med fast pris og hva som følger med.
          </p>
        </div>

        <dl data-reveal className="flex flex-col">
          {[
            ['Under ett sekund', 'typisk lastetid på sidene jeg bygger'],
            ['Null plugins', 'ingenting som kan hackes eller gå ut på dato'],
            ['Mobil først', 'over halvparten av kundene dine kommer derfra'],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-primary/12 py-5 last:border-b">
              <dt className="font-sans font-bold text-lg">{k}</dt>
              <dd className="font-body text-[0.95rem] text-primary/80 mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Oppskalert',
  image: 'https://oppskalert.no/oppskalert%20fav.png',
  description: 'Jeg bygger lynraske nettsider som skalerer norske bedrifter. Gratis demo før du betaler en krone.',
  url: 'https://oppskalert.no',
  telephone: kontakt.tel,
  founder: { '@type': 'Person', name: kontakt.navn },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ostadalsveien 66',
    addressLocality: 'Oslo',
    postalCode: '0753',
    addressCountry: 'NO',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 59.9482, longitude: 10.6483 },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  sameAs: ['https://oppskalert.no'],
};

/* Modulkonstant, ikke et array-literal i JSX. Ellers ser SEO-effekten
   en ny referanse ved hver render og kjører om igjen hver gang. */
const homeJsonLd = [homeSchema, faqSchema];

const Home = () => (
  <Shell>
    {/* Tittel og beskrivelse er skrevet for søk, ikke for merkevare.
        «Nettsider som faktisk selger» er god copy og null søkevolum, så den
        lever videre som H1 i heroen i stedet. Se SEO.md punkt 4.

        Ordet «webdesign» kom inn 19. august 2026 etter måling i Search
        Console: forsiden rangerte allerede 12,0 på «webdesign bedrift»,
        12,7 på «webdesign firma» og 12,9 på «webdesigner oslo», med en
        title som ikke inneholdt ordet én eneste gang. Særskriving er ikke
        et alternativ, så preposisjonen bærer det: «webdesign for
        bedrifter». Se SEO.md punkt 12. */}
    <SEO
      title="Webdesign for bedrifter til fast pris"
      description="Webdesign for norske bedrifter til fast pris. Jeg bygger hjemmesiden ferdig, og du ser en gratis demo før du betaler en krone. Ingen binding."
      keywords={['webdesign for bedrifter', 'webdesign firma', 'hjemmeside til bedrift', 'nettside til fast pris']}
      canonical="https://oppskalert.no/"
      jsonLd={homeJsonLd}
    />
    {/* Flatene veksler bevisst, så ingen to naboseksjoner deler bakgrunn.
        Fire seksjoner på rad med samme flate rant sammen til én lang side
        uten grenser. Rekkefølgen er aubergine, bånd, aubergine, bånd,
        krem, dyp, aubergine, krem. Se .band i index.css for hvorfor
        båndet trenger hårstrek og ikke bare en dypere bakgrunn. */}
    <Hero />
    <Portfolio limit={6} visAlleLenke mobilScroll flate="band" />
    <Hvorfor />
    <Omtaler flate="band" />
    <Metode />
    <Priser visAlltidMed={false} />
    <FAQ flate="band" />
    <DemoSkjema
      tittel="Klar for en nettside"
      uthevet="som selger?"
      lede="Legg igjen navn og e-post, så bygger jeg en gratis demo av din nye side. Uforpliktende, og jeg svarer innen 24 timer."
    />
  </Shell>
);

function App() {
  return <Home />;
}

export default App;
