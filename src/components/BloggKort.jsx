import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Delt artikkelkort for blogg-oversikten, kategorisider og forfattersider,
// slik at de tre listevisningene ser identiske ut.
const BloggKort = ({ article, index = 0 }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, delay: (index % 6) * 0.1, ease: 'power2.out',
      }
    );
  }, []);

  return (
    <Link ref={cardRef} to={`/blogg/${article.slug}`} className="group block bg-surface/30 border border-primary/10 rounded-[2.5rem] overflow-hidden hover:border-ink/40 transition-all duration-500 hover:-translate-y-1">
      {article.image && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-ink">{formatDate(article.date)}</span>
          {article.category && (
            <>
              <span className="w-1 h-1 rounded-full bg-primary/20" />
              <span className="font-body text-xs uppercase tracking-[0.25em] text-primary/60">{article.category}</span>
            </>
          )}
        </div>
        <h2 className="font-sans font-bold text-xl md:text-2xl tracking-tight text-primary mb-3 leading-snug">
          {article.title}
        </h2>
        <p className="font-body text-[0.95rem] text-primary/80 leading-relaxed mb-6">
          {article.description}
        </p>
        {/* "Les mer" mistet aksentfargen. Beholder samme brytnings-signal som
            porteføljekortene (Portfolio.jsx): dempet i hvile, full blekk-styrke
            ved hover, altså opasitet i stedet for en ny farge. */}
        <div className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-ink/70 group-hover:text-ink transition-colors duration-300">
          <span>Les mer</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default BloggKort;
