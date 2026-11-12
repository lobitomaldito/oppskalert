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
const TIME_MS = 60 * 60 * 1000;
const DOGN_MS = 24 * TIME_MS;

// Teller kall per IP i Supabase, slik at grensen gjelder på tvers av
// instansene. Feiler basen, slippes kallet gjennom: sperrene mot interne
// adresser gjelder uansett, og en ekte besøkende skal ikke stoppes av en
// databasefeil.
async function overGrensen(req) {
  const nokkel = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!nokkel) {
    console.error('nettsidesjekk: SUPABASE_SERVICE_ROLE_KEY mangler, ingen grense per IP');
    return false;
  }
  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'ukjent').split(',')[0].trim();
  const ipHash = createHmac('sha256', nokkel).update(ip).digest('hex');
  const supabase = createClient(SUPABASE_URL, nokkel, { auth: { persistSession: false } });
  const tabell = () => supabase.from('nettsidesjekk_kall');

  // Kallet skrives FØR det telles. Teller man først, slipper en bølge med
  // samtidige kall gjennom alle sammen, fordi ingen av dem rakk å skrive sin
  // rad. Slik ser hvert kall alle rader som ble skrevet før det talte, sitt
  // eget medregnet. Avviste kall teller også, så den som hamrer, blir stående.
  const skriv = await tabell().insert({ ip_hash: ipHash });
  if (skriv.error) {
    console.error('nettsidesjekk: kunne ikke lagre kallet', skriv.error);
    return false;
  }
  const [{ count, error }, rydd] = await Promise.all([
    tabell()
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', new Date(Date.now() - TIME_MS).toISOString()),
    tabell().delete().lt('created_at', new Date(Date.now() - DOGN_MS).toISOString()),
  ]);
  if (rydd.error) console.error('nettsidesjekk: kunne ikke rydde gamle kall', rydd.error);
  // En HEAD-forespørsel mot en tabell som mangler gir count null uten error.
  if (error || count === null) {
    console.error('nettsidesjekk: kunne ikke telle kall', error || 'count er null');
    return false;
  }
  return count > GRENSE_PER_TIME;
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

  if (await overGrensen(req)) {
    res.status(429).json({ feil: 'for_mange' });
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
