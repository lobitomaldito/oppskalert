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
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protokoll</a>
      </div>
      <a 
        href="mailto:team@oppskalert.no"
        className="group relative overflow-hidden bg-surface text-primary border border-white/10 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md text-center"
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Bestill Demo</span>
        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      </a>
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
    <section ref={container} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-background">
      {/* Background Image / Shader */}
      <div className="absolute inset-0 z-0 bg-background">
        <WavingCanvas className="w-full h-full object-cover opacity-60 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
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
          <a 
            href="mailto:team@oppskalert.no"
            className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300 text-center"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

const MeetUs = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".member-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const members = [
    {
      name: "Aleksander MacKee",
      role: "CTO",
      sub: "Grunnlegger",
      image: "/founders/aleksander.png",
      pos: "center 15%"
    },
    {
      name: "Francisus Drake",
      role: "CEO",
      sub: "Grunnlegger",
      image: "/founders/franciscus.JPG",
      pos: "center 20%"
    }
  ];

  return (
    <section id="team" ref={container} className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Ekspertisen bak</span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-center">Møt oss.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {members.map((member, i) => (
            <div key={i} className="member-card flex flex-col items-center text-center">
              <div className="w-64 h-64 rounded-full border border-primary/10 bg-surface/30 backdrop-blur-sm relative overflow-hidden mb-8 group">
                {/* Photo or Placeholder */}
                <ImageWithPlaceholder 
                  src={member.image} 
                  alt={member.name} 
                  pos={member.pos}
                />
                {/* Visual ring */}
                <div className="absolute inset-0 border-[8px] border-background pointer-events-none rounded-full"></div>
              </div>
              <h3 className="font-sans font-bold text-3xl mb-1">{member.name}</h3>
              <div className="font-mono text-sm uppercase tracking-widest text-accent flex flex-col gap-1">
                <span>{member.role}</span>
                <span className="opacity-50 text-xs italic">{member.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImageWithPlaceholder = ({ src, alt, pos }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
        <Fingerprint className="w-12 h-12 text-primary/10 group-hover:scale-110 transition-transform duration-500" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover"
      style={{ objectPosition: pos }}
      onError={() => setError(true)}
    />
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
    <section ref={container} id="philosophy" className="relative py-48 px-6 md:px-12 overflow-hidden bg-background text-white">
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1541888086225-ee808aae1b8c?q=80&w=2000&auto=format&fit=crop"
          alt="Concrete Texture"
          className="parallax-bg w-full h-[120%] object-cover grayscale will-change-transform"
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
      <div className="protocol-card w-full max-w-6xl bg-surface rounded-[3rem] h-[80vh] shadow-xl border border-primary/10 overflow-hidden flex flex-col md:flex-row relative will-change-[transform,opacity]">
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
      <div className="max-w-md mx-auto flex flex-col items-center justify-center">

        <div className="bg-background border border-primary/10 rounded-[2rem] p-12 w-full relative group hover:-translate-y-2 transition-transform duration-500 shadow-sm">
          <h3 className="font-mono text-sm tracking-widest text-primary/60 mb-4">FASE 1</h3>
          <h4 className="font-sans text-4xl font-bold mb-6">Gratis Demo</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm mb-12">
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Strategisk Kartlegging</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Analyse av Plattform</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Teknisk Audit</li>
          </ul>
          <a 
            href="mailto:team@oppskalert.no"
            className="block w-full py-4 rounded-full border border-primary font-sans font-medium text-sm text-center hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Book Samtale
          </a>
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 rounded-t-[4rem] relative z-40 mt-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans font-bold text-3xl tracking-tight lowercase text-white">oppskalert.</span>
          </div>
          <p className="font-mono text-white/50 text-sm leading-relaxed mb-8">
            Vi bygger nettsider og systemer som skalerer norske bedrifter. Ingen kompromisser, kun presisjon.
          </p>
          <div className="flex items-center gap-3 font-mono text-sm font-semibold bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-highlight animate-pulse"></div>
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
        <MeetUs />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
