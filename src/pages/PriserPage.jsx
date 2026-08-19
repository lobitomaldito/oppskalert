import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
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
  itemListElement: prismodeller.map((p) => ({
    '@type': 'Offer',
    name: p.navn,
    description: p.tagline,
    price: p.fra.replace(/\s/g, ''),
    priceCurrency: 'NOK',
    url: 'https://oppskalert.no/priser',
  })),
};

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
          <p className="etikett">To modeller</p>
          <h2>Eie den selv, eller la meg passe på</h2>
        </div>
        <div className="priser inn" style={{ '--d': '80ms' }}>
          <article className="pris">
            <p className="modell">Engangspris</p>
            <p className="tall">9 999<span>kr</span></p>
            <p className="tagline">Du eier alt. Én faktura, så er du ferdig.</p>
            <ul>
              <li>Komplett nettside, håndbygd for deg</li>
              <li>Alle filer overlevert, du eier dem</li>
              <li>SEO-grunnoppsett fra dag én</li>
              <li>Hjelp med oppsett på ditt eget hosting</li>
            </ul>
          </article>
          <article className="pris fremhevet">
            <p className="modell">Driftet av meg · ingen binding</p>
            <p className="tall">690<span>kr/mnd</span></p>
            <p className="tagline">Jeg passer på alt. Du slipper å tenke teknisk igjen.</p>
            <ul>
              <li>Alt i engangspris, pluss:</li>
              <li>Hosting, domene og SSL</li>
              <li>Rimelige innholdsendringer inkludert</li>
              <li>Support direkte fra meg, ikke en helpdesk</li>
            </ul>
          </article>
        </div>
        <p className="prisnotat">Alle priser er eks. mva. Du får alltid fast pris før jeg skriver en linje kode.</p>
      </div>
    </section>

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
              <p className="tall">{n.fra}<span>{n.enhet}</span></p>
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
  </Shell>
);

export default PriserPage;
