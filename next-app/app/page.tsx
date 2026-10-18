'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { AskNewsBar } from '@/components/AskNewsBar';
import { AiAnswerCard } from '@/components/AiAnswerCard';
import { CategoryTabs } from '@/components/CategoryTabs';
import { NewsCard } from '@/components/NewsCard';
import { Top10Section } from '@/components/Top10Section';
import { NewsletterBox } from '@/components/NewsletterBox';
import { SponsorshipBanner } from '@/components/SponsorshipBanner';
import { AudioBriefingPlayer } from '@/components/AudioBriefingPlayer';
import { ProModal } from '@/components/ProModal';
import { ChatBot } from '@/components/ChatBot';
import { RealtimeNotifier } from '@/components/RealtimeNotifier';
import { INITIAL_NEWS_ITEMS } from '@/lib/newsData';
import { Category, AiNewsAnswer, NewsItem, Top10Item } from '@/lib/types';
import { Shield, Compass, BookOpen, Heart, Flame } from 'lucide-react';
import Link from 'next/link';

// Initial Top 10 Summary
const INITIAL_TOP10_SUMMARY: Record<string, Top10Item[]> = {
  instagram: [
    { id: 1, platform: 'instagram', date: '2026-10-18', rank: 1, title: 'NASA Lunar Sunrise Timelapse', creator: '@nasa', views_or_volume: '18.4M views', external_url: 'https://instagram.com', trend_level: 'high', summary: 'Stunning 4K footage captured from Artemis test vehicle orbiting lunar terminator.' },
    { id: 2, platform: 'instagram', date: '2026-10-18', rank: 2, title: '15-Minute Sourdough Method', creator: '@chefsteps', views_or_volume: '14.2M views', external_url: 'https://instagram.com', trend_level: 'high', summary: 'Revolutionary high-hydration rapid fold technique sweeping home bakers.' },
    { id: 3, platform: 'instagram', date: '2026-10-18', rank: 3, title: 'Silicon Valley Tech Office Tour 2026', creator: '@techinsider', views_or_volume: '11.8M views', external_url: 'https://instagram.com', trend_level: 'high', summary: 'Inside the clean-power Texas AI hub with robotic cafeterias.' }
  ],
  tiktok: [
    { id: 11, platform: 'tiktok', date: '2026-10-18', rank: 1, title: 'POV: Your Professor Explains AI Reasoning in 60s', creator: '@dr_explain', views_or_volume: '24.1M views', external_url: 'https://tiktok.com', trend_level: 'high', summary: 'Clear visual analogy of neural attention models vs human memory.' },
    { id: 12, platform: 'tiktok', date: '2026-10-18', rank: 2, title: 'The Day the US Mortgage Rate Dropped', creator: '@marketguy', views_or_volume: '19.5M views', external_url: 'https://tiktok.com', trend_level: 'high', summary: 'Young couples react to updated home buying affordability calculator.' },
    { id: 13, platform: 'tiktok', date: '2026-10-18', rank: 3, title: 'Grandma Tries VR Spatial Computing', creator: '@familymoments', views_or_volume: '16.8M views', external_url: 'https://tiktok.com', trend_level: 'high', summary: 'Heartwarming reaction to revisiting her 1960s childhood street.' }
  ],
  youtube: [
    { id: 21, platform: 'youtube', date: '2026-10-18', rank: 1, title: 'MKBHD: The Future of Spatial Glasses', creator: 'Marques Brownlee', views_or_volume: '5.8M views', external_url: 'https://youtube.com', trend_level: 'high', summary: 'Hands-on with all-day featherweight transparent displays.' },
    { id: 22, platform: 'youtube', date: '2026-10-18', rank: 2, title: 'Veritasium: Why Did This Math Conjecture Fall?', creator: 'Veritasium', views_or_volume: '4.9M views', external_url: 'https://youtube.com', trend_level: 'high', summary: 'A counterexample discovered after 75 years of unsolved proofs.' },
    { id: 23, platform: 'youtube', date: '2026-10-18', rank: 3, title: 'NASA Artemis Gateway Module Tour', creator: 'NASA', views_or_volume: '4.1M views', external_url: 'https://youtube.com', trend_level: 'high', summary: 'Astronaut walk-through inside the pressurized lunar living module.' }
  ],
  trends: [
    { id: 31, platform: 'trends', date: '2026-10-18', rank: 1, title: 'Federal Reserve Rate Decision', creator: 'Macroeconomics', views_or_volume: '2.5M searches', external_url: 'https://trends.google.com', trend_level: 'high', summary: 'Massive surge following announcement of steady rate corridor.' },
    { id: 32, platform: 'trends', date: '2026-10-18', rank: 2, title: 'Supreme Court Digital Privacy Ruling', creator: 'SCOTUS & Law', views_or_volume: '1.9M searches', external_url: 'https://trends.google.com', trend_level: 'high', summary: 'Consumers and legal experts searching Fourth Amendment geofence limits.' },
    { id: 33, platform: 'trends', date: '2026-10-18', rank: 3, title: 'FDA Alzheimer\'s Blood Test', creator: 'Healthcare & Medicine', views_or_volume: '1.7M searches', external_url: 'https://trends.google.com', trend_level: 'high', summary: 'High search interest from families and primary care practitioners.' }
  ]
};

export default function HomePage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(INITIAL_NEWS_ITEMS);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [aiAnswer, setAiAnswer] = useState<AiNewsAnswer | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const dailyBriefingAudioScript = useMemo(() => {
    return `Welcome to What Is In News Today, United States edition. Here is your sixty-second briefing. In the US economy, the Federal Reserve signaled rate stability as core CPI prints held at two point three percent, easing thirty-year fixed mortgage rates. In American infrastructure, four point two billion dollars was unlocked for an interstate electric vehicle fast-charging network. In technology, clean-powered AI compute hubs expanded in Texas. In healthcare, the FDA cleared the first fifteen-minute blood test for early Alzheimer's. And the Supreme Court required Fourth Amendment warrants for commercial geofence location data. That is what is in US news today.`;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return newsItems;
    return newsItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, newsItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: newsItems.length,
      politics: 0,
      economy: 0,
      infrastructure: 0,
      tech: 0,
      health: 0,
      science: 0,
      culture: 0
    };
    newsItems.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, [newsItems]);

  const handleAsk = async (query: string) => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        const data = await res.json();
        setAiAnswer(data);
      }
    } catch (err) {
      console.error('Failed to ask AI:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleRefreshFeed = async () => {
    try {
      const res = await fetch('/api/feed');
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          setNewsItems(data.items);
        }
      }
    } catch (err) {
      console.warn('Could not refresh feed:', err);
    }
  };

  const handleOpenSubscribe = () => {
    const element = document.getElementById('newsletter-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Realtime Event Notifier (polls database for live inserts) */}
      <RealtimeNotifier initialCount={newsItems.length} onRefresh={handleRefreshFeed} />

      {/* Header */}
      <Header
        onOpenSubscribe={handleOpenSubscribe}
        onOpenPro={() => setIsProModalOpen(true)}
        onPlayDailyAudio={() => setIsAudioPlayerOpen(true)}
        isPlayingAudio={isAudioPlayerOpen}
      />

      <main className="flex-1">
        {/* Interactive Search / AI Bar */}
        <AskNewsBar onAsk={handleAsk} isLoading={isLoadingAi} />

        {/* AI Answer Card */}
        {aiAnswer && (
          <AiAnswerCard
            answer={aiAnswer}
            onSelectFollowUp={(followUpQuery) => handleAsk(followUpQuery)}
          />
        )}

        {/* [Today] Top 10 Viral Reels & Trends Section */}
        <Top10Section initialSummary={INITIAL_TOP10_SUMMARY} />

        {/* Native Sponsorship / Ad Slot */}
        <SponsorshipBanner />

        {/* Section Heading & Category Filter */}
        <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Today's Curated US Wire (United States Focus)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Essential US Headlines & Why They Matter
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Realtime database sync • 0 clickbait • Primary wire attribution
          </p>
        </div>

        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={categoryCounts}
        />

        {/* News Cards Grid */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                onAskAboutStory={(storyTitle) => handleAsk(storyTitle)}
              />
            ))}
          </div>
        </div>

        {/* Trust & Methodology */}
        <div className="max-w-4xl mx-auto px-4 my-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-b border-zinc-200 dark:border-zinc-800 py-8">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold mb-1">US Wire Aggregation</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Curated strictly from verified primary US reporting (WSJ, AP, Reuters US, STAT News).
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                <Compass className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold mb-1">Both Perspectives</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Consensus and counterpoints presented without sensationalist emotional spin.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-2">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold mb-1">Permanent Permalinks</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Every story and daily top 10 is archived with a permanent, accessible URL.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div id="newsletter-section">
          <NewsletterBox />
        </div>
      </main>

      {/* 60s Daily Audio Player */}
      <AudioBriefingPlayer
        scriptText={dailyBriefingAudioScript}
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
      />

      {/* Floating Smart Chatbot with Proactive 5-10 Stories */}
      <ChatBot />

      {/* Pro Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-16 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                  WhatIsIn<span className="text-blue-600">NewsToday</span>.com
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600">US Edition</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                The objective, AI-curated daily US news intelligence and viral trends engine.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
              <Link href="/top-10" className="hover:text-blue-600">Top 10 Viral Hub</Link>
              <Link href="/top-10/instagram" className="hover:text-blue-600">Instagram Reels</Link>
              <Link href="/top-10/tiktok" className="hover:text-blue-600">TikTok Trends</Link>
              <Link href="/top-10/trends" className="hover:text-blue-600">Search Trends</Link>
              <Link href="/unsubscribe" className="text-rose-500 hover:text-rose-600 font-medium">Unsubscribe</Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <p>© {new Date().getFullYear()} WhatIsInNewsToday.com. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Curated with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for truth and clarity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
