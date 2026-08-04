import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp } from './Layout';
import { ruter, stegene } from '../lib/site';

/* Her er nummerering fortjent: dette ER en sekvens, og rekkefølgen bærer
   informasjon leseren trenger. Derfor tall her, og ingen andre steder. */
const Metode = ({ utdypet = false }) => {
  const container = useReveal(110);

  return (
    <section id="metode" ref={container} className="seksjon bg-room text-room-ink rom">
      <div className="wrap">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.03em]">
            Demoen kommer først. <span className="text-room-signal">Regningen kommer sist.</span>
          </h2>
          <p className="font-body text-sm md:text-base mt-4 max-w-[54ch] leading-relaxed text-room-ink/85">
            De fleste vil ha møter, tilbud og forskudd før du ser noe som helst. Jeg snur på det: du får en ferdig side å klikke i før du har betalt en krone.
          </p>
        </div>

        <ol className={utdypet ? 'flex flex-col gap-10 md:gap-14' : 'grid gap-8 md:grid-cols-2 lg:grid-cols-4'}>
          {stegene.map((s, i) => (
            <li key={s.tittel} data-reveal className={utdypet ? 'md:grid md:grid-cols-[auto_1fr] md:gap-8' : ''}>
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-full font-sans font-bold text-base flex-shrink-0 bg-room-signal text-room"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {utdypet && (
                  <span className="md:hidden font-body text-xs uppercase tracking-widest text-room-ink/75">{s.tid}</span>
                )}
              </div>

              <div className={utdypet ? 'md:pt-1' : ''}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-sans font-bold text-lg md:text-xl">
                    <span className="sr-only">Steg {i + 1}: </span>{s.tittel}
                  </h3>
                  <span className={`font-body text-xs uppercase tracking-widest text-room-ink/75 ${utdypet ? 'hidden md:inline' : ''}`}>
                    {s.tid}
                  </span>
                </div>

                {utdypet && (
                  <p className="font-body text-[0.95rem] md:text-base leading-[1.75] mt-3 text-room-ink/90 max-w-[58ch]">{s.desc}</p>
                )}

                {utdypet && (
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {s.punkter.map((p) => (
                      <li key={p} className="font-body text-[0.95rem] leading-relaxed text-room-ink/80">– {p}</li>
                    ))}
                  </ul>
                )}

                {i === 0 && !utdypet && (
                  <span className="inline-flex items-center font-body text-[0.7rem] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mt-4 bg-room-signal/12 text-room-signal">
                    Gratis · ingen binding
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>

        {!utdypet && (
          <Link
            data-reveal
            to={ruter.metode}
            className="mt-10 md:mt-12 inline-flex items-center gap-2 font-sans font-bold text-sm text-room-signal hover:opacity-80 transition-opacity"
          >
            Les mer om hvordan jeg jobber <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Metode;
