import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import { useReveal } from '../lib/useReveal';
import { caser } from '../lib/demo-innhold';
import { prosjekter } from '../lib/site';

/* Casesiden er ordrett fra studio-mal-demoen (mal3.src.html, byggCase-
   funksjonen rundt linje 1465), portet til React i stedet for innerHTML.
   Alle seks casene bruker samme mal, så de ikke kan skli fra hverandre
   når innholdet i demo-innhold.js endres.

   utfordring.a og losning.a kan inneholde <b>-tagger (demoen har dem for
   å utheve ett ord per avsnitt). De rendres med dangerouslySetInnerHTML,
   trygt her fordi strengene er våre egne konstanter i demo-innhold.js,
   ikke noe som kommer fra en bruker eller et CMS. */

/* Google klipper en meta-beskrivelse et sted rundt 155-160 tegn. Ingressene
   i demo-innhold.js er skrevet lengre enn det for å fungere som brødtekst
   i .casetopp, så SEO-beskrivelsen kuttes her i stedet for å dupliseres
   som en egen kortere tekst noen kan glemme å oppdatere sammen med den. */
const kuttBeskrivelse = (tekst) => {
  if (tekst.length <= 155) return tekst;
  const kutt = tekst.slice(0, 155);
  const sisteMellomrom = kutt.lastIndexOf(' ');
  return `${kutt.slice(0, sisteMellomrom > 0 ? sisteMellomrom : 155).trimEnd()}…`;
};

const IkkeFunnet = () => (
  <Shell>
    <SEO
      title="Fant ikke siden"
      description="Denne casen finnes ikke, eller er flyttet."
      noindex
    />
    <div className="wrap sidetopp">
      <p className="etikett">Arbeid</p>
      <h1>Fant ikke denne siden.</h1>
      <p style={{ marginTop: '1.25rem' }}>
        <Link to="/arbeid">Tilbake til arbeid</Link>
      </p>
    </div>
  </Shell>
);

const CasePage = () => {
  const { slug } = useParams();
  const container = useReveal(80);
  const indeks = caser.findIndex((c) => c.slug === slug);

  if (indeks === -1) return <IkkeFunnet />;

  const c = caser[indeks];
  const prosjekt = prosjekter[c.i];
  const neste = caser[(indeks + 1) % caser.length];
  const nesteProsjekt = prosjekter[neste.i];
  const canonical = `https://oppskalert.no/arbeid/${c.slug}`;

  return (
    <Shell>
      <SEO
        title={c.tittel}
        description={kuttBeskrivelse(c.ingress)}
        canonical={canonical}
      />

      <div ref={container}>
        <section className="wrap sidetopp">
          <nav className="brodsmuler" aria-label="Brødsmuler" data-reveal>
            <Link to="/">Forside</Link>
            <span aria-hidden="true">/</span>
            <Link to="/arbeid">Arbeid</Link>
            <span aria-hidden="true">/</span>
            <span>{prosjekt.navn}</span>
          </nav>
          <div className="casetopp">
            <div data-reveal>
              <p className="etikett" style={{ marginBottom: '1rem' }}>{prosjekt.navn}</p>
              <h1>{c.tittel}</h1>
            </div>
            <p className="ingress" data-reveal>{c.ingress}</p>
          </div>
        </section>

        <section className="hvit">
          <div className="wrap seksjon">
            <div className="caseramme" data-reveal>
              <article className="arbeid">
                <div className="ramme">
                  <div className="ramme-topp">
                    <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                    <p>{prosjekt.domene}</p>
                  </div>
                  <div className="ramme-vindu">
                    <img
                      src={prosjekt.full}
                      alt={`Nettsiden til ${prosjekt.navn}`}
                      loading="lazy"
                      width="620"
                      height="2422"
                      style={{ '--til': prosjekt.til, animationDuration: '38s' }}
                    />
                  </div>
                </div>
              </article>
            </div>

            <div className="fakta" data-reveal style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <div>
                <h2>Dette gjorde jeg</h2>
                <ul>
                  {c.gjort.map((punkt) => <li key={punkt}>{punkt}</li>)}
                </ul>
              </div>
              <div>
                <h2>Teknologi</h2>
                <ul>
                  {c.tek.map((punkt) => <li key={punkt}>{punkt}</li>)}
                </ul>
              </div>
              <div>
                <h2>Besøk nettstedet</h2>
                <ul>
                  <li>
                    <a href={`https://${prosjekt.domene}`} target="_blank" rel="noopener noreferrer">
                      {prosjekt.domene}<span className="skjult"> (åpner i ny fane)</span> ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="seksjon">
          <div className="wrap casedel" data-reveal>
            <h2>{c.utfordring.t}</h2>
            <div className="brod">
              {c.utfordring.a.map((avsnitt, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: avsnitt }} />
              ))}
            </div>
          </div>
        </section>

        <section className="hvit">
          <div className="wrap seksjon casedel" data-reveal>
            <h2>{c.losning.t}</h2>
            <div className="brod">
              {c.losning.a.map((avsnitt, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: avsnitt }} />
              ))}
            </div>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 'var(--luft)' }}>
          <div className="casebunn">
            <Link className="knapp" to="/kontakt">
              Vil du ha noe lignende? <span className="pil" aria-hidden="true">↗</span>
            </Link>
            <Link className="etikett" to={`/arbeid/${neste.slug}`}>
              Neste: {nesteProsjekt.navn} →
            </Link>
          </div>
        </section>
      </div>
    </Shell>
  );
};

export default CasePage;
