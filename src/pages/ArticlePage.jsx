import React, { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getArticleBySlug, articles } from '../lib/articles';

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

const renderContent = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-sans font-bold text-2xl md:text-3xl tracking-tight mt-12 mb-4 text-primary">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.match(/^\d+\./)) {
      const listItems = [];
      while (i < lines.length && lines[i].match(/^\d+\./)) {
        listItems.push(
          <li key={i} className="font-mono text-primary/70 leading-relaxed text-base md:text-lg">
            {lines[i].replace(/^\d+\.\s/, '')}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={`list-${i}`} className="list-decimal list-inside space-y-2 my-6">
          {listItems}
        </ol>
      );
      continue;
    } else if (line.trim() !== '') {
      const parsed = line
        .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
        .map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-primary font-semibold">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={j} className="italic">{part.slice(1, -1)}</em>;
          }
          return part;
        });
      elements.push(
        <p key={i} className="font-mono text-primary/70 leading-relaxed text-base md:text-lg my-5">
          {parsed}
        </p>
      );
    }
    i++;
  }

  return elements;
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

const ArticlePage = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!article) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-elem'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, [article]);

  if (!article) return <Navigate to="/blogg" replace />;

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-0 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-3xl mx-auto">
          <Link to="/blogg" className="hero-elem inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors duration-300 mb-8">
            <ArrowLeft className="w-3 h-3" /> Tilbake til blogg
          </Link>
          <h1 className="hero-elem font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          <div className="hero-elem flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-primary/40 mb-12">
            <span>{formatDate(article.publishDate)}</span>
            <span className="w-1 h-1 rounded-full bg-primary/20" />
            <span>oppskalert.</span>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden h-64 md:h-96">
          <img src={article.hero} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Article content */}
      <article className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-3xl mx-auto">
          {renderContent(article.content)}

          {/* Keywords */}
          <div className="mt-16 flex flex-wrap gap-2">
            {article.keywords.map((kw) => (
              <span key={kw} className="font-mono text-xs uppercase tracking-widest text-primary/40 border border-primary/10 px-4 py-2 rounded-full">
                {kw}
              </span>
            ))}
          </div>

          {/* CTA inline */}
          <div className="mt-20 bg-surface/30 border border-primary/10 rounded-[2.5rem] p-10 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3 block">Klar for neste steg?</span>
            <h3 className="font-sans font-bold text-2xl md:text-3xl tracking-tight mb-4">Vi bygger din salgsmaskin.</h3>
            <p className="font-mono text-primary/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Ingen binding, ingen lange prosesser. Du ser en ferdig demo før du bestemmer deg.
            </p>
            <Link to="/kom-i-gang" className="group relative inline-flex overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Bestill gratis demo <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
            </Link>
          </div>
        </div>
      </article>

      {/* Prev / Next navigation */}
      {(prevArticle || nextArticle) && (
        <section className="px-6 md:px-12 lg:px-24 pb-32">
          <div className="max-w-3xl mx-auto border-t border-primary/10 pt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevArticle ? (
              <Link to={`/blogg/${prevArticle.slug}`} className="group flex flex-col gap-2 p-6 rounded-[2rem] border border-primary/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-primary/30 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3" /> Forrige
                </span>
                <span className="font-sans font-bold text-sm leading-snug group-hover:text-accent transition-colors">{prevArticle.title}</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link to={`/blogg/${nextArticle.slug}`} className="group flex flex-col gap-2 p-6 rounded-[2rem] border border-primary/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 text-right md:items-end">
                <span className="font-mono text-xs uppercase tracking-widest text-primary/30 flex items-center gap-2">
                  Neste <ArrowRight className="w-3 h-3" />
                </span>
                <span className="font-sans font-bold text-sm leading-snug group-hover:text-accent transition-colors">{nextArticle.title}</span>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;
