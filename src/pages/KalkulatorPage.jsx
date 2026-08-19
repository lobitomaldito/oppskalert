import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import Kalkulator from '../components/Kalkulator';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { lagFaqSchema } from '../lib/site';
import { faqKalkulator } from '../lib/faq-sider';

const faqLd = lagFaqSchema(faqKalkulator);

const KalkulatorPage = () => (
  <Shell>
    <SEO
      title="Hva koster en nettside? Regn det ut"
      description="Hva koster en nettside i 2026? Regn det ut på under ett minutt. Gratis, ingen e-post nødvendig, bygget på de samme fastprisene jeg bruker i ekte prosjekter."
      keywords={['hva koster en nettside', 'hva koster en hjemmeside', 'priskalkulator nettside']}
      canonical="https://oppskalert.no/kalkulator"
    jsonLd={faqLd}
    />
    <SideTopp
      tittel="Hva koster"
      uthevet="en nettside?"
      lede="Svar på noen få spørsmål, så får du et realistisk prisestimat på under ett minutt. Ingen e-post, ingen forpliktelser, bare de samme fastprisene som jeg bruker i ekte prosjekter."
    />
    <Kalkulator />
    <DemoSkjema
      tittel="Klar for en"
      uthevet="konkret pris?"
      lede="Fortell meg kort om bedriften, så får du en fast pris og en gratis demo før du bestemmer deg."
    />
    <FAQ
      tittel="Om kalkulatoren"
      uthevet="og prisen."
      lede="Det folk lurer på når de har sett tallet."
      sporsmal={faqKalkulator}
    />
  </Shell>
);

export default KalkulatorPage;
