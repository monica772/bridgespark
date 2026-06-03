'use client';

interface InvestingWidgetProps {
  type: 'crypto' | 'stocks' | 'forex' | 'indices' | 'currency';
  height?: number;
}

// Widget URLs for different data types — all from Investing.com
const WIDGET_URLS: Record<string, string> = {
  crypto:   'https://in.widgets.investing.com/crypto-currency-rates?theme=darkTheme&pairs=945629,997650,1001803,1010773,1010776',
  stocks:   'https://in.widgets.investing.com/dynamic-screener?theme=darkTheme&cols=name,last,chg,chg_pct,time&hl=1&lang_ID=56',
  forex:    'https://in.widgets.investing.com/currency-rates?theme=darkTheme&pairs=1,5,49,50,2109,2108',
  indices:  'https://in.widgets.investing.com/indices?theme=darkTheme&cols=name,last,chg,chg_pct,time&hl=1',
  currency: 'https://in.widgets.investing.com/live-currency-cross-rates?theme=lightTheme&hideTitle=true&pairs=9289,1646,1760,2035,160',
};

export default function InvestingWidget({ type, height = 600 }: InvestingWidgetProps) {
  const src = WIDGET_URLS[type];

  return (
    <div className="w-full rounded overflow-hidden">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 'none', display: 'block' }}
        title={`Investing.com ${type} live data`}
      />
      <div className="bg-[#1a1a2e] text-center py-1.5">
        <span className="text-[11px] text-gray-400" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          Powered by{' '}
          <a
            href="https://in.investing.com?utm_source=WMT&utm_medium=referral&utm_campaign=CRYPTO_CURRENCY_RATES&utm_content=Footer%20Link"
            target="_blank"
            rel="nofollow noreferrer"
            className="text-[#c0392b] hover:underline font-semibold"
          >
            Investing.com
          </a>
          {' '}— India&apos;s #1 Financial Portal | Exclusive India Partner: <strong className="text-white">BridgeSpark</strong>
        </span>
      </div>
    </div>
  );
}
