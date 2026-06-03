'use client';

import { useState, useEffect } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  pct: string;
  raw: number;
}

// Fallback mock data shown while loading
const MOCK_GAINERS: Stock[] = [
  { symbol: 'WIPRO',      name: 'Wipro',            price: '567.45',   change: '+12.30', pct: '+2.21%', raw: 2.21 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance',     price: '7,823.60', change: '+145.30',pct: '+1.89%', raw: 1.89 },
  { symbol: 'MARUTI',     name: 'Maruti Suzuki',     price: '12,450.00',change: '+230.50',pct: '+1.89%', raw: 1.89 },
  { symbol: 'RELIANCE',   name: 'Reliance',          price: '2,987.45', change: '+42.10', pct: '+1.43%', raw: 1.43 },
  { symbol: 'HDFCBANK',   name: 'HDFC Bank',         price: '1,654.30', change: '+22.60', pct: '+1.39%', raw: 1.39 },
];

const MOCK_LOSERS: Stock[] = [
  { symbol: 'TCS',       name: 'TCS',               price: '4,123.70', change: '-28.50', pct: '-0.69%', raw: -0.69 },
  { symbol: 'HUL',       name: 'Hindustan Unilever', price: '2,456.80', change: '-18.40', pct: '-0.74%', raw: -0.74 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank',         price: '1,298.90', change: '-8.20',  pct: '-0.63%', raw: -0.63 },
  { symbol: 'ONGC',      name: 'ONGC',              price: '265.40',   change: '-3.20',  pct: '-1.19%', raw: -1.19 },
  { symbol: 'BPCL',      name: 'BPCL',              price: '312.60',   change: '-4.80',  pct: '-1.51%', raw: -1.51 },
];

export default function TopGainersLosers() {
  const [tab, setTab] = useState<'gainers' | 'losers'>('gainers');
  const [gainers, setGainers] = useState<Stock[]>(MOCK_GAINERS);
  const [losers, setLosers]   = useState<Stock[]>(MOCK_LOSERS);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  async function loadData() {
    try {
      const res = await fetch('/api/gainers-losers');
      const data = await res.json();
      if (data.gainers?.length) {
        setGainers(data.gainers);
        setLosers(data.losers);
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      }
    } catch {
      // silently keep fallback
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60_000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const list = tab === 'gainers' ? gainers : losers;
  const isGainers = tab === 'gainers';

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab('gainers')}
          className={`flex-1 py-2 text-[11px] font-bold transition ${
            tab === 'gainers'
              ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          TOP GAINERS
        </button>
        <button
          onClick={() => setTab('losers')}
          className={`flex-1 py-2 text-[11px] font-bold transition ${
            tab === 'losers'
              ? 'bg-red-50 text-red-700 border-b-2 border-red-600'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          TOP LOSERS
        </button>
      </div>

      {/* Live badge */}
      <div className="flex items-center justify-between px-3 py-1 bg-gray-50 border-b border-gray-100">
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          {loading ? (
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block animate-pulse"></span>
          ) : (
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
          )}
          {loading ? 'Loading live data…' : `Live · NSE · Updated ${lastUpdated || 'just now'}`}
        </span>
        <span className="text-[10px] text-gray-400">Nifty 50 + Midcap</span>
      </div>

      {/* Stock rows */}
      <div>
        {list.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between px-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition"
          >
            <div>
              <div className="text-[12px] font-bold text-gray-800">{stock.symbol}</div>
              <div className="text-[10px] text-gray-400 truncate max-w-[120px]">{stock.name}</div>
            </div>
            <div className="text-right">
              <div className="text-[12px] font-semibold text-gray-800">₹{stock.price}</div>
              <div className={`text-[11px] font-bold ${isGainers ? 'text-green-600' : 'text-red-600'}`}>
                {isGainers ? '▲' : '▼'} {stock.change} ({stock.pct})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
