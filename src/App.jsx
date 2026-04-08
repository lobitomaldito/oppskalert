import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, CheckSquare, Smartphone, Eye, TextSearch } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Link } from 'react-router-dom';
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
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Filosofi</a>
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protokoll</a>
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
    { name: "Aleksander MacKee", role: "CTO", sub: "AI Engineer\nKunderelasjoner\nMaster i Fintech og BA", image: "/founders/aleksander.webp", pos: "center 55%", phone: "974 09 897", tel: "+4797409897" },
    { name: "Franciscus Drake Bruseth", role: "CEO", sub: "Markedsføring\nProduct development\nBachelor i Markedsføring", image: "/founders/franciscus.webp", pos: "center 25%", phone: "479 10 461", tel: "+4747910461" }
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
              <div className="font-mono text-sm uppercase tracking-widest text-accent flex flex-col gap-1 mb-4">
                <span>{member.role}</span>
                <span className="opacity-50 text-sm md:text-lg italic whitespace-pre-line leading-relaxed">{member.sub}</span>
              </div>
              <div className="flex flex-col gap-1 font-mono text-sm">
                <a href={`tel:${member.tel}`} className="text-white hover:text-accent transition-colors font-semibold">{member.phone}</a>
                <a href="mailto:team@oppskalert.no" className="text-accent hover:text-highlight transition-colors">team@oppskalert.no</a>
              </div>
            </div>
          ))}
        </div>
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

const PricingCard = ({ months, price, color, title, subtitle, features, isPopular }) => (
  <div className={cn(
    "bg-white text-background rounded-[2.5rem] p-8 flex flex-col shadow-xl border relative overflow-hidden h-full transition-all duration-300",
    isPopular ? "border-accent ring-1 ring-accent/20 scale-[1.02]" : "border-black/5"
  )}>
    {isPopular && (
      <div className="absolute top-0 right-0 bg-accent text-background px-6 py-1.5 rounded-bl-3xl font-sans font-bold text-[10px] uppercase tracking-wider z-10 shadow-sm">
        Mest populær
      </div>
    )}
    <div className={cn("inline-block w-fit px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border", color)}>
      {title}
    </div>
    <div className="font-serif italic text-sm text-black/50 mb-6 leading-tight min-h-[3rem]">
      {subtitle}
    </div>
    <div className="flex items-baseline gap-2 mb-8">
      <span className="text-4xl md:text-5xl font-bold tracking-tighter">{price} kr</span>
      {months && <span className="text-black/40 font-medium text-lg">/måned</span>}
    </div>
    
    <div className="flex flex-col gap-4 mb-10 bg-black/[0.03] p-6 rounded-3xl">
      {features.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <CheckSquare className="w-3 h-3 text-primary" />
          </div>
          <span className="font-sans text-sm font-semibold leading-tight">{item}</span>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16 max-w-6xl">
          <PricingCard 
            title="Visitkort" 
            subtitle="For deg som vil ha en profesjonell tilstedeværelse på nett"
            price="9 900" 
            color="text-gray-500 border-gray-200" 
            features={[ 
              "Én side mobiltilpasset", 
              "Hero med bilde og tagline", 
              "Kort bio og om-seksjon", 
              "Kontaktskjema", 
              "SEO-grunnoppsett med ditt navn som domene", 
              "Levert på 5 virkedager" 
            ]} 
          />
          <PricingCard 
            title="Presentasjonsside" 
            subtitle="For deg som aktivt booker foredrag og vil konvertere besøkende"
            price="17 900" 
            isPopular={true}
            color="text-purple-500 border-purple-200" 
            features={[ 
              'Alt i Visitkort', 
              '3–5 sider', 
              'Foredragstemaer og målgrupper', 
              'Testimonials fra arrangører', 
              'Videointegrering', 
              'Cookie-samtykke', 
              'CMS så du kan redigere selv', 
              'Levert på 10 virkedager' 
            ]} 
          />
          <PricingCard 
            title="Full salgside" 
            subtitle="For deg som er profilert taler og vil ha en side som matcher statusen din"
            price="27 900" 
            color="text-orange-500 border-orange-200" 
            features={[ 
              'Alt i Presentasjonsside', 
              'Profesjonelt copywriting', 
              'Pressepakke og mediaseksjon', 
              'Google Analytics-oppsett', 
              'Bookingforespørsel med kalender', 
              'Prioritert support i 3 måneder', 
              'Levert på 15 virkedager' 
            ]} 
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-background text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 rounded-t-[4rem] relative z-40 mt-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-white">
        <div className="max-w-sm">
          <span className="font-sans font-bold text-3xl tracking-tight lowercase mb-2 block">oppskalert.</span>
          <p className="font-mono text-white/30 text-xs mb-6">et datterselskap av PotentialAIze AS</p>
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
            <a href="#faq" className="hover:text-white/70 transition-colors">FAQ</a>
            <a href="#pricing" className="hover:text-white/70 transition-colors">Tjenester</a>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-white/60 uppercase tracking-widest font-semibold">Kontakt</span>
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-xs uppercase tracking-widest">Aleksander Mackee</span>
              <a href="tel:+4797409897" className="text-white hover:text-accent transition-colors font-semibold">974 09 897</a>
              <a href="mailto:team@oppskalert.no" className="text-accent hover:text-highlight transition-colors">team@oppskalert.no</a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-xs uppercase tracking-widest">Franciscus Drake Bruseth</span>
              <a href="tel:+4747910461" className="text-white hover:text-accent transition-colors font-semibold">479 10 461</a>
              <a href="mailto:team@oppskalert.no" className="text-accent hover:text-highlight transition-colors">team@oppskalert.no</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/40 uppercase tracking-widest mb-2 font-semibold">Selskap</span>
            <span className="text-white/50">Orgnr: 935 067 049</span>
            <span className="text-white/50">Ostadalsveien 66</span>
            <span className="text-white/50">0753 Oslo</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between items-center font-mono text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} PotentialAIze AS. All rights reserved.</p>
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
      <Philosophy />
      <Pricing />
    </main>
    <Footer />
  </div>
);

function App() {
  return <Home />;
}

export default App;
