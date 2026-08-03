import { fetchOpinly } from '../_shared/opinly.js';

export default async function handler(req, res) {
  const upstream = await fetchOpinly('/content/categories');
  const body = await upstream.text();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.status(upstream.status).send(body);
}
