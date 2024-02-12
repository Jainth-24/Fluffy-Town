import { Cart } from '@site/components/Cart';
import { StoreLayout } from '@site/layouts/StoreLayout';
import React from 'react';

const CartPage = () => {
  return (
    <StoreLayout>
      <Cart layout="page" />
    </StoreLayout>
  );
};

export default CartPage;
