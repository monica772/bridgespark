import Link from 'next/link';
import { SAMPLE_NEWS } from '@/data/news';
import type { NewsItem } from '@/data/news';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial News | BridgeSpark',
  description: 'Latest stock market news, economy updates, and financial insights from India and global markets.',
};

const CATEGORIES = ['All', 'Markets', 'Economy', 'Earnings', 'IPO', 'Commodities', 'Tech', 'Banking', 'Global'];

// Extend the sample to show more
const ALL_NEWS: NewsItem[] = [
  ...SAMPLE_NEWS,
  {
    id: 9, title: 'RIL AGM: Mukesh Ambani announces ₹75,000 crore capex plan for FY25', summary: 'Reliance Industries chairman outlined a massive investment plan across telecom, retail and new energy verticals.', category: 'Markets', source: 'BridgeSpark', time: '6 hrs ago',
  },
  {
    id: 10, title: 'FII net buyers for 8th straight session; buy ₹4,200 crore in equities', summary: 'Foreign institutional investors continued their buying streak in Indian equities, boosting market sentiment.', category: 'Markets', source: 'BridgeSpark', time: '7 hrs ago',
  },
  {
    id: 11, title: 'IT sector sees recovery; deal wins at 5-year high in Q1 FY25', summary: 'Indian IT services companies have reported a surge in large deal wins, signalling a recovery after a muted FY24.', category: 'Tech', source: 'BridgeSpark', time: '8 hrs ago',
  },
  {
    id: 12, title: 'SIP inflows hit ₹21,000 crore in May — record for third consecutive month', summary: 'Systematic Investment Plans continue to attract record inflows as retail investors remain bullish.', category: 'Economy', source: 'BridgeSpark', time: '10 hrs ago',
  },
];

export default function NewsPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4">

      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap mb-4 bg-white border border-gray-200 rounded p-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded text-[12px] font-semibold transition ${
              cat === 'All' ? 'bg-[#c0392b] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
        {/* News list */}
        <div className="space-y-3">
          {/* Featured */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            {ALL_NEWS[0]?.image && (
              <img src={ALL_NEWS[0].image} alt={ALL_NEWS[0].title} className="w-full h-52 object-cover" />
            )}
            <div className="p-4">
              <span className="text-[11px] font-bold text-[#c0392b]">{ALL_NEWS[0]?.category}</span>
              <h2 className="text-[18px] font-bold text-gray-900 mt-1 leading-snug">{ALL_NEWS[0]?.title}</h2>
              <p className="text-[13px] text-gray-600 mt-2">{ALL_NEWS[0]?.summary}</p>
              <span className="text-[11px] text-gray-400 mt-2 block">{ALL_NEWS[0]?.time}</span>
            </div>
          </div>

          {/* Article list */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <h2 className="section-title">Latest Stories</h2>
            <div className="space-y-0">
              {ALL_NEWS.slice(1).map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="block group">
                  <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-4 px-4 transition">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-24 h-16 object-cover rounded flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-[#c0392b] uppercase">{item.category}</span>
                      <h3 className="text-[13px] font-semibold text-gray-800 group-hover:text-[#c0392b] leading-snug mt-0.5 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{item.summary}</p>
                      <span className="text-[10px] text-gray-400">{item.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-48 flex items-center justify-center text-gray-400 text-[11px]">
            300×250 Ad
          </div>

          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5">TRENDING TOPICS</div>
            <div className="p-3 flex flex-wrap gap-2">
              {['Nifty 50', 'Budget 2025', 'RBI Policy', 'TCS Earnings', 'IPO GMP', 'SIP', 'Gold Rate', 'US Fed', 'Reliance AGM', 'HDFC Bank'].map((t) => (
                <span key={t} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded hover:bg-[#c0392b] hover:text-white cursor-pointer transition">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-64 flex items-center justify-center text-gray-400 text-[11px]">
            300×600 Ad
          </div>
        </div>
      </div>
    </div>
  );
}
