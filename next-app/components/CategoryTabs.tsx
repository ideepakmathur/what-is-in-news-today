'use client';

import React from 'react';
import { Category } from '@/lib/types';
import { Globe, Cpu, TrendingUp, FlaskConical, Tv, Layers } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  counts: Record<Category, number>;
}

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Today', icon: <Layers className="h-4 w-4" /> },
  { id: 'tech', label: 'Tech & AI', icon: <Cpu className="h-4 w-4" /> },
  { id: 'markets', label: 'Markets & Finance', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'world', label: 'World Affairs', icon: <Globe className="h-4 w-4" /> },
  { id: 'science', label: 'Science & Health', icon: <FlaskConical className="h-4 w-4" /> },
  { id: 'culture', label: 'Culture & Media', icon: <Tv className="h-4 w-4" /> }
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  counts
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-zinc-700 text-zinc-200 dark:bg-zinc-300 dark:text-zinc-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
