import { useEffect, useRef, useState } from 'react';
import { Sok } from './Ikon';

/* Bildene i de to tjenestekortene på forsiden (26.11.2026, Aleksander:
   «la det bytte mellom sider jeg har laget», «la søket skrives ut»).

   Begge står stille til kortet er på skjermen, og stopper når det går ut
   igjen. Ved redusert bevegelse byttes innholdet bare med en toning: ingen
   rulling i sidene og ingen skriving i søkefeltet. Uten JavaScript (og i
   den forhåndsrendrede HTML-en) står første side og første søk ferdig. */

function useSynlig(ref) {
  const [synlig, setSynlig] = useState(false);
  const [rolig] = useState(() => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSynlig(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return { synlig, rolig };
}

/* De nyeste sidene i /arbeid, nyest først. GTI er utelatt: den ligger
   fortsatt på en vercel.app-adresse. Bildene er toppen av helsidebildene
   i /websider/full, beskåret til 1280 x 1800. */
const SIDER = [
  { slug: 'terapihusene', domene: 'terapihusene.no' },
  { slug: 'jakobsen-takst', domene: 'jtob.no' },
  { slug: 'prana-yoga', domene: 'pranayogakristiansand.no' },
  { slug: 'katrin-brubakk', domene: 'katrinbrubakk.no' },
];
const SIDE_TID = 6000;

export function SideVeksler() {
  const ref = useRef(null);
  const { synlig, rolig } = useSynlig(ref);
  const [i, setI] = useState(0);
  // Neste side lastes mens den forrige vises, resten først når de trengs.
  const [hoyeste, setHoyeste] = useState(0);

  useEffect(() => {
    if (!synlig) return;
    const t = setTimeout(() => {
      const neste = (i + 1) % SIDER.length;
      setI(neste);
      setHoyeste((h) => Math.max(h, neste));
    }, SIDE_TID);
    return () => clearTimeout(t);
  }, [synlig, i]);

  return (
    <div ref={ref} className={'tjeneste-bilde side-veksler' + (synlig && !rolig ? ' ruller' : '')} aria-hidden="true">
      <div className="nettleser">
        <div className="nettleser-topp">
          <i /><i /><i />
          <span className="nettleser-adresser">
            {SIDER.map((s, n) => <span key={s.slug} className={n === i ? 'aktiv' : ''}>{s.domene}</span>)}
          </span>
        </div>
        <div className="nettleser-flate">
          {SIDER.map((s, n) => (
            <div key={s.slug} className={'side' + (n === i ? ' aktiv' : '')}>
              {n <= hoyeste + (synlig ? 1 : 0) && (
                <img
                  src={`/websider/kort/${s.slug}.webp`}
                  srcSet={`/websider/kort/${s.slug}.webp 640w, /websider/kort/${s.slug}@2x.webp 1280w`}
                  sizes="(min-width: 64rem) 30rem, (min-width: 40rem) 40vw, 8rem"
                  width="640" height="900" alt="" loading="lazy" decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Første søk er ekte: Prana Yoga ligger øverst på google.no for «hot yoga
   kristiansand» (sett 26.11.2026, snitt plass 1,5 i Search Console). Faller
   de ned, skal raden byttes. Resten er oppdiktede eksempler etter ønske fra
   Aleksander 26.11.2026, merket «Eksempel» og med «Ditt firma» som bedrift,
   så ingen ekte bedrift får et treff den ikke har. */
const SOK = [
  {
    q: 'hot yoga kristiansand', merke: 'P', navn: 'Prana Yoga Studio', adresse: 'pranayogakristiansand.no',
    tittel: 'Prana Yoga Studio | Iyengar yoga og pilates i Kristiansand',
    tekst: 'Vi har varm og hot yoga, og vi holder til midt i Kristiansand sentrum.',
    ekte: true,
  },
  { q: 'snekker oslo', tittel: 'Ditt Firma | Snekker i Oslo', tekst: 'Kjøkken, bad og tilbygg i Oslo. Fast pris og befaring samme uke.' },
  { q: 'terapeut oslo', tittel: 'Ditt Firma | Terapeut i Oslo', tekst: 'Samtaleterapi for par og enkeltpersoner. Ledige timer denne uken.' },
  { q: 'rørlegger bergen', tittel: 'Ditt Firma | Rørlegger i Bergen', tekst: 'Bad, lekkasjer og nye rør i Bergen og omegn.' },
  { q: 'regnskapsfører stavanger', tittel: 'Ditt Firma | Regnskapsfører i Stavanger', tekst: 'Regnskap, lønn og årsoppgjør for små bedrifter i Stavanger.' },
];
const TASTETID = 70;   // ms per bokstav
const VIS_TID = 3200;  // treffet står så lenge før neste søk
const UT_TID = 350;    // treffet toner ut før feltet tømmes

export function SokDemo() {
  const ref = useRef(null);
  const { synlig, rolig } = useSynlig(ref);
  const [i, setI] = useState(0);
  const [n, setN] = useState(SOK[0].q.length);
  const [fase, setFase] = useState('viser'); // skriver | viser | ut

  useEffect(() => {
    if (!synlig) return;
    const q = SOK[i].q;
    let t;
    if (fase === 'skriver') {
      t = n < q.length ? setTimeout(() => setN(n + 1), TASTETID) : setTimeout(() => setFase('viser'), 300);
    } else if (fase === 'viser') {
      t = setTimeout(() => setFase('ut'), VIS_TID);
    } else {
      t = setTimeout(() => {
        const neste = (i + 1) % SOK.length;
        setI(neste);
        setN(rolig ? SOK[neste].q.length : 0);
        setFase(rolig ? 'viser' : 'skriver');
      }, UT_TID);
    }
    return () => clearTimeout(t);
  }, [synlig, rolig, i, n, fase]);

  const s = SOK[i];
  return (
    <div ref={ref} className="tjeneste-bilde sok-demo" aria-hidden="true">
      <div className="serp">
        <div className={'sok-felt' + (fase === 'skriver' ? ' skriver' : '')}>
          <Sok />
          <span className="sok-ord">{s.q.slice(0, n)}</span>
          <span className="markor" />
        </div>
        <div className="serp-faner"><b>Alle</b><span>Bilder</span><span>Kart</span><span>Nyheter</span></div>
        <div className={'serp-treff' + (fase === 'viser' ? ' vis' : '')}>
          <div className="sok-treff">
            <div className="sok-kilde">
              <i>{s.merke || 'D'}</i>
              <span><b>{s.navn || 'Ditt firma'}</b><span>https://{s.adresse || 'dittfirma.no'}</span></span>
            </div>
            <p className="sok-tittel">{s.tittel}</p>
            <p className="sok-tekst">{s.tekst}</p>
          </div>
          <div className="serp-skjelett"><i /><i /><i /></div>
        </div>
      </div>
      <p className={'sok-plass' + (s.ekte ? ' ekte' : '')}>{s.ekte ? 'Øverst på google.no, 26.11.2026' : 'Eksempel'}</p>
    </div>
  );
}
