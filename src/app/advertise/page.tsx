import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Advertise With Us | BridgeSpark - Reach Indian Investors',
  description: 'Reach millions of Indian retail investors through BridgeSpark. Premium ad placements, sponsored content, and reseller partnerships for international financial brands.',
};

const AD_FORMATS = [
  {
    name: 'Leaderboard Banner',
    size: '728 × 90',
    placement: 'Top of every page',
    impressions: '500K+/month',
    cpm: '₹180',
  },
  {
    name: 'Medium Rectangle',
    size: '300 × 250',
    placement: 'Sidebar / in-article',
    impressions: '800K+/month',
    cpm: '₹150',
  },
  {
    name: 'Half Page',
    size: '300 × 600',
    placement: 'Right sidebar sticky',
    impressions: '400K+/month',
    cpm: '₹220',
  },
  {
    name: 'Billboard',
    size: '970 × 90',
    placement: 'Below fold, high visibility',
    impressions: '350K+/month',
    cpm: '₹200',
  },
  {
    name: 'Sponsored Article',
    size: 'Native content',
    placement: 'News feed, labeled',
    impressions: '150K+/article',
    cpm: '₹8,000 flat',
  },
  {
    name: 'Ticker Sponsorship',
    size: 'Live ticker strip',
    placement: 'Top of every page',
    impressions: '1M+/month',
    cpm: '₹25,000/month',
  },
];

const AUDIENCE_STATS = [
  { label: 'Monthly Active Users', value: '1.2M+' },
  { label: 'Avg. Session Duration', value: '6.4 min' },
  { label: 'Mobile Users', value: '68%' },
  { label: 'Tier 1 City Traffic', value: '72%' },
  { label: 'HNI / Active Traders', value: '38%' },
  { label: 'Avg. Portfolio Size', value: '₹8L+' },
];

const PARTNERS = [
  'Bloomberg', 'Reuters', 'Investing.com', 'TradingView', 'Refinitiv', 'S&P Global',
];

export default function AdvertisePage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#922b21] text-white py-16 px-4">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="inline-block bg-yellow-400 text-black text-[11px] font-black px-3 py-1 rounded mb-4 uppercase tracking-wide">
            Media Kit 2025–26
          </div>
          <h1 className="text-[32px] md:text-[44px] font-black leading-tight mb-4">
            Reach India&apos;s Most Engaged<br />
            <span className="text-yellow-300">Financial Audience</span>
          </h1>
          <p className="text-[16px] text-gray-300 max-w-2xl mx-auto mb-8">
            BridgeSpark is India&apos;s emerging financial news hub connecting retail investors, traders, and HNIs with global markets.
            We act as your <strong className="text-white">authorised advertising reseller</strong> for international financial websites targeting the Indian market.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:advertise@bridgespark.in"
              className="bg-[#c0392b] text-white px-8 py-3 rounded font-bold text-[15px] hover:bg-[#e74c3c] transition"
            >
              Get Media Kit →
            </a>
            <a
              href="mailto:advertise@bridgespark.in"
              className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded font-bold text-[15px] hover:bg-white/20 transition"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-12 space-y-16">

        {/* Audience stats */}
        <section>
          <h2 className="text-[24px] font-black text-gray-900 mb-2">Our Audience</h2>
          <p className="text-gray-500 text-[14px] mb-8">Data-driven, high-intent financial audience across India.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AUDIENCE_STATS.map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                <div className="text-[28px] font-black text-[#c0392b]">{s.value}</div>
                <div className="text-[13px] text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why BridgeSpark */}
        <section className="bg-[#1a1a2e] rounded-xl p-8 text-white">
          <h2 className="text-[22px] font-black mb-2">Why Advertise on BridgeSpark?</h2>
          <p className="text-gray-400 text-[13px] mb-6">We are an authorised reseller of advertising inventory for leading international financial news platforms in India.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🇮🇳', title: 'India-First Audience', desc: 'Exclusively targeting Indian retail investors, traders and HNIs — the fastest-growing investor class globally.' },
              { icon: '📈', title: 'High Purchase Intent', desc: 'Our readers are actively looking to invest, trade, and use financial tools. Your ads convert.' },
              { icon: '🤝', title: 'Reseller Partnership', desc: 'Seamless one-stop access to advertising inventory from multiple international financial publications.' },
              { icon: '💰', title: 'INR Billing', desc: 'Invoice in Indian Rupees with GST. No forex hassle. Local support, global reach.' },
              { icon: '🎯', title: 'Contextual Targeting', desc: 'Target by stock category, content type, geography (metros vs Tier 2), and device.' },
              { icon: '📊', title: 'Real-Time Reporting', desc: 'Monthly performance dashboards with impressions, CTR, and conversion attribution.' },
            ].map((point) => (
              <div key={point.title} className="flex gap-3">
                <span className="text-2xl">{point.icon}</span>
                <div>
                  <div className="font-bold text-[14px] mb-1">{point.title}</div>
                  <div className="text-gray-400 text-[12px]">{point.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ad formats */}
        <section>
          <h2 className="text-[24px] font-black text-gray-900 mb-2">Ad Formats & Pricing</h2>
          <p className="text-gray-500 text-[13px] mb-6">All formats available as direct buy or programmatic. Minimum campaign: 30 days.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3">Format</th>
                  <th className="text-left px-4 py-3">Size</th>
                  <th className="text-left px-4 py-3">Placement</th>
                  <th className="text-left px-4 py-3">Impressions</th>
                  <th className="text-left px-4 py-3 text-yellow-300">Rate (CPM / Flat)</th>
                </tr>
              </thead>
              <tbody>
                {AD_FORMATS.map((f, i) => (
                  <tr key={f.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-semibold text-gray-800">{f.name}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono">{f.size}</td>
                    <td className="px-4 py-3 text-gray-600">{f.placement}</td>
                    <td className="px-4 py-3 text-gray-600">{f.impressions}</td>
                    <td className="px-4 py-3 font-bold text-[#c0392b]">{f.cpm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">* Rates are indicative. Final pricing depends on campaign duration, volume and targeting. Contact us for a custom quote.</p>
        </section>

        {/* Partner network */}
        <section className="text-center">
          <h2 className="text-[22px] font-black text-gray-900 mb-2">Our Partner Network</h2>
          <p className="text-gray-500 text-[13px] mb-8">
            BridgeSpark is an authorised advertising reseller for global financial media brands entering India.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {PARTNERS.map((p) => (
              <div key={p} className="bg-gray-100 border border-gray-200 rounded px-5 py-3 text-[13px] font-bold text-gray-600">
                {p}
              </div>
            ))}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded px-5 py-3 text-[13px] font-bold text-gray-400">
              + Your Brand
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Are you an international financial publisher? <strong>Partner with us</strong> to access India&apos;s growing investor market.
          </p>
        </section>

        {/* Contact form */}
        <section id="contact" className="bg-gray-50 border border-gray-200 rounded-xl p-8">
          <h2 className="text-[22px] font-black text-gray-900 mb-1">Get In Touch</h2>
          <p className="text-gray-500 text-[13px] mb-6">Fill in your details and our ad sales team will respond within 24 hours.</p>
          <ContactForm />
        </section>

      </div>
    </div>
  );
}
