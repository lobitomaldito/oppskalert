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
  const [forst, ...resten] = omtaler;

  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Ikke ta mitt ord for det."
          uthevet="Hør på kundene."
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Den lengste omtalen får plassen den fortjener */}
          <figure data-reveal className="rounded-3xl border border-primary/12 bg-primary/[0.04] p-7 md:p-9 flex flex-col">
            <Stjerner />
            <blockquote className="font-body text-[0.95rem] md:text-base leading-[1.75] text-primary/90 flex-1">
              «{forst.sitat}»
            </blockquote>
            <figcaption className="mt-6">
              <span className="font-sans font-bold block">{forst.navn}</span>
              <span className="font-body text-xs text-primary/70">{forst.firma}</span>
            </figcaption>
          </figure>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-3">
            {resten.map((t) => (
              <figure key={t.navn} data-reveal className="rounded-2xl border border-primary/12 bg-primary/[0.03] p-6 flex flex-col">
                <Stjerner />
                <blockquote className="font-body text-[0.95rem] leading-relaxed text-primary/85 flex-1">«{t.sitat}»</blockquote>
                <figcaption className="mt-4">
                  <span className="font-sans font-bold text-sm block">{t.navn}</span>
                  <span className="font-body text-xs text-primary/70">{t.firma}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Omtaler;
