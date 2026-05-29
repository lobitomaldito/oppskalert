import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { articles } from '../lib/articles';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(79, 71, 137, 0.90)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', borderColor: 'transparent', duration: 0.3 });
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full border border-transparent transition-all duration-300 w-[90%] max-w-5xl text-white">
      <Link to="/" className="font-sans font-bold text-2xl tracking-tight lowercase">oppskalert.</Link>
      <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
        <Link to="/#features" className="hover:-translate-y-[1px] transition-transform">Løsninger</Link>
        <Link to="/#philosophy" className="hover:-translate-y-[1px] transition-transform">Filosofi</Link>
        <Link to="/blogg" className="hover:-translate-y-[1px] transition-transform text-accent">Blogg</Link>
        <Link to="/#contact" className="hover:-translate-y-[1px] transition-transform">Kontakt</Link>
      </div>
      <Link to="/kom-i-gang" className="group relative overflow-hidden bg-surface text-primary border border-white/10 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-transform hover:scale-[1.03] duration-300 shadow-md text-center">
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Bestill Demo</span>
        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      </Link>
    </nav>
  );
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' });
};

const ArticleCard = ({ article, index }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: 'power2.out',
      }
    );
  }, []);

  return (
    <Link ref={cardRef} to={`/blogg/${article.slug}`} className="group block bg-surface/30 border border-primary/10 rounded-[2.5rem] overflow-hidden hover:border-accent/30 transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={article.hero}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{formatDate(article.publishDate)}</span>
        </div>
        <h2 className="font-sans font-bold text-xl md:text-2xl tracking-tight text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
          {article.title}
        </h2>
        <p className="font-mono text-sm text-primary/50 leading-relaxed mb-6">
          {article.description}
        </p>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
          <span>Les mer</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

const Footer = () => (
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
          <Link to="/#facts" className="hover:text-white/70 transition-colors">Visste du at?</Link>
          <Link to="/#faq" className="hover:text-white/70 transition-colors">FAQ</Link>
          <Link to="/#pricing" className="hover:text-white/70 transition-colors">Tjenester</Link>
          <Link to="/blogg" className="hover:text-white/70 transition-colors">Blogg</Link>
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

const BlogPage = () => {
  const heroRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-elem'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <SEO 
        title="Blogg & Innsikt" 
        description="Få konkret kunnskap om nettsider, mobilhastighet, konvertering og hva som faktisk driver salg og vekst for norske bedrifter."
        keywords={["blogg nettsider", "mobilhastighet nettside", "nettside konvertering", "bedrift digital vekst"]}
        canonical="https://oppskalert.no/blogg"
      />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-48 pb-24 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="hero-elem font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6 block">Innsikt & Kunnskap</span>
          <h1 className="hero-elem font-sans font-bold text-5xl md:text-7xl tracking-tight mb-6">
            Blogg.
          </h1>
          <p className="hero-elem font-mono text-lg text-primary/50 max-w-2xl leading-relaxed">
            Konkret kunnskap om nettsider, konvertering og hva som faktisk driver vekst for norske bedrifter.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-surface/20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Klar for neste steg?</span>
          <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tight mb-6">
            La oss bygge din<br />
            <span className="font-serif italic">salgsmaskin.</span>
          </h2>
          <p className="font-mono text-primary/50 mb-10 leading-relaxed">
            Ingen langvarige strategiprosesser. Vi viser deg en fungerende demo før du bestemmer deg.
          </p>
          <Link to="/kom-i-gang" className="group relative inline-flex overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
