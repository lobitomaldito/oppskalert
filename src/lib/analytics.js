import posthog from './posthog';
import { demoClient } from './demoRequest';

// Én kilde til sannhet for sporing. Alle event-kall går gjennom track()/
// identify() her i stedet for å ringe posthog eller window.opinly direkte,
// slik at Opinly kan sies opp senere uten å måtte grave i hver komponent.
// Hendelsene lagres også i din egen Supabase-tabell (analytics_events),
// så du beholder rådataene selv om du bytter eller dropper et av verktøyene.

const onOpinlyReady = (fn) => {
  if (typeof window === 'undefined') return;
  if (window.opinly) fn();
  else window.addEventListener('opinly:ready', fn, { once: true });
};

async function logOwnEvent(event, properties) {
  try {
    await demoClient.from('analytics_events').insert([
      {
        event,
        properties,
        path: typeof window !== 'undefined' ? window.location.pathname : null,
        anon_id: typeof window !== 'undefined' ? window.opinly?.anonId || null : null,
      },
    ]);
  } catch {
    /* egen datalagring skal aldri blokkere resten av sporingen */
  }
}

export function track(event, properties = {}) {
  posthog.capture(event, properties);
  onOpinlyReady(() => window.opinly.track(event, properties));
  logOwnEvent(event, properties);
}

// Opinly krever e-post og ignorerer kallet uten den, så vi identifiserer
// bare når vi faktisk har fått den fra brukeren (f.eks. etter et
// skjemainnsendt), aldri på gjetning.
export function identify({ email, userId, ...traits } = {}) {
  if (!email) return;
  posthog.identify(userId || email, { email, ...traits });
  onOpinlyReady(() => window.opinly.identify({ email, userId }));
}
