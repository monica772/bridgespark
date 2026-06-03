import Link from 'next/link';
import type { Metadata } from 'next';
import TradingViewWidget from '@/components/TradingViewWidget';

export const metadata: Metadata = {
  title: 'US Stock Market Live | Nasdaq Dow Jones S&P 500 | BridgeSpark',
  description: 'Live US stock prices powered by TradingView — Apple, Microsoft, NVIDIA, Tesla, Amazon and more. Nasdaq, Dow Jones, S&P 500 data for Indian investors.',
  keywords: 'US stocks India, nasdaq live, dow jones live, S&P 500 today, apple stock price, nvidia stock, us market india',
};

const US_NEWS = [
  { title: 'Fed minutes signal rate cuts possible in H2 2025 if inflation cools', time: '1 hr ago', tag: 'FED' },
  { title: 'NVIDIA surpasses $2T market cap — driven by AI chip demand surge', time: '3 hrs ago', tag: 'NVDA' },
  { title: 'Apple Vision Pro 2 rumoured for Q4 2025 — supply chain sources', time: '5 hrs ago', tag: 'AAPL' },
  { title: 'US jobless claims fall to 3-month low; labour market stays tight', time: '7 hrs ago', tag: 'ECONOMY' },
  { title: "Meta's AI ad targeting boosts Q1 revenue 27% YoY — beats estimates", time: '9 hrs ago', tag: 'META' },
];

export default function USStocksPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-4">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#1565c0] text-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-black">🇺🇸 US Stock Markets</h1>
          <p className="text-blue-200 text-[12px]">Live data powered by TradingView · NYSE & NASDAQ</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/15 rounded px-3 py-2 text-center">
            <div className="text-[13px] font-black text-green-300">Market Open</div>
            <div className="text-[10px] text-blue-200">NYSE / NASDAQ</div>
          </div>
          <div className="bg-white/15 rounded px-3 py-2 text-center">
            <div className="text-[13px] font-black">IST 7:00 PM</div>
            <div className="text-[10px] text-blue-200">Closes 1:30 AM IST</div>
          </div>
        </div>
      </div>

      {/* TradingView attribution */}
      <div className="bg-[#1a1a2e] text-white rounded px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-[12px] text-gray-300">
          Live data powered by <strong className="text-white">TradingView</strong>
        </span>
        <a href="https://www.tradingview.com" target="_blank" rel="nofollow noreferrer"
          className="text-[11px] text-blue-400 hover:underline">
          Visit TradingView →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">

        {/* Left: TradingView widgets */}
        <div className="space-y-3">

          {/* Market Overview with tabs: Indices / Big Tech / Finance */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
              <h2 className="section-title mb-0">US Market Overview</h2>
              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Live
              </span>
            </div>
            <TradingViewWidget type="market-overview" height={500} />
          </div>

          {/* Full Stock Screener */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <h2 className="section-title mb-0">US Stock Screener</h2>
            </div>
            <TradingViewWidget type="screener" height={600} />
          </div>

          {/* Info box for Indian investors */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-[13px] font-bold text-blue-900 mb-1">💡 Investing in US Stocks from India?</p>
            <p className="text-[12px] text-blue-700">
              Indian residents can invest up to <strong>$2,50,000/year</strong> in US stocks under the{' '}
              <strong>LRS (Liberalised Remittance Scheme)</strong>. Gains are taxable as per Indian income tax law.
              Consult a financial advisor before investing.
            </p>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-3">

          {/* US Market News */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#1565c0] text-white text-[11px] font-bold px-3 py-1.5">🇺🇸 US MARKET NEWS</div>
            <div className="divide-y divide-gray-50">
              {US_NEWS.map((n) => (
                <div key={n.title} className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5">{n.tag}</span>
                    <div>
                      <p className="text-[12px] font-medium text-gray-800 leading-snug line-clamp-2">{n.title}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-48 flex items-center justify-center text-gray-400 text-[11px]">
            300×250 Ad
          </div>

          {/* Investing.com CTA */}
          <Link href="/publishers" className="block bg-[#1a1a2e] text-white rounded p-3 hover:bg-[#0d1b2a] transition">
            <p className="text-[10px] text-yellow-400 font-bold mb-1">EXCLUSIVE INDIA PARTNER</p>
            <p className="text-[12px] font-bold">Advertise on Investing.com</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Reach 10M+ Indian investors →</p>
          </Link>

          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-64 flex items-center justify-center text-gray-400 text-[11px]">
            300×600 Ad
          </div>

        </div>
      </div>
    </div>
  );
}
