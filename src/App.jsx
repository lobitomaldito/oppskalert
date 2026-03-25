import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Server, Terminal, Settings2, BarChart3, Fingerprint, Cpu, Calendar, CheckSquare, Activity, Monitor, Code, Globe, Smartphone, Eye, ListSearch } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntakePage from './pages/IntakePage';
import WavingCanvas from './components/ShaderWaving';
import LiquidGlass from './components/LiquidGlass';
import OppskalertFAQ from './components/OppskalertFAQ';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

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
        <a href="#portfolio" className="hover:-translate-y-[1px] transition-transform">Det vi driver med</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Filosofi</a>
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protokoll</a>
      </div>
      <a href="mailto:team@oppskalert.no" className="group relative overflow-hidden bg-surface text-primary border border-white/10 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md text-center">
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
      gsap.from(".hero-elem", { y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-background">
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
          <a href="mailto:team@oppskalert.no" className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300 text-center">
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

const Statistics = () => {
  const container = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-box", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Eye, text: "94% av førsteinntrykket til hjemmesider er relatert til design" },
    { icon: ListSearch, text: "74% av mennesker som søker etter bedrifter, starter på en søketjeneste" },
    { icon: Smartphone, text: "Google favoriserer bedrifter med mobiltilpassede hjemmesider" }
  ];

  return (
    <section ref={container} className="py-24 px-6 md:px-12 lg:px-24 bg-[#ECEBE4] relative z-20">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="stat-box bg-white rounded-[1.5rem] p-3 pr-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#daff73] text-[#1a1a1a] p-5 rounded-[1.25rem] flex-shrink-0">
                <Icon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="font-sans font-bold text-[#1a1a1a] text-lg md:text-xl leading-snug">
                {stat.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

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
    { name: "Aleksander MacKee", role: "CTO", sub: "Grunnlegger", image: "/founders/aleksander.png", pos: "center 55%" },
    { name: "Francisus Drake", role: "CEO", sub: "Grunnlegger", image: "/founders/franciscus.jpg", pos: "center 25%" }
  ];

  return (
    <section id="team" ref={container} className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden min-h-screen flex items-center">
      <LiquidGlass className="opacity-80" />
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Ekspertisen bak</span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-center">Møt oss.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {members.map((member, i) => (
            <div key={i} className="member-card flex flex-col items-center text-center text-white">
              <div className="w-64 h-64 rounded-full border border-primary/10 bg-surface/30 backdrop-blur-sm relative overflow-hidden mb-8 group">
                <ImageWithPlaceholder src={member.image} alt={member.name} pos={member.pos} />
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

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Bytt ut bildene med faktiske screenshots av nettsidene deres når de er klare.
  // URL er klargjort (project.url), men foreløpig navigerer vi ikke dit.
  const projects = [
    { title: "Irmelin Drake", sub: "irmelindrake.no", image: "/websider/irmelin-drake.png", url: "https://irmelindrake.no", icon: Monitor },
    { title: "Cécile Moroni", sub: "cecilemoroni.com", image: "/websider/cecil-moroni.png", url: "https://cecilemoroni.com", icon: Terminal },
    { title: "Mona Steenberg", sub: "monasteenberg.no", image: "/websider/mona-steenberg.png", url: "https://monasteenberggran.netlify.app", icon: Code },
    { title: "Mirakelmannen", sub: "troels.no", image: "/websider/troels-mirakelmannen.png", url: "https://troelsmirakelmannen.netlify.app", icon: Globe },
    { title: "Tore S. Rasmussen", sub: "tsr.no", image: "/websider/Tore Sund Rasmussen.png", url: "#", icon: Server }
  ];

  const handleProjectClick = (idx, url) => {
    // Når dere vil skru på klikkbare prosjekter til eksterne nettsider:
    // if (activeIndex === idx && url) {
    //    window.open(url, '_blank');
    // } else {
    setActiveIndex(idx);
    // }
  };

  return (
    <section id="portfolio" className="relative py-32 px-6 md:px-12 lg:px-24 bg-background flex flex-col items-center overflow-hidden z-10 border-t border-primary/5">
      <div className="flex flex-col items-center mb-16 relative z-10 w-full max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Case Studies</span>
        <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-center text-white">Det vi driver med.</h2>
      </div>

      <div className="flex flex-row items-stretch overflow-hidden w-full max-w-5xl h-[400px] md:h-[500px] relative z-10 mt-8">
        {projects.map((project, idx) => {
          const isActive = activeIndex === idx;
          const IconComponent = project.icon;
          return (
            <div
              key={idx}
              onClick={() => handleProjectClick(idx, project.url)}
              className={cn(
                "group relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                isActive 
                  ? "flex-[1000] max-w-full mx-0 rounded-[40px]" 
                  : "flex-[1] min-w-[70px] max-w-[100px] mx-1 md:mx-3 rounded-[35px]"
              )}
            >
              {/* Background Image */}
              <div 
                className={cn(
                  "absolute inset-0 bg-no-repeat transition-[background-position,background-size,transform]",
                  !isActive && "duration-700 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] group-hover:scale-105 bg-[length:auto_120%] bg-top",
                  isActive && "duration-1000 ease-out bg-[length:100%_auto] bg-top hover:bg-bottom hover:duration-[8000ms] hover:ease-linear"
                )}
                style={{ backgroundImage: `url(${project.image})` }}
              />

              {/* Shadow overlay */}
              <div className={cn(
                "absolute left-0 right-0 transition-all duration-700 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                isActive
                  ? "bottom-0 h-[160px] bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                  : "bottom-0 h-[80px] bg-gradient-to-t from-black/80 to-transparent"
              )}></div>

              <div className={cn(
                "absolute flex h-[40px] transition-all duration-700 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                isActive ? "bottom-6 left-6 md:bottom-10 md:left-10 right-0 items-center" : "bottom-5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[50%] items-center justify-center flex-col"
              )}>
                <div className={cn(
                  "flex items-center justify-center rounded-full bg-white text-background z-10 shrink-0 transition-all duration-700",
                  isActive ? "min-w-[48px] max-w-[48px] h-[48px]" : "min-w-[40px] max-w-[40px] h-[40px] md:-translate-x-1/2"
                )}>
                  <IconComponent className={cn("transition-transform duration-700", isActive ? "w-6 h-6" : "w-5 h-5")} /> 
                </div>
                
                <div className={cn(
                  "flex flex-col justify-center ml-4 text-white whitespace-nowrap transition-all duration-700 ease-out origin-left",
                  isActive ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 pointer-events-none absolute hidden md:flex scale-90"
                )}>
                  <div className="font-sans font-bold text-2xl md:text-3xl tracking-tight leading-none mb-1 shadow-black drop-shadow-lg">{project.title}</div>
                  <div className="font-mono text-sm tracking-wide opacity-90 drop-shadow-md">{project.sub}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Philosophy = () => {
  const container = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".phil-text", {
        scrollTrigger: { trigger: container.current, start: "top 60%" },
        y: 20, opacity: 0, duration: 1, stagger: 0.3, ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="philosophy" className="relative py-48 px-6 md:px-12 overflow-hidden bg-background text-white">
      <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
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
            </div>
          )}
          {animType === 2 && (
            <div className="w-full max-w-md grid grid-cols-10 gap-2 relative">
              <div className="absolute top-0 bottom-0 w-full bg-primary/5 z-0 animate-[pulse_4s_ease-in-out_infinite]"></div>
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="aspect-square bg-primary/10 rounded-sm"></div>
              ))}
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
            scale: 0.9, opacity: 0.5,
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 20%", scrub: true }
          });
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={container} className="relative bg-background">
      <ProtocolStep num={1} title="Strategi & Analyse." desc="Vi kartlegger bedriftens flaskehalser og designer en skalerbar arkitektur." animType={1} index={10} />
      <ProtocolStep num={2} title="Utvikling & Setup." desc="Implementering av robuste systemer med pixel-perfekt presisjon." animType={2} index={20} />
      <ProtocolStep num={3} title="Skalering & Drift." desc="Lansering og kontinuerlig optimalisering." animType={3} index={30} />
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-surface relative z-40">
      <div className="max-w-md mx-auto">
        <div className="bg-background border border-primary/10 rounded-[2rem] p-12 w-full relative group hover:-translate-y-2 transition-transform duration-500 shadow-sm">
          <h3 className="font-mono text-sm tracking-widest text-primary/60 mb-4 uppercase">Fase 1</h3>
          <h4 className="font-sans text-4xl font-bold mb-6">Gratis Demo</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm mb-12">
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Strategisk Kartlegging</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Analyse av Plattform</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-4 h-4 text-primary" /> Teknisk Audit</li>
          </ul>
          <a href="mailto:team@oppskalert.no" className="block w-full py-4 rounded-full border border-primary font-sans font-medium text-sm text-center hover:bg-primary hover:text-white transition-colors duration-300">Book Samtale</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 rounded-t-[4rem] relative z-40 mt-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-white">
        <div className="max-w-sm">
          <span className="font-sans font-bold text-3xl tracking-tight lowercase mb-6 block">oppskalert.</span>
          <p className="font-mono text-white/50 text-sm leading-relaxed mb-8">Vi bygger nettsider og systemer som skalerer norske bedrifter.</p>
          <div className="flex items-center gap-3 font-mono text-sm font-semibold bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-highlight animate-pulse"></div>
            SYSTEM OPERATIONAL
          </div>
        </div>
        <div className="flex gap-16 font-mono text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-white/40 uppercase tracking-widest mb-2 font-semibold">Navigasjon</span>
            <a href="#features" className="hover:text-white/70 transition-colors">Løsninger</a>
            <a href="#portfolio" className="hover:text-white/70 transition-colors">Det vi driver med</a>
            <a href="#philosophy" className="hover:text-white/70 transition-colors">Filosofi</a>
            <a href="#protocol" className="hover:text-white/70 transition-colors">Protokoll</a>
            <a href="#pricing" className="hover:text-white/70 transition-colors">Tjenester</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between items-center font-mono text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} Oppskalert. All rights reserved.</p>
        <p>Built with precision in Norway.</p>
      </div>
    </footer>
  );
};

const Home = () => (
  <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <Statistics />
      <MeetUs />
      <OppskalertFAQ />
      <Portfolio />
      <Philosophy />
      <Protocol />
      <Pricing />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kom-i-gang" element={<IntakePage />} />
      </Routes>
    </Router>
  );
}

export default App;
