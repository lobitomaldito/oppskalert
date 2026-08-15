import { Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import Priser from '../components/Priser';
import FAQ from '../components/FAQ';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { lagFaqSchema, prisSporsmal, prismodeller } from '../lib/site';

/* Egne prisspesifikke spørsmål, ikke den generelle listen fra forsiden.
   Fram til 13. august 2026 viste begge rutene nøyaktig samme åtte
   spørsmål, altså identisk FAQPage-schema på to URLer, og da beholder
   Google bare den ene. Se kommentaren over prisSporsmal i site.js. */
const prisFaqSchema = lagFaqSchema(prisSporsmal);

const priserSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Oppskalert prismodeller',
  itemListElement: prismodeller.map((p) => ({
    '@type': 'Offer',
    name: p.navn,
    description: p.tagline,
    price: p.fra.replace(/\s/g, ''),
    priceCurrency: 'NOK',
    url: 'https://oppskalert.no/priser',
  })),
};

/* Sammenligningen svarer på det ene spørsmålet prismodellene ikke gjør
   alene: hva er egentlig forskjellen, rad for rad. */
const rader = [
  ['Gratis demo før du bestemmer deg', true, true],
  ['Design og utvikling av komplett nettside', true, true],
  ['Håndkodet, uten tunge plugins', true, true],
  ['Søkemotor-grunnoppsett', true, true],
  ['Du eier alle filene', true, 'Ja, også her'],
  ['Hosting, domene og SSL', 'Eget ansvar', true],
  ['Rimelige innholdsendringer inkludert', false, true],
  ['Backup og oppetidsovervåking', false, true],
  ['Support direkte fra meg', false, true],
];

const Celle = ({ v }) => {
  if (v === true) return <Check className="w-4 h-4 text-accent mx-auto" aria-label="Inkludert" />;
  if (v === false) return <Minus className="w-4 h-4 text-primary/70 mx-auto" aria-label="Ikke inkludert" />;
  return <span className="font-body text-xs text-primary/70">{v}</span>;
};

const Sammenligning = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp tittel="Hva inngår i" uthevet="hver modell?" />
        <div data-reveal className="overflow-x-auto max-w-[52rem]">
          <table className="w-full border-collapse min-w-[34rem]">
            <caption className="sr-only">Sammenligning av engangspris og driftsavtale</caption>
            <thead>
              <tr className="border-b border-primary/20">
                <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-primary/70 pb-3 font-semibold">Inkludert</th>
                <th scope="col" className="font-sans font-bold text-sm pb-3 px-4 w-[8.5rem]">Engangspris</th>
                <th scope="col" className="font-sans font-bold text-sm pb-3 px-4 w-[8.5rem] text-accent">Driftet av meg</th>
              </tr>
            </thead>
            <tbody>
              {rader.map(([navn, a, b]) => (
                <tr key={navn} className="border-b border-primary/10">
                  <th scope="row" className="text-left font-body text-[0.95rem] text-primary/85 py-3.5 pr-4 font-normal">{navn}</th>
                  <td className="text-center py-3.5 px-4"><Celle v={a} /></td>
                  <td className="text-center py-3.5 px-4"><Celle v={b} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p data-reveal className="font-body text-[0.95rem] text-primary/80 mt-6 max-w-[52ch] leading-relaxed">
          Begge modellene gjelder nye nettsider. Har du en eksisterende side du vil pusse opp, ta kontakt, så finner vi riktig løp for den.
        </p>
      </div>
    </section>
  );
};

const PriserPage = () => (
  <Shell>
    <SEO
      title="Pris på nettside, fast og uten overraskelser"
      description="Pris på hjemmeside og nettside: engangspris fra 7 990 kr, eller driftet av meg fra 690 kr/mnd. Du får fast pris og en gratis demo før du bestemmer deg. Ingen binding."
      keywords={['nettside pris', 'pris på hjemmeside', 'hjemmesider pris', 'priser for hjemmeside']}
      canonical="https://oppskalert.no/priser"
      jsonLd={[prisFaqSchema, priserSchema]}
    />
    <SideTopp
      tittel="Fast pris på"
      uthevet="nettside og drift."
      lede="To modeller, begge starter med en gratis demo. Du vet nøyaktig hva hjemmesiden koster før jeg skriver en eneste linje kode."
    />
    <Priser visPasserDeg />
    <Sammenligning />
    <FAQ tittel="Det folk lurer på" uthevet="om pris." sporsmal={prisSporsmal} />
    <DemoSkjema
      tittel="Vil du se hva"
      uthevet="din ville kostet?"
      lede="Fortell meg kort om bedriften, så får du en fast pris, og en gratis demo før du bestemmer deg."
    />
  </Shell>
);

export default PriserPage;
