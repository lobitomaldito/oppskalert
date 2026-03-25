import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Server, Terminal, Settings2, BarChart3, Fingerprint, Cpu, Calendar, CheckSquare, Activity, Monitor, Code, Globe, Smartphone, Eye, TextSearch } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <Link to="/kom-i-gang" className="group relative overflow-hidden bg-surface text-primary border border-white/10 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md text-center">
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Bestill Demo</span>
        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      </Link>
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
          <span className="hero-elem font-sans font-bold text-3xl md:text-5xl tracking-tight uppercase">Vi bygger nettsiden din —</span>
          <span className="hero-elem font-serif italic text-6xl md:text-8xl tracking-tighter leading-tight mt-2">ingen risiko, ingen binding.</span>
        </h1>
        <p className="hero-elem mt-8 font-mono text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
          Vi bygger nettsider og systemer som skalerer norske bedrifter. Ingen kompromisser, kun presisjon.
        </p>
        <div className="hero-elem mt-10 flex gap-4">
          <Link to="/kom-i-gang" className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300 text-center">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </Link>
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
    { name: "Aleksander MacKee", role: "CTO", sub: "AI Engineer\nMaster i Fintech og BA", image: "/founders/aleksander.png", pos: "center 55%" },
    { name: "Franciscus Drake", role: "CEO", sub: "Markedsføring\nProduct development\nBachelor i Markedsføring", image: "/founders/franciscus.jpg", pos: "center 25%" }
  ];

  return (
    <section id="team" ref={container} className="relative py-12 px-6 md:px-12 lg:px-24 overflow-hidden bg-background">
      {/* LiquidGlass removed as per user request to remove bubble animations */}
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Ekspertisen bak</span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-center">Møt oss.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {members.map((member, i) => (
            <div key={i} className="member-card flex flex-col items-center text-center text-white">
              <div className="w-80 h-80 rounded-full border border-primary/10 bg-surface/30 backdrop-blur-sm relative overflow-hidden mb-8 group">
                <ImageWithPlaceholder src={member.image} alt={member.name} pos={member.pos} />
                <div className="absolute inset-0 border-[8px] border-background pointer-events-none rounded-full"></div>
              </div>
              <h3 className="font-sans font-bold text-3xl mb-1">{member.name}</h3>
              <div className="font-mono text-sm uppercase tracking-widest text-accent flex flex-col gap-1">
                <span>{member.role}</span>
                <span className="opacity-50 text-sm md:text-lg italic whitespace-pre-line leading-relaxed">{member.sub}</span>
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
                  <div className="font-mono text-base md:text-lg tracking-wide opacity-90 drop-shadow-md">{project.sub}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const PhilosophyCard = ({ title, desc, index, icon: Icon }) => {
  return (
    <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center p-6" style={{ zIndex: index }}>
      <div className="protocol-card w-full max-w-5xl bg-surface rounded-[3rem] shadow-xl border border-primary/10 overflow-hidden relative">
        <div className="p-12 md:p-24 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
          <div className="bg-highlight text-background p-6 rounded-3xl w-fit mb-12 shadow-[0_0_40px_rgba(252,231,98,0.25)]">
            {Icon && <Icon className="w-10 h-10" />}
          </div>
          <h2 className="font-sans font-bold text-5xl md:text-7xl mb-10 tracking-tight">{title}</h2>
          <p className="font-mono text-primary/70 text-xl md:text-3xl leading-relaxed max-w-3xl">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Philosophy = () => {
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
    <section id="facts" ref={container} className="relative bg-background">

      
      <PhilosophyCard title="Førsteinntrykk." desc="94% av førsteinntrykket til hjemmesider er relatert til design - vi sørger for at ditt er perfekt." index={10} icon={Eye} />
      <PhilosophyCard title="Synlighet." desc="74% av de som søker etter bedrifter starter på Google. Vi sørger for at de finner deg." index={20} icon={TextSearch} />
      <PhilosophyCard title="Mobilitet." desc="Google favoriserer mobiltilpassede sider. Vi bygger for alle skjermer, uten kompromiss." index={30} icon={Smartphone} />
    </section>
  );
};

const PricingCard = ({ months, price, color }) => (
  <div className="bg-white text-background rounded-[2.5rem] p-10 flex flex-col shadow-xl border border-black/5 relative overflow-hidden h-full">
    <div className={cn("inline-block w-fit px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-8 border", color)}>
      {months} mnd.
    </div>
    <div className="flex items-baseline gap-2 mb-4">
      <span className="text-5xl font-bold tracking-tighter">{price} kr</span>
      <span className="text-black/40 font-medium text-lg">/måned</span>
    </div>
    <p className="text-black/40 text-xs font-mono mb-8 leading-relaxed">Faktureres månedlig med en bindingstid på {months} måneder</p>
    
    <div className="flex flex-col gap-4 mb-10 bg-black/[0.03] p-6 rounded-3xl">
      {[ 'Responsiv design', 'Cookie-samtykke', 'SEO-tilpasset CMS' ].map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckSquare className="w-3 h-3 text-primary" />
          </div>
          <span className="font-sans text-sm font-semibold">{item}</span>
        </div>
      ))}
    </div>
    
    <div className="mt-auto flex flex-col gap-3">
      <Link to="/kom-i-gang" className="w-full py-4 rounded-2xl bg-[#1a2d2a] text-white font-sans font-bold text-sm text-center hover:bg-black transition-colors duration-300">Bestill rådgivning</Link>
      <Link to="/kom-i-gang" className="w-full py-4 rounded-2xl border border-black/10 font-sans font-bold text-sm text-center hover:bg-black/5 transition-colors duration-300">Bestill nå</Link>
    </div>
  </div>
);

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-primary relative z-40 rounded-[4rem] text-background overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-sans text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight">Vi tilpasser prisene våre</h2>
        <p className="font-mono text-sm md:text-base text-background/70 text-center max-w-2xl mb-24 leading-relaxed">
          Våre pakker er skreddersydd for deg og kommer med en lavere månedlig kostnad i stedet for høye engangsbeløp, slik at du kan spre utbetalingene.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          <PricingCard months="6" price="1239" color="text-purple-500 border-purple-200" />
          <PricingCard months="12" price="1059" color="text-orange-500 border-orange-200" />
          <PricingCard months="24" price="809" color="text-green-600 border-green-200" />
        </div>
        
        <div className="text-center font-serif italic text-2xl text-background/90">
          Eller en engangssum fra 10 999 kr.
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
            <a href="#facts" className="hover:text-white/70 transition-colors">Visste du at?</a>
            <a href="#portfolio" className="hover:text-white/70 transition-colors">Det vi driver med</a>
            <a href="#faq" className="hover:text-white/70 transition-colors">FAQ</a>
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
      <MeetUs />
      <OppskalertFAQ />
      <Portfolio />
      <Philosophy />
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
