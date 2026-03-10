import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Server, Terminal, Settings2, BarChart3, Fingerprint, Cpu, Calendar, CheckSquare, Activity, Monitor } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import WavingCanvas from './components/ShaderWaving';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

// --- Component Fragments ---

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
            gsap.to(navRef.current, { backgroundColor: 'rgba(255, 255, 255, 0.90)', backdropFilter: 'blur(16px)', color: '#111111', borderColor: 'rgba(0,0,0,0.1)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', color: '#FFFFFF', borderColor: 'transparent', duration: 0.3 });
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
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protokoll</a>
      </div>
      <button className="group relative overflow-hidden bg-white text-primary px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md">
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Bestill Demo</span>
        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      </button>
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518391846015-55a9fc00371cf?q=80&w=2600&auto=format&fit=crop"
          alt="Brutalist Architecture"
          className="w-full h-full object-cover opacity-60 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl text-white">
        <h1 className="flex flex-col gap-2">
          <span className="hero-elem font-sans font-bold text-3xl md:text-5xl tracking-tight uppercase">Skaler din</span>
          <span className="hero-elem font-serif italic text-7xl md:text-9xl tracking-tighter leading-none mt-2">Bedrift.</span>
        </h1>
        <p className="hero-elem mt-8 font-mono text-sm md:text-base text-white/70 max-w-md leading-relaxed">
          Vi bygger nettsider og systemer som skalerer norske bedrifter. Ingen kompromisser, kun presisjon.
        </p>
        <div className="hero-elem mt-10 flex gap-4">
          <button className="group relative overflow-hidden bg-white text-primary px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

const CardShuffler = () => {
  return (
    <div className="bg-surface border border-primary/10 rounded-[2rem] p-8 shadow-sm h-[320px] flex flex-col justify-between relative overflow-hidden group hover:-translate-y-[2px] transition-transform duration-500">
      <div>
        <h3 className="font-sans font-bold text-2xl mb-2">Automatisert.</h3>
        <p className="text-sm font-mono text-primary/60">Uendelige vekstloops.</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-80 mix-blend-difference pointer-events-none">
        <WavingCanvas />
      </div>
    </div>
  );
};

const CardTypewriter = () => {
  const [text, setText] = useState("");
  const fullText = "Implementer løsninger som bygger din bedrift fra grunnen.";
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typing);
      }
    }, 50);

    const blink = setInterval(() => setCursor(c => !c), 500);

    return () => { clearInterval(typing); clearInterval(blink); };
  }, []);

  return (
    <div className="bg-surface border border-primary/10 rounded-[2rem] p-8 shadow-sm h-[320px] flex flex-col justify-between group hover:-translate-y-[2px] transition-transform duration-500">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
          <span className="font-mono text-xs uppercase text-primary/50 tracking-widest">Live Feed</span>
        </div>
        <h3 className="font-sans font-bold text-2xl mb-2">Implementer.</h3>
      </div>
      <div className="bg-primary text-white p-6 rounded-2xl h-32 font-mono text-sm leading-relaxed relative">
        <Terminal className="w-4 h-4 absolute top-4 right-4 text-white/20" />
        <span className="text-accent">{'> '}</span>
        {text}
        <span className={clsx("inline-block w-2.h-4 bg-white ml-1", cursor ? "opacity-100" : "opacity-0")}>_</span>
      </div>
    </div>
  );
};

const CardScheduler = () => {
  const days = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDay(prev => (prev + 1) % 5); // Just cycle weekdays
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface border border-primary/10 rounded-[2rem] p-8 shadow-sm h-[320px] flex flex-col justify-between group hover:-translate-y-[2px] transition-transform duration-500">
      <div>
        <h3 className="font-sans font-bold text-2xl mb-2">Invester.</h3>
        <p className="text-sm font-mono text-primary/60">Kontinuerlig vekstrate.</p>
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <Calendar className="w-4 h-4 text-primary/40" />
          <span className="font-mono text-xs uppercase text-primary/60">Q3 SPRINT</span>
        </div>
        <div className="flex gap-2">
          {days.map((day, i) => (
            <div
              key={i}
              className={clsx(
                "flex-1 aspect-square rounded-lg flex items-center justify-center font-mono text-xs transition-all duration-300",
                i === activeDay ? "bg-primary text-white scale-110 shadow-md" : "bg-background text-primary/40"
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Features = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={container} className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card"><CardShuffler /></div>
        <div className="feature-card"><CardTypewriter /></div>
        <div className="feature-card"><CardScheduler /></div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".phil-text", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="philosophy" className="relative py-48 px-6 md:px-12 overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1541888086225-ee808aae1b8c?q=80&w=2000&auto=format&fit=crop"
          alt="Concrete Texture"
          className="parallax-bg w-full h-[120%] object-cover grayscale"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <p className="phil-text font-mono text-sm md:text-xl text-white/50 uppercase tracking-widest leading-relaxed">
          De fleste byråer fokuserer på: standardiserte maler og kortsiktig støy.
        </p>
        <p className="phil-text font-serif italic text-4xl md:text-7xl leading-tight">
          Vi fokuserer på: digitale systemer som <span className="text-white not-italic font-sans font-bold uppercase tracking-tighter mix-blend-difference">konverterer</span> trafikk til kapital.
        </p>
      </div>
    </section>
  );
};

const ProtocolStep = ({ num, title, desc, animType, index }) => {
  return (
    <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center p-6" style={{ zIndex: index }}>
      <div className="protocol-card w-full max-w-6xl bg-surface rounded-[3rem] h-[80vh] shadow-xl border border-primary/10 overflow-hidden flex flex-col md:flex-row relative">
        <div className="flex-1 p-12 md:p-24 flex flex-col justify-center">
          <span className="font-mono text-2xl font-bold text-primary/20 mb-6">0{num}</span>
          <h2 className="font-sans font-bold text-4xl md:text-6xl mb-6 tracking-tight">{title}</h2>
          <p className="font-mono text-primary/60 text-sm md:text-base leading-relaxed max-w-md">{desc}</p>
        </div>
        <div className="flex-1 bg-background relative flex items-center justify-center p-12 overflow-hidden border-l border-primary/5">
          {animType === 1 && (
            <div className="w-64 h-64 border border-primary relative rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
              <div className="w-48 h-48 border border-primary/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute w-full h-[1px] bg-primary/20"></div>
              <div className="absolute h-full w-[1px] bg-primary/20"></div>
            </div>
          )}
          {animType === 2 && (
            <div className="w-full max-w-md grid grid-cols-10 gap-2 relative">
              <div className="absolute top-0 bottom-0 w-full bg-primary/5 z-0 animate-[pulse_4s_ease-in-out_infinite]"></div>
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="aspect-square bg-primary/10 rounded-sm"></div>
              ))}
              <div className="absolute top-0 bottom-0 w-[2px] bg-primary z-10 animate-[ping_3s_linear_infinite]" style={{ left: '30%' }}></div>
            </div>
          )}
          {animType === 3 && (
            <svg viewBox="0 0 200 100" className="w-full max-w-md stroke-primary fill-transparent stroke-2">
              <path d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 200 50" strokeDasharray="300" strokeDashoffset="300" className="animate-[dash_3s_linear_infinite]">
                <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" repeatCount="indefinite" />
              </path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            }
          });
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={container} className="relative bg-background">
      <ProtocolStep num={1} title="Strategi & Analyse." desc="Vi kartlegger bedriftens flaskehalser og designer en skalerbar arkitektur skreddersydd for deres vekstmål." animType={1} index={10} />
      <ProtocolStep num={2} title="Utvikling & Setup." desc="Implementering av robuste systemer, landingssider og datadrevne integrasjoner med pixel-perfekt presisjon." animType={2} index={20} />
      <ProtocolStep num={3} title="Skalering & Drift." desc="Lansering, kontinuerlig optimalisering og datainnsamling for å maksimere ROAS og konverteringsrater." animType={3} index={30} />
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-surface relative z-40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">

        <div className="bg-background border border-primary/10 rounded-[2rem] p-12 flex-1 w-full relative group hover:-translate-y-2 transition-transform duration-500">
          <h3 className="font-mono text-sm tracking-widest text-primary/60 mb-4">FASE 1</h3>
          <h4 className="font-sans text-4xl font-bold mb-6">Gratis Demo</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm mb-12">
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Strategisk Kartlegging</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Analyse av Plattform</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Teknisk Audit</li>
          </ul>
          <button className="w-full py-4 rounded-full border border-primary font-sans font-medium text-sm hover:bg-primary hover:text-white transition-colors duration-300">
            Book Samtale
          </button>
        </div>

        <div className="bg-primary text-white border border-primary rounded-[2.5rem] p-12 flex-1 relative w-full hover:-translate-y-2 transition-transform duration-500 shadow-2xl scale-105">
          <div className="absolute -top-4 right-8 bg-white text-primary text-xs font-mono font-bold px-3 py-1 rounded-full">POPULÆR</div>
          <h3 className="font-mono text-sm tracking-widest text-white/50 mb-4">FASE 2</h3>
          <h4 className="font-sans text-4xl font-bold mb-6">Vekstpakke</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm mb-12 text-white/80">
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-white" /> Full Custom Nettside</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-white" /> Sømløse Integrasjoner</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-white" /> Konverteringsoptimalisering</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-white" /> Driftsavtale & Support</li>
          </ul>
          <button className="w-full py-4 rounded-full bg-white text-primary font-sans font-bold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg">
            Bestill Vekstpakke
          </button>
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 rounded-t-[4rem] relative z-40 mt-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans font-bold text-3xl tracking-tight lowercase text-white">oppskalert.</span>
          </div>
          <p className="font-mono text-white/50 text-sm leading-relaxed mb-8">
            Vi bygger nettsider og systemer som skalerer norske bedrifter. Ingen kompromisser, kun presisjon.
          </p>
          <div className="flex items-center gap-3 font-mono text-sm font-semibold bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            SYSTEM OPERATIONAL
          </div>
        </div>

        <div className="flex gap-16 font-mono text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-white/40 uppercase tracking-widest mb-2 font-semibold">Navigasjon</span>
            <a href="#features" className="hover:text-white/70 transition-colors">Løsninger</a>
            <a href="#philosophy" className="hover:text-white/70 transition-colors">Filosofi</a>
            <a href="#protocol" className="hover:text-white/70 transition-colors">Protokoll</a>
            <a href="#pricing" className="hover:text-white/70 transition-colors">Tjenester</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/40 uppercase tracking-widest mb-2 font-semibold">Legal</span>
            <a href="#" className="hover:text-white/70 transition-colors">Personvern</a>
            <a href="#" className="hover:text-white/70 transition-colors">Vilkår</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} Oppskalert. All rights reserved.</p>
        <p>Built with precision in Norway.</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
