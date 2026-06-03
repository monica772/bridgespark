export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  source: string;
  time: string;
  image?: string;
  tag?: string;
}

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Sensex surges 320 points; Nifty above 24,800 as FII buying continues',
    summary: 'Indian equity markets opened higher on Tuesday as foreign institutional investors continued their buying spree, with IT and banking stocks leading gains.',
    category: 'Markets',
    source: 'BridgeSpark',
    time: '2 min ago',
    tag: 'BREAKING',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'RBI holds repo rate at 6.5%; maintains withdrawal of accommodation stance',
    summary: 'The Reserve Bank of India kept the repo rate unchanged at 6.5% in its June meeting, maintaining a cautious stance on inflation while supporting growth.',
    category: 'Economy',
    source: 'BridgeSpark',
    time: '18 min ago',
    tag: 'POLICY',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'TCS Q4 results: Net profit rises 8% YoY to ₹12,434 crore, beats estimates',
    summary: 'India\'s largest IT services company reported strong quarterly earnings, with revenue growth of 9.2% in constant currency terms.',
    category: 'Earnings',
    source: 'BridgeSpark',
    time: '45 min ago',
    tag: 'RESULTS',
  },
  {
    id: 4,
    title: 'Adani Group stocks rally up to 5% on strong order book announcements',
    summary: 'Adani Enterprises and Adani Ports led a broad-based rally in the conglomerate\'s listed companies after announcing new infrastructure contracts.',
    category: 'Stocks',
    source: 'BridgeSpark',
    time: '1 hr ago',
  },
  {
    id: 5,
    title: 'Gold hits 3-week high as US dollar weakens on dovish Fed commentary',
    summary: 'MCX Gold futures rose to ₹73,240 per 10 grams as the US Federal Reserve signalled potential rate cuts later this year.',
    category: 'Commodities',
    source: 'BridgeSpark',
    time: '2 hrs ago',
    tag: 'COMMODITIES',
  },
  {
    id: 6,
    title: 'Paytm shares hit 52-week high amid turnaround hopes; up 12% this month',
    summary: 'One97 Communications shares surged after analysts revised their target prices higher, citing improving unit economics and merchant growth.',
    category: 'Tech',
    source: 'BridgeSpark',
    time: '3 hrs ago',
  },
  {
    id: 7,
    title: 'India\'s manufacturing PMI rises to 58.8 in May — 16-year high',
    summary: 'India\'s factory activity expanded at the fastest pace in over a decade as domestic demand and new export orders surged.',
    category: 'Economy',
    source: 'BridgeSpark',
    time: '4 hrs ago',
  },
  {
    id: 8,
    title: 'HDFC Bank raises ₹7,500 crore via infrastructure bonds at 7.68% coupon',
    summary: 'The private sector lender raised funds to support its growing loan book and comply with infrastructure lending requirements.',
    category: 'Banking',
    source: 'BridgeSpark',
    time: '5 hrs ago',
  },
];
