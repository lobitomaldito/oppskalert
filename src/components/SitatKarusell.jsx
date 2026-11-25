import { useEffect, useRef, useState } from 'react';
import { omtaler } from '../lib/demo-innhold';
import { useKarusell } from '../lib/useKarusell';

/* Sitatkortet på /arbeid og /metode (Aleksander 25.11.2026: «jeg vil ikke
   måtte trykke på neste anmeldelse selv»). Sitatet skrives ord for ord, står
   ferdig i LESETID, og så kommer neste. Pilene står igjen for den som vil bla.

   Ordene er ren CSS: hvert ord har sin forsinkelse (--i × --ord), og den
   slår inn når sliden får klassen aktiv. Alle omtalene ligger stablet i
   .sitat-scene, så kortet er like høyt som den lengste og siden hopper ikke.
   Klokka starter først når kortet er synlig, ellers er første sitat ferdig
   skrevet før noen ser det. Pause på hover og fokus og stillstand ved
   prefers-reduced-motion kommer fra useKarusell. */
const ORD_MS = 110;
const LESETID = 4500;
const ord = omtaler.map((o) => `«${o.sitat}»`.split(/\s+/));
const varighet = (i) => ord[i].length * ORD_MS + LESETID;

const Pil = ({ d }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d={d} />
  </svg>
);

const SitatKarusell = ({ className = '', ...rest }) => {
  const ref = useRef(null);
  const [iSyne, settISyne] = useState(() => !('IntersectionObserver' in window));

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { settISyne(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const { i, gaa, pauseProps } = useKarusell(omtaler.length, varighet, 0, !iSyne);

  return (
    <div ref={ref} className={`sitatkort ${className}`} {...rest} {...pauseProps}>
      <div className="sitat-topp">
        <div className="sitat-styring">
          <button type="button" onClick={() => gaa(-1)} aria-label="Forrige omtale"><Pil d="M14 5 7 12l7 7" /></button>
          <button type="button" onClick={() => gaa(1)} aria-label="Neste omtale"><Pil d="m10 5 7 7-7 7" /></button>
        </div>
        <p className="sitat-teller">{i + 1} / {omtaler.length}</p>
        <p className="etikett" style={{ marginLeft: 'auto' }}>Fra kundene</p>
      </div>
      <div className="sitat-scene" style={{ '--ord': `${ORD_MS}ms` }}>
        {omtaler.map((o, k) => (
          <div
            key={o.navn}
            className={k === i && iSyne ? 'sitat-slide aktiv' : 'sitat-slide'}
            aria-hidden={k !== i || undefined}
          >
            <blockquote>
              {ord[k].map((w, j) => <span key={j} className="ord" style={{ '--i': j }}>{w} </span>)}
            </blockquote>
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

export default SitatKarusell;
