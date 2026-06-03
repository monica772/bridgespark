import { NextResponse } from 'next/server';

// Fetches live market data from Yahoo Finance (unofficial, no API key needed)
// Symbols: ^NSEI (Nifty 50), ^BSESN (Sensex), and top NSE stocks
const SYMBOLS = [
  // Indian indices
  '^NSEI', '^BSESN', '^NSEBANK',
  // Top NSE stocks
  'RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS',
  'WIPRO.NS', 'BAJFINANCE.NS', 'MARUTI.NS', 'HINDUNILVR.NS',
  // Commodities / FX
  'GC=F', 'CL=F', 'USDINR=X',
  // US indices
  '^GSPC', '^IXIC', '^DJI',
  // US stocks
  'AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA',
  // Crypto (Yahoo Finance tickers)
  'BTC-USD', 'ETH-USD', 'SOL-USD', 'BNB-USD', 'XRP-USD',
].join(',');

export async function GET() {
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS}&fields=shortName,regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketOpen,regularMarketDayHigh,regularMarketDayLow,regularMarketPreviousClose`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 60 }, // cache for 60 seconds
    });

    if (!res.ok) throw new Error(`Yahoo Finance error: ${res.status}`);

    const data = await res.json();
    const quotes = data?.quoteResponse?.result ?? [];

    const formatted = quotes.map((q: {
      symbol: string;
      shortName?: string;
      regularMarketPrice?: number;
      regularMarketChange?: number;
      regularMarketChangePercent?: number;
      regularMarketOpen?: number;
      regularMarketDayHigh?: number;
      regularMarketDayLow?: number;
      regularMarketPreviousClose?: number;
    }) => ({
      symbol: q.symbol,
      name: q.shortName || q.symbol,
      price: q.regularMarketPrice,
      change: q.regularMarketChange,
      changePct: q.regularMarketChangePercent,
      open: q.regularMarketOpen,
      high: q.regularMarketDayHigh,
      low: q.regularMarketDayLow,
      prevClose: q.regularMarketPreviousClose,
    }));

    return NextResponse.json({ quotes: formatted, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Market API error:', err);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
