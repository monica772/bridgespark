'use client';

import { useState } from 'react';

const CRYPTO = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,420', inr: '₹56.2L', change: '+2.34%', up: true, mc: '$1.32T' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,540', inr: '₹2.95L', change: '+1.82%', up: true, mc: '$425B' },
  { symbol: 'BNB', name: 'BNB', price: '$578', inr: '₹48,230', change: '-0.42%', up: false, mc: '$84B' },
  { symbol: 'SOL', name: 'Solana', price: '$182', inr: '₹15,180', change: '+3.21%', up: true, mc: '$80B' },
  { symbol: 'XRP', name: 'XRP', price: '$0.612', inr: '₹51.06', change: '-1.10%', up: false, mc: '$35B' },
  { symbol: 'DOGE', name: 'Dogecoin', price: '$0.168', inr: '₹14.01', change: '+4.50%', up: true, mc: '$24B' },
];

const US_STOCKS = [
  { symbol: 'AAPL', name: 'Apple', price: '$189.42', change: '+0.82%', up: true },
  { symbol: 'MSFT', name: 'Microsoft', price: '$415.30', change: '+1.20%', up: true },
  { symbol: 'NVDA', name: 'NVIDIA', price: '$875.60', change: '+2.80%', up: true },
  { symbol: 'GOOGL', name: 'Alphabet', price: '$175.20', change: '-0.35%', up: false },
  { symbol: 'AMZN', name: 'Amazon', price: '$192.80', change: '+0.64%', up: true },
  { symbol: 'TSLA', name: 'Tesla', price: '$248.50', change: '-1.42%', up: false },
];

export default function CryptoUSWidget() {
  const [tab, setTab] = useState<'crypto' | 'us'>('crypto');

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab('crypto')}
          className={`flex-1 py-2 text-[11px] font-bold transition ${tab === 'crypto' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          🪙 CRYPTO
        </button>
        <button
          onClick={() => setTab('us')}
          className={`flex-1 py-2 text-[11px] font-bold transition ${tab === 'us' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          🇺🇸 US STOCKS
        </button>
      </div>

      {tab === 'crypto' && (
        <div>
          {CRYPTO.map((c) => (
            <div key={c.symbol} className="flex items-center justify-between px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600">{c.symbol.slice(0,1)}</div>
                <div>
                  <div className="text-[12px] font-bold text-gray-800">{c.symbol}</div>
                  <div className="text-[10px] text-gray-400">{c.mc}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-bold text-gray-800">{c.price}</div>
                <div className="text-[10px] text-gray-500">{c.inr}</div>
                <div className={`text-[11px] font-bold ${c.up ? 'text-green-600' : 'text-red-600'}`}>{c.change}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'us' && (
        <div>
          {US_STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-blue-100 flex items-center justify-center text-[9px] font-black text-blue-700">{s.symbol.slice(0,3)}</div>
                <div>
                  <div className="text-[12px] font-bold text-gray-800">{s.symbol}</div>
                  <div className="text-[10px] text-gray-400">{s.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-bold text-gray-800">{s.price}</div>
                <div className={`text-[11px] font-bold ${s.up ? 'text-green-600' : 'text-red-600'}`}>{s.change}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
