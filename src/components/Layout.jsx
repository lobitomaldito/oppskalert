import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { kontakt, navLenker, ruter } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

/* Uten dette beholder React Router scrollposisjonen mellom ruter, så du
   lander midt på prissiden når du klikker deg dit fra bunnen av forsiden.
   Ankerlenker (#faq) får stå i fred. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }, [pathname, hash]);
  return null;
};

/* Ett navigasjonsoppsett for hele siden. Før lå det to ulike navbarer
   i App.jsx og VårtArbeidPage.jsx, med forskjellige lenker. Det er
   grunnen til at "Løsninger" og "Filosofi" pekte på seksjoner som ikke
   fantes lenger. */
export const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lukk = () => setMenuOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onUpdate: (self) => {
          gsap.to(navRef.current, {
            backgroundColor: self.isActive ? 'rgba(79, 71, 137, 0.90)' : 'rgba(79, 71, 137, 0)',
            backdropFilter: self.isActive ? 'blur(8px)' : 'blur(0px)',
            borderColor: self.isActive ? 'rgba(255, 253, 237, 0.12)' : 'rgba(255, 253, 237, 0)',
            duration: 0.3,
          });
        },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Escape lukker menyen. Standard nødutgang for et åpent overlegg.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-primary ${isActive ? 'text-accent' : 'text-primary/70'}`;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-nav flex items-center justify-between gap-6 px-6 py-3 rounded-full border border-transparent w-[92%] max-w-[68rem] text-primary"
      >
        <Link to={ruter.hjem} className="font-display font-extrabold text-2xl tracking-tight lowercase flex-shrink-0">
          oppskalert<span className="text-accent">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 font-body text-xs uppercase tracking-widest">
          {navLenker.map((l) => (
            <NavLink key={l.label} to={l.to} className={linkClass}>{l.label}</NavLink>
          ))}
        </div>

        <Link
          to={ruter.kontakt}
          className="hidden sm:inline-flex items-center gap-2 flex-shrink-0 bg-accent text-background px-5 py-2.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03]"
        >
          Gratis demo
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-1 text-current"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-0 z-meny pt-24 pb-8 px-6 bg-background/95 backdrop-blur-md border-b border-primary/10"
        >
          <div className="flex flex-col max-w-[68rem] mx-auto">
            {navLenker.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                onClick={lukk}
                className="font-body text-sm uppercase tracking-widest text-primary/80 hover:text-primary py-4 border-b border-primary/10 transition-colors"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to={ruter.kontakt}
              onClick={lukk}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-accent text-background px-6 py-4 rounded-full font-sans font-bold text-base"
            >
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export const Footer = () => (
  <footer className="bg-deep text-primary pt-20 pb-8">
    <div className="wrap">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-14 border-b border-primary/10">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-[1.05] max-w-[16ch]">
          La oss bygge noe bra sammen.
        </h2>
        <Link
          to={ruter.kontakt}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-background px-8 py-4 rounded-full font-sans font-bold text-base hover:scale-[1.03] transition-transform duration-300"
        >
          Bestill gratis demo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10 pt-12">
        <div className="max-w-xs">
          <span className="font-display font-extrabold text-2xl tracking-tight lowercase block mb-2">
            oppskalert<span className="text-accent">.</span>
          </span>
          <p className="font-body text-primary/70 text-sm leading-relaxed">
            Norsk webutvikling. Én person, hele jobben, fra første skisse til ferdig nettside.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-14 gap-y-8 font-body text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-primary/70 uppercase tracking-widest text-xs font-semibold mb-1">Kontakt</span>
            <span className="text-primary/70">{kontakt.navn}</span>
            <a href={`tel:${kontakt.tel}`} className="text-primary hover:text-accent transition-colors">{kontakt.telefon}</a>
            <a href={`mailto:${kontakt.epost}`} className="text-accent hover:text-highlight transition-colors">{kontakt.epost}</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary/70 uppercase tracking-widest text-xs font-semibold mb-1">Snarveier</span>
            {navLenker.map((l) => (
              <Link key={l.label} to={l.to} className="text-primary/70 hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary/70 uppercase tracking-widest text-xs font-semibold mb-1">Verktøy</span>
            <Link to={ruter.kalkulator} className="text-primary/70 hover:text-primary transition-colors">Priskalkulator</Link>
            <Link to={ruter.drift} className="text-primary/70 hover:text-primary transition-colors">Drift og support</Link>
            <Link to={ruter.seo} className="text-primary/70 hover:text-primary transition-colors">Søkemotoroptimalisering</Link>
            <Link to={ruter.sammenlign} className="text-primary/70 hover:text-primary transition-colors">Sammenlign</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary/70 uppercase tracking-widest text-xs font-semibold mb-1">Selskap</span>
            <span className="text-primary/70">Orgnr {kontakt.orgnr}</span>
            <span className="text-primary/70">{kontakt.sted}</span>
            <span className="text-primary/70">Et datterselskap av<br />{kontakt.morselskap}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-primary/10 flex flex-wrap gap-4 justify-between items-center font-body text-xs text-primary/70">
        <p>&copy; {new Date().getFullYear()} {kontakt.morselskap}.</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
          <span>Ledig for nye prosjekter</span>
        </div>
      </div>
    </div>
  </footer>
);

/* Felles skall: nav på toppen, innhold, fot. Alle ruter bruker denne,
   så navigasjonen aldri kommer ut av synk mellom sidene igjen. */
export const Shell = ({ children }) => (
  <div className="bg-background text-primary min-h-screen selection:bg-accent selection:text-background">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

/* Sidetopp. Samme anslag på alle undersider. Tittelen tar ett
   fremhevet ord i aksentfarge, slik forsiden gjør. */
export const SideTopp = ({ tittel, uthevet, lede }) => (
  <header className="wrap pt-36 md:pt-44 pb-8 md:pb-12">
    <h1 className="hero-elem font-display font-extrabold text-[clamp(2.6rem,6.5vw,4.6rem)] leading-[1.02] tracking-[-0.035em] max-w-[16ch]">
      {tittel}{uthevet && <> <span className="text-accent">{uthevet}</span></>}
    </h1>
    {lede && (
      <p className="hero-elem font-body text-base md:text-lg text-primary/80 mt-6 max-w-[52ch] leading-relaxed">
        {lede}
      </p>
    )}
  </header>
);

/* Seksjonstopp. Bevisst UTEN den lille uppercase-eyebrowen over hver
   seksjon. DESIGN.md ber om at de tynnes ut, ikke multipliseres. */
export const SeksjonTopp = ({ tittel, uthevet, lede, midtstilt = false }) => (
  <div className={`mb-10 md:mb-14 ${midtstilt ? 'text-center mx-auto max-w-2xl' : ''}`}>
    <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.03em]">
      {tittel}{uthevet && <> <span className="text-accent">{uthevet}</span></>}
    </h2>
    {lede && (
      <p className={`font-body text-[0.95rem] md:text-base text-primary/80 mt-4 leading-relaxed max-w-[54ch] ${midtstilt ? 'mx-auto' : ''}`}>
        {lede}
      </p>
    )}
  </div>
);
