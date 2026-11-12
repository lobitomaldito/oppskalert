// PostHog lastes etter at siden er ferdig lastet, ikke i hovedbunten (12.11.2026).
// posthog-js var 234 kB kildekode i index-bunten og ble lastet og kjørt før
// noen side kunne tegnes. Siden React bygger den prerendrede siden på nytt når
// bunten har kjørt, skjøv det LCP på hver side. Hendelser som kommer før PostHog
// er klar, venter på løftet under og sendes når det løses.
//
// scripts/prerender.mjs laster hver rute i en ekte Chromium for å ta
// HTML-snapshots. Uten flagget under initialiserer posthog-js der som hos en
// vanlig besøkende og sporer byggmaskinen. Prerenderen setter
// window.__PRERENDER__ før noe sidescript kjører.

const token = import.meta.env.VITE_POSTHOG_TOKEN;
const erPrerender = typeof window !== 'undefined' && window.__PRERENDER__ === true;

let instans = null;
let lofte = null;

const nar = (fn) => {
  if (document.readyState === 'complete') setTimeout(fn, 0);
  else window.addEventListener('load', fn, { once: true });
};

/** Gir PostHog-instansen når den er lastet, eller null når den ikke skal lastes. */
export function hentPosthog() {
  if (!token || erPrerender || typeof window === 'undefined') return Promise.resolve(null);
  if (!lofte) {
    lofte = new Promise((ok) => nar(ok))
      .then(() => import('posthog-js'))
      .then(({ default: posthog }) => {
        posthog.init(token, {
          api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
          person_profiles: 'identified_only',
          capture_exceptions: true,
        });
        instans = posthog;
        return posthog;
      })
      .catch(() => null);
  }
  return lofte;
}

/** Instansen hvis den allerede er lastet, ellers null. Blokkerer aldri. */
export const posthogNa = () => instans;

hentPosthog();
