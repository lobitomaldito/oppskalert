import { fetchOpinly } from '../_shared/opinly.js';

export default async function handler(req, res) {
  const { slug } = req.query;
  const upstream = await fetchOpinly('/content/post', { slug });
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  if (upstream.status === 404) {
    res.status(404).send('null');
    return;
  }
  const body = await upstream.text();
  res.status(upstream.status).send(body);
}
