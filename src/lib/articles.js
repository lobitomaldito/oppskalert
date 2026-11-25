import { generated } from '../content/generated/index.js';
import handwritten from '../content/handskrevne.js';


// Automatgenererte artikler bor i egne filer under src/content/generated/,
// én fil per post, så en ukentlig kjøring bare legger til en ny fil og én
// linje i registeret i stedet for å redigere denne matrisen (unngår
// merge-konflikter og risikoen for å ødelegge et 100+ linjer JS-literal ved
// et script-uhell). Registeret er et vanlig ESM-modul, ikke import.meta.glob,
// fordi api/sitemap.xml.js og api/rss.xml.js importerer denne filen og kjører
// i Node på Vercel der globen ikke finnes. Se content/BLOG-GENERATION.md.

export const articles = [...handwritten, ...generated].sort(
  (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
);

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null;
}

// Klyngene og «Les også» bor i ./klynger.js, så sider som bare trenger dem
// slipper å laste brødteksten i alle innlegg.
export { klynger } from './klynger.js';
import { lesOgsa as lesOgsaFra } from './klynger.js';
export const lesOgsa = (article, antall = 3) => lesOgsaFra(article, articles, antall);
