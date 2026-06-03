import Link from 'next/link';
import type { Metadata } from 'next';
import InvestingWidget from '@/components/InvestingWidget';

export const metadata: Metadata = {
  title: 'Cryptocurrency Prices in India | Bitcoin, Ethereum Live | BridgeSpark',
  description: 'Live cryptocurrency prices in INR and USD. Bitcoin, Ethereum, BNB, Solana and top altcoins. Crypto news, analysis and market data for Indian investors.',
  keywords: 'bitcoin price india, crypto price inr, ethereum price india, cryptocurrency india, bitcoin INR, crypto news india',
};

const CRYPTO_TABLE = [
  { rank: 1, symbol: 'BTC', name: 'Bitcoin', price: '$67,420', inr: '₹56,24,520', change24h: '+2.34%', change7d: '+8.12%', mc: '$1.32T', vol: '$28.4B', up: true },
  { rank: 2, symbol: 'ETH', name: 'Ethereum', price: '$3,540', inr: '₹2,95,380', change24h: '+1.82%', change7d: '+5.40%', mc: '$425B', vol: '$14.2B', up: true },
  { rank: 3, symbol: 'BNB', name: 'BNB', price: '$578', inr: '₹48,230', change24h: '-0.42%', change7d: '+2.10%', mc: '$84B', vol: '$1.8B', up: false },
  { rank: 4, symbol: 'SOL', name: 'Solana', price: '$182', inr: '₹15,180', change24h: '+3.21%', change7d: '+11.50%', mc: '$80B', vol: '$3.2B', up: true },
  { rank: 5, symbol: 'XRP', name: 'XRP', price: '$0.612', inr: '₹51.06', change24h: '-1.10%', change7d: '-3.20%', mc: '$35B', vol: '$1.2B', up: false },
  { rank: 6, symbol: 'USDC', name: 'USD Coin', price: '$1.00', inr: '₹83.42', change24h: '0.00%', change7d: '0.00%', mc: '$32B', vol: '$6.4B', up: true },
  { rank: 7, symbol: 'ADA', name: 'Cardano', price: '$0.48', inr: '₹40.04', change24h: '+1.60%', change7d: '+4.20%', mc: '$17B', vol: '$420M', up: true },
  { rank: 8, symbol: 'DOGE', name: 'Dogecoin', price: '$0.168', inr: '₹14.01', change24h: '+4.50%', change7d: '+12.30%', mc: '$24B', vol: '$980M', up: true },
  { rank: 9, symbol: 'AVAX', name: 'Avalanche', price: '$38.40', inr: '₹3,203', change24h: '+2.80%', change7d: '+7.60%', mc: '$16B', vol: '$380M', up: true },
  { rank: 10, symbol: 'MATIC', name: 'Polygon', price: '$0.84', inr: '₹70.07', change24h: '-0.80%', change7d: '-2.40%', mc: '$8B', vol: '$240M', up: false },
];

const CRYPTO_NEWS = [
  { title: 'Bitcoin breaks $67,000 resistance — analysts eye $75K next', time: '30 min ago', tag: 'BTC' },
  { title: 'Ethereum ETF inflows hit record $1.2B in a single week', time: '2 hrs ago', tag: 'ETH' },
  { title: 'India crypto tax regime under review — Finance Ministry sources', time: '4 hrs ago', tag: 'INDIA' },
  { title: 'Solana overtakes BNB in daily DEX trading volume for second week', time: '6 hrs ago', tag: 'SOL' },
  { title: 'SEBI issues advisory on unregistered crypto exchanges operating in India', time: '8 hrs ago', tag: 'SEBI' },
];

export default function CryptoPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-4">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-black">🪙 Crypto Markets</h1>
          <p className="text-orange-100 text-[12px]">Live prices in USD & INR · Updated every 30 seconds</p>
        </div>
        <div className="flex gap-3 text-center">
          <div className="bg-white/20 rounded px-3 py-2">
            <div className="text-[16px] font-black">$2.4T</div>
            <div className="text-[10px] text-orange-100">Total Market Cap</div>
          </div>
          <div className="bg-white/20 rounded px-3 py-2">
            <div className="text-[16px] font-black">$98B</div>
            <div className="text-[10px] text-orange-100">24h Volume</div>
          </div>
          <div className="bg-white/20 rounded px-3 py-2">
            <div className="text-[16px] font-black">54.2%</div>
            <div className="text-[10px] text-orange-100">BTC Dominance</div>
          </div>
        </div>
      </div>

      {/* Fear & Greed */}
      <div className="bg-white border border-gray-200 rounded p-3 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-500 font-medium">Crypto Fear & Greed Index:</span>
          <span className="bg-green-100 text-green-700 font-black text-[13px] px-2 py-0.5 rounded">72 — Greed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-500">BTC 30-day return:</span>
          <span className="text-green-600 font-bold text-[13px]">+18.4%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-500">ETH/BTC ratio:</span>
          <span className="font-bold text-[13px] text-gray-700">0.0525</span>
        </div>
        <div className="ml-auto text-[11px] text-gray-400 italic">Note: Crypto is highly volatile. Not investment advice.</div>
      </div>

      {/* Live Investing.com crypto widget — full width */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <h2 className="section-title mb-0">Live Crypto Rates</h2>
          <span className="text-[11px] text-gray-400">Powered by Investing.com · Real-time data</span>
        </div>
        <InvestingWidget type="crypto" height={600} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Crypto news */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-orange-500 text-white text-[11px] font-bold px-3 py-1.5">CRYPTO NEWS</div>
            <div className="divide-y divide-gray-50">
              {CRYPTO_NEWS.map((n) => (
                <div key={n.title} className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className="bg-orange-100 text-orange-700 text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5">{n.tag}</span>
                    <div>
                      <p className="text-[12px] font-medium text-gray-800 leading-snug line-clamp-2">{n.title}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad */}
          <div className="h-48 bg-gray-200 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-400 text-[11px]">300×250 Ad</div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-[11px] text-yellow-800 font-medium">⚠️ Disclaimer</p>
            <p className="text-[11px] text-yellow-700 mt-1">Cryptocurrency investments are subject to high market risk. Past performance does not guarantee future results. BridgeSpark does not provide investment advice.</p>
          </div>

          <Link href="/publishers" className="block bg-[#1a1a2e] text-white rounded p-3 hover:bg-[#0d1b2a] transition">
            <p className="text-[10px] text-yellow-400 font-bold mb-1">EXCLUSIVE PARTNER</p>
            <p className="text-[12px] font-bold">Advertise on Investing.com India</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Reach 10M+ Indian investors →</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
