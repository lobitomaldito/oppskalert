import { useEffect, useRef } from 'react';

/* Stum filmsløyfe som bare spilles mens den er synlig og `spill` er sann.
   Ved prefers-reduced-motion startes den aldri, så plakaten (eller bildet
   under) blir stående. Brukt for Prana-filmen i bildestripa på forsiden
   og i rammen på case-siden (23.11.2026). */
const Film = ({ spill = true, ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !spill || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v?.pause();
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [spill]);
  return <video ref={ref} muted loop playsInline preload="none" aria-hidden="true" {...rest} />;
};

export default Film;
