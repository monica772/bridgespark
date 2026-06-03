import type { Metadata } from 'next';
import MutualFundsTable from '@/components/MutualFundsTable';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mutual Fund NAV | Live Rates | BridgeSpark',
  description: 'Live NAV of top Indian mutual funds — Large Cap, Mid Cap, Small Cap, ELSS, Index and Flexi Cap. Updated daily from AMFI.',
  keywords: 'mutual fund NAV india, SIP, ELSS, nifty index fund, large cap mutual fund, top mutual funds 2025',
};

export const revalidate = 3600; // NAV updates once a day

const CATEGORIES = [
  { key: 'all',       label: 'All Funds',  icon: '📋' },
  { key: 'large-cap', label: 'Large Cap',  icon: '🏦' },
  { key: 'mid-cap',   label: 'Mid Cap',    icon: '📈' },
  { key: 'small-cap', label: 'Small Cap',  icon: '🚀' },
  { key: 'index',     label: 'Index',      icon: '📊' },
  { key: 'elss',      label: 'ELSS',       icon: '💰' },
  { key: 'flexi-cap', label: 'Flexi Cap',  icon: '🔄' },
];

const SIP_TIPS = [
  { q: 'What is NAV?', a: 'Net Asset Value is the per-unit price of a mutual fund scheme. It is calculated daily after market close.' },
  { q: 'What is ELSS?', a: 'Equity Linked Savings Scheme offers tax deduction under Section 80C up to ₹1.5L/year with a 3-year lock-in.' },
  { q: 'Index vs Active?', a: 'Index funds passively track a benchmark (Nifty 50). Active funds have a manager aiming to beat the index.' },
  { q: 'What is SIP?', a: 'Systematic Investment Plan lets you invest a fixed amount monthly in a mutual fund, averaging purchase cost over time.' },
];

export default async function MutualFundsPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-4">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] text-white rounded-lg p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-black">📋 Mutual Funds — Live NAV</h1>
            <p className="text-blue-200 text-[12px] mt-1">
              NAV sourced from AMFI India · Updated daily after market close · Data via mfapi.in
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/15 rounded px-3 py-2 text-center">
              <div className="text-[16px] font-black">17</div>
              <div className="text-[10px] text-blue-200">Top Schemes</div>
            </div>
            <div className="bg-white/15 rounded px-3 py-2 text-center">
              <div className="text-[16px] font-black">6</div>
              <div className="text-[10px] text-blue-200">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <div className="flex min-w-max">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/mutual-funds?cat=${cat.key}`}
              className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold text-gray-600 hover:text-[#c0392b] hover:bg-red-50 transition border-b-2 border-transparent whitespace-nowrap"
            >
              <span>{cat.icon}</span> {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">

        {/* Main table */}
        <div className="space-y-4">
          {CATEGORIES.filter((c) => c.key !== 'all').map((cat) => (
            <div key={cat.key} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="bg-gray-800 text-white px-3 py-2 flex items-center gap-2">
                <span>{cat.icon}</span>
                <span className="font-bold text-[13px]">{cat.label} Funds</span>
              </div>
              <MutualFundsTable category={cat.key} />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-3">

          {/* SIP Calculator teaser */}
          <div className="bg-gradient-to-br from-[#1a237e] to-[#283593] text-white rounded-lg p-4">
            <h3 className="font-black text-[14px] mb-1">📱 SIP Calculator</h3>
            <p className="text-blue-200 text-[11px] mb-3">
              See how your monthly SIP grows over time with the power of compounding.
            </p>
            <div className="space-y-2">
              <div className="bg-white/10 rounded p-2">
                <div className="text-[10px] text-blue-200">Monthly SIP of ₹5,000 for 10 yrs @ 12%</div>
                <div className="text-[16px] font-black text-yellow-300 mt-0.5">₹11.6 Lakhs</div>
                <div className="text-[10px] text-blue-200">Invested: ₹6L · Gains: ₹5.6L</div>
              </div>
            </div>
          </div>

          {/* AMFI disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-[11px] font-bold text-yellow-800 mb-1">⚠️ Disclaimer</p>
            <p className="text-[11px] text-yellow-700">
              NAV data sourced from AMFI India via mfapi.in. Past performance does not guarantee future returns.
              Mutual fund investments are subject to market risk. Please read all scheme documents carefully before investing.
            </p>
          </div>

          <div className="bg-gray-200 border border-dashed border-gray-400 rounded h-48 flex items-center justify-center text-gray-400 text-[11px]">
            300×250 Ad
          </div>

          {/* Quick FAQ */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-gray-800 text-white text-[11px] font-bold px-3 py-1.5">QUICK GUIDE</div>
            <div className="divide-y divide-gray-50">
              {SIP_TIPS.map((tip) => (
                <div key={tip.q} className="px-3 py-2.5">
                  <p className="text-[12px] font-bold text-gray-800">{tip.q}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{tip.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investing.com CTA */}
          <Link href="/publishers" className="block bg-[#1a1a2e] text-white rounded p-3 hover:bg-[#0d1b2a] transition">
            <p className="text-[10px] text-yellow-400 font-bold mb-1">EXCLUSIVE INDIA PARTNER</p>
            <p className="text-[12px] font-bold">Advertise on Investing.com</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Reach 10M+ Indian investors →</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
