import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { submitDemoRequest } from '../lib/demoRequest';
import { kontakt } from '../lib/site';
import posthog from '../lib/posthog';

/* Plassholder på 70% blekk mot krem gir 6.3:1, godt over AA. Den vanlige
   feilen er lysegrå plassholdertekst «for elegansen»; den er uleselig. */
const feltKlasse =
  'w-full bg-room-ink/5 border border-room-ink/25 rounded-full px-6 py-4 font-body text-sm text-room-ink placeholder:text-room-ink/70 focus:outline-none focus:border-room-ink/60 transition-colors';

const DemoSkjema = ({ tittel, uthevet, lede }) => {
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [firma, setFirma] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!navn.trim() || !epost.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await submitDemoRequest({ navn, epost, firma });
      posthog.capture('demo_request_submitted', { has_company: Boolean(firma.trim()) });
      setStatus('success');
    } catch (err) {
      console.error('Demo request failed:', err);
      setStatus('error');
    }
  };

  return (
    <section id="bestill-demo" className="scroll-mt-28 seksjon bg-room text-room-ink rom">
      <div className="wrap">
        <div className="max-w-[38rem] mx-auto flex flex-col items-center text-center">
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.03em]">
            {tittel} <span className="text-room-signal">{uthevet}</span>
          </h2>
          <p className="font-body text-[0.95rem] md:text-base text-room-ink/90 mt-5 mb-9 leading-relaxed max-w-[46ch]">
            {lede}
          </p>

          {status === 'success' ? (
            <div className="w-full bg-room-ink/5 border border-room-ink/20 rounded-3xl p-9" role="status">
              <p className="font-sans font-bold text-2xl mb-2">Takk! Den er mottatt.</p>
              <p className="font-body text-[0.95rem] text-room-ink/90 leading-relaxed">
                Jeg tar kontakt på e-post innen 24 timer. Haster det, ring meg på{' '}
                <a href={`tel:${kontakt.tel}`} className="underline hover:text-room-signal transition-colors">{kontakt.telefon}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4 text-left">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text" value={navn} autoComplete="name" aria-label="Navn" placeholder="Navn *"
                  onChange={(e) => { setNavn(e.target.value); if (status === 'error') setStatus('idle'); }}
                  className={feltKlasse}
                />
                <input
                  type="email" value={epost} autoComplete="email" aria-label="E-post" placeholder="E-post *"
                  onChange={(e) => { setEpost(e.target.value); if (status === 'error') setStatus('idle'); }}
                  className={feltKlasse}
                />
              </div>
              <input
                type="text" value={firma} autoComplete="organization" aria-label="Bedrift" placeholder="Bedrift eller nettside (valgfritt)"
                onChange={(e) => setFirma(e.target.value)}
                className={feltKlasse}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group bg-room-ink text-room px-10 py-5 rounded-full font-sans font-bold text-lg transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 mt-1"
              >
                <span className="flex items-center justify-center gap-2">
                  {status === 'sending' ? 'Sender …' : <>Bestill gratis demo <ArrowRight className="w-5 h-5" /></>}
                </span>
              </button>

              {status === 'error' && (
                <p role="alert" className="font-body text-sm text-room-signal text-center font-semibold">
                  Jeg trenger navn og en gyldig e-post for å komme i gang. Eller ring meg på{' '}
                  <a href={`tel:${kontakt.tel}`} className="underline">{kontakt.telefon}</a>.
                </p>
              )}

              <p className="font-body text-xs text-room-ink/70 text-center mt-1">
                Uforpliktende. Jeg svarer innen 24 timer, eller ring direkte:{' '}
                <a href={`tel:${kontakt.tel}`} className="text-room-signal hover:underline">{kontakt.telefon}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSkjema;
