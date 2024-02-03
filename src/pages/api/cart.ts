// pages/api/cart.ts

import { addToCart, updateCart } from '@site/lib/shopify';
import { isShopifyError } from '@site/lib/type-guards';
import { formatErrorMessage } from '@site/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const cartId = req.cookies['cartId'];
    const { merchandiseId } = JSON.parse(req.body);
    if (!cartId || !merchandiseId) {
      return res.status(400).json({ error: 'Missing cartId or merchandiseId' });
    }

    try {
      const cart = await addToCart(cartId, [{ merchandiseId, quantity: 1 }]);
      return res.status(200).json({ cart });
    } catch (e) {
      if (isShopifyError(e)) {
        return res.status(e.status).json({ message: formatErrorMessage(e.message) });
      }

      return res.status(500).json({ status: 500 });
    }
  }

  if (req.method === 'PUT') {
    const cartId = req.cookies['cartId'];
    const { variantId, quantity, lineId } =JSON.parse(req.body)

    if (!cartId || !variantId || !quantity || !lineId) {
      return res.status(400).json({ error: 'Missing cartId, variantId, lineId, or quantity' });
    }

    try {
      const cart = await updateCart(cartId, [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity,
        },
      ]);
      return res.status(200).json({ cart });
    } catch (e) {
      if (isShopifyError(e)) {
        return res.status(e.status).json({ message: formatErrorMessage(e.message) });
      }

      return res.status(500).json({ status: 500 });
    }
  }

  // If the method is not POST or PUT
  return res.status(405).end();
}
