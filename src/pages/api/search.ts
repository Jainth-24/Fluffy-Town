import { PAGE_BY } from '@site/lib/const';
import {
  getFeaturedCollections,
  getFeaturedProducts,
  getSearchedProducts,
} from '@site/lib/shopify';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const params = new URL(req.url || '', `http://localhost`).searchParams;

    const data = await getSearchedProducts({
      variables: {
        first: PAGE_BY,
        endCursor: params.get('cursor') ?? undefined,
        searchTerm: params.get('q') ?? undefined,
      },
    });

    return res.status(200).json({
      products: data.body.data.products.nodes,
      pageInfo: data.body.data.products.pageInfo,
    });
  } else if (req.method === 'GET') {
    const featuredProductsResponse = await getFeaturedProducts();
    const featuredCollectionsResponse = await getFeaturedCollections();

    return res.status(200).json({
      featuredProductsResponse,
      featuredCollectionsResponse,
    });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
