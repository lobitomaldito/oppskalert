import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { kontakt, navLenker, ruter } from '../lib/site';
import { RUTE_VANLIGE_SPORSMAL } from '../lib/populaere-sok';
import { cn } from '../lib/utils';

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
   fantes lenger.

   Studio-mal-redesignet (19. august 2026) dropper den svevende,
   scroll-fargede pillen: skallet veksler mellom mørkt og lyst felt seksjon
   for seksjon, og en nav som toner mellom to fargesett samtidig som
   innholdet under den bytter, blir uleselig i overgangen. Navbaren står nå
   fast på hvitt (--surface) med mørk skrift (--room-ink) uansett hva som
   ruller forbi under, med en tynn bunnkant som vises etter første scroll. */
export const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lukk = () => setMenuOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onUpdate: (self) => setScrolled(self.isActive),
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
    `transition-colors duration-200 hover:text-room-ink ${isActive ? 'text-room-ink font-semibold' : 'text-room-ink/60'}`;

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 inset-x-0 z-nav flex items-center justify-between gap-6 px-6 md:px-10 py-4 bg-surface text-room-ink transition-shadow duration-300',
          scrolled ? 'shadow-[0_1px_0_rgb(var(--room-ink)/0.1)]' : '',
        )}
      >
        <Link to={ruter.hjem} className="font-display font-extrabold text-2xl tracking-tight lowercase flex-shrink-0">
          oppskalert<span className="text-room-signal">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 font-body text-sm">
          {navLenker.map((l) => (
            <NavLink key={l.label} to={l.to} className={linkClass}>{l.label}</NavLink>
          ))}
        </div>

        <Link
          to={ruter.kontakt}
          className="hidden sm:inline-flex items-center gap-2 flex-shrink-0 bg-room-ink text-surface px-5 py-2.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03]"
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
          className="lg:hidden fixed inset-x-0 top-[64px] z-meny pt-4 pb-8 px-6 bg-surface text-room-ink border-b border-room-ink/10"
        >
          <div className="flex flex-col max-w-[68rem] mx-auto">
            {navLenker.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                onClick={lukk}
                className="font-body text-base text-room-ink/80 hover:text-room-ink py-4 border-b border-room-ink/10 transition-colors"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to={ruter.kontakt}
              onClick={lukk}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-room-ink text-surface px-6 py-4 rounded-full font-sans font-bold text-base"
            >
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

/* Ordmerket nederst skal fylle hele bredden av wrap-kolonnen, uansett
   skjermbredde. Første forsøk målte bredden i DOM-en med JS og regnet
   font-size ut derfra, men landet på font-size: 0px i praksis (raste
   sammen til usynlig ved mount, aldri korrigert). Samme løsning som
   heroens vannmerke bruker allerede og som er bevist å virke: en ren
   CSS clamp() i vw, ingen JS, ingen målefeil mulig. Låst til ca. 11
   tegn ("oppskalert.") ved maks-bredden --maks (68rem), derav 5,7vw. */
const StortOrdmerke = () => (
  <div className="overflow-hidden w-full">
    <span
      style={{ fontSize: 'clamp(3rem, 10.5vw, 7.6rem)', letterSpacing: '-0.03em' }}
      className="font-display font-extrabold lowercase leading-none block whitespace-nowrap -mx-1"
    >
      oppskalert<span className="text-accent">.</span>
    </span>
  </div>
);

export const Footer = () => (
  <footer className="bg-deep text-ink pt-20 pb-10">
    <div className="wrap">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-14 border-b border-ink/10">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-[1.05] max-w-[16ch]">
          La oss bygge noe bra sammen.
        </h2>
        <Link
          to={ruter.kontakt}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-ink text-background px-8 py-4 rounded-full font-sans font-bold text-base hover:scale-[1.03] transition-transform duration-300"
        >
          Bestill gratis demo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10 pt-12">
        <div className="max-w-xs">
          <span className="font-display font-extrabold text-2xl tracking-tight lowercase block mb-2">
            oppskalert<span className="text-accent">.</span>
          </span>
          <p className="font-body text-ink/70 text-sm leading-relaxed">
            Norsk webutvikling. Én person, hele jobben, fra første skisse til ferdig nettside.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-14 gap-y-8 font-body text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-ink/70 text-sm font-semibold mb-1">Kontakt</span>
            <span className="text-ink/70">{kontakt.navn}</span>
            <a href={`tel:${kontakt.tel}`} className="text-ink hover:text-ink/70 transition-colors">{kontakt.telefon}</a>
            <a href={`mailto:${kontakt.epost}`} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">{kontakt.epost}</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-ink/70 text-sm font-semibold mb-1">Snarveier</span>
            {navLenker.map((l) => (
              <Link key={l.label} to={l.to} className="text-ink/70 hover:text-ink transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-ink/70 text-sm font-semibold mb-1">Tjenester</span>
            <Link to={ruter.nettsideDesign} className="text-ink/70 hover:text-ink transition-colors">Nettsidedesign</Link>
            <Link to={ruter.nettsideBedrift} className="text-ink/70 hover:text-ink transition-colors">Nettside til bedrift</Link>
            <Link to={ruter.nettbutikk} className="text-ink/70 hover:text-ink transition-colors">Lage nettbutikk</Link>
            <Link to={ruter.webdesignOslo} className="text-ink/70 hover:text-ink transition-colors">Webdesign i Oslo</Link>
            <Link to={ruter.seo} className="text-ink/70 hover:text-ink transition-colors">Søkemotoroptimalisering</Link>
            <Link to={ruter.drift} className="text-ink/70 hover:text-ink transition-colors">Drift og support</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-ink/70 text-sm font-semibold mb-1">Verktøy</span>
            <Link to={ruter.kalkulator} className="text-ink/70 hover:text-ink transition-colors">Priskalkulator</Link>
            <Link to={ruter.sammenlign} className="text-ink/70 hover:text-ink transition-colors">Sammenlign</Link>
            <Link to={RUTE_VANLIGE_SPORSMAL} className="text-ink/70 hover:text-ink transition-colors">Vanlige spørsmål</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-ink/70 text-sm font-semibold mb-1">Selskap</span>
            <span className="text-ink/70">Orgnr {kontakt.orgnr}</span>
            <span className="text-ink/70">{kontakt.sted}</span>
            <span className="text-ink/70">Et datterselskap av<br />{kontakt.morselskap}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-ink/10 flex flex-wrap gap-4 justify-between items-center font-body text-sm text-ink/70">
        <p>&copy; {new Date().getFullYear()} {kontakt.morselskap}.</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
          <span>Ledig for nye prosjekter</span>
        </div>
      </div>
    </div>

    <div className="wrap mt-16">
      <StortOrdmerke />
    </div>
  </footer>
);

/* Felles skall: nav på toppen, innhold, fot. Alle ruter bruker denne,
   så navigasjonen aldri kommer ut av synk mellom sidene igjen. */
export const Shell = ({ children }) => (
  <div className="bg-background text-primary min-h-screen selection:bg-ink selection:text-background">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

/* Sidetopp. Samme anslag på alle undersider. Det uthevede ordet står
   ikke lenger i aksentfarge: studio-malen har ingen aksent i skallet,
   all farge skal komme fra kundearbeidet. Uthevingen skjer med vekt
   og linjeskift i stedet, altså typografisk, ikke med farge. */
export const SideTopp = ({ tittel, uthevet, lede }) => (
  <header className="wrap pt-36 md:pt-44 pb-8 md:pb-12">
    <h1 className="hero-elem font-display font-extrabold text-[clamp(2.6rem,6.5vw,4.6rem)] leading-[1.02] tracking-[-0.035em] max-w-[16ch]">
      {tittel}{uthevet && <> {uthevet}</>}
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
      {tittel}{uthevet && <> {uthevet}</>}
    </h2>
    {lede && (
      <p className={`font-body text-[0.95rem] md:text-base text-primary/80 mt-4 leading-relaxed max-w-[54ch] ${midtstilt ? 'mx-auto' : ''}`}>
        {lede}
      </p>
    )}
  </div>
);

/* Delt horisontal-scroll-rad. Flex med scroll-snap på mobil, rutenett fra sm.
   Mønsteret lå kopiert ordrett tre steder (Omtaler, BransjeEksempler,
   Portfolio); nå bor det ett sted. gridKlasser styrer rutenettet fra sm og
   opp (kolonner, rader, avstand). kortBredde er bredden hvert kort får i den
   horisontale raden på mobil, den nullstilles til auto når rutenettet tar
   over. as bytter rot-elementet, f.eks. "ol" der barna er <li> og
   rekkefølgen er meningsbærende (se Metode). */
export const KortRad = ({ children, as = 'div', gridKlasser, kortBredde, className }) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        // items-stretch må stå her, ikke på kortene. Et kort med h-full får
        // en eksplisitt høyde, og da slår ikke flexboxens stretch inn: hvert
        // kort faller tilbake til sin egen innholdshøyde og raden blir ujevn.
        'flex items-stretch sm:grid overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible',
        gridKlasser,
        className,
      )}
    >
      {Children.map(children, (barn) =>
        isValidElement(barn)
          ? cloneElement(barn, {
              className: cn('flex-shrink-0 snap-start sm:w-auto', kortBredde, barn.props.className),
            })
          : barn
      )}
    </Tag>
  );
};
