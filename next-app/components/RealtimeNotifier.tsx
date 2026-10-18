'use client';

import React, { useState, useEffect } from 'react';
import { Zap, RefreshCw, X } from 'lucide-react';
import { NewsItem } from '@/lib/types';

interface RealtimeNotifierProps {
  initialCount: number;
  onRefresh: () => void;
}

export const RealtimeNotifier: React.FC<RealtimeNotifierProps> = ({ initialCount, onRefresh }) => {
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  const [latestTitle, setLatestTitle] = useState('');
  const [knownCount, setKnownCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/realtime?knownCount=${knownCount}`);
        if (res.ok) {
          const data = await res.json();
          if (data.hasUpdate) {
            setHasNewUpdate(true);
            if (data.latestArticle) {
              setLatestTitle(data.latestArticle.title);
            }
          }
        }
      } catch (err) {
        // silent retry
      }
    }, 15000); // Check database every 15s

    return () => clearInterval(interval);
  }, [knownCount]);

  const handleUpdate = () => {
    setHasNewUpdate(false);
    onRefresh();
  };

  if (!hasNewUpdate) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-zinc-900 text-white border border-blue-500/40 rounded-full shadow-2xl px-5 py-2.5 flex items-center gap-3 text-xs sm:text-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-zinc-100 truncate max-w-xs sm:max-w-md">
          ⚡ New US story aggregated: "{latestTitle}"
        </span>
        <button
          onClick={handleUpdate}
          className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm shrink-0"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Update Feed</span>
        </button>
        <button
          onClick={() => setHasNewUpdate(false)}
          className="text-zinc-400 hover:text-white p-0.5"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
