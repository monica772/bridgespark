'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { IPOItem, NCDItem, RightsItem } from '@/lib/fetchIPO';

const TABS = [
  { key: 'open',    label: '🔴 Open IPOs',       badge: 'LIVE' },
  { key: 'upcoming',label: '⏳ Upcoming IPOs',    badge: '' },
  { key: 'listed',  label: '✅ Recently Listed',  badge: '' },
  { key: 'sme',     label: '🏭 SME IPO',          badge: '' },
  { key: 'ncd',     label: '📄 NCDs',             badge: '' },
  { key: 'rights',  label: '⚖️ Rights Issues',    badge: '' },
];

const STATUS_COLORS = {
  open:     'bg-green-100 text-green-700',
  upcoming: 'bg-yellow-100 text-yellow-700',
  listed:   'bg-blue-100 text-blue-700',
  closed:   'bg-gray-100 text-gray-500',
};

function IPOTable({ ipos, showListing = false }: { ipos: IPOItem[]; showListing?: boolean }) {
  if (!ipos.length) return <div className="p-6 text-center text-gray-400 text-[13px]">No data available</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-[11px] text-gray-500 uppercase">
            <th className="text-left px-3 py-2">Company</th>
            <th className="text-center px-3 py-2">Open</th>
            <th className="text-center px-3 py-2">Close</th>
            <th className="text-right px-3 py-2">Price (₹)</th>
            <th className="text-right px-3 py-2">Lot</th>
            <th className="text-right px-3 py-2">Issue Size</th>
            {showListing ? (
              <>
                <th className="text-right px-3 py-2">Listing Price</th>
                <th className="text-right px-3 py-2">Listing Gain</th>
              </>
            ) : (
              <>
                <th className="text-right px-3 py-2 hidden md:table-cell">GMP</th>
                <th className="text-right px-3 py-2 hidden md:table-cell">Sub.</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {ipos.map((ipo, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
              <td className="px-3 py-2.5">
                <div className="font-semibold text-gray-800">{ipo.company}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{ipo.exchange}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${STATUS_COLORS[ipo.status]}`}>
                    {ipo.status.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5 text-center text-gray-600">{ipo.openDate}</td>
              <td className="px-3 py-2.5 text-center text-gray-600">{ipo.closeDate}</td>
              <td className="px-3 py-2.5 text-right font-semibold">
                {ipo.priceMin === ipo.priceMax || ipo.priceMin === '—'
                  ? ipo.priceMax
                  : `${ipo.priceMin}–${ipo.priceMax}`}
              </td>
              <td className="px-3 py-2.5 text-right text-gray-600">{ipo.lotSize}</td>
              <td className="px-3 py-2.5 text-right text-gray-600">{ipo.issueSize}</td>
              {showListing ? (
                <>
                  <td className="px-3 py-2.5 text-right font-bold">₹{ipo.listingPrice}</td>
                  <td className={`px-3 py-2.5 text-right font-bold ${ipo.listingGain?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {ipo.listingGain}
                  </td>
                </>
              ) : (
                <>
                  <td className={`px-3 py-2.5 text-right font-bold hidden md:table-cell ${ipo.gmp.startsWith('+') ? 'text-green-600' : ipo.gmp === 'N/A' ? 'text-gray-400' : 'text-red-600'}`}>
                    {ipo.gmp || '—'}
                  </td>
                  <td className="px-3 py-2.5 text-right hidden md:table-cell">
                    {ipo.subscriptionTotal ? (
                      <span className={`font-bold ${parseFloat(ipo.subscriptionTotal) >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                        {ipo.subscriptionTotal}
                      </span>
                    ) : '—'}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NCDTable({ ncds }: { ncds: NCDItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-[11px] text-gray-500 uppercase">
            <th className="text-left px-3 py-2">Company</th>
            <th className="text-center px-3 py-2">Open</th>
            <th className="text-center px-3 py-2">Close</th>
            <th className="text-center px-3 py-2">Rate</th>
            <th className="text-center px-3 py-2">Tenure</th>
            <th className="text-center px-3 py-2">Rating</th>
            <th className="text-right px-3 py-2">Issue Size</th>
            <th className="text-center px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {ncds.map((ncd, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
              <td className="px-3 py-2.5 font-semibold text-gray-800">{ncd.company}</td>
              <td className="px-3 py-2.5 text-center text-gray-600">{ncd.openDate}</td>
              <td className="px-3 py-2.5 text-center text-gray-600">{ncd.closeDate}</td>
              <td className="px-3 py-2.5 text-center font-bold text-green-700">{ncd.rateMin} – {ncd.rateMax}</td>
              <td className="px-3 py-2.5 text-center text-gray-600">{ncd.tenure}</td>
              <td className="px-3 py-2.5 text-center">
                <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold">{ncd.rating}</span>
              </td>
              <td className="px-3 py-2.5 text-right text-gray-600">{ncd.issueSize}</td>
              <td className="px-3 py-2.5 text-center">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${STATUS_COLORS[ncd.status]}`}>
                  {ncd.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RightsTable({ rights }: { rights: RightsItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-[11px] text-gray-500 uppercase">
            <th className="text-left px-3 py-2">Company</th>
            <th className="text-center px-3 py-2">Open</th>
            <th className="text-center px-3 py-2">Close</th>
            <th className="text-center px-3 py-2">Ratio</th>
            <th className="text-right px-3 py-2">Price</th>
            <th className="text-right px-3 py-2">Issue Size</th>
            <th className="text-center px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rights.map((r, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <td className="px-3 py-2.5 font-semibold text-gray-800">{r.company}</td>
              <td className="px-3 py-2.5 text-center text-gray-600">{r.openDate}</td>
              <td className="px-3 py-2.5 text-center text-gray-600">{r.closeDate}</td>
              <td className="px-3 py-2.5 text-center font-bold text-blue-700">{r.ratio}</td>
              <td className="px-3 py-2.5 text-right font-semibold">{r.price}</td>
              <td className="px-3 py-2.5 text-right text-gray-600">{r.issueSize}</td>
              <td className="px-3 py-2.5 text-center">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${STATUS_COLORS[r.status]}`}>
                  {r.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function IPOPage() {
  const [tab, setTab] = useState('open');
  const [data, setData] = useState<{
    open: IPOItem[]; upcoming: IPOItem[]; listed: IPOItem[];
    sme: IPOItem[]; ncds: NCDItem[]; rights: RightsItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ipo')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const counts = {
    open: data?.open?.length ?? 0,
    upcoming: data?.upcoming?.length ?? 0,
    listed: data?.listed?.length ?? 0,
    sme: data?.sme?.length ?? 0,
    ncd: data?.ncds?.length ?? 0,
    rights: data?.rights?.length ?? 0,
    brokers: 0,
  };

  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-3">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#c0392b] to-[#922b21] text-white rounded-lg p-4">
        <h1 className="text-[22px] font-black">📋 IPO, NCD & Investment Hub</h1>
        <p className="text-red-200 text-[12px] mt-1">
          Live data from NSE India · Open IPOs, Upcoming, SME, NCDs, Rights Issues & Broker Reviews
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <div className="flex min-w-max border-b border-gray-100">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold whitespace-nowrap transition border-b-2 ${
                tab === t.key
                  ? 'border-[#c0392b] text-[#c0392b] bg-red-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.label}
              {counts[t.key as keyof typeof counts] > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  tab === t.key ? 'bg-[#c0392b] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {counts[t.key as keyof typeof counts]}
                </span>
              )}
              {t.badge && (
                <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded-full animate-pulse font-black">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 animate-pulse">Loading live IPO data from NSE India…</div>
        ) : (
          <>
            {tab === 'open'     && <IPOTable ipos={data?.open ?? []} />}
            {tab === 'upcoming' && <IPOTable ipos={data?.upcoming ?? []} />}
            {tab === 'listed'   && <IPOTable ipos={data?.listed ?? []} showListing />}
            {tab === 'sme'      && <IPOTable ipos={data?.sme ?? []} />}
            {tab === 'ncd'      && <NCDTable ncds={data?.ncds ?? []} />}
            {tab === 'rights'   && <RightsTable rights={data?.rights ?? []} />}
          </>
        )}

        <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">
            Data source: NSE India · {tab === 'ncd' ? 'NCD data: SEBI filings' : tab === 'rights' ? 'Rights data: BSE/NSE filings' : 'Live via NSE API'}
          </span>
          <span className="text-[10px] text-gray-400">Last updated: just now</span>
        </div>
      </div>

      {/* Info boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: '📌', title: 'What is GMP?', desc: 'Grey Market Premium is the unofficial premium at which IPO shares trade before listing. It\'s indicative, not guaranteed.' },
          { icon: '📊', title: 'How to apply for IPO?', desc: 'Apply via UPI or ASBA through your broker app. Use BHIM UPI, Zerodha Kite, Groww, or any net banking IPO section.' },
          { icon: '💡', title: 'What is SME IPO?', desc: 'Small & Medium Enterprise IPOs list on BSE SME or NSE Emerge platforms. Min lot sizes are usually ₹1–2 lakh.' },
        ].map((tip) => (
          <div key={tip.title} className="bg-white border border-gray-200 rounded p-4">
            <div className="text-xl mb-1">{tip.icon}</div>
            <div className="text-[13px] font-bold text-gray-800 mb-1">{tip.title}</div>
            <div className="text-[11px] text-gray-500">{tip.desc}</div>
          </div>
        ))}
      </div>

      {/* Investing.com CTA */}
      <Link href="/publishers" className="block bg-[#1a1a2e] text-white rounded p-4 hover:bg-[#0d1b2a] transition">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-[10px] text-yellow-400 font-bold mb-0.5">EXCLUSIVE INDIA PARTNER</p>
            <p className="text-[14px] font-black">Advertise on Investing.com India — Reach IPO investors</p>
          </div>
          <span className="text-[12px] text-[#c0392b] font-bold">Get Media Kit →</span>
        </div>
      </Link>
    </div>
  );
}
