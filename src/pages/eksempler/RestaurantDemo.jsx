import { ArrowRight, ArrowUpRight, UtensilsCrossed, Wine, Clock, MapPin, Phone, Star, Instagram, Sparkles } from 'lucide-react';
import SEO from '../../components/SEO';
import { useReveal } from '../../lib/useReveal';

/*
 * Konseptside / DEMO — fiktiv nabolagsrestaurant "Nær".
 * Egen merkevare og fargepalett (mørk, varm, redaksjonell) for å vise spennvidde.
 * Ikke en ekte kunde: noindex + tydelig demo-banner. Bygget av Oppskalert.
 */

const img = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const photos = {
  heroInterior: img('1773122150546-94699cfc8f23', 1200),
  plated: img('1750113547119-95213adae49f', 1200),
  table: img('1715168435782-a79d95098825', 1200),
  closePlate: img('1695753568605-d8653d5319e6', 1200),
  woodInterior: img('1610474035799-069bb3f3bf50', 1200),
};

const menu = [
  {
    group: 'Småretter',
    items: [
      { name: 'Bakt sellerirot', desc: 'Brunet smør, ristede hasselnøtter og urteolje.', price: '145,–' },
      { name: 'Råmarinert kveite', desc: 'Eple, dill og rømme fra Rørosmeieriet.', price: '185,–' },
      { name: 'Surdeigsbrød & smør', desc: 'Bakt samme morgen, kjernet kulturmelksmør.', price: '95,–' },
    ],
  },
  {
    group: 'Hovedretter',
    items: [
      { name: 'Glasert svinekjake', desc: 'Sakte braisert i eplemost, sellerirotpuré og sprø løk.', price: '315,–' },
      { name: 'Steinbit fra Lofoten', desc: 'Brunet smør, blomkål og sesongens grønnsaker.', price: '345,–' },
      { name: 'Bygg-risotto', desc: 'Norsk perlebygg, skogssopp og lagret Kvitlin.', price: '275,–' },
    ],
  },
  {
    group: 'Dessert',
    items: [
      { name: 'Brent karamellkrem', desc: 'Havtorn fra egen sankhøst og sprø flak.', price: '135,–' },
      { name: 'Sjokolade & rug', desc: 'Mørk sjokolade, ristet rug og crème fraîche.', price: '145,–' },
    ],
  },
];

const team = [
  { name: 'Sigrid Aalberg', role: 'Kjøkkensjef · Grunnlegger' },
  { name: 'Jonas Holt', role: 'Sommelier · Naturvin' },
];

const reviews = [
  { quote: 'Et av de varmeste måltidene jeg har hatt i Oslo. Vi ble sittende til langt på natt.', name: 'Marte L.' },
  { quote: 'Kortreist gjort på sitt aller beste — hver rett smaker av sesongen. Kommer tilbake.', name: 'Anders V.' },
  { quote: 'Vinen Jonas valgte til menyen satt perfekt. Et nabolagssted med sjel.', name: 'Hanne K.' },
];

const gallery = [photos.plated, photos.table, photos.woodInterior, photos.closePlate];

// Tydelig at dette er en demo Oppskalert har laget — leder tilbake til pitchen.
const DemoBanner = () => (
  <div className="sticky top-0 z-[60] w-full bg-[#100d0c] text-[#f4ece0]">
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 py-2.5">
      <span className="flex items-center gap-2 text-[11px] sm:text-xs tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#c69a52] shrink-0" />
        <span className="opacity-80">Demo · en konseptside laget av</span>
        <span className="font-semibold lowercase">oppskalert.</span>
      </span>
      <a
        href="/#bestill-demo"
        className="group flex items-center gap-1.5 rounded-full bg-[#c69a52] px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#1a1614] transition-transform hover:scale-[1.03]"
      >
        Få din egen gratis
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  </div>
);

const navLinks = [
  { label: 'Meny', href: '#meny' },
  { label: 'Galleri', href: '#galleri' },
  { label: 'Om oss', href: '#om-oss' },
  { label: 'Kontakt', href: '#kontakt' },
];

const Nav = () => (
  <nav className="absolute top-0 inset-x-0 z-40">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-6">
      <span className="font-serif text-2xl text-[#f4ece0] tracking-tight">Nær</span>
      <div className="hidden md:flex items-center gap-9 text-sm text-[#f4ece0]/75">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} className="hover:text-[#f4ece0] transition-colors">{l.label}</a>
        ))}
      </div>
      <a
        href="#kontakt"
        className="rounded-full border border-[#f4ece0]/25 px-5 py-2 text-sm text-[#f4ece0] hover:bg-[#c69a52] hover:border-[#c69a52] hover:text-[#1a1614] transition-colors"
      >
        Book bord
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative overflow-hidden bg-[#1a1614] pt-28 sm:pt-32 pb-16 sm:pb-24">
    <Nav />
    <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
      <div>
        <span className="hero-elem inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c69a52] mb-6">
          <UtensilsCrossed className="w-4 h-4" /> Nabolagsrestaurant i Oslo
        </span>
        <h1 className="hero-elem font-serif text-[#f4ece0] leading-[0.98] tracking-tight" style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}>
          Et måltid verdt<br />å bli <span className="italic text-[#c69a52]">sittende</span> for.
        </h1>
        <p className="hero-elem mt-7 max-w-md text-[#f4ece0]/70 text-base sm:text-lg leading-relaxed">
          Kortreist, sesongbasert mat og naturvin — servert i et varmt, lite rom midt i nabolaget. Åpent kjøkken, korte avstander fra jord til bord.
        </p>
        <div className="hero-elem mt-9 flex flex-wrap items-center gap-4">
          <a href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-[#c69a52] px-7 py-3.5 text-[#1a1614] font-medium transition-transform hover:scale-[1.03]">
            Book bord <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#meny" className="inline-flex items-center gap-2 text-[#f4ece0] font-medium border-b border-[#f4ece0]/30 pb-0.5 hover:border-[#c69a52] transition-colors">
            Se menyen
          </a>
        </div>
        <div className="hero-elem mt-9 flex items-center gap-3 text-sm text-[#f4ece0]/70">
          <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#c69a52] text-[#c69a52]" />)}</span>
          4,8 av 5 · 320+ fornøyde gjester
        </div>
      </div>
      <div className="hero-elem relative">
        <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-[#f4ece0]/10">
          <img src={photos.heroInterior} alt="Varmt restaurantinteriør med levende lys" className="w-full h-full object-cover" />
        </div>
        <div className="hidden sm:block absolute -bottom-8 -left-8 w-40 h-48 rounded-[1.5rem] overflow-hidden shadow-xl ring-8 ring-[#1a1614]">
          <img src={photos.plated} alt="Anrettet rett fra kjøkkenet" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </header>
);

const Marquee = () => {
  const items = ['Sesongbasert', 'Kortreist', 'Naturvin', 'Åpent kjøkken', 'Midt i nabolaget'];
  const row = [...items, ...items];
  return (
    <div className="bg-[#c69a52] text-[#1a1614] py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marqueeNaer_28s_linear_infinite]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-6 text-sm uppercase tracking-[0.2em] font-medium">
            {t} <span className="text-[#b5623f]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeNaer { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
};

const Menu = () => {
  const ref = useReveal(90);
  return (
    <section id="meny" ref={ref} className="bg-[#1a1614] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14" data-reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-[#c69a52]">Sesongens meny</span>
          <h2 className="font-serif text-[#f4ece0] text-4xl sm:text-6xl tracking-tight mt-3">Smaker du husker.</h2>
          <p className="text-[#f4ece0]/65 mt-4 leading-relaxed">Menyen følger sesongen og råvarene vi får tak i. Den endrer seg ofte — her er noen av rettene som går igjen.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-10">
          {menu.map((g) => (
            <div key={g.group} data-reveal>
              <h3 className="font-serif text-2xl text-[#c69a52] mb-6">{g.group}</h3>
              <div className="divide-y divide-[#f4ece0]/10 border-t border-[#f4ece0]/10">
                {g.items.map((it) => (
                  <div key={it.name} className="group py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-serif text-xl text-[#f4ece0] group-hover:text-[#c69a52] transition-colors">{it.name}</h4>
                      <span className="font-mono text-sm text-[#f4ece0]/80 whitespace-nowrap">{it.price}</span>
                    </div>
                    <p className="text-[#f4ece0]/55 text-sm mt-1.5 leading-relaxed">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[#f4ece0]/45 text-sm mt-12" data-reveal>
          Vi tilbyr også en 5-retters sesongmeny til 695,– — gjerne med utvalgt naturvin.
        </p>
      </div>
    </section>
  );
};

const Gallery = () => {
  const ref = useReveal(70);
  return (
    <section id="galleri" ref={ref} className="bg-[#13100e] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12" data-reveal>
          <h2 className="font-serif text-[#f4ece0] text-4xl sm:text-6xl tracking-tight">Fra bordet.</h2>
          <a href="#" className="inline-flex items-center gap-2 text-[#c69a52] font-medium">
            <Instagram className="w-5 h-5" /> @naer.oslo
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((src, i) => (
            <div key={i} data-reveal className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
              <img src={src} alt="Mat og interiør fra Nær" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
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
    <section id="om-oss" ref={ref} className="bg-[#1a1614] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div data-reveal className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-[#f4ece0]/10">
          <img src={photos.woodInterior} alt="Spiserommet på Nær" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#c69a52]" data-reveal>Om oss</span>
          <h2 data-reveal className="font-serif text-[#f4ece0] text-4xl sm:text-5xl tracking-tight mt-3">Nært på alle måter.</h2>
          <p data-reveal className="text-[#f4ece0]/70 mt-5 leading-relaxed">
            Nær begynte med en enkel tanke: god mat trenger ikke reise langt. Kjøkkensjef Sigrid handler hos bønder, fiskere og produsenter i nærområdet, og lar råvarene bestemme menyen. Resultatet er et lite, varmt sted der gjestene blir sittende — og naboer blir kjente.
          </p>
          <p data-reveal className="flex items-center gap-2 text-[#c69a52] text-sm mt-6">
            <Wine className="w-4 h-4" /> Et nøye utvalg naturvin til hver rett.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {team.map((p) => (
              <div key={p.name} data-reveal className="border-l-2 border-[#c69a52]/40 pl-4">
                <p className="font-serif text-xl text-[#f4ece0] leading-tight">{p.name}</p>
                <p className="text-sm text-[#f4ece0]/55 mt-1">{p.role}</p>
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
    <section ref={ref} className="bg-[#c69a52] text-[#1a1614] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 data-reveal className="font-serif text-4xl sm:text-6xl tracking-tight mb-14 text-center">Det gjestene sier.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} data-reveal className="rounded-3xl border border-[#1a1614]/15 p-8 bg-[#1a1614]/[0.04]">
              <span className="flex mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#1a1614] text-[#1a1614]" />)}</span>
              <p className="text-[#1a1614]/85 leading-relaxed font-serif text-lg">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-5 text-sm text-[#1a1614]/60">{r.name}</p>
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
    <section id="kontakt" ref={ref} className="bg-[#13100e] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#c69a52]" data-reveal>Book bord</span>
          <h2 data-reveal className="font-serif text-[#f4ece0] text-4xl sm:text-6xl tracking-tight mt-3">Vi har satt<br />av en plass.</h2>
          <p data-reveal className="text-[#f4ece0]/70 mt-5 max-w-md leading-relaxed">Ring oss, eller stikk innom. Vi tar imot bordbestillinger for både små og store selskap — og holder gjerne av et bord i baren.</p>
          <div data-reveal className="mt-9 space-y-4 text-[#f4ece0]">
            <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-[#c69a52]" /> Markveien 35, 0554 Oslo</p>
            <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#c69a52]" /> 21 00 00 00</p>
            <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#c69a52]" /> Tir–tor 17–23 · Fre–lør 16–24 · Søn–man stengt</p>
          </div>
          <a href="tel:2100000" data-reveal className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#c69a52] px-7 py-3.5 text-[#1a1614] font-medium transition-transform hover:scale-[1.03]">
            Ring og book <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div data-reveal className="aspect-[4/3] lg:aspect-auto rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-[#f4ece0]/10">
          <img src={photos.table} alt="Dekket bord på Nær" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#100d0c] text-[#f4ece0] px-5 sm:px-8 pt-16 pb-10">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-8 pb-10 border-b border-[#f4ece0]/10">
        <div>
          <span className="font-serif text-3xl">Nær</span>
          <p className="text-[#f4ece0]/55 text-sm mt-2 max-w-xs">Nabolagsrestaurant i Oslo. Kortreist og sesongbasert mat, naturvin og et varmt rom.</p>
        </div>
        <div className="flex gap-12 text-sm text-[#f4ece0]/70">
          <div className="flex flex-col gap-2">
            <span className="text-[#f4ece0]/40 uppercase tracking-widest text-xs mb-1">Restauranten</span>
            <a href="#meny" className="hover:text-[#c69a52]">Meny</a>
            <a href="#galleri" className="hover:text-[#c69a52]">Galleri</a>
            <a href="#kontakt" className="hover:text-[#c69a52]">Kontakt</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#f4ece0]/40 uppercase tracking-widest text-xs mb-1">Følg oss</span>
            <a href="#" className="hover:text-[#c69a52]">Instagram</a>
            <a href="#" className="hover:text-[#c69a52]">Facebook</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-xs text-[#f4ece0]/45">
        <p>© {new Date().getFullYear()} Nær restaurant (konsept/demo).</p>
        <a href="/#bestill-demo" className="group inline-flex items-center gap-1.5 hover:text-[#f4ece0] transition-colors">
          Nettside av <span className="font-semibold lowercase">oppskalert.</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </footer>
);

const RestaurantDemo = () => (
  <div className="bg-[#1a1614] min-h-screen font-sans selection:bg-[#c69a52] selection:text-[#1a1614]">
    <SEO
      title="Nær Restaurant (demo)"
      description="Konseptside laget av Oppskalert — slik kan en moderne restaurantside se ut. Ikke en ekte bedrift."
      canonical="https://oppskalert.no/eksempler/restaurant"
      noindex
    />
    <DemoBanner />
    <Hero />
    <Marquee />
    <Menu />
    <Gallery />
    <About />
    <Reviews />
    <Contact />
    <Footer />
  </div>
);

export default RestaurantDemo;
