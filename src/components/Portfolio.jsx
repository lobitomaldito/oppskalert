import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp } from './Layout';
import { prosjekter, ruter } from '../lib/site';

/* Rutenett i stedet for den gamle marquee-en. Marquee-en så levende ut,
   men den doblet hele listen i DOM-en, flyttet seg under pekeren når du
   skulle klikke, og lot deg aldri se mer enn tre sider om gangen.
   Et rutenett viser alt, står stille, og er lettere å lese på mobil. */
const Kort = ({ p }) => (
  <a
    href={p.url}
    target="_blank"
    rel="noopener noreferrer"
    data-reveal
    className="group block rounded-2xl overflow-hidden border border-primary/10 bg-primary/[0.03] transition-[border-color,transform] duration-300 ease-lett hover:border-accent/50 hover:-translate-y-1"
  >
    {/* Nettleserlinje: gjør kortet til et lite vindu mot en ekte side */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-primary/25" />
        <span className="w-2 h-2 rounded-full bg-primary/25" />
        <span className="w-2 h-2 rounded-full bg-primary/25" />
      </span>
      <span className="ml-1 flex-1 truncate font-body text-[11px] text-primary/70">{p.domene}</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-primary/70 group-hover:text-accent transition-colors" />
    </div>

    <div className="aspect-[16/10] overflow-hidden bg-surface/20">
      <img
        src={p.img}
        alt={`Skjermbilde av nettsiden til ${p.navn}`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-lett group-hover:scale-[1.04]"
      />
    </div>

    <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
      <span className="font-sans font-bold text-[0.95rem]">{p.navn}</span>
      <span className="font-body text-[0.72rem] text-primary/70 flex-shrink-0">{p.bransje}</span>
    </div>
  </a>
);

/* limit=null viser alt (porteføljesiden); et tall klipper listen (forsiden). */
const Portfolio = ({ limit = null, visAlleLenke = false, tittel = 'Noe av det jeg', uthevet = 'har bygget.' }) => {
  const container = useReveal(80);
  const liste = limit ? prosjekter.slice(0, limit) : prosjekter;

  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel={tittel}
          uthevet={uthevet}
          lede="Ekte sider i drift for norske bedrifter. Trykk deg inn på hvilken som helst av dem, de er alle live akkurat nå."
        />

        <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
          {liste.map((p) => <Kort key={p.domene} p={p} />)}
        </div>

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
