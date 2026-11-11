import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitDemoRequest } from '../lib/demoRequest';
import { kontakt, prismodeller, ruter } from '../lib/site';
import { identify, track } from '../lib/analytics';
import { PilHoyre } from './Ikon';

/* Leadmodulen på forsiden (11.11.2026), samme grep som lead-modulene i
   quick-demo: fire spørsmål, ett om gangen, svar som rader merket A/B/C,
   så en anbefalt pakke på skjermen før det spørres om e-post. Mønsteret
   er karrieresjekken fra KarriereMatch, som Aleksander mener solgte det
   utkastet. Erstatter DemoSkjema på forsiden. De andre sidene har det
   gamle skjemaet.

   Svaret først, e-post etterpå: pakken vises uten at noe er fylt ut.
   Skjemaet kommer etter, og svarene følger med i meldingen til
   ringeappen, så samtalen kan starte der.

   Alle spørsmålene står i HTML-en, også de som er skjult, så de kommer
   med i prerenderingen (krav 3 i quick-demo).

   Sporing: hvert klikk i modulen går gjennom track(), altså til PostHog,
   analytics_events i Supabase og GA4. Hendelsene heter utkastvelger_*.
   Innsendingen beholder navnet demo_request_submitted, fordi GA4 og
   Google Ads teller konverteringen på det navnet. demo_form_paabegynt
   sendes ved første svar av samme grunn: trakten i PostHog starter der. */

/* Spørsmålene skal selge, ikke kartlegge (Aleksander 11.11.2026): hvert
   spørsmål spør etter utfallet kunden vil ha, med steder og ord kunden
   kjenner (Google, ChatGPT, konkurrentene), aldri etter metoden. Ingen
   spør etter «SEO», men alle vil vite hvem kundene finner når de søker.
   Det første spørsmålet er det eneste som bare kartlegger, fordi svaret
   styrer skjemaet (adressen til dagens side). */
const SPORSMAL = [
  {
    id: 'nettside',
    tekst: 'Har du en nettside i dag?',
    svar: [
      'Ja, men den ser gammel ut eller er treg',
      'Ja, men den gir nesten ingen henvendelser',
      'Nei, jeg starter fra bunnen',
    ],
  },
  {
    id: 'synlig',
    tekst: 'Når noen søker etter det du gjør, på Google eller i ChatGPT, hvem finner de da?',
    svar: [
      'Konkurrentene mine, tror jeg',
      'Vet ikke, jeg har aldri sjekket',
      'Meg, jeg ligger øverst',
    ],
  },
  {
    id: 'tjenester',
    tekst: 'Vil du at hver tjeneste skal ha sin egen side, så de som søker på akkurat den finner deg?',
    svar: [
      'Ja, jeg tilbyr flere ting',
      'Nei, jeg har én hovedtjeneste',
      'Vet ikke ennå',
    ],
  },
  {
    id: 'mer',
    tekst: 'Vil du at siden skal skaffe kunder mens du er opptatt med jobben?',
    svar: [
      'Ja, de skal kunne regne ut pris eller bestille selv',
      'Kanskje senere',
      'Nei, et kontaktskjema holder',
    ],
  },
];

const BOKSTAV = ['A', 'B', 'C'];

/* Svarene er indekser 0–2 (A–C). Komplett når siden skal skaffe kunder
   selv. Medium når kundene ikke finner dem i søk, når de vil ha en side
   per tjeneste, eller når dagens side ikke gir henvendelser. Enkel bare
   for den som allerede ligger øverst og har én tjeneste. «Vet ikke» gir
   Medium, som også er pakken priskortene anbefaler. */
const velgPakke = ([nettside, synlig, tjenester, mer]) => {
  if (mer === 0) return 'komplett';
  if (synlig !== 2 || tjenester !== 1 || nettside === 1) return 'medium';
  return 'enkel';
};

/* Begrunnelsen bygges av kundens egne svar, så resultatet leses som et
   svar på det de sa, ikke som en reklame for pakken. */
const begrunnelse = ([nettside, synlig, , mer]) => {
  const linjer = [];
  if (synlig === 0) linjer.push('Du tror kundene finner konkurrentene dine i dag.');
  if (synlig === 1) linjer.push('Du vet ikke om kundene finner deg i dag.');
  if (nettside === 1) linjer.push('Siden du har i dag gir nesten ingen henvendelser.');
  if (mer === 0) linjer.push('Du vil at siden skal skaffe kunder mens du jobber.');
  return linjer.slice(0, 2).join(' ');
};

const gyldigEpost = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

const Utkastvelger = () => {
  const [steg, setSteg] = useState(0); // 0–3 spørsmål, 4 resultat
  const [svar, setSvar] = useState([]);
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [firma, setFirma] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feil, setFeil] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const apnetRef = useRef(0);
  const fokusert = useRef(new Set());
  const overskrift = useRef(null);
  const forsteGang = useRef(true);
  useEffect(() => { apnetRef.current = Date.now(); }, []);

  // Etter hvert steg flyttes fokus til den nye overskriften, så skjermlesere
  // leser opp spørsmålet. Ikke ved første visning: da ville siden hoppet.
  useEffect(() => {
    if (forsteGang.current) { forsteGang.current = false; return; }
    overskrift.current?.focus({ preventScroll: true });
  }, [steg]);

  const pakkeId = steg === 4 ? velgPakke(svar) : null;
  const pakke = prismodeller.find((p) => p.id === pakkeId);
  const harSide = svar[0] === 0 || svar[0] === 1;

  const svarPa = (i, valg) => {
    const sp = SPORSMAL[i];
    if (svar.length === 0) {
      track('utkastvelger_startet');
      track('demo_form_paabegynt', { kilde: 'utkastvelger', har_nettside: valg !== 2 });
    }
    track('utkastvelger_svar', { sporsmal: i + 1, id: sp.id, svar: BOKSTAV[valg], tekst: sp.svar[valg] });
    const nye = [...svar.slice(0, i), valg];
    setSvar(nye);
    if (i === SPORSMAL.length - 1) {
      const p = velgPakke(nye);
      track('utkastvelger_resultat', { pakke: p, svar: nye.map((v) => BOKSTAV[v]).join('') });
      setSteg(4);
    } else {
      setSteg(i + 1);
    }
  };

  const tilbake = () => {
    track('utkastvelger_tilbake', { fra: steg === 4 ? 'resultat' : steg + 1 });
    setSteg((s) => Math.max(0, (s === 4 ? SPORSMAL.length : s) - 1));
  };

  const startPaNytt = () => {
    track('utkastvelger_start_pa_nytt', { pakke: pakkeId });
    setSvar([]);
    setSteg(0);
  };

  const feltFokus = (felt) => {
    if (fokusert.current.has(felt)) return;
    fokusert.current.add(felt);
    track('utkastvelger_felt', { felt });
  };

  const send = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const nyeFeil = {};
    if (!navn.trim()) nyeFeil.navn = 'Skriv navnet ditt.';
    if (!gyldigEpost(epost)) nyeFeil.epost = 'Skriv en e-postadresse jeg kan svare på.';
    setFeil(nyeFeil);
    track('utkastvelger_send_klikket', { gyldig: Object.keys(nyeFeil).length === 0, pakke: pakkeId });
    if (Object.keys(nyeFeil).length) { setStatus('error'); return; }

    setStatus('sending');
    const linjer = SPORSMAL.map((sp, i) => `${sp.tekst} ${BOKSTAV[svar[i]]}: ${sp.svar[svar[i]]}`);
    try {
      await submitDemoRequest({
        navn,
        epost,
        firma,
        melding: [`Utkastvelgeren anbefalte ${pakke.navn}.`, ...linjer].join('\n'),
        honeypot,
        msPaSkjema: Date.now() - apnetRef.current,
      });
      // Samme sperre som DemoSkjema: lokkefeltet skal aldri telles som konvertering.
      if (!honeypot) {
        identify({ email: epost.trim(), name: navn.trim() });
        track('demo_request_submitted', {
          type: 'utkastvelger',
          pakke: pakkeId,
          har_nettside: harSide,
          has_company: Boolean(firma.trim()),
        });
      }
      setStatus('success');
    } catch (err) {
      console.error('Utkastvelger feilet:', err);
      track('utkastvelger_sending_feilet', { pakke: pakkeId });
      setStatus('feilet');
    }
  };

  const fornavn = navn.trim().split(/\s+/)[0];

  return (
    <section id="bestill-demo" className="seksjon velger-seksjon">
      <div className="wrap">
        <div className="seksjonstopp velger-topp">
          <p className="etikett">Gratis utkast</p>
          <h2>Klar for en nettside som selger?</h2>
          <p>Svar på fire korte spørsmål, så ser du hvilken pakke som passer deg. Etterpå kan du be om et gratis utkast, klart på 48 timer.</p>
        </div>

        <div className="velger">
          {steg < 4 && (
            <div className="velger-hode">
              <img src="/founders/aleksander-160.webp" alt="" width="80" height="80" />
              <p className="velger-teller">Spørsmål {steg + 1} av {SPORSMAL.length}</p>
              <div className="velger-fremdrift" aria-hidden="true">
                <span style={{ transform: `scaleX(${(steg + 1) / SPORSMAL.length})` }} />
              </div>
            </div>
          )}

          {SPORSMAL.map((sp, i) => (
            <fieldset key={sp.id} className={i === steg ? 'velger-sp er-aktiv' : 'velger-sp'}>
              <legend>
                <span ref={i === steg ? overskrift : null} tabIndex={-1}>{sp.tekst}</span>
              </legend>
              <div className="velger-valg">
                {sp.svar.map((tekst, v) => (
                  <button
                    key={tekst}
                    type="button"
                    className="velger-rad"
                    aria-pressed={svar[i] === v}
                    onClick={() => svarPa(i, v)}
                  >
                    <span className="velger-bokstav" aria-hidden="true">{BOKSTAV[v]}</span>
                    {tekst}
                  </button>
                ))}
              </div>
              {i > 0 && (
                <button type="button" className="velger-tilbake" onClick={tilbake}>Tilbake</button>
              )}
            </fieldset>
          ))}

          {steg === 4 && pakke && (
            <div className="velger-res">
              <div>
                <p className="etikett">Det som passer deg</p>
                <h3 ref={overskrift} tabIndex={-1} className="velger-res-tittel">
                  {pakke.navn}, {pakke.fast ? '' : 'fra '}{pakke.fra} kr
                </h3>
                <p className="velger-res-tekst">
                  {begrunnelse(svar)} {pakke.verdi} I alle pakkene endrer du tekst og bilder selv.
                </p>
                <ul className="velger-res-liste">
                  {pakke.inkludert.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <p className="velger-res-lenker">
                  <Link to={ruter.priser} onClick={() => track('utkastvelger_priser_klikket', { pakke: pakkeId })}>
                    Se alle pakkene <PilHoyre className="pil" />
                  </Link>
                  <button type="button" className="velger-tilbake" onClick={tilbake}>Tilbake</button>
                  <button type="button" className="velger-tilbake" onClick={startPaNytt}>Start på nytt</button>
                </p>
              </div>

              {status === 'success' ? (
                <div className="velger-kvittering" role="status">
                  <p className="velger-skjema-tittel">Takk{fornavn ? `, ${fornavn}` : ''}.</p>
                  <p>Jeg sender deg utkastet på e-post innen 48 timer. Haster det, ring meg på{' '}
                    <a href={`tel:${kontakt.tel}`} onClick={() => track('utkastvelger_ring', { sted: 'kvittering' })}>{kontakt.telefon}</a>.
                  </p>
                </div>
              ) : (
                <form className="velger-skjema" onSubmit={send} noValidate>
                  <p className="velger-skjema-tittel">Få et gratis utkast av siden din</p>
                  <input
                    type="text" name="nettadresse" value={honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true"
                    onChange={(e) => setHoneypot(e.target.value)} className="velger-lokk"
                  />
                  <label className="velger-felt">
                    <span>Navn</span>
                    <input
                      type="text" value={navn} autoComplete="name" aria-invalid={Boolean(feil.navn)}
                      onFocus={() => feltFokus('navn')}
                      onChange={(e) => { setNavn(e.target.value); setFeil((f) => ({ ...f, navn: undefined })); }}
                    />
                    {feil.navn && <span className="velger-feil">{feil.navn}</span>}
                  </label>
                  <label className="velger-felt">
                    <span>E-post</span>
                    <input
                      type="email" value={epost} autoComplete="email" aria-invalid={Boolean(feil.epost)}
                      onFocus={() => feltFokus('epost')}
                      onChange={(e) => { setEpost(e.target.value); setFeil((f) => ({ ...f, epost: undefined })); }}
                    />
                    {feil.epost && <span className="velger-feil">{feil.epost}</span>}
                  </label>
                  <label className="velger-felt">
                    <span>{harSide ? 'Adressen til siden du har i dag' : 'Bedriften (valgfritt)'}</span>
                    <input
                      type="text" value={firma} autoComplete={harSide ? 'url' : 'organization'}
                      placeholder={harSide ? 'dittfirma.no' : ''}
                      onFocus={() => feltFokus(harSide ? 'nettside' : 'bedrift')}
                      onChange={(e) => setFirma(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="knapp velger-send" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sender …' : <>Få et gratis utkast <PilHoyre className="pil" /></>}
                  </button>
                  {status === 'feilet' && (
                    <p role="alert" className="velger-feil">
                      Noe gikk galt, og forespørselen kom ikke fram. Prøv igjen, eller ring meg på{' '}
                      <a href={`tel:${kontakt.tel}`} onClick={() => track('utkastvelger_ring', { sted: 'feil' })}>{kontakt.telefon}</a>.
                    </p>
                  )}
                  <p className="velger-smaa">
                    E-posten brukes bare til å sende deg utkastet og følge opp det. Vil du heller snakke med meg først? Ring{' '}
                    <a href={`tel:${kontakt.tel}`} onClick={() => track('utkastvelger_ring', { sted: 'skjema' })}>{kontakt.telefon}</a>.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Utkastvelger;
