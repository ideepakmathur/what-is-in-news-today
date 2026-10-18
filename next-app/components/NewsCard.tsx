'use client';

import React, { useState } from 'react';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';
import { ExternalLink, Clock, Volume2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  onAskAboutStory: (title: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onAskAboutStory }) => {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${item.title}. Key takeaways: ${item.summaryBullets.join('. ')}. Why it matters: ${item.whyItMatters}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const storyPermalink = item.slug ? `/news/${item.slug}` : `/news/${item.id}`;

  return (
    <article className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Category & Time Meta */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60">
              {item.category} • US
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Clock className="h-3 w-3" />
              {item.publishedAt}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isPlaying
                  ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
                  : 'text-zinc-500 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title="Listen to story"
            >
              <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse text-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title linking to its individual permalink page */}
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          <Link href={storyPermalink} className="hover:underline">
            {item.title}
          </Link>
        </h3>

        {/* 3-Bullet Summary */}
        <div className="space-y-2 mb-4">
          {item.summaryBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {/* "Why It Matters" Callout */}
        <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl p-3 sm:p-3.5 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-1.5">
            <span>💡 Why It Matters</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
            {item.whyItMatters}
          </p>
        </div>

        {/* Expandable Perspectives & Debate */}
        {expanded && (
          <div className="mb-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-3 animate-in fade-in duration-200">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                Consensus View
              </h4>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">
                {item.perspectives.consensus}
              </p>
            </div>
            {item.perspectives.divergence && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Divergent / Counter View
                </h4>
                <p className="text-xs text-zinc-700 dark:text-zinc-300">
                  {item.perspectives.divergence}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer info & interactive options */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {item.source}
          </span>
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-500">{item.readTimeMinutes} min read</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>{expanded ? 'Less context' : 'Debate view'}</span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          <Link
            href={storyPermalink}
            className="inline-flex items-center gap-1 text-blue-600 font-semibold py-1 px-2 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
          >
            <span>Permalink</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
};
