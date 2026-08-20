import { Children, cloneElement, isValidElement, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { kontakt, navLenker, ruter } from '../lib/site';
import { RUTE_VANLIGE_SPORSMAL } from '../lib/populaere-sok';
import { cn } from '../lib/utils';

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

  const navKlasse = ({ isActive }) => (isActive ? 'aktiv' : undefined);

  return (
    <header className="topp">
      <div className="wrap topp-inn">
        <Link className="merke" to={ruter.hjem}>oppskalert<i>.</i></Link>

        <nav className="topp-nav" aria-label="Hovedmeny">
          {navLenker.map((lenke) => (
            <NavLink key={lenke.label} to={lenke.to} className={navKlasse}>
              {lenke.label}
            </NavLink>
          ))}
        </nav>

        <Link className="knapp" to={ruter.kontakt}>
          Ta kontakt <span className="pil" aria-hidden="true">↗</span>
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
export const Footer = () => (
  <footer className="bunn paa-blekk">
    <div className="wrap bunn-inn">
      {/* Avslutnings-CTA-en. Den sto på hver side i den gamle footeren og
          forsvant i porten, siden demoens footer bare hadde e-postadressen.
          Den store adressen under er fortsatt hovedgrepet, men en knapp
          fanger dem som vil trykke i stedet for å skrive selv. */}
      <div className="bunn-cta">
        <h2>La oss bygge noe bra sammen.</h2>
        <Link className="knapp" to={ruter.kontakt}>
          Bestill gratis demo <span className="pil" aria-hidden="true">↗</span>
        </Link>
      </div>

      <a className="bunn-post" href={`mailto:${kontakt.epost}`}>{kontakt.epost}</a>
      <p style={{ marginTop: '1rem', color: 'var(--kritt-mykt)', fontSize: '.9375rem' }}>
        Eller bare ring, jeg tar telefonen selv:{' '}
        <a href={`tel:${kontakt.tel}`} style={{ borderBottom: '1px solid var(--blekk-kant)' }}>
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
      </div>

      <div className="flex flex-wrap gap-x-14 gap-y-8 pt-10 font-body text-sm">
        <div className="flex flex-col gap-3">
          <span className="text-ink/70 font-semibold mb-1">Tjenester</span>
          <Link to={ruter.nettsideDesign} className="text-ink/70 hover:text-ink transition-colors">Nettsidedesign</Link>
          <Link to={ruter.nettsideBedrift} className="text-ink/70 hover:text-ink transition-colors">Nettside til bedrift</Link>
          <Link to={ruter.nettbutikk} className="text-ink/70 hover:text-ink transition-colors">Lage nettbutikk</Link>
          <Link to={ruter.webdesignOslo} className="text-ink/70 hover:text-ink transition-colors">Webdesign i Oslo</Link>
          <Link to={ruter.seo} className="text-ink/70 hover:text-ink transition-colors">Søkemotoroptimalisering</Link>
          <Link to={ruter.drift} className="text-ink/70 hover:text-ink transition-colors">Drift og support</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-ink/70 font-semibold mb-1">Verktøy</span>
          <Link to={ruter.kalkulator} className="text-ink/70 hover:text-ink transition-colors">Priskalkulator</Link>
          <Link to={ruter.sammenlign} className="text-ink/70 hover:text-ink transition-colors">Sammenlign</Link>
          <Link to={RUTE_VANLIGE_SPORSMAL} className="text-ink/70 hover:text-ink transition-colors">Vanlige spørsmål</Link>
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
      <span className="merke bunn-merke" aria-hidden="true">oppskalert<i>.</i></span>
    </div>
  </footer>
);

/* Felles skall: hopp-lenke, nav på toppen, innhold, fot. Alle ruter
   bruker denne, så navigasjonen aldri kommer ut av synk mellom sidene
   igjen. */
export const Shell = ({ children }) => (
  <div className="min-h-screen">
    <a className="hopp" href="#innhold">Hopp til innhold</a>
    <Navbar />
    <main id="innhold" tabIndex={-1}>{children}</main>
    <Footer />
  </div>
);

/* Sidetopp. Samme anslag på alle undersider, klassen er demoens egen
   .sidetopp (se mal3.src.html linje 803 til 812). Det uthevede ordet
   er fortsatt bare typografisk, ikke farget, skallet har ingen aksent. */
export const SideTopp = ({ tittel, uthevet, lede, etikett }) => (
  <header className="wrap sidetopp">
    {etikett && <p className="etikett">{etikett}</p>}
    <h1>{tittel}{uthevet && <> {uthevet}</>}</h1>
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
