import { NextResponse } from 'next/server';

// Popular Indian MF scheme codes from AMFI / mfapi.in
const SCHEMES = [
  // Large Cap
  { code: '118834', name: 'Mirae Asset Large Cap',          category: 'Large Cap',  house: 'Mirae Asset' },
  { code: '118989', name: 'HDFC Top 100',                   category: 'Large Cap',  house: 'HDFC' },
  { code: '119597', name: 'SBI Bluechip',                   category: 'Large Cap',  house: 'SBI' },
  { code: '120465', name: 'Axis Bluechip',                  category: 'Large Cap',  house: 'Axis' },
  // Mid Cap
  { code: '118814', name: 'HDFC Mid-Cap Opportunities',     category: 'Mid Cap',    house: 'HDFC' },
  { code: '140822', name: 'Mirae Asset Midcap',             category: 'Mid Cap',    house: 'Mirae Asset' },
  { code: '131655', name: 'Kotak Emerging Equity',          category: 'Mid Cap',    house: 'Kotak' },
  // Small Cap
  { code: '118778', name: 'Nippon India Small Cap',         category: 'Small Cap',  house: 'Nippon' },
  { code: '125494', name: 'SBI Small Cap',                  category: 'Small Cap',  house: 'SBI' },
  { code: '125354', name: 'Axis Small Cap',                 category: 'Small Cap',  house: 'Axis' },
  // Index
  { code: '120716', name: 'UTI Nifty 50 Index',             category: 'Index',      house: 'UTI' },
  { code: '120828', name: 'HDFC Index Nifty 50',            category: 'Index',      house: 'HDFC' },
  { code: '125497', name: 'SBI Nifty Index',                category: 'Index',      house: 'SBI' },
  // ELSS
  { code: '120503', name: 'Axis Long Term Equity (ELSS)',   category: 'ELSS',       house: 'Axis' },
  { code: '140545', name: 'Mirae Asset Tax Saver (ELSS)',   category: 'ELSS',       house: 'Mirae Asset' },
  // Flexi / Multi Cap
  { code: '118825', name: 'Parag Parikh Flexi Cap',         category: 'Flexi Cap',  house: 'PPFAS' },
  { code: '112090', name: 'HDFC Flexi Cap',                 category: 'Flexi Cap',  house: 'HDFC' },
];

async function fetchSchemeNAV(scheme: typeof SCHEMES[0]) {
  const res = await fetch(`https://api.mfapi.in/mf/${scheme.code}`, {
    next: { revalidate: 3600 }, // NAV updates once daily
  });
  if (!res.ok) throw new Error(`mfapi: ${res.status}`);
  const json = await res.json();

  const latest  = json.data?.[0];
  const prev    = json.data?.[1];
  const nav     = parseFloat(latest?.nav ?? '0');
  const prevNav = parseFloat(prev?.nav ?? nav.toString());
  const change  = nav - prevNav;
  const changePct = prevNav > 0 ? (change / prevNav) * 100 : 0;

  return {
    code:      scheme.code,
    name:      scheme.name,
    category:  scheme.category,
    house:     scheme.house,
    nav:       nav.toFixed(4),
    navDate:   latest?.date ?? '',
    change:    (change >= 0 ? '+' : '') + change.toFixed(4),
    changePct: (changePct >= 0 ? '+' : '') + changePct.toFixed(2) + '%',
    up:        change >= 0,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? 'all';

  try {
    const filtered = category === 'all'
      ? SCHEMES
      : SCHEMES.filter((s) => s.category.toLowerCase().replace(' ', '-') === category.toLowerCase());

    const results = await Promise.allSettled(filtered.map(fetchSchemeNAV));

    const funds = results
      .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof fetchSchemeNAV>>> => r.status === 'fulfilled')
      .map((r) => r.value);

    return NextResponse.json({ funds, timestamp: new Date().toISOString() });
  } catch (err) {
    console.warn('Mutual funds API error:', (err as Error).message);
    return NextResponse.json({ funds: [], error: true });
  }
}
