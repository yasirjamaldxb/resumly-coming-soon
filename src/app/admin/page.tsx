'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{
    totalSubscribers: number;
    recentEmails: string[];
    isPersistent?: boolean;
    message?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchStats();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Authentication failed');
    }
  };

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch {
      setError('Failed to fetch statistics');
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to view subscriber statistics</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full px-6 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              style={{ backgroundColor: '#4667B0' }}
              className="w-full text-white font-semibold py-4 px-6 rounded-2xl text-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resumly Admin Dashboard</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
            >
              Logout
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading statistics...</p>
            </div>
          ) : stats ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="text-center">
                  <div 
                    className="text-6xl font-bold mb-2"
                    style={{ color: '#4667B0' }}
                  >
                    {stats.totalSubscribers}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Subscribers</h3>
                  <p className="text-gray-600">People waiting for Resumly launch</p>
                  
                  {/* Storage Status Indicator */}
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center justify-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          stats.isPersistent ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {stats.isPersistent ? 'Persistent Storage' : 'Temporary Storage'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {stats.isPersistent 
                        ? '✅ Data saved permanently' 
                        : '⚠️ Set up Vercel KV for persistence'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Signups</h3>
                <div className="space-y-2">
                  {stats.recentEmails.length > 0 ? (
                    stats.recentEmails.map((email, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 text-sm text-gray-700">
                        {email}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No recent signups</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load statistics</p>
              <button
                onClick={fetchStats}
                style={{ backgroundColor: '#4667B0' }}
                className="mt-4 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={fetchStats}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-all"
              >
                Refresh Data
              </button>
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-all"
              >
                View Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 