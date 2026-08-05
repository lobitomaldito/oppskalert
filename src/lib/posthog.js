import posthog from 'posthog-js';

const token = import.meta.env.VITE_POSTHOG_TOKEN;

// scripts/prerender.mjs laster hver rute i en ekte Chromium for å ta
// HTML-snapshots. Uten dette flagget initialiserer posthog-js der som hos en
// vanlig besøkende og sporer byggmaskinen. I praksis lakk det lite, fordi
// page.close() rekker å drepe fanen før posthog-js får flushet køen sin,
// men det som slipper ut er både falske sidevisninger og byggfeil som
// $exception, og det er tilfeldig hvor mye. Prerenderen setter
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
