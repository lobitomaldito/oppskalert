import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp, KortRad } from './Layout';
import { cn } from '../lib/utils';
import { alltidMed, prisNotat, prismodeller, ruter } from '../lib/site';

/* To modeller side om side, og to ulike verdener. Engangspris er kortet du
   eier og går videre med: hvitt, ferdig, avsluttet. Drift er kortet jeg
   passer på for deg: mørkt som skallet rundt, en pågående avtale i stedet
   for en kvittering. Kontrasten er meningsbærende, ikke dekorativ, den
   samme forskjellen som modellene faktisk representerer. className kommer
   fra KortRad (bredden på mobil), derfor cn() i stedet for en ren streng. */
const Modell = ({ m, visPasserDeg = false, className }) => {
  const paDrift = m.id === 'drift';
  return (
    <div
      data-reveal
      className={cn(
        'relative flex flex-col rounded-2xl p-7 md:p-8 border',
        paDrift
          ? 'bg-background text-ink border-ink/20'
          : 'bg-surface text-room-ink border-room-ink/20',
        className,
      )}
    >
      {m.fremhevet && (
        <span className="absolute top-0 right-7 -translate-y-1/2 bg-ink text-background text-sm font-body px-3.5 py-1 rounded-full font-semibold">
          Mest valgt
        </span>
      )}

      <h3 className="font-sans font-bold text-xl">{m.navn}</h3>
      <p className={cn('font-body text-[0.95rem] mt-2.5 leading-relaxed min-h-[3em]', paDrift ? 'text-ink/80' : 'text-room-ink/70')}>
        {m.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className={cn('font-body text-sm', paDrift ? 'text-ink/70' : 'text-room-ink/70')}>fra</span>
        <span className="font-display font-extrabold text-[2.75rem] leading-none tracking-[-0.03em]">{m.fra}</span>
        <span className={cn('font-body text-sm', paDrift ? 'text-ink/70' : 'text-room-ink/70')}>{m.enhet}</span>
      </div>
      <span className={cn('font-body text-sm mt-1.5', paDrift ? 'text-ink/70' : 'text-room-ink/70')}>{m.periode}</span>

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
        <ul className={cn('mt-6 pt-5 border-t flex flex-col gap-2.5', paDrift ? 'border-ink/20' : 'border-room-ink/20')}>
          <li className={cn('font-body text-sm mb-1', paDrift ? 'text-ink/70' : 'text-room-ink/70')}>Passer deg som</li>
          {m.passerDeg.map((p) => (
            <li key={p} className={cn('font-body text-[0.95rem] leading-relaxed', paDrift ? 'text-ink/80' : 'text-room-ink/70')}>
              – {p}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {m.inkludert.map((f) => (
          <li key={f} className={cn('flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed', paDrift ? 'text-ink/80' : 'text-room-ink/70')}>
            <Check className={cn('w-4 h-4 mt-0.5 flex-shrink-0', paDrift ? 'text-ink' : 'text-room-ink')} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={ruter.kontakt}
        className={cn(
          'mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03]',
          paDrift ? 'bg-ink text-background' : 'bg-room-ink text-surface',
        )}
      >
        Bestill gratis demo <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

const Priser = ({ visPasserDeg = false, visAlltidMed = true, midtstilt = false }) => {
  const container = useReveal(90);

  return (
    <section id="priser" ref={container} className="seksjon bg-deep">
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

        <p data-reveal className="font-body text-sm text-primary/70 mt-6 max-w-[52rem]">{prisNotat}</p>
        <p data-reveal className="font-body text-sm text-primary/80 mt-3 max-w-[52rem]">
          Vil du redigere selv, eller ha enda raskere respons?{' '}
          <Link to={ruter.drift} className="text-ink hover:opacity-70 transition-opacity underline underline-offset-2">
            Se alle driftsnivåer
          </Link>
        </p>

        {visAlltidMed ? (
          <div data-reveal className="mt-12 rounded-2xl border border-primary/20 p-7 md:p-9 max-w-[52rem]">
            <h3 className="font-sans font-bold text-lg mb-6">Alt dette følger med, uansett modell.</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {alltidMed.map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] text-primary/80 leading-relaxed">
                  <Check className="w-4 h-4 text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
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
            className="mt-10 inline-flex items-center gap-2 font-sans font-bold text-sm text-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Se alt som er inkludert, og sammenlign modellene i detalj <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Priser;
