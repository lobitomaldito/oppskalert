import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { submitDemoRequest } from '../lib/demoRequest';
import { kontakt } from '../lib/site';
import posthog from '../lib/posthog';

/* Plassholder på 70% blekk mot krem gir 6.3:1, godt over AA. Den vanlige
   feilen er lysegrå plassholdertekst «for elegansen»; den er uleselig. */
const feltKlasse =
  'w-full bg-room-ink/5 border border-room-ink/25 rounded-full px-6 py-4 font-body text-sm text-room-ink placeholder:text-room-ink/70 focus:outline-none focus:border-room-ink/60 transition-colors';

// Samme korttaktikk som priskalkulatoren (valgt = fylt kant + hake), bare
// overført til krem-rommets farger. Tidligere versjon var tynne piller uten
// beskrivelse — for lite fysisk tilstedeværelse til å føles trykkbare.
const kortKlasse = (valgt) =>
  `text-left rounded-2xl border px-5 py-4 transition-all duration-200 hover:scale-[1.015] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-room-signal/50 ${
    valgt ? 'border-room-signal bg-room-signal/15' : 'border-room-ink/20 bg-room-ink/[0.03] hover:border-room-ink/40'
  }`;

const Hake = ({ valgt }) => (
  <span
    className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
      valgt ? 'bg-room-signal border-room-signal' : 'border-room-ink/30'
    }`}
    aria-hidden="true"
  >
    {valgt && <Check className="w-3 h-3 text-room" strokeWidth={3} />}
  </span>
);

const behovOpsjoner = [
  { id: 'nettside', label: 'Nettside', beskrivelse: 'Ny side eller redesign' },
  { id: 'nettbutikk', label: 'Nettbutikk', beskrivelse: 'Selge produkter på nett' },
  { id: 'vet-ikke', label: 'Vet ikke helt enda', beskrivelse: 'Vi finner ut av det sammen' },
];

const behovLabel = (id) => behovOpsjoner.find((b) => b.id === id)?.label;

const DemoSkjema = ({ tittel, uthevet, lede }) => {
  const [steg, setSteg] = useState(1);
  const [behov, setBehov] = useState(null);
  const [harNettside, setHarNettside] = useState(null); // null | true | false
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [firma, setFirma] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const gaTilSteg2 = () => {
    posthog.capture('demo_form_steg1_fullfort', { behov, har_nettside: harNettside });
    setSteg(2);
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
    if (behov) meldingDeler.push(`Trenger hjelp til: ${behovLabel(behov)}.`);
    if (harNettside !== null) meldingDeler.push(`Har nettside fra før: ${harNettside ? 'Ja' : 'Nei'}.`);
    try {
      await submitDemoRequest({ navn, epost, firma, melding: meldingDeler.join(' ') });
      posthog.capture('demo_request_submitted', { has_company: Boolean(firma.trim()), behov, har_nettside: harNettside });
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
          ) : steg === 1 ? (
            <div className="w-full flex flex-col gap-7 text-left">
              <span className="font-body text-xs uppercase tracking-widest text-room-ink/60 text-center">Steg 1 av 2</span>

              <div>
                <span className="font-sans font-bold text-sm block mb-3">Hva trenger du demo til?</span>
                <div className="grid sm:grid-cols-3 gap-3">
                  {behovOpsjoner.map((b) => {
                    const valgt = behov === b.id;
                    return (
                      <button
                        key={b.id} type="button" aria-pressed={valgt}
                        onClick={() => setBehov(b.id)}
                        className={kortKlasse(valgt)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`font-sans font-bold text-sm ${valgt ? 'text-room-ink' : 'text-room-ink/90'}`}>{b.label}</span>
                          <Hake valgt={valgt} />
                        </div>
                        <span className="block font-body text-xs text-room-ink/70 mt-1">{b.beskrivelse}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="font-sans font-bold text-sm block mb-3">Har du en nettside fra før?</span>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  {[
                    { verdi: true, label: 'Ja', beskrivelse: 'Jeg vil bygge om' },
                    { verdi: false, label: 'Nei', beskrivelse: 'Jeg starter fra bunn' },
                  ].map((o) => {
                    const valgt = harNettside === o.verdi;
                    return (
                      <button
                        key={o.label} type="button" aria-pressed={valgt}
                        onClick={() => setHarNettside(o.verdi)}
                        className={kortKlasse(valgt)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`font-sans font-bold text-sm ${valgt ? 'text-room-ink' : 'text-room-ink/90'}`}>{o.label}</span>
                          <Hake valgt={valgt} />
                        </div>
                        <span className="block font-body text-xs text-room-ink/70 mt-1">{o.beskrivelse}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={gaTilSteg2}
                  className="group bg-room-ink text-room px-10 py-5 rounded-full font-sans font-bold text-lg transition-transform duration-300 hover:scale-[1.02] w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">Neste <ArrowRight className="w-5 h-5" /></span>
                </button>
                <button type="button" onClick={() => setSteg(2)} className="font-body text-xs text-room-ink/60 hover:text-room-ink underline underline-offset-2">
                  Hopp over, jeg vil bare legge igjen kontaktinfo
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4 text-left">
              <span className="font-body text-xs uppercase tracking-widest text-room-ink/60 text-center -mt-1 mb-1">Steg 2 av 2</span>
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
              <button type="button" onClick={() => setSteg(1)} className="font-body text-xs text-room-ink/60 hover:text-room-ink self-center underline underline-offset-2">
                Tilbake
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
