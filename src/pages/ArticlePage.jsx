import { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getArticleBySlug, articles } from '../lib/articles';
import { ruter } from '../lib/site';
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

/* Artikkelen hadde tidligere ett eneste kontaktpunkt, og det lå 97 % inn i
   teksten. På en artikkel på 3300 ord betyr det i praksis ingen CTA.
   Nå er det tre, med stigende temperatur:

     1. tidlig, ren tekstlenke etter introen, for de som allerede vet hva de vil
     2. midtveis, en rolig boks ved nærmeste H2 forbi 45 % av teksten
     3. til slutt, den fylte aksentknappen

   Kun den siste bruker aksentfyll. DESIGN.md sin Lamplight-regel sier at
   Sandy Brown tilhører konverteringsstien og virker fordi den er sjelden, så
   tre fylte knapper i én artikkel ville nøytralisert alle tre. Midtveisboksen
   bruker tonal fyll og kantlinje i stedet, og en annen form enn slutt-CTA-en,
   jf. «vary the section forms». */

const tellOrd = (s) => s.trim().split(/\s+/).filter(Boolean).length;

// Terskel: under dette er artikkelen for kort til at en midtveis-CTA gir
// mening, da står de to andre alene.
const MIDT_CTA_MIN_ORD = 800;

const renderContent = (content, { tidligCta = null, midtCta = null } = {}) => {
  const lines = content.split('\n');
  const elements = [];
  const totaltOrd = tellOrd(content);
  const midtGrense = totaltOrd * 0.45;
  let ordSaaLangt = 0;
  let tidligSatt = tidligCta === null;
  let midtSatt = midtCta === null || totaltOrd < MIDT_CTA_MIN_ORD;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const erH2 = line.startsWith('## ');
    ordSaaLangt += tellOrd(line);

    /* Begge plasseres rett før en H2, aldri midt i en tanke. Den tidlige tar
       den aller første, altså rett etter introen, som er alt som står før
       første mellomtittel. Den midtre tar første H2 forbi 45 %, og aldri
       samme som den tidlige. */
    if (!tidligSatt && erH2) {
      elements.push(<div key={`tidlig-cta-${i}`}>{tidligCta}</div>);
      tidligSatt = true;
    } else if (!midtSatt && tidligSatt && ordSaaLangt > midtGrense && erH2) {
      elements.push(<div key={`midt-cta-${i}`}>{midtCta}</div>);
      midtSatt = true;
    }

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

/* Standardtekster. Artikkelfilen kan overstyre dem med et valgfritt
   cta-objekt ({ tidlig, midt: { tittel, tekst } }), men defaultene er skrevet
   så de passer enhver artikkel på dette nettstedet. Da gjelder de også for
   alt den ukentlige generatoren lager, uten at den må huske noe nytt. */
const CTA_STANDARD = {
  tidlig: 'Leter du egentlig bare etter en pris?',
  midt: {
    tittel: 'Vil du se dette gjort på din egen side?',
    tekst: 'Jeg bygger et ferdig utkast med ditt innhold før du bestemmer deg. Liker du det ikke, koster det ingenting.',
  },
};

/* 1. Tidlig. Ren tekstlenke rett etter introen, ingen boks og ingen knapp.
      For den som allerede vet hva de vil og ikke gidder å lese 3000 ord. */
const TidligCta = ({ tekst }) => (
  <p className="font-body text-[0.95rem] text-primary/70 leading-relaxed my-8 pl-5 border-l border-primary/15">
    {tekst}{' '}
    <Link to={ruter.priser} className="text-accent underline underline-offset-2 hover:text-primary transition-colors">
      Se hva en nettside koster
    </Link>
    , eller{' '}
    <Link to={ruter.kontakt} className="text-accent underline underline-offset-2 hover:text-primary transition-colors">
      be om en gratis demo
    </Link>
    .
  </p>
);

/* 2. Midtveis. Bevisst en annen form enn slutt-CTA-en: venstrestilt, tonal
      fyll og kantlinje, tekstlenke i stedet for fylt knapp. Aksentfyllet er
      reservert til den siste. */
const MidtCta = ({ tittel, tekst }) => (
  <aside className="my-12 rounded-[2rem] border border-primary/12 bg-primary/[0.04] p-7 md:p-8">
    <h3 className="font-sans font-bold text-lg md:text-xl tracking-tight mb-2.5">{tittel}</h3>
    <p className="font-body text-[0.95rem] text-primary/80 leading-relaxed mb-5 max-w-[52ch]">{tekst}</p>
    <Link
      to={ruter.kontakt}
      className="inline-flex items-center gap-2 font-sans font-bold text-sm text-accent hover:text-highlight transition-colors"
    >
      Bestill gratis demo <ArrowRight className="w-4 h-4" />
    </Link>
  </aside>
);

/* 3. Slutt. Den ene fylte aksentknappen i artikkelen. */
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

  const cta = {
    tidlig: article.cta?.tidlig || CTA_STANDARD.tidlig,
    midt: { ...CTA_STANDARD.midt, ...(article.cta?.midt || {}) },
  };

  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const canonical = `https://oppskalert.no/blogg/${article.slug}`;
  /* Den ukentlige generatoren har skrevet hero: "" minst én gang. Uten denne
     vakten blir og:image og schema-bildet til den bare "https://oppskalert.no",
     som er en ugyldig bilde-URL, og <img src=""> laster siden på nytt i noen
     nettlesere. Mangler bildet, utelates feltet i stedet. */
  const heroUrl = article.hero ? `https://oppskalert.no${article.hero}` : undefined;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    ...(heroUrl ? { image: heroUrl } : {}),
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
        ogImage={heroUrl}
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

      {article.hero && (
        <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden h-64 md:h-96">
          <img src={article.hero} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </div>
      )}

      <article className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-3xl mx-auto">
          {renderContent(article.content, {
            tidligCta: <TidligCta tekst={cta.tidlig} />,
            midtCta: <MidtCta tittel={cta.midt.tittel} tekst={cta.midt.tekst} />,
          })}

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
