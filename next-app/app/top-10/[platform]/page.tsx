import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTop10ByPlatformAndDate } from '@/lib/db';
import { ArrowLeft, ExternalLink, Calendar, Flame, Zap, ArrowRight, Instagram, Video, Youtube, Search } from 'lucide-react';

interface PlatformPageProps {
  params: {
    platform: string;
  };
}

const PLATFORM_CONFIG: Record<string, { title: string; subtitle: string; icon: React.ReactNode; color: string }> = {
  instagram: {
    title: 'Top 10 Viral Instagram Reels Today',
    subtitle: 'The most viewed, shared, and influential Instagram reels in the US today.',
    icon: <Instagram className="h-6 w-6 text-pink-500" />,
    color: 'from-pink-600 to-purple-600'
  },
  tiktok: {
    title: 'Top 10 Viral TikTok Reels Today',
    subtitle: 'Breakout TikTok trends, viral formats, and high-engagement clips across the United States.',
    icon: <Video className="h-6 w-6 text-cyan-500" />,
    color: 'from-cyan-600 to-blue-600'
  },
  youtube: {
    title: 'Top 10 Viral YouTube Shorts Today',
    subtitle: 'Trending YouTube Shorts, viral engineering explainers, and entertainment videos.',
    icon: <Youtube className="h-6 w-6 text-red-500" />,
    color: 'from-red-600 to-orange-600'
  },
  trends: {
    title: 'Top 10 Highly & Moderately Searched Topics Today',
    subtitle: 'Real-time trending search queries on Google and X with breakout search velocity.',
    icon: <Search className="h-6 w-6 text-blue-500" />,
    color: 'from-blue-600 to-indigo-600'
  }
};

export async function generateMetadata({ params }: PlatformPageProps) {
  const config = PLATFORM_CONFIG[params.platform];
  if (!config) return { title: 'Top 10 | WhatIsInNewsToday' };
  return {
    title: `${config.title} | WhatIsInNewsToday`,
    description: config.subtitle
  };
}

export default function PlatformTop10Page({ params }: PlatformPageProps) {
  const config = PLATFORM_CONFIG[params.platform];
  if (!config) notFound();

  const { items, date, availableDates } = getTop10ByPlatformAndDate(params.platform);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/top-10" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            <span>All Platforms</span>
          </Link>
          <span className="font-bold text-base tracking-tight">
            WhatIsIn<span className="text-blue-600">NewsToday</span>
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Banner */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {config.icon}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Official Daily Ranking • {date}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
                {config.title}
              </h1>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mt-1">
            {config.subtitle}
          </p>
        </div>

        {/* Date / Archive Navigation Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Showing [Today]: <strong>{date}</strong></span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <span className="text-xs text-zinc-400 shrink-0">Past Archives:</span>
            {availableDates.slice(1).map(pastDate => (
              <Link
                key={pastDate}
                href={`/top-10/${params.platform}/${pastDate}`}
                className="text-xs px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 font-mono transition-colors shrink-0"
              >
                {pastDate}
              </Link>
            ))}
          </div>
        </div>

        {/* 1 to 10 Ranked List */}
        <div className="space-y-4 mb-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                {/* Rank Number Badge */}
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${
                  item.rank === 1
                    ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/30'
                    : item.rank === 2
                    ? 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200'
                    : item.rank === 3
                    ? 'bg-amber-700/80 text-white'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                }`}>
                  #{item.rank}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-xs text-zinc-500">{item.creator}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.views_or_volume}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      item.trend_level === 'high'
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                    }`}>
                      {item.trend_level === 'high' ? '🔥 Highly Viral' : '⚡ Moderately Searched'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* View Link */}
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors shrink-0 self-end sm:self-center"
              >
                <span>View on {params.platform.toUpperCase()}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
