import { NextResponse } from 'next/server';
import { INITIAL_NEWS_ITEMS } from '@/lib/newsData';
import { Category } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get('category') || 'all') as Category;

  let items = INITIAL_NEWS_ITEMS;

  if (category && category !== 'all') {
    items = items.filter(item => item.category === category);
  }

  return NextResponse.json({
    total: items.length,
    category,
    lastUpdated: new Date().toISOString(),
    items
  });
}
