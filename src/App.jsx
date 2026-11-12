import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { Shell } from './components/Layout';
import Sitatkort, { Stjerner } from './components/Sitatkort';
import Priser from './components/Priser';
import Utkastvelger from './components/Utkastvelger';
import { faqSchema, kontakt, ruter, vurdering } from './lib/site';
import { sporsmal } from './lib/demo-innhold';
import { useReveal } from './lib/useReveal';
import {
  Hengelas, HengelasApen, LinkedIn, Nokkel, Pause, PilHoyre, PilOpp, SkjoldSjekk, SokSjekk, Skjermer, Spill,
} from './components/Ikon';
import { track } from './lib/analytics';

/* Studio-mal-forsiden, portert ord for ord fra demoen (mal3.src.html,
   linje 693 til 797, se inspirasjon/demo-studio-mal.md). Alt CSS ligger
   allerede i index.css, denne fila bygger bare den samme markupen i
   React. 26.10.2026 ble skallet hvitt etter Solid Media-retningen: sentrert
   hero med kundesidene i en rad under, og en Om meg-seksjon med portrett
   rett etter heroen.

   Forsiden følger demoens rekkefølge. Priser og skjemaet er de eneste
   tilleggene: prisen fordi den er det folk leter etter, skjemaet fordi
   det er hovedkonverteringen. Skjemaet skal alltid stå sist. Fra
   11.11.2026 er skjemaet Utkastvelger, de andre sidene har DemoSkjema.

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
        {score} av 5 på{' '}
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
   skjermbildet av kundens side på skjermen.

   Raden ruller sakte mot venstre (ønsket av Aleksander 26.10.2026). Sporet
   har bildene to ganger og flyttes halve bredden sin, så sløyfen er sømløs
   uten JavaScript. JavaScript styrer bare pauseknappen: WCAG 2.2.2 krever
   at bevegelse som varer over fem sekunder kan stoppes. Dekor for skjermlesere:
   knappen «Se hva jeg har laget» rett over går til /arbeid, der de samme
   prosjektene står med navn og lenke.

   Prana Yoga Studio fikk første plass 9.11.2026, og Katrin Brubakk ble
   flyttet bakerst, begge etter ønske fra Aleksander.

   Seksjonen «Sider som er i drift nå» sto rett under til 26.10.2026.
   Aleksander tok den ut: raden viser allerede eksemplene. */
const GALLERI = [
  ['prana-yoga-mobil', 2 / 3],
  ['woxen-hage-pc', 1],
  ['melanie-dahl-mobil', 2 / 3],
  ['alpha-negotiations-pc', 4 / 5],
  ['jakobsen-takst-mobil', 2 / 3],
  ['appstart-pc', 1],
  ['katrin-brubakk-mobil', 2 / 3],
];

const HeroGalleri = () => {
  const [pause, setPause] = useState(false);
  return (
    <div className={pause ? 'hero-galleri er-pauset' : 'hero-galleri'}>
      <div className="galleri-spor" aria-hidden="true">
        {[...GALLERI, ...GALLERI].map(([fil, forhold], i) => (
          <img
            key={i}
            src={`/websider/vegg/${fil}.webp`}
            alt=""
            width="480"
            height={Math.round(480 / forhold)}
            style={{ aspectRatio: forhold }}
            decoding="async"
          />
        ))}
      </div>
      <button type="button" className="galleri-pause" aria-pressed={pause} onClick={() => setPause((p) => !p)}>
        {pause ? <><Spill /> Spill av</> : <><Pause /> Pause</>}
      </button>
    </div>
  );
};

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
          Webdesign og ny hjemmeside for bedrifter i hele Norge, fra 6 990 kr.
          Design, tekst, koding og lansering, gjort av én person du kan ringe.
          Utkastet er klart på 48 timer.
        </p>
        <div data-reveal className="hero-handling inn" style={{ '--d': '320ms' }}>
          <Link className="knapp" to={ruter.kontakt}>
            Få et gratis utkast <PilOpp className="pil" />
          </Link>
          <Link className="knapp knapp-tom" to={ruter.arbeid}>Se hva jeg har laget</Link>
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

/* Fire korte fakta under kunderaden. Grepet er fra en konkurrents
   gratis-SEO-side (lest 11.11.2026): en stripe som svarer på det folk
   lurer på før de leser videre. Her er det skepsisen mot en leverandør
   som er én person og ny.

   21 er prospects med stage='sold' i ringeappen, talt 11.11.2026. Tallet
   oppdateres for hånd, og det skal være talt, aldri rundet opp. */
const FAKTA = [
  ['48 timer', 'til du ser utkastet'],
  ['Fast pris', 'avtalt før jeg begynner'],
  ['Ingen binding', 'på noen av avtalene'],
  ['21 bedrifter', 'har valgt Oppskalert'],
];

const FaktaStripe = () => (
  <div className="wrap">
    <ul className="faktastripe">
      {FAKTA.map(([tall, tekst]) => (
        <li key={tall}><b>{tall}</b> {tekst}</li>
      ))}
    </ul>
  </div>
);

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
            <Link className="knapp knapp-tom" to={ruter.om}>Mer om meg <PilHoyre className="pil" /></Link>
            <a
              className="knapp knapp-tom"
              href={kontakt.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('linkedin_clicked', { sted: 'forside' })}
            >
              <LinkedIn /> LinkedIn<span className="skjult"> (åpner i ny fane)</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

/* «Kom i gang»-blokken som sto her (Arbeid / Pris / Prosess / Neste) er
   fjernet 17. oktober 2026. Den gjentok toppmenyen og skjøv de første
   kundesidene 1,6 skjermhøyder ned på mobil. */

const SitatSeksjon = () => {
  const container = useReveal(100);
  return (
    /* Eget grått bånd med hvite kort, så omtalene leses som en egen del
       av siden (ønsket av Aleksander 26.10.2026). */
    <section ref={container} className="sitatblokk">
      <div className="wrap"><Sitatkort /></div>
    </section>
  );
};

/* To tjenester i grå kort, som tjenestekortene på solidmedia.no. Chatbot
   og drift står som egne priskort rett under. Nettbutikk ble tatt ut av
   forsiden 26.10.2026 etter ønske fra Aleksander.

   11.11.2026: hvert kort lover noe og lenker til sin egen side, og hele
   kortet kan trykkes. Før var det én linje uten lenke, og tjenestesidene
   var bare å finne i bunnteksten. `kort` vises alltid, `mer` først fra
   40rem, så mobil får ikon, navn og én linje (regel 2). Teksten står her
   og ikke i `tjenester`, fordi den lista brukes på andre sider også. */
const TJENESTER_FORSIDE = [
  {
    navn: 'Ny nettside',
    Ikon: Skjermer,
    til: ruter.nyNettside,
    kort: 'Utkast på 48 timer, ferdig side på en til to uker.',
    mer: 'Du ser utkastet før du bestemmer deg, og siden laster på under ett sekund.',
  },
  {
    navn: 'Bli funnet i Google',
    Ikon: SokSjekk,
    til: ruter.seo,
    kort: 'Synlig i Google og i AI-søk som ChatGPT.',
    mer: 'Tekstene skrives for det kundene dine søker på. Stein-Erik fikk en henvendelse fra en kunde som hadde funnet ham gjennom Claude, et par uker etter at sidene var KI-optimert.',
  },
];

const TjenesteSeksjon = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">Tjenester</p>
          <h2>Dette kan jeg hjelpe deg med</h2>
        </div>
        <ul data-reveal className="tjenester tjenester-forside inn" style={{ '--d': '80ms' }}>
          {TJENESTER_FORSIDE.map((t) => {
            const Ikon = t.Ikon;
            return (
              <li key={t.navn} className="tjeneste">
                <Ikon className="tjeneste-ikon" />
                <h3><Link className="tjeneste-lenke" to={t.til}>{t.navn}</Link></h3>
                <p>{t.kort} <span className="tjeneste-mer">{t.mer}</span></p>
                <span className="tjeneste-les" aria-hidden="true">Les mer <PilHoyre className="pil" /></span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/* Trygghetslisten (11.11.2026). Grepet er fra en konkurrents tjenesteside,
   der en liste med fet etikett tar frykten for hacking og driftsstans.

   «Hva skjer hvis du blir borte?» står bevisst ikke her, bare i FAQ-en
   (Aleksander 11.11.2026): lista skal ikke minne folk på en tanke de ikke
   har tenkt. Av samme grunn nevner ledeteksten ikke at Oppskalert er én
   person.

   Vilkårene er fra ~/.claude/assets/tilbud/MAL.md: domenet står i kundens
   navn, filene får kunden når de vil flytte (på forespørsel, ikke
   automatisk), leie til eie blir kundens etter 12 måneder. Endres
   vilkårene der, må lista endres her.

   Ordet SSL står ikke: ingen kunder vet hva det er (Aleksander
   11.11.2026). Hengelåsen er det de har sett.

   Mobil får etiketten og første setning, resten fra 40rem (regel 2):
   med alt synlig var lista 875 px høy på 375 px bredde. */
const TRYGGHET = [
  {
    Ikon: Nokkel,
    tittel: 'Du eier siden',
    kort: 'Domenet står i ditt navn.',
    mer: 'Vil du flytte siden, får du koden når du ber om det. Leier du til eie, blir siden din når 12 måneder er betalt.',
  },
  {
    Ikon: Hengelas,
    tittel: 'Hengelåsen i adressefeltet',
    kort: 'Nettleseren varsler aldri besøkende om en usikker side.',
    mer: 'Sikker forbindelse er med fra første dag, og hosting er med i prisen.',
  },
  {
    Ikon: SkjoldSjekk,
    tittel: 'Lite å bryte seg inn i',
    kort: 'Siden er bygget uten WordPress og programtillegg.',
    mer: 'Det finnes ingen tillegg som må oppdateres hver uke for å holde den sikker.',
  },
  {
    Ikon: HengelasApen,
    tittel: 'Ingen binding',
    kort: 'Ingen av pakkene eller avtalene har bindingstid.',
    mer: 'Serviceavtalen sier du opp når du vil.',
  },
];

const TrygghetSeksjon = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon trygghet-seksjon">
      <div className="wrap trygghet">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">Trygghet</p>
          <h2>Siden er din, og den står trygt</h2>
          <p>Dette er på plass uansett hvilken pakke du velger.</p>
        </div>
        <ul data-reveal className="trygghet-liste inn" style={{ '--d': '80ms' }}>
          {TRYGGHET.map((t) => {
            const Ikon = t.Ikon;
            return (
              <li key={t.tittel}>
                <Ikon className="trygghet-ikon" />
                <p><b>{t.tittel}.</b> {t.kort} <span className="tjeneste-mer">{t.mer}</span></p>
              </li>
            );
          })}
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
          <p>Redigeringspanelet følger med i alle pakkene. Vil du heller at jeg gjør endringene, dekker serviceavtalen det for 550 kr i måneden.</p>
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
     slått sammen her, der Google allerede rangerer foretaket.
     12.11.2026: hele landet. Viken ble oppløst i 2024, og arbeidet krever
     verken oppmøte eller kontor i nærheten. Adressen over står. */
  areaServed: { '@type': 'Country', name: 'Norge' },
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
        særskriving. 57 tegn med suffikset.

        «i Oslo» ut igjen 12. november 2026 (Aleksander). Search Console
        12.8 til 9.11: forsiden sto i snitt på 24,0 på Oslo-søk (235
        visninger, 0 klikk) og 12,2 på kjøpssøk uten by (576 visninger).
        87 % av de kommersielle visningene på hele nettstedet er søk uten by,
        og arbeidet selges i hele landet. /webdesign-oslo eier det lokale.
        «webdesign» og «hjemmeside» står nå i første avsnitt under H1, der
        «hjemmeside» (322 visninger, plass 12,8) manglet. */}
    <SEO
      title="Webdesign for bedrifter, til fast pris"
      description="Webdesign og ny hjemmeside for bedrifter i hele Norge, fast pris fra 6 990 kr. Du ser et gratis utkast før du betaler en krone."
      keywords={['webdesign for bedrifter', 'webdesign firma', 'hjemmeside', 'hjemmeside til bedrift', 'nettside til fast pris']}
      canonical="https://oppskalert.no/"
      jsonLd={homeJsonLd}
    />
    <Hero />
    <FaktaStripe />
    {/* Om meg flyttet ned etter omtalene 12.11.2026 (Aleksander): ansiktet
        står allerede i heroen, og «én person» leses som en fordel først
        etter at leseren har sett tjenestene, tryggheten og omtalene. */}
    <TjenesteSeksjon />
    <TrygghetSeksjon />
    <SitatSeksjon />
    <OmMegSeksjon />
    <RedigeringSeksjon />
    <Priser visAlltidMed={false} />
    <FaqSeksjon />
    <Utkastvelger />
  </Shell>
);

function App() {
  return <Home />;
}

export default App;
