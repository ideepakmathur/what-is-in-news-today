'use client';

import React from 'react';
import { Newspaper, Sparkles, Volume2, Bell } from 'lucide-react';

interface HeaderProps {
  onOpenSubscribe: () => void;
  onOpenPro: () => void;
  onPlayDailyAudio: () => void;
  isPlayingAudio: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSubscribe,
  onOpenPro,
  onPlayDailyAudio,
  isPlayingAudio
}) => {
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Live status */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
                WhatIsIn<span className="text-blue-600 dark:text-blue-400">NewsToday</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {todayFormatted} • Verified AI Intelligence
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onPlayDailyAudio}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isPlayingAudio
                ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Volume2 className={`h-3.5 w-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>{isPlayingAudio ? 'Playing Briefing' : '60s Audio Brief'}</span>
          </button>

          <button
            onClick={onOpenSubscribe}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <Bell className="h-3.5 w-3.5" />
            <span>Daily Briefing</span>
          </button>

          <button
            onClick={onOpenPro}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all shadow-sm shadow-orange-500/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>PRO</span>
          </button>
        </div>
      </div>
    </header>
  );
};
