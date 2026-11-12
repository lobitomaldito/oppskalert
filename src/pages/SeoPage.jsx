import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import { PilHoyre } from '../components/Ikon';
import { track } from '../lib/analytics';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { driftNivaer, kontakt, lagFaqSchema, landingsSporsmal } from '../lib/site';

/* Dedikert landingsside for søkeordet «søkemotoroptimalisering» (590 søk/mnd,
   KD 9 per SEO.md punkt 4). Mønsteret er hentet fra konkurrentene som faktisk
   rangerer: én side per kommersielt søkeord, med ordet i URL-en, i stedet for
   å håpe at forsiden dekker alt. */

const seoSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Søkemotoroptimalisering',
    serviceType: 'Søkemotoroptimalisering (SEO)',
    description:
      'Teknisk SEO, innhold og lenkebygging for norske bedrifter. Jeg måler først, fikser det som faktisk blokkerer, og rapporterer på synlighet i både Google og AI-assistenter.',
    areaServed: { '@type': 'Country', name: 'Norge' },
    provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
    url: 'https://oppskalert.no/sokemotoroptimalisering',
  },
  lagFaqSchema(landingsSporsmal.seo),
];

/* Ombygd 12.11.2026 (Aleksander: «liten pris, masse tekst, pris må stå
   øverst, tydelig, med cta»). Prisen og knappen står i et kort i toppen.
   De fem lange avsnittene om metoden er kortet ned til fire kort, og
   «Hva som inngår» er tatt ut fordi priskortet og månedskortene sier det
   samme. Søkeordet og prisen står fortsatt i første avsnitt, slik
   klyngeplanen (seo/seo-klynger.md) ber om. Prisen leses fra driftNivaer. */
const seo = driftNivaer.find((n) => n.id === 'seo');

const Topp = () => {
  const container = useReveal(60);
  return (
    <section ref={container} className="wrap sidetopp seo-topp">
      <div>
        <p data-reveal className="etikett inn">SEO</p>
        {/* Søkeordet står først i H1, som klyngeplanen ber om (#99). Myk
            bindestrek (U+00AD) så ordet kan brytes på mobil. */}
        <h1 data-reveal className="inn" style={{ '--d': '60ms' }}>
          {'Søkemotor\u00adoptimalisering'} for små bedrifter.
        </h1>
        <p data-reveal className="inn" style={{ '--d': '140ms' }}>
          Bli funnet når kundene søker, i Google og i ChatGPT. Hver måned ser du hvem som
          fant deg, og jeg retter det som står i veien.
        </p>
      </div>
      <div data-reveal className="seo-priskort inn" style={{ '--d': '200ms' }}>
        <p className="seo-priskort-navn">SEO hver måned</p>
        <p className="seo-priskort-pris">
          <span className="seo-priskort-fra">fra</span> {seo.fra} <span className="seo-priskort-enhet">{seo.enhet}</span>
        </p>
        <p className="seo-priskort-vilkar">Prisen settes etter omfang. Ingen binding.</p>
        <ul>
          {seo.inkludert.filter((l) => !l.endsWith(':')).map((l) => (
            <li key={l}><Check className="ikon" aria-hidden="true" />{l}</li>
          ))}
          <li><Check className="ikon" aria-hidden="true" />Endringer, backup og support fra serviceavtalen</li>
        </ul>
        <a
          className="knapp seo-priskort-knapp"
          href="#bestill-demo"
          onClick={() => track('seo_cta_klikket', { knapp: 'analyse' })}
        >
          Få en gratis synlighetsanalyse <PilHoyre className="pil" />
        </a>
        <p className="seo-priskort-smaa">
          Eller ring meg på{' '}
          <a href={`tel:${kontakt.tel}`} onClick={() => track('seo_cta_klikket', { knapp: 'ring' })}>{kontakt.telefon}</a>
        </p>
      </div>
    </section>
  );
};

/* Det abonnementet leverer, måned for måned. Står rett under toppen, så
   prisen aldri er et nakent tall (regel 13). */
const maanedlig = [
  {
    navn: 'Rapport med vanlige ord',
    tekst: 'Hvem som fant deg, på hvilke søk, og om kurven går riktig vei. Tallene er fra Search Console på ditt eget domene, så du kan sjekke dem selv.',
  },
  {
    navn: 'AI-sjekk',
    tekst: 'Fem spørsmål kundene dine stiller, til ChatGPT og Google AI. Du får se om du ble nevnt, og hvem som ble nevnt i stedet.',
  },
  {
    navn: 'En ny side eller artikkel',
    tekst: 'Skrevet om et søk kundene dine har, valgt ut fra det rapporten viser.',
  },
  {
    navn: 'Retting av funnene',
    tekst: 'Det rapporten finner, retter jeg samme måned. Du trenger ikke be om det.',
  },
];

/* Metoden, kortet ned fra fem lange avsnitt. */
const metode = [
  {
    navn: 'Det tekniske først',
    tekst: 'Jeg sjekker om Google i det hele tatt får lese siden din. Jeg har målt en side som så helt normal ut i nettleseren, der roboten bare så 46 ord.',
  },
  {
    navn: 'Ord kundene søker på',
    tekst: 'Tekster om det kundene dine googler, med ekte søkevolum for bransjen din. Én side per søk, ikke én side som prøver å dekke alt.',
  },
  {
    navn: 'Lenker fra andre nettsteder',
    tekst: 'Fra gratis, troverdige kilder: bedriftsprofil, registre, foreninger og folk du jobber med. Jeg kjøper aldri lenker.',
  },
  {
    navn: 'Synlig i ChatGPT',
    tekst: 'De fleste AI-roboter leser ikke JavaScript. Jeg sørger for at de får ferdig tekst og strukturerte data, så de kan sitere deg.',
  },
];

const KortSeksjon = ({ etikett, tittel, lede, kort, pt0 = false }) => {
  const container = useReveal(60);
  return (
    <section ref={container} className={pt0 ? 'seksjon pt-0' : 'seksjon'}>
      <div className="wrap">
        <div data-reveal className="seksjonstopp inn">
          <p className="etikett">{etikett}</p>
          <h2>{tittel}</h2>
          {lede && <p>{lede}</p>}
        </div>
        <ul data-reveal className="tjenester statisk-kort inn" style={{ '--d': '80ms' }}>
          {kort.map((k) => (
            <li key={k.navn} className="tjeneste">
              <h3>{k.navn}</h3>
              <p>{k.tekst}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const SeoPage = () => (
  <Shell>
    <SEO
      title="Søkemotoroptimalisering, fra 2 990 kr/mnd"
      description="Søkemotoroptimalisering som starter med det tekniske: hva robotene faktisk ser. Jeg måler, fikser det som blokkerer, og setter opp Search Console så du ser tallene selv."
      keywords={['søkemotoroptimalisering', 'seo norge', 'seo bedrift', 'synlighet i google']}
      canonical="https://oppskalert.no/sokemotoroptimalisering"
      jsonLd={seoSchema}
    />
    <Topp />
    <KortSeksjon
      pt0
      etikett="Hver måned"
      tittel="Det du får hver måned"
      kort={maanedlig}
    />
    <KortSeksjon
      etikett="Slik jobber jeg"
      tittel="Det jeg ser etter"
      lede="Ingen kan love deg førsteplass i Google. Du får Search Console på ditt eget domene og ser tallene selv. De første visningene kommer etter noen uker, og posisjonene setter seg etter et par måneder."
      kort={metode}
    />
    <FAQ
      tittel="Det folk lurer på"
      uthevet="om søk."
      sporsmal={landingsSporsmal.seo}
    />
    <DemoSkjema
      analyse
      tittel="Gratis"
      uthevet="synlighetsanalyse."
      lede="Skriv inn adressen til nettsiden din. Jeg henter den slik Google og ChatGPT gjør, og sender deg det som står i veien for at du blir funnet, med det viktigste først. Gratis, også om du ikke blir kunde."
    />
  </Shell>
);

export default SeoPage;
