import { ArrowRight, ArrowUpRight, Smile, ShieldCheck, HeartPulse, Clock, MapPin, Phone, Star, Sparkles } from 'lucide-react';
import SEO from '../../components/SEO';
import { useReveal } from '../../lib/useReveal';

/*
 * Konseptside / DEMO. Fiktiv tannklinikk "Klar Tannklinikk".
 * Egen merkevare og fargepalett (ren, rolig, klinisk-men-varm) for å vise spennvidde.
 * Ikke en ekte kunde: noindex + tydelig demo-banner. Bygget av Oppskalert.
 */

const img = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const photos = {
  hero: img('1629909613654-28e377c37b09', 1300),
  treatment: img('1629909615957-be38d48fbbe6', 1200),
  patient: img('1681939278218-a755fb2bf2d3', 1200),
  interior: img('1598256989800-fe5f95da9787', 1300),
  portrait: img('1684607632642-559bdc14d3ca', 900),
};

const treatments = [
  { name: 'Undersøkelse & tannrens', desc: 'Grundig sjekk, profesjonell rens og en klar plan for tannhelsen din.', price: 'fra 690,–' },
  { name: 'Tannbleking', desc: 'Skånsom bleking som gir et lysere og friskere smil, trygt og effektivt.', price: 'fra 2 490,–' },
  { name: 'Implantater', desc: 'Permanent erstatning for tapte tenner, planlagt med moderne 3D-bilder.', price: 'fra 14 900,–' },
  { name: 'Tannregulering', desc: 'Diskré regulering med usynlige skinner for rette tenner i alle aldre.', price: 'fra 24 900,–' },
];

const team = [
  { name: 'Dr. Sofie Halvorsen', role: 'Tannlege · Spesialist i estetikk', img: photos.portrait },
  { name: 'Andreas Berg', role: 'Tannlege · Implantater', img: photos.patient },
  { name: 'Nora Lien', role: 'Tannpleier', img: photos.treatment },
];

const reviews = [
  { quote: 'Jeg har alltid grudd meg til tannlegen, men her ble jeg tatt imot med ro og forklart alt underveis. Helt smertefritt.', name: 'Marte K.' },
  { quote: 'Sentralt, moderne og utrolig hyggelig personale. Fikk akuttime samme dag da jeg hadde vondt. Anbefales!', name: 'Jonas R.' },
  { quote: 'Beste tannlegeopplevelsen jeg har hatt. Ren klinikk, dyktige folk og tydelig pris før vi startet.', name: 'Linnea T.' },
];

const promises = [
  { icon: ShieldCheck, title: 'Trygt for nervøse', desc: 'Vi tar oss god tid, forklarer alt og lar deg styre tempoet.' },
  { icon: HeartPulse, title: 'Moderne utstyr', desc: 'Digital røntgen og 3D-bilder gir presis og skånsom behandling.' },
  { icon: Smile, title: 'Tydelige priser', desc: 'Du får alltid et klart prisoverslag før vi setter i gang.' },
];

// Tydelig at dette er en demo Oppskalert har laget. Leder tilbake til pitchen.
const DemoBanner = () => (
  <div className="sticky top-0 z-[60] w-full bg-[#123b46] text-[#f4f7f8]">
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 py-2.5">
      <span className="flex items-center gap-2 text-[11px] sm:text-xs tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#2f9c8f] shrink-0" />
        <span className="opacity-80">Demo · en konseptside laget av</span>
        <span className="font-semibold lowercase">oppskalert.</span>
      </span>
      <a
        href="/#bestill-demo"
        className="group flex items-center gap-1.5 rounded-full bg-[#2f9c8f] px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#062a31] transition-transform hover:scale-[1.03]"
      >
        Få din egen gratis
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  </div>
);

const navLinks = [
  { label: 'Behandlinger', href: '#behandlinger' },
  { label: 'Om klinikken', href: '#om-klinikken' },
  { label: 'Team', href: '#team' },
  { label: 'Kontakt', href: '#kontakt' },
];

const Nav = () => (
  <nav className="absolute top-0 inset-x-0 z-40">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-6">
      <span className="font-sans font-semibold text-2xl text-[#123b46] tracking-tight">
        Klar<span className="text-[#2f9c8f]">.</span>
      </span>
      <div className="hidden md:flex items-center gap-9 text-sm text-[#123b46]/75">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} className="hover:text-[#123b46] transition-colors">{l.label}</a>
        ))}
      </div>
      <a
        href="#kontakt"
        className="rounded-full bg-[#123b46] px-5 py-2 text-sm font-medium text-[#f4f7f8] hover:bg-[#2f9c8f] hover:text-[#062a31] transition-colors"
      >
        Bestill time
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative overflow-hidden bg-[#f4f7f8] pt-28 sm:pt-32 pb-16 sm:pb-24">
    <Nav />
    <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
      <div>
        <span className="hero-elem inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#2f9c8f] mb-6">
          <Smile className="w-4 h-4" /> Tannklinikk i Oslo
        </span>
        <h1 className="hero-elem font-sans font-medium text-[#123b46] leading-[1.02] tracking-tight" style={{ fontSize: 'clamp(42px, 6.6vw, 82px)' }}>
          Tannhelse i<br /><span className="text-[#2f9c8f]">trygge hender</span>.
        </h1>
        <p className="hero-elem mt-7 max-w-md text-[#123b46]/70 text-base sm:text-lg leading-relaxed">
          En moderne og smertefri klinikk sentralt i Oslo, der erfarne tannleger tar seg tid til deg, i rolige, lyse omgivelser.
        </p>
        <div className="hero-elem mt-9 flex flex-wrap items-center gap-4">
          <a href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-[#123b46] px-7 py-3.5 text-[#f4f7f8] font-medium transition-transform hover:scale-[1.03]">
            Bestill time <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#behandlinger" className="inline-flex items-center gap-2 text-[#123b46] font-medium border-b border-[#123b46]/30 pb-0.5 hover:border-[#2f9c8f] hover:text-[#2f9c8f] transition-colors">
            Se behandlinger
          </a>
        </div>
        <p className="hero-elem mt-9 text-sm text-[#123b46]/65 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#2f9c8f]" /> Akutttimer samme dag</span>
          <span className="text-[#bcd6da]">·</span>
          <span>Avtale med HELFO</span>
          <span className="text-[#bcd6da]">·</span>
          <span>Trygt for nervøse</span>
        </p>
      </div>
      <div className="hero-elem relative">
        <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-[#123b46]/5">
          <img src={photos.hero} alt="Moderne tannlegestol og utstyr hos Klar Tannklinikk" className="w-full h-full object-cover" />
        </div>
        <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 rounded-[1.5rem] bg-white p-4 shadow-xl ring-8 ring-[#f4f7f8]">
          <span className="flex mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#2f9c8f] text-[#2f9c8f]" />)}</span>
          <p className="text-sm font-medium text-[#123b46] leading-tight">4,9 av 5</p>
          <p className="text-xs text-[#123b46]/55 mt-0.5">320+ fornøyde pasienter</p>
        </div>
      </div>
    </div>
  </header>
);

const Marquee = () => {
  const items = ['Sentralt i Oslo', 'Akutttimer', 'Trygg & smertefri', 'HELFO-avtale', 'Moderne utstyr'];
  const row = [...items, ...items];
  return (
    <div className="bg-[#123b46] text-[#f4f7f8] py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marqueeKlar_30s_linear_infinite]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-6 text-sm uppercase tracking-[0.2em] opacity-85">
            {t} <span className="text-[#2f9c8f]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeKlar { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
};

const Promises = () => {
  const ref = useReveal(90);
  return (
    <section ref={ref} className="bg-[#f4f7f8] py-20 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {promises.map((p) => (
          <div key={p.title} data-reveal className="rounded-3xl bg-white p-8 ring-1 ring-[#123b46]/5 shadow-sm">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#bcd6da]/40 text-[#123b46] mb-5">
              <p.icon className="w-6 h-6" />
            </span>
            <h3 className="font-sans font-medium text-xl text-[#123b46]">{p.title}</h3>
            <p className="text-[#123b46]/65 mt-2 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Treatments = () => {
  const ref = useReveal(90);
  return (
    <section id="behandlinger" ref={ref} className="bg-[#f4f7f8] pb-24 sm:pb-32 pt-4 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14" data-reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-[#2f9c8f]">Behandlinger & priser</span>
          <h2 className="font-sans font-medium text-[#123b46] text-4xl sm:text-6xl tracking-tight mt-3">Stell som varer.</h2>
          <p className="text-[#123b46]/65 mt-4 leading-relaxed">Alle priser inkluderer konsultasjon. Du får alltid et tydelig overslag før behandlingen starter.</p>
        </div>
        <div className="divide-y divide-[#123b46]/10 border-y border-[#123b46]/10">
          {treatments.map((t) => (
            <div key={t.name} data-reveal className="group grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 items-baseline py-7">
              <div>
                <h3 className="font-sans font-medium text-2xl sm:text-3xl text-[#123b46] group-hover:text-[#2f9c8f] transition-colors">{t.name}</h3>
                <p className="text-[#123b46]/60 mt-1.5 max-w-md">{t.desc}</p>
              </div>
              <span className="font-mono text-lg text-[#123b46] whitespace-nowrap">{t.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useReveal(100);
  return (
    <section id="om-klinikken" ref={ref} className="bg-[#123b46] text-[#f4f7f8] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div data-reveal className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl order-last lg:order-first">
          <img src={photos.interior} alt="Lyse og rolige omgivelser hos Klar Tannklinikk" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#2f9c8f]" data-reveal>Om klinikken</span>
          <h2 data-reveal className="font-sans font-medium text-4xl sm:text-5xl tracking-tight mt-3">En rolig klinikk å komme til.</h2>
          <p data-reveal className="text-[#f4f7f8]/75 mt-5 leading-relaxed">
            Klar Tannklinikk ble til med én tanke: at et tannlegebesøk skal føles trygt. Vi har bygget en lys, rolig klinikk med moderne utstyr, der du blir sett, hørt og tatt godt vare på, også om du synes tannlegen er litt skummel.
          </p>
          <div data-reveal className="mt-8 grid sm:grid-cols-3 gap-6">
            {[
              { n: '22', l: 'år med erfaring' },
              { n: '1 800', l: 'pasienter i journal' },
              { n: '4,9', l: 'i snittvurdering' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-sans font-medium text-3xl text-[#2f9c8f]">{s.n}</p>
                <p className="text-sm text-[#f4f7f8]/60 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const ref = useReveal(90);
  return (
    <section id="team" ref={ref} className="bg-[#f4f7f8] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14" data-reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-[#2f9c8f]">Teamet</span>
          <h2 className="font-sans font-medium text-[#123b46] text-4xl sm:text-6xl tracking-tight mt-3">Folkene du møter.</h2>
          <p className="text-[#123b46]/65 mt-4 leading-relaxed">Erfarne, rolige og opptatt av at du skal ha det bra i stolen.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((p) => (
            <div key={p.name} data-reveal className="group">
              <div className="aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-sm ring-1 ring-[#123b46]/5">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="font-sans font-medium text-xl text-[#123b46] mt-5">{p.name}</p>
              <p className="text-sm text-[#123b46]/60 mt-0.5">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const ref = useReveal(90);
  return (
    <section ref={ref} className="bg-[#bcd6da]/30 py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 data-reveal className="font-sans font-medium text-[#123b46] text-4xl sm:text-6xl tracking-tight mb-14 text-center">Det pasientene sier.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} data-reveal className="rounded-3xl bg-white p-8 ring-1 ring-[#123b46]/5 shadow-sm">
              <span className="flex mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-[#2f9c8f] text-[#2f9c8f]" />)}</span>
              <p className="text-[#123b46]/85 leading-relaxed">«{r.quote}»</p>
              <p className="mt-5 text-sm text-[#123b46]/55">{r.name}</p>
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
    <section id="kontakt" ref={ref} className="bg-[#f4f7f8] py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#2f9c8f]" data-reveal>Bestill time</span>
          <h2 data-reveal className="font-sans font-medium text-[#123b46] text-4xl sm:text-6xl tracking-tight mt-3">Vi tar godt<br />vare på deg.</h2>
          <p data-reveal className="text-[#123b46]/70 mt-5 max-w-md leading-relaxed">Ring oss, eller send en melding. Har du akutte smerter, prøver vi alltid å finne en time samme dag.</p>
          <div data-reveal className="mt-9 space-y-4 text-[#123b46]">
            <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-[#2f9c8f]" /> Storgata 18, 0184 Oslo</p>
            <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#2f9c8f]" /> 21 00 00 00</p>
            <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#2f9c8f]" /> Man–fre 08–18 · Lør 10–14</p>
          </div>
          <div data-reveal className="mt-6 rounded-2xl bg-[#bcd6da]/30 px-5 py-4 text-sm text-[#123b46]/80 ring-1 ring-[#123b46]/5">
            <span className="font-medium text-[#123b46]">Akutt tannverk?</span> Ring oss før kl. 12, så holder vi av tid for akuttpasienter samme dag.
          </div>
          <a href="tel:2100000" data-reveal className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#123b46] px-7 py-3.5 text-[#f4f7f8] font-medium transition-transform hover:scale-[1.03]">
            Ring og bestill time <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div data-reveal className="aspect-[4/3] lg:aspect-auto rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-[#123b46]/5">
          <img src={photos.patient} alt="Tannlege i samtale med en pasient" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#123b46] text-[#f4f7f8] px-5 sm:px-8 pt-16 pb-10">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-8 pb-10 border-b border-[#f4f7f8]/10">
        <div>
          <span className="font-sans font-semibold text-3xl">Klar<span className="text-[#2f9c8f]">.</span></span>
          <p className="text-[#f4f7f8]/55 text-sm mt-2 max-w-xs">Tannklinikk i Oslo. Tannhelse i trygge hender.</p>
        </div>
        <div className="flex gap-12 text-sm text-[#f4f7f8]/70">
          <div className="flex flex-col gap-2">
            <span className="text-[#f4f7f8]/40 uppercase tracking-widest text-xs mb-1">Klinikken</span>
            <a href="#behandlinger" className="hover:text-[#f4f7f8]">Behandlinger</a>
            <a href="#om-klinikken" className="hover:text-[#f4f7f8]">Om klinikken</a>
            <a href="#kontakt" className="hover:text-[#f4f7f8]">Kontakt</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#f4f7f8]/40 uppercase tracking-widest text-xs mb-1">Kontakt</span>
            <a href="tel:2100000" className="hover:text-[#f4f7f8]">21 00 00 00</a>
            <span>Storgata 18, Oslo</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-xs text-[#f4f7f8]/45">
        <p>© {new Date().getFullYear()} Klar Tannklinikk (konsept/demo).</p>
        <a href="/#bestill-demo" className="group inline-flex items-center gap-1.5 hover:text-[#f4f7f8] transition-colors">
          Nettside av <span className="font-semibold lowercase">oppskalert.</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </footer>
);

const TannlegeDemo = () => (
  <div className="bg-[#f4f7f8] min-h-screen font-sans selection:bg-[#123b46] selection:text-[#f4f7f8]">
    <SEO
      title="Klar Tannklinikk (demo)"
      description="Konseptside laget av Oppskalert. Slik kan en moderne tannlegeside se ut. Ikke en ekte bedrift."
      canonical="https://oppskalert.no/eksempler/tannlege"
      noindex
    />
    <DemoBanner />
    <Hero />
    <Marquee />
    <Promises />
    <Treatments />
    <About />
    <Team />
    <Reviews />
    <Contact />
    <Footer />
  </div>
);

export default TannlegeDemo;
