import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import { Avsnitt, Brodtekst, Punktliste } from '../components/Landingsside';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Målsøkeord: «lage nettbutikk» (210/mnd, KD 15).

   VIKTIG for den som redigerer denne senere: nettbutikk er ikke et eget spor
   i prismodellen (se kommentaren over sammenlignOversikt i src/lib/site.js).
   Derfor oppgir denne siden bevisst ingen fastpris og ingen pakketier, kun
   at prisen settes etter en samtale. Ikke lim inn tall fra /priser her, de
   gjelder ikke dette. Skal nettbutikk bli et eget spor, må prismodellen
   endres først, og så denne siden. */

const CANONICAL = 'https://oppskalert.no/lage-nettbutikk';

const nettbutikkSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Lage nettbutikk',
    serviceType: 'Utvikling av nettbutikk',
    description:
      'Nettbutikk bygget for norske småbedrifter. Vipps og kort, Bring og Posten, og en administrasjon du faktisk klarer å bruke selv.',
    areaServed: { '@type': 'Country', name: 'Norge' },
    provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
    url: CANONICAL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
      { '@type': 'ListItem', position: 2, name: 'Lage nettbutikk', item: CANONICAL },
    ],
  },
  lagFaqSchema(landingsSporsmal.nettbutikk),
];

const punkter = [
  'Betaling med Vipps og kort, satt opp og testet',
  'Frakt mot Bring eller Posten, med riktige priser i kassen',
  'Produktsider bygget for å bli funnet i søk, ikke bare for å vises',
  'Kasse med så få steg som mulig, det er der folk faller av',
  'Lagerstyring og ordreoversikt du klarer å bruke uten opplæring',
  'Regler for angrerett og vilkår på plass fra start',
];

const NettbutikkPage = () => (
  <Shell>
    <SEO
      title="Lage nettbutikk for norske småbedrifter"
      description="Skal du lage nettbutikk? Slik ser en butikk ut som faktisk selger: Vipps og kort, frakt som stemmer i kassen, og produktsider som blir funnet i søk. Pris etter en kort samtale."
      keywords={['lage nettbutikk', 'nettbutikk', 'starte nettbutikk', 'nettbutikk pris']}
      canonical={CANONICAL}
      jsonLd={nettbutikkSchema}
    />
    <SideTopp
      tittel="Lage nettbutikk"
      uthevet="som faktisk selger."
      lede="En nettbutikk er ikke en nettside med en handlekurv. Den har noen få steder der penger forsvinner, og de stedene er verdt å bygge riktig fra start."
    />
    <Brodtekst>
      <Avsnitt tittel="Kassen er der" uthevet="pengene forsvinner.">
        <p>
          Du kan gjøre alt annet riktig og likevel miste flertallet av salgene i de
          siste tre skjermbildene. De vanligste årsakene er kjedelige, ikke
          mystiske: fraktprisen dukker først opp i kassen, kunden tvinges til å
          opprette konto, eller betalingsmåten de bruker mangler.
        </p>
        <p>
          Derfor bygger jeg kassen først og butikken rundt. Færrest mulig steg,
          fraktpris synlig tidlig, og Vipps tilgjengelig fra første skjerm. I Norge
          er Vipps ikke et alternativ, det er forventningen.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Produktsider er" uthevet="søkeresultater.">
        <p>
          Forsiden i en nettbutikk får sjelden mest trafikk. Produktsidene gjør,
          fordi folk googler produktet, ikke butikken. Hver produktside er altså en
          egen inngangsdør, på samme måte som landingssidene ellers på dette
          nettstedet.
        </p>
        <p>
          Det betyr at hvert produkt trenger sin egen tittel, sin egen beskrivelse
          skrevet for hvordan folk faktisk søker, og strukturerte data med pris og
          lagerstatus. Da kan Google vise pris rett i søkeresultatet, og en AI som
          får spørsmål om produktet har noe å svare med.
        </p>
      </Avsnitt>

      <Avsnitt tittel="Hva det koster," uthevet="og hvorfor jeg ikke sier det her.">
        <p>
          Nettbutikk er den ene leveransen jeg ikke oppgir fastpris på før vi har
          snakket sammen. Ikke for å være vag, men fordi spennet er reelt: fem
          produkter uten varianter og ti tusen produkter med lager, størrelser og
          regnskapsintegrasjon er to helt forskjellige jobber.
        </p>
        <p>
          Det du får er en fast pris før jeg skriver en linje kode, akkurat som på
          alt annet. Se{' '}
          <Link to={ruter.priser} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
            prisene på vanlige nettsider
          </Link>{' '}
          for hvordan jeg jobber med pris, og{' '}
          <Link to={ruter.metode} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
            metoden
          </Link>{' '}
          for gangen i et prosjekt.
        </p>
      </Avsnitt>
    </Brodtekst>

    <Punktliste
      tittel="Hva en butikk"
      uthevet="må ha på plass."
      lede="Dette er ikke ekstrautstyr. Mangler noe av det, lekker butikken penger."
      punkter={punkter}
      fotnote={
        <>
          Butikker trenger mer løpende tilsyn enn vanlige nettsider, siden en
          feil i kassen koster salg samme dag. Se{' '}
          <Link to={ruter.drift} className="text-ink underline underline-offset-4 decoration-ink/40 hover:decoration-ink transition-colors">
            drift og support
          </Link>{' '}
          for hvordan det følges opp.
        </>
      }
    />

    <FAQ
      tittel="Det folk lurer på"
      uthevet="om nettbutikk."
      sporsmal={landingsSporsmal.nettbutikk}
    />

    <DemoSkjema
      tittel="Fortell meg hva"
      uthevet="du skal selge."
      lede="Noen setninger om produktene og omfanget holder, så sier jeg hva det innebærer og hva det koster. Uforpliktende."
    />
  </Shell>
);

export default NettbutikkPage;
