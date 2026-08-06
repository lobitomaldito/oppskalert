import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { KortRad, SeksjonTopp } from './Layout';
import { cn } from '../lib/utils';
import { prosjekter, ruter } from '../lib/site';

/* Rutenett i stedet for den gamle marquee-en. Marquee-en så levende ut,
   men den doblet hele listen i DOM-en, flyttet seg under pekeren når du
   skulle klikke, og lot deg aldri se mer enn tre sider om gangen.
   Et rutenett viser alt og står stille.

   mobilScroll bytter rutenettet med KortRad, den delte horisontale
   snap-scrolleren (samme grep som Omtaler og BransjeEksempler). Det brukes
   der porteføljen er ett av flere avsnitt og seks stablede kort spiser hele
   skjermen. På /arbeid er porteføljen hele poenget med siden, så der skal
   kortene ligge under hverandre og kunne skummes uten å sveipe. */
const Kort = ({ p, className }) => (
  <a
    href={p.url}
    target="_blank"
    rel="noopener noreferrer"
    data-reveal
    className={cn(
      'group block rounded-2xl overflow-hidden border border-primary/10 bg-primary/[0.03] transition-[border-color,transform] duration-300 ease-lett hover:border-accent/50 hover:-translate-y-1',
      className,
    )}
  >
    {/* Nettleserlinjen med tre prikker og domenet er fjernet. Den kostet seks
        elementer og to mikrotekster per kort, seks kort ganger det, for å si
        «dette er en nettside», noe skjermbildet allerede sier. Pilen er flyttet
        ned til navnet, så det synes fortsatt at lenken går ut av siden. */}
    <div className="aspect-[16/10] overflow-hidden bg-surface/20">
      <img
        src={p.img}
        alt={`Skjermbilde av nettsiden til ${p.navn}`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-lett group-hover:scale-[1.04]"
      />
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-4">
      <span className="font-sans font-bold text-base">{p.navn}</span>
      <span className="flex items-center gap-1.5 flex-shrink-0 font-body text-sm text-primary/70">
        {p.bransje}
        <ArrowUpRight className="w-4 h-4 group-hover:text-accent transition-colors" aria-hidden="true" />
      </span>
    </div>
  </a>
);

// Samme rutenett brukes med og uten KortRad, så det skal se identisk ut fra
// sm og opp uansett hvilken av de to grenene under som er aktiv.
const RUTENETT = 'gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]';

/* limit=null viser alt (porteføljesiden); et tall klipper listen (forsiden). */
const Portfolio = ({ limit = null, visAlleLenke = false, mobilScroll = false, tittel = 'Noe av det jeg', uthevet = 'har bygget.' }) => {
  const container = useReveal(80);
  const liste = limit ? prosjekter.slice(0, limit) : prosjekter;
  const kort = liste.map((p) => <Kort key={p.domene} p={p} />);

  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel={tittel}
          uthevet={uthevet}
          lede="Ekte sider i drift for norske bedrifter. Trykk deg inn på hvilken som helst av dem, de er alle live akkurat nå."
        />

        {mobilScroll ? (
          <KortRad gridKlasser={RUTENETT} kortBredde="w-[78%]">{kort}</KortRad>
        ) : (
          <div className={cn('grid', RUTENETT)}>{kort}</div>
        )}

        {visAlleLenke && (
          <div data-reveal className="mt-10">
            <Link
              to={ruter.arbeid}
              className="inline-flex items-center gap-2 font-sans font-bold text-sm border border-primary/20 hover:border-accent px-6 py-3 rounded-full transition-colors duration-300"
            >
              Se hele porteføljen <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
