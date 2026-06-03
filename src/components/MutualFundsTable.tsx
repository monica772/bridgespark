interface Fund {
  code: string;
  name: string;
  category: string;
  house: string;
  nav: string;
  navDate: string;
  change: string;
  changePct: string;
  up: boolean;
}

const CATEGORY_MAP: Record<string, string> = {
  'large-cap': 'Large Cap',
  'mid-cap':   'Mid Cap',
  'small-cap': 'Small Cap',
  'index':     'Index',
  'elss':      'ELSS',
  'flexi-cap': 'Flexi Cap',
  'all':       'all',
};

async function getFunds(category: string): Promise<Fund[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(
      `${base}/api/mutual-funds?category=${category}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.funds ?? [];
  } catch {
    return [];
  }
}

const HOUSE_COLORS: Record<string, string> = {
  'HDFC':       'bg-blue-100 text-blue-700',
  'SBI':        'bg-sky-100 text-sky-700',
  'Axis':       'bg-purple-100 text-purple-700',
  'Mirae Asset':'bg-teal-100 text-teal-700',
  'Nippon':     'bg-red-100 text-red-700',
  'Kotak':      'bg-orange-100 text-orange-700',
  'UTI':        'bg-green-100 text-green-700',
  'PPFAS':      'bg-indigo-100 text-indigo-700',
};

export default async function MutualFundsTable({ category }: { category: string }) {
  const mapped  = CATEGORY_MAP[category] ?? category;
  const funds   = await getFunds(mapped);

  if (!funds.length) {
    return (
      <div className="p-4 text-center text-gray-400 text-[12px]">
        Loading NAV data…
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-[11px] text-gray-500 uppercase">
            <th className="text-left px-3 py-2 font-semibold">Fund Name</th>
            <th className="text-left px-3 py-2 font-semibold hidden sm:table-cell">Fund House</th>
            <th className="text-right px-3 py-2 font-semibold">NAV (₹)</th>
            <th className="text-right px-3 py-2 font-semibold">1D Change</th>
            <th className="text-right px-3 py-2 font-semibold hidden md:table-cell">As of</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => (
            <tr
              key={fund.code}
              className="border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition cursor-pointer"
            >
              <td className="px-3 py-2.5">
                <div className="font-semibold text-gray-800 text-[12px]">{fund.name}</div>
                <div className="text-[10px] text-gray-400">{fund.category}</div>
              </td>
              <td className="px-3 py-2.5 hidden sm:table-cell">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${HOUSE_COLORS[fund.house] ?? 'bg-gray-100 text-gray-600'}`}>
                  {fund.house}
                </span>
              </td>
              <td className="px-3 py-2.5 text-right font-mono font-bold text-gray-900">
                ₹{fund.nav}
              </td>
              <td className={`px-3 py-2.5 text-right font-bold ${fund.up ? 'text-green-600' : 'text-red-600'}`}>
                <div>{fund.changePct}</div>
                <div className="text-[10px] font-normal">{fund.change}</div>
              </td>
              <td className="px-3 py-2.5 text-right text-gray-400 text-[10px] hidden md:table-cell">
                {fund.navDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400">
        Source: AMFI India via mfapi.in · NAV updated daily after market close
      </div>
    </div>
  );
}
