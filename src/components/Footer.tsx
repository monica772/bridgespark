import Link from 'next/link';

const FOOTER_LINKS = {
  'Markets': ['Stocks', 'Sensex', 'Nifty', 'Commodities', 'Forex', 'Derivatives'],
  'News': ['Top Stories', 'Economy', 'Global Markets', 'IPO News', 'Earnings'],
  'Tools': ['Portfolio Tracker', 'Stock Screener', 'SIP Calculator', 'EMI Calculator'],
  'Company': ['About Us', 'Advertise With Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Use'],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300 mt-8">
      <div className="max-w-[1300px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-[13px] mb-3 uppercase tracking-wide">{section}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[12px] text-gray-400 hover:text-white transition">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Advertise banner */}
        <div className="bg-[#c0392b]/20 border border-[#c0392b]/40 rounded-lg p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-[15px] mb-1">Reach 1M+ Indian Investors</h3>
            <p className="text-gray-400 text-[12px]">BridgeSpark connects international financial brands with India&apos;s fast-growing retail investor audience.</p>
          </div>
          <Link href="/advertise" className="bg-[#c0392b] text-white px-6 py-2.5 rounded font-bold text-[13px] hover:bg-[#e74c3c] transition whitespace-nowrap flex items-center gap-2">
            Advertise With Us →
          </Link>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://assets.zyrosite.com/Aq2qMLBOwOUekgyZ/bridgespark-400-x-150-px-3-YrDq5K3nL0ULk2en.gif"
              alt="BridgeSpark"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="text-gray-500 text-[11px]">India&apos;s Financial News Hub</span>
          </div>
          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} BridgeSpark.in · All Rights Reserved · bridgespark.in
          </div>
          <div className="text-[11px] text-gray-600">
            Disclaimer: For informational purposes only. Not investment advice.
          </div>
        </div>
      </div>
    </footer>
  );
}
