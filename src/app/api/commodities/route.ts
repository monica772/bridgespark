import { NextResponse } from 'next/server';

// International commodity futures on Yahoo Finance
// MCX India prices = international price × USD/INR rate
const SYMBOLS = [
  'GC=F',     // Gold (USD/oz)
  'SI=F',     // Silver (USD/oz)
  'CL=F',     // Crude Oil WTI (USD/bbl)
  'BZ=F',     // Brent Crude (USD/bbl)
  'NG=F',     // Natural Gas (USD/MMBtu)
  'HG=F',     // Copper (USD/lb)
  'PL=F',     // Platinum (USD/oz)
  'USDINR=X', // USD/INR rate (to convert)
].join(',');

const DISPLAY: Record<string, { name: string; unit: string; inrFactor: (price: number, usdInr: number) => number; inrUnit: string }> = {
  'GC=F':     { name: 'Gold',         unit: 'USD/oz',    inrFactor: (p, r) => p * r / 31.1035 * 10, inrUnit: '₹/10g'  },
  'SI=F':     { name: 'Silver',       unit: 'USD/oz',    inrFactor: (p, r) => p * r / 31.1035,      inrUnit: '₹/g'    },
  'CL=F':     { name: 'Crude Oil WTI',unit: 'USD/bbl',   inrFactor: (p, r) => p * r / 159,          inrUnit: '₹/L'    },
  'BZ=F':     { name: 'Brent Crude',  unit: 'USD/bbl',   inrFactor: (p, r) => p * r / 159,          inrUnit: '₹/L'    },
  'NG=F':     { name: 'Natural Gas',  unit: 'USD/MMBtu', inrFactor: (p, r) => p * r,                inrUnit: '₹/MMBtu'},
  'HG=F':     { name: 'Copper',       unit: 'USD/lb',    inrFactor: (p, r) => p * r * 2.20462,      inrUnit: '₹/kg'   },
  'PL=F':     { name: 'Platinum',     unit: 'USD/oz',    inrFactor: (p, r) => p * r / 31.1035,      inrUnit: '₹/g'    },
};

export async function GET() {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS}` +
      `&fields=shortName,regularMarketPrice,regularMarketChange,regularMarketChangePercent`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error(`Yahoo Finance: ${res.status}`);

    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = data?.quoteResponse?.result ?? [];

    // Get USD/INR rate first
    const usdInr = raw.find((q) => q.symbol === 'USDINR=X')?.regularMarketPrice ?? 83.5;

    const commodities = raw
      .filter((q) => q.symbol !== 'USDINR=X' && DISPLAY[q.symbol])
      .map((q) => {
        const meta = DISPLAY[q.symbol];
        const price = q.regularMarketPrice ?? 0;
        const change = q.regularMarketChange ?? 0;
        const pct = q.regularMarketChangePercent ?? 0;
        const inrPrice = meta.inrFactor(price, usdInr);

        return {
          symbol:    q.symbol,
          name:      meta.name,
          usdPrice:  price.toFixed(2),
          usdUnit:   meta.unit,
          inrPrice:  inrPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 }),
          inrUnit:   meta.inrUnit,
          change:    (change >= 0 ? '+' : '') + change.toFixed(2),
          pct:       (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%',
          up:        change >= 0,
        };
      });

    return NextResponse.json({ commodities, usdInr: usdInr.toFixed(2), timestamp: new Date().toISOString() });
  } catch (err) {
    console.warn('Commodities API error:', (err as Error).message);
    return NextResponse.json({ commodities: [], error: true });
  }
}
