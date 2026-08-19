import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { KortRad, SeksjonTopp } from './Layout';
import { ruter, stegene } from '../lib/site';

/* Her er nummerering fortjent: dette ER en sekvens, og rekkefølgen bærer
   informasjon leseren trenger. Derfor tall her, og ingen andre steder. */
const Metode = ({ utdypet = false }) => {
  const container = useReveal(110);

  // Bygges én gang og gjenbrukes i begge grener under: kun rammen rundt
  // stegene (vertikal liste kontra KortRad) er forskjellig, ikke innholdet.
  //
  // På forsiden får hvert steg en egen ramme. Uten den fløt fire tekstblokker
  // fritt på den mørke flaten og seksjonen leste som uferdig. Pilen mellom
  // kortene er ikke pynt: rekkefølgen ER innholdet i denne seksjonen.
  const steg = stegene.map((s, i) => (
    <li
      key={s.tittel}
      data-reveal
      className={
        utdypet
          ? 'md:grid md:grid-cols-[auto_1fr] md:gap-8'
          : 'relative rounded-2xl border border-room-ink/20 bg-room-ink/10 p-6'
      }
    >
      <div className="flex items-center gap-4 mb-4">
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full font-sans font-bold text-base flex-shrink-0 bg-room-signal text-room"
          aria-hidden="true"
        >
          {i + 1}
        </span>
        {utdypet && (
          <span className="md:hidden font-body text-sm text-room-ink/70">{s.tid}</span>
        )}
      </div>

      <div className={utdypet ? 'md:pt-1' : ''}>
        <h3 className="font-sans font-bold text-lg md:text-xl">
          <span className="sr-only">Steg {i + 1}: </span>{s.tittel}
        </h3>
        {/* Tiden sto i versaler med sperring. Den er opplysning, ikke en
            etikett som skal rope, så den er nå vanlig småtekst. */}
        <span className={`block font-body text-sm text-room-ink/70 mt-1 ${utdypet ? 'hidden md:block' : ''}`}>
          {s.tid}
        </span>

        {/* Kortene sto nesten tomme. I en horisontal scroller koster høyde
            ingenting, så her er det plass til å faktisk si hva steget er. */}
        {!utdypet && (
          <p className="font-body text-[0.95rem] leading-relaxed mt-3 text-room-ink/80">{s.kort}</p>
        )}

        {utdypet && (
          <p className="font-body text-[0.95rem] md:text-base leading-[1.75] mt-3 text-room-ink/80 max-w-[58ch]">{s.desc}</p>
        )}

        {utdypet && (
          <ul className="mt-4 flex flex-col gap-1.5">
            {s.punkter.map((p) => (
              <li key={p} className="font-body text-[0.95rem] leading-relaxed text-room-ink/80">– {p}</li>
            ))}
          </ul>
        )}

        {i === 0 && !utdypet && (
          <span className="inline-flex items-center font-body text-sm px-3 py-1 rounded-full mt-4 bg-room-signal/10 text-room-signal">
            Gratis, ingen binding
          </span>
        )}
      </div>

      {/* Pilen ligger i mellomrommet mellom kortene. Den vises der stegene
          faktisk står på én rad: mobil (horisontal scroller) og lg (fire
          kolonner). Mellom sm og lg er rutenettet to ganger to, og da ville
          en høyrepil på kort nummer to peke ut i ingenting. */}
      {!utdypet && i < stegene.length - 1 && (
        <ArrowRight
          className="absolute top-1/2 -right-[1.6rem] -translate-y-1/2 w-5 h-5 text-room-signal/70 sm:hidden lg:block"
          aria-hidden="true"
        />
      )}
    </li>
  ));

  return (
    <section id="metode" ref={container} className="seksjon bg-room text-room-ink rom">
      <div className="wrap">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.03em]">
            Demoen kommer først. Regningen kommer sist.
          </h2>
          <p className="font-body text-sm md:text-base mt-4 max-w-[54ch] leading-relaxed text-room-ink/80">
            De fleste vil ha møter, tilbud og forskudd før du ser noe som helst. Jeg snur på det: du får en ferdig side å klikke i før du har betalt en krone.
          </p>
        </div>

        {utdypet ? (
          <ol className="flex flex-col gap-10 md:gap-14">{steg}</ol>
        ) : (
          /* Fire steg stablet på mobil spiste for mye høyde. Samme
             horisontale scroller som resten av forsiden, kun her fordi
             utdypet=false; /metode (utdypet=true) beholder den lange
             vertikale listen som er hele poenget med siden. */
          <KortRad as="ol" gridKlasser="gap-8 sm:grid-cols-2 lg:grid-cols-4" kortBredde="w-[72%]">
            {steg}
          </KortRad>
        )}

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
