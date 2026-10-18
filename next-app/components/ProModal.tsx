'use client';

import React from 'react';
import { X, Check, Sparkles, Zap, MessageSquare, Shield, Clock } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRO_PERKS = [
  {
    icon: <MessageSquare className="h-4 w-4 text-amber-500" />,
    title: 'Daily WhatsApp / Telegram Briefing',
    desc: 'Receive your 60-second audio summary and 3 key bullets directly on your phone every morning at 7:00 AM.'
  },
  {
    icon: <Zap className="h-4 w-4 text-amber-500" />,
    title: 'Personalized Topic Radar',
    desc: 'Pick your specific interests (e.g., AI Agents, Semiconductor Fabs, Oncology, Clean Energy) and receive tailored digests.'
  },
  {
    icon: <Sparkles className="h-4 w-4 text-amber-500" />,
    title: 'Unlimited AI Q&A with Deep Grounding',
    desc: 'Ask complex multi-step questions, generate historical comparisons, and download cited reports.'
  },
  {
    icon: <Shield className="h-4 w-4 text-amber-500" />,
    title: '100% Ad-Free Experience',
    desc: 'A pure, distraction-free reading interface with zero display ads or third-party tracking.'
  }
];

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>WhatIsInNewsToday PRO</span>
          </div>
          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Stay ahead of 99% of people with personalized intelligence.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Engineered for founders, executives, investors, and forward-looking professionals.
          </p>
        </div>

        {/* Perks list */}
        <div className="space-y-4 mb-6">
          {PRO_PERKS.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/40 shrink-0">
                {perk.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{perk.title}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 p-4 mb-5">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Monthly Membership</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">$9</span>
              <span className="text-xs text-zinc-500">/ month</span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Cancel anytime with 1 click. Includes 14-day free trial.
          </p>
        </div>

        <button
          onClick={() => alert('Stripe checkout integration will be triggered with your connected Stripe account!')}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25"
        >
          Start 14-Day Free Trial
        </button>
      </div>
    </div>
  );
};
