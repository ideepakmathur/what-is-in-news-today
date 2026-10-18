'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Loader2, Calendar } from 'lucide-react';

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || `Subscribed to WhatIsInNewsToday ${frequency === 'weekly' ? 'Weekly' : 'Daily'} US Digest!`);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-indigo-950 to-zinc-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-indigo-900/40">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-600/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Curated US News • Verified Primary Sources</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            What is in US news today, delivered in 3 minutes.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 mb-6 leading-relaxed">
            Get the top 5 essential American developments, why they matter to your work and finances, plus the day's top viral reels.
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium">{message}</span>
              </div>
              <p className="text-xs text-zinc-400">
                You can manage preferences or opt out at any time via the <Link href="/unsubscribe" className="text-emerald-300 underline">unsubscribe button</Link>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              {/* Frequency Selector: Daily or Weekly */}
              <div className="inline-flex p-1 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 text-xs font-semibold mb-2">
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`px-4 py-1.5 rounded-xl transition-all ${
                    frequency === 'daily'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Daily 7:00 AM Digest
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`px-4 py-1.5 rounded-xl transition-all ${
                    frequency === 'weekly'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Weekly Sunday In-Depth
                </button>
              </div>

              {/* Email Input */}
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800/90 text-sm text-white placeholder:text-zinc-400 border border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 shrink-0 flex items-center justify-center gap-2"
                >
                  {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Subscribe Free</span>
                </button>
              </div>

              {status === 'error' && (
                <p className="text-xs text-rose-400 font-medium">{message}</p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
                  Zero spam
                </span>
                <span>•</span>
                <span>100% Free</span>
                <span>•</span>
                <Link href="/unsubscribe" className="text-zinc-400 hover:text-white underline underline-offset-2">
                  Unsubscribe anytime with 1 click
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
