export interface MarketQuote {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  open?: number;
  high?: number;
  low?: number;
  prevClose?: number;
  up: boolean;
  group: 'index' | 'currency' | 'commodity';
}

// Yahoo Finance symbols → display names + group
const SYMBOL_META: Record<string, { name: string; group: MarketQuote['group'] }> = {
  // Indices
  '^NSEI':      { name: 'NIFTY 50',    group: 'index' },
  '^BSESN':     { name: 'SENSEX',      group: 'index' },
  '^NSEBANK':   { name: 'BANK NIFTY',  group: 'index' },
  '^CNXIT':     { name: 'NIFTY IT',    group: 'index' },
  '^CNXMIDCAP': { name: 'MIDCAP',      group: 'index' },
  // Currencies (vs INR)
  'USDINR=X':   { name: 'USD/INR',     group: 'currency' },
  'EURINR=X':   { name: 'EUR/INR',     group: 'currency' },
  'GBPINR=X':   { name: 'GBP/INR',     group: 'currency' },
  'JPYINR=X':   { name: 'JPY/INR',     group: 'currency' },
  'AEDINR=X':   { name: 'AED/INR',     group: 'currency' },
  'SGDINR=X':   { name: 'SGD/INR',     group: 'currency' },
  // Commodities
  'GC=F':       { name: 'GOLD',        group: 'commodity' },
  'CL=F':       { name: 'CRUDE OIL',   group: 'commodity' },
};

const SYMBOL_LIST = Object.keys(SYMBOL_META).join(',');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseQuote(q: any): MarketQuote {
  const meta = SYMBOL_META[q.symbol];
  const change = q.regularMarketChange ?? 0;
  return {
    name:      meta?.name ?? q.shortName ?? q.symbol,
    symbol:    q.symbol,
    price:     q.regularMarketPrice ?? 0,
    change,
    changePct: q.regularMarketChangePercent ?? 0,
    open:      q.regularMarketOpen,
    high:      q.regularMarketDayHigh,
    low:       q.regularMarketDayLow,
    prevClose: q.regularMarketPreviousClose,
    up:        change >= 0,
    group:     meta?.group ?? 'index',
  };
}

export async function fetchMarketSnapshot(): Promise<MarketQuote[]> {
  try {
    const url =
      `https://query1.finance.yahoo.com/v7/finance/quote` +
      `?symbols=${SYMBOL_LIST}` +
      `&fields=shortName,regularMarketPrice,regularMarketChange,` +
      `regularMarketChangePercent,regularMarketOpen,regularMarketDayHigh,` +
      `regularMarketDayLow,regularMarketPreviousClose`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Yahoo Finance returned ${res.status}`);
    const data = await res.json();
    const quotes: MarketQuote[] = (data?.quoteResponse?.result ?? []).map(parseQuote);
    console.log(`✅ Market snapshot: ${quotes.length} quotes`);
    return quotes;
  } catch (err) {
    console.warn('⚠️  Market snapshot fetch failed:', (err as Error).message);
    return [];
  }
}

// Fallback mock data
export const MOCK_MARKET: MarketQuote[] = [
  { name: 'NIFTY 50',   symbol: '^NSEI',      price: 24780.65, change: 125.30,  changePct: 0.51,  up: true,  group: 'index' },
  { name: 'SENSEX',     symbol: '^BSESN',     price: 81450.20, change: 320.15,  changePct: 0.39,  up: true,  group: 'index' },
  { name: 'BANK NIFTY', symbol: '^NSEBANK',   price: 52340.80, change: -180.45, changePct: -0.34, up: false, group: 'index' },
  { name: 'NIFTY IT',   symbol: '^CNXIT',     price: 38920.10, change: 280.60,  changePct: 0.73,  up: true,  group: 'index' },
  { name: 'MIDCAP',     symbol: '^CNXMIDCAP', price: 15620.30, change: -42.80,  changePct: -0.27, up: false, group: 'index' },
  { name: 'USD/INR',    symbol: 'USDINR=X',   price: 83.42,    change: 0.08,    changePct: 0.10,  up: true,  group: 'currency' },
  { name: 'EUR/INR',    symbol: 'EURINR=X',   price: 90.28,    change: -0.12,   changePct: -0.13, up: false, group: 'currency' },
  { name: 'GBP/INR',    symbol: 'GBPINR=X',   price: 105.64,   change: 0.22,    changePct: 0.21,  up: true,  group: 'currency' },
  { name: 'JPY/INR',    symbol: 'JPYINR=X',   price: 0.5412,   change: -0.002,  changePct: -0.37, up: false, group: 'currency' },
  { name: 'AED/INR',    symbol: 'AEDINR=X',   price: 22.70,    change: 0.02,    changePct: 0.09,  up: true,  group: 'currency' },
  { name: 'SGD/INR',    symbol: 'SGDINR=X',   price: 62.35,    change: 0.15,    changePct: 0.24,  up: true,  group: 'currency' },
  { name: 'GOLD',       symbol: 'GC=F',       price: 73240.00, change: 180.00,  changePct: 0.25,  up: true,  group: 'commodity' },
  { name: 'CRUDE OIL',  symbol: 'CL=F',       price: 6842.00,  change: -42.00,  changePct: -0.61, up: false, group: 'commodity' },
];
