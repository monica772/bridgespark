'use client';

import { useEffect, useState } from 'react';

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  up: boolean;
}

// Static fallback shown instantly before API loads
const FALLBACK: TickerItem[] = [
  { symbol: '^NSEI',      name: 'NIFTY 50',    price: 24780.65, changePct: 0.51,  up: true  },
  { symbol: '^BSESN',     name: 'SENSEX',      price: 81450.20, changePct: 0.39,  up: true  },
  { symbol: '^NSEBANK',   name: 'BANK NIFTY',  price: 52340.80, changePct: -0.34, up: false },
  { symbol: '^CNXIT',     name: 'NIFTY IT',    price: 38920.10, changePct: 0.73,  up: true  },
  { symbol: 'RELIANCE.NS',name: 'RELIANCE',    price: 2987.45,  changePct: 1.43,  up: true  },
  { symbol: 'TCS.NS',     name: 'TCS',         price: 4123.70,  changePct: -0.69, up: false },
  { symbol: 'INFY.NS',    name: 'INFOSYS',     price: 1876.20,  changePct: 0.85,  up: true  },
  { symbol: 'HDFCBANK.NS',name: 'HDFC BANK',   price: 1654.30,  changePct: 1.39,  up: true  },
  { symbol: 'GC=F',       name: 'GOLD',        price: 73240.00, changePct: 0.25,  up: true  },
  { symbol: 'CL=F',       name: 'CRUDE OIL',   price: 6842.00,  changePct: -0.61, up: false },
  { symbol: 'USDINR=X',   name: 'USD/INR',     price: 83.42,    changePct: 0.10,  up: true  },
  { symbol: 'EURINR=X',   name: 'EUR/INR',     price: 90.28,    changePct: -0.13, up: false },
  { symbol: 'GBPINR=X',   name: 'GBP/INR',     price: 105.64,   changePct: 0.21,  up: true  },
  { symbol: 'AEDINR=X',   name: 'AED/INR',     price: 22.70,    changePct: 0.09,  up: true  },
  { symbol: 'BTC-USD',    name: 'BITCOIN',     price: 67420.00, changePct: 2.34,  up: true  },
];

export default function TickerStrip() {
  const [tickers, setTickers] = useState<TickerItem[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/market')
      .then((r) => r.json())
      .then((data) => {
        if (data?.quotes?.length) {
          setTickers(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.quotes.map((q: any) => ({
              symbol:    q.symbol,
              name:      q.name || q.symbol,
              price:     q.price ?? 0,
              changePct: q.changePct ?? 0,
              up:        (q.change ?? 0) >= 0,
            }))
          );
        }
      })
      .catch(() => {}); // silently keep fallback on error

    // Refresh every 60 seconds
    const interval = setInterval(() => {
      fetch('/api/market')
        .then((r) => r.json())
        .then((data) => {
          if (data?.quotes?.length) {
            setTickers(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.quotes.map((q: any) => ({
                symbol:    q.symbol,
                name:      q.name || q.symbol,
                price:     q.price ?? 0,
                changePct: q.changePct ?? 0,
                up:        (q.change ?? 0) >= 0,
              }))
            );
          }
        })
        .catch(() => {});
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div className="bg-[#1a1a2e] text-white text-[12px] py-1.5 overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker-track flex gap-0">
          {doubled.map((t, i) => (
            <div
              key={`${t.symbol}-${i}`}
              className="flex items-center gap-1.5 px-4 border-r border-white/10 shrink-0"
            >
              <span className="font-semibold text-white/90 uppercase tracking-wide">{t.name}</span>
              <span className="font-mono text-white">
                {t.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={t.up ? 'text-green-400' : 'text-red-400'}>
                {t.up ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
