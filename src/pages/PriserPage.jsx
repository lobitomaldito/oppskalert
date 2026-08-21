import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { lagFaqSchema, prismodeller, driftNivaer, driftNotat, ruter } from '../lib/site';
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
      <div className="inn overflow-x-auto rounded-2xl border border-room-ink/15" style={{ '--d': '80ms' }}>
        <table className="w-full border-collapse min-w-[34rem]">
          <caption className="sr-only">Sammenligning av engangspris og driftsavtale</caption>
          <thead>
            <tr className="border-b border-room-ink/15 bg-room-ink/5">
              <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Inkludert</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem]">Engangspris</th>
              <th scope="col" className="font-sans font-bold text-sm py-3.5 px-4 w-[9rem] underline decoration-room-ink/40 underline-offset-4">Driftet av meg</th>
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
      <p className="prisnotat">
        Begge modellene gjelder nye nettsider. Har du en eksisterende side du vil pusse opp, ta kontakt, så finner vi riktig løp for den.
      </p>
    </div>
  </section>
);

const PriserPage = () => (
  <Shell>
    <SEO
      title="Pris på nettside, fast og uten overraskelser"
      description="Pris på hjemmeside og nettside: engangspris fra 9 999 kr, eller driftet av meg fra 690 kr/mnd. Du får fast pris og en gratis demo før du bestemmer deg. Ingen binding."
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
          <h2>Eie den selv, la meg passe på, eller be om noe eget</h2>
        </div>
        {/* Kortene bygges fra prismodeller i site.js, ikke skrevet inn her.
            De sto tidligere hardkodet, og da fantes den samme teksten to
            steder: her og i Priser.jsx på forsiden. En prisendring måtte
            gjøres begge steder for å ikke sprike. Nå er site.js eneste
            kilde, slik toppen av den fila alltid har hevdet. */}
        <div className="priser tre inn" style={{ '--d': '80ms' }}>
          {prismodeller.map((m) => (
            <article key={m.id} className={m.fremhevet ? 'pris fremhevet' : 'pris'}>
              <p className="modell">{m.navn}{m.periode ? ` · ${m.periode}` : ''}</p>
              {m.erForesporsel ? (
                /* Ingen «fra» og ingen enhet her: det ville lest som at
                   «Forespør pris» er et beløp. Tallet er også mindre, siden
                   det er tekst og ikke et siffer som skal bære vekten. */
                <p className="tall foresporsel">{m.fra}</p>
              ) : (
                <p className="tall">
                  <span className="fra">fra</span>{m.fra}<span>{m.enhet}</span>
                </p>
              )}
              <p className="tagline">{m.tagline}</p>
              {m.id === 'engangs' && (
                <Link
                  to={ruter.kalkulator}
                  className="self-start text-sm text-room-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Regn ut prisen for din side →
                </Link>
              )}
              {m.erForesporsel && (
                <Link
                  to={ruter.kontakt}
                  className="self-start text-sm text-room-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Fortell meg hva du trenger →
                </Link>
              )}
              <ul>
                {m.inkludert.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="prisnotat">Alle priser er eks. mva. Du får alltid fast pris før jeg skriver en linje kode.</p>
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
        <div className="priser tre inn" style={{ '--d': '80ms' }}>
          {driftNivaer.map((n) => (
            <article key={n.id} className={n.fremhevet ? 'pris fremhevet' : 'pris'}>
              <p className="modell">{n.navn}</p>
              <p className="tall"><span className="fra">fra</span>{n.fra}<span>{n.enhet}</span></p>
              <p className="tagline">{n.tagline}</p>
              <ul>
                {n.inkludert.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="prisnotat">{driftNotat}</p>
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
