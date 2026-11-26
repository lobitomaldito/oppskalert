import { Children, cloneElement, isValidElement, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { kontakt, navLenker, ruter } from '../lib/site';
import { RUTE_VANLIGE_SPORSMAL } from '../lib/populaere-sok';
import { RUTE_ORDLISTE } from '../lib/ordliste';
import { cn } from '../lib/utils';
import { LinkedIn, PilOpp } from './Ikon';
import { track } from '../lib/analytics';
import { bransjer, RUTE_BRANSJE } from '../lib/bransjer';
import StigendeOrd from './StigendeOrd';

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

/* Logoen viser «oppskalering» to steder (24.11.2026). Toppen: punktumet
   dobles i harde hopp én gang per besøk. Bunnen: bokstavene vokser opp fra
   grunnlinjen som søyler når de rulles inn. Ordet står lesbart hele tiden,
   og uten JavaScript eller med redusert bevegelse står logoen stille. */
const UT = 'cubic-bezier(.16, 1, .3, 1)';
const rolig = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fontKlar = () => document.fonts.load('800 1em Merke');

// Grunnlinjen (px fra toppen av et inline-block-element) og blekket i ett tegn.
const maal = (el, tegn) => {
  const cs = getComputedStyle(el);
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const m = ctx.measureText(tegn);
  const grunn = (parseFloat(cs.lineHeight) - m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2
    + m.fontBoundingBoxAscent;
  return {
    grunn,
    venstre: -m.actualBoundingBoxLeft,
    bunn: grunn + m.actualBoundingBoxDescent,
  };
};

/* Toppnavigasjonen, portert ordrett fra studio-mal-demoen
   (mal3.src.html, linje 660 til 686). Alle klasser (.topp, .topp-nav,
   .merke, .knapp, .pil, .meny, .meny-liste) ligger ferdig i index.css.

   Mobilmenyen er et rent details/summary-element uten JavaScript i
   demoen, det holder vi på. Det eneste vi legger til er å lukke menyen
   når ruten bytter: demoen selv lastet en hash-rute på nytt ved klikk,
   en SPA gjør ikke det, så et åpent overlegg ville blitt stående. */
export const Navbar = () => {
  const menyRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (menyRef.current) menyRef.current.open = false;
  }, [location]);

  useEffect(() => {
    const lukkVedEscape = (e) => {
      if (e.key === 'Escape' && menyRef.current) menyRef.current.open = false;
    };
    window.addEventListener('keydown', lukkVedEscape);
    return () => window.removeEventListener('keydown', lukkVedEscape);
  }, []);

  // Punktumet dobles (1, 2, 4) og glir tilbake. Én gang per besøk: flagget
  // settes først når animasjonen er ferdig, så en avbrutt kjøring teller ikke.
  const merkeRef = useRef(null);
  useEffect(() => {
    const prikk = merkeRef.current?.querySelector('i');
    if (!prikk || rolig()) return;
    try { if (sessionStorage.getItem('merke-vist')) return; } catch { /* lagring sperret: spill */ }
    let avbrutt = false, anim;
    fontKlar().then(() => {
      if (avbrutt) return;
      const p = maal(prikk, '.');
      prikk.style.transformOrigin = `${p.venstre}px ${p.bunn}px`;
      const T = 1020, hopp = { easing: 'steps(1, end)' };
      anim = prikk.animate([
        { transform: 'scale(1)', offset: 0, ...hopp },
        { transform: 'scale(2)', offset: 160 / T, ...hopp },
        { transform: 'scale(4)', offset: 320 / T },
        { transform: 'scale(4)', offset: 520 / T, easing: UT },
        { transform: 'scale(1)', offset: 1 },
      ], { duration: T, delay: 400 });
      anim.onfinish = () => { try { sessionStorage.setItem('merke-vist', '1'); } catch { /* ok */ } };
    });
    return () => { avbrutt = true; anim?.cancel(); };
  }, []);

  const navKlasse = ({ isActive }) => (isActive ? 'aktiv' : undefined);

  return (
    <header className="topp">
      <div className="wrap topp-inn">
        <Link className="merke" to={ruter.hjem} ref={merkeRef}>oppskalert<i>.</i></Link>

        <nav className="topp-nav" aria-label="Hovedmeny">
          {navLenker.map((lenke) => (
            <NavLink key={lenke.label} to={lenke.to} className={navKlasse}>
              {lenke.label}
            </NavLink>
          ))}
        </nav>

        <Link className="knapp" to={ruter.kontakt}>
          Gratis utkast <PilOpp className="pil" />
        </Link>

        <details className="meny" ref={menyRef}>
          <summary aria-label="Meny"><span aria-hidden="true" /></summary>
          <nav className="meny-liste" aria-label="Meny">
            <NavLink to={ruter.hjem} end className={navKlasse}>Forside</NavLink>
            {navLenker.map((lenke) => (
              <NavLink key={lenke.label} to={lenke.to} className={navKlasse}>
                {lenke.label}
              </NavLink>
            ))}
            <NavLink to={ruter.kontakt} className={navKlasse}>Kontakt</NavLink>
          </nav>
        </details>
      </div>
    </header>
  );
};

/* Bunnteksten, portert ordrett fra studio-mal-demoen (mal3.src.html,
   linje 1123 til 1152). Klassene (.bunn, .bunn-inn, .bunn-post,
   .bunn-rad, .bunn-lenker, .bunn-merke-boks, .bunn-merke, .signatur,
   .portrett, .portrett-rund, .paa-blekk) ligger ferdig i index.css.

   Den gamle bunnteksten lenket i tillegg til Tjenester- og
   Verktøy-sidene, ni ruter demoens egen bunnmeny ikke kjente til. De
   lenkene bærer internlenking SEO-arbeidet er avhengig av, så de er
   lagt til i en egen rad over bunn-rad i stedet for droppet. */
// Bokstavene står i hver sin span også uten JavaScript, så ordet ikke hopper
// når animasjonen tar over.
const BunnMerke = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || rolig() || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // synlig fra start
    // Punktumet står under kanten (margin-bottom -.17em), så bare bokstavene animeres.
    const bokstaver = [...el.querySelectorAll('span')];
    // Skjult med en animasjon, ikke en klasse: prerenderen lagrer DOM-en etter
    // effektene, og en klasse ville skjult ordet i den statiske HTML-en.
    const skjul = bokstaver.map((b) => b.animate({ visibility: 'hidden' }, { fill: 'forwards' }));
    let avbrutt = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      fontKlar().then(() => {
        if (avbrutt) return;
        const { grunn } = maal(bokstaver[0], 'o');
        skjul.forEach((a) => a.cancel());
        bokstaver.forEach((b, n) => {
          b.style.transformOrigin = `50% ${grunn}px`;
          b.animate(
            [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1.12)', offset: .6 }, { transform: 'scaleY(1)' }],
            { duration: 620, delay: n * 60, easing: 'cubic-bezier(.33, 1, .68, 1)', fill: 'backwards' },
          );
        });
      });
    }, { threshold: .5 });
    io.observe(el);
    return () => { avbrutt = true; io.disconnect(); skjul.forEach((a) => a.cancel()); };
  }, []);

  return (
    <span className="merke bunn-merke" aria-hidden="true" ref={ref}>
      {[...'oppskalert'].map((c, n) => <span key={n}>{c}</span>)}<i>.</i>
    </span>
  );
};

export const Footer = ({ utenCta = false }) => (
  <footer className="bunn paa-blekk">
    <div className="wrap bunn-inn">
      {/* Avslutnings-CTA-en. Den sto på hver side i den gamle footeren og
          forsvant i porten, siden demoens footer bare hadde e-postadressen.
          Den store adressen under er fortsatt hovedgrepet, men en knapp
          fanger dem som vil trykke i stedet for å skrive selv. */}
      {/* Forsiden slutter med skjemaet, så der blir dette en slutt nummer to
          rett etter den første. utenCta settes fra Shell. */}
      {!utenCta && (
        <div className="bunn-cta">
          <h2>Første utkast er gratis.</h2>
          <Link className="knapp" to={ruter.kontakt}>
            Få et gratis utkast <PilOpp className="pil" />
          </Link>
        </div>
      )}

      <a className="bunn-post" href={`mailto:${kontakt.epost}`}>{kontakt.epost}</a>
      <p style={{ marginTop: '1rem', color: 'var(--kritt-mykt)', fontSize: '.9375rem' }}>
        Eller bare ring, jeg tar telefonen selv:{' '}
        {/* inline-block med py-3 og -my-3: 44 px trykkflate uten å flytte linjen. */}
        <a href={`tel:${kontakt.tel}`} className="inline-block py-3 -my-3" style={{ borderBottom: '1px solid var(--blekk-kant)' }}>
          {kontakt.telefon}
        </a>
      </p>

      <p className="bunn-tagline">
        Norsk webutvikling. Én person, hele jobben, fra første skisse til ferdig nettside.
      </p>

      <div className="signatur">
        <div className="portrett portrett-rund" style={{ width: '3.25rem' }}>
          <img src="/founders/aleksander.webp" alt="" width={1792} height={2400} loading="lazy" />
        </div>
        <div>
          <p className="navn">{kontakt.navn}</p>
          <p className="rolle">Grunnlegger, Oppskalert</p>
        </div>
        <a
          className="signatur-li"
          href={kontakt.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${kontakt.navn} på LinkedIn (åpner i ny fane)`}
          onClick={() => track('linkedin_clicked', { sted: 'bunn' })}
        >
          <LinkedIn />
        </a>
      </div>

      <div className="flex flex-wrap gap-x-14 gap-y-8 pt-10 font-body text-sm">
        <div className="flex flex-col md:gap-3">
          <span className="text-ink/70 font-semibold mb-1">Tjenester</span>
          <Link to={ruter.nettsideDesign} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Nettsidedesign</Link>
          <Link to={ruter.nettsideBedrift} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Nettside til bedrift</Link>
          <Link to={ruter.nyNettside} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Ny nettside</Link>
          <Link to={ruter.nettbutikk} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Lage nettbutikk</Link>
          <Link to={ruter.webdesignOslo} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Webdesign i Oslo</Link>
          <Link to={ruter.seo} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Søkemotoroptimalisering</Link>
          <Link to={ruter.drift} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Drift og hosting</Link>
        </div>
        <div className="flex flex-col md:gap-3">
          <span className="text-ink/70 font-semibold mb-1">Bransjer</span>
          {bransjer.map((b) => (
            <Link key={b.slug} to={RUTE_BRANSJE(b.slug)} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">{b.meny}</Link>
          ))}
        </div>
        <div className="flex flex-col md:gap-3">
          <span className="text-ink/70 font-semibold mb-1">Verktøy</span>
          <Link to={ruter.nettsidesjekk} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Gratis nettsidesjekk</Link>
          <Link to={ruter.sammenlign} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Sammenlign</Link>
          {/* De to undersidene lenkes herfra, ikke bare fra /sammenlign.

             Målt i Search Console 22. august: /sammenlign har aldri blitt
             crawlet av Google, og de to undersidene var kun lenket derfra.
             En side Google ikke crawler kan ikke sende den videre til
             barna sine, så begge sto som «Discovered, currently not
             indexed» med null kjente lenker. Footeren ligger på hver
             eneste crawlet side, så herfra finner Googlebot dem. */}
          <Link to={ruter.sammenlignWix} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Meg mot Wix</Link>
          <Link to={ruter.sammenlignWordpress} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Meg mot WordPress</Link>
          <Link to={RUTE_VANLIGE_SPORSMAL} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Vanlige spørsmål</Link>
          <Link to={RUTE_ORDLISTE} className="py-3 md:py-0 text-ink/70 hover:text-ink transition-colors">Ordliste</Link>
        </div>
      </div>

      <div className="bunn-rad">
        <p>© {new Date().getFullYear()} Oppskalert · et selskap i {kontakt.morselskap} · {kontakt.sted.split(',')[0]} · org. {kontakt.orgnr}</p>
        <nav className="bunn-lenker" aria-label="Bunnmeny">
          <Link to={ruter.arbeid}>Arbeid</Link>
          <Link to={ruter.priser}>Priser</Link>
          <Link to={ruter.metode}>Metode</Link>
          <Link to={ruter.om}>Om meg</Link>
          <Link to={ruter.blogg}>Blogg</Link>
          <Link to={ruter.kontakt}>Kontakt</Link>
          <Link to={ruter.personvern}>Personvern</Link>
        </nav>
        {/* Kapasitetssignalet sto på hver side i den gamle footeren.
            Det er den eneste opplysningen der som endrer seg, så det er
            også den eneste som er verdt en pulserende prikk. */}
        <span className="pille">
          <span className="lys" aria-hidden="true" />
          Ledig for nye prosjekter
        </span>
      </div>
    </div>

    <div className="bunn-merke-boks">
      <BunnMerke />
    </div>
  </footer>
);

/* Felles skall: hopp-lenke, nav på toppen, innhold, fot. Alle ruter
   bruker denne, så navigasjonen aldri kommer ut av synk mellom sidene
   igjen. */
export const Shell = ({ children, utenBunnCta = false }) => (
  <div className="min-h-screen">
    <a className="hopp" href="#innhold">Hopp til innhold</a>
    <Navbar />
    <main id="innhold" tabIndex={-1}>{children}</main>
    <Footer utenCta={utenBunnCta} />
  </div>
);

/* Sidetopp. Samme anslag på alle undersider, klassen er demoens egen
   .sidetopp (se mal3.src.html linje 803 til 812). Det uthevede ordet
   er fortsatt bare typografisk, ikke farget, skallet har ingen aksent. */
export const SideTopp = ({ tittel, uthevet, lede, etikett }) => (
  <header className="wrap sidetopp">
    {etikett && <p className="etikett">{etikett}</p>}
    <h1><StigendeOrd tekst={tittel} />{uthevet && <> <StigendeOrd tekst={uthevet} start={typeof tittel === 'string' ? tittel.split(' ').length : 0} /></>}</h1>
    {lede && <p>{lede}</p>}
  </header>
);

/* Seksjonstopp, demoens egen .seksjonstopp-klasse (se mal3.src.html
   linje 727 til 732). midtstilt er ikke en del av demoens eget CSS,
   den legges på med Tailwind-verktøyklasser over den ferdige stilen. */
export const SeksjonTopp = ({ tittel, uthevet, lede, midtstilt = false }) => (
  <div className={cn('seksjonstopp', midtstilt && 'mx-auto text-center')}>
    <h2>{tittel}{uthevet && <> {uthevet}</>}</h2>
    {lede && <p>{lede}</p>}
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
