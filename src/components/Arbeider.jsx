import { Link } from 'react-router-dom';
import { prosjekter } from '../lib/site';
import { caser } from '../lib/demo-innhold';

/* Bransje og tittel er hentet ordrett fra ARBEIDER-konstanten i
   studio-mal-demoen (mal3.src.html, linje 1162), ikke fra prosjekter i
   site.js eller caser i demo-innhold.js. Demoen bruker bevisst kortere
   tekst på kortet enn på selve case-siden, de to feltsettene er ikke
   ment å være like. Bilde, rulling og domene kommer derimot fra
   prosjekter i site.js, som er den ene kilden til de faktiske
   skjermbildene og de målte --til-verdiene. */
const ARBEIDER_TEKST = [
  { bransje: 'Hagestell', tittel: 'Hagehjelp i Oslo, bestilt på under ett minutt' },
  { bransje: 'Psykolog', tittel: 'Foredrag og terapi samlet på én rolig side' },
  { bransje: 'Terapi', tittel: 'Terapi som tør å være varm i tonen' },
  { bransje: 'Foredrag', tittel: 'Én foredragsholder, ett tydelig løfte' },
  { bransje: 'Rådgivning', tittel: 'Rådgivning over landegrenser, forklart enkelt' },
  { bransje: 'Rådgivning', tittel: 'Fra visittkort til noe som faktisk ringer' },
];

/* Portføljegridet på forsiden. Egen fil, ikke Portfolio.jsx, fordi den
   filen bygges om et annet sted samtidig. Samme grid-markup som
   studio-mal-demoen (data-arbeider), bare uten den vanilla-JS-genererte
   innmaten: React gjør jobben querySelectorAll-malen gjorde der. */
const Arbeider = ({ antall = 4 }) => {
  const kort = ARBEIDER_TEKST.slice(0, antall).map((tekst, i) => {
    const p = prosjekter[i];
    const c = caser.find((rad) => rad.i === i);
    return { ...tekst, ...p, slug: c ? c.slug : '' };
  });

  return (
    <div className="arbeider" data-antall={antall} data-nivaa="3">
      {kort.map((a, i) => (
        <article className="arbeid" key={a.domene}>
          <Link to={`/arbeid/${a.slug}`}>
            <div className="ramme">
              <div className="ramme-topp">
                <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                <p>{a.domene}</p>
              </div>
              <div className="ramme-vindu">
                <img
                  src={a.full}
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
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Arbeider;
