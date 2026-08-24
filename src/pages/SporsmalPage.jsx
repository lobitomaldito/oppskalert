import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { lagBrodsmuleSchema, NETTSTED } from '../lib/site';
import {
  RUTE_VANLIGE_SPORSMAL,
  finnSporsmal,
  sporsmalRute,
  sporsmalSchema,
} from '../lib/populaere-sok';

/* Én side per spørsmål under /vanlige-sporsmal/<slug>.
 *
 * Samlesiden svarer på femten spørsmål under én title. Den kan derfor
 * bare rangere på ett av dem, og en AI-modell som skal svare på ett av
 * de andre må gjette hvilket av femten avsnitt som gjelder. Denne siden
 * finnes for å fjerne den gjettingen: én adresse, én title, ett svar.
 *
 * Rekkefølgen på siden er ikke tilfeldig. Kortsvaret står øverst, før
 * alt annet, fordi det er avsnittet som skal siteres. Utdypingene ligger
 * under som egne H2-spørsmål, som er samme mønster som resten av
 * nettstedet bruker. Nederst ligger to beslektede spørsmål, ikke fem:
 * poenget er å sende leseren ett sted til, ikke å bygge en lenkevegg.
 *
 * Ukjent slug sendes til samlesiden med en 301-lignende Navigate replace,
 * i stedet for en egen «finnes ikke»-side. Settet er lite og håndplukket,
 * så en feil slug er nesten alltid en gammel lenke, ikke en tastefeil. */
const SporsmalPage = () => {
  const { slug } = useParams();
  const container = useReveal(60);
  const item = finnSporsmal(slug);

  if (!item) return <Navigate to={RUTE_VANLIGE_SPORSMAL} replace />;

  const canonical = `${NETTSTED}${sporsmalRute(item.slug)}`;
  const relaterte = (item.relatert ?? []).map(finnSporsmal).filter(Boolean);

  return (
    <Shell>
      <SEO
        title={item.tittel}
        description={item.beskrivelse}
        canonical={canonical}
        jsonLd={[
          sporsmalSchema(item),
          lagBrodsmuleSchema([
            { navn: 'Vanlige spørsmål', rute: RUTE_VANLIGE_SPORSMAL },
            { navn: item.q, rute: sporsmalRute(item.slug) },
          ]),
        ]}
      />

      <div ref={container}>
        <section className="wrap sidetopp">
          <nav className="brodsmuler" aria-label="Brødsmuler" data-reveal>
            <Link to="/">Forside</Link>
            <span aria-hidden="true">/</span>
            <Link to={RUTE_VANLIGE_SPORSMAL}>Vanlige spørsmål</Link>
            <span aria-hidden="true">/</span>
            <span>{item.q}</span>
          </nav>
          <h1 data-reveal>{item.q}</h1>
        </section>

        <section className="seksjon pt-0">
          <div className="wrap">
            <div className="max-w-[46rem] flex flex-col gap-11">
              {/* Kortsvaret. Står som første avsnitt på siden, med
                  etiketten over, fordi både Google og modellene henter
                  fra toppen når spørsmålet i H1 matcher det de leter
                  etter. Teksten er ordrett den samme som på samlesiden,
                  ikke en omskriving, så de to sidene ikke kan si to
                  forskjellige ting om samme spørsmål. */}
              <div data-reveal>
                <p className="font-body text-xs uppercase tracking-widest text-room-ink/70 mb-3">Kort svar</p>
                <p className="font-body text-lg text-room-ink leading-relaxed">{item.a}</p>
                <Link
                  to={item.til.rute}
                  className="group inline-flex items-center min-h-[44px] gap-2 font-sans font-bold text-sm text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink mt-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-full"
                >
                  {item.til.tekst}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {(item.utdyping ?? []).map((del) => (
                <article key={del.t} data-reveal>
                  <h2 className="font-sans font-bold text-[1.35rem] sm:text-2xl leading-snug tracking-tight">
                    {del.t}
                  </h2>
                  <p className="font-body text-room-ink/70 leading-relaxed mt-3">{del.a}</p>
                </article>
              ))}

              {relaterte.length > 0 && (
                <div data-reveal className="border-t border-room-ink/15 pt-9">
                  <h2 className="font-sans font-bold text-lg mb-4">Beslektede spørsmål</h2>
                  <ul className="flex flex-col">
                    {relaterte.map((r) => (
                      <li key={r.slug}>
                        <Link
                          to={sporsmalRute(r.slug)}
                          className="group inline-flex items-start min-h-[44px] py-2.5 gap-2 font-body text-room-ink underline underline-offset-4 decoration-room-ink/30 hover:decoration-room-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-kort"
                        >
                          {r.q}
                          <ArrowRight className="w-4 h-4 mt-1.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={RUTE_VANLIGE_SPORSMAL}
                    className="inline-flex items-center min-h-[44px] font-body text-sm text-room-ink/70 hover:text-room-ink transition-colors mt-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-full"
                  >
                    ← Alle vanlige spørsmål
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <DemoSkjema
        tittel="Svarte ikke dette"
        uthevet="på det du lurte på?"
        lede="Send meg spørsmålet, så svarer jeg selv. Er det noe flere lurer på, havner det på denne siden etterpå."
      />
    </Shell>
  );
};

export default SporsmalPage;
