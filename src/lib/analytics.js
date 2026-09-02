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

// GA4-taggen ligger i index.html (G-ZK79YPLLX8), men fikk fram til nå bare
// sidevisninger. Google Ads kan ikke måle konverteringer selv uten en egen
// AW-tagg, så veien inn dit går via GA4: hendelsen sendes hit, markeres som
// nøkkelhendelse i GA4, og importeres som konvertering i Google Ads.
//
// Guarden er ikke pynt. `track()` kalles også under prerenderingen, og der
// finnes verken window eller gtag før taggen har rukket å laste.
function sendToGa4(event, properties) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', event, properties);
  } catch {
    /* GA4 skal aldri kunne velte et skjema som ellers ville gått gjennom */
  }
}

export function track(event, properties = {}) {
  posthog.capture(event, properties);
  logOwnEvent(event, properties);
  sendToGa4(event, properties);
}

// Identifiser bare når vi faktisk har fått e-posten fra brukeren, altså
// etter et innsendt skjema, aldri på gjetning. person_profiles er satt til
// 'identified_only' i posthog.js, så dette er punktet der en besøkende går
// fra anonym til en profil.
export function identify({ email, userId, ...traits } = {}) {
  if (!email) return;
  posthog.identify(userId || email, { email, ...traits });
}
