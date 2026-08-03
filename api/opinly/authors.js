import { fetchOpinly } from '../_shared/opinly.js';

// Håndterer både listen (/content/authors) og enkeltforfatter
// (/content/authors/{slug}) via valgfri ?slug=, så klienten trenger bare
// ett endepunkt å forholde seg til.
export default async function handler(req, res) {
  const { slug } = req.query;
  const upstream = slug
    ? await fetchOpinly(`/content/authors/${encodeURIComponent(slug)}`)
    : await fetchOpinly('/content/authors');
  const body = await upstream.text();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.status(upstream.status).send(body);
}
