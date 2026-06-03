import TopGainersLosers from '@/components/TopGainersLosers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stock Market Dashboard | NSE BSE Live | BridgeSpark',
  description: 'Live NSE and BSE market data — Nifty 50, Sensex, top gainers/losers, sector performance, and market breadth.',
};

const INDICES = [
  { name: 'NIFTY 50', value: '24,780.65', change: '+125.30', pct: '+0.51%', open: '24,690', high: '24,823', low: '24,660', prev: '24,655.35', up: true },
  { name: 'SENSEX', value: '81,450.20', change: '+320.15', pct: '+0.39%', open: '81,200', high: '81,580', low: '81,120', prev: '81,130.05', up: true },
  { name: 'BANK NIFTY', value: '52,340.80', change: '-180.45', pct: '-0.34%', open: '52,560', high: '52,640', low: '52,280', prev: '52,521.25', up: false },
  { name: 'NIFTY IT', value: '38,920.10', change: '+280.60', pct: '+0.73%', open: '38,720', high: '39,050', low: '38,680', prev: '38,639.50', up: true },
  { name: 'NIFTY MIDCAP 50', value: '15,620.30', change: '-42.80', pct: '-0.27%', open: '15,680', high: '15,710', low: '15,590', prev: '15,663.10', up: false },
  { name: 'NIFTY SMALLCAP', value: '9,840.20', change: '+62.40', pct: '+0.64%', open: '9,790', high: '9,870', low: '9,775', prev: '9,777.80', up: true },
];

const SECTORS = [
  { name: 'IT', change: '+1.2%', up: true },
  { name: 'Banking', change: '+0.4%', up: true },
  { name: 'Auto', change: '+1.8%', up: true },
  { name: 'FMCG', change: '-0.3%', up: false },
  { name: 'Pharma', change: '+0.6%', up: true },
  { name: 'Metals', change: '-0.8%', up: false },
  { name: 'Energy', change: '+1.5%', up: true },
  { name: 'Realty', change: '+2.1%', up: true },
  { name: 'Media', change: '-0.5%', up: false },
  { name: 'PSU Bank', change: '-0.2%', up: false },
];

const MOST_ACTIVE = [
  { symbol: 'RELIANCE', price: '2,987.45', volume: '12.4M', value: '₹370Cr', change: '+1.43%', up: true },
  { symbol: 'TCS', price: '4,123.70', volume: '8.2M', value: '₹338Cr', change: '-0.69%', up: false },
  { symbol: 'HDFC BANK', price: '1,654.30', volume: '15.8M', value: '₹261Cr', change: '+1.39%', up: true },
  { symbol: 'INFY', price: '1,876.20', volume: '9.6M', value: '₹180Cr', change: '+0.85%', up: true },
  { symbol: 'ICICI BANK', price: '1,298.90', volume: '11.2M', value: '₹145Cr', change: '-0.63%', up: false },
  { symbol: 'WIPRO', price: '567.45', volume: '18.4M', value: '₹104Cr', change: '+2.21%', up: true },
];

export default function MarketsPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-black text-gray-900">Market Overview</h1>
          <p className="text-[12px] text-gray-500">NSE &amp; BSE live data · Updated every 15 seconds during market hours</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded px-3 py-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[12px] text-green-700 font-semibold">Market Open</span>
        </div>
      </div>

      {/* Indices grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INDICES.map((idx) => (
          <div key={idx.name} className="bg-white border border-gray-200 rounded p-4 hover:shadow-sm transition cursor-pointer">
            <div className="text-[11px] text-gray-500 font-medium mb-1">{idx.name}</div>
            <div className="text-[20px] font-black text-gray-900">{idx.value}</div>
            <div className={`text-[13px] font-bold mb-3 ${idx.up ? 'text-green-600' : 'text-red-600'}`}>
              {idx.up ? '▲' : '▼'} {idx.change} ({idx.pct})
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-500">
              <span>Open: <strong>{idx.open}</strong></span>
              <span>High: <strong className="text-green-600">{idx.high}</strong></span>
              <span>Low: <strong className="text-red-600">{idx.low}</strong></span>
              <span>Prev: <strong>{idx.prev}</strong></span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
        <div className="space-y-3">

          {/* Sector heatmap */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="section-title px-3 pt-3">Sector Performance</div>
            <div className="grid grid-cols-5 gap-2 px-3 pb-3">
              {SECTORS.map((s) => (
                <div
                  key={s.name}
                  className={`rounded p-2 text-center cursor-pointer transition ${
                    s.up ? 'bg-green-50 border border-green-200 hover:bg-green-100' : 'bg-red-50 border border-red-200 hover:bg-red-100'
                  }`}
                >
                  <div className="text-[11px] font-bold text-gray-700">{s.name}</div>
                  <div className={`text-[12px] font-black ${s.up ? 'text-green-700' : 'text-red-700'}`}>{s.change}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Most active */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="px-3 pt-3 pb-1">
              <h2 className="section-title">Most Active Stocks</h2>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Symbol</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Price (₹)</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Volume</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Turnover</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Change</th>
                </tr>
              </thead>
              <tbody>
                {MOST_ACTIVE.map((s) => (
                  <tr key={s.symbol} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2.5 font-bold text-gray-800">{s.symbol}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-700">{s.price}</td>
                    <td className="px-3 py-2.5 text-right text-gray-500">{s.volume}</td>
                    <td className="px-3 py-2.5 text-right text-gray-500">{s.value}</td>
                    <td className={`px-3 py-2.5 text-right font-bold ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                      {s.up ? '▲' : '▼'} {s.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ad */}
          <div className="h-20 bg-gray-200 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-400 text-[11px]">
            970×90 Billboard Advertisement
          </div>
        </div>

        <div className="space-y-3">
          <TopGainersLosers />
          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-48 flex items-center justify-center text-gray-400 text-[11px]">300×250 Ad</div>
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5">MARKET BREADTH</div>
            <div className="p-3 space-y-2">
              {[
                { label: 'Advances', value: 1284, color: 'bg-green-500' },
                { label: 'Declines', value: 980, color: 'bg-red-500' },
                { label: 'Unchanged', value: 136, color: 'bg-gray-400' },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-gray-600">{b.label}</span>
                    <span className="font-bold text-gray-800">{b.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${b.color} rounded-full`} style={{ width: `${(b.value / 2400) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
