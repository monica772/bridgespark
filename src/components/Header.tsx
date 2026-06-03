'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '/', children: [] },
  { label: 'Markets', href: '/markets', children: ['Stocks', 'Indices', 'Commodities', 'Forex', 'Derivatives'] },
  { label: 'Crypto', href: '/crypto', children: [] },
  { label: 'US Stocks', href: '/us-stocks', children: [] },
  { label: 'News', href: '/news', children: ['Market News', 'Economy', 'Global Markets', 'IPO', 'Company News'] },
  { label: 'Mutual Funds', href: '/mutual-funds', children: [] },
  { label: 'IPO', href: '/ipo', children: ['Open IPOs', 'Upcoming IPOs', 'SME IPO', 'NCDs', 'Rights Issues'] },
  { label: 'Broker Reviews', href: '/brokers', children: [] },
  { label: 'Publishers', href: '/publishers', children: [] },
  { label: 'Advertise', href: '/advertise', children: [] },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" suppressHydrationWarning>

      {/* Row 1 — Top utility bar */}
      <div className="bg-[#c0392b] text-white text-[11px] py-1 px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span>BSE: <strong>81,450</strong> <span className="text-green-300">▲ 0.39%</span></span>
          <span>NSE: <strong>24,780</strong> <span className="text-green-300">▲ 0.51%</span></span>
          <span>Gold: <strong>₹73,240</strong> <span className="text-green-300">▲ 0.25%</span></span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-white/60 text-[10px]">bridgespark.in</span>
          <Link href="/advertise" className="bg-white text-[#c0392b] px-2 py-0.5 rounded text-[10px] font-bold hover:bg-gray-100 transition">
            ADVERTISE WITH US
          </Link>
          <button className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded hover:bg-white/30 transition">
            Login
          </button>
        </div>
      </div>

      {/* Row 2 — Search bar (full width, centered) */}
      <div className="bg-gray-50 border-b border-gray-100 py-2 px-4">
        <div className="max-w-2xl mx-auto flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:border-[#c0392b] focus-within:shadow-md transition">
          <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search stocks, news, companies, mutual funds..."
            className="bg-transparent text-[13px] outline-none w-full text-gray-600 placeholder-gray-400"
          />
          <button className="ml-2 bg-[#c0392b] text-white text-[11px] font-bold px-3 py-1 rounded-full hover:bg-[#922b21] transition shrink-0">
            Search
          </button>
        </div>
      </div>

      {/* Row 3 — Logo centered + actions */}
      <div className="max-w-[1300px] mx-auto px-4 py-2 flex items-center justify-between">

        {/* Left spacer / mobile menu */}
        <div className="w-24 flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo — centered */}
        <Link href="/" className="flex flex-col items-center">
          <img
            src="https://assets.zyrosite.com/Aq2qMLBOwOUekgyZ/bridgespark-400-x-150-px-3-YrDq5K3nL0ULk2en.gif"
            alt="BridgeSpark"
            className="h-20 w-auto object-contain"
          />
          <span className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5 hidden sm:block">
            India&apos;s Financial News Hub
          </span>
        </Link>

        {/* Right actions */}
        <div className="w-24 flex items-center justify-end gap-2">
          <Link
            href="/advertise"
            className="hidden md:block text-[11px] font-semibold text-[#c0392b] border border-[#c0392b] px-2.5 py-1 rounded hover:bg-[#c0392b] hover:text-white transition whitespace-nowrap"
          >
            Advertise
          </Link>
        </div>
      </div>

      {/* Row 4 — Nav bar */}
      <nav className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-[1300px] mx-auto px-4">
          <ul className="flex items-center justify-center gap-0">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children.length > 0 && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2.5 text-[13px] font-medium text-gray-700 hover:text-[#c0392b] hover:bg-red-50 transition"
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children.length > 0 && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-b min-w-[160px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child}
                        href={`${item.href}/${child.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-2 text-[13px] text-gray-600 hover:text-[#c0392b] hover:bg-red-50 transition"
                      >
                        {child}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li className="absolute right-4">
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
                LIVE
              </span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          {/* Mobile search */}
          <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-2 mb-3">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder-gray-400"
            />
          </div>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="block py-2 text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
