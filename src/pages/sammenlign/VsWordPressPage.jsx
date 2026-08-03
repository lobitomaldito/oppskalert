import SEO from '../../components/SEO';
import { Shell } from '../../components/Layout';
import SammenlignDetalj from '../../components/SammenlignDetalj';
import { sammenlignWordpress } from '../../lib/site';

const VsWordPressPage = () => (
  <Shell>
    <SEO
      title="Meg vs. WordPress"
      description="Fleksibelt, men hvem vedlikeholder det? Sikkerhet, plugin-oppdateringer og hva WordPress faktisk koster over tid, sammenlignet."
      keywords={['wordpress eller webdesigner', 'wordpress alternativ norge', 'wordpress vs skreddersydd nettside']}
      canonical="https://oppskalert.no/sammenlign/wordpress"
    />
    <SammenlignDetalj data={sammenlignWordpress} />
  </Shell>
);

export default VsWordPressPage;
