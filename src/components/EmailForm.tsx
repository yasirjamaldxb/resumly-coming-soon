'use client';

import { useState } from 'react';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
        <p className="text-green-600 font-medium">Thank you! We'll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          style={{ backgroundColor: '#4667B0' }}
          className="text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          Join Waitlist
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        No spam. Only launch updates.
      </p>
    </form>
  );
} 