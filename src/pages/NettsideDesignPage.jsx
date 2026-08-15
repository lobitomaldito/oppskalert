import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import { Avsnitt, Brodtekst, Punktliste } from '../components/Landingsside';
import Portfolio from '../components/Portfolio';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Målsøkeord: «design nettsider» (140/mnd, KD 8) og «nettside design»
   (260/mnd, KD 22), begge fra søkeordsgapet i SEO.md punkt 4.

   Avgrensning: denne handler om design som fag og som salgsverktøy.
   /webdesign-oslo eier det lokale søket, /priser eier pris. Ingen prisliste
   her, ingen Oslo-vinkling, ellers konkurrerer sidene mot hverandre. */

const CANONICAL = 'https://oppskalert.no/nettside-design';

const designSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Design av nettsider',
    serviceType: 'Webdesign og konverteringsdesign',
    description:
      'Design av nettsider for norske bedrifter. Håndtegnet og håndkodet, bygget for at besøkende skal bli kunder, ikke bare for å se pent ut.',
    areaServed: { '@type': 'Country', name: 'Norge' },
    provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
    url: CANONICAL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
      { '@type': 'ListItem', position: 2, name: 'Design av nettsider', item: CANONICAL },
    ],
  },
  lagFaqSchema(landingsSporsmal.design),
];

const punkter = [
  'Egen visuell retning, ikke en mal med byttet logo',
  'Typografi og farge valgt for lesbarhet, ikke for trender',
  'Struktur som leder mot ett tydelig neste steg per side',
  'Mobil tegnet først, ikke klemt inn til slutt',
  'Animasjon der den forklarer noe, ellers ikke',
  'Universell utforming innebygget, ikke som et tillegg',
];

const NettsideDesignPage = () => (
  <Shell>
    <SEO
      title="Design av nettsider som selger"
      description="Design av nettsider for norske bedrifter. Egen visuell retning, ingen maler, og struktur bygget for at besøkende faktisk skal ta kontakt. Se en ferdig demo før du bestemmer deg."
      keywords={['nettside design', 'design nettsider', 'webdesign', 'designe nettside']}
      canonical={CANONICAL}
      jsonLd={designSchema}
    />
    <SideTopp
      tittel="Nettside­design"
      uthevet="som gjør en jobb."
      lede="Et design er ikke ferdig når det ser bra ut. Det er ferdig når en fremmed skjønner hva du selger, og vet hva de skal gjøre videre."
    />
    <Brodtekst>
      <Avsnitt tittel="Pent er ikke" uthevet="det samme som effektivt.">
        <p>
          De fleste nettsider jeg blir bedt om å erstatte er ikke stygge. De er
          uklare. Det står for mye på forsiden, alt er like viktig, og øyet finner
          ikke noe å hvile på. Resultatet er at den besøkende scroller litt, blir
          usikker, og lukker fanen.
        </p>
        <p>
          Design løser dette før tekst og bilder i det hele tatt er på plass. Hva
          skal leses først? Hva kan vente? Hva er det ene neste steget? Når de tre
          spørsmålene er besvart i layouten, virker siden selv med middels innhold.
          Er de ikke besvart, hjelper ikke verdens beste tekst.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Ingen maler," uthevet="ingen byggeklosser.">
        <p>
          Maler er raske fordi noen andre har tatt alle valgene. Problemet er at de
          har tatt dem for en annen bedrift enn din. Du ender med seksjoner du ikke
          trenger, og mangler den ene som ville solgt.
        </p>
        <p>
          Jeg tegner strukturen for din bedrift og koder den for hånd. Det gir to
          konkrete fordeler utover utseendet: siden laster på under ett sekund
          fordi det ikke ligger et halvt kilo ubrukt kode under, og den kan endres
          senere uten at noe annet knekker.
        </p>
        <p>
          Vil du se hvordan det slår ut mot å bygge selv, har jeg lagt det side om
          side i{' '}
          <Link to={ruter.sammenlign} className="text-accent hover:text-highlight transition-colors">
            sammenligningen
          </Link>
          .
        </p>
      </Avsnitt>

      <Avsnitt tittel="Design du får se" uthevet="før du betaler.">
        <p>
          Det vanskeligste med å kjøpe design er at du kjøper noe du ikke har sett.
          Du godkjenner en skisse, betaler et forskudd, og håper.
        </p>
        <p>
          Jeg snur det. Du får en ferdig demo av din egen side, bygget med ditt
          innhold, før vi snakker om kontrakt. Er retningen feil, sier du det, og
          det har ikke kostet deg noe. Det gjør designdiskusjonen konkret i stedet
          for teoretisk, og det er raskere for begge to.
        </p>
      </Avsnitt>
    </Brodtekst>

    <Portfolio tittel="Design" uthevet="i drift." limit={6} visAlleLenke />

    <Punktliste
      tittel="Hva designet"
      uthevet="omfatter."
      lede="Alt tegnes for din bedrift. Ingenting hentes fra en hylle."
      punkter={punkter}
      fotnote={
        <>
          Designet er én del av leveransen. Se{' '}
          <Link to={ruter.priser} className="text-accent hover:text-highlight transition-colors">
            hva en nettside koster
          </Link>{' '}
          for hva som ellers inngår, eller{' '}
          <Link to={ruter.metode} className="text-accent hover:text-highlight transition-colors">
            metoden
          </Link>{' '}
          for hvordan et prosjekt går fra første samtale til lansering.
        </>
      }
    />

    <FAQ
      tittel="Det folk lurer på"
      uthevet="om design."
      sporsmal={landingsSporsmal.design}
    />

    <DemoSkjema
      tittel="Vil du se et utkast"
      uthevet="til din side?"
      lede="Fortell meg kort om bedriften, så tegner og bygger jeg et forslag med ditt innhold. Uforpliktende."
    />
  </Shell>
);

export default NettsideDesignPage;
