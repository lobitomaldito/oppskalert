import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { populaereSok, populaereSokSchema } from '../lib/populaere-sok';

/* Samleside for populære søk.
 *
 * Bevisst ikke bygget med FAQ-komponenten. Den bruker trekkspill, og selv
 * om innholdet i et trekkspill også crawles, er en ekte H2 med synlig
 * avsnitt rett under det formatet AI-modeller faktisk siterer. Her er
 * poenget siteringen, ikke å spare høyde.
 *
 * Hvert svar lenker videre til siden som utdyper. Det er den interne
 * lenkingen som gjør at denne siden løfter resten, i stedet for å bli en
 * blindvei som svarer på alt selv. */
const PopulaereSokPage = () => {
  const container = useReveal(60);

  return (
    <Shell>
      <SEO
        title="Vanlige spørsmål om nettsider"
        description="Hva koster en nettside, hvor lang tid tar det, og hva bør du kreve av en leverandør? Korte, konkrete svar på det folk faktisk søker etter."
        keywords={[
          'hva koster en nettside',
          'pris på nettside',
          'nettsideleverandør',
          'søkemotoroptimalisering',
          'hvordan lage nettside',
        ]}
        canonical="https://oppskalert.no/vanlige-sporsmal"
        jsonLd={populaereSokSchema}
      />

      <SideTopp
        tittel="Det folk googler"
        uthevet="om nettsider."
        lede="Korte svar på spørsmålene jeg får oftest, og på det folk faktisk søker etter. Ingen selgersnakk, og jeg sier fra når svaret er at du ikke trenger meg."
      />

      <section ref={container} className="seksjon pt-0">
        <div className="wrap">
          <div className="max-w-[46rem] flex flex-col gap-11">
            {populaereSok.map((item) => (
              <article key={item.q} data-reveal>
                <h2 className="font-sans font-bold text-[1.35rem] sm:text-2xl leading-snug tracking-tight">
                  {item.q}
                </h2>
                <p className="font-body text-primary/80 leading-relaxed mt-3">{item.a}</p>
                <Link
                  to={item.til.rute}
                  className="group inline-flex items-center gap-2 font-sans font-bold text-sm text-accent mt-3.5"
                >
                  {item.til.tekst}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DemoSkjema
        tittel="Fant du ikke"
        uthevet="svaret ditt?"
        lede="Send meg spørsmålet, så svarer jeg selv. Er det noe flere lurer på, havner det på denne siden etterpå."
      />
    </Shell>
  );
};

export default PopulaereSokPage;
