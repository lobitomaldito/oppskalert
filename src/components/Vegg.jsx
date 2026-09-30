import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { prosjekter } from '../lib/site';
import { caser } from '../lib/demo-innhold';

/* Galleriveggen i heroen: tre kolonner med kundesider som glir forbi,
   rammet inn i en laptop eller en telefon tegnet i CSS.

   Ren CSS-animasjon. Hvert spor inneholder flisene to ganger og flyttes
   nøyaktig halve høyden sin, så sløyfen er sømløs uten JavaScript.
   JavaScript gjør bare to ting: pauseknappen (WCAG 2.2.2 krever at
   bevegelse over fem sekunder kan stoppes) og pause når veggen er ute av
   skjermen.

   Veggen er dekor og skjult for skjermlesere. De samme prosjektene står
   med tekst og lenker i «Arbeider» lenger ned, derfor tabIndex -1 her. */

/* [slug, enhet, form]. Enhet er pc eller mobil, form styrer høyden på
   flisa: flis-kvadrat 1:1, flis-hoy 2:3, tom 4:5. Ingen slug står to
   ganger i samme kolonne, og nabokolonner starter ikke på samme kunde.

   Klassenavnene står fullt utskrevet med vilje. Tailwind fjerner regler
   i @layer components som den ikke finner ordrett i kildekoden, så
   `flis-${form}` gir fliser uten farge og uten høyde, uten en feilmelding. */
const KOLONNER = [
  [['woxen-hage', 'pc', 'flis-kvadrat'], ['katrin-brubakk', 'mobil', 'flis-hoy'], ['alpha-negotiations', 'pc', ''], ['steinar-husby', 'mobil', 'flis-hoy']],
  [['melanie-dahl', 'mobil', 'flis-hoy'], ['appstart', 'pc', 'flis-kvadrat'], ['tore-sunde-rasmussen', 'mobil', 'flis-hoy'], ['progressive-diplomacy', 'pc', '']],
  [['samtaleverkstedet', 'pc', ''], ['kolflaath', 'mobil', 'flis-hoy'], ['katrin-brubakk', 'pc', 'flis-kvadrat'], ['woxen-hage', 'mobil', 'flis-hoy']],
];

// Bunnfargene går på rundgang, forskjøvet per kolonne så to like aldri
// havner ved siden av hverandre.
const FARGER = ['flis-hvit', 'flis-blekk', 'flis-fersken', 'flis-dyp'];

const Flis = ({ slug, enhet, form, farge }) => {
  const p = prosjekter.find((x) => x.slug === slug);
  if (!p) return null;
  const klasse = `flis ${farge} ${form}`;
  const innhold =
    enhet === 'mobil' ? (
      <span className="enhet-mobil">
        <img src={`/websider/mobil/${slug}.webp`} alt="" width="390" height="844" decoding="async" />
      </span>
    ) : (
      <span className="enhet-pc">
        <span className="enhet-pc-skjerm">
          <img src={p.img} alt="" width="900" height="563" decoding="async" />
        </span>
        <span className="enhet-pc-fot" />
      </span>
    );
  return caser.some((c) => c.slug === slug) ? (
    <Link className={klasse} to={`/arbeid/${slug}`} tabIndex={-1}>{innhold}</Link>
  ) : (
    <a className={klasse} href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1}>{innhold}</a>
  );
};

const Vegg = () => {
  const ref = useRef(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('er-ute', !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={pause ? 'vegg er-pauset' : 'vegg'}>
      <div className="vegg-kolonner" aria-hidden="true">
        {KOLONNER.map((fliser, k) => (
          <div className="vegg-kolonne" key={k}>
            <div className="vegg-spor">
              {[...fliser, ...fliser].map(([slug, enhet, form], i) => (
                <Flis key={i} slug={slug} enhet={enhet} form={form} farge={FARGER[(i + k) % FARGER.length]} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="vegg-pause" aria-pressed={pause} onClick={() => setPause((v) => !v)}>
        {pause ? 'Spill av' : 'Pause'}
        <span className="skjult"> bevegelsen i bildeveggen</span>
      </button>
    </div>
  );
};

export default Vegg;
