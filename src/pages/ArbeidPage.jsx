import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import Portfolio from '../components/Portfolio';
import BransjeEksempler from '../components/BransjeEksempler';
import DemoSkjema from '../components/DemoSkjema';

const ArbeidPage = () => (
  <Shell>
    <SEO
      title="Arbeid"
      description="Ekte nettsider i drift for norske bedrifter, pluss konsept-eksempler for ulike bransjer. Se hva jeg har bygget."
      keywords={['nettside portefølje norge', 'webdesign eksempler', 'nettside bedrift']}
      canonical="https://oppskalert.no/arbeid"
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
