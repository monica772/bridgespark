import { NextResponse } from 'next/server';

// Fetches financial news via RSS feeds (no API key needed)
// Replace with NewsAPI or similar for production
const RSS_FEEDS = [
  'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
  'https://www.moneycontrol.com/rss/latestnews.xml',
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const limit = parseInt(searchParams.get('limit') || '20');

  try {
    // In production, fetch from RSS feeds or NewsAPI
    // For now return a structured placeholder response
    return NextResponse.json({
      articles: [],
      category,
      limit,
      message: 'Connect a news API or RSS feed for live articles. See docs/NEWS_API.md',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('News API error:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
