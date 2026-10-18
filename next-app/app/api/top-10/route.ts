import { NextResponse } from 'next/server';
import { getTop10ByPlatformAndDate, getAllPlatformsSummary } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');
  const date = searchParams.get('date') || undefined;

  if (platform) {
    const data = getTop10ByPlatformAndDate(platform, date);
    return NextResponse.json(data);
  }

  // Summary for all platforms
  const summary = getAllPlatformsSummary();
  return NextResponse.json(summary);
}
