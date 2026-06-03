import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.investing.com *.widgets.investing.com in.widgets.investing.com",
              "frame-src 'self' *.investing.com *.widgets.investing.com in.widgets.investing.com in.investing.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' *.investing.com *.yahoo.com query1.finance.yahoo.com",
              "font-src 'self' data:",
            ].join('; '),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.investing.com' },
      { protocol: 'https', hostname: 'assets.zyrosite.com' },
    ],
  },
};

export default nextConfig;
