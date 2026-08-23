import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { submitDemoRequest } from '../lib/demoRequest';
import { kontakt } from '../lib/site';
import { track, identify } from '../lib/analytics';

/* Plassholder på 70% blekk mot krem gir 6.3:1, godt over AA. Den vanlige
   feilen er lysegrå plassholdertekst «for elegansen»; den er uleselig. */
const feltKlasse =
  'w-full bg-surface border border-room-ink/20 rounded-kort px-5 py-3.5 font-body text-sm text-room-ink placeholder:text-room-ink/70 focus:outline-none focus:border-room-ink transition-colors';

/* Ja/nei er to ord og fortjener ikke to kort. Som piller lager de heller
   ingen halvtom rad, og de leser som ett valg, ikke som et skjema i seg selv. */
const pilleKlasse = (valgt) =>
  `rounded-full border px-5 py-2.5 font-sans font-bold text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 ${
    valgt ? 'bg-room-ink text-surface border-room-ink' : 'bg-surface text-room-ink border-room-ink/20 hover:border-room-ink/45'
  }`;

const DemoSkjema = ({ tittel, uthevet, lede }) => {
  const [harNettside, setHarNettside] = useState(null); // null | true | false
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [firma, setFirma] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // To botsignaler api/demo-request.js vurderer. Feltet er skjult for
  // mennesker og skjermlesere, så bare et skript som fyller ut alt det
  // finner treffer det. Tidsstemplet skiller en ekte utfylling fra et
  // øyeblikkelig POST.
  const [honeypot, setHoneypot] = useState('');
  const apnetRef = useRef(0);
  useEffect(() => { apnetRef.current = Date.now(); }, []);

  /* Skjemaet var todelt: to kvalifiseringsspørsmål før navn og e-post.
     Det første spurte om kategori, og et av de tre svarene var nettbutikk,
     en leveranse som ikke finnes i porteføljen. Nå står det ene spørsmålet
     som betyr noe for demoen, og adressen til dagens side, som er det mest
     nyttige jeg kan få inn. Hendelsen beholder trinnet i trakten. */
  const velgHarNettside = (verdi) => {
    if (harNettside === null) track('demo_form_paabegynt', { har_nettside: verdi });
    setHarNettside(verdi);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!navn.trim() || !epost.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const meldingDeler = [];
    if (harNettside !== null) meldingDeler.push(`Har nettside fra før: ${harNettside ? 'Ja' : 'Nei'}.`);
    try {
      await submitDemoRequest({
        navn,
        epost,
        firma,
        melding: meldingDeler.join(' '),
        honeypot,
        msPaSkjema: Date.now() - apnetRef.current,
      });
      identify({ email: epost.trim(), name: navn.trim() });
      track('demo_request_submitted', { has_company: Boolean(firma.trim()), har_nettside: harNettside });
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
          <h2 className="font-display font-light text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.022em]">
            {tittel} <span>{uthevet}</span>
          </h2>
          <p className="font-body text-[0.95rem] md:text-base text-room-ink/90 mt-5 mb-9 leading-relaxed max-w-[46ch]">
            {lede}
          </p>

          {status === 'success' ? (
            <div className="w-full bg-surface border border-room-ink/20 rounded-kort p-9" role="status">
              <p className="font-sans font-bold text-2xl mb-2">Takk! Den er mottatt.</p>
              <p className="font-body text-[0.95rem] text-room-ink/90 leading-relaxed">
                Jeg tar kontakt på e-post innen 24 timer. Haster det, ring meg på{' '}
                <a href={`tel:${kontakt.tel}`} className="underline hover:opacity-70 transition-opacity">{kontakt.telefon}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4 text-center">
              {/* Honeypot. Plassert utenfor skjermen i stedet for display:none,
                  fordi en del bots hopper over skjulte felt men ikke
                  forflyttede. aria-hidden + tabIndex holder den unna
                  skjermlesere og tastaturnavigasjon. */}
              <input
                type="text" name="nettadresse" value={honeypot} tabIndex={-1}
                autoComplete="off" aria-hidden="true"
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />

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

              <div className="mt-2">
                <span className="font-sans font-bold text-sm block mb-3">Har du en nettside i dag?</span>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { verdi: true, label: 'Ja, den skal bygges om' },
                    { verdi: false, label: 'Nei, jeg starter fra bunn' },
                  ].map((o) => (
                    <button
                      key={o.label} type="button" aria-pressed={harNettside === o.verdi}
                      onClick={() => velgHarNettside(o.verdi)}
                      className={pilleKlasse(harNettside === o.verdi)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Samme felt, samme kolonne i basen. Bare etiketten flytter
                  seg: har de en side, er adressen det mest verdifulle jeg
                  kan få, fordi demoen blir bedre av å se den først. */}
              <input
                type="text" value={firma} autoComplete="organization"
                aria-label={harNettside ? 'Adressen til nettsiden din' : 'Bedrift'}
                placeholder={harNettside ? 'dittfirma.no' : 'Bedrift (valgfritt)'}
                onChange={(e) => setFirma(e.target.value)}
                className={feltKlasse}
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group bg-room-ink text-surface px-7 py-3.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100 mt-3 self-center"
              >
                <span className="flex items-center justify-center gap-2">
                  {status === 'sending' ? 'Sender …' : <>Bestill gratis demo <ArrowRight className="w-4 h-4" /></>}
                </span>
              </button>

              {status === 'error' && (
                <p role="alert" className="font-body text-sm text-room-ink text-center font-semibold">
                  Jeg trenger navn og en gyldig e-post for å komme i gang. Eller ring meg på{' '}
                  <a href={`tel:${kontakt.tel}`} className="underline">{kontakt.telefon}</a>.
                </p>
              )}

              <p className="font-body text-sm text-room-ink/70 text-center mt-1">
                Vil du heller snakke med noen først? Ring{' '}
                <a href={`tel:${kontakt.tel}`} className="text-room-ink underline underline-offset-2 hover:opacity-70 transition-opacity">{kontakt.telefon}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSkjema;
