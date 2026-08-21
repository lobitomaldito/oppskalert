import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { Shell } from './components/Layout';
import Arbeider from './components/Arbeider';
import Sitatkort from './components/Sitatkort';
import Priser from './components/Priser';
import DemoSkjema from './components/DemoSkjema';
import { faqSchema, heroBevis, kontakt, ruter, vurdering } from './lib/site';
import { omtaler, sporsmal, tjenester } from './lib/demo-innhold';
import { useReveal } from './lib/useReveal';

/* Studio-mal-forsiden, portert ord for ord fra demoen (mal3.src.html,
   linje 693 til 797, se inspirasjon/demo-studio-mal.md). Alt CSS ligger
   allerede i index.css, denne fila bygger bare den samme markupen i
   React: .hero blir en H1-seksjon på det lyse feltet med vannmerket bak,
   .statuslinje blir en enkel "se mer"-pille, og resten følger demoens
   åtte seksjoner i nøyaktig samme rekkefølge. Prisen i casedelen er
   hevet fra demoens 7 990 til 9 999, det er det eneste tilsiktede
   tekstavviket.

   Portingen gjorde forsiden tynnere enn prod: fire hele seksjoner falt
   ut fordi demoen aldri hadde dem. De er lagt tilbake her, restylet til
   det nye systemet, i den rekkefølgen som leser best sammen med demoens
   egne seksjoner:
   - Hvorfor, bygget lokalt i denne fila fra den gamle forsiden
     (git show origin/master:src/App.jsx), ordrett tekst, ny stil.
   - Metode, Priser og DemoSkjema, som komponenter fra components/,
     allerede restylet til det lyse feltet, bare importert og plassert.
   DemoSkjema er hovedkonverteringen på siden og skal alltid stå sist.

   Hver .inn-seksjon i demoen får sin egen useReveal(), akkurat som
   Hvorfor-seksjonen gjorde i forrige versjon. [data-reveal] er det
   useReveal faktisk observerer, .inn er bare demoens egen visuelle
   klasse, begge trengs på samme element for at reveal skal virke og
   se riktig ut. */

/* Stjernescoren under knappen i heroen.

   Rendrer ingenting hvis `vurdering` er null, som den er inntil ekte tall
   er lagt inn. Se kommentaren over `vurdering` i site.js for hvorfor det
   er standarden og ikke en hardkodet femmer.

   Kilden står som en lenke, ikke som løs tekst. Det er poenget: en score
   uten et sted å etterprøve den er en påstand, og markedsføringsloven
   krever at den skal kunne dokumenteres. Lenken er dokumentasjonen.

   Stjernene er dekorative og skjult for skjermlesere, siden hele
   opplysningen allerede står i teksten ved siden av. Uten det leses
   «stjerne stjerne stjerne stjerne stjerne 5 av 5» opp. */
const Stjerner = ({ score }) => (
  <span className="stjerner" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg key={n} viewBox="0 0 24 24" className={n <= Math.round(score) ? 'fylt' : ''}>
        <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" />
      </svg>
    ))}
  </span>
);

const Vurdering = () => {
  if (!vurdering) return null;
  // Norsk desimalskille er komma. 5 skal stå som «5», ikke «5,0».
  const score = Number.isInteger(vurdering.score)
    ? String(vurdering.score)
    : String(vurdering.score).replace('.', ',');
  return (
    <p data-reveal className="vurdering inn" style={{ '--d': '400ms' }}>
      <Stjerner score={vurdering.score} />
      <span>
        {score} av 5 fra {vurdering.antall}{' '}
        {vurdering.antall === 1 ? 'vurdering' : 'vurderinger'} på{' '}
        <a href={vurdering.url} target="_blank" rel="noopener noreferrer">
          {vurdering.kilde}
          <span className="skjult"> (åpnes i ny fane)</span>
        </a>
      </span>
    </p>
  );
};

/* Én navngitt kundeuttalelse under knappen, som sosialt bevis i heroen.

   Står her i stedet for en stjernescore så lenge Bedriftsprofilen har
   for få anmeldelser til at et snitt sier noe. Se heroBevis i site.js
   for hele begrunnelsen. Vises `vurdering` (altså er den ikke null),
   viker sitatet, siden to bevis på rad i heroen blir støy.

   Sitatet hentes fra samme liste som omtaleseksjonen lenger nede, så
   de to aldri kan komme ut av synk. */
const HeroBevis = () => {
  if (vurdering || !heroBevis) return null;
  const o = omtaler[heroBevis.indeks];
  if (!o) return null;

  const kilde = (
    <span className="hero-bevis-kilde">
      {o.navn}, {o.rolle}
    </span>
  );

  return (
    <figure data-reveal className="hero-bevis inn" style={{ '--d': '400ms' }}>
      <blockquote>«{o.sitat}»</blockquote>
      <figcaption>
        {heroBevis.url ? (
          <a href={heroBevis.url} target="_blank" rel="noopener noreferrer">
            {kilde}
            <span className="skjult"> (åpnes i ny fane)</span>
          </a>
        ) : (
          kilde
        )}
      </figcaption>
    </figure>
  );
};

const Hero = () => {
  const container = useReveal(100);
  return (
    <section ref={container} className="hero">
      <span className="vannmerke merke" aria-hidden="true">oppskalert<i>.</i></span>
      <div className="wrap">
        {/* Overskriften er tre korte setninger, ikke én lang. Målt hos ti
            norske konkurrenter 20. august 2026 ligger H1 på 5,5 ord i snitt,
            og den forrige versjonen her var 12 ord over to setninger, altså
            dobbelt så lang som normen. Staccato med punktum der man
            instinktivt ville satt komma er samtidig det grepet norske sider
            faktisk bruker, se inspirasjon/norsk-cta.md.

            Den bærer også de tre søkeordene Search Console måler forsiden på:
            webdesign, bedrifter, Oslo. */}
        <h1 data-reveal className="inn" style={{ '--d': '120ms' }}>
          Webdesign for bedrifter. Basert i Oslo. Alltid gratis demo.
        </h1>
        {/* Ingressen sier bevisst noe annet enn overskriften.

            Den forrige gjentok «bedrifter», «Oslo» og «gratis demo», altså
            alt overskriften og knappen allerede sa, innenfor 400 piksler.
            Nå bærer den det de tre setningene over ikke rekker: hva som
            faktisk inngår, hvem som gjør det, og hvor lang tid det tar.

            Malen er den målte: konkret liste, hvem, så én setning som
            fjerner den største friksjonen. 19 ord mot en målt norm på 18. */}
        <p data-reveal className="inn" style={{ '--d': '220ms' }}>
          Design, tekst, koding og lansering, gjort av én person du kan ringe.
          Demoen er klar på tre virkedager.
        </p>
        <div data-reveal className="hero-handling inn" style={{ '--d': '320ms' }}>
          <Link className="knapp" to={ruter.kontakt}>
            Få en gratis demo <span className="pil" aria-hidden="true">↗</span>
          </Link>
        </div>
        <Vurdering />
        <HeroBevis />
      </div>
    </section>
  );
};

const Statuslinje = () => (
  <div className="wrap statuslinje">
    <a className="pille" href="#veien-inn">Se mer ↓</a>
  </div>
);

const VeienInn = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="wrap" id="veien-inn" style={{ paddingBottom: 'var(--luft)' }}>
      <div className="intro">
        <p data-reveal className="etikett inn">Kom i gang</p>
        <ul data-reveal className="nummerert inn" style={{ '--d': '80ms' }}>
          <li><Link to={ruter.arbeid}><span className="nr">Arbeid</span> Se hva jeg har laget <span className="pil" aria-hidden="true">→</span></Link></li>
          <li><Link to={ruter.priser}><span className="nr">Pris</span> Se hva det koster <span className="pil" aria-hidden="true">→</span></Link></li>
          <li><Link to={ruter.metode}><span className="nr">Prosess</span> Se hvordan det går til <span className="pil" aria-hidden="true">→</span></Link></li>
          <li><Link to={ruter.kontakt}><span className="nr">Neste</span> Ta en uforpliktende prat <span className="pil" aria-hidden="true">→</span></Link></li>
        </ul>
      </div>
    </section>
  );
};

const ArbeidSeksjon = () => {
  const container = useReveal(100);
  return (
    <section ref={container} className="hvit">
      <div className="wrap seksjon">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">Noe av det jeg har laget</p>
          <h2>Sider som er i drift nå</h2>
          <p>Rammene under ruller gjennom de ekte sidene. Ingen mockup. Ingen utsnitt.
          Bare siden slik den står akkurat nå.</p>
        </div>
        <Arbeider antall={4} />
        <p style={{ marginTop: 'clamp(2.5rem,5vw,3.5rem)' }}>
          <Link className="knapp" to={ruter.arbeid}>Se alle sidene <span className="pil" aria-hidden="true">↗</span></Link>
        </p>
      </div>
    </section>
  );
};

const SitatSeksjon = () => {
  const container = useReveal(100);
  return (
    <section ref={container} className="sitatblokk">
      <div className="wrap"><Sitatkort /></div>
    </section>
  );
};

const TjenesteSeksjon = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap tjeneste-rad">
        <div data-reveal className="tjeneste-side inn">
          <p className="etikett">Tjenester</p>
          <Link className="knapp" to={ruter.kontakt}>Ta kontakt <span className="pil" aria-hidden="true">↗</span></Link>
        </div>
        <div>
          <div data-reveal className="seksjonstopp inn">
            <h2>Dette kan jeg hjelpe deg med</h2>
            <p>De fleste byråer setter deg opp med en prosjektleder, en designer og en
            utvikler. Her er det bare meg, hele veien fra første skisse til siden er
            oppe og går. Du får én faktura og ett telefonnummer.</p>
          </div>
          <div data-reveal className="tjenester inn" style={{ '--d': '80ms' }}>
            {tjenester.map((t) => (
              <article className="tjeneste" key={t.navn}>
                <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: t.ikon }} />
                <h3>{t.navn}</h3>
                <p>{t.tekst}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseSeksjon = () => {
  const container = useReveal(100);
  return (
    <section ref={container} className="hvit">
      <div className="wrap seksjon">
        <div data-reveal className="casedel inn">
          <h2>Hvordan én person rekker dette på tre dager</h2>
          <div className="brod">
            <p>Fordi jeg bygger med AI. Ikke for å ta snarveier, men fordi den fjerner
            delene som pleide å ta uker: første utkast, standardkode, bildearbeid,
            femten varianter av en tekst. Igjen står den delen som faktisk trenger et
            menneske, som er å bestemme hva som er riktig.</p>
            <p>Det er derfor prisen står på <b>9 999</b> og ikke 40 000, og derfor demoen
            er ferdig på <b>tre virkedager</b> og ikke fire uker. Ingen andre sier det
            høyt, men det er hele forklaringen.</p>
            <p>Og det samme går inn i siden din: en chatbot som er trent på bedriften
            din og svarer mens du sover, automatikk som fjerner det du i dag taster inn
            to ganger, og struktur som gjør at du blir funnet i ChatGPT og Googles
            AI-svar, ikke bare i de blå lenkene.</p>
            {/* Redaksjonell lenke til landingssiden, ikke pynt. Målt i Search
                Console over 28 dager: på «webdesign i oslo» lå forsiden på
                snittposisjon 17,5 med 42 visninger, /webdesign-oslo på 66,3 med
                51 visninger. Forsiden nevner «webdesign» én gang og «Oslo» tre
                ganger, landingssiden fem og tolv, så det er ikke relevans som
                skiller dem: /webdesign-oslo hadde bare footerlenken å leve av.

                Lenken lå opprinnelig i Hvorfor-seksjonen. Den seksjonen er ute
                av forsiden nå, siden demoen ikke hadde den, men lenken skulle
                ikke ut med den: da ville et målt SEO-grep fra 19. august vært
                reversert uten at noen mente det. Derfor står den her. */}
            <p>Sitter du i hovedstaden, har jeg skrevet om{' '}
            <Link to={ruter.webdesignOslo}>webdesign i Oslo</Link>{' '}
            for seg, med fast pris og hva som følger med.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FaqSeksjon = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="hvit">
      <div className="wrap seksjon">
        <div className="faq-rad">
          <div data-reveal className="inn">
            <p className="etikett" style={{ marginBottom: '1.25rem' }}>Spørsmål</p>
            <h2>Greit å vite</h2>
            <p className="faq-intro">Er det noe jeg ikke har svart på, er det bare å{' '}
            <Link to={ruter.kontakt}>ta kontakt</Link>. Jeg svarer selv.</p>
          </div>
          <div data-reveal className="faq inn" style={{ '--d': '80ms' }}>
            {sporsmal.map(([q, a]) => (
              <details key={q}>
                <summary>{q} <span className="tegn" aria-hidden="true" /></summary>
                <p className="svar">{a}</p>
              </details>
            ))}
          </div>
        </div>
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
    <Hero />
    <Statuslinje />
    <VeienInn />
    <ArbeidSeksjon />
    <SitatSeksjon />
    <TjenesteSeksjon />
    <CaseSeksjon />
    <Priser visAlltidMed={false} />
    <FaqSeksjon />
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
