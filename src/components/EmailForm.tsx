'use client';

import { useState } from 'react';
import { useAnalytics } from '../hooks/usePostHog';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { trackEmailSubmission, trackEvent } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        trackEmailSubmission(email);
        console.log('Successfully subscribed:', email);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        trackEvent('waitlist_signup_failed', { email, error: data.error });
        console.error('Subscription failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      trackEvent('waitlist_signup_network_error', { email, error: String(error) });
      setError('Network error. Please check your connection and try again.');
    }
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center p-6 sm:p-8 bg-green-50 rounded-3xl border border-green-200 shadow-lg">
          <div className="text-green-600 text-4xl sm:text-5xl mb-4">✓</div>
          <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">You&apos;re on the list!</h3>
          <p className="text-sm sm:text-base text-green-600">We&apos;ll notify you when Resumly launches.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h3>
          <p className="text-sm sm:text-base text-gray-600">Be the first to access Resumly when we launch</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: '#4667B0' }}
            className="w-full text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 text-center mt-4">
          No spam, unsubscribe at any time.
        </p>
      </form>
    </div>
  );
} 