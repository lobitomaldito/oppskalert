import SEO from '../../components/SEO';
import { Shell } from '../../components/Layout';
import SammenlignDetalj from '../../components/SammenlignDetalj';
import { sammenlignWix } from '../../lib/site';
import FAQ from '../../components/FAQ';
import { lagFaqSchema } from '../../lib/site';
import { faqWix } from '../../lib/faq-sider';

const faqLd = lagFaqSchema(faqWix);

const VsWixPage = () => (
  <Shell>
    <SEO
      title="Meg vs. Wix"
      description="Bygge selv på Wix, eller få nettsiden bygget for deg? Pris over tid, eierskap, hastighet og tidsbruk sammenlignet."
      keywords={['wix eller webdesigner', 'wix alternativ norge', 'nettside wix vs skreddersydd']}
      canonical="https://oppskalert.no/sammenlign/wix"
    jsonLd={faqLd}
    />
    <SammenlignDetalj data={sammenlignWix} />
    <FAQ
      tittel="Om Wix"
      uthevet="spesifikt."
      lede="Ærlige svar, også der Wix er det riktige valget for deg."
      sporsmal={faqWix}
    />
  </Shell>
);

export default VsWixPage;
