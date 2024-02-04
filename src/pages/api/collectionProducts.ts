// pages/api/collectionProducts/index.ts

import { PAGE_BY } from '@site/lib/const';
import { getCollectionProducts } from '@site/lib/shopify';
import { FiltersQueryParams } from '@site/pages/collections/[slug]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = new URL(req.url ?? '', `http://${req.headers.host}`).searchParams;

    const data = await getCollectionProducts({
      variables: {
        pageBy: PAGE_BY,
        cursor: params.get('cursor') ?? null,
        filters: params.get('filters') ? JSON.parse(params.get('filters')!) : ([] as FiltersQueryParams),
        sortKey: params.get('sort') ?? 'RELEVANCE',
        handle: params.get('handle') ?? '',
        reverse: Boolean(params.get('reverse')),
      },
    });

    return res.status(200).json({
      products: data.body.data.collection.products.nodes,
      pageInfo: data.body.data.collection.products.pageInfo,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
