'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Mail, ShieldAlert, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const tokenParam = searchParams.get('token') || '';

  const [email, setEmail] = useState(emailParam);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Auto-fill or trigger if token or email in URL
  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleUnsubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email && !tokenParam) {
      setStatus('error');
      setMessage('Please enter your email address to unsubscribe.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: tokenParam })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You have been successfully unsubscribed.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to unsubscribe. Please verify your email.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to WhatIsInNewsToday.com</span>
          </Link>
          <span className="font-bold text-sm">Email Preferences</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center">
          <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 mx-auto mb-4">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black mb-2">
            Unsubscribe from Daily Briefing
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            We are sorry to see you go. Enter your email below to opt out of WhatIsInNewsToday digest emails in 1 click.
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500" />
              <p className="text-sm font-semibold">{message}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                You will no longer receive digest emails from WhatIsInNewsToday.com.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-block px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <div className="text-left">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Confirm your email address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:border-blue-500"
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <p className="text-xs text-rose-500 font-medium text-left">{message}</p>
              )}

              {/* Less frequent option */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-left text-xs">
                <span className="font-bold text-blue-800 dark:text-blue-300 block mb-0.5">
                  Too many emails?
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  You can switch to our <strong>Weekly Sunday Digest</strong> instead of fully unsubscribing.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Confirm Unsubscribe</span>
                </button>

                <Link
                  href="/"
                  className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel and Keep Subscription
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
