import { articles } from '../src/lib/articles.js';
import { fetchOpinly } from './_shared/opinly.js';

// Statisk Vite-SPA uten server for de vanlige sidene, så sitemap må
// genereres on-demand her i stedet for ved build-tid — ellers blir den
// aldri oppdatert når Opinly publiserer noe nytt.
const SITE_URL = 'https://oppskalert.no';

// /eksempler/* er bevisst utelatt: de er fiktive demo-bedrifter (noindex via
// SEO.jsx), og skal derfor ikke stå i sitemapen — Googles egne retningslinjer
// sier en noindex'et URL ikke hører hjemme her.
const STATIC_PATHS = [
  '/', '/arbeid', '/priser', '/kalkulator', '/drift', '/sammenlign',
  '/sammenlign/wix', '/sammenlign/wordpress', '/sokemotoroptimalisering',
  '/metode', '/om', '/kontakt', '/blogg',
];

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

async function getOpinlyRoutes() {
  try {
    const res = await fetchOpinly('/content/routes');
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('sitemap: kunne ikke hente Opinly-ruter', err);
    return [];
  }
}

const opinlyPathFor = (route) => {
  switch (route.type) {
    case 'post': return `/blogg/${route.slug}`;
    case 'category': return `/blogg/kategori/${route.slug}`;
    case 'author': return `/blogg/forfatter/${route.slug}`;
    default: return null;
  }
};

export default async function handler(req, res) {
  const opinlyRoutes = await getOpinlyRoutes();

  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: null })),
    ...articles.map((a) => ({ loc: `${SITE_URL}/blogg/${a.slug}`, lastmod: a.publishDate })),
    ...opinlyRoutes
      .map((r) => ({ path: opinlyPathFor(r), lastmod: r.lastModified }))
      .filter((r) => r.path)
      .map((r) => ({ loc: `${SITE_URL}${r.path}`, lastmod: r.lastmod })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map((u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''}
  </url>`)
    .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(body);
}
