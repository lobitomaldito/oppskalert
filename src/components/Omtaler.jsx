import { Star } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { KortRad, SeksjonTopp } from './Layout';
import { cn } from '../lib/utils';
import { omtaler } from '../lib/site';

/* Statisk rutenett i stedet for den gamle uendelige marquee-en: fire omtaler
   er ikke nok til å bære en rullende stripe, og en stripe som beveger seg
   gjør lange sitater vanskelige å faktisk lese. */
const Stjerner = () => (
  <div className="flex gap-0.5 mb-3" aria-label="5 av 5 stjerner">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-room-ink text-room-ink" aria-hidden="true" />
    ))}
  </div>
);

const Omtaler = ({ flate = '' }) => {
  const container = useReveal(90);

  return (
    <section ref={container} className={cn('seksjon', flate)}>
      <div className="wrap">
        <SeksjonTopp
          tittel="Ikke ta mitt ord for det."
          uthevet="Hør på kundene."
        />

        {/* Mobil: horisontal scroll-snap via KortRad, holder seksjonen kort
            i høyden. Fra lg: rutenett med den lengste omtalen i egen kolonne
            (row-span-3 lar de tre andre fylle plassen ved siden av). */}
        <KortRad gridKlasser="gap-5 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-3" kortBredde="w-[82%]">
          {omtaler.map((t, i) =>
            i === 0 ? (
              <figure
                key={t.navn}
                data-reveal
                className="rounded-2xl border border-room-ink/10 bg-surface p-7 md:p-9 flex flex-col lg:col-start-1 lg:row-start-1 lg:row-span-3"
              >
                <Stjerner />
                <blockquote className="font-body text-[0.95rem] md:text-base leading-[1.75] text-room-ink/70 flex-1">
                  «{t.sitat}»
                </blockquote>
                <figcaption className="mt-6">
                  <span className="font-sans font-bold block">{t.navn}</span>
                  <span className="font-body text-sm text-room-ink/70">{t.firma}</span>
                </figcaption>
              </figure>
            ) : (
              <figure
                key={t.navn}
                data-reveal
                className="rounded-2xl border border-room-ink/10 bg-surface p-6 flex flex-col"
              >
                <Stjerner />
                <blockquote className="font-body text-[0.95rem] leading-relaxed text-room-ink/70 flex-1">«{t.sitat}»</blockquote>
                <figcaption className="mt-4">
                  <span className="font-sans font-bold text-sm block">{t.navn}</span>
                  <span className="font-body text-sm text-room-ink/70">{t.firma}</span>
                </figcaption>
              </figure>
            )
          )}
        </KortRad>
      </div>
    </section>
  );
};

export default Omtaler;
