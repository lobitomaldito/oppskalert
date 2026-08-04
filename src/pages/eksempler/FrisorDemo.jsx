import { ArrowRight, ArrowUpRight, Scissors, Clock, MapPin, Phone, Star, Instagram, Sparkles } from 'lucide-react';
import SEO from '../../components/SEO';
import { useReveal } from '../../lib/useReveal';

/*
 * Konseptside / DEMO. Fiktiv frisørsalong "Glød".
 * Egen merkevare og fargepalett (varm, redaksjonell) for å vise spennvidde.
 * Ikke en ekte kunde: noindex + tydelig demo-banner. Bygget av Oppskalert.
 */

const img = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const photos = {
  heroTall: img('1695527081848-1e46c06e6458', 1100),
  heroWide: img('1623171678074-1b04ff0e694f', 1400),
  interior: img('1744095407400-aa337918bbb1', 1400),
  styling: img('1746723375184-5f537d2e6f31', 1200),
  cutting: img('1776850476481-2bccba2e35c7', 1200),
  portrait: img('1759134198561-e2041049419c', 900),
  working: img('1750263147723-ebd447918d89', 1200),
  detail: img('1634449571010-02389ed0f9b0', 1200),
};

const services = [
  { name: 'Dameklipp & føn', desc: 'Konsultasjon, klipp, vask og styling tilpasset deg.', price: 'fra 690,–' },
  { name: 'Herreklipp', desc: 'Presis klipp, vask og enkel styling.', price: 'fra 490,–' },
  { name: 'Farge & striper', desc: 'Helfarge, balayage eller striper med pleie.', price: 'fra 1 290,–' },
  { name: 'Bryllup & oppsett', desc: 'Prøvetime og styling for den store dagen.', price: 'fra 1 490,–' },
];

const stylists = [
  { name: 'Maja Lind', role: 'Daglig leder · Fargespesialist', img: photos.portrait },
  { name: 'Henrik Aas', role: 'Senior stylist · Herre', img: photos.working },
];

const reviews = [
  { quote: 'Beste klippen jeg har hatt i Oslo. Maja forsto nøyaktig hva jeg ville ha.', name: 'Ingrid S.' },
  { quote: 'Rolig, vakker salong og et utrolig dyktig team. Går aldri noe annet sted.', name: 'Thomas B.' },
  { quote: 'Fikk balayage hos Henrik, og fargen er helt magisk. Anbefales på det varmeste!', name: 'Camilla R.' },
];

const gallery = [photos.styling, photos.cutting, photos.interior, photos.detail];

// Tydelig at dette er en demo Oppskalert har laget. Leder tilbake til pitchen.
const DemoBanner = () => (
  <div className="sticky top-0 z-[60] w-full bg-[#221d1a] text-[#f6efe7]">
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 py-2.5">
      <span className="flex items-center gap-2 text-[11px] sm:text-xs tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#d98c63] shrink-0" />
        <span className="opacity-80">Demo · en konseptside laget av</span>
        <span className="font-semibold lowercase">oppskalert.</span>
      </span>
      <a
        href="/#bestill-demo"
        className="group flex items-center gap-1.5 rounded-full bg-[#d98c63] px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#221d1a] transition-transform hover:scale-[1.03]"
      >
        Få din egen gratis
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  </div>
);

const navLinks = [
  { label: 'Tjenester', href: '#tjenester' },
  { label: 'Galleri', href: '#galleri' },
  { label: 'Om oss', href: '#om-oss' },
  { label: 'Kontakt', href: '#kontakt' },
];

const Nav = () => (
  <nav className="absolute top-0 inset-x-0 z-40">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-6">
      <span className="font-serif text-2xl text-[#221d1a] tracking-tight">Glød</span>
      <div className="hidden md:flex items-center gap-9 text-sm text-[#221d1a]/80">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} className="hover:text-[#221d1a] transition-colors">{l.label}</a>
        ))}
      </div>
      <a
        href="#kontakt"
        className="rounded-full border border-[#221d1a]/25 px-5 py-2 text-sm text-[#221d1a] hover:bg-[#221d1a] hover:text-[#f6efe7] transition-colors"
      >
        Bestill time
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative overflow-hidden bg-[#f6efe7] pt-28 sm:pt-32 pb-16 sm:pb-24">
    <Nav />
    <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
      <div>
        <span className="hero-elem inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#b9694a] mb-6">
          <Scissors className="w-4 h-4" /> Frisørsalong i Oslo
        </span>
        <h1 className="hero-elem font-serif text-[#221d1a] leading-[0.98] tracking-tight" style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}>
          Hår som får deg<br />til å <span className="italic text-[#b9694a]">gløde</span>.
        </h1>
        <p className="hero-elem mt-7 max-w-md text-[#221d1a]/70 text-base sm:text-lg leading-relaxed">
          En rolig salong i hjertet av Oslo, der erfarne stylister tar seg tid til deg, og resultatet varer lenger enn timen.
        </p>
        <div className="hero-elem mt-9 flex flex-wrap items-center gap-4">
          <a href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-[#221d1a] px-7 py-3.5 text-[#f6efe7] font-medium transition-transform hover:scale-[1.03]">
            Bestill time <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#tjenester" className="inline-flex items-center gap-2 text-[#221d1a] font-medium border-b border-[#221d1a]/30 pb-0.5 hover:border-[#221d1a] transition-colors">
            Se prisliste
          </a>
        </div>
        <div className="hero-elem mt-9 flex items-center gap-3 text-sm text-[#221d1a]/70">
          <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#d98c63] text-[#d98c63]" />)}</span>
          4,9 av 5 · 240 omtaler fra gjester
        </div>
      </div>
      <div className="hero-elem relative">
        <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
          <img src={photos.heroTall} alt="Stylist gir en gjest ny frisyre" className="w-full h-full object-cover" />
        </div>
        <div className="hidden sm:block absolute -bottom-8 -left-8 w-40 h-48 rounded-[1.5rem] overflow-hidden shadow-xl ring-8 ring-[#f6efe7]">
          <img src={photos.heroWide} alt="Interiør i salongen" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </header>
);

const Marquee = () => {
  const items = ['Sentralt i Oslo', 'Erfarne stylister', 'Økologiske produkter', 'Enkel online booking', 'Kveldsåpent torsdager'];
  const row = [...items, ...items];
  return (
    <div className="bg-[#221d1a] text-[#f6efe7] py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[scroll_28s_linear_infinite]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-6 text-sm uppercase tracking-[0.2em] opacity-80">
            {t} <span className="text-[#d98c63]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
};

const Services = () => {
  const ref = useReveal(90);
  return (
    <section id="tjenester" ref={ref} className="bg-[#f6efe7] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14" data-reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-[#b9694a]">Tjenester & priser</span>
          <h2 className="font-serif text-[#221d1a] text-4xl sm:text-6xl tracking-tight mt-3">Stell som sitter.</h2>
          <p className="text-[#221d1a]/65 mt-4 leading-relaxed">Alle priser inkluderer konsultasjon. Endelig pris avhenger av hårlengde og ønsket resultat.</p>
        </div>
        <div className="divide-y divide-[#221d1a]/10 border-y border-[#221d1a]/10">
          {services.map((s) => (
            <div key={s.name} data-reveal className="group grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 items-baseline py-7">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#221d1a] group-hover:text-[#b9694a] transition-colors">{s.name}</h3>
                <p className="text-[#221d1a]/60 mt-1.5 max-w-md">{s.desc}</p>
              </div>
              <span className="font-mono text-lg text-[#221d1a] whitespace-nowrap">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const ref = useReveal(70);
  return (
    <section id="galleri" ref={ref} className="bg-[#efe4d6] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12" data-reveal>
          <h2 className="font-serif text-[#221d1a] text-4xl sm:text-6xl tracking-tight">Fra salongen.</h2>
          <a href="#" className="inline-flex items-center gap-2 text-[#b9694a] font-medium">
            <Instagram className="w-5 h-5" /> @glod.oslo
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((src, i) => (
            <div key={i} data-reveal className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
              <img src={src} alt="Resultat fra salongen" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useReveal(110);
  return (
    <section id="om-oss" ref={ref} className="bg-[#f6efe7] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div data-reveal className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
          <img src={photos.interior} alt="Teamet i Glød" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#b9694a]" data-reveal>Om oss</span>
          <h2 data-reveal className="font-serif text-[#221d1a] text-4xl sm:text-5xl tracking-tight mt-3">Små detaljer, stor forskjell.</h2>
          <p data-reveal className="text-[#221d1a]/70 mt-5 leading-relaxed">
            Glød startet med en enkel idé: en salong der du blir sett, hørt og tatt vare på. Vi jobber med skånsomme, økologiske produkter og holder oss oppdatert på det siste innen klipp og farge.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {stylists.map((p) => (
              <div key={p.name} data-reveal className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-serif text-xl text-[#221d1a] leading-tight">{p.name}</p>
                  <p className="text-sm text-[#221d1a]/60">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const ref = useReveal(90);
  return (
    <section ref={ref} className="bg-[#221d1a] text-[#f6efe7] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 data-reveal className="font-serif text-4xl sm:text-6xl tracking-tight mb-14 text-center">Det gjestene sier.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} data-reveal className="rounded-3xl border border-[#f6efe7]/15 p-8 bg-[#f6efe7]/[0.03]">
              <span className="flex mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#d98c63] text-[#d98c63]" />)}</span>
              <p className="text-[#f6efe7]/85 leading-relaxed">«{r.quote}»</p>
              <p className="mt-5 text-sm text-[#f6efe7]/55">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const ref = useReveal(80);
  return (
    <section id="kontakt" ref={ref} className="bg-[#efe4d6] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#b9694a]" data-reveal>Bestill time</span>
          <h2 data-reveal className="font-serif text-[#221d1a] text-4xl sm:text-6xl tracking-tight mt-3">Vi gleder oss<br />til å se deg.</h2>
          <p data-reveal className="text-[#221d1a]/70 mt-5 max-w-md leading-relaxed">Ring oss, eller stikk innom. Online booking åpner snart. Meld deg på, så gir vi beskjed først.</p>
          <div data-reveal className="mt-9 space-y-4 text-[#221d1a]">
            <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-[#b9694a]" /> Thorvald Meyers gate 24, 0555 Oslo</p>
            <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#b9694a]" /> 22 00 00 00</p>
            <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#b9694a]" /> Man–fre 10–18 · Tor 10–20 · Lør 10–15</p>
          </div>
          <a href="tel:2200000" data-reveal className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#221d1a] px-7 py-3.5 text-[#f6efe7] font-medium transition-transform hover:scale-[1.03]">
            Ring og bestill <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div data-reveal className="aspect-[4/3] lg:aspect-auto rounded-[2rem] overflow-hidden shadow-xl">
          <img src={photos.cutting} alt="Stylist klipper en gjest" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#221d1a] text-[#f6efe7] px-5 sm:px-8 pt-16 pb-10">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-8 pb-10 border-b border-[#f6efe7]/10">
        <div>
          <span className="font-serif text-3xl">Glød</span>
          <p className="text-[#f6efe7]/55 text-sm mt-2 max-w-xs">Frisørsalong i Oslo. Hår som får deg til å gløde.</p>
        </div>
        <div className="flex gap-12 text-sm text-[#f6efe7]/70">
          <div className="flex flex-col gap-2">
            <span className="text-[#f6efe7]/40 uppercase tracking-widest text-xs mb-1">Salongen</span>
            <a href="#tjenester" className="hover:text-[#f6efe7]">Tjenester</a>
            <a href="#galleri" className="hover:text-[#f6efe7]">Galleri</a>
            <a href="#kontakt" className="hover:text-[#f6efe7]">Kontakt</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#f6efe7]/40 uppercase tracking-widest text-xs mb-1">Følg oss</span>
            <a href="#" className="hover:text-[#f6efe7]">Instagram</a>
            <a href="#" className="hover:text-[#f6efe7]">Facebook</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-xs text-[#f6efe7]/45">
        <p>© {new Date().getFullYear()} Glød frisørsalong (konsept/demo).</p>
        <a href="/#bestill-demo" className="group inline-flex items-center gap-1.5 hover:text-[#f6efe7] transition-colors">
          Nettside av <span className="font-semibold lowercase">oppskalert.</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </footer>
);

const FrisorDemo = () => (
  <div className="bg-[#f6efe7] min-h-screen font-sans selection:bg-[#221d1a] selection:text-[#f6efe7]">
    <SEO
      title="Glød Frisørsalong (demo)"
      description="Konseptside laget av Oppskalert. Slik kan en moderne frisørside se ut. Ikke en ekte bedrift."
      canonical="https://oppskalert.no/eksempler/frisor"
      noindex
    />
    <DemoBanner />
    <Hero />
    <Marquee />
    <Services />
    <Gallery />
    <About />
    <Reviews />
    <Contact />
    <Footer />
  </div>
);

export default FrisorDemo;
