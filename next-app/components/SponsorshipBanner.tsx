'use client';

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export const SponsorshipBanner: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-6">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 via-blue-50/20 to-zinc-50 dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 mt-0.5 shrink-0">
            Sponsor
          </span>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>NextGen Cloud Computing: Deploy Scalable AI Workloads at 50% Lower Cost</span>
              <ExternalLink className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Fast, carbon-neutral serverless GPU and CPU infrastructure trusted by 10,000+ developers worldwide.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <a
            href="mailto:sponsor@whatisinnewstoday.com?subject=Advertise%20on%20WhatIsInNewsToday"
            className="text-[11px] text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 underline underline-offset-2"
          >
            Advertise here
          </a>
          <a
            href="https://aws.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Claim $100 Credits
          </a>
        </div>
      </div>
    </div>
  );
};
