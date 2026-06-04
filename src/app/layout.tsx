import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import TickerStrip from "@/components/TickerStrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BridgeSpark – India's Financial News, Markets & Advertising Hub",
  description: "BridgeSpark is India's financial news hub and the exclusive authorised advertising partner of Investing.com in India. Live NSE/BSE data",
  keywords: "investing.com india advertising, advertise on investing.com india, investing.com india reseller, investing.com india media kit, stock mar",
  openGraph: {
    title: "BridgeSpark – India's Financial News & Markets Hub",
    description: "Exclusive authorised advertising partner of Investing.com in India. Live market data, financial news, and premium ad solutions.",
    url: "https://bridgespark.in",
    siteName: "BridgeSpark",
    images: [{ url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop,f=jpeg/Aq2qMLBOwOUekgyZ/bridgespark-mjEqeao1Zghl3Wzj' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LR7LMGKY8S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LR7LMGKY8S');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#f2f2f2]">
