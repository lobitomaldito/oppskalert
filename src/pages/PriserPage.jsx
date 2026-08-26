import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, KortRad } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
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
  /* Modeller uten fast pris får ikke price-felt. Schema.org tillater et
     Offer uten pris, men ikke en pris som ikke er et tall: «Forespør pris»
     ville blitt sendt som price: "Forespørpris", og det er ugyldig
     strukturert data Google kan flagge. */
  itemListElement: prismodeller.map((p) => ({
    '@type': 'Offer',
    name: p.navn,
    description: p.tagline,
    ...(p.erForesporsel
      ? {}
      : { price: p.fra.replace(/\s/g, ''), priceCurrency: 'NOK' }),
    url: 'https://oppskalert.no/priser',
  })),
};

/* Sammenligningen svarer på det ene spørsmålet prismodellene ikke gjør
   alene: hva er egentlig forskjellen, rad for rad. */
const rader = [
  ['Gratis demo før du bestemmer deg', true, true],
  ['Design og utvikling av komplett nettside', true, true],
  ['Håndkodet, uten tunge plugins', true, true],
  ['Søkemotor-grunnoppsett', true, true],
  ['Du eier alle filene', true, 'Ja, også her'],
  ['Hosting, domene og SSL', 'Eget ansvar', true],
  ['Rimelige innholdsendringer inkludert', false, true],
  ['Backup og oppetidsovervåking', false, true],
  ['Support direkte fra meg', false, true],
  /* Den raden som gjør at tabellen faktisk sammenligner to ulike
     avtaler og ikke bare to funksjonslister. Uten den ser abonnementet
     ut som engangsprisen med flere haker. */
  ['Bindingstid', 'Ingen', '12 måneder, deretter ingen'],
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
        <table className="w-full border-collapse min-w-[34rem]">
          <caption className="sr-only">Sammenligning av engangspris og nettside på abonnement</caption>
          <thead>
            <tr className="border-b border-room-ink/15 bg-room-ink/5">
              <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Inkludert</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem]">Engangspris</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem] underline decoration-room-ink/40 underline-offset-4">Nettside på abonnement</th>
            </tr>
          </thead>
          <tbody>
            {rader.map(([navn, a, b]) => (
              <tr key={navn} className="border-b border-room-ink/10 last:border-b-0">
                <th scope="row" className="text-left font-body text-[0.9rem] text-room-ink/70 py-3.5 px-4 font-normal">{navn}</th>
                <td className="text-center py-3.5 px-4"><Celle v={a} /></td>
                <td className="text-center py-3.5 px-4"><Celle v={b} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">
        Begge modellene gjelder nye nettsider. Har du allerede en side som står der, er det drift du ser etter, ikke disse to. Har du en eksisterende side du vil pusse opp, ta kontakt, så finner vi riktig løp for den.
      </p>
    </div>
  </section>
);

const PriserPage = () => (
  <Shell>
    <SEO
      title="Pris på nettside, fast og uten overraskelser"
      description="Pris på hjemmeside og nettside: engangspris fra 9 999 kr, eller abonnement fra 1 290 kr/mnd med 12 måneders binding. Fast pris og gratis demo før du bestemmer deg."
      keywords={['nettside pris', 'pris på hjemmeside', 'hjemmesider pris', 'priser for hjemmeside']}
      canonical="https://oppskalert.no/priser"
      jsonLd={[prisFaqSchema, priserSchema]}
    />

    <section className="wrap sidetopp">
      <p className="etikett inn">Priser</p>
      <h1 className="inn" style={{ '--d': '60ms' }}>Fast pris på nettside og drift.</h1>
      <p className="inn" style={{ '--d': '140ms' }}>
        Du får en fast pris fra meg før jeg skriver en linje kode, og du ser demoen
        innen tre virkedager. Ingen timepris som løper. Ingen overraskelser på slutten.
      </p>
    </section>

    <section className="hvit">
      <div className="wrap seksjon">
        <div className="seksjonstopp inn">
          <p className="etikett">Tre modeller</p>
          <h2>Eie den selv, betale månedlig, eller be om noe eget</h2>
        </div>
        {/* Kortene bygges fra prismodeller i site.js, og rendres av det
            samme Modell-kortet som forsiden. De hadde tidligere sin egen
            CSS-utgave her: serif-tall, punktumliste, ingen knapp. Samme
            data, to ulike produkter for den som så begge rutene. */}
        <KortRadPris>
          {prismodeller.map((m) => (
            <Modell
              key={m.id}
              m={m}
              className={m.erForesporsel ? 'md:col-span-2 lg:col-span-1' : undefined}
            />
          ))}
        </KortRadPris>
        <p className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">{prisNotat}</p>
      </div>
    </section>

    <Sammenligning />

    <section className="seksjon">
      <div className="wrap">
        <div className="seksjonstopp inn">
          <p className="etikett">Drift</p>
          <h2>Tre nivåer, bytt når du vil</h2>
          <p>Velger du at jeg skal passe på siden, er dette nivåene. Du kan gå opp eller
          ned, eller avslutte, uten oppsigelsestid.</p>
        </div>
        {/* Samme kort som over, bare med driftsnivåenes egen knappetekst:
            «Bestill gratis demo» ville lovet en demo av en driftsavtale. */}
        <KortRadPris>
          {driftNivaer.map((n) => (
            <Modell key={n.id} m={n} cta={`Velg ${n.navn}`} />
          ))}
        </KortRadPris>
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
            <Link to={ruter.kontakt}>ta kontakt</Link>. Jeg svarer selv.</p>
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
      lede="Fortell meg kort om bedriften, så får du en fast pris, og en gratis demo før du bestemmer deg."
    />
  </Shell>
);

export default PriserPage;
