import { revalidate } from '@site/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export default async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
