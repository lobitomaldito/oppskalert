import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { KortRad, SeksjonTopp } from './Layout';
import { ruter } from '../lib/site';

// Konsept-eksempler: fiktive bransjesider jeg har bygget for å vise spennvidde
// i kald e-post. Hvert kort lenker til en hel, levende demo-side. Tydelig merket
// som konsept, holdt adskilt fra den ekte porteføljen ("Noe av det jeg har bygget").
const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const niches = [
  { tag: 'Frisør', brand: 'Glød', domain: 'glodsalong.no', headline: 'Hår som får deg til å gløde.', route: '/eksempler/frisor', img: '1746723375184-5f537d2e6f31', accent: '#d98c63' },
  { tag: 'Håndverker', brand: 'Nordbygg', domain: 'nordbygg.no', headline: 'Vi bygger det som varer.', route: '/eksempler/handverker', img: '1674649207083-281c2517ab49', accent: '#e07a24' },
  { tag: 'Restaurant', brand: 'Nær', domain: 'naerrestaurant.no', headline: 'Smaker du husker.', route: '/eksempler/restaurant', img: '1773122150546-94699cfc8f23', accent: '#c69a52' },
  { tag: 'Tannlege', brand: 'Klar Tannklinikk', domain: 'klartann.no', headline: 'Tannhelse i trygge hender.', route: '/eksempler/tannlege', img: '1629909613654-28e377c37b09', accent: '#2f9c8f' },
];

const BransjeEksempler = () => {
  const container = useReveal(90);

  return (
    <section id="eksempler" ref={container} className="seksjon overflow-hidden">
      <div className="wrap">
        <div data-reveal>
          <SeksjonTopp
            tittel="Sider for"
            uthevet="din bransje."
            lede="Jeg bygger hver side fra bunnen, for nettopp din bransje. Dette er konsept-eksempler jeg har laget. Trykk for å se en hel side i aksjon."
          />
        </div>

        {/* Mobil: horisontal scroll-snap via KortRad i stedet for stacket
            rutenett, så fire tunge bildekort ikke spiser høyde. Fra sm:
            rutenett som før. */}
        <KortRad gridKlasser="gap-5 md:gap-6 sm:grid-cols-2" kortBredde="w-[78%]">
          {niches.map((n) => (
            <Link
              key={n.tag}
              to={n.route}
              data-reveal
              className="group block rounded-2xl overflow-hidden border border-primary/10 bg-primary/[0.03] hover:border-primary/25 transition-colors duration-300"
            >
              {/* Nettleserlinjen er fjernet her av samme grunn som på
                  porteføljekortene: tre prikker og et domene på 11 piksler
                  for å si «dette er en nettside», som bildet allerede sier.
                  Domenet var i tillegg den siste teksten på hele siten som
                  ikke klarte kontrastkravet, 3,7:1 mot 4,5:1. */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={img(n.img)}
                  alt={`${n.brand} – ${n.tag.toLowerCase()}side`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Bakgrunnen er krem nå, så gradienten toner ned mot krem
                    og teksten under den skrives med aubergine. */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <span
                  className="absolute top-4 left-4 text-sm font-body px-3 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: n.accent, color: '#201335' }}
                >
                  {n.tag}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-sans font-bold text-primary text-xl leading-tight">{n.brand}</p>
                    <p className="font-body text-sm text-primary/75 mt-1">{n.headline}</p>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Se siden <ArrowRight className="w-4 h-4" style={{ color: n.accent }} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </KortRad>

        {/* Avslutning: knytter til "jeg lager alle slags sider" */}
        <div data-reveal className="mt-12 md:mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-primary/12 pt-10">
          <p className="font-body text-[0.95rem] md:text-base text-primary/80 max-w-md leading-relaxed">
            Finner du ikke din bransje? Jeg lager nettsider for alle, og bygger gjerne en gratis demo av nettopp din.
          </p>
          <Link
            to={ruter.kontakt}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-background px-7 py-3.5 rounded-full font-sans font-bold text-sm hover:scale-[1.03] transition-transform duration-300"
          >
            Bestill gratis demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BransjeEksempler;
