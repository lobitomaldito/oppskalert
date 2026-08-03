import posthog from 'posthog-js';

const token = import.meta.env.VITE_POSTHOG_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_exceptions: true,
  });
}

export default posthog;
