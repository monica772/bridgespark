import { NextResponse } from 'next/server';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-IN,en;q=0.9',
  'Referer': 'https://www.google.com/',
  'Cache-Control': 'no-cache',
};

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Extract articles from Moneycontrol news listing HTML
function parseMoneycontrolHTML(html: string) {
  const articles: { title: string; link: string; time: string; timeAgo: string; image?: string }[] = [];

  // Pattern 1: news listing <li> blocks with <a> tags
  // Moneycontrol news listing uses patterns like:
  // <h2><a href="/news/...">Title</a></h2>
  const linkPattern = /<a\s+(?:[^>]*?\s+)?href="(https:\/\/www\.moneycontrol\.com\/news\/[^"]+)"[^>]*>\s*([^<]{10,200})\s*<\/a>/gi;

  const seen = new Set<string>();
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const link = match[1].trim();
    const title = match[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#039;/g, "'").replace(/&quot;/g, '"').trim();

    // Skip navigation links, short titles, duplicates
    if (
      title.length < 15 ||
      title.length > 250 ||
      seen.has(link) ||
      link.includes('/news/tags/') ||
      link.includes('/news/category/') ||
      title.toLowerCase().includes('moneycontrol') ||
      /^(home|markets|news|back|next|previous|more)$/i.test(title)
    ) continue;

    seen.add(link);

    // Try to extract a timestamp near this article
    const idx = html.indexOf(match[0]);
    const nearby = html.substring(Math.max(0, idx - 200), idx + 500);
    const timeMatch = nearby.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?(?:\s*IST)?)|(\w+ \d{1,2},\s*\d{4})/i);

    articles.push({
      title,
      link,
      time: timeMatch?.[0] ?? '',
      timeAgo: timeMatch?.[0] ? timeAgo(timeMatch[0]) : '',
    });

    if (articles.length >= 20) break;
  }

  return articles;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';

  try {
    const url = `https://www.moneycontrol.com/news/listing/page-${page}/`;

    const res = await fetch(url, {
      headers: HEADERS,
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();

    if (!html || html.length < 1000) throw new Error('Empty response');

    const articles = parseMoneycontrolHTML(html);

    if (!articles.length) throw new Error('No articles parsed');

    console.log(`✅ Moneycontrol: parsed ${articles.length} articles from page ${page}`);

    return NextResponse.json({
      articles,
      page: parseInt(page),
      source: 'Moneycontrol',
      url,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn(`⚠️  Moneycontrol scraper: ${(err as Error).message}`);
    return NextResponse.json({ articles: [], error: (err as Error).message });
  }
}
