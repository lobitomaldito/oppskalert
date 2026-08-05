import posthog from './posthog';
import { demoClient } from './demoRequest';

// Én kilde til sannhet for sporing. Alle event-kall går gjennom track()/
// identify() her i stedet for å ringe posthog direkte, så et bytte av
// verktøy blir én endring i denne filen og ikke en gjennomgang av hver
// komponent. Det var nettopp denne innkapslingen som gjorde at Opinly kunne
// fjernes uten å røre en eneste komponent.
//
// Hendelsene lagres også i din egen Supabase-tabell (analytics_events),
// så du beholder rådataene selv om du bytter eller dropper PostHog.

// anon_id kom tidligere fra Opinly-pikselen. PostHogs distinct id gjør samme
// nytte og lever så lenge PostHog gjør. Kallet er pakket inn fordi det kaster
// hvis posthog.init() aldri kjørte (mangler token, eller prerender).
const anonId = () => {
  try {
    return posthog.get_distinct_id() || null;
  } catch {
    return null;
  }
};

async function logOwnEvent(event, properties) {
  try {
    await demoClient.from('analytics_events').insert([
      {
        event,
        properties,
        path: typeof window !== 'undefined' ? window.location.pathname : null,
        anon_id: anonId(),
      },
    ]);
  } catch {
    /* egen datalagring skal aldri blokkere resten av sporingen */
  }
}

export function track(event, properties = {}) {
  posthog.capture(event, properties);
  logOwnEvent(event, properties);
}

// Identifiser bare når vi faktisk har fått e-posten fra brukeren, altså
// etter et innsendt skjema, aldri på gjetning. person_profiles er satt til
// 'identified_only' i posthog.js, så dette er punktet der en besøkende går
// fra anonym til en profil.
export function identify({ email, userId, ...traits } = {}) {
  if (!email) return;
  posthog.identify(userId || email, { email, ...traits });
}
