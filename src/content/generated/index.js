/* Register over automatgenererte artikler.
 *
 * Erstatter et tidligere `import.meta.glob`-oppslag. Globen er en
 * Vite-funksjon som blir borte når Vercel kjører api/sitemap.xml.js og
 * api/rss.xml.js som vanlig Node: da er `import.meta.glob` undefined,
 * modulen kaster ved import, og begge rutene svarer 500. Et vanlig
 * ESM-register leses likt av Vite og av Node.
 *
 * Generatoren legger til to linjer per ny artikkel: én import her øverst, og
 * én oppføring i arrayen under. Se content/BLOG-GENERATION.md.
 */

import webutviklerOslo from './webutvikler-oslo.js';
import norskDomene from './norsk-domene.js';
import utviklingNettside from './utvikling-nettside.js';
import googleMinBedrift from './google-min-bedrift.js';
import responsivNettside from './responsiv-nettside.js';
import hvordanLageNettside from './hvordan-lage-nettside.js';
import nettsideAi from './nettside-ai.js';
import hvaKosterNettside from './hva-koster-nettside.js';
import bytteNettside from './bytte-nettside.js';
import seoEllerGoogleAnnonser from './seo-eller-google-annonser.js';

export const generated = [webutviklerOslo, norskDomene, utviklingNettside, googleMinBedrift, responsivNettside, hvordanLageNettside, nettsideAi, hvaKosterNettside, bytteNettside, seoEllerGoogleAnnonser];
