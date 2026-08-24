import { omtaler } from '../lib/demo-innhold';
import { useKarusell } from '../lib/useKarusell';

/* Sitatkarusellen fra studio-mal-demoen (mal3.src.html, linje 1425).
   Der bygde en vanilla-JS-løkke markupet og byttet tekstinnhold på klikk.

   To ting er endret 24. august 2026. Kortet bytter omtale selv hvert
   syvende sekund, fordi tre av fire besøkende aldri trykket på pilene og
   dermed bare så én av fire omtaler. Og alle fire ligger i DOM-en samtidig,
   stablet i samme rutenettcelle, ikke byttet ut som tekstinnhold: da er
   kortet alltid like høyt som den lengste omtalen, og et bytte flytter
   ingenting på siden. Crawlere får dessuten alle fire sitatene i den
   prerendrede HTML-en i stedet for ett.

   Kilden er festet til bunnlinjen (`1fr auto`) slik at navnet står på samme
   sted i alle fire. Uten det hopper det opp og ned mens teksten toner. */
const Sitatkort = () => {
  const { i, gaa, pauseProps } = useKarusell(omtaler.length, 7000);

  return (
    <div className="sitatkort inn" data-reveal {...pauseProps}>
      <div className="sitat-topp">
        <div className="sitat-styring">
          <button type="button" onClick={() => gaa(-1)} aria-label="Forrige omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M14 5 7 12l7 7" />
            </svg>
          </button>
          <button type="button" onClick={() => gaa(1)} aria-label="Neste omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="m10 5 7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="sitat-teller">{i + 1} / {omtaler.length}</p>
        <p className="etikett" style={{ marginLeft: 'auto' }}>Fra kundene</p>
      </div>

      <div className="sitat-scene">
        {omtaler.map((o, n) => (
          <div
            key={o.navn}
            className={n === i ? 'sitat-slide aktiv' : 'sitat-slide'}
            aria-hidden={n !== i}
          >
            <blockquote>«{o.sitat}»</blockquote>
            <div className="sitat-kilde">
              <span className="initial" aria-hidden="true">
                {o.navn.split(' ').map((d) => d[0]).slice(0, 2).join('')}
              </span>
              <div>
                <p className="navn">{o.navn}</p>
                <p className="rolle">{o.rolle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sitatkort;
