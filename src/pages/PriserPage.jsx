import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, KortRad } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { ArbeidSeksjon } from '../components/Arbeider';
import { Modell } from '../components/Priser';
import { lagFaqSchema, prisNotat, prismodeller, driftNivaer, driftNotat, ruter } from '../lib/site';
import { sporsmal } from '../lib/demo-innhold';

/* Skjemaet bygges av nøyaktig de spørsmålene som vises lenger nede på
   siden. Google krever at FAQPage beskriver synlig innhold, så et skjema
   som lister andre spørsmål enn leseren ser er en reell risiko, ikke en
   formalitet.

   Fram til 19. august 2026 pekte denne på prisSporsmal i site.js, en egen
   søkeordsrettet liste. Den lista vises nå på /vanlige-sporsmal i stedet,
   med sitt eget skjema, så det er fortsatt to ulike FAQPage-sett på to
   URLer. Det var hele poenget med å skille dem 13. august: identiske
   skjemaer på to ruter gjør at Google beholder bare den ene. */
/* Nøyaktig samme rutenett som forsiden bruker i Priser.jsx: tre kort i
   linje fra lg, to fra md, og vannrett sveip på mobil. Sto det med egne
   verdier her, ville radene sprikt igjen første gang én av dem ble endret. */
const KortRadPris = ({ children }) => (
  <KortRad
    gridKlasser="md:grid-cols-2 lg:grid-cols-3"
    kortBredde="w-[86%]"
    className="gap-5 items-stretch max-w-[52rem] lg:max-w-[72rem]"
  >
    {children}
  </KortRad>
);

const prisFaqSchema = lagFaqSchema(sporsmal.map(([q, a]) => ({ q, a })));

const priserSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Oppskalert prismodeller',
  itemListElement: prismodeller.map((p) => ({
    '@type': 'Offer',
    name: p.navn,
    description: p.tagline,
    price: p.fra.replace(/\s/g, ''),
    priceCurrency: 'NOK',
    url: 'https://oppskalert.no/priser',
  })),
};

/* Sammenligningen svarer på det ene spørsmålet prismodellene ikke gjør
   alene: hva er egentlig forskjellen, rad for rad. */
const rader = [
  ['Gratis utkast før du bestemmer deg', true, true, true],
  ['Håndbygd nettside, uten tunge plugins', true, true, true],
  ['Søkemotor-grunnoppsett', true, true, true],
  ['Tekstene skrevet om for Google og AI-søk', false, true, true],
  ['Admin-panel, endre tekst og bilder selv', false, true, true],
  ['Du eier alle filene', true, true, 'Etter 12 måneder'],
  ['Hosting og SSL', true, true, true],
  ['Serviceavtale: endringer, backup og support', '450 kr/mnd', '450 kr/mnd', 'Inkludert i 12 måneder'],
  /* Radene som gjør at tabellen sammenligner ulike avtaler og ikke
     bare funksjonslister. Uten dem ser leie til eie ut som
     engangsprisen med flere haker. */
  ['Betaling', 'Én faktura når du er fornøyd', 'Én faktura når du er fornøyd', '0 kr i dag, så 1 290 kr/mnd'],
  ['Bindingstid', 'Ingen', 'Ingen', 'Ingen, kjøp ut når du vil'],
];

const Celle = ({ v }) => {
  if (v === true) return <Check className="w-4 h-4 text-room-ink mx-auto" aria-label="Inkludert" />;
  if (v === false) return <Minus className="w-4 h-4 text-room-ink/40 mx-auto" aria-label="Ikke inkludert" />;
  return <span className="font-body text-xs text-room-ink/70">{v}</span>;
};

const Sammenligning = () => (
  <section className="seksjon">
    <div className="wrap">
      <div className="seksjonstopp inn">
        <p className="etikett">Sammenligning</p>
        <h2>Hva inngår i hver modell?</h2>
      </div>
      <div className="inn overflow-x-auto rounded-kort border border-room-ink/15" style={{ '--d': '80ms' }}>
        <table className="w-full border-collapse min-w-[42rem]">
          <caption className="sr-only">Sammenligning av Enkel, Komplett og leie til eie</caption>
          <thead>
            <tr className="border-b border-room-ink/15 bg-room-ink/5">
              <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Inkludert</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem]">Enkel</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem]">Komplett</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem] underline decoration-room-ink/40 underline-offset-4">Leie til eie</th>
            </tr>
          </thead>
          <tbody>
            {rader.map(([navn, a, b, c]) => (
              <tr key={navn} className="border-b border-room-ink/10 last:border-b-0">
                <th scope="row" className="text-left font-body text-[0.9rem] text-room-ink/70 py-3.5 px-4 font-normal">{navn}</th>
                <td className="text-center py-3.5 px-4"><Celle v={a} /></td>
                <td className="text-center py-3.5 px-4"><Celle v={b} /></td>
                <td className="text-center py-3.5 px-4"><Celle v={c} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">
        Alle tre gjelder nye nettsider, og hva som skjer med Google, domenet og e-posten når du bytter, står på <Link to={ruter.nyNettside} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">ny nettside</Link>. Har du allerede en side som står der, er det drift du ser etter. Har du en eksisterende side du vil pusse opp, ta kontakt, så finner vi riktig løp for den.
      </p>
    </div>
  </section>
);

const PriserPage = () => (
  <Shell>
    <SEO
      title="Pris på nettside, fast og uten overraskelser"
      description="Pris på hjemmeside og nettside: enkel side 6 990 kr, komplett fra 12 900 kr, hosting inkludert, eller leie til eie fra 1 290 kr/mnd uten binding. Fast pris og gratis utkast før du bestemmer deg."
      keywords={['nettside pris', 'pris på hjemmeside', 'hjemmesider pris', 'priser for hjemmeside']}
      canonical="https://oppskalert.no/priser"
      jsonLd={[prisFaqSchema, priserSchema]}
    />

    <section className="wrap sidetopp">
      <p className="etikett inn">Priser</p>
      <h1 className="inn" style={{ '--d': '60ms' }}>Fast pris på nettside og drift.</h1>
      <p className="inn" style={{ '--d': '140ms' }}>
        Du får en fast pris fra meg før jeg skriver en linje kode, og du ser utkastet
        innen 48 timer. Ingen timepris som løper. Ingen overraskelser på slutten.
      </p>
    </section>

    <section className="hvit">
      <div className="wrap seksjon">
        <div className="seksjonstopp inn">
          <p className="etikett">Tre modeller</p>
          <h2>Enkel eller komplett, eller betale månedlig</h2>
        </div>
        {/* Kortene bygges fra prismodeller i site.js, og rendres av det
            samme Modell-kortet som forsiden. De hadde tidligere sin egen
            CSS-utgave her: serif-tall, punktumliste, ingen knapp. Samme
            data, to ulike produkter for den som så begge rutene. */}
        <KortRadPris>
          {prismodeller.map((m, i) => (
            <Modell
              key={m.id}
              m={m}
              className={i === prismodeller.length - 1 ? 'md:col-span-2 lg:col-span-1' : undefined}
            />
          ))}
        </KortRadPris>
        <p className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">{prisNotat}</p>
      </div>
    </section>

    {/* Eksemplene står rett etter prisene: først hva det koster, så hva
        prisen kjøper. */}
    <ArbeidSeksjon hvit={false} kompakt />

    <Sammenligning />

    <section className="seksjon">
      <div className="wrap">
        <div className="seksjonstopp inn">
          <p className="etikett">Etter lansering</p>
          <h2>Serviceavtale og SEO</h2>
          <p>Hosting er med i prisen på siden. Vil du at jeg gjør endringene, eller
          jobber med søk hver måned, er dette tilleggene. Ingen oppsigelsestid.</p>
        </div>
        {/* Samme kort som over, bare med driftsnivåenes egen knappetekst:
            «Bestill gratis utkast» ville lovet et utkast av en driftsavtale. */}
        <KortRad gridKlasser="md:grid-cols-2" kortBredde="w-[86%]" className="gap-5 items-stretch max-w-[52rem]">
          {driftNivaer.map((n) => (
            <Modell key={n.id} m={n} cta={`Velg ${n.navn}`} />
          ))}
        </KortRad>
        <p className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">{driftNotat}</p>
      </div>
    </section>

    <section className="hvit">
      <div className="wrap seksjon">
        <div className="faq-rad">
          <div className="inn">
            <p className="etikett" style={{ marginBottom: '1.25rem' }}>Spørsmål</p>
            <h2>Greit å vite</h2>
            <p className="faq-intro">Er det noe jeg ikke har svart på, er det bare å{' '}
            <Link to={ruter.kontakt}>ta kontakt</Link>. Jeg svarer selv. Hva andre tar, og hvorfor prisene spriker, står i{' '}
            <Link to="/blogg/hva-koster-nettside">hva koster en nettside i Norge</Link>.</p>
          </div>
          {/* Disse seks spørsmålene er studio-mal-demoens egne, ordrett fra
              demo-innhold.js, og FAQPage-skjemaet over bygges av nøyaktig
              den samme lista. Det er ikke en detalj: Google krever at
              FAQPage-strukturen beskriver det som faktisk står synlig på
              siden, og et skjema som lover andre spørsmål enn de leseren
              ser kan gi manuell straff eller at rik-resultatet droppes.
              Endrer du spørsmålene her, endres skjemaet av seg selv.

              De søkeordsrettede prisspørsmålene (prisSporsmal i site.js)
              ligger fortsatt ute på /vanlige-sporsmal med sitt eget skjema,
              så den SEO-verdien er ikke tapt, den er bare flyttet dit den
              faktisk vises. */}
          <div className="faq inn" style={{ '--d': '80ms' }}>
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

    <DemoSkjema
      tittel="Vil du se hva"
      uthevet="din ville kostet?"
      lede="Fortell meg kort om bedriften, så får du en fast pris, og et gratis utkast før du bestemmer deg."
    />
  </Shell>
);

export default PriserPage;
