import Parser from 'rss-parser';

export interface RSSArticle {
  id: string;
  title: string;
  summary: string;
  link: string;
  time: string;
  timeAgo: string;
  category: string;
  source: string;
  sourceLogo: string;
  image?: string;
}

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/rss+xml, application/xml, text/xml, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
  Referer: 'https://www.google.com/',
};

const parser = new Parser({
  headers: HEADERS,
  timeout: 10000,
  customFields: {
    item: [
      'media:content',
      'media:thumbnail',
      'enclosure',
    ],
  },
});

// Only feeds confirmed to work from a Next.js server environment.
// Business Standard and Financial Express block server-side requests.
export const FEEDS = [
  {
    source: 'ET Markets',
    sourceLogo: '📰',
    category: 'Markets',
    color: 'bg-orange-100 text-orange-700',
    urls: [
      'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
      'https://economictimes.indiatimes.com/rssfeedstopstories.cms',
    ],
  },
  {
    source: 'Moneycontrol',
    sourceLogo: '💹',
    category: 'Markets',
    color: 'bg-green-100 text-green-700',
    urls: [
      'https://www.moneycontrol.com/rss/latestnews.xml',
      'https://www.moneycontrol.com/rss/marketreports.xml',
      'https://www.moneycontrol.com/rss/business.xml',
    ],
  },
  {
    source: 'LiveMint',
    sourceLogo: '🪙',
    category: 'Markets',
    color: 'bg-teal-100 text-teal-700',
    urls: [
      'https://www.livemint.com/rss/markets',
      'https://www.livemint.com/rss/money',
      'https://www.livemint.com/rss/news',
    ],
  },
  {
    source: 'NDTV Profit',
    sourceLogo: '📺',
    category: 'Markets',
    color: 'bg-red-100 text-red-700',
    urls: [
      'https://www.ndtvprofit.com/feed/',
      'https://feeds.feedburner.com/ndtvprofit-latest',
    ],
  },
  {
    source: 'The Hindu BusinessLine',
    sourceLogo: '🏛️',
    category: 'Economy',
    color: 'bg-yellow-100 text-yellow-700',
    urls: [
      'https://www.thehindubusinessline.com/feeder/default.rss',
    ],
  },
  {
    source: 'Finshots',
    sourceLogo: '🎯',
    category: 'Analysis',
    color: 'bg-indigo-100 text-indigo-700',
    urls: [
      'https://finshots.in/feed/',
    ],
  },
  {
    source: 'Investing.com',
    sourceLogo: '🌐',
    category: 'Markets',
    color: 'bg-sky-100 text-sky-700',
    urls: [
      'https://in.investing.com/rss/market_overview_Technical.rss',
      'https://in.investing.com/rss/news_25.rss',
    ],
  },
];

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

async function fetchFeedWithFallback(feed: typeof FEEDS[0]): Promise<RSSArticle[]> {
  for (const url of feed.urls) {
    try {
      const result = await parser.parseURL(url);
      if (!result.items?.length) continue;
      console.log(`✅ ${feed.source}: ${result.items.length} items`);
      return result.items.map((item, i) => ({
        id: `${feed.source}-${item.guid || item.link || i}`,
        title: item.title?.trim() || '',
        summary:
          item.contentSnippet?.trim() ||
          item.content?.replace(/<[^>]+>/g, '').slice(0, 200).trim() ||
          '',
        link: item.link || '#',
        time: item.pubDate || '',
        timeAgo: item.pubDate ? timeAgo(item.pubDate) : '',
        category: feed.category,
        source: feed.source,
        sourceLogo: feed.sourceLogo,
        image:
          (item as Record<string, unknown>)?.['media:content']?.['$']?.url ||
          (item as Record<string, unknown>)?.['media:thumbnail']?.['$']?.url ||
          (item as Record<string, unknown>)?.['enclosure']?.url ||
          undefined,
      }));
    } catch (err) {
      console.warn(`⚠️  ${feed.source} → ${url} : ${(err as Error).message}`);
    }
  }
  console.warn(`⚠️  ${feed.source}: all URLs failed — skipping`);
  return [];
}

// ─── Moneycontrol HTML scraper (fallback when RSS is blocked) ────────────────
async function fetchMoneycontrolHTML(): Promise<RSSArticle[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/moneycontrol?page=1`, {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    if (!data.articles?.length) return [];

    return data.articles.map((a: { title: string; link: string; time: string; timeAgo: string }) => ({
      id:          `moneycontrol-html-${a.link}`,
      title:       a.title,
      summary:     '',
      link:        a.link,
      time:        a.time,
      timeAgo:     a.timeAgo,
      category:    'Markets',
      source:      'Moneycontrol',
      sourceLogo:  '💹',
    }));
  } catch {
    return [];
  }
}

export async function fetchAllMarketNews(limit = 60): Promise<RSSArticle[]> {
  // Run all RSS feeds + Moneycontrol HTML scraper in parallel
  const [rssResults, mcHTML] = await Promise.all([
    Promise.allSettled(FEEDS.map(fetchFeedWithFallback)),
    fetchMoneycontrolHTML(),
  ]);

  const all: RSSArticle[] = [
    ...rssResults.flatMap((r) => r.status === 'fulfilled' ? r.value : []),
    ...mcHTML,
  ];

  // Sort newest first
  all.sort((a, b) => {
    const da = a.time ? new Date(a.time).getTime() : 0;
    const db = b.time ? new Date(b.time).getTime() : 0;
    return db - da;
  });

  // Deduplicate by first 60 chars of title
  const seen = new Set<string>();
  return all
    .filter((a) => {
      if (!a.title) return false;
      const key = a.title.slice(0, 60).toLowerCase().replace(/\s+/g, ' ');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

export async function fetchInvestingRSS(limit = 20): Promise<RSSArticle[]> {
  const articles = await fetchFeedWithFallback(FEEDS[FEEDS.length - 1]);
  return articles.slice(0, limit);
}

// ─── Market keyword filter ────────────────────────────────────────────────────
// Passes only articles that are clearly about financial markets.

const MARKET_KEYWORDS = [
  // Indices / exchanges
  'nifty', 'sensex', 'bse', 'nse', 'nasdaq', 's&p', 'dow jones', 'ftse',
  // Instruments
  'stock', 'share', 'equity', 'index', 'indices', 'etf', 'ipo', 'listing',
  'futures', 'options', 'derivative', 'f&o',
  // Commodities
  'gold', 'silver', 'crude', 'oil', 'commodity', 'commodities', 'metal',
  'copper', 'natural gas',
  // Bonds / debt
  'bond', 'yield', 'debt', 'gilt', 'treasury', 'fixed income', 'debenture',
  // Forex / currency
  'rupee', 'dollar', 'forex', 'currency', 'inr', 'usd', 'eur',
  // Market participants / events
  'fii', 'dii', 'sebi', 'rbi', 'fed', 'rate', 'repo', 'inflation', 'gdp',
  'earnings', 'quarterly result', 'profit', 'revenue', 'mutual fund',
  'portfolio', 'market', 'trading', 'rally', 'correction', 'bull', 'bear',
  'gainers', 'losers', 'volume', 'breakout', 'resistance', 'support',
];

const BLOCK_KEYWORDS = [
  // Exclude clearly non-market content
  'cricket', 'bollywood', 'celebrity', 'election', 'weather', 'sports',
  'recipe', 'fashion', 'travel', 'horoscope',
];

export function isMarketArticle(article: RSSArticle): boolean {
  const text = `${article.title} ${article.summary}`.toLowerCase();

  // Exclude if contains block keywords
  if (BLOCK_KEYWORDS.some((kw) => text.includes(kw))) return false;

  // Pass if contains at least one market keyword
  return MARKET_KEYWORDS.some((kw) => text.includes(kw));
}

export async function fetchFilteredMarketNews(limit = 30): Promise<RSSArticle[]> {
  const all = await fetchAllMarketNews(limit * 3); // fetch extra to account for filtering
  return all.filter(isMarketArticle).slice(0, limit);
}

// Export source colors for use in UI components
export const SOURCE_COLORS: Record<string, string> = Object.fromEntries(
  FEEDS.map((f) => [f.source, f.color])
);
