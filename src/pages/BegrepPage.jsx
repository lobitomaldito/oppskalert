import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { lagBrodsmuleSchema, NETTSTED } from '../lib/site';
import { RUTE_ORDLISTE, begrepRute, begrepSchema, finnBegrep } from '../lib/ordliste';

/* Ett begrep per adresse under /ordliste/<slug>.
 *
 * Samme oppbygging som spørsmålssidene: definisjonen først, utdypingene
 * under, to beslektede begreper nederst. Forskjellen er oppmerkingen.
 * Her er det DefinedTerm som gjelder, ikke FAQPage, fordi siden faktisk
 * definerer et ord. Se kommentaren over begrepSchema i lib/ordliste.js
 * for hvorfor jeg ikke legger på begge.
 *
 * Ukjent slug sendes til samlesiden, av samme grunn som på
 * spørsmålssidene: ti håndplukkede oppføringer betyr at en feil slug
 * nesten alltid er en gammel lenke. */
const BegrepPage = () => {
  const { slug } = useParams();
  const container = useReveal(60);
  const item = finnBegrep(slug);

  if (!item) return <Navigate to={RUTE_ORDLISTE} replace />;

  const relaterte = (item.relatert ?? []).map(finnBegrep).filter(Boolean);

  return (
    <Shell>
      <SEO
        title={item.tittel}
        description={item.beskrivelse}
        canonical={`${NETTSTED}${begrepRute(item.slug)}`}
        jsonLd={[
          begrepSchema(item),
          lagBrodsmuleSchema([
            { navn: 'Ordliste', rute: RUTE_ORDLISTE },
            { navn: item.term, rute: begrepRute(item.slug) },
          ]),
        ]}
      />

      <div ref={container}>
        <section className="wrap sidetopp">
          <nav className="brodsmuler" aria-label="Brødsmuler" data-reveal>
            <Link to="/">Forside</Link>
            <span aria-hidden="true">/</span>
            <Link to={RUTE_ORDLISTE}>Ordliste</Link>
            <span aria-hidden="true">/</span>
            <span>{item.term}</span>
          </nav>
          {/* H1 er spørsmålsformen, ikke bare oppslagsordet. «Hva er et
              CMS?» er det folk skriver inn, «CMS» er det ingen søker på
              alene. Selve ordet står i brødsmulen rett over, så siden
              fortsatt leser som en ordlisteoppføring. */}
          <h1 data-reveal>{item.tittel}</h1>
        </section>

        <section className="seksjon pt-0">
          <div className="wrap">
            <div className="max-w-[46rem] flex flex-col gap-11">
              <div data-reveal>
                <p className="font-body text-xs uppercase tracking-widest text-room-ink/70 mb-3">Kort definisjon</p>
                <p className="font-body text-lg text-room-ink leading-relaxed">{item.kort}</p>
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
                  <h2 className="font-sans font-bold text-lg mb-4">Beslektede begreper</h2>
                  <ul className="flex flex-col">
                    {relaterte.map((r) => (
                      <li key={r.slug}>
                        <Link
                          to={begrepRute(r.slug)}
                          className="group inline-flex items-start min-h-[44px] py-2.5 gap-2 font-body text-room-ink underline underline-offset-4 decoration-room-ink/30 hover:decoration-room-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-kort"
                        >
                          {r.tittel}
                          <ArrowRight className="w-4 h-4 mt-1.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={RUTE_ORDLISTE}
                    className="inline-flex items-center min-h-[44px] font-body text-sm text-room-ink/70 hover:text-room-ink transition-colors mt-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-full"
                  >
                    ← Hele ordlista
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <DemoSkjema
        tittel="Lurer du på noe"
        uthevet="som ikke står her?"
        lede="Send meg spørsmålet, så svarer jeg selv. Er det noe flere lurer på, havner det i ordlista etterpå."
      />
    </Shell>
  );
};

export default BegrepPage;
