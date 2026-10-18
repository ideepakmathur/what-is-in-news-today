'use client';

import React from 'react';
import { AiNewsAnswer } from '@/lib/types';
import { Sparkles, CheckCircle2, ExternalLink, Share2, Copy, Check, MessageSquare } from 'lucide-react';

interface AiAnswerCardProps {
  answer: AiNewsAnswer;
  onSelectFollowUp: (q: string) => void;
}

export const AiAnswerCard: React.FC<AiAnswerCardProps> = ({ answer, onSelectFollowUp }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = `${answer.query}\n\nSummary:\n${answer.summary}\n\nKey Takeaways:\n${answer.keyTakeaways.join('\n')}\n\nRead more at WhatIsInNewsToday.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="relative rounded-2xl bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-900/60 shadow-xl shadow-blue-500/5 p-6 sm:p-8 overflow-hidden">
        {/* Subtle accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

        {/* Header meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Verified AI Synthesis
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {Math.round(answer.confidence * 100)}% source consensus • {answer.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* User Query */}
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          "{answer.query}"
        </h2>

        {/* Summary */}
        <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
          {answer.summary}
        </p>

        {/* Key Takeaways */}
        <div className="mb-6 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl p-4 sm:p-5 border border-zinc-200/60 dark:border-zinc-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Core Takeaways for Today
          </h3>
          <ul className="space-y-2.5">
            {answer.keyTakeaways.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Citations Grid */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Verified Source Citations ({answer.citations.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {answer.citations.map((cite) => (
              <a
                key={cite.id}
                href={cite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-zinc-850 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{cite.source}</span>
                    <span>{cite.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 mb-1">
                    {cite.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {cite.snippet}
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                  <span>Verify at source</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Follow-up Questions */}
        {answer.relatedQueries && answer.relatedQueries.length > 0 && (
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2.5">
              <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
              <span>Recommended Follow-ups:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {answer.relatedQueries.map((rq, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectFollowUp(rq)}
                  className="text-xs text-left px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-950/60 text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  "{rq}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
