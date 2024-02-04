import { isShopifyError } from '@site/lib/type-guards';
import { NextApiRequest, NextApiResponse } from 'next';
import { applyDiscountToCart } from '@site/lib/shopify';
import { formatErrorMessage } from '@site/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cartId = req.cookies.cartId;
  const { discountCodes } = JSON.parse(req.body);

  if (!cartId || !discountCodes) {
    return res.status(400).json({ error: 'Missing cartId or discountCodes' });
  }

  try {
    const cart = await applyDiscountToCart({ cartId, discountCodes });
    return res.status(200).json({ cart });
  } catch (e) {
    if (isShopifyError(e)) {
      return res.status(e.status).json({ message: formatErrorMessage(e.message) });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
