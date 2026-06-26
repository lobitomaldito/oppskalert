import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, Linkedin, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import OppskalertFAQ from './components/OppskalertFAQ';
import BransjeEksempler from './components/BransjeEksempler';
import { submitDemoRequest } from './lib/demoRequest';
import { useReveal } from './lib/useReveal';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "Jeg fikk en vennlig henvendelse fra Aleksander i Oppskalert, og ble raskt imponert over kunnskapen og kompetansen deres. Det var lett å si ja til at de skulle oppgradere hjemmesiden min, og jeg er absolutt fornøyd med både samarbeidet og resultatet!", name: "Guro Brakestad", company: "Familieterapeut og foredragsholder" },
  { quote: "Jeg ble veldig fornøyd med resultatet og de leverte raskt!", name: "Katrin Brubakk", company: "katrinbrubakk.no" },
  { quote: "Oppskalert forsto raskt hva vi trengte og leverte en nettside som virkelig representerer oss. Profesjonelt, effektivt og en glede å samarbeide med.", name: "Thoralf Stenvold", company: "Progressive Diplomacy" },
  { quote: "Kjempefornøyd :)", name: "Irmelin Drake", company: "irmelindrake.no" },
];

const Testimonials = () => {
  const track1 = useRef(null);
  const track2 = useRef(null);

  useEffect(() => {
    const tl1 = gsap.to(track1.current, { x: '-50%', duration: 30, ease: 'none', repeat: -1 });
    const tl2 = gsap.to(track2.current, { x: '0%', duration: 35, ease: 'none', repeat: -1, startAt: { x: '-50%' } });
    return () => { tl1.kill(); tl2.kill(); };
  }, []);

  const Card = ({ t }) => (
    <div className="flex-shrink-0 w-80 bg-white/5 border border-white/10 rounded-2xl p-6 mx-3">
      <p className="font-mono text-sm text-white/80 leading-relaxed mb-4">"{t.quote}"</p>
      <div>
        <p className="font-sans font-bold text-white text-sm">{t.name}</p>
        <p className="font-mono text-xs text-white/40">{t.company}</p>
      </div>
    </div>
  );

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Hva kundene sier</span>
        <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter mt-2">De snakker for oss.</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start" ref={track1}>
          {doubled.map((t, i) => <Card key={i} t={t} />)}
        </div>
        <div className="flex items-start" ref={track2}>
          {[...doubled].reverse().map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
};

const navLinks = [
  { label: 'Løsninger', href: '#features' },
  { label: 'Prosess', href: '#prosess' },
  { label: 'Eksempler', href: '#eksempler' },
  { label: 'Vårt arbeid', to: '/vårt-arbeid' },
  { label: 'Blogg', to: '/blogg' },
  { label: 'Kontakt', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'scrolled-nav', targets: navRef.current },
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(79, 71, 137, 0.90)', backdropFilter: 'blur(8px)', color: '#fffded', borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', color: '#fffded', borderColor: 'transparent', duration: 0.3 });
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Close the mobile menu on Escape; standard "emergency exit" for an open overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const renderLink = (l, className, onClick) =>
    l.to
      ? <Link key={l.label} to={l.to} className={className} onClick={onClick}>{l.label}</Link>
      : <a key={l.label} href={l.href} className={className} onClick={onClick}>{l.label}</a>;

  return (
    <>
      <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full border border-transparent transition-all duration-300 w-[90%] max-w-5xl text-white">
        <span className="font-sans font-bold text-2xl tracking-tight lowercase">oppskalert.</span>
        <div className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest">
          {navLinks.map((l) => renderLink(l, 'hover:-translate-y-[1px] transition-transform'))}
        </div>
        <a href="#bestill-demo" className="hidden md:inline-block group relative overflow-hidden bg-surface text-primary border border-white/10 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md text-center">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Bestill demo</span>
          <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-1 text-current"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-0 z-40 pt-24 pb-8 px-6 bg-background/95 backdrop-blur-md border-b border-white/10"
        >
          <div className="flex flex-col max-w-5xl mx-auto">
            {navLinks.map((l) =>
              renderLink(
                l,
                'font-mono text-sm uppercase tracking-widest text-white/80 hover:text-white py-4 border-b border-white/10 transition-colors',
                () => setMenuOpen(false)
              )
            )}
            <a
              href="#bestill-demo"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-accent text-background px-6 py-4 rounded-full font-sans font-bold text-base"
            >
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

const Hero = () => {
  const container = useRef(null);
  const dotRef = useRef(null);
  const wordmarkRef = useRef(null);
  useEffect(() => {
    // matchMedia owns its own cleanup (mm.revert), which both restores the
    // from-state to a visible default and is StrictMode-safe (double-mount).
    // Wrapping gsap.from in a plain gsap.context would leak the matchMedia and
    // could strand the hero headline at opacity:0. Under reduced motion the
    // hero simply renders static and fully visible.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Entrance is a CSS animation (see .hero-elem in index.css) so it can
      // never strand content at opacity:0. GSAP here only drives the looping
      // dot bounce and the scroll-scrubbed wordmark fade.
      gsap.to(dotRef.current, {
        y: -18, duration: 0.4, ease: "power2.out",
        yoyo: true, repeat: -1, repeatDelay: 2, delay: 1.8
      });
      gsap.to(wordmarkRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: "top top", end: "40% top", scrub: true }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full md:h-[100dvh] flex flex-col justify-between overflow-hidden" style={{backgroundColor: '#201335'}}>
      <div className="relative z-10 text-white pt-28 md:pt-32 px-6 md:px-16 lg:px-24">
        <p className="hero-elem font-sans font-bold text-base md:text-lg uppercase tracking-widest text-white/55 mb-5">
          Norsk webutvikling
        </p>
        <h1
          className="hero-elem text-white font-black leading-[0.95]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(48px, 8.5vw, 124px)', letterSpacing: '-0.035em', maxWidth: '15ch' }}
        >
          Nettsider som faktisk <span style={{ color: '#ffb17a' }}>selger</span>.
        </h1>
        <p className="hero-elem font-mono text-base md:text-lg text-white/75 mt-8 max-w-xl leading-relaxed">
          Vi bygger den ferdig, viser deg den gratis, og setter den live på dager — ikke måneder.
        </p>
        <div className="hero-elem mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#bestill-demo" className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300 text-center">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </a>
          <span className="text-white/60 font-mono text-sm">Ingen binding. Ingen risiko.</span>
        </div>
      </div>
      <div ref={wordmarkRef} className="relative z-10 overflow-hidden leading-none select-none flex justify-end pr-6 md:pr-16 lg:pr-24 mt-16 md:mt-0 pb-10">
        <span
          className="font-black text-white"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(60px, 10vw, 160px)', lineHeight: 1, letterSpacing: '-0.04em', paddingBottom: '0.1em' }}
        >
          oppskalert<span ref={dotRef} style={{ color: '#ffb17a', display: 'inline-block' }}>.</span>
        </span>
      </div>
    </section>
  );
};

const ImageWithPlaceholder = ({ src, alt, pos }) => {
  const [error, setError] = useState(false);
  useEffect(() => { setError(false); }, [src]);
  if (!src || error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
        <Fingerprint className="w-12 h-12 text-primary/10 group-hover:scale-110 transition-transform duration-500" />
      </div>
    );
  }
  return <img src={src} alt={alt} className="w-full h-full object-cover" style={{ objectPosition: pos }} onError={() => setError(true)} />;
};
// Removed Statistics component as per user request to move content to Protocol steps.

const MeetUs = () => {
  const container = useReveal(180);

  const members = [
    { name: "Aleksander MacKee", role: "CTO", sub: "AI-ingeniør\nKunderelasjoner", image: "/founders/aleksander.webp", pos: "center 55%", phone: "974 09 897", tel: "+4797409897", linkedin: "https://www.linkedin.com/in/aleks-mackee-bbba9120b/" },
    { name: "Franciscus Drake Bruseth", role: "CEO", sub: "Markedsføring\nProduktuutvikling", image: "/founders/franciscus.webp", pos: "center 25%", phone: "479 10 461", tel: "+4747910461", linkedin: "https://www.linkedin.com/in/franciscus-drake-bruseth-a78b34204/" }
  ];

  return (
    <section id="team" ref={container} className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden rounded-t-[3rem]" style={{backgroundColor: '#f5e6d8'}}>
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center mb-24">
          <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-center text-balance" style={{color: '#201335'}}>Møt oss.</h2>
          <p className="font-mono text-sm md:text-base mt-5 text-center max-w-md leading-relaxed" style={{color: '#201335', opacity: 0.75}}>To gründere bak hver eneste side — og alltid ett telefonnummer unna.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {members.map((member, i) => (
            <div key={i} data-reveal className="flex flex-col items-center text-center">
              <div className="w-full aspect-[3/4] rounded-[2rem] relative overflow-hidden mb-8 group shadow-xl">
                <ImageWithPlaceholder src={member.image} alt={member.name} pos={member.pos} />
              </div>
              <h3 className="font-sans font-bold text-3xl mb-1" style={{color: '#201335'}}>{member.name}</h3>
              <div className="font-mono text-sm uppercase tracking-widest flex flex-col gap-1 mb-4" style={{color: '#8a4d2c'}}>
                <span>{member.role}</span>
                <span className="text-sm md:text-lg italic whitespace-pre-line leading-relaxed" style={{color: '#201335', opacity: 0.72}}>{member.sub}</span>
              </div>
              <div className="flex flex-col items-center gap-1 font-mono text-sm">
                <a href={`tel:${member.tel}`} className="hover:opacity-70 transition-opacity font-semibold" style={{color: '#201335'}}>{member.phone}</a>
                <a href="mailto:team@oppskalert.no" className="hover:opacity-70 transition-opacity" style={{color: '#8a4d2c'}}>team@oppskalert.no</a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} på LinkedIn`} className="inline-flex items-center gap-1.5 mt-2 hover:opacity-70 transition-opacity" style={{color: '#8a4d2c'}}>
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




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

const inputClass =
  "w-full bg-background/5 border border-background/20 rounded-full px-6 py-4 font-mono text-sm text-background placeholder:text-background/55 focus:outline-none focus:border-background/60 transition-colors";

const DemoForm = () => {
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [firma, setFirma] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!navn.trim() || !epost.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await submitDemoRequest({ navn, epost, firma });
      setStatus('success');
    } catch (err) {
      console.error('Demo request failed:', err);
      setStatus('error');
    }
  };

  return (
    <section id="bestill-demo" className="scroll-mt-28 py-32 px-6 md:px-12 lg:px-24 bg-primary relative z-40 rounded-[4rem] text-background overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center w-full">
        <h2 className="font-sans text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-balance">Klar for en nettside som selger?</h2>
        <p className="font-mono text-sm md:text-base text-background/70 max-w-xl mb-10 leading-relaxed">
          Legg igjen navn og e-post, så bygger vi en gratis demo av din nye side. Ingen binding, ingen risiko — vi tar kontakt innen 24 timer.
        </p>

        {status === 'success' ? (
          <div className="w-full bg-background/5 border border-background/20 rounded-3xl p-10">
            <p className="font-sans font-bold text-2xl mb-2">Takk! Vi har mottatt forespørselen din.</p>
            <p className="font-mono text-sm text-background/60 leading-relaxed">
              Vi tar kontakt på e-post innen 24 timer. Haster det? Ring oss på{' '}
              <a href="tel:+4797409897" className="underline hover:text-background transition-colors">974 09 897</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4 text-left">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={navn}
                onChange={(e) => { setNavn(e.target.value); if (status === 'error') setStatus('idle'); }}
                placeholder="Navn *"
                aria-label="Navn"
                autoComplete="name"
                className={inputClass}
              />
              <input
                type="email"
                value={epost}
                onChange={(e) => { setEpost(e.target.value); if (status === 'error') setStatus('idle'); }}
                placeholder="E-post *"
                aria-label="E-post"
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              placeholder="Firma (valgfritt)"
              aria-label="Firma"
              autoComplete="organization"
              className={inputClass}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative overflow-hidden bg-background text-primary px-10 py-5 rounded-full font-sans font-bold text-lg transition-transform hover:scale-[1.02] duration-300 disabled:opacity-60 disabled:hover:scale-100 mt-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === 'sending' ? 'Sender …' : <>Bestill gratis demo <ArrowRight className="w-5 h-5" /></>}
              </span>
            </button>
            {status === 'error' && (
              <p className="font-mono text-sm text-red-600 text-center">
                Fyll inn navn og en gyldig e-post, så prøver vi igjen. Eller ring oss på{' '}
                <a href="tel:+4797409897" className="underline">974 09 897</a>.
              </p>
            )}
            <p className="font-mono text-xs text-background/40 text-center mt-1">
              Eller ring oss direkte:{' '}
              <a href="tel:+4797409897" className="text-background/70 hover:text-background transition-colors">974 09 897</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-background text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 relative z-40 mt-[-4rem]">
      <div className="max-w-5xl mx-auto">
        {/* CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <h2 className="font-sans font-black text-4xl md:text-6xl tracking-tighter text-white leading-none text-balance" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
              La oss bygge<br />noe bra sammen.
            </h2>
          </div>
          <a href="#bestill-demo" className="flex-shrink-0 flex items-center gap-2 bg-accent text-background px-8 py-4 rounded-full font-sans font-bold text-base hover:scale-[1.03] transition-transform duration-300">
            Bestill gratis demo <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Info */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pt-12">
          <div>
            <span className="font-sans font-bold text-2xl tracking-tight lowercase block mb-1">oppskalert.</span>
            <p className="font-mono text-white/55 text-xs">et datterselskap av PotentialAIze AS</p>
          </div>
          <div className="flex gap-16 font-mono text-sm">
            <div className="flex flex-col gap-3">
              <span className="text-white/55 uppercase tracking-widest text-xs font-semibold mb-1">Kontakt</span>
              <a href="tel:+4797409897" className="text-white hover:text-accent transition-colors">974 09 897</a>
              <a href="tel:+4747910461" className="text-white hover:text-accent transition-colors">479 10 461</a>
              <a href="mailto:team@oppskalert.no" className="text-accent hover:text-highlight transition-colors">team@oppskalert.no</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white/55 uppercase tracking-widest text-xs font-semibold mb-1">Selskap</span>
              <span className="text-white/50">Orgnr: 935 067 049</span>
              <span className="text-white/50">Oslo, Norge</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center font-mono text-xs text-white/55">
          <p>&copy; {new Date().getFullYear()} PotentialAIze AS.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse"></div>
            <span>SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const services = [
  { n: "01", title: "Konverteringsdesign", desc: "Sider bygget for å få besøkende til å ta kontakt — ikke bare se pene ut. Hvert element har én jobb: å skape kunder." },
  { n: "02", title: "Lynrask ytelse", desc: "Sider som laster på under ett sekund. Google belønner det, og besøkende blir værende i stedet for å forsvinne." },
  { n: "03", title: "SEO fra bunnen", desc: "Riktig struktur, metadata og innhold fra dag én, slik at de rette kundene finner deg når de søker på Google." },
  { n: "04", title: "Mobil-først", desc: "Perfekt på alle skjermer. 7 av 10 besøk skjer på mobil — siden din skal selge der folk faktisk er." },
  { n: "05", title: "Drift & support", desc: "Vi holder siden oppdatert, rask og sikker etter lansering, så du kan fokusere på å drive bedriften din." },
];

const Services = () => {
  const container = useReveal(90);

  return (
    <section id="features" ref={container} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background text-white overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto mb-14 md:mb-20">
        <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter text-balance">Alt en side trenger for å selge.</h2>
        <p className="font-mono text-sm md:text-base text-white/70 mt-5 max-w-md leading-relaxed">Fem ting vi bygger inn i hver eneste side — så den faktisk gjør jobben sin.</p>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <div
            key={i}
            data-reveal
            className="group grid grid-cols-1 md:grid-cols-[1fr_1.25fr] gap-x-10 gap-y-3 py-8 md:py-10 border-t border-white/10 last:border-b transition-colors duration-300 hover:border-accent/40"
          >
            <h3 className="font-sans font-bold text-3xl md:text-4xl tracking-tight leading-[1.05] group-hover:text-accent transition-colors duration-300">{s.title}</h3>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed md:pt-2 md:max-w-md">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const steps = [
  { title: "Demo", desc: "Vi bygger en ferdig demo av din nye side — før du betaler en krone. Du ser resultatet, ikke et tilbud." },
  { title: "Tilbakemelding", desc: "Du sier hva du liker og hva som skal endres. Vi justerer til det sitter perfekt." },
  { title: "Lansering", desc: "Vi setter siden live — raskt og riktig, med SEO, sikkerhet og mobil på plass fra start." },
  { title: "Vekst", desc: "Vi følger opp med drift, oppdateringer og forbedringer, så siden fortsetter å levere." },
];

const Process = () => {
  const container = useReveal(110);
  const last = steps.length - 1;

  return (
    <section id="prosess" ref={container} className="py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#f5e6d8' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-20">
          <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter text-balance" style={{ color: '#201335' }}>Fra idé til ferdig på dager.</h2>
          <p className="font-mono text-sm md:text-base mt-5 max-w-md leading-relaxed" style={{ color: '#201335', opacity: 0.75 }}>Fire enkle steg fra første prat til en side som er live — på dager, ikke måneder.</p>
        </div>

        <ol className="relative flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-0">
          {steps.map((s, i) => (
            <li key={i} data-reveal className="relative flex gap-5 md:block">
              {/* Step marker + connecting rail */}
              <div className="relative flex-shrink-0 md:mb-6">
                {/* Desktop: numbered node + horizontal rail to the next step */}
                <div className="hidden md:flex md:items-center">
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-full font-sans font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: '#8a4d2c', color: '#fffded' }}
                  >
                    {i + 1}
                  </span>
                  {i < last && <span className="h-px flex-1 ml-4" style={{ backgroundColor: 'rgba(138,77,44,0.3)' }} />}
                </div>
                {/* Mobile: numbered node + vertical rail down to the next step */}
                <div className="md:hidden relative flex flex-col items-center h-full">
                  <span
                    className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full font-sans font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: '#8a4d2c', color: '#fffded' }}
                  >
                    {i + 1}
                  </span>
                  {i < last && <span className="absolute top-12 bottom-[-2.5rem] w-px" style={{ backgroundColor: 'rgba(138,77,44,0.3)' }} />}
                </div>
              </div>

              {/* Step content */}
              <div className="md:pr-8 pt-1.5 md:pt-0 pb-1">
                <h3 className="font-sans font-bold text-xl md:text-2xl mb-2" style={{ color: '#201335' }}>{s.title}</h3>
                <p className="font-mono text-sm leading-relaxed" style={{ color: '#201335', opacity: 0.78 }}>{s.desc}</p>
                {i === 0 && (
                  <span
                    className="inline-flex items-center font-mono text-[0.7rem] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mt-3"
                    style={{ backgroundColor: 'rgba(138,77,44,0.12)', color: '#8a4d2c' }}
                  >
                    Gratis · ingen binding
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const stats = [
  { value: "< 1s", label: "Lastetid på sidene vi bygger" },
  { value: "100%", label: "Responsivt på mobil, nettbrett og desktop" },
  { value: "0 kr", label: "I binding — du eier alt selv" },
];

const Stats = () => {
  const container = useReveal(120);

  return (
    <section ref={container} className="py-20 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#4f4789' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((s, i) => (
          <div key={i} data-reveal className="flex flex-col items-center gap-3">
            <span className="font-sans font-black text-6xl md:text-7xl tracking-tighter text-white">{s.value}</span>
            <span className="font-mono text-sm text-white/60 max-w-[18ch] leading-relaxed">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Oppskalert",
  "image": "https://oppskalert.no/oppskalert%20fav.png",
  "description": "Vi bygger lynraske nettsider og konverterende systemer som skalerer norske bedrifter.",
  "url": "https://oppskalert.no",
  "telephone": "+4797409897",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ostadalsveien 66",
    "addressLocality": "Oslo",
    "postalCode": "0753",
    "addressCountry": "NO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 59.9482,
    "longitude": 10.6483
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://oppskalert.no"
  ]
};

const Home = () => (
  <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
    <SEO 
      title="Nettsider som faktisk selger" 
      description="Vi bygger lynraske, konverteringsoptimaliserte nettsider og systemer som skalerer norske bedrifter. Ingen binding, ingen risiko. Få en gratis demo i dag." 
      keywords={["nettside bedrift", "billig nettside norge", "webutvikling norge", "mobilhastighet nettside"]}
      canonical="https://oppskalert.no/"
      jsonLd={homeSchema}
    />
    <Navbar />
    <main>
      <Hero />
      <Portfolio />
      <BransjeEksempler />
      <Stats />
      <MeetUs />
      <Process />
      <Services />
      <Testimonials />
      <OppskalertFAQ />
      <DemoForm />
    </main>
    <Footer />
  </div>
);

function App() {
  return <Home />;
}

export default App;
