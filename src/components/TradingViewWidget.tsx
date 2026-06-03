'use client';

import { useEffect, useRef } from 'react';

type TradingViewWidgetType = 'screener' | 'market-overview' | 'ticker-tape';

interface TradingViewWidgetProps {
  type: TradingViewWidgetType;
  height?: number;
}

const WIDGET_CONFIGS: Record<TradingViewWidgetType, { script: string; config: object }> = {
  screener: {
    script: 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js',
    config: {
      width: '100%',
      height: 600,
      defaultColumn: 'overview',
      defaultScreen: 'most_capitalized',
      market: 'america',
      showToolbar: true,
      colorTheme: 'light',
      locale: 'en',
      isTransparent: false,
    },
  },
  'market-overview': {
    script: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
    config: {
      colorTheme: 'light',
      dateRange: '1D',
      showChart: true,
      locale: 'en',
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: '100%',
      height: 500,
      tabs: [
        {
          title: 'US Indices',
          symbols: [
            { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
            { s: 'FOREXCOM:NSXUSD', d: 'NASDAQ 100' },
            { s: 'FOREXCOM:DJI',    d: 'Dow Jones' },
            { s: 'NASDAQ:QQQ',      d: 'QQQ ETF' },
          ],
          originalTitle: 'Indices',
        },
        {
          title: 'Big Tech',
          symbols: [
            { s: 'NASDAQ:AAPL',  d: 'Apple' },
            { s: 'NASDAQ:MSFT',  d: 'Microsoft' },
            { s: 'NASDAQ:NVDA',  d: 'NVIDIA' },
            { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
            { s: 'NASDAQ:AMZN',  d: 'Amazon' },
            { s: 'NASDAQ:META',  d: 'Meta' },
            { s: 'NASDAQ:TSLA',  d: 'Tesla' },
          ],
          originalTitle: 'Big Tech',
        },
        {
          title: 'Finance',
          symbols: [
            { s: 'NYSE:JPM',  d: 'JPMorgan' },
            { s: 'NYSE:BAC',  d: 'Bank of America' },
            { s: 'NYSE:GS',   d: 'Goldman Sachs' },
            { s: 'NYSE:V',    d: 'Visa' },
            { s: 'NYSE:BRK.B',d: 'Berkshire' },
          ],
          originalTitle: 'Finance',
        },
      ],
    },
  },
  'ticker-tape': {
    script: 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
    config: {
      symbols: [
        { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
        { proName: 'FOREXCOM:NSXUSD', title: 'NASDAQ 100' },
        { proName: 'NASDAQ:AAPL',     title: 'Apple' },
        { proName: 'NASDAQ:MSFT',     title: 'Microsoft' },
        { proName: 'NASDAQ:NVDA',     title: 'NVIDIA' },
        { proName: 'NASDAQ:TSLA',     title: 'Tesla' },
        { proName: 'NASDAQ:AMZN',     title: 'Amazon' },
        { proName: 'NASDAQ:GOOGL',    title: 'Alphabet' },
        { proName: 'NASDAQ:META',     title: 'Meta' },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'adaptive',
      colorTheme: 'light',
      locale: 'en',
    },
  },
};

export default function TradingViewWidget({ type, height }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous render
    container.innerHTML = '';

    const { script, config } = WIDGET_CONFIGS[type];

    // TradingView requires a wrapper div with specific class
    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container__widget';
    container.appendChild(wrapper);

    const s = document.createElement('script');
    s.src = script;
    s.async = true;
    s.type = 'text/javascript';
    s.innerHTML = JSON.stringify(height ? { ...config, height } : config);
    scriptRef.current = s;
    container.appendChild(s);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [type, height]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container w-full"
      style={{ minHeight: height || 500 }}
    />
  );
}
