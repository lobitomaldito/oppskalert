const OPINLY_BASE = 'https://sdk.opinly.ai/v1';
const API_KEY = process.env.OPINLY_API_KEY || '';

// Delt av api/opinly/*.js (klient-proxy), sitemap.xml.js og rss.xml.js.
// Filnavn/mappe med understrek foran rutes ikke ut av Vercel, så denne
// blir ikke selv et endepunkt.
export async function fetchOpinly(path, params = {}) {
  const url = new URL(`${OPINLY_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
}
