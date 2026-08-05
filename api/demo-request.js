import { createClient } from '@supabase/supabase-js';
import { spamGrunn } from './_lib/spam.js';

// Innsendingen lå tidligere i klienten og skrev rett på PostgREST med
// anon-nøkkelen. Både nøkkelen, tabellnavnet og feltnavnene ligger i
// JS-bundlet, så bots fant endepunktet og POStet forbi skjemaet: radene de
// la igjen hadde alltid melding = null og utløste aldri
// demo_request_submitted. Nå er anon-INSERT fjernet fra tabellen (se
// supabase/migrations/), og denne ruten er eneste vei inn.
const SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';

const EPOST_MONSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const tekst = (verdi, maks) => {
  if (typeof verdi !== 'string') return null;
  const rent = verdi.trim();
  if (!rent) return null;
  return rent.slice(0, maks);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Bruk POST' });
    return;
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  const navn = tekst(body.navn, 120);
  const epost = tekst(body.epost, 200);
  const firma = tekst(body.firma, 200);
  const melding = tekst(body.melding, 2000);

  if (!navn || !epost || !EPOST_MONSTER.test(epost)) {
    res.status(400).json({ error: 'Navn og en gyldig e-post må fylles ut' });
    return;
  }

  const grunn = spamGrunn({
    navn,
    epost,
    firma,
    melding,
    honeypot: tekst(body.nettadresse, 200),
    msPaSkjema: typeof body.msPaSkjema === 'number' ? body.msPaSkjema : undefined,
  });

  // Sjekkes etter valideringen, slik at et ugyldig skjema svarer 400 og ikke
  // maskeres av en konfigurasjonsfeil.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error('demo-request: SUPABASE_SERVICE_ROLE_KEY er ikke satt');
    res.status(500).json({ error: 'Kunne ikke ta imot skjemaet' });
    return;
  }

  const supabase = createClient(SUPABASE_URL, serviceKey);
  const { error } = await supabase.from('demo_foresporsler').insert([
    {
      navn,
      epost,
      firma,
      melding,
      kilde: 'nettside',
      // Mistenkelige innsendinger lagres, de merkes bare. Ingen ekte
      // henvendelse skal kunne gå tapt fordi en heuristikk bommet, og
      // dashbordet kan vise dem bak «vis skjulte».
      status: grunn ? 'spam' : 'ny',
      spam_grunn: grunn,
    },
  ]);

  if (error) {
    console.error('demo-request: kunne ikke lagre henvendelse', error);
    res.status(500).json({ error: 'Kunne ikke lagre henvendelsen' });
    return;
  }

  // E-postvarselet flyttet hit sammen med innsendingen. Det gir to ting:
  // Web3Forms-nøkkelen er ikke lenger offentlig i klientbundlet, og
  // spam-merkede henvendelser lager ikke lenger et varsel i innboksen din.
  const web3FormsKey = process.env.WEB3FORMS_KEY || process.env.VITE_WEB3FORMS_KEY;
  if (web3FormsKey && !grunn) {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `Ny demo-forespørsel: ${navn}`,
          from_name: 'oppskalert.no',
          name: navn,
          email: epost,
          firma: firma || '(ikke oppgitt)',
          message: `Ny demo-forespørsel fra nettsiden.\n\nNavn: ${navn}\nE-post: ${epost}\nFirma: ${firma || '(ikke oppgitt)'}${melding ? `\n\n${melding}` : ''}`,
        }),
      });
    } catch (err) {
      /* henvendelsen ligger trygt i Supabase, et feilet varsel skal ikke feile kallet */
      console.error('demo-request: e-postvarsel feilet', err);
    }
  }

  // Samme svar uansett om innsendingen ble merket som spam, slik at en bot
  // ikke får vite at den ble tatt og kan justere seg rundt filteret.
  res.status(200).json({ ok: true });
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
