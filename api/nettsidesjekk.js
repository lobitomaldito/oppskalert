import { createHmac } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { rensDomene, sjekkNettside } from './_lib/nettsidesjekk.js';

// Den gratis nettsidesjekken (/gratis-nettsidesjekk). Tar imot et domene,
// henter forsiden og svarer med karakter og de sju målingene. Selve
// målingene og sperrene mot interne adresser ligger i _lib/nettsidesjekk.js.
//
// ponytail: hele svaret går til nettleseren, også punktene siden bare viser
// etter at navn og e-post er sendt. Den som åpner utviklerverktøyene kan lese
// dem uten skjemaet. Et eget kall for rapporten blir verdt det først hvis
// noen faktisk gjør det.

const SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';
const GRENSE_PER_TIME = 10;
// Tak for alle besøkende til sammen. Bots med mange IP-adresser kommer forbi
// grensen per IP, men ikke forbi denne, så antall hentinger og rader i basen
// kan aldri bli større enn dette per døgn. Når taket er nådd, får besøkende
// skjemaet for å få siden sjekket for hånd i stedet.
const GRENSE_PER_DOGN = 300;

// Spør Supabase om kallet slipper gjennom: 'ok', 'ip' eller 'dogn'
// (supabase/migrations/20261112130000_nettsidesjekk_slipp.sql). Feiler basen,
// stenges sjekken ('stengt'): en flom skal aldri gå rett gjennom fordi
// telleren er nede, og den besøkende får skjemaet i stedet.
async function slipper(req) {
  const nokkel = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!nokkel) {
    console.error('nettsidesjekk: SUPABASE_SERVICE_ROLE_KEY mangler, sjekken er stengt');
    return 'stengt';
  }
  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'ukjent').split(',')[0].trim();
  const ipHash = createHmac('sha256', nokkel).update(ip).digest('hex');
  const supabase = createClient(SUPABASE_URL, nokkel, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc('nettsidesjekk_slipp', {
    p_ip_hash: ipHash,
    p_per_time: GRENSE_PER_TIME,
    p_per_dogn: GRENSE_PER_DOGN,
  });
  if (error || !['ok', 'ip', 'dogn'].includes(data)) {
    console.error('nettsidesjekk: telleren svarte ikke, sjekken er stengt', error || data);
    return 'stengt';
  }
  if (data === 'dogn') console.error(`nettsidesjekk: døgntaket på ${GRENSE_PER_DOGN} er nådd`);
  return data;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ feil: 'bruk_post' });
    return;
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const domene = rensDomene(body.domene);
  if (!domene) {
    res.status(400).json({ feil: 'ugyldig' });
    return;
  }

  const slipp = await slipper(req);
  if (slipp === 'ip') {
    res.status(429).json({ feil: 'for_mange' });
    return;
  }
  if (slipp !== 'ok') {
    res.status(503).json({ feil: 'stengt', domene });
    return;
  }

  try {
    res.status(200).json(await sjekkNettside(domene));
  } catch (feil) {
    console.warn('nettsidesjekk: fikk ikke hentet', domene, feil.code || feil.message);
    res.status(422).json({ feil: 'ikke_hentet', domene });
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
