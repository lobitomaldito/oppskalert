import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Loader2 } from 'lucide-react';
import { getAuthor, getPosts, opinlyImageUrl, normalizePost } from '../../lib/opinly';
import SEO from '../../components/SEO';
import { Navbar, Footer } from '../../components/Layout';
import BloggKort from '../../components/BloggKort';

const ForfatterPage = () => {
  const { slug } = useParams();
  const heroRef = useRef(null);
  const [author, setAuthor] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    (async () => {
      try {
        const [authorData, res] = await Promise.all([
          getAuthor(slug),
          getPosts({ limit: 12, author: slug, sort: 'newest' }),
        ]);
        if (cancelled) return;
        if (!authorData) {
          setNotFound(true);
          return;
        }
        setAuthor(authorData);
        setPosts(res.data.map(normalizePost));
        setHasMore(res.has_more);
        setCursor(res.next_cursor);
      } catch (err) {
        console.error('Kunne ikke hente forfatter:', err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (loading || !heroRef.current) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-elem'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, [loading]);

  const lastFlere = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await getPosts({ limit: 12, cursor, author: slug, sort: 'newest' });
      setPosts((prev) => [...prev, ...res.data.map(normalizePost)]);
      setHasMore(res.has_more);
      setCursor(res.next_cursor);
    } catch (err) {
      console.error('Kunne ikke hente flere artikler:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (notFound) return <Navigate to="/blogg" replace />;

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-white">
      <SEO
        title={author ? `${author.name} · Blogg` : 'Forfatter · Blogg'}
        description={author?.bio || `Artikler skrevet av ${author?.name || 'forfatteren'}.`}
        canonical={`https://oppskalert.no/blogg/forfatter/${slug}`}
      />
      <Navbar />

      <section ref={heroRef} className="pt-48 pb-20 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div>
          ) : (
            <div className="flex items-center gap-6">
              {author?.image && (
                <img
                  src={opinlyImageUrl(author.image?.fileKey)}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover border border-primary/10"
                />
              )}
              <div>
                <span className="hero-elem font-body text-xs uppercase tracking-[0.3em] text-accent mb-3 block">Forfatter</span>
                <h1 className="hero-elem font-sans font-bold text-4xl md:text-6xl tracking-tight">{author?.name}</h1>
              </div>
            </div>
          )}
          {author?.bio && (
            <p className="hero-elem font-body text-lg text-primary/85 max-w-2xl leading-relaxed mt-8">{author.bio}</p>
          )}
        </div>
      </section>

      {!loading && (
        <section className="py-8 px-6 md:px-12 lg:px-24 bg-background pb-32">
          <div className="max-w-5xl mx-auto">
            {posts.length === 0 ? (
              <p className="font-body text-primary/70 text-center py-16">Ingen artikler publisert enda.</p>
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
      )}

      <Footer />
    </div>
  );
};

export default ForfatterPage;
