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
   kortene ligge under hverandre og kunne skummes uten å sveipe.

   rom styrer om kortet står på --room (lyst felt) eller --bg (mørkt skall),
   se flate-forklaringen lenger ned. Kortet bytter tekst- og aksentfarge
   etter det, ikke bare bakgrunn. */
const Kort = ({ p, rom, className }) => (
  <a
    href={p.url}
    target="_blank"
    rel="noopener noreferrer"
    data-reveal
    className={cn(
      'group block rounded-2xl overflow-hidden border transition-[border-color,transform] duration-300 ease-lett hover:-translate-y-1',
      rom
        ? 'border-room-ink/10 bg-surface hover:border-room-signal/50'
        : 'border-ink/10 bg-ink/10 hover:border-accent/50',
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

    <div className={cn('flex items-baseline justify-between gap-4 px-5 py-4', rom && 'text-room-ink')}>
      <span className="font-sans font-bold text-base">{p.navn}</span>
      <span className={cn('flex items-center gap-1.5 flex-shrink-0 font-body text-sm', rom ? 'text-room-ink/70' : 'text-ink/70')}>
        {p.bransje}
        <ArrowUpRight
          className={cn('w-4 h-4 transition-colors', rom ? 'group-hover:text-room-signal' : 'group-hover:text-accent')}
          aria-hidden="true"
        />
      </span>
    </div>
  </a>
);

/* Asymmetrisk arbeidsrutenett: faste kolonner (1 / 2 / 3) i stedet for
   auto-fit, fordi den forskjøvne toppmargen må kunne regne ut hvilken
   kolonne et kort havner i. Fra sm veksler radene to og to, fra lg følger
   de et tre-trinns mønster (rett, senket, halvveis senket) slik at ingen
   rad står helt jevn, uten at kortene noen gang overlapper. */
const RUTENETT = cn(
  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  'gap-x-5 sm:gap-x-6 lg:gap-x-8 gap-y-10 lg:gap-y-6',
  'sm:[&>*:nth-child(2n)]:mt-10',
  'lg:[&>*:nth-child(3n+1)]:mt-0 lg:[&>*:nth-child(3n+2)]:mt-16 lg:[&>*:nth-child(3n)]:mt-6',
);

/* limit=null viser alt (porteføljesiden); et tall klipper listen (forsiden). */
const Portfolio = ({ limit = null, visAlleLenke = false, mobilScroll = false, flate = '', tittel = 'Noe av det jeg', uthevet = 'har bygget.' }) => {
  const container = useReveal(80);
  const liste = limit ? prosjekter.slice(0, limit) : prosjekter;

  /* flate="band" var før en ren CSS-klasse fra .band (rgb(var(--surface))
     mot den gamle mørke paletten). Den regnet ikke med de nye tokenene, så
     her tolkes den i stedet semantisk: band betyr «denne seksjonen står på
     --room», det lyse feltet, mens fravær av flate betyr --bg, det mørke
     skallet. Aksenten følger med: --signal på mørkt, --room-signal på lyst,
     akkurat som resten av redesignet. */
  const rom = flate === 'band';
  const kort = liste.map((p) => <Kort key={p.domene} p={p} rom={rom} />);

  return (
    <section
      ref={container}
      className={cn('seksjon', rom ? 'bg-room text-room-ink border-y border-room-ink/10' : 'bg-background text-ink')}
    >
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
              className={cn(
                'inline-flex items-center gap-2 font-sans font-bold text-sm border px-6 py-3 rounded-full transition-colors duration-300',
                rom ? 'border-room-ink/20 hover:border-room-signal' : 'border-ink/20 hover:border-accent',
              )}
            >
              Se hele porteføljen <ArrowRight className={cn('w-4 h-4', rom ? 'text-room-signal' : 'text-accent')} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
