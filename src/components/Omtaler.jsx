import { Star } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp } from './Layout';
import { omtaler } from '../lib/site';

/* Statisk rutenett i stedet for den gamle uendelige marquee-en: fire omtaler
   er ikke nok til å bære en rullende stripe, og en stripe som beveger seg
   gjør lange sitater vanskelige å faktisk lese. */
const Stjerner = () => (
  <div className="flex gap-0.5 mb-3" aria-label="5 av 5 stjerner">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" aria-hidden="true" />
    ))}
  </div>
);

const Omtaler = () => {
  const container = useReveal(90);

  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Ikke ta mitt ord for det."
          uthevet="Hør på kundene."
        />

        {/* Mobil: horisontal scroll-snap, holder seksjonen kort i høyden.
            Fra lg: samme rutenett som før, med den lengste omtalen igjen
            i egen kolonne (row-span-3 lar de tre andre fylle plassen ved siden av). */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 lg:grid lg:grid-cols-[1.15fr_1fr] lg:grid-rows-3 lg:overflow-visible">
          {omtaler.map((t, i) =>
            i === 0 ? (
              <figure
                key={t.navn}
                data-reveal
                className="flex-shrink-0 w-[82%] sm:w-[60%] lg:w-auto snap-start rounded-3xl border border-primary/12 bg-primary/[0.04] p-7 md:p-9 flex flex-col lg:col-start-1 lg:row-start-1 lg:row-span-3"
              >
                <Stjerner />
                <blockquote className="font-body text-[0.95rem] md:text-base leading-[1.75] text-primary/90 flex-1">
                  «{t.sitat}»
                </blockquote>
                <figcaption className="mt-6">
                  <span className="font-sans font-bold block">{t.navn}</span>
                  <span className="font-body text-xs text-primary/70">{t.firma}</span>
                </figcaption>
              </figure>
            ) : (
              <figure
                key={t.navn}
                data-reveal
                className="flex-shrink-0 w-[82%] sm:w-[60%] lg:w-auto snap-start rounded-2xl border border-primary/12 bg-primary/[0.03] p-6 flex flex-col"
              >
                <Stjerner />
                <blockquote className="font-body text-[0.95rem] leading-relaxed text-primary/85 flex-1">«{t.sitat}»</blockquote>
                <figcaption className="mt-4">
                  <span className="font-sans font-bold text-sm block">{t.navn}</span>
                  <span className="font-body text-xs text-primary/70">{t.firma}</span>
                </figcaption>
              </figure>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Omtaler;
