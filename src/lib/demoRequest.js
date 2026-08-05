import { createClient } from '@supabase/supabase-js';

// Klient for analytics_events, pinnet til "oppskalert"-prosjektet så
// sporingen virker uavhengig av appens VITE_SUPABASE_URL. Anon-nøkkelen er
// offentlig med vilje, og analytics_events har kun en INSERT-policy for
// anon-rollen, ingen SELECT.
//
// Demo-skjemaet skrev tidligere til demo_foresporsler herfra. Det er
// flyttet til api/demo-request.js: nøkkelen, tabellnavnet og feltnavnene
// ligger i bundlet, så bots fant PostgREST-endepunktet og skrev leads rett
// inn uten å åpne siden. Anon-INSERT på den tabellen stenges av
// supabase/migrations/20260805121000, som kjøres først etter at denne
// koden er deployet.
const DEMO_SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';
const DEMO_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZWZ3a3FoZGFtZGNqbnh4ZmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjAzNjgsImV4cCI6MjA5NjgzNjM2OH0.U0flw1EqHTDpZBk9TwA0MT-HZ9nWeggXQaepA6mc9Kk';

// Eksportert så lib/analytics.js kan skrive til samme prosjekts
// analytics_events-tabell uten å duplisere anon-nøkkelen.
//
// Auth-persistens er skrudd av: denne klienten gjør bare anonyme INSERT-kall
// og kaller aldri demoClient.auth.*, men uten dette starter GoTrueClient
// likevel opp sesjonshåndtering med Navigator Locks for token-refresh på
// tvers av faner. Med flere faner åpne kolliderer de om samme lock-navn og
// kaster en uhåndtert "Lock ... was released because another request stole
// it"-exception, fanget opp av PostHog error tracking i produksjon.
export const demoClient = createClient(DEMO_SUPABASE_URL, DEMO_SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

/**
 * Sender skjemaet til api/demo-request.js, som skriver til Supabase med
 * service-role-nøkkelen og sender e-postvarselet. `honeypot` og `msPaSkjema`
 * er botsignalene ruten vurderer: et felt ingen ekte bruker ser, og hvor
 * lenge skjemaet faktisk stod åpent.
 */
export async function submitDemoRequest({ navn, epost, firma, melding, honeypot, msPaSkjema }) {
  const res = await fetch('/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      navn: navn.trim(),
      epost: epost.trim(),
      firma: firma?.trim() || null,
      melding: melding?.trim() || null,
      nettadresse: honeypot || '',
      msPaSkjema,
    }),
  });

  if (!res.ok) {
    const detaljer = await res.json().catch(() => ({}));
    throw new Error(detaljer.error || `Innsending feilet (${res.status})`);
  }
}
