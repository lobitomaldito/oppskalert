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
import hjemmesiderForSmaBedrifter from './hjemmesider-for-sma-bedrifter.js';

import aiAgenterSmabedrift from './ai-agenter-smabedrift.js';
import aiISosialeMedier from './ai-i-sosiale-medier.js';
import aiOversikterGoogle from './ai-oversikter-google.js';
import alternativerTilWordpress from './alternativer-til-wordpress.js';
import cookieBannerNettside from './cookie-banner-nettside.js';
import designOkerSalget from './design-oker-salget.js';
import designSomGirKunder from './design-som-gir-kunder.js';
import girNettsidenKunder from './gir-nettsiden-kunder.js';
import grafiskProfil from './grafisk-profil.js';
import hvaKosterGoogleAds from './hva-koster-google-ads.js';
import hvaKosterSeo from './hva-koster-seo.js';
import hvorLangTidTarNettside from './hvor-lang-tid-tar-nettside.js';
import lageLogoSelv from './lage-logo-selv.js';
import landingssideForAnnonser from './landingsside-for-annonser.js';
import logoFargerTypografi from './logo-farger-typografi.js';
import markedsforingSosialeMedier from './markedsforing-sosiale-medier.js';
import moderneNettside from './moderne-nettside.js';
import nyNettsideUtenAMisteGoogle from './ny-nettside-uten-a-miste-google.js';
import pagespeedScoreForklart from './pagespeed-score-forklart.js';
import reklameIChatgpt from './reklame-i-chatgpt.js';
import remarketing from './remarketing.js';
import seoForSmabedrifter from './seo-for-smabedrifter.js';
import seoOptimalisertNettside from './seo-optimalisert-nettside.js';
import sokeordsanalyse from './sokeordsanalyse.js';
import synligIChatgpt from './synlig-i-chatgpt.js';
import synligIGoogle from './synlig-i-google.js';
import taMerkevarenPaAlvor from './ta-merkevaren-pa-alvor.js';
import tekniskSeo from './teknisk-seo.js';
import tidPaSosialeMedier from './tid-pa-sosiale-medier.js';
import tregNettside from './treg-nettside.js';
import vanligeFeilPaNettsider from './vanlige-feil-pa-nettsider.js';
import vedlikeholdAvNettside from './vedlikehold-av-nettside.js';
import velgePubliseringsverktoy from './velge-publiseringsverktoy.js';
import wordpressHacket from './wordpress-hacket.js';
import lageNettsideGratis from './lage-nettside-gratis.js';
import lonnerSeoSeg from './lonner-seo-seg.js';
import seoOgGeo from './seo-og-geo.js';
import hvaKosterNettsideIManeden from './hva-koster-nettside-i-maneden.js';

export const generated = [webutviklerOslo, norskDomene, utviklingNettside, googleMinBedrift, responsivNettside, hvordanLageNettside, nettsideAi, hvaKosterNettside, bytteNettside, seoEllerGoogleAnnonser, hjemmesiderForSmaBedrifter, aiAgenterSmabedrift, aiISosialeMedier, aiOversikterGoogle, alternativerTilWordpress, cookieBannerNettside, designOkerSalget, designSomGirKunder, girNettsidenKunder, grafiskProfil, hvaKosterGoogleAds, hvaKosterSeo, hvorLangTidTarNettside, lageLogoSelv, landingssideForAnnonser, logoFargerTypografi, markedsforingSosialeMedier, moderneNettside, nyNettsideUtenAMisteGoogle, pagespeedScoreForklart, reklameIChatgpt, remarketing, seoForSmabedrifter, seoOptimalisertNettside, sokeordsanalyse, synligIChatgpt, synligIGoogle, taMerkevarenPaAlvor, tekniskSeo, tidPaSosialeMedier, tregNettside, vanligeFeilPaNettsider, vedlikeholdAvNettside, velgePubliseringsverktoy, wordpressHacket, lageNettsideGratis, lonnerSeoSeg, seoOgGeo, hvaKosterNettsideIManeden];
