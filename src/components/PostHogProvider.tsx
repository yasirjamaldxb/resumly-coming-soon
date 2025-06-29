'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_pOrjYw1KtfVfhxDpNbi9HZnY46I2Er1DyTTJeOSfoob'
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(POSTHOG_API_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
      })
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
} 