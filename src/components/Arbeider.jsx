import { Link } from 'react-router-dom';
import { prosjekter, ruter, toganger } from '../lib/site';
import { caser } from '../lib/demo-innhold';
import { useReveal } from '../lib/useReveal';
import { PilHoyre, PilOpp } from './Ikon';

/* Bransje og tittel er hentet ordrett fra ARBEIDER-konstanten i
   studio-mal-demoen (mal3.src.html, linje 1162), ikke fra prosjekter i
   site.js eller caser i demo-innhold.js. Demoen bruker bevisst kortere
   tekst på kortet enn på selve case-siden, de to feltsettene er ikke
   ment å være like. Bilde, rulling og domene kommer derimot fra
   prosjekter i site.js, som er den ene kilden til de faktiske
   skjermbildene og de målte --til-verdiene. */
/* Nøkkel er slug, ikke posisjon.

   Dette var en liste koblet til prosjekter på indeks. Da Melanie Dahl ble
   satt inn på plass tre 21. august, forskjøv alt seg: Samtaleverkstedet
   fikk Steinars tittel, og case-lenkene pekte på feil prosjekt. Feilen ga
   ingen advarsel, siden alle indeksene fortsatt fantes. Med slug som
   nøkkel kan lista sorteres om uten at noe glipper, og et prosjekt uten
   tekst her faller pent ut i stedet for å arve naboens. */
const ARBEIDER_TEKST = {
  'appstart': { bransje: 'Apputvikling', tittel: 'Apper til fast pris, med prisen på forsiden' },
  'jakobsen-takst': { bransje: 'Takstmann', tittel: 'Takst i Harstad, med prisestimat før du ringer' },
  'woxen-hage': { bransje: 'Hagestell', tittel: 'Hagehjelp i Oslo, bestilt på under ett minutt' },
  'katrin-brubakk': { bransje: 'Psykolog', tittel: 'Foredrag og terapi samlet på én rolig side' },
  'melanie-dahl': { bransje: 'Skuespill · mental trening', tittel: 'To yrker, to innganger, én rolig side' },
  'alpha-negotiations': { bransje: 'Forhandling', tittel: 'En forhandlingsekspert, forklart på ett kvarter' },
  'kolflaath': { bransje: 'Investor', tittel: '25 år og fire selskaper, på én side' },
  'samtaleverkstedet': { bransje: 'Terapi', tittel: 'Terapi som tør å være varm i tonen' },
  'steinar-husby': { bransje: 'Foredrag', tittel: 'Én foredragsholder, ett tydelig løfte' },
  'progressive-diplomacy': { bransje: 'Rådgivning', tittel: 'Rådgivning over landegrenser, forklart enkelt' },
  'tore-sunde-rasmussen': { bransje: 'Rådgivning', tittel: 'Fra visittkort til noe som faktisk ringer' },
};

/* Portføljegridet på forsiden og på /arbeid. Egen fil, ikke Portfolio.jsx,
   fordi den filen bygges om et annet sted samtidig. Samme grid-markup som
   studio-mal-demoen (data-arbeider), bare uten den vanilla-JS-genererte
   innmaten: React gjør jobben querySelectorAll-malen gjorde der.

   /arbeid hadde sitt eget rutenett, bygget av caser i stedet for
   prosjekter. Prosjekter uten case-side (Appstart og Kolflaath i dag)
   sto dermed i arrayen og i skjemaet, men aldri på siden
   som heter «Sider jeg har bygget». Nå er det ett rutenett: `antall`
   klipper på forsiden, `nivaa` er overskriftsnivået (h2 på /arbeid, som
   ikke har noen H2 over rutenettet), `reveal` kobler kortene på
   useReveal der siden bruker den. */
const ConditionalLink = ({ harCase, slug, url, children }) =>
  harCase ? (
    <Link to={`/arbeid/${slug}`}>{children}</Link>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="skjult"> (åpnes i ny fane)</span>
    </a>
  );

/* Hvit eller blekk på kundefargen, det som gir høyest kontrast. Domenet i
   stripen er lite, så det må leses uansett hvilken farge kunden har. */
const lys = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const tekstPaa = (hex) => (1.05 / (lys(hex) + 0.05) >= (lys(hex) + 0.05) / 0.0574 ? '#fff' : 'var(--blekk)');

const Arbeider = ({ antall = 4, nivaa = 3, reveal = false, kompakt = false, tett = false }) => {
  const Tittel = `h${nivaa}`;
  const kort = prosjekter
    .filter((p) => p.slug && ARBEIDER_TEKST[p.slug])
    .slice(0, antall)
    .map((p) => ({
      ...ARBEIDER_TEKST[p.slug],
      ...p,
      // Ikke alle prosjekter har en case-side. De uten lenker ut til
      // kundens egen side i stedet, se Kort.
      harCase: caser.some((c) => c.slug === p.slug),
    }));

  return (
    <div className={['arbeider', kompakt && 'kompakt', tett && 'tett'].filter(Boolean).join(' ')} data-antall={kort.length} data-nivaa={nivaa}>
      {kort.map((a, i) => (
        <article className="arbeid" key={a.domene} data-reveal={reveal ? '' : undefined}>
          {/* Har prosjektet en case-side, går kortet dit. Har det ikke
              det, går det ut til kundens egen side. Uten dette ville et
              nytt prosjekt uten case landet på en 404-lignende side. */}
          <ConditionalLink harCase={a.harCase} slug={a.slug} url={a.url}>
            <div className="ramme">
              <div
                className={a.farge ? 'ramme-topp merket' : 'ramme-topp'}
                style={a.farge ? { '--merke': a.farge, '--merke-tekst': tekstPaa(a.farge) } : undefined}
              >
                <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                <p>{a.domene}</p>
              </div>
              <div className="ramme-vindu">
                <img
                  src={a.full}
                  srcSet={toganger(a.full)}
                  alt={`Nettsiden til ${a.navn}`}
                  loading="lazy"
                  width="620"
                  height="2422"
                  style={{ '--til': a.til, animationDelay: `${0.6 + i * 0.7}s`, animationDuration: `${30 + i * 2}s` }}
                />
              </div>
            </div>
            <p className="etikett">{a.bransje}</p>
            <Tittel>{a.tittel} <PilHoyre className="ut" /></Tittel>
          </ConditionalLink>
        </article>
      ))}
    </div>
  );
};

/* Hele blokken slik den står på forsiden: etikett, overskrift, fire kort
   og en utgang til /arbeid. Flyttet hit fra App.jsx 30. september 2026,
   da /priser og /om fikk den samme blokken. Ingen av de to sidene viste
   et eneste eksempel.

   `hvit` styrer flaten, så blokken kan veksle mot seksjonen over.
   `kompakt` viser to kort i stedet for fire på smal skjerm, se
   .arbeider.kompakt i index.css: på de to sidene er kortene et bevis ved
   siden av hovedsaken, og fire stablede rammer skyver resten av siden
   langt ned på mobil.

   `tett` (forsiden) gir åtte mindre kort, fire i bredden på desktop og to
   på mobil. Fire store rammer tok 1,9 skjermhøyder på 1440 og 2,3 på 390,
   og fire store kort leses som «fire prosjekter». Mange små leses som en
   portefølje. */
export const ArbeidSeksjon = ({ hvit = true, kompakt = false, tett = false, id }) => {
  const container = useReveal(100);
  return (
    <section ref={container} id={id} className={hvit ? 'hvit' : undefined}>
      <div className="wrap seksjon">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">Noe av det jeg har laget</p>
          <h2>Sider som er i drift nå</h2>
          <p>Rammene ruller gjennom de ekte sidene, slik de står i dag.</p>
        </div>
        <Arbeider antall={tett ? 8 : 4} kompakt={kompakt} tett={tett} />
        <p style={{ marginTop: 'clamp(2.5rem,5vw,3.5rem)' }}>
          <Link className="knapp" to={ruter.arbeid}>Se flere sider <PilOpp className="pil" /></Link>
        </p>
      </div>
    </section>
  );
};

export default Arbeider;
