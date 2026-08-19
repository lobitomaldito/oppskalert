import { useState } from 'react';
import { omtaler } from '../lib/demo-innhold';

/* Sitatkarusellen fra studio-mal-demoen (mal3.src.html, linje 1425).
   Der bygde en vanilla-JS-løkke markupet og byttet tekstinnhold på
   klikk, her er det React-state som styrer hvilken omtale som vises.
   Wrapper alltid rundt, aldri null, så pilene fungerer i begge
   retninger uansett hvor i listen du står. */
const Sitatkort = () => {
  const [i, setI] = useState(0);
  const gaa = (retning) => setI((n) => (n + retning + omtaler.length) % omtaler.length);
  const o = omtaler[i];
  const initial = o.navn.split(' ').map((d) => d[0]).slice(0, 2).join('');

  return (
    <div className="sitatkort paa-blekk inn" data-reveal>
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
        <p className="etikett" style={{ marginLeft: 'auto' }}>Ord fra folk jeg har jobbet for</p>
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

export default Sitatkort;
