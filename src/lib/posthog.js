import posthog from 'posthog-js';

const token = import.meta.env.VITE_POSTHOG_TOKEN;

// scripts/prerender.mjs laster hver rute i en ekte Chromium for å ta
// HTML-snapshots. Uten dette flagget initialiserer posthog-js der som hos en
// vanlig besøkende, og hvert bygg sendte 25 falske sidevisninger (og
// eventuelle byggfeil som $exception) inn i analytics. Prerenderen setter
// window.__PRERENDER__ før noe sidescript kjører.
const erPrerender = typeof window !== 'undefined' && window.__PRERENDER__ === true;

if (token && !erPrerender) {
  posthog.init(token, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_exceptions: true,
  });
}

export default posthog;
