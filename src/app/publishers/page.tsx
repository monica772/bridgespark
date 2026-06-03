import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertise on Investing.com India | BridgeSpark — Exclusive Ad Sales Partner',
  description: 'BridgeSpark is the exclusive authorised advertising sales partner of Investing.com in India. Reach millions of Indian traders and investors through Investing.com. Get media kit, pricing, and campaign support.',
  keywords: 'investing.com advertising India, investing.com India ads, advertise on investing.com, investing.com india media kit, investing.com CPM India, international financial media India reseller',
  openGraph: {
    title: 'Advertise on Investing.com India | BridgeSpark',
    description: 'Exclusive authorised advertising partner of Investing.com in India. Reach 10M+ Indian investors.',
    url: 'https://bridgespark.in/publishers',
  },
};

const PUBLISHERS = [
  {
    name: 'Investing.com',
    logo: '📊',
    tagline: 'World\'s #1 Financial Portal',
    exclusive: true,
    badge: 'EXCLUSIVE INDIA PARTNER',
    stats: [
      { label: 'Monthly Users (India)', value: '10M+' },
      { label: 'India Traffic Rank', value: 'Top 50' },
      { label: 'Avg. Session', value: '8.2 min' },
      { label: 'Mobile Users', value: '72%' },
    ],
    description: 'Investing.com is the world\'s leading financial data and news portal, covering stocks, forex, commodities, bonds, and economic calendars. BridgeSpark is the EXCLUSIVE authorised advertising sales representative for Investing.com in India.',
    adFormats: ['Homepage Takeover', 'Leaderboard', 'Medium Rectangle', 'Interstitial', 'Push Notification', 'Newsletter Sponsorship'],
    targetAudience: 'Active traders, HNI investors, forex traders, crypto enthusiasts, and retail investors across India.',
    href: '/publishers/investing-com',
  },
  {
    name: 'Reuters',
    logo: '📰',
    tagline: 'Global News & Financial Intelligence',
    exclusive: false,
    badge: 'AUTHORIZED PARTNER',
    stats: [
      { label: 'Monthly Users (India)', value: '4M+' },
      { label: 'Content Type', value: 'News & Wire' },
      { label: 'Brand Trust Score', value: '9.2/10' },
      { label: 'B2B Audience', value: '65%' },
    ],
    description: 'Reuters delivers trusted news and financial data to professionals and institutions globally. We represent Reuters advertising inventory for the Indian market.',
    adFormats: ['Sponsored Content', 'Display Ads', 'Newsletter', 'Data Products'],
    targetAudience: 'CXOs, financial professionals, institutional investors, and policy decision makers in India.',
    href: '/publishers/reuters',
  },
  {
    name: 'TradingView',
    logo: '📈',
    tagline: 'World\'s Leading Charting Platform',
    exclusive: false,
    badge: 'AUTHORIZED PARTNER',
    stats: [
      { label: 'Monthly Users (India)', value: '6M+' },
      { label: 'Chart Views/Day', value: '50M+' },
      { label: 'Active Traders', value: '85%' },
      { label: 'Engagement Rate', value: 'Very High' },
    ],
    description: 'TradingView is the go-to charting and social platform for active traders and technical analysts. We manage advertising partnerships for TradingView in the Indian market.',
    adFormats: ['Banner Ads', 'Chart Overlay Ads', 'Community Sponsorship', 'Widget Embedding'],
    targetAudience: 'Technical traders, algo traders, derivatives traders, and active retail investors.',
    href: '/publishers/tradingview',
  },
];

export default function PublishersPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d1b2a] via-[#1a1a2e] to-[#c0392b] text-white py-16 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide">
              Exclusive India Representation
            </div>
          </div>
          <h1 className="text-[30px] md:text-[42px] font-black leading-tight mb-4">
            We Bridge the Gap Between<br />
            <span className="text-yellow-300">Global Publishers</span> &amp; Indian Advertisers
          </h1>
          <p className="text-[15px] text-gray-300 max-w-2xl mb-6">
            BridgeSpark is India&apos;s authorised advertising representative for the world&apos;s leading financial media brands.
            We <strong className="text-white">bridge the gap</strong> between international reach and Indian market access —
            and <strong className="text-white">create a spark</strong> that connects your brand with millions of high-intent investors.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#investing-com" className="bg-yellow-400 text-black px-6 py-3 rounded font-black text-[14px] hover:bg-yellow-300 transition">
              Advertise on Investing.com →
            </Link>
            <Link href="/advertise" className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded font-bold text-[14px] hover:bg-white/20 transition">
              View All Ad Packages
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-12 space-y-16">

        {/* Investing.com Exclusive — featured prominently */}
        <section id="investing-com" className="scroll-mt-20">
          <div className="bg-gradient-to-r from-[#0d1b2a] to-[#1e3a5f] rounded-2xl overflow-hidden">
            <div className="bg-yellow-400 text-black text-center text-[12px] font-black py-2 tracking-widest uppercase">
              ⭐ Exclusive Authorised Advertising Partner · Investing.com India ⭐
            </div>
            <div className="p-8 text-white">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">📊</span>
                    <div>
                      <h2 className="text-[26px] font-black">Investing.com</h2>
                      <p className="text-blue-300 text-[13px]">World&apos;s #1 Financial Portal — India&apos;s Most Trusted Market Data Site</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-[14px] mb-5 leading-relaxed">
                    BridgeSpark is the <strong className="text-yellow-300">exclusive, authorised advertising sales partner</strong> of{' '}
                    <strong className="text-white">Investing.com</strong> for the <strong className="text-white">India region</strong>.
                    Whether you want to run display ads, sponsored content, or a targeted campaign on Investing.com in India —
                    we are your <em>one-stop point of contact</em>. No middlemen. Direct access. INR billing. Local support.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {PUBLISHERS[0].stats.map((s) => (
                      <div key={s.label} className="bg-white/10 rounded-lg p-3">
                        <div className="text-[22px] font-black text-yellow-300">{s.value}</div>
                        <div className="text-[11px] text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <h3 className="text-[13px] font-bold text-yellow-300 uppercase mb-2">Available Ad Formats</h3>
                    <div className="flex flex-wrap gap-2">
                      {PUBLISHERS[0].adFormats.map((f) => (
                        <span key={f} className="bg-white/10 border border-white/20 text-gray-300 text-[12px] px-2 py-1 rounded">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-[13px] font-bold text-yellow-300 uppercase mb-1">Target Audience</h3>
                    <p className="text-gray-400 text-[13px]">{PUBLISHERS[0].targetAudience}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:advertise@bridgespark.in?subject=Investing.com India Advertising Enquiry"
                      className="bg-yellow-400 text-black px-6 py-3 rounded font-black text-[14px] hover:bg-yellow-300 transition text-center"
                    >
                      Get Investing.com Media Kit →
                    </a>
                    <a
                      href="tel:+91XXXXXXXXXX"
                      className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded font-bold text-[14px] hover:bg-white/20 transition text-center"
                    >
                      Call Our Sales Team
                    </a>
                  </div>
                </div>

                {/* Why Invest.com sidebar */}
                <div className="md:w-72 bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="text-[14px] font-black text-yellow-300 mb-4">Why Advertise on Investing.com India?</h3>
                  {[
                    { icon: '🎯', text: 'India\'s largest financial media audience — 10M+ monthly users' },
                    { icon: '💰', text: 'Highest purchase-intent audience: active traders, HNIs, investors' },
                    { icon: '🇮🇳', text: 'Exclusive India geo-targeting for your campaigns' },
                    { icon: '📋', text: 'INR invoicing with GST — simple local billing' },
                    { icon: '🤝', text: 'Dedicated account manager, campaign setup & reporting' },
                    { icon: '⚡', text: 'Fastest campaign activation — go live in 48 hours' },
                  ].map((p) => (
                    <div key={p.text} className="flex gap-2 mb-3">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-[12px] text-gray-300">{p.text}</span>
                    </div>
                  ))}
                  <div className="mt-4 bg-yellow-400/10 border border-yellow-400/30 rounded p-3 text-center">
                    <p className="text-yellow-300 text-[11px] font-bold mb-1">CONTACT US TODAY</p>
                    <a href="mailto:advertise@bridgespark.in" className="text-white text-[12px] font-semibold">
                      advertise@bridgespark.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other publishers */}
        <section>
          <h2 className="text-[22px] font-black text-gray-900 mb-2">Other Publishers We Represent</h2>
          <p className="text-gray-500 text-[13px] mb-6">
            In addition to Investing.com, BridgeSpark is building authorised partnerships with leading international financial publishers for the Indian market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PUBLISHERS.slice(1).map((pub) => (
              <div key={pub.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{pub.logo}</span>
                    <span className="font-black text-[15px]">{pub.name}</span>
                  </div>
                  <span className="text-[9px] bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                    {pub.badge}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[13px] text-gray-700 mb-3">{pub.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {pub.stats.map((s) => (
                      <div key={s.label} className="bg-gray-50 rounded p-2">
                        <div className="text-[15px] font-black text-[#c0392b]">{s.value}</div>
                        <div className="text-[10px] text-gray-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pub.adFormats.map((f) => (
                      <span key={f} className="bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded">{f}</span>
                    ))}
                  </div>
                  <a
                    href={`mailto:advertise@bridgespark.in?subject=${pub.name} Advertising Enquiry`}
                    className="block w-full text-center bg-[#c0392b] text-white py-2 rounded font-bold text-[13px] hover:bg-[#922b21] transition"
                  >
                    Enquire About {pub.name} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Become a partner */}
        <section className="bg-gradient-to-r from-[#1a1a2e] to-[#c0392b] text-white rounded-2xl p-8 text-center">
          <h2 className="text-[24px] font-black mb-3">Are You an International Publisher?</h2>
          <p className="text-gray-300 text-[14px] max-w-xl mx-auto mb-6">
            If you&apos;re a global financial media brand looking to monetise your Indian audience,
            BridgeSpark is your ideal India market representative.
            We handle local sales, billing, compliance and campaign management.
          </p>
          <a
            href="mailto:partners@bridgespark.in"
            className="inline-block bg-white text-[#c0392b] px-8 py-3 rounded-full font-black text-[14px] hover:bg-yellow-300 transition"
          >
            Partner With BridgeSpark →
          </a>
          <p className="text-gray-400 text-[11px] mt-3">partners@bridgespark.in · bridgespark.in</p>
        </section>

      </div>
    </div>
  );
}
