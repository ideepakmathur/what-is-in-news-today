import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const knownCount = parseInt(searchParams.get('knownCount') || '0', 10);

  const articles = getAllArticles();
  const currentCount = articles.length;

  return NextResponse.json({
    hasUpdate: currentCount > knownCount && knownCount > 0,
    currentCount,
    latestArticle: articles[0] || null,
    timestamp: new Date().toISOString()
  });
}
