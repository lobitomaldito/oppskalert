import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import BransjeEksempler from '../components/BransjeEksempler';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { caser, omtaler } from '../lib/demo-innhold';
import { prosjekter } from '../lib/site';

const arbeidSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nettsider bygget av Oppskalert',
  url: 'https://oppskalert.no/arbeid',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: prosjekter.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.navn,
      url: p.url,
    })),
  },
};

/* Sitatkortet fra studio-mal-demoen (mal3.src.html rundt linje 1425).
   Teksten kommer fra demo-innhold.js sin omtaler-liste, ordrett. Kortet
   sykler gjennom listen med de to rundknappene, akkurat som i demoen. */
const SitatKort = () => {
  const [indeks, setIndeks] = useState(0);
  const n = ((indeks % omtaler.length) + omtaler.length) % omtaler.length;
  const o = omtaler[n];
  const initial = o.navn.split(' ').map((d) => d[0]).slice(0, 2).join('');

  return (
    <div className="sitatkort paa-blekk" data-reveal>
      <div className="sitat-topp">
        <div className="sitat-styring">
          <button type="button" onClick={() => setIndeks((i) => i - 1)} aria-label="Forrige omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M14 5 7 12l7 7" />
            </svg>
          </button>
          <button type="button" onClick={() => setIndeks((i) => i + 1)} aria-label="Neste omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="m10 5 7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="sitat-teller">{n + 1} / {omtaler.length}</p>
        <p className="etikett" style={{ marginLeft: 'auto' }}>Fra kundene</p>
      </div>
      <blockquote>«{o.sitat}»</blockquote>
      <div className="sitat-kilde">
        <span className="initial" aria-hidden="true">{initial}</span>
        <div>
          <p className="navn">{o.navn}</p>
          <p className="rolle">{o.rolle}</p>
        </div>
      </div>
    </div>
  );
};

/* Arbeidsrutenettet fra studio-mal-demoen (data-arbeider, mal3.src.html
   rundt linje 1360). H-nivået er h2 på denne siden (data-nivaa="2" i
   demoen), fordi seksjonen selv ikke har noen egen H2 over rutenettet.
   Kortets tittel er case-tittelen fra demo-innhold.js: i demoen har
   ARBEIDER-oppføringene sin egen (nesten identiske) tagline, men den
   teksten er ikke del av det ordrett uthentede innholdet, så case-
   tittelen brukes her for begge steder teksten vises. */
const ArbeiderGrid = () => (
  <div className="arbeider">
    {caser.map((c, i) => {
      const p = prosjekter[c.i];
      return (
        <article className="arbeid" key={c.slug} data-reveal>
          <Link to={`/arbeid/${c.slug}`}>
            <div className="ramme">
              <div className="ramme-topp">
                <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                <p>{p.domene}</p>
              </div>
              <div className="ramme-vindu">
                <img
                  src={p.full}
                  alt={`Nettsiden til ${p.navn}`}
                  loading="lazy"
                  width="620"
                  height="2422"
                  style={{ '--til': p.til, animationDelay: `${0.6 + i * 0.7}s`, animationDuration: `${30 + i * 2}s` }}
                />
              </div>
            </div>
            <p className="etikett">{p.bransje}</p>
            <h2>{c.tittel} <span className="ut" aria-hidden="true">→</span></h2>
          </Link>
        </article>
      );
    })}
  </div>
);

const ArbeidPage = () => {
  const container = useReveal(80);

  return (
    <Shell>
      <SEO
        title="Arbeid"
        description="Ekte nettsider i drift for norske bedrifter, pluss konsept-eksempler for ulike bransjer. Se hva jeg har bygget."
        keywords={['nettside portefølje norge', 'webdesign eksempler', 'nettside bedrift']}
        canonical="https://oppskalert.no/arbeid"
        jsonLd={arbeidSchema}
      />

      <div ref={container}>
        <section className="wrap sidetopp">
          <p className="etikett" data-reveal>Arbeid</p>
          <h1 data-reveal>Sider jeg har bygget.</h1>
          <p data-reveal>
            Hagestell, psykologi, foredrag, terapi og rådgivning. Alle sammen norske
            småbedrifter, alle sammen i drift akkurat nå. Rammene ruller gjennom sidene
            slik de står, så du slipper å ta mitt ord for det. Klikk deg gjerne innom,
            de tåler et besøk.
          </p>
        </section>

        <section className="hvit">
          <div className="wrap seksjon">
            <ArbeiderGrid />
          </div>
        </section>

        <section className="sitatblokk" style={{ paddingTop: 'var(--luft)' }}>
          <div className="wrap">
            <SitatKort />
          </div>
        </section>
      </div>

      <BransjeEksempler />

      <DemoSkjema
        tittel="Vil du se hvordan"
        uthevet="din kan bli?"
        lede="Jeg bygger et ferdig utkast med ditt innhold, helt uforpliktende. Liker du det ikke, koster det ingenting."
      />
    </Shell>
  );
};

export default ArbeidPage;
