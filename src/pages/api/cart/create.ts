import { createCart, getCart } from '@site/lib/shopify';
import { Cart } from '@site/lib/shopify/types';
import { isShopifyError } from '@site/lib/type-guards';
import { formatErrorMessage } from '@site/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.cookies);
  const cartIdCookie = req.cookies?.cartId;

  if (cartIdCookie) {
    try {
      const cart = await getCart(cartIdCookie);
      return res.status(200).json({ status: 200, cart });
    } catch (e) {
      if (isShopifyError(e)) {
        return res.status(e.status).json({ message: formatErrorMessage(e.message) });
      }

      return res.status(500).json({ status: 500 });
    }
  } else {
    try {
      const cart: Cart = await createCart();

      res.setHeader('Set-Cookie', `cartId=${cart.id}; Max-Age=${30 * 24 * 60 * 60}; HttpOnly`);

      return res.status(200).json({ ...cart });
    } catch (e) {
      if (isShopifyError(e)) {
        return res.status(e.status).json({ message: formatErrorMessage(e.message) });
      }

      return res.status(500).json({ status: 500 });
    }
  }
}
