import posthog from 'posthog-js'

const token = import.meta.env.VITE_POSTHOG_TOKEN
const host = import.meta.env.VITE_POSTHOG_HOST
const isDevelopment = import.meta.env.DEV

if (!token) {
  if (isDevelopment) {
    throw new Error('VITE_POSTHOG_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_TOKEN is configured')
  }
} else if (!host) {
  if (isDevelopment) {
    throw new Error('VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured')
  }
} else {
  posthog.init(token, {
    api_host: host,
    capture_exceptions: true,
  })
}

export default posthog
