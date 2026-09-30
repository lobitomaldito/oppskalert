import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { prosjekter } from '../lib/site';
import { caser } from '../lib/demo-innhold';

/* Galleriveggen i heroen: tre kolonner med kundesider som glir forbi,
   hver av dem fotografert på en laptop eller en telefon.

   Flisene er ferdige bilder i public/websider/vegg, laget av
   scripts/vegg-mockups.py: settingen er generert, men skjermen i hvert
   bilde er det ekte skjermbildet av kundens side, lagt inn etterpå.

   Ren CSS-animasjon. Hvert spor inneholder flisene to ganger og flyttes
   nøyaktig halve høyden sin, så sløyfen er sømløs uten JavaScript.
   JavaScript gjør bare to ting: pauseknappen (WCAG 2.2.2 krever at
   bevegelse over fem sekunder kan stoppes) og pause når veggen er ute av
   skjermen.

   Veggen er dekor og skjult for skjermlesere. De samme prosjektene står
   med tekst og lenker i «Arbeider» lenger ned, derfor tabIndex -1 her. */

/* [slug, enhet, form]. Slug og enhet gir filnavnet, form er høyden på
   flisa og må stemme med formatet bildet ble laget i: flis-kvadrat 1:1,
   flis-hoy 2:3, tom 4:5. Ingen slug står to ganger i samme kolonne.

   Klassenavnene står fullt utskrevet med vilje. Tailwind fjerner regler
   i @layer components som den ikke finner ordrett i kildekoden, så
   `flis-${form}` gir fliser uten høyde, uten en feilmelding. */
const KOLONNER = [
  [['woxen-hage', 'pc', 'flis-kvadrat'], ['katrin-brubakk', 'mobil', 'flis-hoy'], ['alpha-negotiations', 'pc', ''], ['steinar-husby', 'mobil', 'flis-hoy']],
  [['melanie-dahl', 'mobil', 'flis-hoy'], ['appstart', 'pc', 'flis-kvadrat'], ['tore-sunde-rasmussen', 'mobil', 'flis-hoy'], ['progressive-diplomacy', 'pc', '']],
  [['samtaleverkstedet', 'pc', ''], ['kolflaath', 'mobil', 'flis-hoy'], ['katrin-brubakk', 'pc', 'flis-kvadrat'], ['woxen-hage', 'mobil', 'flis-hoy']],
];

const HOYDE = { 'flis-kvadrat': 480, 'flis-hoy': 720, '': 600 };

const Flis = ({ slug, enhet, form }) => {
  const p = prosjekter.find((x) => x.slug === slug);
  if (!p) return null;
  const bilde = (
    <img src={`/websider/vegg/${slug}-${enhet}.webp`} alt="" width="480" height={HOYDE[form]} decoding="async" />
  );
  return caser.some((c) => c.slug === slug) ? (
    <Link className={`flis ${form}`} to={`/arbeid/${slug}`} tabIndex={-1}>{bilde}</Link>
  ) : (
    <a className={`flis ${form}`} href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1}>{bilde}</a>
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
                <Flis key={i} slug={slug} enhet={enhet} form={form} />
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
