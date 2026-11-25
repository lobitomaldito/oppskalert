import { Link } from 'react-router-dom';
import { omtaler } from '../lib/demo-innhold';
import { useReveal } from '../lib/useReveal';
import { PilHoyre } from './Ikon';

/* Ett kundesitat i full bredde, rett under prisene på forsiden
   (Aleksander 25.11.2026, etter det brede sitatet på vivr.no). Der leseren
   veier prisen, står en kunde og sier hva hen fikk for den.

   Ordene fylles inn ett for ett mens sitatet rulles opp gjennom skjermen.
   Det er ren CSS (animation-timeline: view()), styrt av rulleposisjonen,
   så det følger leseren og ingen tidsur. Uten støtte i nettleseren, med
   redusert bevegelse eller uten JavaScript står hele sitatet i full farge.

   Thoralf fordi sitatet er kort nok til fire linjer i stor skrift og har en
   case å lenke til. Teksten hentes fra omtaler i demo-innhold.js, så den
   aldri kommer ut av synk med resten av siden. */
const NAVN = 'Thoralf Stenvold';

const BredtSitat = () => {
  const container = useReveal(100);
  const sitat = omtaler.find((o) => o.navn === NAVN);
  if (!sitat) return null;

  const ord = sitat.sitat.split(' ');
  const initialer = sitat.navn.split(/[\s-]/).map((d) => d[0]).slice(0, 2).join('');

  return (
    <section ref={container} className="bredt-sitat">
      <figure className="wrap">
        <blockquote>
          <p>
            {ord.map((w, i) => (
              <span key={i}>
                <span className="ord" style={{ '--p': i / ord.length }}>
                  {i === 0 && '«'}{w}{i === ord.length - 1 && '»'}
                </span>
                {i < ord.length - 1 && ' '}
              </span>
            ))}
          </p>
        </blockquote>
        <figcaption data-reveal className="bredt-sitat-kilde">
          <div className="sitat-kilde">
            <span className="initial" aria-hidden="true">{initialer}</span>
            <div>
              <p className="navn">{sitat.navn}</p>
              <p className="rolle">{sitat.rolle}</p>
            </div>
          </div>
          {sitat.caseSlug && (
            <Link className="bredt-sitat-case" to={`/arbeid/${sitat.caseSlug}`}>
              Se siden jeg laget <PilHoyre className="pil" />
            </Link>
          )}
        </figcaption>
      </figure>
    </section>
  );
};

export default BredtSitat;
