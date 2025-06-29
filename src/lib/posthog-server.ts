// Server-side PostHog tracking utility
// Use this in API routes for server-side events

export async function trackServerEvent(
  eventName: string,
  properties: Record<string, string | number | boolean>,
  distinctId: string
) {
  const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_pOrjYw1KtfVfhxDpNbi9HZnY46I2Er1DyTTJeOSfoob';
  
  try {
    const response = await fetch('https://us.i.posthog.com/capture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        event: eventName,
        properties: {
          distinct_id: distinctId,
          ...properties,
        },
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Failed to track server event:', response.statusText);
    }
  } catch (error) {
    console.error('Error tracking server event:', error);
  }
}

// Example usage in API routes:
// trackServerEvent('email_stored_server', { email, source: 'waitlist' }, email); 