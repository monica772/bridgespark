import { NextResponse } from 'next/server';

// Nifty 50 + popular midcap stocks on NSE
const NSE_SYMBOLS = [
  'RELIANCE.NS','TCS.NS','INFY.NS','HDFCBANK.NS','ICICIBANK.NS',
  'WIPRO.NS','BAJFINANCE.NS','MARUTI.NS','HINDUNILVR.NS','AXISBANK.NS',
  'KOTAKBANK.NS','SBIN.NS','BHARTIARTL.NS','TATAMOTORS.NS','ADANIENT.NS',
  'ADANIPORTS.NS','TITAN.NS','SUNPHARMA.NS','HCLTECH.NS','LTIM.NS',
  'ONGC.NS','NTPC.NS','POWERGRID.NS','COALINDIA.NS','BPCL.NS',
  'JSWSTEEL.NS','TATASTEEL.NS','INDUSINDBK.NS','BAJAJFINSV.NS','DIVISLAB.NS',
  'DRREDDY.NS','CIPLA.NS','NESTLEIND.NS','ULTRACEMCO.NS','GRASIM.NS',
  'APOLLOHOSP.NS','EICHERMOT.NS','HEROMOTOCO.NS','M&M.NS','TECHM.NS',
  'ASIANPAINT.NS','BRITANNIA.NS','SBILIFE.NS','HDFCLIFE.NS','LT.NS',
  'TATACONSUM.NS','PIDILITIND.NS','MUTHOOTFIN.NS','BANDHANBNK.NS','NAUKRI.NS',
].join(',');

export async function GET() {
  try {
    const url =
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${NSE_SYMBOLS}` +
      `&fields=shortName,regularMarketPrice,regularMarketChange,regularMarketChangePercent`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Yahoo Finance: ${res.status}`);

    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quotes: any[] = data?.quoteResponse?.result ?? [];

    const stocks = quotes
      .filter((q) => q.regularMarketPrice && q.regularMarketChangePercent !== undefined)
      .map((q) => ({
        symbol:    q.symbol.replace('.NS', ''),
        name:      q.shortName || q.symbol.replace('.NS', ''),
        price:     q.regularMarketPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change:    (q.regularMarketChange >= 0 ? '+' : '') + q.regularMarketChange.toFixed(2),
        pct:       (q.regularMarketChangePercent >= 0 ? '+' : '') + q.regularMarketChangePercent.toFixed(2) + '%',
        raw:       q.regularMarketChangePercent as number,
      }));

    const sorted = [...stocks].sort((a, b) => b.raw - a.raw);

    return NextResponse.json({
      gainers: sorted.slice(0, 7),
      losers:  [...sorted].reverse().slice(0, 7),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Gainers/Losers API error:', (err as Error).message);
    return NextResponse.json({ gainers: [], losers: [], error: true });
  }
}
