export interface IPOItem {
  company: string;
  exchange: string;
  openDate: string;
  closeDate: string;
  listingDate: string;
  priceMin: string;
  priceMax: string;
  lotSize: string;
  issueSize: string;
  gmp: string;
  gmpPct: string;
  status: 'open' | 'upcoming' | 'listed' | 'closed';
  type: 'mainboard' | 'sme';
  subscriptionTotal?: string;
  subscriptionRetail?: string;
  subscriptionQIB?: string;
  subscriptionNII?: string;
  listingGain?: string;
  listingPrice?: string;
}

export interface NCDItem {
  company: string;
  openDate: string;
  closeDate: string;
  rateMin: string;
  rateMax: string;
  tenure: string;
  rating: string;
  issueSize: string;
  status: 'open' | 'upcoming' | 'closed';
}

export interface RightsItem {
  company: string;
  openDate: string;
  closeDate: string;
  ratio: string;
  price: string;
  issueSize: string;
  status: 'open' | 'upcoming' | 'closed';
}

// NSE session-based fetch — needs to hit homepage first for cookies
async function getNSESession(): Promise<string> {
  const res = await fetch('https://www.nseindia.com', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  return res.headers.get('set-cookie') ?? '';
}

async function fetchNSE(path: string, cookies: string) {
  const res = await fetch(`https://www.nseindia.com${path}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'application/json, text/plain, */*',
      Referer: 'https://www.nseindia.com/',
      Cookie: cookies,
    },
  });
  if (!res.ok) throw new Error(`NSE ${path}: ${res.status}`);
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseNSEIPO(item: any, type: 'mainboard' | 'sme' = 'mainboard'): IPOItem {
  return {
    company: item.companyName ?? item.symbol ?? '',
    exchange: item.series ?? 'NSE',
    openDate: item.bidStartDate ?? item.openDate ?? '',
    closeDate: item.bidEndDate ?? item.closeDate ?? '',
    listingDate: item.listingDate ?? '',
    priceMin: item.minBidPrice ?? item.priceMin ?? '',
    priceMax: item.maxBidPrice ?? item.priceMax ?? '',
    lotSize: item.minBidQuantity ?? item.lotSize ?? '',
    issueSize: item.issueSize ?? '',
    gmp: '',
    gmpPct: '',
    status: item.bidStartDate ? 'upcoming' : 'open',
    type,
  };
}

export async function fetchIPOData(): Promise<{
  open: IPOItem[];
  upcoming: IPOItem[];
  listed: IPOItem[];
  sme: IPOItem[];
}> {
  try {
    const cookies = await getNSESession();
    const [currentData, upcomingData] = await Promise.all([
      fetchNSE('/api/upcoming-ipo?type=current', cookies).catch(() => ({ ipoList: [] })),
      fetchNSE('/api/upcoming-ipo?type=upcoming', cookies).catch(() => ({ ipoList: [] })),
    ]);

    const open     = (currentData?.ipoList ?? []).map((i: unknown) => parseNSEIPO(i));
    const upcoming = (upcomingData?.ipoList ?? []).map((i: unknown) => parseNSEIPO(i));

    console.log(`✅ NSE IPO: ${open.length} open, ${upcoming.length} upcoming`);
    return { open, upcoming, listed: [], sme: [] };
  } catch (err) {
    console.warn('⚠️  NSE IPO fetch failed:', (err as Error).message);
    return { open: MOCK_OPEN_IPOS, upcoming: MOCK_UPCOMING_IPOS, listed: MOCK_LISTED, sme: MOCK_SME };
  }
}

// ─── Fallback mock data (reflects real IPO structure) ────────────────────────

export const MOCK_OPEN_IPOS: IPOItem[] = [
  {
    company: 'Ather Energy Ltd', exchange: 'NSE/BSE', openDate: 'Apr 28, 2025', closeDate: 'Apr 30, 2025',
    listingDate: 'May 6, 2025', priceMin: '304', priceMax: '321', lotSize: '46',
    issueSize: '₹2,981 Cr', gmp: '+₹15', gmpPct: '+4.67%', status: 'open', type: 'mainboard',
    subscriptionTotal: '1.8x', subscriptionRetail: '2.1x', subscriptionQIB: '1.5x', subscriptionNII: '1.9x',
  },
  {
    company: 'Hexaware Technologies', exchange: 'NSE/BSE', openDate: 'Feb 12, 2025', closeDate: 'Feb 14, 2025',
    listingDate: 'Feb 19, 2025', priceMin: '674', priceMax: '708', lotSize: '21',
    issueSize: '₹8,750 Cr', gmp: '+₹32', gmpPct: '+4.52%', status: 'open', type: 'mainboard',
    subscriptionTotal: '2.66x', subscriptionRetail: '1.78x', subscriptionQIB: '4.20x', subscriptionNII: '2.10x',
  },
];

export const MOCK_UPCOMING_IPOS: IPOItem[] = [
  {
    company: 'LG Electronics India', exchange: 'NSE/BSE', openDate: 'TBA', closeDate: 'TBA',
    listingDate: 'TBA', priceMin: '—', priceMax: '—', lotSize: '—',
    issueSize: '~₹15,000 Cr', gmp: 'N/A', gmpPct: '', status: 'upcoming', type: 'mainboard',
  },
  {
    company: 'NSDL (National Securities Depository)', exchange: 'NSE/BSE', openDate: 'TBA', closeDate: 'TBA',
    listingDate: 'TBA', priceMin: '—', priceMax: '—', lotSize: '—',
    issueSize: '~₹3,000 Cr', gmp: 'N/A', gmpPct: '', status: 'upcoming', type: 'mainboard',
  },
  {
    company: 'HDB Financial Services', exchange: 'NSE/BSE', openDate: 'TBA', closeDate: 'TBA',
    listingDate: 'TBA', priceMin: '—', priceMax: '—', lotSize: '—',
    issueSize: '~₹12,500 Cr', gmp: 'N/A', gmpPct: '', status: 'upcoming', type: 'mainboard',
  },
];

export const MOCK_LISTED: IPOItem[] = [
  {
    company: 'Arisinfra Solutions', exchange: 'NSE/BSE', openDate: 'Mar 3, 2025', closeDate: 'Mar 5, 2025',
    listingDate: 'Mar 10, 2025', priceMin: '174', priceMax: '183', lotSize: '81',
    issueSize: '₹600 Cr', gmp: '', gmpPct: '', status: 'listed', type: 'mainboard',
    listingGain: '+28.4%', listingPrice: '235',
  },
  {
    company: 'Stallion India Fluorochemicals', exchange: 'NSE/BSE', openDate: 'Feb 25, 2025', closeDate: 'Feb 27, 2025',
    listingDate: 'Mar 4, 2025', priceMin: '85', priceMax: '90', lotSize: '165',
    issueSize: '₹199 Cr', gmp: '', gmpPct: '', status: 'listed', type: 'mainboard',
    listingGain: '+12.2%', listingPrice: '101',
  },
];

export const MOCK_SME: IPOItem[] = [
  {
    company: 'Kalahridhaan Trendz Ltd', exchange: 'BSE SME', openDate: 'Jun 2, 2025', closeDate: 'Jun 4, 2025',
    listingDate: 'Jun 9, 2025', priceMin: '54', priceMax: '57', lotSize: '2000',
    issueSize: '₹14.8 Cr', gmp: '+₹8', gmpPct: '+14.04%', status: 'open', type: 'sme',
  },
  {
    company: 'Inventurus Knowledge Solutions', exchange: 'NSE SME', openDate: 'Jun 3, 2025', closeDate: 'Jun 5, 2025',
    listingDate: 'Jun 10, 2025', priceMin: '1329', priceMax: '1397', lotSize: '10',
    issueSize: '₹2,498 Cr', gmp: '+₹200', gmpPct: '+14.32%', status: 'open', type: 'sme',
  },
];

export const MOCK_NCDS: NCDItem[] = [
  {
    company: 'Muthoot Finance Ltd NCD', openDate: 'May 19, 2025', closeDate: 'Jun 6, 2025',
    rateMin: '8.50%', rateMax: '9.00%', tenure: '24–60 months',
    rating: 'AA+ (CRISIL)', issueSize: '₹1,000 Cr', status: 'open',
  },
  {
    company: 'Shriram Finance NCD', openDate: 'Jun 10, 2025', closeDate: 'Jun 27, 2025',
    rateMin: '8.75%', rateMax: '9.25%', tenure: '36–84 months',
    rating: 'AA+ (ICRA)', issueSize: '₹500 Cr', status: 'upcoming',
  },
  {
    company: 'Indiabulls Housing Finance NCD', openDate: 'May 5, 2025', closeDate: 'May 30, 2025',
    rateMin: '9.10%', rateMax: '9.50%', tenure: '24–120 months',
    rating: 'A (CRISIL)', issueSize: '₹200 Cr', status: 'closed',
  },
];

export const MOCK_RIGHTS: RightsItem[] = [
  {
    company: 'Tata Motors Ltd', openDate: 'May 27, 2025', closeDate: 'Jun 10, 2025',
    ratio: '1:6', price: '₹680', issueSize: '₹3,299 Cr', status: 'open',
  },
  {
    company: 'Vedanta Ltd', openDate: 'Jun 15, 2025', closeDate: 'Jun 30, 2025',
    ratio: '1:4', price: '₹395', issueSize: '₹8,500 Cr', status: 'upcoming',
  },
];
