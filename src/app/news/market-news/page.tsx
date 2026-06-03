import type { Metadata } from 'next';
import { fetchAllMarketNews, SOURCE_COLORS, FEEDS } from '@/lib/fetchRSS';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Market News | BridgeSpark — Live from Investing.com, ET Markets, Moneycontrol',
  description: 'Live Indian stock market news from Investing.com, ET Markets, Business Standard and Moneycontrol. NSE, BSE, Nifty, Sensex updates.',
};

export const revalidate = 300;

const SOURCES = ['All', ...FEEDS.map((f) => f.source)];

export default async function MarketNewsPage() {
  const articles = await fetchAllMarketNews(60);

  const counts: Record<string, number> = { All: articles.length };
  articles.forEach((a) => { counts[a.source] = (counts[a.source] || 0) + 1; });

  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-3">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-[20px] font-black text-gray-900">Market News</h1>
          <p className="text-[12px] text-gray-500 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            Live · {articles.length} articles from 4 sources · Refreshes every 5 min
          </p>
        </div>
        <Link href="/news" className="text-[12px] text-[#c0392b] font-medium hover:underline">← All News</Link>
      </div>

      {/* Source attribution bar */}
      <div className="bg-[#1a1a2e] text-white rounded px-4 py-2.5 flex flex-wrap items-center gap-2">
        <span className="text-yellow-400 text-[11px] font-bold uppercase tracking-wide mr-1">Live Sources</span>
        {FEEDS.map((f) => (
          <span key={f.source} className={`text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
            counts[f.source] ? f.color : 'bg-gray-700 text-gray-400 line-through'
          }`}>
            {f.sourceLogo} {f.source} {counts[f.source] ? `(${counts[f.source]})` : ''}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">

        {/* Main feed */}
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          {/* Source filter tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
            {SOURCES.map((s) => (
              <button
                key={s}
                className={`px-3 py-2 text-[11px] font-semibold whitespace-nowrap transition border-b-2 ${
                  s === 'All'
                    ? 'border-[#c0392b] text-[#c0392b] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {s} {counts[s] ? <span className="text-gray-400">({counts[s]})</span> : null}
              </button>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-[14px]">
              Unable to load live feed. Please try again shortly.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {articles.map((article, i) => (
                <a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 p-3 hover:bg-gray-50 transition group"
                >
                  <span className="text-[11px] text-gray-300 font-bold w-5 shrink-0 mt-0.5 tabular-nums">{i + 1}</span>

                  {article.image && (
                    <img src={article.image} alt={article.title} className="w-24 h-16 object-cover rounded flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold text-gray-800 group-hover:text-[#c0392b] leading-snug transition line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-[11px] text-gray-500 line-clamp-1 mb-1">{article.summary}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${SOURCE_COLORS[article.source] || 'bg-gray-100 text-gray-600'}`}>
                        {article.sourceLogo} {article.source}
                      </span>
                      {article.timeAgo && (
                        <>
                          <span className="text-gray-300 text-[10px]">•</span>
                          <span className="text-[10px] text-gray-400">{article.timeAgo}</span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5">TRENDING TOPICS</div>
            <div className="p-3 flex flex-wrap gap-2">
              {['Nifty 50', 'Sensex', 'Bank Nifty', 'FII DII', 'IPO', 'Results', 'RBI', 'Budget', 'Midcap', 'Smallcap', 'Gold', 'Crude Oil'].map((t) => (
                <span key={t} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded hover:bg-[#c0392b] hover:text-white cursor-pointer transition">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-48 flex items-center justify-center text-gray-400 text-[11px]">300×250 Ad</div>

          <a href="https://in.investing.com" target="_blank" rel="nofollow noreferrer"
            className="block bg-[#1a1a2e] text-white rounded p-4 hover:bg-[#0d1b2a] transition">
            <p className="text-[10px] text-yellow-400 font-bold mb-1 uppercase tracking-wide">Exclusive India Partner</p>
            <p className="text-[14px] font-black mb-1">Investing.com India</p>
            <p className="text-[11px] text-gray-400">World&apos;s #1 financial portal. Live rates, news, analysis.</p>
            <p className="text-[11px] text-[#c0392b] font-semibold mt-2">Visit Investing.com →</p>
          </a>

          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-64 flex items-center justify-center text-gray-400 text-[11px]">300×600 Ad</div>
        </div>
      </div>
    </div>
  );
}
