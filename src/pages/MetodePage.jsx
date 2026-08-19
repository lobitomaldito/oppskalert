import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import { ruter } from '../lib/site';
import { stegene, omtaler } from '../lib/demo-innhold';

/* Sitatkort med to piler som blar gjennom omtaler. Samme data og samme
   frem/tilbake-logikk som studio-mal-demoen sin data-sitatkort, portert
   til React state i stedet for direkte DOM-manipulasjon. */
const SitatKort = () => {
  const [n, setN] = useState(0);
  const omtale = omtaler[n];
  const initial = omtale.navn.split(' ').map((d) => d[0]).slice(0, 2).join('');
  const skift = (retning) => setN((i) => (i + retning + omtaler.length) % omtaler.length);

  return (
    <div className="sitatkort paa-blekk inn">
      <div className="sitat-topp">
        <div className="sitat-styring">
          <button type="button" onClick={() => skift(-1)} aria-label="Forrige omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M14 5 7 12l7 7" />
            </svg>
          </button>
          <button type="button" onClick={() => skift(1)} aria-label="Neste omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="m10 5 7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="sitat-teller">{n + 1} / {omtaler.length}</p>
        <p className="etikett" style={{ marginLeft: 'auto' }}>Ord fra folk jeg har jobbet for</p>
      </div>
      <blockquote>«{omtale.sitat}»</blockquote>
      <div className="sitat-kilde">
        <span className="initial" aria-hidden="true">{initial}</span>
        <div>
          <p className="navn">{omtale.navn}</p>
          <p className="rolle">{omtale.rolle}</p>
        </div>
      </div>
    </div>
  );
};

const MetodePage = () => (
  <Shell>
    <SEO
      title="Metode"
      description="Slik jobber jeg: jeg bygger en ferdig demo av din nye nettside gratis, du gir tilbakemelding, jeg lanserer. Null risiko før du har sett resultatet."
      keywords={['gratis nettside demo', 'prosess webutvikling', 'nettside uten binding']}
      canonical="https://oppskalert.no/metode"
    />

    <section className="wrap sidetopp">
      <p className="etikett inn">Metode</p>
      <h1 className="inn" style={{ '--d': '60ms' }}>Du ser resultatet før du betaler.</h1>
      <p className="inn" style={{ '--d': '140ms' }}>
        Fire steg. De tre første koster deg ingenting, og det første er ferdig innen tre
        virkedager. Det er ikke et salgstriks, det er bare den eneste måten jeg vet å
        bevise at det er verdt pengene, i stedet for å påstå det.
      </p>
    </section>

    <section className="hvit">
      <div className="wrap seksjon">
        <div className="tjeneste-rad">
          <div className="tjeneste-side inn">
            <p className="etikett">Slik går det til</p>
            <Link className="knapp" to={ruter.kontakt}>Kom i gang <span className="pil" aria-hidden="true">↗</span></Link>
          </div>
          <ol className="nummerert inn" style={{ '--d': '80ms', maxWidth: 'none' }}>
            {stegene.map((s) => (
              <li key={s.navn}>
                <Link to={ruter.kontakt}>
                  <span className="nr" style={{ minWidth: '6.5rem', flex: 'none' }}>{s.tid}</span>
                  <span>
                    <span style={{ display: 'block' }}>{s.navn}</span>
                    <span style={{ display: 'block', fontSize: '.9375rem', color: 'var(--blekk-mykt)', marginTop: '.3rem', maxWidth: '58ch' }}>
                      {s.tekst}
                    </span>
                  </span>
                  <span className="pil" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <section className="sitatblokk" style={{ paddingTop: 'var(--luft)' }}>
      <div className="wrap">
        <SitatKort />
      </div>
    </section>
  </Shell>
);

export default MetodePage;
