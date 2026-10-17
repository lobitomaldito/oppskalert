import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { Shell } from './components/Layout';
import { ArbeidSeksjon } from './components/Arbeider';
import Sitatkort from './components/Sitatkort';
import Priser from './components/Priser';
import DemoSkjema from './components/DemoSkjema';
import Vegg from './components/Vegg';
import { faqSchema, heroBevis, kontakt, ruter, vurdering } from './lib/site';
import { omtaler, sporsmal, tjenester } from './lib/demo-innhold';
import { useReveal } from './lib/useReveal';

/* Studio-mal-forsiden, portert ord for ord fra demoen (mal3.src.html,
   linje 693 til 797, se inspirasjon/demo-studio-mal.md). Alt CSS ligger
   allerede i index.css, denne fila bygger bare den samme markupen i
   React: .hero blir en H1-seksjon på det lyse feltet med vannmerket bak,
   .statuslinje blir en enkel "se mer"-pille, og resten følger demoens
   seksjoner i samme rekkefølge.

   Forsiden følger demoens rekkefølge. Priser og DemoSkjema er de eneste
   tilleggene: prisen fordi den er det folk leter etter, skjemaet fordi
   det er hovedkonverteringen. Skjemaet skal alltid stå sist.

   Tre seksjoner er bevisst tatt ut igjen etter at de først ble lagt til:
   - Hvorfor og Metode, fordi demoen ikke hadde dem. Metode lever videre
     på /metode, som er stedet folk leter etter den.
   - AI-avsnittet «Hvordan én person rekker dette på tre dager», fordi
     det brukte tolv linjer på å si det ett FAQ-spørsmål nå sier på to.
     Svaret ligger som «Hvorfor er prisen lavere enn hos andre?» i
     sporsmal, og de tre AI-tjenestene står fortsatt i tjenestekortene.

   Hver .inn-seksjon i demoen får sin egen useReveal(). [data-reveal] er det
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
/* Én fast omtale, valgt med heroBevis.indeks. Den tonet gjennom alle
   fire en periode, men de samme fire står i omtaleseksjonen lenger nede,
   så leseren så samme sitat to ganger. Nå står én her, og seksjonen viser
   de andre (se utenom i Sitatkort). */
const HeroBevis = () => {
  const o = heroBevis && omtaler[heroBevis.indeks];
  if (vurdering || !o) return null;
  const kilde = <span className="hero-bevis-kilde">{o.navn}, {o.rolle}</span>;

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
    <section ref={container} className="hero hero-vegg">
      <div className="wrap">
        <div className="hero-tekst">
          {/* Overskriften selger det kunden får, søkeordene står i etiketten.

              Til 17. oktober 2026 var H1 «Webdesign for bedrifter. Basert i
              Oslo. Alltid gratis utkast.», skrevet for de tre ordene Search
              Console måler forsiden på. «Basert i Oslo» sa ingenting til en
              kunde i Harstad. Nå bærer etiketten «webdesign» og «bedrifter»,
              og title-taggen bærer alle tre, som er det sterkeste signalet
              uansett. Se SEO.md, punkt 12.

              To spans: ved siden av galleriveggen står de på hver sin linje,
              se .hero-vegg h1 span i index.css. */}
          <p data-reveal className="etikett hero-etikett inn" style={{ '--d': '60ms' }}>Webdesign for bedrifter</p>
          <h1 data-reveal className="inn" style={{ '--d': '120ms' }}>
            <span>Se den nye nettsiden din</span>{' '}
            <span>før du betaler en krone.</span>
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
            Utkastet er klart på 48 timer.
          </p>
          <div data-reveal className="hero-handling inn" style={{ '--d': '320ms' }}>
            <Link className="knapp" to={ruter.kontakt}>
              Få et gratis utkast <span className="pil" aria-hidden="true">↗</span>
            </Link>
          </div>
          <Vurdering />
          <HeroBevis />
        </div>
        <Vegg />
      </div>
    </section>
  );
};

const Statuslinje = () => (
  <div className="wrap statuslinje">
    <a className="pille" href="#arbeid">Se mer ↓</a>
  </div>
);

/* «Kom i gang»-blokken som sto her (Arbeid / Pris / Prosess / Neste) er
   fjernet 17. oktober 2026. Den gjentok toppmenyen og skjøv de første
   kundesidene 1,6 skjermhøyder ned på mobil. «Se mer» går rett til
   arbeidet nå. */

const SitatSeksjon = () => {
  const container = useReveal(100);
  return (
    /* Uten egen luft: seksjonene over og under står på samme felt og har
       luften sin allerede. Med begge ble hullet over 250 px på 1440. */
    <section ref={container} className="sitatblokk" style={{ paddingBlock: 0 }}>
      <div className="wrap"><Sitatkort utenom={heroBevis?.indeks} /></div>
    </section>
  );
};

/* Tre tjenester som en linjert liste, ikke seks like kort. Kortgitteret
   var den mest malaktige seksjonen på siden (regel 7 i byggereglene), og
   seks like tunge valg ga øyet ingenting å stoppe på. Chatbot og drift
   står allerede som egne priskort rett under. Knappen «Ta kontakt» ved
   siden av etiketten er tatt ut: headeren har den samme rett over. */
const TJENESTER_FORSIDE = ['Ny nettside', 'Nettbutikk', 'Bli funnet i Google'];

const TjenesteSeksjon = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">Tjenester</p>
          <h2>Dette kan jeg hjelpe deg med</h2>
          <p>Bare meg, hele veien fra første skisse til siden er oppe og går.</p>
        </div>
        <ul data-reveal className="tjenesteliste inn" style={{ '--d': '80ms' }}>
          {tjenester.filter((t) => TJENESTER_FORSIDE.includes(t.navn)).map((t) => (
            <li key={t.navn}>
              <h3>{t.navn}</h3>
              <p>{t.tekst}</p>
            </li>
          ))}
        </ul>
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
  description: 'Jeg bygger lynraske nettsider som skalerer norske bedrifter. Gratis utkast før du betaler en krone.',
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
  /* areaServed og priceRange sto tidligere i en egen ProfessionalService på
     /webdesign-oslo. To URL-er som meldte seg som samme foretak på samme
     adresse delte de lokale signalene i to. Målt 24. august 2026 lå forsiden
     på 17,7 og /webdesign-oslo på 61,6 for «webdesign i oslo». Nodene er
     slått sammen her, der Google allerede rangerer foretaket. */
  areaServed: [
    { '@type': 'City', name: 'Oslo' },
    { '@type': 'AdministrativeArea', name: 'Viken' },
  ],
  priceRange: 'fra 6 990 kr',
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
  <Shell utenBunnCta>
    {/* Tittel og beskrivelse er skrevet for søk, ikke for merkevare.
        «Nettsider som faktisk selger» er god copy og null søkevolum, så den
        lever videre som H1 i heroen i stedet. Se SEO.md punkt 4.

        Ordet «webdesign» kom inn 19. august 2026 etter måling i Search
        Console: forsiden rangerte allerede 12,0 på «webdesign bedrift»,
        12,7 på «webdesign firma» og 12,9 på «webdesigner oslo», med en
        title som ikke inneholdt ordet én eneste gang. Særskriving er ikke
        et alternativ, så preposisjonen bærer det: «webdesign for
        bedrifter». Se SEO.md punkt 12.

        «i Oslo» kom inn 24. august 2026 av samme grunn. Siste 28 dager sto
        forsiden på 17,7 for «webdesign i oslo» (47 visninger), 12,3 for
        «webdesigner oslo» (27 visninger) og 23,8 for «web designer oslo»
        (10 visninger), uten ordet Oslo i title én eneste gang. Landingssiden
        /webdesign-oslo, som har ordet i både title og H1, lå på 61,6 på det
        samme søket. Google har altså allerede valgt forsiden tre ganger, og
        halve førstesiden på «webdesign i Oslo» er byråenes rotdomener.
        Preposisjonen bærer også her, «for bedrifter i Oslo», aldri
        særskriving. 57 tegn med suffikset. */}
    <SEO
      title="Webdesign for bedrifter i Oslo, til fast pris"
      description="Webdesign for bedrifter i Oslo og resten av landet, til fast pris. Jeg bygger hjemmesiden ferdig, og du ser et gratis utkast før du betaler en krone."
      keywords={['webdesign for bedrifter', 'webdesign i Oslo', 'webdesign firma', 'hjemmeside til bedrift', 'nettside til fast pris']}
      canonical="https://oppskalert.no/"
      jsonLd={homeJsonLd}
    />
    <Hero />
    <Statuslinje />
    <ArbeidSeksjon id="arbeid" tett />
    <TjenesteSeksjon />
    <SitatSeksjon />
    <Priser visAlltidMed={false} />
    <FaqSeksjon />
    <DemoSkjema
      tittel="Klar for en nettside"
      uthevet="som selger?"
      lede="Legg igjen navn og e-post, så bygger jeg et gratis utkast til din nye side. Uforpliktende, og klart på 48 timer."
    />
  </Shell>
);

function App() {
  return <Home />;
}

export default App;
