import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "De leverte nettsiden vår på under en uke. Profesjonelt, raskt og bedre enn vi forventet.", name: "Kari Nilsen", company: "Nilsen Regnskap AS" },
  { quote: "Endelig en nettside som faktisk selger. Vi fikk tre nye kunder i løpet av den første måneden.", name: "Jonas Berg", company: "Berg Elektro" },
  { quote: "Enkelt å jobbe med og de forstod merkevaren vår med en gang. Anbefales!", name: "Silje Dahl", company: "Dahl Interiør" },
  { quote: "Jeg var skeptisk til prisen, men resultatet overgikk alt jeg hadde håpet på.", name: "Thomas Haugen", company: "Haugen Bygg" },
  { quote: "Oppskalert skjønner hva en liten bedrift faktisk trenger. Ingen unødvendig fluff.", name: "Marte Solberg", company: "Solberg Coaching" },
  { quote: "Fra idé til ferdig side på fem dager. Imponerende.", name: "Erik Andersen", company: "Andersen Konsult" },
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
        <div className="flex" ref={track1}>
          {doubled.map((t, i) => <Card key={i} t={t} />)}
        </div>
        <div className="flex" ref={track2}>
          {[...doubled].reverse().map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const navRef = useRef(null);
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

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full border border-transparent transition-all duration-300 w-[90%] max-w-5xl text-white">
      <div className="flex items-center gap-3">
        <span className="font-sans font-bold text-2xl tracking-tight lowercase">oppskalert.</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
        <a href="#features" className="hover:-translate-y-[1px] transition-transform">Løsninger</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Filosofi</a>
        <Link to="/vårt-arbeid" className="hover:-translate-y-[1px] transition-transform">Vårt arbeid</Link>
        <Link to="/blogg" className="hover:-translate-y-[1px] transition-transform">Blogg</Link>
        <a href="#contact" className="hover:-translate-y-[1px] transition-transform">Kontakt</a>
      </div>
      <Link to="/kom-i-gang" className="group relative overflow-hidden bg-surface text-primary border border-white/10 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md text-center">
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Bestill Demo</span>
        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      </Link>
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);
  const dotRef = useRef(null);
  const wordmarkRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-elem", { y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 });
      gsap.to(dotRef.current, {
        y: -18, duration: 0.4, ease: "power2.out",
        yoyo: true, repeat: -1, repeatDelay: 2, delay: 1.8
      });
      gsap.to(wordmarkRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: container.current, start: "top top", end: "40% top", scrub: true }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden" style={{backgroundColor: '#201335'}}>
      <div className="relative z-10 text-white pt-28 px-6 md:px-16 lg:px-24">
        <p className="hero-elem font-sans font-bold text-base md:text-lg uppercase tracking-widest text-white/50 mb-4">
          Norsk webutvikling
        </p>
        <h1
          className="hero-elem text-white font-black leading-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.03em', maxWidth: '14ch' }}
        >
          Nettsider som faktisk selger.
        </h1>
        <div className="hero-elem mt-10 flex items-center gap-6">
          <Link to="/kom-i-gang" className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300 text-center">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </Link>
          <span className="text-white/40 font-mono text-sm">Ingen binding. Ingen risiko.</span>
        </div>
      </div>
      <div ref={wordmarkRef} className="overflow-hidden leading-none select-none flex justify-end pr-6 md:pr-16 lg:pr-24 pb-10">
        <span
          className="hero-elem font-black text-white"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(60px, 10vw, 160px)', lineHeight: 1, letterSpacing: '-0.04em', paddingBottom: '0.1em' }}
        >
          oppskalert<span ref={dotRef} style={{ color: '#f5b97a', display: 'inline-block' }}>.</span>
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
  const container = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".member-card", {
        scrollTrigger: { trigger: container.current, start: "top 75%" },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const members = [
    { name: "Aleksander MacKee", role: "CTO", sub: "AI-ingeniør\nKunderelasjoner", image: "/founders/aleksander.webp", pos: "center 55%", phone: "974 09 897", tel: "+4797409897" },
    { name: "Franciscus Drake Bruseth", role: "CEO", sub: "Markedsføring\nProduktuutvikling", image: "/founders/franciscus.webp", pos: "center 25%", phone: "479 10 461", tel: "+4747910461" }
  ];

  return (
    <section id="team" ref={container} className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden rounded-t-[3rem]" style={{backgroundColor: '#f5e6d8'}}>
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{color: '#a06040'}}>Ekspertisen bak</span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-center" style={{color: '#201335'}}>Møt oss.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {members.map((member, i) => (
            <div key={i} className="member-card flex flex-col items-center text-center">
              <div className="w-full aspect-[3/4] rounded-[2rem] relative overflow-hidden mb-8 group shadow-xl">
                <ImageWithPlaceholder src={member.image} alt={member.name} pos={member.pos} />
              </div>
              <h3 className="font-sans font-bold text-3xl mb-1" style={{color: '#201335'}}>{member.name}</h3>
              <div className="font-mono text-sm uppercase tracking-widest flex flex-col gap-1 mb-4" style={{color: '#a06040'}}>
                <span>{member.role}</span>
                <span className="text-sm md:text-lg italic whitespace-pre-line leading-relaxed" style={{color: '#201335', opacity: 0.5}}>{member.sub}</span>
              </div>
              <div className="flex flex-col gap-1 font-mono text-sm">
                <a href={`tel:${member.tel}`} className="hover:opacity-70 transition-opacity font-semibold" style={{color: '#201335'}}>{member.phone}</a>
                <a href="mailto:team@oppskalert.no" className="hover:opacity-70 transition-opacity" style={{color: '#a06040'}}>team@oppskalert.no</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




const projects = [
  { img: "/websider/katrin-brubakk.png", name: "Katrin Brubakk", url: "https://katrinbrubakk.no" },
  { img: "/websider/tore-sunde-rasmussen.png", name: "Tore Sunde-Rasmussen", url: "https://toresunderasmussen.no" },
  { img: "/websider/irmelin-drake-ny.png", name: "Irmelin Drake", url: "https://irmelindrake.no" },
];

const Portfolio = () => {
  const container = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".portfolio-item", {
        scrollTrigger: { trigger: container.current, start: "top 80%" },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-5xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Referanser</span>
        <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter mt-2">Noe av det vi har laget.</h2>
      </div>
      <div className="columns-2 md:columns-3 gap-4 max-w-5xl mx-auto">
        {projects.map((p, i) => {
          const inner = (
            <>
              <img
                src={p.img}
                alt={p.name}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold text-white text-sm">{p.name}</span>
                  {p.url && <ArrowRight className="w-4 h-4 text-accent" />}
                </div>
              </div>
            </>
          );
          return p.url ? (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
              className="portfolio-item break-inside-avoid mb-4 rounded-2xl overflow-hidden group relative block cursor-pointer">
              {inner}
            </a>
          ) : (
            <div key={i} className="portfolio-item break-inside-avoid mb-4 rounded-2xl overflow-hidden group relative">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ContactCTA = () => (
  <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-primary relative z-40 rounded-[4rem] text-background overflow-hidden">
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-background/50 mb-4">Kom i gang</span>
      <h2 className="font-sans text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Klar for en nettside som selger?</h2>
      <p className="font-mono text-sm md:text-base text-background/60 max-w-xl mb-12 leading-relaxed">
        Vi setter pris på alle prosjekter individuelt — ingen skjulte kostnader, ingen binding. Ta kontakt så gir vi deg et tilbud innen 24 timer.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link to="/kom-i-gang" className="group relative overflow-hidden bg-background text-primary px-10 py-5 rounded-full font-sans font-bold text-lg transition-transform hover:scale-[1.03] duration-300">
          <span className="relative z-10 flex items-center gap-2">Kontakt for tilbud <ArrowRight className="w-5 h-5" /></span>
        </Link>
        <a href="tel:+4797409897" className="font-mono text-background/60 hover:text-background transition-colors text-sm">
          eller ring oss: 974 09 897
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-background text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 relative z-40 mt-[-4rem]">
      <div className="max-w-5xl mx-auto">
        {/* CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Klar til å starte?</p>
            <h2 className="font-sans font-black text-4xl md:text-6xl tracking-tighter text-white leading-none" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
              La oss bygge<br />noe bra sammen.
            </h2>
          </div>
          <Link to="/kom-i-gang" className="flex-shrink-0 flex items-center gap-2 bg-accent text-background px-8 py-4 rounded-full font-sans font-bold text-base hover:scale-[1.03] transition-transform duration-300">
            Kontakt for tilbud <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Info */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pt-12">
          <div>
            <span className="font-sans font-bold text-2xl tracking-tight lowercase block mb-1">oppskalert.</span>
            <p className="font-mono text-white/30 text-xs">et datterselskap av PotentialAIze AS</p>
          </div>
          <div className="flex gap-16 font-mono text-sm">
            <div className="flex flex-col gap-3">
              <span className="text-white/40 uppercase tracking-widest text-xs font-semibold mb-1">Kontakt</span>
              <a href="tel:+4797409897" className="text-white hover:text-accent transition-colors">974 09 897</a>
              <a href="tel:+4747910461" className="text-white hover:text-accent transition-colors">479 10 461</a>
              <a href="mailto:team@oppskalert.no" className="text-accent hover:text-highlight transition-colors">team@oppskalert.no</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white/40 uppercase tracking-widest text-xs font-semibold mb-1">Selskap</span>
              <span className="text-white/50">Orgnr: 935 067 049</span>
              <span className="text-white/50">Oslo, Norge</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center font-mono text-xs text-white/20">
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

const Home = () => (
  <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <MeetUs />
      <Testimonials />
      <Portfolio />
      <ContactCTA />
    </main>
    <Footer />
  </div>
);

function App() {
  return <Home />;
}

export default App;
