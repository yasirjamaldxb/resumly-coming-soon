'use client';

import Logo from '@/components/Logo';
import EmailForm from '@/components/EmailForm';
import SocialLinks from '@/components/SocialLinks';
import { useAnalytics } from '../hooks/usePostHog';
import { useEffect } from 'react';

export default function Home() {
  const { trackPageView, trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page view when component mounts
    trackPageView('landing_page');
    
    // Debug log to console (remove this in production)
    console.log('PostHog initialized - tracking landing page view');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="pt-6 sm:pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build your{' '}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #4667B0, #5a7bc0)' 
                }}
              >
                ATS-friendly
              </span>{' '}
              resume in minutes
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Resumly helps you create recruiter optimised resumes that sail through 
              applicant tracking systems and land you more interviews.
            </p>
          </div>

          {/* Email Form - Made Prominent */}
          <div className="mb-16 sm:mb-20">
            <EmailForm />
          </div>

          {/* Features Section */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-10 h-10" 
                  fill="none" 
                  stroke="#4667B0" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">ATS Optimized</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Built specifically to pass through applicant tracking systems used by recruiters
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-10 h-10" 
                  fill="none" 
                  stroke="#4667B0" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Create professional resumes in minutes, not hours. No design skills required
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-10 h-10" 
                  fill="none" 
                  stroke="#4667B0" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Smart Formatting</h3>
              <p className="text-sm sm:text-base text-gray-600">
                AI-powered suggestions ensure your experience is presented in the best way possible
              </p>
            </div>
          </div>

          {/* Social Links */}
          <SocialLinks />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © 2025 Resumly. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
