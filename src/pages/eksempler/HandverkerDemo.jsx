import { Hammer, HardHat, Ruler, Wrench, Phone, MapPin, Clock, Star, ArrowRight, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';
import { useReveal } from '../../lib/useReveal';

/*
 * Konseptside / DEMO — fiktiv tømrer & totalentreprenør "NORDBYGG".
 * Egen merkevare og fargepalett (industriell, solid, betong + safety-amber) for å
 * vise spennvidde. Ikke en ekte kunde: noindex + tydelig demo-banner. Bygget av Oppskalert.
 */

const img = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const photos = {
  hero: img('1674649207083-281c2517ab49', 1300),     // håndverker på hus (bekreftet)
  portrait: img('1765808376624-aba74b96859f', 900),  // håndverkerportrett (bekreftet)
  bath: img('1771239048293-72abf673adb2', 1200),     // moderne bad (Unsplash bilde-søk)
  facade: img('1760067537293-6b30141d6a52', 1200),   // hus med tre & stein (Unsplash bilde-søk)
  kitchen: img('1771371282665-545256b20dca', 1200),  // kjøkken (Unsplash bilde-søk)
  bath2: img('1771929662486-f793e08f0f16', 1200),    // bad med marmor (Unsplash bilde-søk)
};

const services = [
  { icon: Hammer, name: 'Totalrenovering', desc: 'Vi tar hele jobben — fra riving til ferdig overflate. Én entreprenør, ett ansvar, fast pris.', price: 'Be om pris' },
  { icon: Ruler, name: 'Bad & våtrom', desc: 'Membran, fall til sluk og fliser etter våtromsnormen. Dokumentert og garantert tett.', price: 'fra kr 195 000,–' },
  { icon: HardHat, name: 'Tak & fasade', desc: 'Omtekking, etterisolering og ny kledning som tåler norsk vær i tiår framover.', price: 'Be om pris' },
  { icon: Wrench, name: 'Tilbygg & garasje', desc: 'Mer plass til familien. Vi prosjekterer, søker og bygger — nøkkelferdig.', price: 'fra kr 850 000,–' },
];

const stats = [
  { value: '15', label: 'år i bransjen' },
  { value: '320+', label: 'fullførte prosjekter' },
  { value: '100 %', label: 'sentral godkjenning' },
  { value: '5 års', label: 'garanti på arbeid' },
];

const team = [
  { name: 'Stian Berg', role: 'Daglig leder · Tømrermester', img: photos.portrait },
];

const projects = [
  { src: photos.bath, label: 'Baderom, Nordstrand', tag: 'Totalrenovering' },
  { src: photos.facade, label: 'Enebolig, Bærum', tag: 'Tak & fasade' },
  { src: photos.kitchen, label: 'Kjøkken, Grünerløkka', tag: 'Renovering' },
  { src: photos.bath2, label: 'Våtrom, Lørenskog', tag: 'Bad & membran' },
];

const reviews = [
  { quote: 'Nordbygg ga oss fastpris og holdt den. Badet ble ferdig på dagen, ryddig fra start til slutt.', name: 'Marius og Hanne, Nordstrand' },
  { quote: 'Endelig et firma som svarer på telefonen og rydder etter seg. Tilbygget vårt ble akkurat som tegnet.', name: 'Kristin H., Bærum' },
  { quote: 'Profesjonelle fra befaring til overlevering. Fagfolk som tar stolthet i jobben — anbefales sterkt.', name: 'Ole-Petter S., Lørenskog' },
];

// Tydelig at dette er en demo Oppskalert har laget — leder tilbake til pitchen.
const DemoBanner = () => (
  <div className="sticky top-0 z-[60] w-full bg-[#16181a] text-[#ece8e1] border-b border-[#ece8e1]/10">
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 py-2.5">
      <span className="flex items-center gap-2 text-[11px] sm:text-xs tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#e07a24] shrink-0" />
        <span className="opacity-80">Demo · en konseptside laget av</span>
        <span className="font-semibold lowercase">oppskalert.</span>
      </span>
      <a
        href="/#bestill-demo"
        className="group flex items-center gap-1.5 rounded-full bg-[#e07a24] px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-[#16181a] transition-transform hover:scale-[1.03]"
      >
        Få din egen gratis
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  </div>
);

const navLinks = [
  { label: 'Tjenester', href: '#tjenester' },
  { label: 'Prosjekter', href: '#prosjekter' },
  { label: 'Om oss', href: '#om-oss' },
  { label: 'Kontakt', href: '#kontakt' },
];

const Nav = () => (
  <nav className="absolute top-0 inset-x-0 z-40">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-6">
      <span className="text-2xl font-black tracking-[0.18em] text-[#16181a]">NORDBYGG</span>
      <div className="hidden md:flex items-center gap-9 text-sm font-medium uppercase tracking-wider text-[#16181a]/70">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} className="hover:text-[#16181a] transition-colors">{l.label}</a>
        ))}
      </div>
      <a
        href="#kontakt"
        className="rounded-sm bg-[#16181a] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-[#ece8e1] hover:bg-[#e07a24] hover:text-[#16181a] transition-colors"
      >
        Be om befaring
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative overflow-hidden bg-[#ece8e1] pt-28 sm:pt-32 pb-16 sm:pb-24">
    <Nav />
    <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
      <div>
        <span className="hero-elem inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#e07a24] mb-6">
          <HardHat className="w-4 h-4" /> Tømrer & totalentreprenør · Oslo og Viken
        </span>
        <h1 className="hero-elem font-black text-[#16181a] uppercase leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(42px, 7.4vw, 92px)' }}>
          Vi bygger<br />det som <span className="text-[#e07a24]">varer.</span>
        </h1>
        <p className="hero-elem mt-7 max-w-md text-[#3a3f44] text-base sm:text-lg leading-relaxed">
          Totalrenovering, bad, tak og tilbygg — utført av fagfolk med fagbrev. Én entreprenør tar hele ansvaret, fra befaring til ferdig nøkkel.
        </p>
        <div className="hero-elem mt-9 flex flex-wrap items-center gap-4">
          <a href="#kontakt" className="group inline-flex items-center gap-2 rounded-sm bg-[#16181a] px-7 py-3.5 text-[#ece8e1] font-bold uppercase tracking-wider transition-transform hover:scale-[1.03]">
            Be om gratis befaring <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#prosjekter" className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-[#16181a] border-b-2 border-[#16181a]/30 pb-0.5 hover:border-[#e07a24] transition-colors">
            Se prosjekter
          </a>
        </div>
        <div className="hero-elem mt-9 flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-[#3a3f44]">
          <ShieldCheck className="w-4 h-4 text-[#e07a24] shrink-0" />
          Sentralt godkjent · Fagbrev · 15 års erfaring
        </div>
      </div>
      <div className="hero-elem relative">
        <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl border-4 border-[#16181a]">
          <img src={photos.hero} alt="Håndverker i arbeid på et hus" className="w-full h-full object-cover" />
        </div>
        <div className="hidden sm:flex absolute -bottom-6 -left-6 flex-col gap-1 bg-[#e07a24] text-[#16181a] px-6 py-4 rounded-sm shadow-xl">
          <span className="font-black text-3xl leading-none">320+</span>
          <span className="font-mono text-[11px] uppercase tracking-wider">fullførte prosjekter</span>
        </div>
      </div>
    </div>
  </header>
);

const Marquee = () => {
  const items = ['Sentral godkjenning', 'Fagbrev', 'Fastpris', 'Gratis befaring', '15 års erfaring'];
  const row = [...items, ...items];
  return (
    <div className="bg-[#16181a] text-[#ece8e1] py-4 overflow-hidden border-y border-[#ece8e1]/10">
      <div className="flex whitespace-nowrap animate-[marqueeNord_28s_linear_infinite]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-6 font-mono text-sm uppercase tracking-[0.2em] opacity-85">
            {t} <span className="text-[#e07a24]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeNord { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
};

const Services = () => {
  const ref = useReveal(90);
  return (
    <section id="tjenester" ref={ref} className="bg-[#ece8e1] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14" data-reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e07a24]">Tjenester</span>
          <h2 className="font-black uppercase text-[#16181a] text-4xl sm:text-6xl tracking-tight mt-3 leading-[0.95]">Vi tar hele jobben.</h2>
          <p className="text-[#3a3f44] mt-4 leading-relaxed">Som totalentreprenør samler vi alle fag under ett tak. Du forholder deg til én kontaktperson, én kontrakt og én fast pris.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.name} data-reveal className="group flex flex-col border border-[#16181a]/15 bg-[#ece8e1] p-8 rounded-sm transition-colors hover:bg-[#16181a]">
              <s.icon className="w-9 h-9 text-[#e07a24] mb-6" />
              <h3 className="font-black uppercase text-2xl text-[#16181a] tracking-wide transition-colors group-hover:text-[#ece8e1]">{s.name}</h3>
              <p className="text-[#3a3f44] mt-3 leading-relaxed flex-1 transition-colors group-hover:text-[#ece8e1]/70">{s.desc}</p>
              <span className="mt-6 font-mono text-sm uppercase tracking-wider text-[#16181a] transition-colors group-hover:text-[#e07a24]">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const ref = useReveal(80);
  return (
    <section ref={ref} className="bg-[#16181a] text-[#ece8e1] py-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="text-center">
            <p className="font-black text-5xl sm:text-6xl text-[#e07a24] leading-none">{s.value}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#ece8e1]/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const ref = useReveal(70);
  return (
    <section id="prosjekter" ref={ref} className="bg-[#ece8e1] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12" data-reveal>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e07a24]">Prosjekter</span>
            <h2 className="font-black uppercase text-[#16181a] text-4xl sm:text-6xl tracking-tight mt-3 leading-[0.95]">Utvalgte arbeider.</h2>
          </div>
          <a href="#kontakt" className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-[#16181a] border-b-2 border-[#e07a24] pb-0.5">
            Start ditt prosjekt <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p, i) => (
            <div key={p.label} data-reveal className={`group relative overflow-hidden rounded-sm border border-[#16181a]/10 ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
              <img src={p.src} alt={p.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16181a]/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#e07a24]">{p.tag}</span>
                <p className="font-bold uppercase tracking-wide text-[#ece8e1] mt-1 leading-tight">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useReveal(110);
  const points = [
    { icon: HardHat, title: '15 års erfaring', desc: 'Hundrevis av prosjekter i Oslo og Viken — vi vet hva som holder over tid.' },
    { icon: ShieldCheck, title: 'Fagbrev & ansvarsrett', desc: 'Sentral godkjenning og ansvarsforsikring. Alt papirarbeid tar vi.' },
    { icon: Hammer, title: 'Ryddig arbeid', desc: 'Avtalte tider, rene byggeplasser og full opprydding etter endt jobb.' },
  ];
  return (
    <section id="om-oss" ref={ref} className="bg-[#16181a] text-[#ece8e1] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div data-reveal className="aspect-[4/5] overflow-hidden rounded-sm border-4 border-[#e07a24]">
          <img src={photos.portrait} alt="Tømrermester hos Nordbygg" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e07a24]" data-reveal>Om oss</span>
          <h2 data-reveal className="font-black uppercase text-4xl sm:text-5xl tracking-tight mt-3 leading-[0.95]">Solid håndverk,<br />uten overraskelser.</h2>
          <p data-reveal className="text-[#ece8e1]/70 mt-5 leading-relaxed max-w-md">
            Nordbygg er et lokalt tømrer- og entreprenørfirma. Vi tror på fast pris, tydelig kommunikasjon og fagfolk som tar stolthet i arbeidet. Du skal vite hva du får — før vi løfter første spiker.
          </p>
          <div className="mt-10 space-y-6">
            {points.map((p) => (
              <div key={p.title} data-reveal className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 grid place-items-center rounded-sm bg-[#e07a24] text-[#16181a]">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wide text-[#ece8e1] leading-tight">{p.title}</p>
                  <p className="text-sm text-[#ece8e1]/60 mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4" data-reveal>
            {team.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-sm overflow-hidden shrink-0 border-2 border-[#ece8e1]/20">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wide text-[#ece8e1] leading-tight">{m.name}</p>
                  <p className="font-mono text-xs uppercase tracking-wider text-[#ece8e1]/55">{m.role}</p>
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
    <section ref={ref} className="bg-[#ece8e1] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14" data-reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e07a24]">Anmeldelser</span>
          <h2 className="font-black uppercase text-[#16181a] text-4xl sm:text-6xl tracking-tight mt-3">Det kundene sier.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.name} data-reveal className="border border-[#16181a]/15 bg-[#ece8e1] p-8 rounded-sm">
              <span className="flex mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#e07a24] text-[#e07a24]" />)}</span>
              <p className="text-[#16181a] leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-5 font-mono text-xs uppercase tracking-wider text-[#3a3f44]">{r.name}</p>
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
    <section id="kontakt" ref={ref} className="bg-[#16181a] text-[#ece8e1] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e07a24]" data-reveal>Kontakt</span>
          <h2 data-reveal className="font-black uppercase text-4xl sm:text-6xl tracking-tight mt-3 leading-[0.95]">Gratis befaring<br />på huset ditt.</h2>
          <p data-reveal className="text-[#ece8e1]/70 mt-5 max-w-md leading-relaxed">Vi kommer ut, ser på jobben og gir deg en uforpliktende fastpris. Ring oss, så avtaler vi en tid som passer.</p>
          <div data-reveal className="mt-9 space-y-4">
            <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#e07a24]" /> 22 00 00 00</p>
            <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-[#e07a24]" /> Serverer Oslo og Viken</p>
            <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#e07a24]" /> Man–fre 07–16 · Befaring også på kveld</p>
          </div>
          <a href="tel:2200000" data-reveal className="group mt-9 inline-flex items-center gap-2 rounded-sm bg-[#e07a24] px-7 py-3.5 text-[#16181a] font-bold uppercase tracking-wider transition-transform hover:scale-[1.03]">
            Ring og bestill befaring <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div data-reveal className="aspect-[4/3] lg:aspect-auto overflow-hidden rounded-sm border-4 border-[#e07a24]">
          <img src={photos.facade} alt="Ferdig fasadeprosjekt fra Nordbygg" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#16181a] text-[#ece8e1] px-5 sm:px-8 pt-16 pb-10 border-t border-[#ece8e1]/10">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-8 pb-10 border-b border-[#ece8e1]/10">
        <div>
          <span className="text-3xl font-black tracking-[0.18em]">NORDBYGG</span>
          <p className="text-[#ece8e1]/55 text-sm mt-3 max-w-xs">Tømrer og totalentreprenør i Oslo og Viken. Vi bygger det som varer.</p>
        </div>
        <div className="flex gap-12 text-sm text-[#ece8e1]/70">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[#ece8e1]/40 uppercase tracking-widest text-xs mb-1">Firma</span>
            <a href="#tjenester" className="hover:text-[#e07a24] transition-colors">Tjenester</a>
            <a href="#prosjekter" className="hover:text-[#e07a24] transition-colors">Prosjekter</a>
            <a href="#kontakt" className="hover:text-[#e07a24] transition-colors">Kontakt</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[#ece8e1]/40 uppercase tracking-widest text-xs mb-1">Godkjenning</span>
            <span>Sentral godkjenning</span>
            <span>Ansvarsrett & forsikring</span>
            <span>Fagbrev tømrer</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 font-mono text-xs text-[#ece8e1]/45">
        <p>© {new Date().getFullYear()} Nordbygg (konsept/demo).</p>
        <a href="/#bestill-demo" className="group inline-flex items-center gap-1.5 hover:text-[#e07a24] transition-colors">
          Nettside av <span className="font-semibold lowercase">oppskalert.</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </footer>
);

const HandverkerDemo = () => (
  <div className="bg-[#ece8e1] min-h-screen font-sans selection:bg-[#e07a24] selection:text-[#16181a]">
    <SEO
      title="Nordbygg (demo)"
      description="Konseptside laget av Oppskalert — slik kan en moderne håndverkerside se ut. Ikke en ekte bedrift."
      canonical="https://oppskalert.no/eksempler/handverker"
      noindex
    />
    <DemoBanner />
    <Hero />
    <Marquee />
    <Services />
    <Stats />
    <Projects />
    <About />
    <Reviews />
    <Contact />
    <Footer />
  </div>
);

export default HandverkerDemo;
