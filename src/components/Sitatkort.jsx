import { useState } from 'react';
import { googleOmtaler, omtaler } from '../lib/demo-innhold';
import { vurdering } from '../lib/site';
import { Pause, PilOpp, Spill } from './Ikon';

/* Alle omtalene i kolonner som ruller sakte oppover (ønsket av Aleksander
   4.11.2026, mønsteret er «testimonials columns» fra 21st.dev).

   Google-omtalene først, så de direkte sitatene fra kunder som ikke har
   skrevet på Google. Samme person står aldri to ganger.

   Sløyfen er ren CSS, så den virker uten JavaScript (regel 5): hvert spor
   har kortene to ganger og flyttes halve høyden sin. Kopien er skjult for
   skjermlesere. JavaScript styrer bare pauseknappen, som WCAG 2.2.2 krever
   for bevegelse over fem sekunder. Musepeker over kortene pauser også.

   Desktop har tre kolonner med ulik fart, mobil én kolonne med alle. De to
   oppsettene er hver sin liste, skjult med display: none på den andre
   bredden, så skjermlesere bare møter én av dem. */
const googleNavn = new Set(googleOmtaler.map((o) => o.navn));
const alle = [...googleOmtaler, ...omtaler.filter((o) => !googleNavn.has(o.navn))];
const kolonner = [0, 1, 2].map((k) => alle.filter((_, i) => i % 3 === k));

/* Stjernene er dekor for skjermlesere: tallet står alltid i teksten ved
   siden av, ellers leses «stjerne stjerne stjerne» opp. */
export const Stjerner = ({ score }) => (
  <span className="stjerner" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg key={n} viewBox="0 0 24 24" className={n <= Math.round(score) ? 'fylt' : ''}>
        <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" />
      </svg>
    ))}
  </span>
);

const Kort = ({ o, skjult }) => (
  <li className="omtale" aria-hidden={skjult || undefined}>
    {o.stjerner && (
      <p className="omtale-stjerner">
        <Stjerner score={o.stjerner} />
        <span className="skjult">{o.stjerner} av 5 stjerner</span>
      </p>
    )}
    <blockquote>«{o.sitat}»</blockquote>
    <div className="sitat-kilde">
      <span className="initial" aria-hidden="true">
        {o.navn.split(/[\s-]/).map((d) => d[0]).slice(0, 2).join('')}
      </span>
      <div>
        <p className="navn">{o.navn}</p>
        <p className="rolle">{o.rolle}</p>
      </div>
    </div>
  </li>
);

const Kolonne = ({ liste, fart }) => (
  <div className="omtale-kolonne">
    <ul className="omtale-spor" style={{ '--fart': fart }}>
      {liste.map((o) => <Kort key={o.navn} o={o} />)}
      {liste.map((o) => <Kort key={`kopi-${o.navn}`} o={o} skjult />)}
    </ul>
  </div>
);

const Sitatkort = () => {
  const [pause, setPause] = useState(false);
  const score = vurdering && String(vurdering.score).replace('.', ',');

  return (
    <div className="omtaler" data-reveal>
      <div className="omtaler-topp">
        <div>
          <p className="etikett">Fra kundene</p>
          {vurdering && (
            <p className="omtaler-score">
              <span className="omtaler-tall">{score}</span>
              <span>
                <Stjerner score={vurdering.score} />
                <span className="omtaler-antall">
                  av 5 på {vurdering.kilde}
                </span>
              </span>
            </p>
          )}
        </div>
        {vurdering?.url && (
          <a href={vurdering.url} target="_blank" rel="noopener noreferrer" className="omtaler-lenke">
            Se omtalene på Google <PilOpp />
            <span className="skjult"> (åpnes i ny fane)</span>
          </a>
        )}
      </div>

      <div className={pause ? 'omtaler-vegg er-pauset' : 'omtaler-vegg'}>
        <div className="omtaler-kolonner" role="region" aria-label="Omtaler fra kunder">
          {kolonner.map((liste, i) => (
            <Kolonne key={i} liste={liste} fart={['46s', '58s', '52s'][i]} />
          ))}
        </div>
        <div className="omtaler-mobil" role="region" aria-label="Omtaler fra kunder">
          <Kolonne liste={alle} fart="130s" />
        </div>
        <button type="button" className="galleri-pause" aria-pressed={pause} onClick={() => setPause((p) => !p)}>
          {pause ? <><Spill /> Spill av</> : <><Pause /> Pause</>}
        </button>
      </div>
    </div>
  );
};

export default Sitatkort;
