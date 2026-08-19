import SEO from '../../components/SEO';
import { Shell } from '../../components/Layout';
import SammenlignDetalj from '../../components/SammenlignDetalj';
import { sammenlignWordpress } from '../../lib/site';
import FAQ from '../../components/FAQ';
import { lagFaqSchema } from '../../lib/site';
import { faqWordPress } from '../../lib/faq-sider';

const faqLd = lagFaqSchema(faqWordPress);

const VsWordPressPage = () => (
  <Shell>
    <SEO
      title="Meg vs. WordPress"
      description="Fleksibelt, men hvem vedlikeholder det? Sikkerhet, plugin-oppdateringer og hva WordPress faktisk koster over tid, sammenlignet."
      keywords={['wordpress eller webdesigner', 'wordpress alternativ norge', 'wordpress vs skreddersydd nettside']}
      canonical="https://oppskalert.no/sammenlign/wordpress"
    jsonLd={faqLd}
    />
    <SammenlignDetalj data={sammenlignWordpress} />
    <FAQ
      tittel="Om WordPress"
      uthevet="spesifikt."
      lede="Ærlige svar, også der WordPress er det riktige valget for deg."
      sporsmal={faqWordPress}
    />
  </Shell>
);

export default VsWordPressPage;
