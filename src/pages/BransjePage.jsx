import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { lagFaqSchema, prismodeller, prosjekter, ruter } from '../lib/site';
import { caser } from '../lib/demo-innhold';
import { RUTE_BRANSJE } from '../lib/bransjer';

/* Én komponent for alle /nettside-for-<bransje>-sidene. Innholdet bor i
   src/lib/bransjer.js. Sidene veksler mellom hvitt, ett mørkt bånd og ett
   grått bånd, så seksjonene skilles uten aksentfarge. Fargen kommer fra
   fotografiene og kundeskjermbildene. Klassene står under «Bransjesider»
   i index.css. */

const enkel = prismodeller.find((p) => p.id === 'enkel')?.fra;

const fakta = [
  { tall: `${enkel} kr`, tekst: 'fast pris, eks. mva.' },
  { tall: '48 timer', tekst: 'til et ferdig utkast' },
  { tall: '0 kr', tekst: 'i måneden for hosting' },
  { tall: 'Du eier', tekst: 'koden og innholdet' },
];

const Topp = ({ b }) => (
  <section className="bransje-topp">
    <div className="wrap bransje-topp-inn">
      <div>
        <p className="etikett">{b.meny}</p>
        <h1>
          {b.h1} <span>{b.uthevet}</span>
        </h1>
        <p className="bransje-lede">{b.lede}</p>
        <div className="bransje-handling">
          <a href="#bestill-demo" className="knapp">
            Få et gratis utkast <ArrowRight className="ikon pil" aria-hidden="true" />
          </a>
          <Link to={ruter.priser} className="knapp knapp-tom">
            Se prisene
          </Link>
        </div>
      </div>
      <figure className="bransje-bilde bransje-bilde-topp">
        <img src={b.bilder[0].src} alt={b.bilder[0].alt} width="1400" height="934" fetchpriority="high" />
      </figure>
    </div>
    <div className="wrap">
      <ul className="faktastripe">
        {fakta.map((f) => (
          <li key={f.tall}>
            <b>{f.tall}</b>
            {f.tekst}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Avsnittene = ({ b }) => {
  const container = useReveal(70);
  return (
    <section ref={container} className="seksjon bransje-mork paa-blekk">
      <div className="wrap">
        <div className="seksjonstopp" data-reveal>
          <p className="etikett">Det jeg passer på</p>
          <h2>Tre ting som avgjør om noen tar kontakt.</h2>
        </div>
        <ol className="bransje-kort">
          {b.avsnitt.map((a, i) => (
            <li key={a.tittel} data-reveal>
              <span className="bransje-nr">{String(i + 1).padStart(2, '0')}</span>
              <h3>
                {a.tittel} {a.uthevet}
              </h3>
              {a.tekst.map((t) => (
                <p key={t.slice(0, 40)}>{t}</p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const Sjekkliste = ({ b }) => {
  const container = useReveal(60);
  return (
    <section ref={container} className="seksjon bransje-gra">
      <div className="wrap bransje-delt">
        <figure className="bransje-bilde" data-reveal>
          <img src={b.bilder[1].src} alt={b.bilder[1].alt} width="1400" height="934" loading="lazy" />
        </figure>
        <div className="bransje-liste" data-reveal>
          <p className="etikett">Sjekkliste</p>
          <h2>
            {b.punktTittel} {b.punktUthevet}
          </h2>
          <p className="bransje-ingress">
            Gå gjennom siden du har i dag med denne. Mangler mer enn tre punkter, er det verdt en prat.
          </p>
          <ul>
            {b.punkter.map((p) => (
              <li key={p}>
                <Check className="ikon" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="bransje-ingress">
            Alle tre nivåene og hva de inneholder står på{' '}
            <Link to={ruter.priser} className="bransje-lenke">
              prissiden
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

const Eksempler = ({ b }) => {
  const container = useReveal(60);
  const liste = b.caser
    .map((slug) => ({ c: caser.find((x) => x.slug === slug), p: prosjekter.find((x) => x.slug === slug) }))
    .filter((x) => x.c);
  if (liste.length === 0 && !b.eksempel) return null;
  return (
    <section ref={container} className="seksjon hvit">
      <div className="wrap">
        <div className="seksjonstopp" data-reveal>
          <p className="etikett">Arbeid</p>
          <h2>Sider jeg har laget.</h2>
        </div>
        {liste.length > 0 && (
          <ul className="bransje-caser">
            {liste.map(({ c, p }) => (
              <li key={c.slug} data-reveal>
                <Link to={`${ruter.arbeid}/${c.slug}`} className="bransje-case">
                  {p?.img && (
                    <span className="ramme">
                      <img src={p.img} alt={`Forsiden til ${p.navn}`} loading="lazy" width="960" height="720" />
                    </span>
                  )}
                  {p && <span className="bransje-case-navn">{p.navn} · {p.bransje}</span>}
                  <span className="bransje-case-tittel">
                    {c.tittel} <ArrowRight className="ikon pil" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {b.eksempel && (
          <Link to={b.eksempel.rute} className="knapp knapp-tom bransje-eksempel" data-reveal>
            {b.eksempel.tekst} <ArrowRight className="ikon pil" aria-hidden="true" />
          </Link>
        )}
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
      <Topp b={b} />
      <Avsnittene b={b} />
      <Sjekkliste b={b} />
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
