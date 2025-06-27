'use client';

import Logo from '@/components/Logo';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-6">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ATS-friendly
              </span>{' '}
              resume in minutes
            </h1>
            
            <p className="text-xl text-gray-600 mb-4 font-light">
              Beat the bots and reach real recruiters with Resumly.
            </p>
            
            <p className="text-lg text-gray-500 mb-12">
              Our smart formatting guarantees that your resume passes applicant tracking systems and gets noticed. Join the waitlist today.
            </p>
          </div>

          {/* Email Form */}
          <div className="mb-20">
            <EmailForm />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ATS Optimized</h3>
              <p className="text-gray-600 text-sm">Pass through applicant tracking systems with confidence</p>
            </div>
            
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Create professional resumes in just minutes</p>
            </div>
            
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Formatting</h3>
              <p className="text-gray-600 text-sm">AI-powered layout ensures maximum readability</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 mb-4">Follow us for updates</p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com/resumlyapp/" className="text-gray-400 hover:text-pink-500 transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.26 5.012.525a5.336 5.336 0 00-1.925 1.254A5.336 5.336 0 00.525 5.012C.26 5.52.082 6.094.048 7.041.013 7.989 0 8.396 0 12.017s.013 4.028.048 4.976c.034.947.212 1.521.477 2.029.263.78.61 1.44 1.254 1.925a5.336 5.336 0 001.925 1.254c.508.265 1.082.443 2.029.477.948.035 1.355.048 4.976.048s4.028-.013 4.976-.048c.947-.034 1.521-.212 2.029-.477a5.336 5.336 0 001.925-1.254 5.336 5.336 0 001.254-1.925c.265-.508.443-1.082.477-2.029.035-.948.048-1.355.048-4.976s-.013-4.028-.048-4.976c-.034-.947-.212-1.521-.477-2.029a5.336 5.336 0 00-1.254-1.925A5.336 5.336 0 0018.988.525c-.508-.265-1.082-.443-2.029-.477C16.011.013 15.604 0 12.017 0z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@resumlyapp" className="text-gray-400 hover:text-gray-900 transition-colors">
              <span className="sr-only">TikTok</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@ResumlyApp" className="text-gray-400 hover:text-red-500 transition-colors">
              <span className="sr-only">YouTube</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6">© 2025 Resumly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
