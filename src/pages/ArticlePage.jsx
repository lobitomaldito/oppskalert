import { useEffect, useRef } from 'react';
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

/* Inline-markdown: fet, kursiv og lenker. Ett regex-split i stedet for tre
   runder, ellers taper vi lenker som ligger inni en fet setning. */
const renderInline = (text, keyPrefix) =>
  text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, j) => {
      const key = `${keyPrefix}-${j}`;
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={key} className="text-primary font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={key} className="italic">{part.slice(1, -1)}</em>;
      }
      const lenke = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (lenke) {
        const [, label, href] = lenke;
        const ekstern = href.startsWith('http');
        return (
          <a
            key={key}
            href={href}
            target={ekstern ? '_blank' : undefined}
            /* Migrerte Opinly-artikler lenker ut til andre leverandører.
               nofollow, så vi ikke gir bort lenkeverdi til konkurrenter. */
            rel={ekstern ? 'noopener noreferrer nofollow' : undefined}
            className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
          >
            {label}
          </a>
        );
      }
      return part;
    });

const renderContent = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-sans font-bold text-xl md:text-2xl tracking-tight mt-10 mb-3 text-primary">
          {renderInline(line.slice(4), i)}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-sans font-bold text-2xl md:text-3xl tracking-tight mt-12 mb-4 text-primary">
          {renderInline(line.slice(3), i)}
        </h2>
      );
    } else if (line.match(/^\d+\./) || line.startsWith('- ')) {
      const nummerert = !line.startsWith('- ');
      const matcher = (l) => (nummerert ? l.match(/^\d+\./) : l.startsWith('- '));
      const listItems = [];
      const start = i;
      while (i < lines.length && matcher(lines[i])) {
        listItems.push(
          <li key={i} className="font-body text-primary/85 leading-relaxed text-base md:text-lg">
            {renderInline(lines[i].replace(/^(\d+\.|-)\s/, ''), i)}
          </li>
        );
        i++;
      }
      const Tag = nummerert ? 'ol' : 'ul';
      elements.push(
        <Tag key={`list-${start}`} className={`${nummerert ? 'list-decimal' : 'list-disc'} list-inside space-y-2 my-6`}>
          {listItems}
        </Tag>
      );
      continue;
    } else if (line.trim() !== '') {
      elements.push(
        <p key={i} className="font-body text-primary/85 leading-relaxed text-base md:text-lg my-5">
          {renderInline(line, i)}
        </p>
      );
    }
    i++;
  }

  return elements;
};

const breadcrumbSchema = (name, url) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
    { '@type': 'ListItem', position: 2, name: 'Blogg', item: 'https://oppskalert.no/blogg' },
    { '@type': 'ListItem', position: 3, name, item: url },
  ],
});

const CTA = () => (
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
);

const ArticleShell = ({ heroRef, backLabel = 'Tilbake til blogg', children }) => (
  <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
    <Navbar />
    <section ref={heroRef} className="pt-40 pb-0 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-3xl mx-auto">
        <Link to="/blogg" className="hero-elem inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors duration-300 mb-8">
          <ArrowLeft className="w-3 h-3" /> {backLabel}
        </Link>
        {children}
      </div>
    </section>
  </div>
);

// De 3 håndskrevne artiklene, uendret fra før: samme markdown-lignende
// rendering og forrige/neste-navigasjon innenfor det lokale settet.
const LocalArticle = ({ article }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-elem'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const canonical = `https://oppskalert.no/blogg/${article.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: `https://oppskalert.no${article.hero}`,
    datePublished: article.publishDate,
    author: { '@type': 'Organization', name: 'Oppskalert' },
    publisher: {
      '@type': 'Organization',
      name: 'Oppskalert',
      logo: { '@type': 'ImageObject', url: 'https://oppskalert.no/oppskalert%20fav.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <SEO
        title={article.title}
        description={article.description}
        keywords={article.keywords}
        canonical={canonical}
        ogType="article"
        ogImage={`https://oppskalert.no${article.hero}`}
        jsonLd={[articleSchema, breadcrumbSchema(article.title, canonical)]}
      />
      <Navbar />

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

      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden h-64 md:h-96">
          <img src={article.hero} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <article className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-3xl mx-auto">
          {renderContent(article.content)}

          <div className="mt-16 flex flex-wrap gap-2">
            {article.keywords.map((kw) => (
              <span key={kw} className="font-body text-xs uppercase tracking-widest text-primary/70 border border-primary/10 px-4 py-2 rounded-full">
                {kw}
              </span>
            ))}
          </div>

          <CTA />
        </div>
      </article>

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

/* Alt blogginnhold bor nå i src/content/generated/ og src/lib/articles.js.
   Opinly er ute, så en ukjent slug er en ekte 404 og ikke noe vi kan hente
   fra et API i etterkant. */
const ArticlePage = () => {
  const { slug } = useParams();
  const localArticle = getArticleBySlug(slug);

  if (!localArticle) return <Navigate to="/blogg" replace />;
  return <LocalArticle article={localArticle} />;
};

export default ArticlePage;
