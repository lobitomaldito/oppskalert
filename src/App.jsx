import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { Shell } from './components/Layout';
import { ArbeidSeksjon } from './components/Arbeider';
import Sitatkort from './components/Sitatkort';
import Priser from './components/Priser';
import DemoSkjema from './components/DemoSkjema';
import { faqSchema, kontakt, ruter, vurdering } from './lib/site';
import { sporsmal, tjenester } from './lib/demo-innhold';
import { useReveal } from './lib/useReveal';

/* Studio-mal-forsiden, portert ord for ord fra demoen (mal3.src.html,
   linje 693 til 797, se inspirasjon/demo-studio-mal.md). Alt CSS ligger
   allerede i index.css, denne fila bygger bare den samme markupen i
   React. 26.10.2026 ble skallet hvitt etter Solid Media-retningen: sentrert
   hero med kundesidene i en rad under, og en Om meg-seksjon med portrett
   rett etter arbeidet.

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

/* Kundesidene i én rad under heroen, slik solidmedia.no viser
   kundecasene sine rett under folden. Bildene er de ferdige flisene i
   public/websider/vegg (laget av scripts/vegg-mockups.py), med det ekte
   skjermbildet av kundens side på skjermen. Raden står stille: den
   rullende galleriveggen som sto her til 26.10.2026 trengte pauseknapp
   og observer, og en stille rad sier det samme.

   Raden er bredere enn skjermen og sentrert, så kantene beskjæres. På
   390 ser du de to midterste, på 1440 alle seks. Dekor for skjermlesere:
   de samme prosjektene står med navn og lenke i «Sider som er i drift
   nå» rett under. */
const GALLERI = [
  ['katrin-brubakk-mobil', 2 / 3],
  ['woxen-hage-pc', 1],
  ['melanie-dahl-mobil', 2 / 3],
  ['alpha-negotiations-pc', 4 / 5],
  ['jakobsen-takst-mobil', 2 / 3],
  ['appstart-pc', 1],
];

const HeroGalleri = () => (
  <div className="hero-galleri" aria-hidden="true">
    {GALLERI.map(([fil, forhold]) => (
      <img
        key={fil}
        src={`/websider/vegg/${fil}.webp`}
        alt=""
        width="480"
        height={Math.round(480 / forhold)}
        style={{ aspectRatio: forhold }}
        decoding="async"
      />
    ))}
  </div>
);

const Hero = () => {
  const container = useReveal(100);
  return (
    <section ref={container} className="hero">
      <div className="wrap">
        {/* Overskriften selger det kunden får, søkeordene står i etiketten
            og i title-taggen. Se SEO.md, punkt 12. Aksentfargen ligger på
            løftet, ikke på «nettsiden». */}
        <p data-reveal className="etikett hero-etikett inn" style={{ '--d': '60ms' }}>Webdesign for bedrifter</p>
        <h1 data-reveal className="inn" style={{ '--d': '120ms' }}>
          Se den nye nettsiden din <em className="aksent">før du betaler en krone.</em>
        </h1>
        <p data-reveal className="inn" style={{ '--d': '220ms' }}>
          Design, tekst, koding og lansering, gjort av én person du kan ringe.
          Utkastet er klart på 48 timer.
        </p>
        <div data-reveal className="hero-handling inn" style={{ '--d': '320ms' }}>
          <Link className="knapp" to={ruter.kontakt}>
            Få et gratis utkast <span className="pil" aria-hidden="true">↗</span>
          </Link>
          <a className="knapp knapp-tom" href="#arbeid">Se hva jeg har laget</a>
        </div>
        {/* Ansiktet bak siden, rett under knappene. Hele salgsargumentet er
            at det er én person, og da skal personen synes før folden. */}
        <p data-reveal className="hero-person inn" style={{ '--d': '400ms' }}>
          <img src="/founders/aleksander-160.webp" alt="" width="80" height="80" />
          <span><b>{kontakt.navn}</b> Jeg bygger siden og tar telefonen selv.</span>
        </p>
        <Vurdering />
      </div>
      <HeroGalleri />
    </section>
  );
};

/* Om meg. Portrettet i stort format ved siden av ett langt utsagn, der
   siste del er tonet ned i grått. Grepet er fra solidmedia.no («Bak alt
   vi leverer sitter …»): første halvdel er påstanden, andre halvdel er
   det den betyr for kunden. */
const OmMegSeksjon = () => {
  const container = useReveal(100);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap ommeg">
        <figure data-reveal className="ommeg-bilde inn">
          <img src="/founders/aleksander.webp" alt={`${kontakt.navn}, som driver Oppskalert`} width="1792" height="2400" loading="lazy" />
        </figure>
        <div data-reveal className="inn" style={{ '--d': '100ms' }}>
          <p className="etikett">Om meg</p>
          <h2 className="utsagn">
            Jeg heter Aleksander og bygger hver side selv.{' '}
            <span>Du får ett telefonnummer og samme person fra første skisse til siden er oppe.</span>
          </h2>
          <p className="ommeg-lenke">
            <Link className="knapp knapp-tom" to={ruter.om}>Mer om meg <span className="pil" aria-hidden="true">→</span></Link>
          </p>
        </div>
      </div>
    </section>
  );
};

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
      <div className="wrap"><Sitatkort /></div>
    </section>
  );
};

/* Tre tjenester i grå kort, som tjenestekortene på solidmedia.no. Tre,
   ikke seks: seks like tunge valg ga øyet ingenting å stoppe på, og
   chatbot og drift står allerede som egne priskort rett under. */
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
        <ul data-reveal className="tjenester tjenester-forside inn" style={{ '--d': '80ms' }}>
          {tjenester.filter((t) => TJENESTER_FORSIDE.includes(t.navn)).map((t) => (
            <li key={t.navn} className="tjeneste">
              <h3>{t.navn}</h3>
              <p>{t.tekst}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* Redigeringspanelet følger med i alle pakkene, men sto ingen steder på
   forsiden. Opptaket er tatt lokalt med `oppskalert-admin dev` på
   Jakobsen-prosjektet, så ingen endring nådde kundens ekte side.
   Videoen spilles bare mens den er synlig, og står stille med kontroller
   ved prefers-reduced-motion. */
const RedigeringSeksjon = () => {
  const container = useReveal(80);
  const video = useRef(null);
  useEffect(() => {
    const v = video.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { v.controls = true; return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap redigering">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">Redigering</p>
          <h2>Du endrer siden selv</h2>
          <p>Klikk på teksten du vil bytte, skriv det nye og trykk Publiser. Rundt ett minutt senere ser alle den nye versjonen.</p>
          <p>Du logger inn med en PIN-kode og redigerer rett på siden, slik kundene ser den. Priser, åpningstider, bilder og nye kundeomtaler bytter du uten å ringe meg.</p>
          <p>Redigeringspanelet følger med i alle pakkene. Vil du heller at jeg gjør endringene, dekker serviceavtalen det for 450 kr i måneden.</p>
        </div>
        <figure data-reveal className="inn" style={{ '--d': '80ms' }}>
          <div className="ramme">
            <div className="ramme-topp">
              <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
              <p>jtob.no</p>
            </div>
            <video
              ref={video}
              className="ramme-video"
              poster="/redigering/jakobsen-redigering.webp"
              width="960"
              height="660"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Opptak av redigeringspanelet: prisen i et tjenestekort markeres, skrives om og publiseres."
            >
              {/* Utsnitt for mobil: hele vinduet på 390 px gjør teksten i
                  opptaket uleselig, så mobil får bare kortet og panelet. */}
              <source src="/redigering/jakobsen-redigering-mobil.mp4" type="video/mp4" media="(max-width: 40rem)" />
              <source src="/redigering/jakobsen-redigering.mp4" type="video/mp4" />
            </video>
          </div>
          <figcaption>Redigeringspanelet på siden til Jakobsen Takst &amp; Bygg i Harstad.</figcaption>
        </figure>
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
    <ArbeidSeksjon id="arbeid" tett />
    <OmMegSeksjon />
    <TjenesteSeksjon />
    <SitatSeksjon />
    <RedigeringSeksjon />
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
