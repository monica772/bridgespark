// Revalidate homepage every 5 minutes to refresh live news
export const revalidate = 300;

import Link from 'next/link';
import MarketBar from '@/components/MarketBar';
import NewsSection from '@/components/NewsSection';
import LiveNewsSection from '@/components/LiveNewsSection';
import { SAMPLE_NEWS } from '@/data/news';
import TopGainersLosers from '@/components/TopGainersLosers';
import TradingViewWidget from '@/components/TradingViewWidget';
import CommoditiesWidget from '@/components/CommoditiesWidget';
import MutualFundsWidget from '@/components/MutualFundsWidget';
import InvestingWidget from '@/components/InvestingWidget';
import { fetchMarketSnapshot, MOCK_MARKET } from '@/lib/fetchMarketData';

const FEATURED_NEWS = SAMPLE_NEWS[0] ?? null;

const QUICK_LINKS = [
  { label: 'Nifty 50', href: '/markets/nifty' },
  { label: 'Sensex', href: '/markets/sensex' },
  { label: 'IPO', href: '/news/ipo' },
  { label: 'Mutual Funds', href: '/mutual-funds' },
  { label: 'Gold Rate', href: '/commodities/gold' },
  { label: 'SIP Calculator', href: '/tools/sip' },
];

const AD_PLACEHOLDER = ({ label }: { label: string }) => (
  <div className="bg-gray-200 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-400 text-[11px] font-medium">
    {label}
  </div>
);

export default async function Home() {
  const liveQuotes = await fetchMarketSnapshot();
  const quotes = liveQuotes.length > 0 ? liveQuotes : MOCK_MARKET;
  return (
    <div className="max-w-[1300px] mx-auto px-3 py-3 space-y-3">

      {/* Quick links */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="text-[12px] font-medium bg-white border border-gray-200 rounded px-2.5 py-1 text-gray-600 hover:text-[#c0392b] hover:border-[#c0392b] transition"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Investing.com exclusive reseller banner */}
      <Link href="/publishers" className="block bg-gradient-to-r from-[#0d1b2a] to-[#1e3a5f] text-white rounded overflow-hidden hover:shadow-lg transition">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide shrink-0">Exclusive</span>
            <span className="text-[13px] font-bold">
              🇮🇳 BridgeSpark is the <span className="text-yellow-300">exclusive authorised advertising partner</span> of <strong>Investing.com</strong> in India
            </span>
          </div>
          <span className="text-yellow-300 text-[12px] font-bold whitespace-nowrap">Advertise on Investing.com →</span>
        </div>
      </Link>

      {/* Leaderboard ad */}
      <div className="h-16 md:h-20">
        <AD_PLACEHOLDER label="728×90 Leaderboard Advertisement" />
      </div>

      {/* Market snapshot — live from Yahoo Finance */}
      <MarketBar quotes={quotes} />


      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">

        {/* Left: Featured + News */}
        <div className="space-y-3">

          {/* Featured story */}
          {FEATURED_NEWS && (
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></span>
              BREAKING NEWS
            </div>
            <div className="flex flex-col md:flex-row gap-0">
              {FEATURED_NEWS.image && (
                <img
                  src={FEATURED_NEWS.image}
                  alt={FEATURED_NEWS.title}
                  className="w-full md:w-64 h-44 object-cover flex-shrink-0"
                />
              )}
              <div className="p-4">
                <span className="text-[11px] font-bold text-[#c0392b] uppercase">{FEATURED_NEWS.category}</span>
                <h2 className="text-[18px] font-bold text-gray-900 mt-1 leading-snug hover:text-[#c0392b] cursor-pointer transition">
                  {FEATURED_NEWS.title}
                </h2>
                <p className="text-[13px] text-gray-600 mt-2 leading-relaxed">
                  {FEATURED_NEWS.summary}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[11px] text-gray-400">{FEATURED_NEWS.time}</span>
                  <Link href={`/news/${FEATURED_NEWS.id}`} className="text-[12px] font-semibold text-[#c0392b] hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* 2-col news + ad */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-3">

            {/* Latest news */}
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <span className="section-title mb-0">Latest News</span>
                <Link href="/news" className="text-[11px] text-[#c0392b] font-medium hover:underline">View All</Link>
              </div>
              <div className="px-3 py-1">
                <LiveNewsSection limit={5} showSourceBar={true} />
              </div>
            </div>

            {/* Market news + ad */}
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                  <div>
                    <span className="section-title mb-0">Market News</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {['Markets', 'Stocks', 'Commodities', 'Bonds', 'Forex'].map((tag) => (
                        <span key={tag} className="text-[9px] font-semibold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/news/market-news" className="text-[11px] text-[#c0392b] font-medium hover:underline shrink-0">View All</Link>
                </div>
                <div className="px-3 py-1">
                  <LiveNewsSection limit={5} filtered={true} />
                </div>
              </div>
              {/* Rectangle ad */}
              <div className="h-48">
                <AD_PLACEHOLDER label="300×250 Medium Rectangle Ad" />
              </div>
            </div>
          </div>

          {/* Economy section */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
              <span className="section-title mb-0">Economy & Policy</span>
              <Link href="/news/economy" className="text-[11px] text-[#c0392b] font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-gray-100">
              {SAMPLE_NEWS.slice(1, 4).map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="block p-3 hover:bg-gray-50 transition group">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-full h-28 object-cover rounded mb-2" />
                  )}
                  <span className="text-[10px] font-bold text-[#c0392b] uppercase">{item.category}</span>
                  <h3 className="text-[13px] font-semibold text-gray-800 mt-0.5 leading-snug group-hover:text-[#c0392b] transition line-clamp-3">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-gray-400 mt-1 block">{item.time}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Full-width banner ad */}
          <div className="h-20 md:h-24">
            <AD_PLACEHOLDER label="970×90 Billboard Advertisement" />
          </div>

        </div>

        {/* Right sidebar */}
        <div className="space-y-3">

          {/* Sidebar ad */}
          <div className="h-48">
            <AD_PLACEHOLDER label="300×250 Sidebar Ad" />
          </div>

          {/* Top gainers/losers */}
          <TopGainersLosers />

          {/* Live Commodities widget */}
          <CommoditiesWidget />

          {/* Live Forex widget from Investing.com */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-gray-800 text-white text-[11px] font-bold px-3 py-1.5">💱 FOREX (INR) — LIVE</div>
            <InvestingWidget type="currency" height={320} />
          </div>

          {/* Live US Stocks widget from TradingView */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
              <span className="section-title mb-0">🇺🇸 US Markets</span>
              <Link href="/us-stocks" className="text-[11px] text-[#c0392b] font-medium hover:underline">Full view →</Link>
            </div>
            <TradingViewWidget type="market-overview" height={400} />
          </div>

          {/* Live Crypto widget from Investing.com */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
              <span className="section-title mb-0">🪙 Live Crypto Rates</span>
              <Link href="/crypto" className="text-[11px] text-[#c0392b] font-medium hover:underline">Full view →</Link>
            </div>
            <InvestingWidget type="crypto" height={400} />
          </div>

          {/* Sidebar ad 2 */}
          <div className="h-48">
            <AD_PLACEHOLDER label="300×600 Half Page Ad" />
          </div>

          {/* IPO widget */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5">UPCOMING IPOs</div>
            {[
              { name: 'Bajaj Housing Finance', date: 'Jun 9-11', price: '₹70', gmp: '+45%' },
              { name: 'Ola Electric', date: 'Jun 14-16', price: '₹76', gmp: '+30%' },
              { name: 'Bharti Hexacom', date: 'Jun 20-24', price: '₹570', gmp: '+22%' },
            ].map((ipo) => (
              <div key={ipo.name} className="px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
                <div className="text-[12px] font-semibold text-gray-800">{ipo.name}</div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[11px] text-gray-500">{ipo.date}</span>
                  <span className="text-[11px] text-gray-500">{ipo.price}</span>
                  <span className="text-[11px] font-bold text-green-600">GMP {ipo.gmp}</span>
                </div>
              </div>
            ))}
            <div className="px-3 py-1.5">
              <Link href="/news/ipo" className="text-[11px] text-[#c0392b] font-medium hover:underline">View all IPOs →</Link>
            </div>
          </div>

          {/* Live Mutual Funds widget */}
          <MutualFundsWidget />

        </div>
      </div>
    </div>
  );
}
