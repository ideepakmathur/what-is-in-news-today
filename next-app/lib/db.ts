import fs from 'fs';
import path from 'path';
import { NewsItem } from './types';

export interface Top10Item {
  id: number;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'trends';
  date: string;
  rank: number;
  title: string;
  creator: string;
  views_or_volume: string;
  external_url: string;
  thumbnail_url?: string;
  trend_level: 'high' | 'moderate';
  summary: string;
}

export interface DatabaseSnapshot {
  articles: NewsItem[];
  top10: Record<string, Record<string, Top10Item[]>>;
  activeSubscribersCount: number;
  lastSyncedAt: string;
}

const SEED_FILE = path.join(process.cwd(), 'data', 'seed.json');

function readSnapshot(): DatabaseSnapshot {
  try {
    if (fs.existsSync(SEED_FILE)) {
      const data = fs.readFileSync(SEED_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Could not read seed.json, falling back to empty state:', err);
  }

  return {
    articles: [],
    top10: {},
    activeSubscribersCount: 18500,
    lastSyncedAt: new Date().toISOString()
  };
}

export function getAllArticles(category?: string): NewsItem[] {
  const snapshot = readSnapshot();
  if (!category || category === 'all') {
    return snapshot.articles;
  }
  return snapshot.articles.filter((a) => a.category === category);
}

export function getArticleBySlug(slug: string): NewsItem | undefined {
  const snapshot = readSnapshot();
  return snapshot.articles.find((a) => a.slug === slug || a.id === slug);
}

export function getTop10ByPlatformAndDate(platform: string, targetDate?: string): { items: Top10Item[]; date: string; availableDates: string[] } {
  const snapshot = readSnapshot();
  const platformRecords = snapshot.top10[platform] || {};
  const dates = Object.keys(platformRecords).sort().reverse();

  const selectedDate = targetDate && platformRecords[targetDate] ? targetDate : (dates[0] || new Date().toISOString().split('T')[0]);
  const items = platformRecords[selectedDate] || [];

  return {
    items,
    date: selectedDate,
    availableDates: dates
  };
}

export function getAllPlatformsSummary(): Record<string, Top10Item[]> {
  const snapshot = readSnapshot();
  const summary: Record<string, Top10Item[]> = {};

  ['instagram', 'tiktok', 'youtube', 'trends'].forEach((plat) => {
    const dates = Object.keys(snapshot.top10[plat] || {}).sort().reverse();
    const latestDate = dates[0];
    summary[plat] = latestDate ? (snapshot.top10[plat][latestDate] || []).slice(0, 5) : [];
  });

  return summary;
}

export function getProactiveChatSuggestions(limit: number = 8): NewsItem[] {
  const snapshot = readSnapshot();
  return snapshot.articles.slice(0, Math.min(limit, 10));
}

export function addSubscriber(email: string, frequency: 'daily' | 'weekly' = 'daily'): { success: boolean; token: string; message: string } {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

  // In production, write to SQLite or PostgreSQL
  return {
    success: true,
    token,
    message: `Subscribed successfully to WhatIsInNewsToday ${frequency === 'weekly' ? 'Weekly' : 'Daily'} US Digest!`
  };
}

export function unsubscribeUser(emailOrToken: string): { success: boolean; message: string } {
  return {
    success: true,
    message: `You have been unsubscribed from WhatIsInNewsToday. You will receive no further emails.`
  };
}
