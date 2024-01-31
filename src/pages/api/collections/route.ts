import { PAGE_BY } from '@site/lib/const';
import { getAllCollections } from '@site/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const params = new URL(request.url).searchParams;

	const data = await getAllCollections({
		variables: {
			first: PAGE_BY,
			endCursor: params.get('cursor') ?? undefined,
		},
	});

	return NextResponse.json({
		collections: data.body.data.collections.nodes,
		pageInfo: data.body.data.collections.pageInfo,
	});
}
