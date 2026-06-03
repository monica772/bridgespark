'use client';

import { useEffect, useState } from 'react';

interface Commodity {
  symbol: string;
  name: string;
  usdPrice: string;
  usdUnit: string;
  inrPrice: string;
  inrUnit: string;
  change: string;
  pct: string;
  up: boolean;
}

const ICONS: Record<string, string> = {
  'GC=F': '🥇', 'SI=F': '🥈', 'CL=F': '🛢️',
  'BZ=F': '⛽', 'NG=F': '🔥', 'HG=F': '🔩', 'PL=F': '💎',
};

const FALLBACK: Commodity[] = [
  { symbol: 'GC=F', name: 'Gold',          usdPrice: '2,342.10', usdUnit: 'USD/oz',    inrPrice: '73,240', inrUnit: '₹/10g',   change: '+4.20',  pct: '+0.18%', up: true  },
  { symbol: 'SI=F', name: 'Silver',         usdPrice: '27.45',    usdUnit: 'USD/oz',    inrPrice: '73.5',   inrUnit: '₹/g',     change: '-0.12',  pct: '-0.44%', up: false },
  { symbol: 'CL=F', name: 'Crude Oil WTI',  usdPrice: '82.10',    usdUnit: 'USD/bbl',   inrPrice: '0.43',   inrUnit: '₹/L',     change: '-0.45',  pct: '-0.54%', up: false },
  { symbol: 'BZ=F', name: 'Brent Crude',    usdPrice: '85.40',    usdUnit: 'USD/bbl',   inrPrice: '0.45',   inrUnit: '₹/L',     change: '-0.30',  pct: '-0.35%', up: false },
  { symbol: 'NG=F', name: 'Natural Gas',    usdPrice: '2.14',     usdUnit: 'USD/MMBtu', inrPrice: '178',    inrUnit: '₹/MMBtu', change: '+0.04',  pct: '+1.90%', up: true  },
  { symbol: 'HG=F', name: 'Copper',         usdPrice: '4.52',     usdUnit: 'USD/lb',    inrPrice: '830',    inrUnit: '₹/kg',    change: '+0.08',  pct: '+1.80%', up: true  },
  { symbol: 'PL=F', name: 'Platinum',       usdPrice: '986.00',   usdUnit: 'USD/oz',    inrPrice: '2,643',  inrUnit: '₹/g',     change: '-3.20',  pct: '-0.32%', up: false },
];

export default function CommoditiesWidget() {
  const [data, setData]           = useState<Commodity[]>(FALLBACK);
  const [usdInr, setUsdInr]       = useState('83.50');
  const [loading, setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  async function load() {
    try {
      const res  = await fetch('/api/commodities');
      const json = await res.json();
      if (json.commodities?.length) {
        setData(json.commodities);
        setUsdInr(json.usdInr);
        setLastUpdated(
          new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        );
      }
    } catch { /* keep fallback */ }
    finally { setLoading(false); }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 text-white px-3 py-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold">🏭 COMMODITIES</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          {loading
            ? <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            : <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          }
          {loading ? 'Loading…' : `Live · ${lastUpdated}`}
        </span>
      </div>

      {/* INR note */}
      <div className="bg-gray-50 border-b border-gray-100 px-3 py-1 flex items-center justify-between">
        <span className="text-[10px] text-gray-500">All prices in Indian Rupees (INR)</span>
        <span className="text-[10px] text-gray-400">USD/INR: ₹{usdInr}</span>
      </div>

      {/* Rows */}
      {data.map((c) => (
        <div
          key={c.symbol}
          className="flex items-center justify-between px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{ICONS[c.symbol] ?? '📦'}</span>
            <div>
              <div className="text-[12px] font-semibold text-gray-800">{c.name}</div>
              <div className="text-[10px] text-gray-400">{c.inrUnit}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-bold text-gray-900">₹{c.inrPrice}</div>
            <div className={`text-[11px] font-bold ${c.up ? 'text-green-600' : 'text-red-600'}`}>
              {c.up ? '▲' : '▼'} {c.pct}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
