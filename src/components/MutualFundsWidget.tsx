'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Fund {
  code: string;
  name: string;
  category: string;
  nav: string;
  changePct: string;
  up: boolean;
}

const TABS = ['Large Cap', 'Mid Cap', 'Index', 'ELSS'];

const CAT_MAP: Record<string, string> = {
  'Large Cap': 'large-cap',
  'Mid Cap':   'mid-cap',
  'Index':     'index',
  'ELSS':      'elss',
};

export default function MutualFundsWidget() {
  const [tab, setTab]       = useState('Large Cap');
  const [funds, setFunds]   = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/mutual-funds?category=${CAT_MAP[tab]}`)
      .then((r) => r.json())
      .then((d) => { setFunds(d.funds ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [tab]);

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a237e] text-white px-3 py-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold">📋 MUTUAL FUNDS — LIVE NAV</span>
        <Link href="/mutual-funds" className="text-[10px] text-blue-300 hover:underline">View All →</Link>
      </div>

      {/* Category tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap transition border-b-2 ${
              tab === t
                ? 'border-[#1a237e] text-[#1a237e] bg-blue-50'
                : 'border-transparent text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Fund rows */}
      <div className="min-h-[120px]">
        {loading ? (
          <div className="flex items-center justify-center h-24 text-[11px] text-gray-400">
            <span className="animate-pulse">Loading NAV…</span>
          </div>
        ) : funds.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-[11px] text-gray-400">
            Unable to load data
          </div>
        ) : (
          funds.map((fund) => (
            <div key={fund.code} className="flex items-center justify-between px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition">
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-[11px] font-semibold text-gray-800 line-clamp-1">{fund.name}</div>
                <div className="text-[9px] text-gray-400">{fund.category}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[12px] font-bold text-gray-900">₹{fund.nav}</div>
                <div className={`text-[10px] font-bold ${fund.up ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.up ? '▲' : '▼'} {fund.changePct}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[9px] text-gray-400">Source: AMFI India · Daily NAV</span>
        <Link href="/mutual-funds" className="text-[10px] text-[#c0392b] font-semibold hover:underline">
          All Funds →
        </Link>
      </div>
    </div>
  );
}
