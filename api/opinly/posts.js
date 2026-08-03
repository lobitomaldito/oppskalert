import { fetchOpinly } from '../_shared/opinly.js';

export default async function handler(req, res) {
  const { limit = 12, cursor, category, author, sort = 'newest' } = req.query;
  const upstream = await fetchOpinly('/content/posts', { limit, cursor, category, author, sort });
  const body = await upstream.text();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(upstream.status).send(body);
}
