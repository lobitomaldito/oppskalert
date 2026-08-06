import { useMemo, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal';
import { formatKr } from '../lib/utils';
import { track } from '../lib/analytics';
import { SeksjonTopp } from './Layout';
import { kalkulatorOmfang, kalkulatorTillegg, kalkulatorHaster, ruter } from '../lib/site';

const pillBase =
  'text-left rounded-2xl border px-5 py-4 font-body text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50';

const OmfangKnapp = ({ item, valgt, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={valgt}
    className={`${pillBase} ${valgt ? 'border-accent bg-accent/15' : 'border-primary/15 bg-primary/[0.03] hover:border-primary/30'}`}
  >
    <span className={`block font-sans font-bold ${valgt ? 'text-accent' : 'text-primary'}`}>{item.label}</span>
    <span className="block text-primary/70 text-[0.85rem] mt-0.5">{item.beskrivelse}</span>
  </button>
);

const TilleggKnapp = ({ item, valgt, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={valgt}
    className={`${pillBase} flex items-center justify-between gap-3 ${valgt ? 'border-accent bg-accent/15' : 'border-primary/15 bg-primary/[0.03] hover:border-primary/30'}`}
  >
    <span className={valgt ? 'text-primary font-semibold' : 'text-primary/85'}>{item.label}</span>
    <span
      className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
        valgt ? 'bg-accent border-accent' : 'border-primary/30'
      }`}
      aria-hidden="true"
    >
      {valgt && <Check className="w-3 h-3 text-background" strokeWidth={3} />}
    </span>
  </button>
);

/* Selvbetjent estimat. Samme mekanikk som en byrå-kalkulator man møter
   andre steder — spenn, ikke eksakt tall, ingen e-post nødvendig — men
   uten en "mal"-tier, siden alt her alltid er skreddersydd og håndkodet. */
const Kalkulator = ({ tittel, uthevet, lede }) => {
  const container = useReveal(80);
  const [omfangId, setOmfangId] = useState('2-5');
  const [tillegg, setTillegg] = useState(() => new Set());
  const [haster, setHaster] = useState(false);

  const toggleTillegg = (id) => {
    const leggerTil = !tillegg.has(id);
    setTillegg((prev) => {
      const neste = new Set(prev);
      if (neste.has(id)) neste.delete(id); else neste.add(id);
      return neste;
    });
    track('kalkulator_tillegg_endret', { tillegg: id, valgt: leggerTil });
  };

  const velgOmfang = (id) => {
    setOmfangId(id);
    track('kalkulator_omfang_valgt', { omfang: id });
  };

  const velgHaster = (verdi) => {
    setHaster(verdi);
    track('kalkulator_haster_endret', { haster: verdi });
  };

  const { min, max, valgteTillegg, omfang } = useMemo(() => {
    const omfangValgt = kalkulatorOmfang.find((o) => o.id === omfangId) ?? kalkulatorOmfang[1];
    const valgte = kalkulatorTillegg.filter((t) => tillegg.has(t.id));
    let minSum = omfangValgt.min;
    let maxSum = omfangValgt.max;
    valgte.forEach((t) => { minSum += t.min; maxSum += t.max; });
    if (haster) {
      minSum *= kalkulatorHaster.minFaktor;
      maxSum *= kalkulatorHaster.maxFaktor;
    }
    // Avrund til nærmeste hundre, så tallet ikke ser ut som et regnestykke.
    minSum = Math.round(minSum / 100) * 100;
    maxSum = Math.round(maxSum / 100) * 100;
    return { min: minSum, max: maxSum, valgteTillegg: valgte, omfang: omfangValgt };
  }, [omfangId, tillegg, haster]);

  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        {tittel && <SeksjonTopp tittel={tittel} uthevet={uthevet} lede={lede} />}
        <div className="grid lg:grid-cols-[1fr_20rem] gap-8 items-start">

          <div data-reveal className="flex flex-col gap-8">
            <div>
              <h2 className="font-sans font-bold text-lg mb-4">Hvor stor blir nettsiden?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {kalkulatorOmfang.map((item) => (
                  <OmfangKnapp key={item.id} item={item} valgt={item.id === omfangId} onClick={() => velgOmfang(item.id)} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-sans font-bold text-lg mb-4">Hva skal være med? <span className="font-body font-normal text-primary/60 text-sm">Velg det som passer</span></h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {kalkulatorTillegg.map((item) => (
                  <TilleggKnapp key={item.id} item={item} valgt={tillegg.has(item.id)} onClick={() => toggleTillegg(item.id)} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-sans font-bold text-lg mb-4">Tidsramme</h2>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => velgHaster(false)}
                  aria-pressed={!haster}
                  className={`${pillBase} font-sans font-bold ${!haster ? 'border-accent bg-accent/15 text-accent' : 'border-primary/15 bg-primary/[0.03] text-primary/80 hover:border-primary/30'}`}
                >
                  Fleksibelt
                </button>
                <button
                  type="button"
                  onClick={() => velgHaster(true)}
                  aria-pressed={haster}
                  className={`${pillBase} font-sans font-bold ${haster ? 'border-accent bg-accent/15 text-accent' : 'border-primary/15 bg-primary/[0.03] text-primary/80 hover:border-primary/30'}`}
                >
                  Haster (under 2 uker)
                </button>
              </div>
            </div>
          </div>

          <div data-reveal className="lg:sticky lg:top-28 rounded-2xl border border-accent/30 bg-surface/25 p-7 flex flex-col gap-5">
            <div>
              <span className="font-body text-xs uppercase tracking-widest text-primary/70">Estimert pris</span>
              <div className="font-display font-extrabold text-[2.1rem] leading-none tracking-[-0.02em] mt-2">
                {formatKr(min)}–{formatKr(max)} <span className="text-lg font-sans font-bold text-primary/70">kr</span>
              </div>
              <span className="font-body text-sm text-primary/70 mt-1 block">{omfang.label}{valgteTillegg.length > 0 ? ` + ${valgteTillegg.length} tillegg` : ''}{haster ? ', haster' : ''}</span>
              <span className="font-body text-sm text-primary/70 mt-1 block">
                eller fra <span className="text-primary font-semibold">{formatKr(omfang.manedspris)} kr/mnd</span>, driftet av meg
              </span>
            </div>

            <p className="font-body text-xs text-primary/70 leading-relaxed border-t border-primary/10 pt-4">
              Veiledende estimat. Du får alltid en fast pris, og en gratis demo å se på, før du bestemmer deg.
            </p>

            <Link
              to={ruter.kontakt}
              onClick={() => track('kalkulator_demo_klikket', {
                omfang: omfangId,
                tillegg: [...tillegg],
                haster,
                min,
                max,
              })}
              className="inline-flex items-center justify-center gap-2 bg-accent text-background px-6 py-3.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03]"
            >
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Kalkulator;
