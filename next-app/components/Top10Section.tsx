'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Instagram, Video, Youtube, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Top10Item } from '@/lib/types';

interface Top10SectionProps {
  initialSummary: Record<string, Top10Item[]>;
}

export const Top10Section: React.FC<Top10SectionProps> = ({ initialSummary }) => {
  const [activeTab, setActiveTab] = useState<'instagram' | 'tiktok' | 'youtube' | 'trends'>('instagram');

  const tabs = [
    { id: 'instagram', label: 'Instagram Reels', icon: <Instagram className="h-4 w-4 text-pink-500" /> },
    { id: 'tiktok', label: 'TikTok Viral', icon: <Video className="h-4 w-4 text-cyan-500" /> },
    { id: 'youtube', label: 'YouTube Shorts', icon: <Youtube className="h-4 w-4 text-red-500" /> },
    { id: 'trends', label: 'Search Trends', icon: <Search className="h-4 w-4 text-blue-500" /> }
  ] as const;

  const currentItems = initialSummary[activeTab] || [];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 my-12">
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                [Today] Social & Search Pulse
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Top 10 Viral Reels & Trends
            </h2>
          </div>

          <Link
            href="/top-10"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Explore All Platforms & Archives</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-zinc-100 dark:border-zinc-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top 5 Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {currentItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 flex flex-col justify-between hover:border-blue-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">#{item.rank}</span>
                  <span className="font-mono text-zinc-500 font-medium">{item.views_or_volume}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">{item.creator}</span>
                <a
                  href={item.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>View</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <Link
            href={`/top-10/${activeTab}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs sm:text-sm hover:bg-blue-100 transition-colors"
          >
            <span>View Full Top 10 {activeTab.toUpperCase()} Ranking & Archive</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
