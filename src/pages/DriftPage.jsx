import { Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Modell, PrisRad } from '../components/Priser';
import { Foto, Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { driftNivaer, driftNotat, lagFaqSchema } from '../lib/site';

const driftSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Oppskalert drift, SEO og annonser',
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
    a: 'På sider jeg bygger koster hostingen 0 kroner i måneden, den er med i prisen sammen med redigeringspanelet. Vil du at jeg gjør endringene og passer på siden, koster serviceavtalen 550 kroner i måneden. SEO, med rapport, Google Ads og en ny side eller artikkel hver måned, koster fra 2 990 kroner. Vil du også ha annonser på Facebook og Instagram, koster det fra 4 490 kroner i måneden, pluss 2 990 kroner i oppstart. Alle priser eks. mva, uten binding.',
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

// Funksjonsmatrisen svarer på det kortene ikke gjør alene: hva er
// forskjellen rad for rad. Fra 24. november 2026 fire kolonner, i samme
// rekkefølge som driftNivaer. Første kolonne er det som følger med siden.
const rader = [
  ['Hosting og sikker forbindelse (SSL)', true, true, true, true],
  ['Redigeringspanel, endre tekst og bilder selv', true, true, true, true],
  ['Feil fra min side rettes gratis', true, true, true, true],
  ['Rimelige tekst- og bildeendringer', false, true, true, true],
  ['Backup og oppetidsovervåking', false, true, true, true],
  ['Sikkerhets- og programvareoppdateringer', false, true, true, true],
  ['Support direkte fra meg', false, true, true, true],
  ['Månedlig rapport om hvem som fant deg', false, false, true, true],
  ['AI-sjekk i ChatGPT og Google AI', false, false, true, true],
  ['En ny side eller artikkel i måneden', false, false, true, true],
  ['Google Ads', false, false, true, true],
  ['Facebook- og Instagram-annonser', false, false, false, true],
  ['Bindingstid', 'Ingen', 'Ingen', 'Ingen', 'Ingen'],
];

/* Hakene tones inn kolonne for kolonne fra venstre første gang tabellen
   vises (25.11.2026), så det synes at hvert trinn har alt fra trinnet før,
   og litt til. `k` er kolonnen. CSS-en står under .drift-tabell i index.css. */
const Celle = ({ v, k }) => {
  if (v === true) return <Check className="drift-hake w-4 h-4 text-room-ink mx-auto" style={{ '--k': k }} aria-label="Inkludert" />;
  if (v === false) return <Minus className="w-4 h-4 text-room-ink/50 mx-auto" aria-label="Ikke inkludert" />;
  return <span className="font-body text-xs text-room-ink/70">{v}</span>;
};

const Sammenligning = () => {
  const container = useReveal(80);
  return (
    /* Skjult under md: fire kolonner blir sidelengs scroll på 390 px, og
       kortene over sier det samme med «Se hva som er med» (regel 2). */
    <section ref={container} className="seksjon hidden md:block">
      <div className="wrap">
        <SeksjonTopp tittel="Full oversikt," uthevet="rad for rad." />
        <div data-reveal className="drift-tabell overflow-x-auto rounded-kort border border-room-ink/10">
          <table className="w-full border-collapse min-w-[44rem]">
            <caption className="sr-only">Sammenligning av de fire trinnene for drift, SEO og annonser</caption>
            <thead>
              <tr className="border-b border-room-ink/15 bg-room-ink/5">
                <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Funksjon</th>
                {driftNivaer.map((n) => (
                  <th key={n.id} scope="col" className={`font-sans font-bold text-sm py-3.5 px-4 w-[8.5rem] ${n.fremhevet ? 'underline decoration-room-ink/40 underline-offset-4' : ''}`}>{n.navn}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rader.map(([navn, ...verdier]) => (
                <tr key={navn} className="border-b border-room-ink/10 last:border-b-0">
                  <th scope="row" className="text-left font-body text-[0.9rem] text-room-ink/70 py-3.5 px-4 font-normal">{navn}</th>
                  {verdier.map((v, i) => (
                    <td key={i} className="text-center py-3.5 px-4"><Celle v={v} k={i} /></td>
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
      description="Hosting er med i prisen på alle nettsider jeg bygger. Serviceavtale fra 550 kr/mnd, SEO fra 2 990 og SEO med annonser fra 4 490. Ingen bindingstid."
      keywords={['webhosting', 'drift av nettside', 'support nettside abonnement', 'vedlikehold nettside']}
      canonical="https://oppskalert.no/drift"
      jsonLd={[driftSchema, lagFaqSchema(driftFaq)]}
    />
    <SideTopp
      tittel="Drift av nettside,"
      uthevet="hosting inkludert."
      lede="Hosting og redigeringspanel er med i prisen på alle sider jeg bygger. Derfra går det tre trinn opp: serviceavtale fra 550 kr/mnd hvis du vil at jeg gjør endringene, SEO fra 2 990 kr/mnd for å bli funnet på flere søk, og SEO med annonser fra 4 490 kr/mnd. Ingen bindingstid."
      bilde={<Foto navn="drift" alt="En håndverker skriver på en laptop på arbeidsbenken, med verktøy rundt." />}
    />
    <section className="seksjon pt-0">
      <div className="wrap">
        {/* Samme priskort som /priser fra 24.11.2026. De gir «Se hva som er
            med» på mobil, så fire trinn ikke blir fire lange lister. */}
        <PrisRad className="lg:grid-cols-2 xl:grid-cols-4 lg:max-w-none">
          {driftNivaer.map((n) => (
            <Modell key={n.id} m={n} cta={n.cta ?? `Velg ${n.navn}`} />
          ))}
        </PrisRad>
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
