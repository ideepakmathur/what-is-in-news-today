export type Category = 'all' | 'politics' | 'economy' | 'infrastructure' | 'tech' | 'health' | 'science' | 'culture';

export interface NewsItem {
  id: string;
  slug?: string;
  title: string;
  category: Category;
  country?: string;
  summaryBullets: string[];
  whyItMatters: string;
  perspectives: {
    consensus: string;
    divergence?: string;
  };
  source: string;
  sourceUrl: string;
  publishedAt: string;
  readTimeMinutes: number;
  sentiment?: 'positive' | 'neutral' | 'critical';
  tags: string[];
  imageUrl?: string;
}

export interface Citation {
  id: number;
  source: string;
  title: string;
  url: string;
  snippet: string;
  timeAgo: string;
}

export interface AiNewsAnswer {
  query: string;
  summary: string;
  keyTakeaways: string[];
  citations: Citation[];
  relatedQueries: string[];
  confidence: number;
  timestamp: string;
}

export interface NewsletterSubscription {
  email: string;
  categoryPreference?: string;
  frequency: 'daily' | 'weekly';
  subscribedAt: string;
}

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
