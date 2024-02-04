import { removeFromCart } from '@site/lib/shopify';
import { isShopifyError } from '@site/lib/type-guards';
import { formatErrorMessage } from '@site/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cartId = req.cookies.cartId;
  const { lineIds } = JSON.parse(req.body);

  if (!cartId || !lineIds) {
    return res.status(400).json({ error: 'Missing cartId or lineIds' });
  }

  try {
    const cart = await removeFromCart(cartId, lineIds);
    return res.status(200).json({ cart });
  } catch (e) {
    if (isShopifyError(e)) {
      return res.status(e.status).json({ message: formatErrorMessage(e.message) });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
