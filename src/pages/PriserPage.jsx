import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { ArbeidSeksjon } from '../components/Arbeider';
import { Modell, PrisRad } from '../components/Priser';
import Sitatkort from '../components/Sitatkort';
import { lagFaqSchema, prisNotat, prismodeller, leieTilEie, driftNivaer, driftNotat, ruter } from '../lib/site';
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

const prisFaqSchema = lagFaqSchema(sporsmal.map(([q, a]) => ({ q, a })));

const priserSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Oppskalert prismodeller',
  itemListElement: [...prismodeller, leieTilEie].map((p) => ({
    '@type': 'Offer',
    name: p.navn,
    description: p.tagline || p.tekst,
    price: p.fra.replace(/\s/g, ''),
    priceCurrency: 'NOK',
    url: 'https://oppskalert.no/priser',
  })),
};

/* Sammenligningen svarer på det ene spørsmålet prismodellene ikke gjør
   alene: hva er egentlig forskjellen, rad for rad. */
const rader = [
  ['Gratis utkast før du bestemmer deg', true, true, true],
  ['Sider', 'Én landingsside', 'Alle du har i dag', 'Alle du har i dag'],
  ['Håndbygd nettside, uten tunge plugins', true, true, true],
  ['Søkemotor-grunnoppsett', true, true, true],
  ['Tekstene skrevet om for Google og AI-søk', false, true, true],
  ['Interaktive moduler: priskalkulator, booking', false, false, true],
  ['SEO med månedlig rapport', false, false, 'Tre måneder'],
  ['Admin-panel, endre tekst og bilder selv', true, true, true],
  ['Du eier alle filene', true, true, true],
  ['Hosting og SSL', true, true, true],
  ['Serviceavtale: endringer, backup og support', '450 kr/mnd', '450 kr/mnd', 'Med i tre måneder, så 450 kr/mnd'],
  ['Betaling', 'Én faktura når du er fornøyd', 'Én faktura, eller 1 590 kr/mnd som leie til eie', 'Én faktura når du er fornøyd'],
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
        <h2>Hva inngår i hvert nivå?</h2>
      </div>
      {/* På mobil er tabellen bredere enn skjermen. Radnavnene står fast
          til venstre, og Medium stikker halvveis inn som hint om å sveipe. */}
      <p className="md:hidden font-body text-sm text-room-ink/70 mb-3" aria-hidden="true">Sveip sidelengs for Medium og Komplett →</p>
      <div className="inn overflow-x-auto rounded-kort border border-room-ink/15" style={{ '--d': '80ms' }}>
        <table className="w-full border-collapse min-w-[35.5rem] md:min-w-[42rem]">
          <caption className="sr-only">Sammenligning av Enkel, Medium og Komplett</caption>
          <thead>
            <tr className="border-b border-room-ink/15 bg-room-ink/5">
              <th scope="col" className="sticky left-0 z-10 bg-room shadow-[inset_0_0_0_999px_rgb(var(--room-ink)/0.05)] border-r border-room-ink/10 md:static md:border-r-0 w-[8.5rem] md:w-auto text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Inkludert</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem]">Enkel</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem] underline decoration-room-ink/40 underline-offset-4">Medium</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem]">Komplett</th>
            </tr>
          </thead>
          <tbody>
            {rader.map(([navn, a, b, c]) => (
              <tr key={navn} className="border-b border-room-ink/10 last:border-b-0">
                <th scope="row" className="sticky left-0 z-10 bg-room border-r border-room-ink/10 md:static md:border-r-0 text-left font-body text-[0.9rem] text-room-ink/70 py-3.5 px-4 font-normal">{navn}</th>
                <td className="text-center py-3.5 px-4"><Celle v={a} /></td>
                <td className="text-center py-3.5 px-4"><Celle v={b} /></td>
                <td className="text-center py-3.5 px-4"><Celle v={c} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">
        Alle tre nivåene gjelder nye nettsider, og hva som skjer med Google, domenet og e-posten når du bytter, står på <Link to={ruter.nyNettside} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">ny nettside</Link>. Har du allerede en side som står der, er det drift du ser etter. Har du en eksisterende side du vil pusse opp, ta kontakt, så finner vi riktig løp for den.
      </p>
    </div>
  </section>
);

const PriserPage = () => (
  <Shell>
    <SEO
      title="Pris på nettside, fast og uten overraskelser"
      description="Pris på hjemmeside og nettside: landingsside 6 990 kr, alle sidene dine med tekster for Google 12 900 kr, komplett fra 19 900 kr. Hosting inkludert, fast pris og gratis utkast før du bestemmer deg."
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
          <p className="etikett">Tre nivåer</p>
          <h2>Enkel, Medium eller Komplett</h2>
          {/* Ett løfte, og bevisene for det (tilbud/MAL.md 3e punkt 5):
              før-og-etter-målingene på casene under /arbeid. */}
          <p>Uansett nivå skal siden gjøre det lettere å finne deg på Google.
          Se hva som ble målt før og etter for{' '}
          <Link to="/arbeid/steinar-husby" className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">Steinar Husby</Link>,{' '}
          <Link to="/arbeid/melanie-dahl" className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">Mélanie Dahl</Link>,{' '}
          <Link to="/arbeid/alpha-negotiations" className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">Alpha Negotiations</Link> og{' '}
          <Link to="/arbeid/jakobsen-takst" className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">Jakobsen Takst</Link>.</p>
        </div>
        {/* Kortene bygges fra prismodeller i site.js, og rendres av det
            samme Modell-kortet som forsiden. De hadde tidligere sin egen
            CSS-utgave her: serif-tall, punktumliste, ingen knapp. Samme
            data, to ulike produkter for den som så begge rutene. */}
        <PrisRad>
          {prismodeller.map((m, i) => (
            <Modell
              key={m.id}
              m={m}
              className={[i === prismodeller.length - 1 && 'md:col-span-2 lg:col-span-1'].filter(Boolean).join(' ') || undefined}
            />
          ))}
        </PrisRad>
        <p className="font-body text-[0.95rem] text-room-ink mt-8 max-w-[52rem] leading-relaxed">{leieTilEie.tekst}</p>
        <p className="font-body text-sm text-room-ink/70 mt-4 max-w-[52rem]">{prisNotat}</p>
        {/* Omtalene står ved prisene (tilbud/MAL.md 3e punkt 4), ordrett
            fra demo-innhold.js, samme kort som på forsiden. */}
        <div className="mt-12"><Sitatkort /></div>
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
            «Få et gratis utkast» ville lovet et utkast av en driftsavtale. */}
        <PrisRad className="lg:grid-cols-2 lg:max-w-[52rem]">
          {driftNivaer.map((n) => (
            <Modell key={n.id} m={n} cta={`Velg ${n.navn}`} />
          ))}
        </PrisRad>
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
