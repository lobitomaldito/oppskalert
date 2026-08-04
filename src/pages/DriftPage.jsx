import { Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { driftNivaer, driftNotat, ruter } from '../lib/site';

const driftSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Oppskalert driftsnivåer',
  itemListElement: driftNivaer.map((n) => ({
    '@type': 'Offer',
    name: n.navn,
    description: n.tagline,
    price: n.fra.replace(/\s/g, ''),
    priceCurrency: 'NOK',
    url: 'https://oppskalert.no/drift',
  })),
};

const DriftKort = ({ nivaa }) => (
  <div
    data-reveal
    className={`relative flex flex-col h-full rounded-3xl p-7 md:p-8 border ${
      nivaa.fremhevet ? 'border-accent bg-surface/25' : 'border-primary/12 bg-primary/[0.03]'
    }`}
  >
    {nivaa.fremhevet && (
      <span className="absolute top-0 right-7 -translate-y-1/2 bg-accent text-background text-[11px] font-body uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
        Mest valgt
      </span>
    )}
    <h3 className="font-sans font-bold text-xl">{nivaa.navn}</h3>
    <p className="font-body text-[0.95rem] text-primary/80 mt-2.5 leading-relaxed min-h-[3em]">{nivaa.tagline}</p>
    <div className="mt-6 flex items-baseline gap-1.5">
      <span className="font-body text-sm text-primary/70">fra</span>
      <span className="font-display font-extrabold text-[2.75rem] leading-none tracking-[-0.03em]">{nivaa.fra}</span>
      <span className="font-body text-sm text-primary/70">{nivaa.enhet}</span>
    </div>
    <ul className="mt-6 flex flex-col gap-3 flex-1">
      {nivaa.inkludert.map((f) => (
        <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] text-primary/80 leading-relaxed">
          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
    <Link
      to={ruter.kontakt}
      className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] ${
        nivaa.fremhevet ? 'bg-accent text-background' : 'bg-primary/10 hover:bg-primary/[0.16]'
      }`}
    >
      Velg {nivaa.navn}
    </Link>
  </div>
);

// Funksjonsmatrisen svarer på det tre kortene ikke gjør alene: hva er
// forskjellen rad for rad, ikke bare hva som er "med".
const rader = [
  ['Hosting, domene og SSL', true, true, true],
  ['Sikkerhets- og programvareoppdateringer', true, true, true],
  ['Backup', 'Månedlig', 'Ukentlig', 'Daglig'],
  ['Oppetidsovervåking', false, true, true],
  ['Innholdsendringer inkludert', false, 'Rimelige endringer', 'Flere endringer'],
  ['Kvartalsvis SEO-gjennomgang', false, false, true],
  ['Support', 'Innen 3 virkedager', 'Direkte med meg', 'Raskest, direkte med meg'],
  ['Bindingstid', 'Ingen', 'Ingen', 'Ingen'],
];

const Celle = ({ v }) => {
  if (v === true) return <Check className="w-4 h-4 text-accent mx-auto" aria-label="Inkludert" />;
  if (v === false) return <Minus className="w-4 h-4 text-primary/50 mx-auto" aria-label="Ikke inkludert" />;
  return <span className="font-body text-xs text-primary/80">{v}</span>;
};

const Sammenligning = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp tittel="Full oversikt," uthevet="rad for rad." />
        <div data-reveal className="overflow-x-auto rounded-2xl border border-primary/12">
          <table className="w-full border-collapse min-w-[36rem]">
            <caption className="sr-only">Sammenligning av de tre driftsnivåene</caption>
            <thead>
              <tr className="border-b border-primary/15 bg-primary/[0.03]">
                <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-primary/70 py-3.5 px-4 font-semibold">Funksjon</th>
                {driftNivaer.map((n) => (
                  <th key={n.id} scope="col" className={`font-sans font-bold text-sm py-3.5 px-4 w-[9rem] ${n.fremhevet ? 'text-accent' : ''}`}>{n.navn}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rader.map(([navn, ...verdier]) => (
                <tr key={navn} className="border-b border-primary/10 last:border-b-0">
                  <th scope="row" className="text-left font-body text-[0.9rem] text-primary/85 py-3.5 px-4 font-normal">{navn}</th>
                  {verdier.map((v, i) => (
                    <td key={i} className="text-center py-3.5 px-4"><Celle v={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p data-reveal className="font-body text-xs text-primary/70 mt-6">{driftNotat}</p>
      </div>
    </section>
  );
};

const DriftPage = () => (
  <Shell>
    <SEO
      title="Drift og support"
      description="Tre nivåer av drift og support for nettsiden din, fra 149 kr/mnd. Du velger hva som passer, jeg tar meg av resten. Ingen bindingstid."
      keywords={['drift nettside pris', 'support nettside abonnement', 'vedlikehold nettside']}
      canonical="https://oppskalert.no/drift"
      jsonLd={driftSchema}
    />
    <SideTopp
      tittel="Hold nettsiden"
      uthevet="trygg og oppdatert."
      lede="Tre nivåer av drift og support, fra 149 kr/mnd. Du velger hva som passer for deg, jeg tar meg av resten. Ingen bindingstid."
    />
    <section className="seksjon pt-0">
      <div className="wrap">
        <div data-reveal className="grid gap-5 md:grid-cols-3 items-stretch">
          {driftNivaer.map((n) => <DriftKort key={n.id} nivaa={n} />)}
        </div>
      </div>
    </section>
    <Sammenligning />
    <DemoSkjema
      tittel="Én ting mindre"
      uthevet="å tenke på."
      lede="La meg ta meg av det tekniske, så kan du bruke tiden på bedriften din."
    />
  </Shell>
);

export default DriftPage;
