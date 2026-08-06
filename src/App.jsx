import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef(null);
  const dotRef = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    // matchMedia owns its own cleanup (mm.revert), which both restores the
    // from-state to a visible default and is StrictMode-safe (double-mount).
    // Entrance is a CSS animation (.hero-elem) so it can never strand content
    // at opacity:0; GSAP here only drives the dot bounce and wordmark fade.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(dotRef.current, {
        y: -18, duration: 0.4, ease: 'power2.out',
        yoyo: true, repeat: -1, repeatDelay: 2, delay: 1.8,
      });
      gsap.to(wordmarkRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: 'top top', end: '45% top', scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  // h-, ikke min-h-: seksjonen ER nøyaktig én skjerm på desktop, så ordmerket
  // lander flush mot bunnkanten i stedet for å bli klippet midt i bokstavene.
  // Under md får den naturlig høyde.
  return (
    <section ref={container} className="relative flex flex-col justify-between overflow-hidden md:h-[100dvh]">
      <div className="wrap pt-32 md:pt-36">
        {/* Den ENE kickeren på siden. Én navngitt kicker er stemme;
            en over hver seksjon er AI-grammatikk. */}
        <p className="hero-elem font-body font-medium text-xs md:text-sm uppercase tracking-[0.22em] text-primary/80 mb-6">
          Norsk webutvikling · én person, hele jobben
        </p>

        <h1
          className="hero-elem font-display font-extrabold text-primary"
          style={{ fontSize: 'clamp(2.9rem, 8vw, 5.75rem)', lineHeight: 0.98, letterSpacing: '-0.035em', maxWidth: '14ch' }}
        >
          Nettsider som faktisk <span className="text-accent">selger</span>.
        </h1>

        <p className="hero-elem font-body text-base md:text-lg text-primary/85 mt-7 max-w-[46ch] leading-relaxed">
          Jeg bygger den ferdig, viser deg den gratis, og lanserer den på dager, ikke måneder. Liker du den ikke, koster den ingenting.
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
          <span className="font-body text-[0.95rem] text-primary/80">Svar innen 24 timer</span>
        </div>

        {/* Risikoavlastningen. Dette er argumentene som gjør at folk tør å
            trykke på knappen over, så de skal ha vekt nok til å bli lest. */}
        <ul className="hero-elem mt-10 md:mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-3 max-w-[46rem] border-t border-primary/15 pt-7">
          {[
            ['Gratis utkast', 'før du bestemmer deg'],
            ['Du betaler', 'først når du er fornøyd'],
            ['Ingen binding', 'du eier alt selv'],
          ].map(([k, v]) => (
            <li key={k} className="font-body">
              <span className="block font-bold text-base md:text-lg text-primary leading-snug">{k}</span>
              <span className="block text-[0.95rem] md:text-base text-primary/80 mt-1">{v}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={wordmarkRef}
        className="wrap relative overflow-hidden leading-none select-none flex justify-end mt-16 md:mt-0 pb-6 md:pb-8"
        aria-hidden="true"
      >
        <span
          className="font-display font-extrabold text-primary"
          style={{ fontSize: 'clamp(3.25rem, 10vw, 8rem)', lineHeight: 1, letterSpacing: '-0.045em', paddingBottom: '0.08em' }}
        >
          oppskalert<span ref={dotRef} className="text-accent inline-block">.</span>
        </span>
      </div>
    </section>
  );
};

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
        lever videre som H1 i heroen i stedet. Se SEO.md punkt 4. */}
    <SEO
      title="Profesjonell nettside til fast pris"
      description="Nettsideleverandør for norske bedrifter. Jeg bygger en profesjonell nettside til fast pris, og du ser en ferdig demo gratis før du betaler en krone. Ingen binding."
      keywords={['nettsideleverandør', 'profesjonell nettside', 'nettside til bedrift', 'nettside pris']}
      canonical="https://oppskalert.no/"
      jsonLd={homeJsonLd}
    />
    {/* Flatene veksler bevisst, så ingen to naboseksjoner deler bakgrunn.
        På den gamle mørke paletten skilte de tinta kortene seksjonene fra
        hverandre av seg selv. På krem forsvant den grensen, og fire
        seksjoner på rad rant sammen til én lang flate. Rekkefølgen er
        krem, ivory, krem, ivory, aubergine, dyp krem, ivory, aubergine. */}
    <Hero />
    <Portfolio limit={6} visAlleLenke mobilScroll flate="bg-surface" />
    <Hvorfor />
    <Omtaler flate="bg-surface" />
    <Metode />
    <Priser visAlltidMed={false} />
    <FAQ flate="bg-surface" />
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
