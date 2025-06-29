import { usePostHog } from 'posthog-js/react'

export function useAnalytics() {
  const posthog = usePostHog()

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    posthog?.capture(eventName, properties)
  }

  const identifyUser = (userId: string, properties?: Record<string, any>) => {
    posthog?.identify(userId, properties)
  }

  const trackPageView = (pageName: string) => {
    posthog?.capture('$pageview', { page: pageName })
  }

  const trackEmailSubmission = (email: string) => {
    posthog?.capture('waitlist_signup', { email })
  }

  return {
    trackEvent,
    identifyUser,
    trackPageView,
    trackEmailSubmission,
  }
} 