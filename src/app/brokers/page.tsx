'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BROKERS, type Broker } from '@/data/brokers';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StarRating({ value, size = 'sm' }: { value: number; size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 'text-[20px]' : 'text-[13px]';
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1,2,3,4,5].map((n) => (
        <span key={n} className={`${s} ${n <= Math.round(value) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
      ))}
      <span className={`${size === 'lg' ? 'text-[16px]' : 'text-[12px]'} font-black text-gray-700 ml-1`}>{value}</span>
    </span>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-gray-500 w-32 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="text-[11px] font-bold text-gray-700 w-6 text-right">{value}</span>
    </div>
  );
}

function FeatureCheck({ yes }: { yes: boolean }) {
  return <span className={`text-[14px] ${yes ? 'text-green-500' : 'text-red-400'}`}>{yes ? '✓' : '✗'}</span>;
}

// ─── Broker Card (list view) ─────────────────────────────────────────────────
function BrokerRow({ b, onSelect, selected }: { b: Broker; onSelect: (id: string) => void; selected: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-white border rounded-lg overflow-hidden transition ${selected ? 'border-[#c0392b] ring-1 ring-[#c0392b]' : 'border-gray-200 hover:shadow-sm'}`}>
      {/* Main row */}
      <div className="flex items-center gap-3 p-4 flex-wrap">
        {/* Rank */}
        <div className="text-[20px] font-black text-gray-200 w-8 text-center shrink-0">#{b.rank}</div>

        {/* Logo + name */}
        <div className="flex items-center gap-2 w-36 shrink-0">
          <span className="text-3xl">{b.logo}</span>
          <div>
            <div className="font-black text-gray-900 text-[14px]">{b.name}</div>
            <div className="text-[10px] text-gray-400">{b.established}</div>
          </div>
        </div>

        {/* Type + highlight */}
        <div className="flex flex-col gap-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${b.type === 'discount' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {b.type === 'discount' ? 'Discount' : 'Full-Service'}
          </span>
          <span className="text-[10px] text-gray-500">{b.highlight}</span>
        </div>

        {/* Rating */}
        <div className="ml-2">
          <StarRating value={b.rating.overall} />
          <div className="text-[10px] text-gray-400">{b.userReviews.toLocaleString()} reviews</div>
        </div>

        {/* Active clients */}
        <div className="hidden md:block">
          <div className="text-[13px] font-black text-gray-800">{b.activeClients}</div>
          <div className="text-[10px] text-gray-400">Active Clients</div>
        </div>

        {/* Delivery charge */}
        <div className="hidden lg:block">
          <div className="text-[12px] font-bold text-gray-700">{b.charges.equityDelivery}</div>
          <div className="text-[10px] text-gray-400">Eq. Delivery</div>
        </div>

        {/* Options charge */}
        <div className="hidden lg:block">
          <div className="text-[12px] font-bold text-gray-700">{b.charges.options}</div>
          <div className="text-[10px] text-gray-400">Options</div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={selected} onChange={() => onSelect(b.id)}
              className="w-3.5 h-3.5 accent-[#c0392b]" />
            <span className="text-[11px] text-gray-500">Compare</span>
          </label>
          <button onClick={() => setOpen(!open)}
            className="text-[11px] border border-gray-200 px-2.5 py-1 rounded hover:border-[#c0392b] hover:text-[#c0392b] transition">
            {open ? '▲ Less' : '▼ Review'}
          </button>
          <a href={b.openAccountUrl} target="_blank" rel="noopener noreferrer"
            className="text-[12px] bg-[#c0392b] text-white px-3 py-1.5 rounded font-bold hover:bg-[#922b21] transition">
            Open Account
          </a>
        </div>
      </div>

      {/* Expanded review */}
      {open && (
        <div className="border-t border-gray-100">
          {/* Brokerage charges */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-[13px] font-black text-gray-800 mb-3">📋 Brokerage Charges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {[
                { l: 'Equity Delivery',  v: b.charges.equityDelivery },
                { l: 'Equity Intraday',  v: b.charges.equityIntraday },
                { l: 'Futures',          v: b.charges.futures },
                { l: 'Options',          v: b.charges.options },
                { l: 'Commodity',        v: b.charges.commodity },
                { l: 'Currency',         v: b.charges.currency },
                { l: 'Demat AMC',        v: b.charges.dematAMC },
                { l: 'Account Opening',  v: b.charges.accountOpening },
                { l: 'Call & Trade',     v: b.charges.callAndTrade },
                { l: 'DP Charges',       v: b.charges.dpCharges },
              ].map((c) => (
                <div key={c.l} className="bg-gray-50 rounded p-2">
                  <div className="text-[10px] text-gray-400">{c.l}</div>
                  <div className="text-[12px] font-bold text-gray-800">{c.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* Ratings breakdown */}
            <div className="p-4">
              <h3 className="text-[13px] font-black text-gray-800 mb-3">⭐ Rating Breakdown</h3>
              <div className="space-y-2">
                <RatingBar label="Trading Platform"  value={b.rating.platform} />
                <RatingBar label="Mobile App"        value={b.rating.mobileApp} />
                <RatingBar label="Charges"           value={b.rating.charges} />
                <RatingBar label="Customer Service"  value={b.rating.customerService} />
                <RatingBar label="Research"          value={b.rating.research} />
                <RatingBar label="Account Opening"   value={b.rating.accountOpening} />
              </div>
            </div>

            {/* Features */}
            <div className="p-4">
              <h3 className="text-[13px] font-black text-gray-800 mb-3">🛠️ Features</h3>
              <div className="space-y-2">
                {[
                  { l: 'Free Equity Delivery',  v: b.charges.equityDelivery.includes('Free') || b.charges.equityDelivery.includes('₹0') },
                  { l: 'Mobile App',             v: b.mobileApp },
                  { l: '3-in-1 Account',         v: b.threeInOne },
                  { l: 'Direct Mutual Funds',    v: b.directMF },
                  { l: 'Research Reports',       v: b.research },
                  { l: 'Advisory Services',      v: b.advisory },
                  { l: 'API / Algo Trading',     v: b.apiTrading },
                  { l: 'Margin Funding',         v: b.marginFunding },
                ].map((f) => (
                  <div key={f.l} className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600">{f.l}</span>
                    <FeatureCheck yes={f.v} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="p-4">
              <h3 className="text-[13px] font-black text-green-700 mb-2">✅ Pros</h3>
              <ul className="space-y-1 mb-4">
                {b.pros.map((p) => <li key={p} className="text-[11px] text-gray-600 flex gap-1.5"><span className="text-green-400 shrink-0">•</span>{p}</li>)}
              </ul>
              <h3 className="text-[13px] font-black text-red-600 mb-2">❌ Cons</h3>
              <ul className="space-y-1">
                {b.cons.map((c) => <li key={c} className="text-[11px] text-gray-600 flex gap-1.5"><span className="text-red-400 shrink-0">•</span>{c}</li>)}
              </ul>
            </div>
          </div>

          {/* Account opening + platforms + overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-t border-gray-100">
            <div className="p-4">
              <h3 className="text-[13px] font-black text-gray-800 mb-2">📝 Account Opening Process</h3>
              <ol className="space-y-1">
                {b.accountOpeningProcess.map((step, i) => (
                  <li key={i} className="text-[11px] text-gray-600 flex gap-2">
                    <span className="bg-[#c0392b] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0">{i+1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-2 text-[11px] text-gray-500">Min. Deposit: <strong>{b.minDeposit}</strong></div>
            </div>
            <div className="p-4">
              <h3 className="text-[13px] font-black text-gray-800 mb-2">💻 Platforms & Products</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {b.platforms.map((p) => (
                  <span key={p.name} className="text-[10px] bg-gray-100 border border-gray-200 text-gray-600 px-2 py-0.5 rounded">
                    {p.name} <span className="text-gray-400">({p.type})</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {b.productsOffered.map((p) => (
                  <span key={p} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{p}</span>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-gray-400">SEBI Reg: {b.sebiReg} · {b.headquarters}</div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <h3 className="text-[13px] font-black text-gray-800 mb-1">📖 Overview</h3>
            <p className="text-[12px] text-gray-600 leading-relaxed">{b.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Compare Panel ────────────────────────────────────────────────────────────
function ComparePanel({ ids, onClose }: { ids: string[]; onClose: () => void }) {
  const selected = BROKERS.filter((b) => ids.includes(b.id));
  if (selected.length < 2) return null;

  const rows = [
    { label: 'Type',               fn: (b: Broker) => b.type === 'discount' ? 'Discount' : 'Full-Service' },
    { label: 'Active Clients',     fn: (b: Broker) => b.activeClients },
    { label: 'Overall Rating',     fn: (b: Broker) => `${b.rating.overall} ★` },
    { label: 'Platform Rating',    fn: (b: Broker) => `${b.rating.platform} ★` },
    { label: 'App Rating',         fn: (b: Broker) => `${b.rating.mobileApp} ★` },
    { label: '──── CHARGES ────',  fn: () => '' },
    { label: 'Equity Delivery',    fn: (b: Broker) => b.charges.equityDelivery },
    { label: 'Equity Intraday',    fn: (b: Broker) => b.charges.equityIntraday },
    { label: 'Futures',            fn: (b: Broker) => b.charges.futures },
    { label: 'Options',            fn: (b: Broker) => b.charges.options },
    { label: 'Commodity',          fn: (b: Broker) => b.charges.commodity },
    { label: 'Demat AMC',          fn: (b: Broker) => b.charges.dematAMC },
    { label: 'Account Opening',    fn: (b: Broker) => b.charges.accountOpening },
    { label: '──── FEATURES ────', fn: () => '' },
    { label: 'Free Delivery',      fn: (b: Broker) => b.charges.equityDelivery.includes('Free') || b.charges.equityDelivery.includes('₹0') ? '✓' : '✗' },
    { label: '3-in-1 Account',     fn: (b: Broker) => b.threeInOne ? '✓' : '✗' },
    { label: 'Direct MF',          fn: (b: Broker) => b.directMF ? '✓' : '✗' },
    { label: 'Research',           fn: (b: Broker) => b.research ? '✓' : '✗' },
    { label: 'Advisory',           fn: (b: Broker) => b.advisory ? '✓' : '✗' },
    { label: 'API Trading',        fn: (b: Broker) => b.apiTrading ? '✓' : '✗' },
    { label: 'Min. Deposit',       fn: (b: Broker) => b.minDeposit },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-4 px-2 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl mb-4">
        <div className="bg-[#c0392b] text-white px-4 py-3 flex items-center justify-between">
          <h2 className="font-black text-[16px]">📊 Broker Comparison</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-xl">✕</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 bg-gray-50 text-gray-500 font-semibold w-36">Feature</th>
                {selected.map((b) => (
                  <th key={b.id} className="px-4 py-3 text-center">
                    <div className="text-2xl mb-0.5">{b.logo}</div>
                    <div className="font-black text-gray-800">{b.name}</div>
                    <StarRating value={b.rating.overall} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isHeader = row.label.startsWith('────');
                return (
                  <tr key={i} className={isHeader ? 'bg-gray-800' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className={`px-4 py-2 font-semibold ${isHeader ? 'text-white text-[10px] uppercase tracking-widest' : 'text-gray-500'}`}>
                      {isHeader ? row.label.replace(/─/g, '').trim() : row.label}
                    </td>
                    {selected.map((b) => {
                      const val = isHeader ? '' : row.fn(b);
                      const isGreen = val === '✓';
                      const isRed   = val === '✗';
                      return (
                        <td key={b.id} className={`px-4 py-2 text-center font-medium ${isGreen ? 'text-green-600 text-[16px]' : isRed ? 'text-red-400 text-[16px]' : 'text-gray-700'}`}>
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3 text-gray-500 font-semibold">Open Account</td>
                {selected.map((b) => (
                  <td key={b.id} className="px-4 py-3 text-center">
                    <a href={b.openAccountUrl} target="_blank" rel="noopener noreferrer"
                      className="bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1.5 rounded hover:bg-[#922b21] transition">
                      Open {b.name}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const FILTERS = ['All', 'Discount', 'Full-Service'];

export default function BrokersPage() {
  const [filter, setFilter]     = useState('All');
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);

  const filtered = BROKERS.filter((b) => {
    const matchType = filter === 'All' ? true : filter === 'Discount' ? b.type === 'discount' : b.type === 'full-service';
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto px-3 py-4 space-y-4">

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] text-white rounded-lg p-5">
        <h1 className="text-[24px] font-black mb-1">🏦 Broker Reviews India 2025</h1>
        <p className="text-blue-200 text-[13px] mb-3">
          Unbiased, in-depth reviews of SEBI-registered stockbrokers. Compare charges, platforms, and features.
          Ranked by NSE active clients.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { v: '10', l: 'Brokers Reviewed' },
            { v: '20+', l: 'Sections Covered' },
            { v: '₹0', l: 'Commission Earned' },
            { v: '100%', l: 'SEBI Registered' },
          ].map((s) => (
            <div key={s.l} className="bg-white/10 rounded px-3 py-1.5 text-center">
              <div className="text-[16px] font-black">{s.v}</div>
              <div className="text-[10px] text-blue-200">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Compare bar */}
      {selected.length >= 2 && (
        <div className="bg-[#c0392b] text-white rounded-lg p-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold">📊 Comparing:</span>
            {selected.map((id) => {
              const b = BROKERS.find((x) => x.id === id);
              return <span key={id} className="bg-white/20 px-2 py-0.5 rounded text-[12px] font-semibold">{b?.name}</span>;
            })}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setComparing(true)}
              className="bg-white text-[#c0392b] font-black text-[12px] px-4 py-1.5 rounded hover:bg-gray-100 transition">
              Compare Now →
            </button>
            <button onClick={() => setSelected([])}
              className="text-white/70 hover:text-white text-[12px]">Clear</button>
          </div>
        </div>
      )}
      {selected.length === 1 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-[12px] text-yellow-700">
          Select 1 more broker to compare (max 3)
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-white border border-gray-200 rounded p-1">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-[12px] font-semibold transition ${filter === f ? 'bg-[#c0392b] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search broker..."
          className="bg-white border border-gray-200 rounded px-3 py-1.5 text-[12px] outline-none focus:border-[#c0392b] w-48"
        />
        <span className="text-[12px] text-gray-400 ml-auto">{filtered.length} brokers · Ranked by NSE active clients</span>
      </div>

      {/* Broker list */}
      <div className="space-y-3">
        {filtered.map((b) => (
          <BrokerRow
            key={b.id}
            b={b}
            onSelect={toggleSelect}
            selected={selected.includes(b.id)}
          />
        ))}
      </div>

      {/* Sections guide */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-[16px] font-black text-gray-900 mb-4">📚 How to Choose the Right Broker</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: '💰', title: 'Brokerage Charges', desc: 'Compare equity delivery, intraday, F&O, and commodity charges. Discount brokers charge ₹20 flat while full-service brokers charge 0.3–0.5%.' },
            { icon: '📱', title: 'Trading Platform', desc: 'Evaluate ease of use, speed, charting tools, and mobile app quality. Kite (Zerodha) and Dhan are top rated.' },
            { icon: '🏦', title: '3-in-1 Account', desc: 'If you bank with HDFC, ICICI, or Kotak, their 3-in-1 accounts offer seamless fund transfers to your trading account.' },
            { icon: '📊', title: 'Research & Advisory', desc: 'Full-service brokers like HDFC, ICICI, Motilal Oswal offer in-house research. Discount brokers focus on execution.' },
            { icon: '🔌', title: 'API & Algo Trading', desc: 'If you are into algorithmic trading, Zerodha (Kite Connect), Upstox, and Dhan provide developer APIs.' },
            { icon: '🛡️', title: 'Safety & Trust', desc: 'Always verify SEBI registration. Check BSE/NSE membership, client segregation, and dispute redressal.' },
          ].map((tip) => (
            <div key={tip.title} className="flex gap-3">
              <span className="text-2xl shrink-0">{tip.icon}</span>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">{tip.title}</div>
                <div className="text-[11px] text-gray-500 leading-relaxed">{tip.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
        <p className="text-[12px] font-bold text-yellow-800 mb-1">⚠️ Disclaimer</p>
        <p className="text-[11px] text-yellow-700">
          BridgeSpark does not receive any commission or referral fees from brokers. All reviews are based on publicly available information and user feedback. Brokerage charges are indicative — verify on the broker&apos;s official website. This is not investment advice. Always read the terms & conditions before opening an account.
        </p>
      </div>

      {/* Compare modal */}
      {comparing && <ComparePanel ids={selected} onClose={() => setComparing(false)} />}
    </div>
  );
}
