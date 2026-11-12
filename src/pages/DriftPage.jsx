import { Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { driftNivaer, driftNotat, lagFaqSchema, ruter } from '../lib/site';

const driftSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Oppskalert serviceavtale og SEO',
  itemListElement: driftNivaer.map((n) => ({
    '@type': 'Offer',
    name: n.navn,
    description: n.tagline,
    price: n.fra.replace(/\s/g, ''),
    priceCurrency: 'NOK',
    url: 'https://oppskalert.no/drift',
  })),
};

/* Teksten og spørsmålene under kom inn 12.11.2026. Siden hadde 360 ord og
   tre H2, de fem øverste på «drift av nettside» 500 til 1 700 (seo/seo-klynger.md,
   klynge 5). Alle dekker sikkerhet, oppdateringer, backup og hosting. Ingen
   sier noe om en side som ikke trenger plugin-oppdateringer. */
const driftFaq = [
  {
    q: 'Hva koster drift av nettside?',
    a: 'På sider jeg bygger koster hostingen 0 kroner i måneden, den er med i prisen. Vil du at jeg gjør endringene og passer på siden, koster serviceavtalen 550 kroner i måneden. SEO, med rapport og en ny side eller artikkel hver måned, koster fra 2 990 kroner. Alle priser eks. mva, uten binding.',
  },
  {
    q: 'Hva er forskjellen på webhotell og drift?',
    a: 'Webhotellet er plassen siden ligger på. Drift er alt rundt: backup, overvåking av at siden er oppe, sikkerhetsoppdateringer og endringer når noe skal byttes ut. Hos meg er plassen med i prisen, og serviceavtalen dekker resten.',
  },
  {
    q: 'Hva skjer med siden hvis jeg sier opp serviceavtalen?',
    a: 'Den blir liggende ute som før, og hostingen er fortsatt med. Du mister bare endringene og supporten fra meg. Det er ingen bindingstid, så du kan si opp når du vil.',
  },
  {
    q: 'Har du driftsavtale for WordPress-sider?',
    a: 'Ja. Har du en WordPress-side i dag, kan jeg ta den på serviceavtale fra 550 kroner i måneden, eller bygge den om hvis det lønner seg. Forskjellen på de to står i sammenligningen av WordPress og håndkodet side.',
  },
];

const HvaDrift = () => {
  const container = useReveal(70);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap max-w-[46rem]">
        <SeksjonTopp tittel="Hva drift av nettside er," uthevet="og hva du slipper." />
        <div data-reveal className="flex flex-col gap-5 font-body text-[1.02rem] text-room-ink/80 leading-relaxed">
          <p>
            Drift av nettside er det som holder siden oppe og trygg etter lansering: at den ligger på en
            server som svarer, at det tas backup, at noen ser når den går ned, og at sikkerhetshull lukkes.
            På sidene jeg bygger er hostingen med i prisen, med sikker forbindelse fra første dag.
          </p>
          <p>
            Det meste av driften på en vanlig bedriftsside går med til oppdateringer. En WordPress-side har
            kjernen, temaet og som regel flere programtillegg som alle må oppdateres, og som av og til
            brekker hverandre. Sidene mine er bygget uten WordPress og programtillegg, så den lista finnes ikke.
            Driftsavtaler for WordPress ligger ofte på 490 til 690 kroner i måneden, og det er den jobben du betaler for.
          </p>
          <p>
            Serviceavtalen er for deg som vil sende en e-post og få endringen gjort: ny tekst, nye bilder,
            nye priser eller åpningstider. Vil du heller vite hvor mye det koster over tid, står regnestykket
            i{' '}
            <Link to="/vanlige-sporsmal/hva-koster-drift-av-nettside" className="underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink">
              hva drift og vedlikehold koster
            </Link>
            , og hva du kan gjøre selv i{' '}
            <Link to="/blogg/vedlikehold-av-nettside" className="underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink">
              vedlikehold av nettside
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

const DriftKort = ({ nivaa }) => (
  <div
    data-reveal
    className={`relative flex flex-col h-full rounded-kort p-7 md:p-8 border ${
      nivaa.fremhevet ? 'border-room-ink/40 bg-surface' : 'border-room-ink/10 bg-surface'
    }`}
  >
    {nivaa.fremhevet && (
      <span className="absolute top-0 right-7 -translate-y-1/2 bg-room-ink text-room text-[11px] font-body uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
        Anbefalt
      </span>
    )}
    <h3 className="font-sans font-bold text-xl">{nivaa.navn}</h3>
    <p className="font-body text-[0.95rem] text-room-ink/70 mt-2.5 leading-relaxed min-h-[3em]">{nivaa.tagline}</p>
    <div className="mt-6 flex items-baseline gap-1.5">
      <span className="font-body text-sm text-room-ink/70">fra</span>
      <span className="font-display font-light text-[2.75rem] leading-none tracking-[-0.022em]">{nivaa.fra}</span>
      <span className="font-body text-sm text-room-ink/70">{nivaa.enhet}</span>
    </div>
    <ul className="mt-6 flex flex-col gap-3 flex-1">
      {nivaa.inkludert.map((f) => (
        <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] text-room-ink/70 leading-relaxed">
          <Check className="w-4 h-4 text-room-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
    <Link
      to={ruter.kontakt}
      className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] ${
        nivaa.fremhevet ? 'bg-room-ink text-room' : 'bg-room-ink/10 hover:bg-room-ink/20'
      }`}
    >
      Velg {nivaa.navn}
    </Link>
  </div>
);

// Funksjonsmatrisen svarer på det kortene ikke gjør alene: hva er
// forskjellen rad for rad. Hosting står ikke her: den er med i prisen på
// alle sider jeg bygger (fra 17. oktober 2026).
const rader = [
  ['Rimelige tekst- og bildeendringer', true, true],
  ['Backup og oppetidsovervåking', true, true],
  ['Sikkerhets- og programvareoppdateringer', true, true],
  ['Support direkte fra meg', true, true],
  ['Månedlig rapport om hvem som fant deg', false, true],
  ['En ny side eller artikkel i måneden', false, true],
  ['Bindingstid', 'Ingen', 'Ingen'],
];

const Celle = ({ v }) => {
  if (v === true) return <Check className="w-4 h-4 text-room-ink mx-auto" aria-label="Inkludert" />;
  if (v === false) return <Minus className="w-4 h-4 text-room-ink/50 mx-auto" aria-label="Ikke inkludert" />;
  return <span className="font-body text-xs text-room-ink/70">{v}</span>;
};

const Sammenligning = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp tittel="Full oversikt," uthevet="rad for rad." />
        <div data-reveal className="overflow-x-auto rounded-kort border border-room-ink/10">
          <table className="w-full border-collapse min-w-[36rem]">
            <caption className="sr-only">Sammenligning av serviceavtale og SEO</caption>
            <thead>
              <tr className="border-b border-room-ink/15 bg-room-ink/5">
                <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Funksjon</th>
                {driftNivaer.map((n) => (
                  <th key={n.id} scope="col" className={`font-sans font-bold text-sm py-3.5 px-4 w-[9rem] ${n.fremhevet ? 'underline decoration-room-ink/40 underline-offset-4' : ''}`}>{n.navn}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rader.map(([navn, ...verdier]) => (
                <tr key={navn} className="border-b border-room-ink/10 last:border-b-0">
                  <th scope="row" className="text-left font-body text-[0.9rem] text-room-ink/70 py-3.5 px-4 font-normal">{navn}</th>
                  {verdier.map((v, i) => (
                    <td key={i} className="text-center py-3.5 px-4"><Celle v={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p data-reveal className="font-body text-xs text-room-ink/70 mt-6">{driftNotat}</p>
      </div>
    </section>
  );
};

const DriftPage = () => (
  <Shell>
    {/* «Webhosting» inn i title 19. august 2026. Search Console viser 80
        visninger på «webhosting» og 20 på «web hosting», begge fanget av
        forsiden på posisjon 16 og 26. Denne siden er den som faktisk
        selger hosting, men rangerte ikke på ordet fordi det ikke sto
        noe sted. Se SEO.md punkt 12. */}
    <SEO
      title="Webhosting og drift av nettside"
      description="Hosting er med i prisen på alle nettsider jeg bygger. Serviceavtale med endringer og support fra 550 kr/mnd, og SEO fra 2 990 kr/mnd. Ingen bindingstid."
      keywords={['webhosting', 'drift av nettside', 'support nettside abonnement', 'vedlikehold nettside']}
      canonical="https://oppskalert.no/drift"
      jsonLd={[driftSchema, lagFaqSchema(driftFaq)]}
    />
    <SideTopp
      tittel="Drift av nettside,"
      uthevet="hosting inkludert."
      lede="Hosting er med i prisen på alle sider jeg bygger. Serviceavtale fra 550 kr/mnd hvis du vil at jeg gjør endringene, og SEO fra 2 990 kr/mnd hvis du vil bli funnet på flere søk. Ingen bindingstid."
    />
    <section className="seksjon pt-0">
      <div className="wrap">
        <div data-reveal className="grid gap-5 md:grid-cols-2 items-stretch max-w-[52rem]">
          {driftNivaer.map((n) => <DriftKort key={n.id} nivaa={n} />)}
        </div>
      </div>
    </section>
    <Sammenligning />
    <HvaDrift />
    <FAQ tittel="Spørsmål om drift" uthevet="og hosting." sporsmal={driftFaq} />
    <DemoSkjema
      tittel="Én ting mindre"
      uthevet="å tenke på."
      lede="La meg ta meg av det tekniske, så kan du bruke tiden på bedriften din."
    />
  </Shell>
);

export default DriftPage;
