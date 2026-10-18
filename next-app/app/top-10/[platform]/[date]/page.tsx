import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTop10ByPlatformAndDate } from '@/lib/db';
import { ArrowLeft, ExternalLink, Calendar, History, ArrowRight } from 'lucide-react';

interface ArchivePageProps {
  params: {
    platform: string;
    date: string;
  };
}

export async function generateMetadata({ params }: ArchivePageProps) {
  return {
    title: `Top 10 ${params.platform.toUpperCase()} Archive (${params.date}) | WhatIsInNewsToday`,
    description: `Historical Top 10 viral ranking for ${params.platform} on ${params.date}.`
  };
}

export default function PlatformDateArchivePage({ params }: ArchivePageProps) {
  const { items, date, availableDates } = getTop10ByPlatformAndDate(params.platform, params.date);

  if (!items || items.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/top-10/${params.platform}`} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            <span>Today's {params.platform.toUpperCase()}</span>
          </Link>
          <span className="font-bold text-base tracking-tight">
            WhatIsIn<span className="text-blue-600">NewsToday</span> Archive
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 mb-3">
            <History className="h-3.5 w-3.5" />
            <span>Permanent Daily Archive</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
            Top 10 {params.platform.toUpperCase()} — {params.date}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Historical rankings captured and permanently indexed for {params.date}.
          </p>
        </div>

        {/* Date Selector Navigation */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Archive Date: <strong>{params.date}</strong></span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Link
              href={`/top-10/${params.platform}`}
              className="text-xs px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold"
            >
              Back to Today's Live Top 10
            </Link>
          </div>
        </div>

        {/* Ranked Items */}
        <div className="space-y-4 mb-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-sm text-zinc-700 dark:text-zinc-300 shrink-0">
                  #{item.rank}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 text-xs text-zinc-500">
                    <span className="font-semibold">{item.creator}</span>
                    <span>•</span>
                    <span className="font-mono text-blue-600">{item.views_or_volume}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline shrink-0"
              >
                <span>View archived item</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
