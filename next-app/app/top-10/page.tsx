import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, TrendingUp, Instagram, Video, Youtube, Search, ArrowRight, Calendar } from 'lucide-react';
import { getAllPlatformsSummary } from '@/lib/db';

export const metadata = {
  title: "Today's Top 10 Viral Reels & Search Trends | WhatIsInNewsToday",
  description: "Explore today's top 10 viral Instagram reels, TikTok trends, YouTube shorts, and Google search queries with historical daily archives."
};

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram Reels', icon: <Instagram className="h-5 w-5 text-pink-500" />, desc: 'Most viewed and shared US Instagram reels today', badge: 'Reels' },
  { id: 'tiktok', name: 'TikTok Viral', icon: <Video className="h-5 w-5 text-cyan-500" />, desc: 'Top trending US TikTok sounds, formats, and viral clips', badge: 'TikTok' },
  { id: 'youtube', name: 'YouTube Shorts', icon: <Youtube className="h-5 w-5 text-red-500" />, desc: 'Top 10 breakout YouTube Shorts and viral explainers', badge: 'Shorts' },
  { id: 'trends', name: 'Google & X Trends', icon: <Search className="h-5 w-5 text-blue-500" />, desc: 'Highly and moderately searched topics across the US', badge: 'Search' }
];

export default function Top10HubPage() {
  const summary = getAllPlatformsSummary();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Daily Wire</span>
          </Link>
          <span className="font-bold text-base tracking-tight">
            WhatIsIn<span className="text-blue-600">NewsToday</span> Top 10
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 mb-3">
            <Flame className="h-3.5 w-3.5" />
            <span>[Today] Social & Search Pulse</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Today's Top 10 Viral Hub
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Real-time rankings across Instagram Reels, TikTok, YouTube Shorts, and search trends. Past days are automatically archived.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {PLATFORMS.map(p => {
            const items = summary[p.id] || [];
            return (
              <div
                key={p.id}
                className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                        {p.icon}
                      </div>
                      <h2 className="text-xl font-bold">{p.name}</h2>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {p.badge}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
                    {p.desc}
                  </p>

                  {/* Top 3 Preview Items */}
                  <div className="space-y-2 mb-6">
                    {items.slice(0, 3).map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-xs"
                      >
                        <div className="flex items-center gap-2 overflow-hidden mr-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400 w-4">
                            #{it.rank}
                          </span>
                          <span className="truncate font-medium">{it.title}</span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                          {it.views_or_volume}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <Link
                    href={`/top-10/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>View Full Top 10 & Archives</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Updated Daily
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
