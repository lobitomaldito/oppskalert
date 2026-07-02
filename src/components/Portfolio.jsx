import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

const projects = [
  { img: "/websider/oppskalert.png", name: "Oppskalert", url: "https://oppskalert.no" },
  { img: "/websider/alpha-negotiations.png", name: "Alpha Negotiations", url: "https://alphanegotiations.com" },
  { img: "/websider/katrin-brubakk.png", name: "Katrin Brubakk", url: "https://katrinbrubakk.no" },
  { img: "/websider/steinar-husby.png", name: "Steinar Husby", url: "https://steinarhusby.no" },
  { img: "/websider/samtaleverkstedet.jpg", name: "Samtaleverkstedet", url: "https://samtaleverkstedet.no" },
  { img: "/websider/tore-sunde-rasmussen.png", name: "Tore Sunde-Rasmussen", url: "https://toresunderasmussen.no" },
  { img: "/websider/irmelin-drake-ny.png", name: "Irmelin Drake", url: "https://irmelindrake.no" },
  { img: "/websider/progressive-diplomacy.png", name: "Progressive Diplomacy", url: "https://progressivediplomacy.com" },
];

const Portfolio = () => {
  const container = useReveal(80);
  const viewport = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    // Infinite horizontal scroll. Same technique as Testimonials: the list is
    // doubled and we translate the track by exactly -50% of its own width, so
    // the second copy lands precisely where the first began — a seamless loop.
    // Per-card margins (not flex gap) keep that halfway point exact.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.to(track.current, { x: '-50%', duration: 55, ease: 'none', repeat: -1 });
      const vp = viewport.current;
      const pause = () => tween.pause();   // hold still so cards are easy to click
      const play = () => tween.play();
      vp.addEventListener('pointerenter', pause);
      vp.addEventListener('pointerleave', play);
      return () => { tween.kill(); vp.removeEventListener('pointerenter', pause); vp.removeEventListener('pointerleave', play); };
    });
    // Reduced motion: don't animate — let the row be scrolled by hand instead.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      viewport.current.classList.add('overflow-x-auto');
    });
    return () => mm.revert();
  }, []);

  const doubled = [...projects, ...projects];

  return (
    <section ref={container} className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-24 mb-12" data-reveal>
        <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter text-balance">Noe av det vi har laget.</h2>
        <p className="font-mono text-sm md:text-base text-white/70 mt-5 max-w-md leading-relaxed">Ekte sider, for ekte norske bedrifter — trykk for å besøke dem.</p>
      </div>

      <div ref={viewport} className="relative overflow-hidden">
        {/* Edge fades så kortene tones ut i kantene */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-28 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-28 z-10 bg-gradient-to-l from-background to-transparent" />

        <div ref={track} className="flex w-max will-change-transform">
          {doubled.map((p, i) => {
            const isClone = i >= projects.length;
            return (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={isClone ? true : undefined}
                tabIndex={isClone ? -1 : undefined}
                className="group relative flex-shrink-0 w-[260px] sm:w-[320px] mx-2 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background via-background/70 to-transparent pt-10 pb-3 px-4">
                  <span className="font-sans font-bold text-white text-sm">{p.name}</span>
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
