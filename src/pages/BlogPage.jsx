import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import { articles } from '../lib/articles';
import { useReveal } from '../lib/useReveal';

/* Alt innhold kommer fra src/lib/articles.js (håndskrevne) og
   src/content/generated/ (migrert ut av Opinly). Ingen henting ved
   kjøretid, så listen er ferdig sortert allerede ved byggtid. Bygges fra
   den ekte artikkellisten, ikke demoens seks hardkodede innlegg, siden
   bloggen i drift har flere poster enn det. */
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
          <ul data-reveal className="blogg inn">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to={`/blogg/${a.slug}`}>
                  {a.title} <span className="pil" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
};

export default BlogPage;
