import { MarketQuote } from '@/lib/fetchMarketData';

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// How many decimals to show per symbol
function decimalsFor(symbol: string) {
  if (symbol === 'JPYINR=X') return 4;
  if (symbol.endsWith('INR=X')) return 2;
  return 2;
}

function QuoteCard({ q }: { q: MarketQuote }) {
  return (
    <div className="p-2.5 hover:bg-gray-50 transition cursor-pointer min-w-0">
      <div className="text-[10px] text-gray-500 font-medium mb-0.5 truncate">{q.name}</div>
      <div className="text-[14px] font-bold text-gray-900 tabular-nums">
        {q.group === 'currency' ? '' : ''}{fmt(q.price, decimalsFor(q.symbol))}
      </div>
      <div className={`text-[11px] font-semibold ${q.up ? 'text-green-600' : 'text-red-600'}`}>
        {q.up ? '▲' : '▼'} {q.change >= 0 ? '+' : ''}{fmt(Math.abs(q.change), decimalsFor(q.symbol))}
        {' '}({q.changePct >= 0 ? '+' : ''}{fmt(q.changePct)}%)
      </div>
    </div>
  );
}

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className={`${color} text-white text-[10px] font-bold px-2.5 py-1 flex items-center gap-1 whitespace-nowrap`}>
      {label}
    </div>
  );
}

export default function MarketBar({ quotes }: { quotes: MarketQuote[] }) {
  const indices    = quotes.filter((q) => q.group === 'index');
  const currencies = quotes.filter((q) => q.group === 'currency');
  const commodities= quotes.filter((q) => q.group === 'commodity');

  const isLive = quotes.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">

      {/* Header */}
      <div className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5 flex items-center justify-between">
        <span>MARKET SNAPSHOT</span>
        <span className="flex items-center gap-1 text-[10px] font-normal">
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLive ? 'bg-green-300' : 'bg-yellow-300'}`}></span>
          {isLive ? 'Live · Yahoo Finance' : 'Loading…'}
        </span>
      </div>

      {/* Indices */}
      {indices.length > 0 && (
        <div>
          <SectionHeader label="📈 INDICES" color="bg-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-y divide-gray-100">
            {indices.map((q) => <QuoteCard key={q.symbol} q={q} />)}
          </div>
        </div>
      )}

      {/* Currency */}
      {currencies.length > 0 && (
        <div className="border-t border-gray-200">
          <SectionHeader label="💱 CURRENCY (vs INR)" color="bg-blue-700" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-y divide-gray-100">
            {currencies.map((q) => (
              <div key={q.symbol} className="p-2.5 hover:bg-blue-50/30 transition cursor-pointer min-w-0">
                <div className="text-[10px] text-gray-500 font-medium mb-0.5">{q.name}</div>
                <div className="text-[14px] font-bold text-gray-900 tabular-nums">
                  ₹{fmt(q.price, decimalsFor(q.symbol))}
                </div>
                <div className={`text-[11px] font-semibold ${q.up ? 'text-green-600' : 'text-red-600'}`}>
                  {q.up ? '▲' : '▼'} {fmt(Math.abs(q.changePct))}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Commodities */}
      {commodities.length > 0 && (
        <div className="border-t border-gray-200">
          <SectionHeader label="🏭 COMMODITIES" color="bg-amber-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-gray-100">
            {commodities.map((q) => <QuoteCard key={q.symbol} q={q} />)}
          </div>
        </div>
      )}

    </div>
  );
}
