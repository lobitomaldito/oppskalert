import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import { Avsnitt, Brodtekst, Punktliste } from '../components/Landingsside';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { lagFaqSchema, ruter } from '../lib/site';
import { caser } from '../lib/demo-innhold';
import { RUTE_BRANSJE } from '../lib/bransjer';

/* Én komponent for alle /nettside-for-<bransje>-sidene. Innholdet bor i
   src/lib/bransjer.js, der hvorfor-et står. Delt form, ulikt innhold. */

const lenke =
  'group inline-flex items-center min-h-[44px] gap-2 font-sans font-bold text-sm text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-room-ink/50 rounded-full';

const Eksempler = ({ b }) => {
  const container = useReveal(60);
  const liste = b.caser.map((slug) => caser.find((c) => c.slug === slug)).filter(Boolean);
  if (liste.length === 0 && !b.eksempel) return null;
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp tittel="Sider jeg" uthevet="har laget." />
        <ul data-reveal className="flex flex-col max-w-[46rem]">
          {liste.map((c) => (
            <li key={c.slug} className="border-t border-room-ink/15">
              <Link to={`${ruter.arbeid}/${c.slug}`} className={`${lenke} py-3`}>
                {c.tittel}
                <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
          {b.eksempel && (
            <li className="border-t border-room-ink/15">
              <Link to={b.eksempel.rute} className={`${lenke} py-3`}>
                {b.eksempel.tekst}
                <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

const BransjePage = ({ b }) => {
  const canonical = `https://oppskalert.no${RUTE_BRANSJE(b.slug)}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: b.meny,
      serviceType: b.meny,
      description: b.beskrivelse,
      areaServed: { '@type': 'Country', name: 'Norge' },
      provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
      url: canonical,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
        { '@type': 'ListItem', position: 2, name: b.meny, item: canonical },
      ],
    },
    lagFaqSchema(b.faq),
  ];

  return (
    <Shell>
      <SEO title={b.tittel} description={b.beskrivelse} keywords={b.sokeord} canonical={canonical} jsonLd={schema} />
      <SideTopp tittel={b.h1} uthevet={b.uthevet} lede={b.lede} />
      <Brodtekst>
        {b.avsnitt.map((a) => (
          <Avsnitt key={a.tittel} tittel={a.tittel} uthevet={a.uthevet}>
            {a.tekst.map((t) => (
              <p key={t.slice(0, 40)}>{t}</p>
            ))}
          </Avsnitt>
        ))}
      </Brodtekst>
      <Punktliste
        tittel={b.punktTittel}
        uthevet={b.punktUthevet}
        lede="Gå gjennom siden du har i dag med denne. Mangler mer enn tre punkter, er det verdt en prat."
        punkter={b.punkter}
        fotnote={
          <>
            Alle tre nivåene og hva de inneholder står på{' '}
            <Link to={ruter.priser} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink">
              prissiden
            </Link>
            .
          </>
        }
      />
      <Eksempler b={b} />
      <FAQ tittel="Det folk lurer på" uthevet="før de bestiller." sporsmal={b.faq} />
      <DemoSkjema
        tittel="Vil du se"
        uthevet="et utkast først?"
        lede="Send meg adressen til siden du har i dag, eller fortell kort hva du driver med. Du får et ferdig utkast innen 48 timer, gratis og uforpliktende."
      />
    </Shell>
  );
};

export default BransjePage;
