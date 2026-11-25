import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* En ekte kundeside på en laptop i et lyst verksted, og siden ruller sakte
   nedover inne i skjermen (Aleksander 25.11.2026: forsiden føltes kald og
   manglet bilder). Fotoet er Pexels 6446678 (gratis, ingen kreditt kreves).

   To lag. Bunnen er ett ferdig bilde der toppen av Prana-siden alt står på
   skjermen, så uten JavaScript eller med redusert bevegelse ser man et
   stillbilde (regel 5). Over ligger skjermflaten, bygget i fotoets egne
   koordinater (1600 x 1067, et utsnitt rundt laptopen) og skalert ned til bredden med --s. matrix3d i
   CSS-en legger den inn i skjermens perspektiv, og bildet inni ruller med
   samme rammerull som /arbeid. Hjørnene er målt i fotoet. */
const FOTO_BREDDE = 1600;

const PultMockup = () => {
  const ref = useRef(null);
  /* Skjermbildet hentes først når laptopen nærmer seg. loading="lazy" virker
     ikke her: bildet ligger i et lag som er skalert og vridd, og nettleseren
     regnet det aldri som synlig. */
  const [hent, setHent] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sett = () => el.style.setProperty('--s', el.offsetWidth / FOTO_BREDDE);
    sett();
    el.classList.add('pult-klar');
    const ro = new ResizeObserver(sett);
    ro.observe(el);
    /* Ruller bare mens den synes, som rammene på /arbeid. */
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle('utenfor', !e.isIntersecting);
      if (e.isIntersecting) setHent(true);
    }, { rootMargin: '300px 0px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <section className="seksjon pult-seksjon">
      <figure className="wrap">
        <div ref={ref} className="pult">
          <img
            src="/mockup/atelier-prana-1200.webp"
            srcSet="/mockup/atelier-prana-1200.webp 1200w, /mockup/atelier-prana-1600.webp 1600w"
            sizes="(min-width: 80rem) 75rem, 100vw"
            width="1200"
            height="800"
            alt="Nettsiden til Prana Yoga Studio på en laptop i et lyst verksted."
            loading="lazy"
            decoding="async"
          />
          <div className="pult-lag" aria-hidden="true">
            <div className="pult-skjerm">
              {hent && <img
                src="/websider/full/prana-yoga.webp"
                srcSet="/websider/full/prana-yoga.webp 1x, /websider/full/prana-yoga@2x.webp 2x"
                alt=""
                width="640"
                height="2500"
                decoding="async"
              />}
            </div>
          </div>
        </div>
        <figcaption className="pult-tekst">
          <span>Siden jeg laget for Prana Yoga Studio i Kristiansand.</span>
          <Link to="/arbeid/prana-yoga">Se hele casen</Link>
        </figcaption>
      </figure>
    </section>
  );
};

export default PultMockup;
