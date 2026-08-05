import { articles } from '../src/lib/articles.js';

/* Alt innhold er nå lokalt (src/lib/articles.js + src/content/generated/),
   så denne kunne i prinsippet vært generert ved build. Den blir stående som
   funksjon fordi den da alltid speiler artikkellisten uten et ekstra
   byggesteg å glemme. */
const SITE_URL = 'https://oppskalert.no';

// /eksempler/* er bevisst utelatt: de er fiktive demo-bedrifter (noindex via
// SEO.jsx), og skal derfor ikke stå i sitemapen — Googles egne retningslinjer
// sier en noindex'et URL ikke hører hjemme her.
const STATIC_PATHS = [
  '/', '/arbeid', '/priser', '/kalkulator', '/drift', '/sammenlign',
  '/sammenlign/wix', '/sammenlign/wordpress', '/sokemotoroptimalisering',
  '/webdesign-oslo', '/nettside-design', '/nettside-til-bedrift', '/lage-nettbutikk',
  '/metode', '/om', '/kontakt', '/blogg',
];

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));


export default async function handler(req, res) {
  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: null })),
    ...articles.map((a) => ({ loc: `${SITE_URL}/blogg/${a.slug}`, lastmod: a.publishDate })),
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
