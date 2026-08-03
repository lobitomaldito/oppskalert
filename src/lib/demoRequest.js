import { createClient } from '@supabase/supabase-js';

// Dedicated client for the public "Bestill demo" form. It is pinned to the
// "oppskalert" CRM project so the form works regardless of the main app's
// VITE_SUPABASE_URL. The anon key is public by design, and the
// demo_foresporsler table only allows INSERT for the anon role (RLS). There
// is no SELECT policy, so leads can be submitted but never read back.
const DEMO_SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';
const DEMO_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZWZ3a3FoZGFtZGNqbnh4ZmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjAzNjgsImV4cCI6MjA5NjgzNjM2OH0.U0flw1EqHTDpZBk9TwA0MT-HZ9nWeggXQaepA6mc9Kk';

// Eksportert så lib/analytics.js kan skrive til samme prosjekts
// analytics_events-tabell uten å duplisere anon-nøkkelen.
export const demoClient = createClient(DEMO_SUPABASE_URL, DEMO_SUPABASE_ANON_KEY);

// Optional e-mail notification. Set VITE_WEB3FORMS_KEY to your free Web3Forms
// access key (web3forms.com) to receive an e-mail at team@oppskalert.no for
// every request. If unset, the lead is still saved to Supabase.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

export async function submitDemoRequest({ navn, epost, firma, melding }) {
  const navnClean = navn.trim();
  const epostClean = epost.trim();
  const firmaClean = firma?.trim() || null;
  const meldingClean = melding?.trim() || null;

  const { error } = await demoClient.from('demo_foresporsler').insert([
    {
      navn: navnClean,
      epost: epostClean,
      firma: firmaClean,
      melding: meldingClean,
      kilde: 'nettside',
    },
  ]);

  if (error) throw error;

  // Best-effort e-mail notification. The lead is already stored, so a failed
  // e-mail must never break the submission.
  if (WEB3FORMS_KEY) {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Ny demo-forespørsel: ${navnClean}`,
          from_name: 'oppskalert.no',
          name: navnClean,
          email: epostClean,
          firma: firmaClean || '(ikke oppgitt)',
          message: `Ny demo-forespørsel fra nettsiden.\n\nNavn: ${navnClean}\nE-post: ${epostClean}\nFirma: ${firmaClean || '(ikke oppgitt)'}${meldingClean ? `\n\n${meldingClean}` : ''}`,
        }),
      });
    } catch {
      /* ignore: lead is safe in Supabase */
    }
  }
}
