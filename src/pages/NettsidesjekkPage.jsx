import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SeksjonTopp } from '../components/Layout';
import FAQ from '../components/FAQ';
import { PilHoyre } from '../components/Ikon';
import { submitDemoRequest } from '../lib/demoRequest';
import { identify, track } from '../lib/analytics';
import { kontakt, lagFaqSchema, ruter } from '../lib/site';
import { useReveal } from '../lib/useReveal';

/* Gratis nettsidesjekk (12.11.2026). Lavere terskel enn gratis utkast, for
   dem som har en side og ikke er klare for et nytt utkast. Grepet er lånt fra
   konkurrentenes gratis SEO-rapport: karakteren vises uten e-post, hele
   rapporten krever navn og e-post og går inn som lead på samme vei som
   skjemaet (api/demo-request.js), med funnene i meldingen.

   Målingene gjøres i api/nettsidesjekk.js. De sju punktene og tekstene under
   er valgt av Aleksander. Hvert punkt har en linje uten fagord om hvorfor det
   betyr noe (tilbud/MAL.md punkt 3a), og rapporten sier antall, område og
   konsekvens, aldri hvor feilen sitter eller hvordan den rettes. Kunden har
   nesten alltid en leverandør fra før, og en presis feilliste blir deres
   gratis oppdrag.

   Sporing: hvert klikk går gjennom track(), hendelsene heter
   nettsidesjekk_*. Innsendingen heter demo_request_submitted med
   type: 'nettsidesjekk', fordi GA4 og Google Ads teller konverteringen på
   det navnet. */

/* Rekkefølgen er vekten i karakteren, tyngst først. Rapporten sorterer på
   status og beholder denne rekkefølgen innenfor hver status. */
const PUNKTER = [
  {
    id: 'trygg',
    tittel: 'Nettleseren kaller siden trygg',
    hvorfor: 'Står det «ikke sikker» ved adressen, snur mange før de har lest noe.',
    funn: () => ({ ok: 'Siden har trygg tilkobling.', feil: 'Nettleseren merker siden som «ikke sikker».' }),
  },
  {
    id: 'mobil',
    tittel: 'Siden passer på mobilskjermen',
    hvorfor: 'De fleste leter etter deg på telefonen. Må de zoome, går de videre.',
    funn: () => ({
      ok: 'Siden tilpasser seg mobilskjermen.',
      delvis: 'Siden er bare delvis tilpasset mobil.',
      feil: 'Siden er laget for PC-skjerm. På mobil blir alt smått.',
    }),
  },
  {
    id: 'lesbar',
    tittel: 'Google og ChatGPT kan lese hva du tilbyr',
    hvorfor: 'Finner robotene ingen tekst, kan de verken vise deg i søk eller anbefale deg.',
    funn: (ord) => ({
      ok: `Google og ChatGPT finner ${ord} ord på forsiden.`,
      delvis: `Google og ChatGPT finner bare ${ord} ord på forsiden.`,
      feil: 'Google og ChatGPT finner nesten ingen tekst på forsiden.',
    }),
  },
  {
    id: 'fart',
    tittel: 'Siden svarer raskt',
    hvorfor: 'Venter folk på en hvit skjerm, trykker de tilbake og velger neste treff.',
    funn: (sek) => {
      const t = `Siden brukte ${String(sek).replace('.', ',')} sekunder på å svare.`;
      return { ok: t, delvis: t, feil: t };
    },
  },
  {
    id: 'sok',
    tittel: 'Du bestemmer hva Google viser om deg',
    hvorfor: 'Teksten i søkeresultatet er det første kunden leser om deg.',
    funn: () => ({
      ok: 'Begge delene av søketreffet er fylt ut.',
      delvis: '1 av 2 deler av søketreffet er ikke fylt ut.',
      feil: 'Ingen av de 2 delene i søketreffet er fylt ut.',
    }),
  },
  {
    id: 'kontakt',
    tittel: 'Kundene kan ringe eller skrive med ett trykk',
    hvorfor: 'Må de lete etter nummeret, ringer de nummer to på lista.',
    funn: (verdi) => ({
      ok: 'Telefonnummeret kan ringes med ett trykk.',
      delvis: {
        nummer: 'Nummeret står der, men kan ikke ringes med ett trykk.',
        skriv: 'Kundene kan skrive, men ikke ringe med ett trykk.',
        side: 'Kundene må gå til en egen side for å finne nummeret.',
      }[verdi],
      feil: 'Jeg fant ingen måte å ta kontakt på fra forsiden.',
    }),
  },
  {
    id: 'oppdatert',
    tittel: 'Siden ser oppdatert ut',
    hvorfor: 'Et gammelt årstall eller en halvferdig seksjon får folk til å lure på om du fortsatt driver.',
    funn: (verdi) => {
      const t = verdi?.rest
        ? 'Forsiden har tekst som ser halvferdig ut.'
        : `Et årstall på forsiden er ${verdi?.bak === 1 ? 'ett' : verdi?.bak} år gammelt.`;
      return { ok: 'Ingenting på forsiden ser gammelt eller halvferdig ut.', delvis: t, feil: t };
    },
  },
];

const STATUS = { ok: 'Bra', delvis: 'Bør forbedres', feil: 'Mangler' };
const ALVOR = { feil: 0, delvis: 1, ok: 2 };

const KARAKTERTEKST = {
  A: 'Siden står godt på alt jeg måler her.',
  B: 'Siden står godt, og noen få ting kan bli bedre.',
  C: 'Siden virker, men flere ting gjør det tyngre for kundene å ta kontakt.',
  D: 'Flere ting på siden kan få folk til å gå videre før de tar kontakt.',
  E: 'Siden har feil som får mange til å gå videre før de har lest noe.',
  F: 'Siden har feil som får mange til å gå videre før de har lest noe.',
};

const SPORSMAL = [
  {
    q: 'Koster sjekken noe?',
    a: 'Nei. Karakteren ser du uten å oppgi noe. Vil du se hele rapporten, ber jeg om navn og e-post, så jeg kan følge opp hvis du har spørsmål.',
  },
  {
    q: 'Hva gjør du med e-posten min?',
    a: 'Jeg bruker den til å svare deg om rapporten. Jeg selger den ikke og deler den ikke med andre, og du kan be meg slette den når som helst. Personvernsiden har detaljene.',
  },
  {
    q: 'Hvorfor fikk jeg ikke en karakter?',
    a: 'Noen sider stenger ute alt som ikke er en vanlig nettleser, eller svarer for sakte. Da får jeg ikke målt dem herfra. Skriv navn og e-post, så ser jeg på siden selv og sender deg svaret.',
  },
  {
    q: 'Hvor nøyaktig er målingen?',
    a: 'Den viser hva en robot ser når den henter forsiden din én gang, fra en server i Stockholm. Farten varierer fra gang til gang, så en treg måling kan være et uheldig øyeblikk. De andre punktene blir de samme hver gang du sjekker.',
  },
];

const gyldigEpost = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
// Grov sjekk i nettleseren. Serveren avgjør (rensDomene i api/_lib).
const rensAdresse = (s) => s.trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0];
const serUtSomDomene = (d) => /^[^\s.]+(\.[^\s.]+)*\.[a-zæøå]{2,}$/i.test(d);

const sortert = (punkter) =>
  [...punkter].sort((a, b) => ALVOR[a.status] - ALVOR[b.status] || PUNKTER.findIndex((p) => p.id === a.id) - PUNKTER.findIndex((p) => p.id === b.id));

const funnTekst = (p) => PUNKTER.find((x) => x.id === p.id).funn(p.verdi)[p.status];

const Sjekk = () => {
  const [adresse, setAdresse] = useState('');
  const [fase, setFase] = useState('start'); // start | sjekker | resultat | ikke_hentet | stengt | for_mange | nettverk
  const [adresseFeil, setAdresseFeil] = useState('');
  const [resultat, setResultat] = useState(null);
  const [domene, setDomene] = useState('');
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [feil, setFeil] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sendt | feilet
  const [honeypot, setHoneypot] = useState('');
  const apnetRef = useRef(0);
  const fokusert = useRef(new Set());
  const svarRef = useRef(null);
  const adresseRef = useRef(null);
  const tilbakeTilFelt = useRef(false);
  // Konverteringen telles én gang per besøk. Sjekker de flere sider, sendes
  // hver rapport som lead, men Google Ads skal ikke se fem konverteringer.
  const konvertert = useRef(false);
  useEffect(() => { apnetRef.current = Date.now(); }, []);

  // Når karakteren, feilmeldingen eller rapporten kommer, flyttes fokus dit,
  // så skjermlesere leser den opp og mobilen ikke står igjen på knappen.
  // «Sjekk en annen side» setter markøren tilbake i adressefeltet.
  const sendt = status === 'sendt';
  useEffect(() => {
    if (fase !== 'start' && fase !== 'sjekker') svarRef.current?.focus();
    else if (fase === 'start' && tilbakeTilFelt.current) {
      tilbakeTilFelt.current = false;
      adresseRef.current?.select();
    }
  }, [fase, sendt]);

  const sjekk = async (e) => {
    e.preventDefault();
    if (fase === 'sjekker') return;
    const d = rensAdresse(adresse);
    if (!d) { setAdresseFeil('Skriv adressen til nettsiden din, for eksempel dittfirma.no.'); track('nettsidesjekk_ugyldig', { grunn: 'tom' }); return; }
    if (!serUtSomDomene(d)) { setAdresseFeil('Det ser ikke ut som en nettadresse. Prøv for eksempel dittfirma.no.'); track('nettsidesjekk_ugyldig', { grunn: 'format', tekst: d.slice(0, 80) }); return; }

    setAdresseFeil('');
    setDomene(d);
    setFase('sjekker');
    track('nettsidesjekk_startet', { domene: d });
    try {
      const res = await fetch('/api/nettsidesjekk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domene: d }),
      });
      const svar = await res.json().catch(() => ({}));
      if (res.ok) {
        setResultat(svar);
        setFase('resultat');
        track('nettsidesjekk_resultat', { domene: svar.domene, karakter: svar.karakter, antall_funn: svar.antallFunn });
      } else if (res.status === 400) {
        setFase('start');
        setAdresseFeil('Jeg fant ikke den adressen. Sjekk at den er skrevet riktig, for eksempel dittfirma.no.');
        track('nettsidesjekk_ugyldig', { grunn: 'server', tekst: d.slice(0, 80) });
      } else {
        const grunn = res.status === 429 ? 'for_mange' : res.status === 503 ? 'stengt' : 'ikke_hentet';
        setFase(grunn);
        track('nettsidesjekk_feil', { domene: d, grunn });
      }
    } catch {
      setFase('nettverk');
      track('nettsidesjekk_feil', { domene: d, grunn: 'nettverk' });
    }
  };

  const nyttForsok = () => {
    track('nettsidesjekk_ny', { fra: fase });
    tilbakeTilFelt.current = true;
    setFase('start');
    setResultat(null);
    setStatus('idle');
  };

  const feltFokus = (felt) => {
    if (fokusert.current.size === 0) track('demo_form_paabegynt', { kilde: 'nettsidesjekk', har_nettside: true });
    if (fokusert.current.has(felt)) return;
    fokusert.current.add(felt);
    track('nettsidesjekk_felt', { felt });
  };

  const send = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const nyeFeil = {};
    if (!navn.trim()) nyeFeil.navn = 'Skriv navnet ditt.';
    if (!gyldigEpost(epost)) nyeFeil.epost = 'Skriv en e-postadresse jeg kan svare på.';
    setFeil(nyeFeil);
    const karakter = resultat?.karakter || null;
    track('nettsidesjekk_send_klikket', { gyldig: Object.keys(nyeFeil).length === 0, karakter });
    if (Object.keys(nyeFeil).length) return;

    setStatus('sending');
    const melding = resultat
      ? [
          `Gratis nettsidesjekk: ${resultat.domene} fikk ${karakter} (${resultat.antallFunn} av ${PUNKTER.length} punkter trekker ned).`,
          `Sjekket: ${resultat.url}`,
          ...sortert(resultat.punkter).map((p) => `${PUNKTER.find((x) => x.id === p.id).tittel}: ${STATUS[p.status]}. ${funnTekst(p)}`),
        ].join('\n')
      : fase === 'stengt'
        ? `Gratis nettsidesjekk: sjekken var stengt (døgntaket eller telleren), så ${domene} ble ikke sjekket. Vil at du ser på siden selv.`
        : `Gratis nettsidesjekk: fikk ikke hentet ${domene}. Vil at du ser på siden selv.`;
    try {
      await submitDemoRequest({ navn, epost, firma: domene, melding, honeypot, msPaSkjema: Date.now() - apnetRef.current });
      // Samme sperre som de andre skjemaene: lokkefeltet skal aldri telles som konvertering.
      if (!honeypot && !konvertert.current) {
        konvertert.current = true;
        identify({ email: epost.trim(), name: navn.trim() });
        track('demo_request_submitted', { type: 'nettsidesjekk', karakter, har_nettside: true, has_company: true });
      }
      setStatus('sendt');
      if (resultat) track('nettsidesjekk_rapport_vist', { karakter });
    } catch (err) {
      console.error('Nettsidesjekk-skjemaet feilet:', err);
      track('nettsidesjekk_sending_feilet', { karakter });
      setStatus('feilet');
    }
  };

  const ring = (sted) => (
    <a href={`tel:${kontakt.tel}`} onClick={() => track('nettsidesjekk_ring', { sted })}>{kontakt.telefon}</a>
  );

  const skjema = (tittel, tekst, knapp) => (
    <form className="velger-skjema" onSubmit={send} noValidate>
      <p className="velger-skjema-tittel">{tittel}</p>
      <p className="velger-smaa sjekk-skjema-tekst">{tekst}</p>
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
      <button type="submit" className="knapp velger-send" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sender …' : <>{knapp} <PilHoyre className="pil" /></>}
      </button>
      {status === 'feilet' && (
        <p role="alert" className="velger-feil">
          Noe gikk galt, og skjemaet kom ikke fram. Prøv igjen, eller ring meg på {ring('feil')}.
        </p>
      )}
      <p className="velger-smaa">
        Jeg bruker e-posten bare til å svare deg om siden din. Vil du heller snakke med meg? Ring {ring('skjema')}.
      </p>
    </form>
  );

  return (
    <section className="seksjon pt-0" aria-label="Sjekk nettsiden din">
      <div className="wrap">
        <div className="velger sjekk">
          {(fase === 'start' || fase === 'sjekker') && (
            <form className="sjekk-felt" onSubmit={sjekk} noValidate>
              <label htmlFor="sjekk-adresse" className="sjekk-etikett">Adressen til nettsiden din</label>
              <div className="sjekk-rad">
                <input
                  ref={adresseRef} id="sjekk-adresse" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck="false"
                  placeholder="dittfirma.no" value={adresse} aria-invalid={Boolean(adresseFeil)}
                  aria-describedby={adresseFeil ? 'sjekk-adressefeil' : undefined}
                  onChange={(e) => { setAdresse(e.target.value); setAdresseFeil(''); }}
                />
                <button type="submit" className="knapp" disabled={fase === 'sjekker'}>
                  {fase === 'sjekker' ? 'Sjekker …' : <>Sjekk siden <PilHoyre className="pil" /></>}
                </button>
              </div>
              {adresseFeil && <p id="sjekk-adressefeil" role="alert" className="velger-feil">{adresseFeil}</p>}
              <p className="velger-smaa" role="status">
                {fase === 'sjekker'
                  ? `Henter ${domene} og måler sju ting. Det tar vanligvis under ti sekunder.`
                  : 'Karakteren vises her med en gang. Du trenger ikke oppgi e-post for å se den.'}
              </p>
            </form>
          )}

          {fase === 'resultat' && resultat && (
            <div className="velger-res">
              <div>
                <p className="etikett">Karakter for {resultat.domene}</p>
                <div className="sjekk-karakter" ref={svarRef} tabIndex={-1}>
                  <span className={`sjekk-bokstav sjekk-bokstav-${resultat.karakter}`}>{resultat.karakter}</span>
                  <p>
                    <strong>
                      {resultat.antallFunn === 0
                        ? `Ingen av de ${PUNKTER.length} punktene trekker ned.`
                        : `${resultat.antallFunn} av ${PUNKTER.length} punkter trekker ned.`}
                    </strong>{' '}
                    {KARAKTERTEKST[resultat.karakter]}
                  </p>
                </div>

                {status === 'sendt' && (
                  <div className="sjekk-rapport">
                    <ol className="sjekk-liste">
                      {sortert(resultat.punkter).map((p, i) => {
                        const meta = PUNKTER.find((x) => x.id === p.id);
                        return (
                          <li key={p.id} className={`sjekk-${p.status}`}>
                            <p className="sjekk-status">
                              {STATUS[p.status]}
                              {i === 0 && p.status !== 'ok' && <span className="sjekk-forst">Start her</span>}
                            </p>
                            <h3>{meta.tittel}</h3>
                            <p>{funnTekst(p)}</p>
                            {p.status !== 'ok' && <p className="sjekk-hvorfor">{meta.hvorfor}</p>}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}

                <p className="velger-res-lenker">
                  <button type="button" className="velger-tilbake" onClick={nyttForsok}>Sjekk en annen side</button>
                </p>
              </div>

              {status === 'sendt' ? (
                <div className="velger-kvittering" role="status">
                  <p className="velger-skjema-tittel">Hva du bør gjøre</p>
                  {resultat.antallFunn === 0 ? (
                    <p>
                      Siden står godt på det jeg måler automatisk. Det jeg ikke kan måle herfra, er om teksten svarer på
                      det kundene dine søker etter. Jeg ser på siden og sender deg en kort vurdering på e-post innen to
                      virkedager.
                    </p>
                  ) : (
                    <ol className="sjekk-steg">
                      <li>Start med punktet øverst i listen. Det er det som stopper flest besøkende.</li>
                      <li>Ta resten i samme runde, så slipper du flere små oppdrag etter hverandre.</li>
                      <li>Jeg ser over funnene og sender deg en kort vurdering på e-post innen to virkedager, med hva jeg ville gjort først.</li>
                    </ol>
                  )}
                  <p>
                    Vil du se hva en ny side kan bli?{' '}
                    <Link to={`${ruter.hjem}#bestill-demo`} onClick={() => track('nettsidesjekk_utkast_klikket', { karakter: resultat.karakter })}>
                      Få et gratis utkast av forsiden
                    </Link>
                    . Haster det, ring meg på {ring('rapport')}.
                  </p>
                </div>
              ) : (
                skjema(
                  'Se hele rapporten',
                  'Hvert punkt, hva det betyr for kundene dine og hva du bør gjøre først. Rapporten vises her med en gang.',
                  'Vis rapporten',
                )
              )}
            </div>
          )}

          {(fase === 'ikke_hentet' || fase === 'stengt') && (
            <div className="velger-res">
              <div>
                <p className="etikett">{domene}</p>
                <h2 className="velger-res-tittel" ref={svarRef} tabIndex={-1}>
                  {fase === 'stengt' ? 'Den automatiske sjekken tar pause.' : 'Jeg fikk ikke hentet siden.'}
                </h2>
                <p className="velger-res-tekst">
                  {fase === 'stengt'
                    ? 'Den er stengt akkurat nå. Skriv navn og e-post, så ser jeg på siden selv og sender deg svaret.'
                    : 'Noen sider stenger ute alt som ikke er en vanlig nettleser, eller svarer for sakte. Sjekk at adressen er riktig, eller la meg se på siden selv.'}
                </p>
                <p className="velger-res-lenker">
                  <button type="button" className="velger-tilbake" onClick={nyttForsok}>Prøv en annen adresse</button>
                </p>
              </div>
              {status === 'sendt' ? (
                <div className="velger-kvittering" role="status">
                  <p className="velger-skjema-tittel">Takk{navn.trim() ? `, ${navn.trim().split(/\s+/)[0]}` : ''}.</p>
                  <p>Jeg ser på siden selv og sender deg svaret på e-post innen to virkedager. Haster det, ring meg på {ring('kvittering')}.</p>
                </div>
              ) : (
                skjema('Jeg ser på den selv', 'Skriv navn og e-post, så sjekker jeg siden for hånd og sender deg svaret.', 'Send')
              )}
            </div>
          )}

          {(fase === 'for_mange' || fase === 'nettverk') && (
            <div>
              <h2 className="velger-res-tittel" ref={svarRef} tabIndex={-1}>
                {fase === 'for_mange' ? 'Du har sjekket mange sider på kort tid.' : 'Sjekken kom ikke fram.'}
              </h2>
              <p className="velger-res-tekst">
                {fase === 'for_mange'
                  ? 'Prøv igjen om en time, eller ring meg, så ser vi på siden sammen: '
                  : 'Sjekk at du er på nett og prøv igjen, eller ring meg: '}
                {ring(fase)}.
              </p>
              <p className="velger-res-lenker">
                <button type="button" className="velger-tilbake" onClick={nyttForsok}>Prøv igjen</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const NettsidesjekkPage = () => {
  const toppRef = useReveal(80);
  const punktRef = useReveal(60);

  return (
    <Shell>
      <SEO
        title="Gratis nettsidesjekk"
        description="Få en karakter fra A til F på nettsiden din på noen sekunder. Jeg måler sju ting som avgjør om besøkende tar kontakt. Gratis, uten e-post."
        keywords={['gratis nettsidesjekk', 'sjekk nettside', 'test nettside', 'nettside analyse gratis']}
        canonical="https://oppskalert.no/gratis-nettsidesjekk"
        jsonLd={lagFaqSchema(SPORSMAL)}
      />

      <section ref={toppRef} className="wrap sidetopp">
        <p data-reveal className="etikett inn">Gratis verktøy</p>
        <h1 data-reveal className="inn" style={{ '--d': '60ms' }}>Gratis nettsidesjekk.</h1>
        <p data-reveal className="inn" style={{ '--d': '140ms' }}>
          Skriv inn adressen til nettsiden din, så får du en karakter fra A til F på noen sekunder. Jeg måler sju
          ting som avgjør om de som finner deg, faktisk tar kontakt.
        </p>
      </section>

      <Sjekk />

      <section ref={punktRef} className="seksjon">
        <div className="wrap">
          <SeksjonTopp
            tittel="Sju ting"
            uthevet="som avgjør om de tar kontakt."
            lede="Alt måles på forsiden din, slik Google og ChatGPT henter den. De to første teller mest i karakteren, fordi de stopper folk før de har lest noe."
          />
          <ol data-reveal className="sjekk-punkter">
            {PUNKTER.map((p, i) => (
              <li key={p.id}>
                <span className="sjekk-nr" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{p.tittel}</h3>
                  <p>{p.hvorfor}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ tittel="Det folk lurer på" uthevet="om sjekken." sporsmal={SPORSMAL} />
    </Shell>
  );
};

export default NettsidesjekkPage;
