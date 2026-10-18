import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticles } from '@/lib/db';
import { Header } from '@/components/Header';
import { ArrowLeft, Clock, ExternalLink, Share2, Shield, CheckCircle2, Volume2, Globe } from 'lucide-react';

interface NewsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NewsPageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Story Not Found | WhatIsInNewsToday' };

  return {
    title: `${article.title} | WhatIsInNewsToday`,
    description: article.whyItMatters,
    openGraph: {
      title: article.title,
      description: article.whyItMatters,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags
    }
  };
}

export default function ArticlePage({ params }: NewsPageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = getAllArticles()
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Today's US Wire</span>
          </Link>

          <Link href="/" className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
            WhatIsIn<span className="text-blue-600">NewsToday</span>
          </Link>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="uppercase font-semibold text-blue-600 dark:text-blue-400">{article.category}</span>
          <span>/</span>
          <span className="truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Category & Verified Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="uppercase tracking-wider text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {article.category} • US Focus
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="h-3.5 w-3.5" />
            {article.publishedAt}
          </span>
          <span className="text-zinc-400">•</span>
          <span className="text-xs text-zinc-500">{article.readTimeMinutes} min read</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 leading-tight mb-6">
          {article.title}
        </h1>

        {/* Source Attribution Bar */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 text-xs">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-zinc-600 dark:text-zinc-400">
              Aggregated from verified primary reporting: <strong className="text-zinc-900 dark:text-zinc-100">{article.source}</strong>
            </span>
          </div>

          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
          >
            <span>Original Source</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Core 3-Bullet Facts */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
            <span>Core Facts & Verified Wire Summary</span>
          </h2>

          <div className="space-y-3.5">
            {article.summaryBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* "Why It Matters" Section */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl p-6 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-1.5">
            <span>💡 Why This Matters to You</span>
          </h3>
          <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed">
            {article.whyItMatters}
          </p>
        </div>

        {/* Consensus vs Counterpoint */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 mb-8 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Consensus / Institutional View
            </h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {article.perspectives.consensus}
            </p>
          </div>
          {article.perspectives.divergence && (
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Counterpoints & Watchdog Perspective
              </h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {article.perspectives.divergence}
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {article.tags.map((tag, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related US Stories */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-4">Related US Headlines Today</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map(rel => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-600 block mb-1">{rel.category}</span>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-[11px] text-zinc-400 mt-3">{rel.publishedAt}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
