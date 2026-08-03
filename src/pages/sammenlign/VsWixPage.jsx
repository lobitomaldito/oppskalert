import SEO from '../../components/SEO';
import { Shell } from '../../components/Layout';
import SammenlignDetalj from '../../components/SammenlignDetalj';
import { sammenlignWix } from '../../lib/site';

const VsWixPage = () => (
  <Shell>
    <SEO
      title="Meg vs. Wix"
      description="Bygge selv på Wix, eller få nettsiden bygget for deg? Pris over tid, eierskap, hastighet og tidsbruk sammenlignet."
      keywords={['wix eller webdesigner', 'wix alternativ norge', 'nettside wix vs skreddersydd']}
      canonical="https://oppskalert.no/sammenlign/wix"
    />
    <SammenlignDetalj data={sammenlignWix} />
  </Shell>
);

export default VsWixPage;
