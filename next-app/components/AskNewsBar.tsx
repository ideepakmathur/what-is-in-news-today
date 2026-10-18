'use client';

import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Loader2, Zap } from 'lucide-react';

interface AskNewsBarProps {
  onAsk: (query: string) => void;
  isLoading: boolean;
}

const QUICK_SUGGESTIONS = [
  { label: '⚡ AI & Tech Breakthroughs', query: 'What are the top AI and tech breakthroughs today?' },
  { label: '📈 Markets & Inflation', query: 'How are global stock markets and economic data moving today?' },
  { label: '🧬 Health & Science', query: 'Any major health, cancer research, or science discoveries today?' },
  { label: '🌍 World Affairs', query: 'What is happening in world diplomacy, energy, and global trade today?' },
  { label: '🎯 3-Bullet Top 5', query: 'Summarize today\'s top 5 essential news stories in 3 bullets each' }
];

export const AskNewsBar: React.FC<AskNewsBarProps> = ({ onAsk, isLoading }) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() && !isLoading) {
      onAsk(inputVal.trim());
    }
  };

  const handlePillClick = (query: string) => {
    setInputVal(query);
    onAsk(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      {/* Subheading / Value pitch */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
          <Zap className="h-3.5 w-3.5 text-blue-600" />
          <span>Noise-Free • Citation-Backed • Zero Hallucinations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
          What is in the news today?
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Ask any question about today’s breaking events. Get synthesized 3-point answers backed by verified source citations.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-20 group-hover:opacity-40 blur transition duration-300" />
        <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-none p-2 sm:p-2.5">
          <div className="pl-3 pr-2 text-zinc-400">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            ) : (
              <Sparkles className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything... e.g., 'What happened in tech today?', 'Explain the market rally'"
            className="w-full bg-transparent text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none px-2 py-1.5"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <span>{isLoading ? 'Synthesizing...' : 'Ask AI'}</span>
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </form>

      {/* Quick Suggestion Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-zinc-400 font-medium mr-1 hidden sm:inline">Try asking:</span>
        {QUICK_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handlePillClick(item.query)}
            className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-300 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
