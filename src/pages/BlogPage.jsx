import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { articles } from '../lib/articles';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components/Layout';
import BloggKort from '../components/BloggKort';

gsap.registerPlugin(ScrollTrigger);

/* Alt innhold kommer nå fra src/lib/articles.js (håndskrevne) og
   src/content/generated/ (migrert ut av Opinly). Ingen henting ved
   kjøretid, så listen er ferdig sortert allerede ved byggtid. */
const kort = articles.map((a) => ({
  slug: a.slug,
  title: a.title,
  description: a.description,
  image: a.hero,
  date: a.publishDate,
}));

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
            {kort.map((article, i) => (
              <BloggKort key={article.slug} article={article} index={i} />
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
