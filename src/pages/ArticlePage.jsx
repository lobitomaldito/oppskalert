import React, { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getArticleBySlug, articles } from '../lib/articles';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components/Layout';

gsap.registerPlugin(ScrollTrigger);


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
          <li key={i} className="font-body text-primary/85 leading-relaxed text-base md:text-lg">
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
        <p key={i} className="font-body text-primary/85 leading-relaxed text-base md:text-lg my-5">
          {parsed}
        </p>
      );
    }
    i++;
  }

  return elements;
};


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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "image": `https://oppskalert.no${article.hero}`,
    "datePublished": article.publishDate,
    "author": {
      "@type": "Organization",
      "name": "Oppskalert"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Oppskalert",
      "logo": {
        "@type": "ImageObject",
        "url": "https://oppskalert.no/oppskalert%20fav.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://oppskalert.no/blogg/${article.slug}`
    }
  };

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <SEO 
        title={article.title}
        description={article.description}
        keywords={article.keywords}
        canonical={`https://oppskalert.no/blogg/${article.slug}`}
        ogType="article"
        ogImage={`https://oppskalert.no${article.hero}`}
        jsonLd={articleSchema}
      />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-0 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-3xl mx-auto">
          <Link to="/blogg" className="hero-elem inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors duration-300 mb-8">
            <ArrowLeft className="w-3 h-3" /> Tilbake til blogg
          </Link>
          <h1 className="hero-elem font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          <div className="hero-elem flex items-center gap-4 font-body text-xs uppercase tracking-widest text-primary/70 mb-12">
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
              <span key={kw} className="font-body text-xs uppercase tracking-widest text-primary/70 border border-primary/10 px-4 py-2 rounded-full">
                {kw}
              </span>
            ))}
          </div>

          {/* CTA inline */}
          <div className="mt-20 bg-surface/30 border border-primary/10 rounded-[2.5rem] p-10 text-center">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-3 block">Klar for neste steg?</span>
            <h3 className="font-sans font-bold text-2xl md:text-3xl tracking-tight mb-4">Jeg bygger din salgsmaskin.</h3>
            <p className="font-body text-primary/80 text-[0.95rem] mb-8 max-w-md mx-auto leading-relaxed">
              Ingen binding, ingen lange prosesser. Du ser en ferdig demo før du bestemmer deg.
            </p>
            <Link to="/kontakt" className="group relative inline-flex overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
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
                <span className="font-body text-xs uppercase tracking-widest text-primary/70 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3" /> Forrige
                </span>
                <span className="font-sans font-bold text-sm leading-snug group-hover:text-accent transition-colors">{prevArticle.title}</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link to={`/blogg/${nextArticle.slug}`} className="group flex flex-col gap-2 p-6 rounded-[2rem] border border-primary/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 text-right md:items-end">
                <span className="font-body text-xs uppercase tracking-widest text-primary/70 flex items-center gap-2">
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
