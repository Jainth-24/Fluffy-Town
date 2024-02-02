// pages/api/collections.ts
import { PAGE_BY } from '@site/lib/const';
import { getAllCollections } from '@site/lib/shopify';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;
    const cursor = query.cursor as string | undefined;
    const data = await getAllCollections({
      variables: {
        first: PAGE_BY,
        endCursor: cursor ?? undefined,
      },
    });

    res.status(200).json({
      collections: data.body.data.collections.nodes,
      pageInfo: data.body.data.collections.pageInfo,
    });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
