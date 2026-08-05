import { Check } from 'lucide-react';
import { SeksjonTopp } from './Layout';
import { useReveal } from '../lib/useReveal';

/* Delte byggeklosser for de søkeordsdrevne landingssidene
   (/sokemotoroptimalisering, /webdesign-oslo, /nettside-design,
   /nettside-til-bedrift, /lage-nettbutikk).

   Grunnen til at de bor her og ikke kopieres inn i hver side: fem kopier av
   samme Avsnitt-komponent er både død kode og en fristelse til å la sidene
   gli mot å bli identiske. Identiske landingssider med byttet søkeord er
   nøyaktig doorway-mønsteret Google straffer. Delt form, ulikt innhold. */

/* Ett tekstavsnitt med egen H2. Maks 62ch, som er samme lesebredde som
   artiklene bruker. */
export const Avsnitt = ({ tittel, uthevet, children }) => (
  <div data-reveal className="max-w-[62ch]">
    <h2 className="font-display font-extrabold text-[clamp(1.5rem,3.2vw,2.15rem)] leading-[1.1] tracking-[-0.03em] mb-4">
      {tittel} <span className="text-accent">{uthevet}</span>
    </h2>
    <div className="font-body text-[0.98rem] md:text-base text-primary/80 leading-relaxed flex flex-col gap-4">
      {children}
    </div>
  </div>
);

/* Rytmen mellom avsnittene. Egen komponent så avstandene ikke driver fra
   hverandre side for side. */
export const Brodtekst = ({ children }) => {
  const container = useReveal(70);
  return (
    <section ref={container} className="seksjon pt-0">
      <div className="wrap flex flex-col gap-14 md:gap-20">{children}</div>
    </section>
  );
};

/* Avkrysset liste over hva som inngår. To kolonner fra md. */
export const Punktliste = ({ tittel, uthevet, lede, punkter, fotnote }) => {
  const container = useReveal(60);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp tittel={tittel} uthevet={uthevet} lede={lede} />
        <ul data-reveal className="grid gap-3.5 md:grid-cols-2 max-w-[62rem]">
          {punkter.map((p) => (
            <li key={p} className="flex items-start gap-3 font-body text-[0.95rem] text-primary/85 leading-relaxed">
              <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        {fotnote && (
          <p data-reveal className="font-body text-[0.95rem] text-primary/80 mt-8 max-w-[56ch] leading-relaxed">
            {fotnote}
          </p>
        )}
      </div>
    </section>
  );
};
