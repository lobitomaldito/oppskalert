import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { Loader2 } from 'lucide-react';
import { getCategories, getPosts, normalizePost } from '../../lib/opinly';
import SEO from '../../components/SEO';
import { Navbar, Footer } from '../../components/Layout';
import BloggKort from '../../components/BloggKort';

const KategoriPage = () => {
  const { slug } = useParams();
  const heroRef = useRef(null);
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setCategory(null);
    setPosts([]);
    (async () => {
      try {
        const [categories, res] = await Promise.all([
          getCategories(),
          getPosts({ limit: 12, category: slug, sort: 'newest' }),
        ]);
        if (cancelled) return;
        setCategory(categories.find((c) => c.slug === slug) || null);
        setPosts(res.data.map(normalizePost));
        setHasMore(res.has_more);
        setCursor(res.next_cursor);
      } catch (err) {
        console.error('Kunne ikke hente kategori:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (loading) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-elem'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, [loading]);

  const lastFlere = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await getPosts({ limit: 12, cursor, category: slug, sort: 'newest' });
      setPosts((prev) => [...prev, ...res.data.map(normalizePost)]);
      setHasMore(res.has_more);
      setCursor(res.next_cursor);
    } catch (err) {
      console.error('Kunne ikke hente flere artikler:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const tittel = category?.title || slug;

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <SEO
        title={`${tittel} · Blogg`}
        description={category?.description || `Artikler i kategorien ${tittel}.`}
        canonical={`https://oppskalert.no/blogg/kategori/${slug}`}
      />
      <Navbar />

      <section ref={heroRef} className="pt-48 pb-20 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <span className="hero-elem font-body text-xs uppercase tracking-[0.3em] text-accent mb-6 block">Kategori</span>
          <h1 className="hero-elem font-sans font-bold text-4xl md:text-6xl tracking-tight mb-6">{tittel}</h1>
          {category?.description && (
            <p className="hero-elem font-body text-lg text-primary/85 max-w-2xl leading-relaxed">{category.description}</p>
          )}
        </div>
      </section>

      <section className="py-8 px-6 md:px-12 lg:px-24 bg-background pb-32">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div>
          ) : posts.length === 0 ? (
            <p className="font-body text-primary/70 text-center py-16">Ingen artikler i denne kategorien enda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((article, i) => (
                <BloggKort key={article.slug} article={article} index={i} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-14">
              <button
                type="button"
                onClick={lastFlere}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 border border-primary/25 hover:border-primary/60 px-7 py-4 rounded-full font-sans font-bold text-sm transition-colors duration-300 disabled:opacity-60"
              >
                {loadingMore ? <><Loader2 className="w-4 h-4 animate-spin" /> Laster …</> : 'Last flere artikler'}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KategoriPage;
