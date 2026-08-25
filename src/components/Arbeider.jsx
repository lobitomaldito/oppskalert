import { Link } from 'react-router-dom';
import { prosjekter, toganger } from '../lib/site';
import { caser } from '../lib/demo-innhold';

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
  'woxen-hage': { bransje: 'Hagestell', tittel: 'Hagehjelp i Oslo, bestilt på under ett minutt' },
  'katrin-brubakk': { bransje: 'Psykolog', tittel: 'Foredrag og terapi samlet på én rolig side' },
  'melanie-dahl': { bransje: 'Skuespill · mental trening', tittel: 'To yrker, to innganger, én rolig side' },
  'alpha-negotiations': { bransje: 'Forhandling', tittel: 'En forhandlingsekspert, forklart på ett kvarter' },
  'samtaleverkstedet': { bransje: 'Terapi', tittel: 'Terapi som tør å være varm i tonen' },
  'steinar-husby': { bransje: 'Foredrag', tittel: 'Én foredragsholder, ett tydelig løfte' },
  'progressive-diplomacy': { bransje: 'Rådgivning', tittel: 'Rådgivning over landegrenser, forklart enkelt' },
  'tore-sunde-rasmussen': { bransje: 'Rådgivning', tittel: 'Fra visittkort til noe som faktisk ringer' },
};

/* Portføljegridet på forsiden. Egen fil, ikke Portfolio.jsx, fordi den
   filen bygges om et annet sted samtidig. Samme grid-markup som
   studio-mal-demoen (data-arbeider), bare uten den vanilla-JS-genererte
   innmaten: React gjør jobben querySelectorAll-malen gjorde der. */
const ConditionalLink = ({ harCase, slug, url, children }) =>
  harCase ? (
    <Link to={`/arbeid/${slug}`}>{children}</Link>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="skjult"> (åpnes i ny fane)</span>
    </a>
  );

const Arbeider = ({ antall = 4 }) => {
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
    <div className="arbeider" data-antall={antall} data-nivaa="3">
      {kort.map((a, i) => (
        <article className="arbeid" key={a.domene}>
          {/* Har prosjektet en case-side, går kortet dit. Har det ikke
              det, går det ut til kundens egen side. Uten dette ville et
              nytt prosjekt uten case landet på en 404-lignende side. */}
          <ConditionalLink harCase={a.harCase} slug={a.slug} url={a.url}>
            <div className="ramme">
              <div className="ramme-topp">
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
            <h3>{a.tittel} <span className="ut" aria-hidden="true">→</span></h3>
          </ConditionalLink>
        </article>
      ))}
    </div>
  );
};

export default Arbeider;
