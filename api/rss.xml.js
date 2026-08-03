import { articles } from '../src/lib/articles.js';
import { fetchOpinly } from './_shared/opinly.js';

const SITE_URL = 'https://oppskalert.no';

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

async function getOpinlyRssItems(limit = 20) {
  try {
    const res = await fetchOpinly('/content/rss', { limit });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('rss: kunne ikke hente Opinly-poster', err);
    return [];
  }
}

export default async function handler(req, res) {
  const opinlyItems = await getOpinlyRssItems(20);

  const items = [
    ...articles.map((a) => ({
      title: a.title,
      link: `${SITE_URL}/blogg/${a.slug}`,
      description: a.description,
      pubDate: new Date(a.publishDate).toUTCString(),
    })),
    ...opinlyItems.map((item) => ({
      title: item.title,
      link: `${SITE_URL}/blogg/${item.slug}`,
      description: item.description,
      pubDate: new Date(item.date).toUTCString(),
    })),
  ].sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Oppskalert Blogg</title>
    <link>${SITE_URL}/blogg</link>
    <description>Konkret kunnskap om nettsider, konvertering og digital vekst for norske bedrifter.</description>
    <language>nb-NO</language>
${items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.link)}</guid>
      <description>${escapeXml(item.description || '')}</description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
    )
    .join('\n')}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(body);
}
