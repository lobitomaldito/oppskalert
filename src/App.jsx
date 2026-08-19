import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { Shell, SeksjonTopp } from './components/Layout';
import Portfolio from './components/Portfolio';
import Omtaler from './components/Omtaler';
import Metode from './components/Metode';
import Priser from './components/Priser';
import FAQ from './components/FAQ';
import DemoSkjema from './components/DemoSkjema';
import { faqSchema, kontakt, ruter, stegene } from './lib/site';
import { useReveal } from './lib/useReveal';

/* Studio-mal-redesignet (19. august 2026, inspirert av mammutstudios.com,
   se inspirasjon/demo-studio-mal.md). Heroen står nå på det lyse feltet
   (--room) i stedet for blekk, sentrert i stedet for venstrestilt, og uten
   full skjermhøyde: innholdet setter høyden, ikke viewporten.

   Eget ordmerke er tilbake, men som et vannmerke i --room-deep bak
   overskriften, ikke som gjentatt merkevare i knapperaden. Det er beskåret
   av seksjonskanten (overflow-hidden), så det leser som tekstur, ikke som
   et andre ordmerke ved siden av navbarens.

   Statuslinjen under bruker ekte tall fra stegene i lib/site.js, ikke en
   påstått ledig kapasitet som ikke finnes noe sted ellers på siden. Ingen
   pille over H1-en: den ville bare vært tomt stillas, og statuslinjen
   allerede bærer den ene konkrete opplysningen heroen har å gi. */
const Hero = () => (
  <section className="relative overflow-hidden bg-room text-room-ink rom">
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-x-0 top-[8%] md:top-[12%] flex justify-center"
    >
      <span
        className="font-display font-extrabold text-room-deep whitespace-nowrap"
        style={{ fontSize: 'clamp(6rem, 26vw, 16rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
      >
        oppskalert.
      </span>
    </div>

    <div className="wrap relative pt-36 pb-16 md:pt-44 md:pb-20 flex flex-col items-center text-center">
      <h1
        className="hero-elem font-display font-extrabold"
        style={{ fontSize: 'clamp(2.9rem, 8vw, 5.75rem)', lineHeight: 0.98, letterSpacing: '-0.035em', maxWidth: '16ch' }}
      >
        Nettsider som faktisk <span className="text-room-signal">selger</span>.
      </h1>

      <p className="hero-elem font-body text-base md:text-lg text-room-ink/80 mt-7 max-w-[46ch] leading-relaxed">
        Jeg bygger den ferdig, viser deg den gratis, og lanserer den på dager, ikke måneder.
      </p>

      <div className="hero-elem mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
        <Link
          to={ruter.kontakt}
          className="inline-flex items-center gap-2 bg-room-signal text-room px-8 py-4 rounded-full font-sans font-bold transition-transform duration-300 hover:scale-[1.03]"
        >
          Bestill gratis demo <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={ruter.arbeid}
          className="inline-flex items-center gap-2 border border-room-ink/25 hover:border-room-ink/60 px-7 py-4 rounded-full font-sans font-bold text-sm transition-colors duration-300"
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
      <ul className="hero-elem mt-12 md:mt-14 grid sm:grid-cols-3 sm:gap-x-10 max-w-[46rem] sm:border-t sm:border-room-ink/20 sm:pt-7">
        {[
          ['Gratis utkast', 'før du bestemmer deg'],
          ['Du betaler', 'først når du er fornøyd'],
          ['Ingen binding', 'du eier alt selv'],
        ].map(([k, v]) => (
          <li key={k} className="font-body border-t border-room-ink/20 py-5 sm:border-t-0 sm:py-0 text-center sm:text-left">
            <span className="block font-bold text-base md:text-lg text-room-ink leading-snug">{k}</span>
            <span className="block text-[0.95rem] md:text-base text-room-ink/70 mt-1">{v}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Statuslinjen. Tynne piller helt ute ved kantene av wrap-en, én
        konkret opplysning til venstre (hentet fra stegene i lib/site.js,
        samme tall som Metode-seksjonen viser, ikke funnet på), og et rent
        dekorativt bla-ned-hint til høyre. */}
    <div className="hero-elem wrap relative pb-10 md:pb-14 flex items-center justify-between gap-4">
      <span className="inline-flex items-center rounded-full border border-room-ink/20 bg-surface px-4 py-2 font-body text-xs md:text-sm text-room-ink/80">
        Demo klar på {stegene[0].tid.toLowerCase()}
      </span>
      <span className="inline-flex items-center gap-2 rounded-full border border-room-ink/20 bg-surface px-4 py-2 font-body text-xs md:text-sm text-room-ink/80">
        Bla ned <ArrowDown className="w-3.5 h-3.5" />
      </span>
    </div>
  </section>
);

/* Hvorfor det betyr noe. Konkrete tall i stedet for adjektiver.
   «Under ett sekund» slår «lynrask» hver gang.

   Står på --room (lyst felt), ikke blekk: Portfolio rett over og Omtaler
   rett under er begge mørke (flate="band"), så en mørk Hvorfor mellom dem
   ville gitt tre naboseksjoner på rad med samme flate. text-primary og
   border-primary er derfor byttet til text-room-ink og border-room-ink
   gjennomgående, de peker på ulike farger avhengig av bakgrunn. */
const Hvorfor = () => {
  const container = useReveal(100);

  return (
    <section ref={container} className="seksjon bg-room text-room-ink rom">
      <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-start">
        <div data-reveal>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.03em]">
            Nettsiden er det første håndtrykket bedriften din gir.
          </h2>
          <p className="font-body text-[0.95rem] md:text-base text-room-ink/85 mt-5 leading-relaxed max-w-[48ch]">
            Jeg sørger for at det sitter. Sidene er håndkodet, ikke stemplet ut av en mal, og de er bygget for å gjøre besøkende til kunder, ikke bare for å se pene ut.
          </p>
        </div>

        <dl data-reveal className="flex flex-col">
          {[
            ['Under ett sekund', 'typisk lastetid på sidene jeg bygger'],
            ['Null plugins', 'ingenting som kan hackes eller gå ut på dato'],
            ['Mobil først', 'over halvparten av kundene dine kommer derfra'],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-room-ink/20 py-5 last:border-b">
              <dt className="font-sans font-bold text-lg">{k}</dt>
              <dd className="font-body text-[0.95rem] text-room-ink/80 mt-1">{v}</dd>
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
        Rekkefølgen er felt, blekk, felt, blekk, felt, dyp, blekk, felt
        (felt er --room, blekk er --bg, dyp er --bg-deep). Portfolio.jsx
        tolker flate="band" som "sett meg på --room", motsatt av Omtaler.jsx
        og FAQ.jsx som bruker flate som en rå CSS-klasse mot den gamle
        .band-hjelperen (blekk med lett tint). To ulike betydninger av
        samme propnavn, ikke ideelt, men flate er en per-komponent detalj
        her, så Portfolio kalles bevisst UTEN flate for å holde den blekk
        og alterneringen intakt. Se .band i index.css for hvorfor
        blekk-seksjonene trenger hårstrek og ikke bare en dypere bakgrunn. */}
    <Hero />
    <Portfolio limit={6} visAlleLenke mobilScroll />
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
