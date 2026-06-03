import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import TickerStrip from "@/components/TickerStrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BridgeSpark - India's Financial News, Markets & Advertising Hub",
  description: "BridgeSpark is India's financial news hub and the exclusive authorised advertising partner of Investing.com in India. Live NSE/BSE data, market news, and premium ad solutions for international brands targeting Indian investors.",
  keywords: "investing.com india advertising, advertise on investing.com india, investing.com india reseller, investing.com india media kit, stock market india, NSE BSE news, Nifty Sensex, financial news india, bridgespark",
  openGraph: {
    title: "BridgeSpark - India's Financial News & Markets Hub",
    description: "Exclusive authorised advertising partner of Investing.com in India. Live market data, financial news, and premium ad solutions.",
    url: "https://bridgespark.in",
    siteName: "BridgeSpark",
    images: [{ url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop,f=jpeg/Aq2qMLBOwOUekgyZ/bridgespark-mjEqeao1Zghl3Wzj.jpg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f2f2f2]">
        <TickerStrip />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
