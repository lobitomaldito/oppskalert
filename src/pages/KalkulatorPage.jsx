import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import Kalkulator from '../components/Kalkulator';
import DemoSkjema from '../components/DemoSkjema';

const KalkulatorPage = () => (
  <Shell>
    <SEO
      title="Priskalkulator"
      description="Regn ut hva nettsiden din koster på under ett minutt. Gratis, ingen e-post nødvendig, bygget på de samme fastprisene jeg bruker i ekte prosjekter."
      keywords={['priskalkulator nettside', 'hva koster nettside', 'nettside pris kalkulator']}
      canonical="https://oppskalert.no/kalkulator"
    />
    <SideTopp
      tittel="Hva koster"
      uthevet="din nettside?"
      lede="Svar på noen få spørsmål, så får du et realistisk prisestimat på under ett minutt. Ingen e-post, ingen forpliktelser, bare de samme fastprisene som jeg bruker i ekte prosjekter."
    />
    <Kalkulator />
    <DemoSkjema
      tittel="Klar for en"
      uthevet="konkret pris?"
      lede="Fortell meg kort om bedriften, så får du en fast pris og en gratis demo før du bestemmer deg."
    />
  </Shell>
);

export default KalkulatorPage;
