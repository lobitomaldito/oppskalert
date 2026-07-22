import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { articles } from '../lib/articles';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components/Layout';

gsap.registerPlugin(ScrollTrigger);


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
          <span className="font-body text-xs uppercase tracking-[0.25em] text-accent">{formatDate(article.publishDate)}</span>
        </div>
        <h2 className="font-sans font-bold text-xl md:text-2xl tracking-tight text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
          {article.title}
        </h2>
        <p className="font-body text-[0.95rem] text-primary/80 leading-relaxed mb-6">
          {article.description}
        </p>
        <div className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-accent">
          <span>Les mer</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};


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
          <span className="hero-elem font-body text-xs uppercase tracking-[0.3em] text-accent mb-6 block">Innsikt & Kunnskap</span>
          <h1 className="hero-elem font-sans font-bold text-5xl md:text-7xl tracking-tight mb-6">
            Blogg.
          </h1>
          <p className="hero-elem font-body text-lg text-primary/85 max-w-2xl leading-relaxed">
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
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Klar for neste steg?</span>
          <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tight mb-6">
            La oss bygge din<br />
            <span className="font-serif italic">salgsmaskin.</span>
          </h2>
          <p className="font-body text-primary/80 mb-10 leading-relaxed">
            Ingen langvarige strategiprosesser. Du får se en fungerende demo før du bestemmer deg.
          </p>
          <Link to="/kontakt" className="group relative inline-flex overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
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
