import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import Portfolio from '../components/Portfolio';
import BransjeEksempler from '../components/BransjeEksempler';
import DemoSkjema from '../components/DemoSkjema';
import { prosjekter } from '../lib/site';

const arbeidSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nettsider bygget av Oppskalert',
  url: 'https://oppskalert.no/arbeid',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: prosjekter.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.navn,
      url: p.url,
    })),
  },
};

const ArbeidPage = () => (
  <Shell>
    <SEO
      title="Arbeid"
      description="Ekte nettsider i drift for norske bedrifter, pluss konsept-eksempler for ulike bransjer. Se hva jeg har bygget."
      keywords={['nettside portefølje norge', 'webdesign eksempler', 'nettside bedrift']}
      canonical="https://oppskalert.no/arbeid"
      jsonLd={arbeidSchema}
    />
    <SideTopp
      tittel="Sider jeg"
      uthevet="har bygget."
      lede="Ekte kunder i drift, og konsept-eksempler bygget for å vise hva som er mulig i ulike bransjer. Alt er laget for hånd, fra første linje kode."
    />
    <Portfolio tittel="I drift" uthevet="akkurat nå." />
    <BransjeEksempler />
    <DemoSkjema
      tittel="Vil du se hvordan"
      uthevet="din kan bli?"
      lede="Jeg bygger et ferdig utkast med ditt innhold, helt uforpliktende. Liker du det ikke, koster det ingenting."
    />
  </Shell>
);

export default ArbeidPage;
