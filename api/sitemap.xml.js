import { articles } from '../src/lib/articles.js';
import { caser } from '../src/lib/demo-innhold.js';
import { populaereSok } from '../src/lib/populaere-sok.js';
import { ordliste } from '../src/lib/ordliste.js';

/* Alt innhold er nå lokalt (src/lib/articles.js + src/content/generated/),
   så denne kunne i prinsippet vært generert ved build. Den blir stående som
   funksjon fordi den da alltid speiler artikkellisten uten et ekstra
   byggesteg å glemme. */
const SITE_URL = 'https://oppskalert.no';

// /eksempler/* er bevisst utelatt: de er fiktive demo-bedrifter (noindex via
// SEO.jsx), og skal derfor ikke stå i sitemapen — Googles egne retningslinjer
// sier en noindex'et URL ikke hører hjemme her.
const STATIC_PATHS = [
  '/', '/arbeid', '/priser', '/drift', '/vanlige-sporsmal',
  '/sammenlign',
  ...populaereSok.map((s) => `/vanlige-sporsmal/${s.slug}`),
  '/ordliste',
  ...ordliste.map((o) => `/ordliste/${o.slug}`),
  '/sammenlign/wix', '/sammenlign/wordpress', '/sokemotoroptimalisering',
  '/webdesign-oslo', '/nettside-design', '/nettside-til-bedrift', '/ny-nettside', '/lage-nettbutikk',
  '/metode', '/om', '/kontakt', '/blogg', '/personvern',
  ...caser.map((c) => `/arbeid/${c.slug}`),
];

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));


export default async function handler(req, res) {
  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: null })),
    /* SEO-rutinen 26. okt 2026: lastmod var alltid publishDate. Artikkelen
       /blogg/hvordan-lage-nettside ble skrevet om 28. sep, men sitemapen sa
       fortsatt 13. aug, og GSC viste sist crawlet 14. aug. Fire uker etter
       omskrivingen fikk FAQ-siden 147 av 162 visninger på «lage nettside»
       (pos 50,8), artikkelen 2. Google hadde aldri sett de fem stegene. */
    ...articles.map((a) => ({ loc: `${SITE_URL}/blogg/${a.slug}`, lastmod: a.updatedDate || a.publishDate })),
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
