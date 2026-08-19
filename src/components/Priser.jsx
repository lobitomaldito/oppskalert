import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp, KortRad } from './Layout';
import { cn } from '../lib/utils';
import { alltidMed, prisNotat, prismodeller, ruter } from '../lib/site';

/* To modeller side om side, og to ulike verdener. Engangspris er kortet du
   eier og går videre med: hvitt, ferdig, avsluttet. Drift er kortet jeg
   passer på for deg: en pågående avtale i stedet for en kvittering, tonet
   mot feltfargen i stedet for hvit. Kontrasten er meningsbærende, ikke
   dekorativ, den samme forskjellen som modellene faktisk representerer.
   Ingen av kortene går mørke: skallet har ingen mørk variant lenger, den
   er reservert til bunntekst, sitatkort og fylte knapper. className kommer
   fra KortRad (bredden på mobil), derfor cn() i stedet for en ren streng. */
const Modell = ({ m, visPasserDeg = false, className }) => {
  const paDrift = m.id === 'drift';
  return (
    <div
      data-reveal
      className={cn(
        'relative flex flex-col rounded-2xl p-7 md:p-8 border',
        paDrift
          ? 'bg-room text-room-ink border-room-ink/20'
          : 'bg-surface text-room-ink border-room-ink/20',
        className,
      )}
    >
      {m.fremhevet && (
        <span className="absolute top-0 right-7 -translate-y-1/2 bg-room-ink text-room text-sm font-body px-3.5 py-1 rounded-full font-semibold">
          Mest valgt
        </span>
      )}

      <h3 className="font-sans font-bold text-xl">{m.navn}</h3>
      <p className="font-body text-[0.95rem] mt-2.5 leading-relaxed min-h-[3em] text-room-ink/70">
        {m.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-body text-sm text-room-ink/70">fra</span>
        <span className="font-display font-extrabold text-[2.75rem] leading-none tracking-[-0.03em]">{m.fra}</span>
        <span className="font-body text-sm text-room-ink/70">{m.enhet}</span>
      </div>
      <span className="font-body text-sm mt-1.5 text-room-ink/70">{m.periode}</span>

      {/* Kun på engangspris-kortet: kalkulatoren regner ut et scope-basert
          engangsestimat, ikke et månedsbeløp, så den hører hjemme her og
          ikke på driftskortet ved siden av. */}
      {m.id === 'engangs' && (
        <Link
          to={ruter.kalkulator}
          className="font-body text-sm text-room-ink hover:opacity-70 transition-opacity underline underline-offset-2 mt-2 inline-block w-fit"
        >
          Regn ut prisen for din side →
        </Link>
      )}

      {visPasserDeg && (
        <ul className="mt-6 pt-5 border-t flex flex-col gap-2.5 border-room-ink/20">
          <li className="font-body text-sm mb-1 text-room-ink/70">Passer deg som</li>
          {m.passerDeg.map((p) => (
            <li key={p} className="font-body text-[0.95rem] leading-relaxed text-room-ink/70">
              – {p}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {m.inkludert.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed text-room-ink/70">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-room-ink" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={ruter.kontakt}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] bg-room-ink text-surface"
      >
        Bestill gratis demo <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

const Priser = ({ visPasserDeg = false, visAlltidMed = true, midtstilt = false }) => {
  const container = useReveal(90);

  return (
    <section id="priser" ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="To måter å eie"
          uthevet="en nettside på."
          lede="Begge starter med en gratis demo. Du bestemmer deg etterpå, ikke før."
          midtstilt={midtstilt}
        />

        <KortRad gridKlasser="md:grid-cols-2" kortBredde="w-[86%]" className="gap-5 items-stretch max-w-[52rem]">
          {prismodeller.map((m) => <Modell key={m.id} m={m} visPasserDeg={visPasserDeg} />)}
        </KortRad>

        <p data-reveal className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">{prisNotat}</p>
        <p data-reveal className="font-body text-sm text-room-ink/70 mt-3 max-w-[52rem]">
          Vil du redigere selv, eller ha enda raskere respons?{' '}
          <Link to={ruter.drift} className="text-room-ink hover:opacity-70 transition-opacity underline underline-offset-2">
            Se alle driftsnivåer
          </Link>
        </p>

        {visAlltidMed ? (
          <div data-reveal className="mt-12 rounded-2xl border border-room-ink/20 p-7 md:p-9 max-w-[52rem]">
            <h3 className="font-sans font-bold text-lg mb-6">Alt dette følger med, uansett modell.</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {alltidMed.map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] text-room-ink/70 leading-relaxed">
                  <Check className="w-4 h-4 text-room-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Kompakt variant (forsiden): boksen med alt som følger med er
             skjult, så lenken holder innholdet ett klikk unna i stedet. */
          <Link
            data-reveal
            to={ruter.priser}
            className="mt-10 inline-flex items-center gap-2 font-sans font-bold text-sm text-room-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Se alt som er inkludert, og sammenlign modellene i detalj <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Priser;
