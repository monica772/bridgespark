import { NextResponse } from 'next/server';
import { fetchIPOData, MOCK_NCDS, MOCK_RIGHTS } from '@/lib/fetchIPO';

export const revalidate = 300;

export async function GET() {
  const ipoData = await fetchIPOData();
  return NextResponse.json({
    ...ipoData,
    ncds: MOCK_NCDS,
    rights: MOCK_RIGHTS,
    timestamp: new Date().toISOString(),
  });
}
