import { Webhook } from 'svix';

// Vercel parser JSON-body automatisk som standard, men Svix-verifisering
// krever de eksakte, urørte byte'ene som ble signert — derfor skrur vi av
// den innebygde parseren og leser raw body selv.
export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const secret = process.env.SVIX_WEBHOOK_SECRET;
  if (!secret) {
    console.error('opinly-webhook: SVIX_WEBHOOK_SECRET er ikke satt');
    res.status(500).send('Webhook secret mangler');
    return;
  }

  const rawBody = await getRawBody(req);

  let event;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(rawBody, {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });
  } catch (err) {
    console.error('opinly-webhook: ugyldig signatur', err.message);
    res.status(400).send('Ugyldig signatur');
    return;
  }

  // Appen er en statisk SPA uten server-cache å invalidere: sidene henter
  // alltid ferskt Opinly-innhold direkte ved neste sidevisning. Loggen her
  // er bare for synlighet i Vercel-loggene, ikke for å trigge noe.
  if (event.type === 'content.paths-invalidated') {
    console.log('opinly-webhook: paths publisert/oppdatert', event.data?.paths);
  }

  res.status(200).send('OK');
}
