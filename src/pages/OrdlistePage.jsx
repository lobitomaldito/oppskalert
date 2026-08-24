import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { lagBrodsmuleSchema } from '../lib/site';
import { RUTE_ORDLISTE, begrepRute, ordliste, ordlisteSchema } from '../lib/ordliste';

/* Samlesiden for ordlista.
 *
 * Samme oppbygging som /vanlige-sporsmal: hele definisjonen står synlig
 * her, ikke bare oppslagsordet med en lenke. En ren lenkeliste er en
 * side uten eget innhold, og den rangerer på ingenting. Med
 * definisjonene stående kan siden selv svare på «hva betyr CMS» for den
 * som lander her, og oppslagsordet lenker videre for den som vil ha mer.
 *
 * Ikke sortert alfabetisk. Rekkefølgen følger når begrepene dukker opp i
 * et ekte kjøp: først det du må eie (domene, webhotell), så det siden er
 * bygget av, så det som avgjør om den virker. En A til Å-liste er
 * ryddig for den som allerede kan faget og ubrukelig for den som ikke
 * gjør det. */
const OrdlistePage = () => {
  const container = useReveal(60);

  return (
    <Shell>
      <SEO
        title="Ordliste for deg som skal kjøpe nettside"
        description="Ti begreper du møter når du kjøper nettside, forklart uten stammespråk: CMS, domene, webhotell, SSL, responsivt design, Core Web Vitals og fire til."
        keywords={[
          'hva er cms',
          'hva er et domene',
          'hva er webhotell',
          'hva er responsivt design',
          'hva er ssl',
        ]}
        canonical="https://oppskalert.no/ordliste"
        jsonLd={[
          ordlisteSchema,
          lagBrodsmuleSchema([{ navn: 'Ordliste', rute: RUTE_ORDLISTE }]),
        ]}
      />

      <SideTopp
        tittel="Ord du møter"
        uthevet="når du kjøper nettside."
        lede="Ti begreper som pleier å dukke opp midt i et tilbud fra noen andre, forklart slik jeg ville forklart dem på telefonen. Ingen av dem er vanskelige når noen sier hva de betyr."
      />

      <section ref={container} className="seksjon pt-0">
        <div className="wrap">
          <div className="max-w-[46rem] flex flex-col gap-11">
            {ordliste.map((item) => (
              <article key={item.slug} data-reveal>
                <h2 className="font-sans font-bold text-[1.35rem] sm:text-2xl leading-snug tracking-tight">
                  <Link
                    to={begrepRute(item.slug)}
                    className="underline underline-offset-4 decoration-room-ink/25 hover:decoration-room-ink transition-colors"
                  >
                    {item.term}
                  </Link>
                </h2>
                <p className="font-body text-room-ink/70 leading-relaxed mt-3">{item.kort}</p>
                <Link
                  to={begrepRute(item.slug)}
                  className="group inline-flex items-center min-h-[44px] gap-2 font-sans font-bold text-sm text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-full"
                >
                  Les mer om {item.term.toLowerCase()}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DemoSkjema
        tittel="Fikk du et tilbud"
        uthevet="du ikke forstår?"
        lede="Send det til meg, så leser jeg gjennom og sier hva som står der. Det koster ingenting, og jeg sier fra hvis tilbudet er godt."
      />
    </Shell>
  );
};

export default OrdlistePage;
