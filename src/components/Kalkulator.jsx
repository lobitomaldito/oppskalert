import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { formatKr } from '../lib/utils';
import { track, identify } from '../lib/analytics';
import { submitDemoRequest } from '../lib/demoRequest';
import { SeksjonTopp } from './Layout';
import { kalkulatorOmfang, kalkulatorTillegg, kalkulatorHaster, kontakt } from '../lib/site';

const pillBase =
  'text-left rounded-kort border px-5 py-4 font-body text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50';

/* Plassholder på 70% blekk mot krem gir 6.3:1, samme verdi som i
   DemoSkjema.jsx. Feltene her er smalere fordi de står i sidekortet,
   ikke i en seksjon på full bredde. */
const feltKlasse =
  'w-full bg-surface border border-room-ink/20 rounded-kort px-4 py-3 font-body text-sm text-room-ink placeholder:text-room-ink/70 focus:outline-none focus:border-room-ink transition-colors';

/* Valgt tilstand bærer ingen aksentfarge lenger, samme "fylt kant"-taktikk
   som DemoSkjema.jsx (se kommentar der): full blekk-kant og lett tint mot
   dempet kant og nesten usynlig tint for uvalgt. Understreken på selve
   ordet er et ekstra, rent typografisk signal, siden font-vekten allerede
   er lik i begge tilstander. */
const OmfangKnapp = ({ item, valgt, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={valgt}
    className={`${pillBase} ${valgt ? 'border-room-ink bg-room-ink/10' : 'border-room-ink/20 hover:border-room-ink/40'}`}
  >
    <span className={`block font-sans font-bold ${valgt ? 'text-room-ink underline underline-offset-4' : 'text-room-ink'}`}>{item.label}</span>
    <span className="block text-room-ink/70 text-[0.85rem] mt-0.5">{item.beskrivelse}</span>
  </button>
);

const TilleggKnapp = ({ item, valgt, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={valgt}
    className={`${pillBase} flex items-center justify-between gap-3 ${valgt ? 'border-room-ink bg-room-ink/10' : 'border-room-ink/20 hover:border-room-ink/40'}`}
  >
    <span className={valgt ? 'text-room-ink font-semibold' : 'text-room-ink/70'}>{item.label}</span>
    <span
      className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
        valgt ? 'bg-room-ink border-room-ink' : 'border-room-ink/30'
      }`}
      aria-hidden="true"
    >
      {valgt && <Check className="w-3 h-3 text-room" strokeWidth={3} />}
    </span>
  </button>
);

/* Selvbetjent estimat. Samme mekanikk som en byrå-kalkulator man møter
   andre steder, spenn, ikke eksakt tall, ingen e-post nødvendig, men
   uten en "mal"-tier, siden alt her alltid er skreddersydd og håndkodet.

   Kortet har tre tilstander: tall, skjema, kvittering.

   Poenget med rekkefølgen: prisen kommer først og koster ingenting.
   Skjemaet er et valg brukeren tar etter at han har sett tallet, ikke en
   port foran det. Sidetoppen lover «ingen e-post», og det løftet holder
   så lenge tallet står ferdig regnet ut før noen spør om noe.

   Grunnen til at skjemaet i det hele tatt står her, og ikke bare nederst
   på siden: det er her intensjonen er høyest. Har du nettopp klikket deg
   fram til et tall du kan leve med, er avstanden til «send meg det
   skriftlig» kort. Ruller du forbi kortet og ned til seksjonen under, er
   valgene dine borte fra skjermen og du starter forfra.

   Valgene følger med i meldingen, så en henvendelse herfra er verdt mer
   enn en fra bunnskjemaet: jeg vet omfang, tillegg, tidsramme og hvilket
   spenn han faktisk så, før jeg svarer. */
const Kalkulator = ({ tittel, uthevet, lede }) => {
  const container = useReveal(80);
  const [omfangId, setOmfangId] = useState('2-5');
  const [tillegg, setTillegg] = useState(() => new Set());
  const [haster, setHaster] = useState(false);

  // 'tall' | 'skjema' | 'sendt'
  const [steg, setSteg] = useState('tall');
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const navnRef = useRef(null);

  // Samme to botsignaler som DemoSkjema.jsx sender: et felt ingen ekte
  // bruker ser, og hvor lenge siden faktisk stod åpen. api/demo-request.js
  // vurderer begge.
  const [honeypot, setHoneypot] = useState('');
  const apnetRef = useRef(0);
  useEffect(() => { apnetRef.current = Date.now(); }, []);

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

  const sammendrag = `${omfang.label}${valgteTillegg.length > 0 ? ` + ${valgteTillegg.length} tillegg` : ''}${haster ? ', haster' : ''}`;

  const hendelsesdata = () => ({
    omfang: omfangId,
    tillegg: [...tillegg],
    haster,
    min,
    max,
  });

  /* Hendelsesnavnet er beholdt fra da knappen lenket til /kontakt.
     Den måler fortsatt det samme: at noen med et ferdig regnet tall
     foran seg bestemte seg for å gå videre. Bytter jeg navnet, mister
     trakten i PostHog historikken sin. */
  const apneSkjema = () => {
    setSteg('skjema');
    track('kalkulator_demo_klikket', hendelsesdata());
    // Fokus flyttes til første felt, ellers står markøren igjen på en
    // knapp som ikke finnes lenger etter tilstandsbyttet.
    requestAnimationFrame(() => navnRef.current?.focus());
  };

  const sendInn = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!navn.trim() || !epost.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');

    // Valgene skrives inn i melding-feltet, som allerede finnes i
    // demo_foresporsler og i e-postvarselet. Ingen ny kolonne, ingen
    // migrering, og teksten er lesbar rett i varselet.
    const melding = [
      `Fra priskalkulatoren: ${sammendrag}.`,
      `Estimat vist: ${formatKr(min)} til ${formatKr(max)} kr.`,
      valgteTillegg.length > 0 ? `Tillegg: ${valgteTillegg.map((t) => t.label).join(', ')}.` : null,
      `Tidsramme: ${haster ? 'haster, under 2 uker' : 'fleksibelt'}.`,
    ].filter(Boolean).join(' ');

    try {
      await submitDemoRequest({
        navn,
        epost,
        firma: null,
        melding,
        honeypot,
        msPaSkjema: Date.now() - apnetRef.current,
      });
      identify({ email: epost.trim(), name: navn.trim() });
      track('kalkulator_lead_sendt', hendelsesdata());
      setSteg('sendt');
      setStatus('idle');
    } catch (err) {
      console.error('Kalkulator lead failed:', err);
      setStatus('error');
    }
  };

  /* min-h-[44px] på selve lenken, ikke på avsnittet rundt. Et
     telefonnummer som arver linjehøyden fra brødteksten blir 16 px høyt
     og faller under WCAG 2.2 AA 2.5.8, som krever 44 × 44. Det er den
     trykkflaten som ryker oftest, og den eneste på siden der en bom
     betyr at noen ikke ringer. */
  const ringLenke = (
    <p className="font-body text-xs text-room-ink/70 text-center">
      <a
        href={`tel:${kontakt.tel}`}
        className="inline-flex items-center justify-center min-h-[44px] px-2 gap-1 text-room-ink/70 hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-full"
      >
        Eller ring meg på{' '}
        <span className="text-room-ink underline underline-offset-2">{kontakt.telefon}</span>
      </a>
    </p>
  );

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
              <h2 className="font-sans font-bold text-lg mb-4">Hva skal være med? <span className="font-body font-normal text-room-ink/70 text-sm">Velg det som passer</span></h2>
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
                  className={`${pillBase} font-sans font-bold ${!haster ? 'border-room-ink bg-room-ink/10 text-room-ink underline underline-offset-4' : 'border-room-ink/20 text-room-ink/70 hover:border-room-ink/40'}`}
                >
                  Fleksibelt
                </button>
                <button
                  type="button"
                  onClick={() => velgHaster(true)}
                  aria-pressed={haster}
                  className={`${pillBase} font-sans font-bold ${haster ? 'border-room-ink bg-room-ink/10 text-room-ink underline underline-offset-4' : 'border-room-ink/20 text-room-ink/70 hover:border-room-ink/40'}`}
                >
                  Haster (under 2 uker)
                </button>
              </div>
            </div>
          </div>

          <div data-reveal className="lg:sticky lg:top-28 rounded-kort border border-room-ink/40 bg-surface/25 p-7 flex flex-col gap-5">
            {steg === 'sendt' ? (
              <div role="status">
                <p className="font-sans font-bold text-xl mb-2">Takk. Den er mottatt.</p>
                <p className="font-body text-sm text-room-ink/80 leading-relaxed">
                  Du får en fast pris på {sammendrag.toLowerCase()} på e-post innen 24 timer, sammen med en gratis demo.
                  Haster det, ring{' '}
                  <a href={`tel:${kontakt.tel}`} className="underline underline-offset-2 hover:opacity-70 transition-opacity">
                    {kontakt.telefon}
                  </a>.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <span className="font-body text-xs uppercase tracking-widest text-room-ink/70">Estimert pris</span>
                  <div className="font-display font-light text-[2.1rem] leading-none tracking-[-0.018em] mt-2">
                    {formatKr(min)}–{formatKr(max)} <span className="text-lg font-sans font-bold text-room-ink/70">kr</span>
                  </div>
                  <span className="font-body text-sm text-room-ink/70 mt-1 block">{sammendrag}</span>
                  <span className="font-body text-sm text-room-ink/70 mt-1 block">
                    eller fra <span className="text-room-ink font-semibold">{formatKr(omfang.manedspris)} kr/mnd</span> på abonnement, 12 måneders binding
                  </span>
                </div>

                {/* Forbeholdet står i begge tilstander. Tallet over er et
                    spenn, og setningen som sier det skal ikke forsvinne i det
                    øyeblikket noen skriver inn e-posten sin. */}
                <p className="font-body text-xs text-room-ink/70 leading-relaxed border-t border-room-ink/10 pt-4">
                  Veiledende estimat. Du får alltid en fast pris, og en gratis demo å se på, før du bestemmer deg.
                </p>

                {steg === 'tall' ? (
                  <>
                    <button
                      type="button"
                      onClick={apneSkjema}
                      className="inline-flex items-center justify-center gap-2 bg-room-ink text-room px-6 py-3.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50"
                    >
                      Få prisen skriftlig <ArrowRight className="w-4 h-4" />
                    </button>
                    {ringLenke}
                  </>
                ) : (
                  <form onSubmit={sendInn} noValidate className="flex flex-col gap-3">
                    <div>
                      <p className="font-sans font-bold text-sm">Hvor skal jeg sende den?</p>
                      <p className="font-body text-xs text-room-ink/70 leading-relaxed mt-1">
                        Fast pris på {sammendrag.toLowerCase()}, og en gratis demo, innen 24 timer. Ingen binding.
                      </p>
                    </div>

                    {/* Honeypot. Plassert utenfor skjermen i stedet for
                        display:none, av samme grunn som i DemoSkjema.jsx:
                        en del bots hopper over skjulte felt, men ikke
                        forflyttede. */}
                    <input
                      type="text" name="nettadresse" value={honeypot} tabIndex={-1}
                      autoComplete="off" aria-hidden="true"
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute left-[-9999px] w-px h-px opacity-0"
                    />

                    <input
                      ref={navnRef}
                      type="text" value={navn} autoComplete="name" aria-label="Navn" placeholder="Navn *"
                      onChange={(e) => { setNavn(e.target.value); if (status === 'error') setStatus('idle'); }}
                      className={feltKlasse}
                    />
                    <input
                      type="email" value={epost} autoComplete="email" aria-label="E-post" placeholder="E-post *"
                      onChange={(e) => { setEpost(e.target.value); if (status === 'error') setStatus('idle'); }}
                      className={feltKlasse}
                    />

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-2 bg-room-ink text-room px-6 py-3.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50"
                    >
                      {status === 'sending' ? 'Sender …' : <>Send meg prisen <ArrowRight className="w-4 h-4" /></>}
                    </button>

                    {status === 'error' && (
                      <p role="alert" className="font-body text-xs text-room-ink font-semibold">
                        Jeg trenger navn og en gyldig e-post. Eller ring{' '}
                        <a href={`tel:${kontakt.tel}`} className="underline">{kontakt.telefon}</a>.
                      </p>
                    )}

                    {ringLenke}
                  </form>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Kalkulator;
