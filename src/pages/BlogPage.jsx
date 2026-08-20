import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import BloggKort from '../components/BloggKort';
import { articles } from '../lib/articles';
import { ruter } from '../lib/site';
import { useReveal } from '../lib/useReveal';

/* Alt innhold kommer fra src/lib/articles.js (håndskrevne) og
   src/content/generated/ (migrert ut av Opinly). Ingen henting ved
   kjøretid, så listen er ferdig sortert allerede ved byggtid. Bygges fra
   den ekte artikkellisten, ikke demoens seks hardkodede innlegg, siden
   bloggen i drift har flere poster enn det.

   Kortene bruker BloggKort, samme komponent som kategori- og
   forfattersidene, så listevisningene ser identiske ut. BloggKort ber om
   article.image og article.date, ikke articles.js sine egne feltnavn
   hero og publishDate, derfor mappingen under. */
const kort = articles.map((a) => ({
  slug: a.slug,
  title: a.title,
  description: a.description,
  image: a.hero,
  date: a.publishDate,
}));

const BlogPage = () => {
  const toppRef = useReveal(80);
  const listeRef = useReveal(80);

  return (
    <Shell>
      <SEO
        title="Blogg & Innsikt"
        description="Få konkret kunnskap om nettsider, mobilhastighet, konvertering og hva som faktisk driver salg og vekst for norske bedrifter."
        keywords={["blogg nettsider", "mobilhastighet nettside", "nettside konvertering", "bedrift digital vekst"]}
        canonical="https://oppskalert.no/blogg"
      />

      <section ref={toppRef} className="wrap sidetopp">
        <p data-reveal className="etikett inn">Blogg</p>
        <h1 data-reveal className="inn" style={{ '--d': '60ms' }}>Blogg.</h1>
        <p data-reveal className="inn" style={{ '--d': '140ms' }}>
          Konkret om nettsider, mobilhastighet, søk og hva som faktisk driver salg for
          norske småbedrifter. Ingen bransjeprat. Ingen buzzord.
        </p>
      </section>

      <section ref={listeRef} className="hvit">
        <div className="wrap seksjon">
          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 inn">
            {kort.map((article, i) => (
              <BloggKort key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Avslutnings-CTA. Sto på prod-bloggen med egen tekst, ikke samme
          som footerens, og forsvant i porten fordi demoens bloggside bare
          var en lenkeliste. Teksten er ordrett fra prod, bare flyttet inn
          i designsystemet. */}
      <section className="seksjon">
        <div className="wrap" style={{ maxWidth: '48rem', textAlign: 'center' }}>
          <p className="etikett" style={{ justifyContent: 'center' }}>Klar for neste steg?</p>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3.6vw, 2.6rem)',
            lineHeight: 1.08,
            letterSpacing: '-.03em',
            marginTop: '1rem',
          }}>
            La oss bygge din salgsmaskin.
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--blekk-mykt)' }}>
            Ingen langvarige strategiprosesser. Du får se en fungerende demo før du
            bestemmer deg.
          </p>
          <p style={{ marginTop: '2rem' }}>
            <Link className="knapp" to={ruter.kontakt}>
              Bestill gratis demo <span className="pil" aria-hidden="true">↗</span>
            </Link>
          </p>
        </div>
      </section>
    </Shell>
  );
};

export default BlogPage;
