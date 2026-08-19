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
   se flate-forklaringen lenger ned. Kortet bytter tekstfarge etter det,
   ikke bare bakgrunn. Ingen aksentfarge her: all farge på siden skal komme
   fra skjermbildet, ikke fra skallet rundt det. */
const Kort = ({ p, rom, className, forsinkelse = 0, varighet = 34 }) => (
  <a
    href={p.url}
    target="_blank"
    rel="noopener noreferrer"
    data-reveal
    className={cn(
      'group block rounded-2xl overflow-hidden border transition-[border-color,transform] duration-300 ease-lett hover:-translate-y-1',
      rom
        ? 'border-room-ink/10 bg-surface hover:border-room-ink/40'
        : 'border-ink/10 bg-ink/10 hover:border-ink/40',
      className,
    )}
  >
    {/* Nettleserlinje med tre prikker og domenet. Den er her igjen fordi
        rammen under nå ruller gjennom hele siden: uten kromet leser det som
        et bilde som glir, med kromet leser det som en nettside du ser
        gjennom. Prikkene er dekorative og skjult for skjermlesere. */}
    {p.full && (
      <div className={cn(
        'flex items-center gap-1.5 px-3 py-2 border-b',
        rom ? 'bg-room border-room-ink/10' : 'bg-ink/10 border-ink/10',
      )}>
        <i aria-hidden="true" className={cn('w-[7px] h-[7px] rounded-full', rom ? 'bg-room-ink/20' : 'bg-ink/20')} />
        <i aria-hidden="true" className={cn('w-[7px] h-[7px] rounded-full', rom ? 'bg-room-ink/20' : 'bg-ink/20')} />
        <i aria-hidden="true" className={cn('w-[7px] h-[7px] rounded-full', rom ? 'bg-room-ink/20' : 'bg-ink/20')} />
        <span className={cn('ml-2 font-body text-[0.6875rem]', rom ? 'text-room-ink/70' : 'text-ink/70')}>
          {p.domene}
        </span>
      </div>
    )}

    {/* Har prosjektet en fullsides-fangst, ruller den sakte inni vinduet.
        Ellers vises det gamle utsnittsbildet som før. Vinduet står i 4:3,
        som er formatet --til er regnet ut fra, se site.js. */}
    <div className={cn('relative overflow-hidden', p.full ? 'aspect-[4/3]' : 'aspect-[16/10]', 'bg-surface/20')}>
      <img
        src={p.full || p.img}
        alt={`Nettsiden til ${p.navn}`}
        loading="lazy"
        style={p.full ? { '--til': p.til, animationDelay: `${forsinkelse}s`, animationDuration: `${varighet}s` } : undefined}
        className={cn(
          'w-full block',
          p.full
            ? 'h-auto rammerull'
            : 'h-full object-cover object-top transition-transform duration-700 ease-lett group-hover:scale-[1.04]',
        )}
      />
      {/* Antydning om at det er mer under kanten. */}
      {p.full && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-black/20"
        />
      )}
    </div>

    <div className={cn('flex items-baseline justify-between gap-4 px-5 py-4', rom && 'text-room-ink')}>
      <span className="font-sans font-bold text-base">{p.navn}</span>
      <span className={cn('flex items-center gap-1.5 flex-shrink-0 font-body text-sm', rom ? 'text-room-ink/70' : 'text-ink/70')}>
        {p.bransje}
        <ArrowUpRight
          className={cn('w-4 h-4 transition-colors', rom ? 'group-hover:text-room-ink' : 'group-hover:text-ink')}
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
  /* self-start på barna, ikke items-start på rutenettet: KortRad setter
     items-stretch, og to align-utiliteter med samme spesifisitet avgjøres
     av rekkefølgen i den genererte CSS-en, ikke av rekkefølgen i strengen.
     align-self slår align-items uansett. Uten dette strekkes hvert kort til
     høyden av det høyeste i raden, og de med kort navn får et tomrom under
     teksten. */
  'sm:[&>*]:self-start',
);

/* limit=null viser alt (porteføljesiden); et tall klipper listen (forsiden). */
const Portfolio = ({ limit = null, visAlleLenke = false, mobilScroll = false, flate = '', tittel = 'Noe av det jeg', uthevet = 'har bygget.' }) => {
  const container = useReveal(80);
  const liste = limit ? prosjekter.slice(0, limit) : prosjekter;

  /* flate="band" var før en ren CSS-klasse fra .band (rgb(var(--surface))
     mot den gamle mørke paletten). Den regnet ikke med de nye tokenene, så
     her tolkes den i stedet semantisk: band betyr «denne seksjonen står på
     --room», det lyse feltet, mens fravær av flate betyr --bg, det mørke
     skallet. Ingen aksentfarge følger med, kun tekstfargen (ink på mørkt,
     room-ink på lyst) bytter med flaten. */
  const rom = flate === 'band';
  /* Forskjøvet start og ulik varighet per kort, ellers ruller alle seks i
     takt og raden leser som én flate som beveger seg. Verdiene er de samme
     som i studio-mal-demoen. */
  const kort = liste.map((p, i) => (
    <Kort key={p.domene} p={p} rom={rom} forsinkelse={0.6 + i * 0.7} varighet={30 + i * 2} />
  ));

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
                rom ? 'border-room-ink/20 hover:border-room-ink/40' : 'border-ink/20 hover:border-ink/40',
              )}
            >
              Se hele porteføljen <ArrowRight className={cn('w-4 h-4', rom ? 'text-room-ink' : 'text-ink')} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
