import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useScroll } from 'react-use';
import CartLineItem from './CartLineItem';
import { IconRemove } from './Icon';
import { Text } from './Text';
import { Money } from './MoneyComponent';
import { CartCost, CartLine, CartType } from '@site/lib/shopify/types';
import useCartStore from '@site/store/cart-store';
import useCartFetcher from '@site/hooks/useCartFetcher';
import { getInputStyleClasses } from '@site/lib/utils';
import useAppStore from '@site/store/app-store';
import { Button } from 'flowbite-react';
import FeaturedProducts from './FeaturedProducts';
import { useRouter } from 'next/router';

type Layouts = 'page' | 'drawer';

export function Cart({ layout }: { layout: Layouts }) {
  return (
    <>
      <CartEmpty layout={layout} />
      <CartDetails layout={layout} />
    </>
  );
}

export function CartDetails({ layout }: { layout: Layouts }) {
  const cart = useCartStore((state) => state.cart);
  // @todo: get optimistic cart cost
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const container = {
    drawer: 'grid grid-cols-1 h-full grid-rows-[1fr_auto]',
    page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };   
  const isSubTotal = Boolean(parseInt(cart?.cost?.subtotalAmount?.amount || '0'));

  return (
    <div className={container[layout]}>
      <CartLines layout={layout} />
      {cartHasItems && isSubTotal && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );  
}

/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */
function CartDiscounts({ discountCodes }: { discountCodes: CartType['discountCodes'] }) {
  const codes = discountCodes?.map(({ code }) => code).join(', ') || null;
  const [discountCode, setDiscountCode] = useState('');

  const handleDiscount = async () => {
    const response = await fetch(`/api/cart/discount`, {
      method: 'PUT',
      body: JSON.stringify({
        discountCodes: [discountCode],
      }),
    });
    const data = await response.json();

    if (data.status === 204 && data.cart) {
      setDiscountCode('');
      useCartStore.setState({ cart: data.cart });
    }
  };

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <button onClick={handleDiscount}>
              <IconRemove aria-hidden="true" style={{ height: 18, marginRight: 4 }} />
            </button>
            <Text as="dd">{codes}</Text>
          </div>
        </div>
      </dl>

      {/* No discounts, show an input to apply a discount */}
      <div className={clsx(codes ? 'hidden' : 'flex', 'items-center gap-4 justify-between text-copy')}>
        <input
          className={getInputStyleClasses()}
          type="text"
          name="discountCode"
          placeholder="Discount code"
          value={discountCode}
          onInput={(e) => setDiscountCode(e.currentTarget.value)}
        />
        <button className="flex justify-end font-medium whitespace-nowrap" onClick={handleDiscount}>
          Apply Discount
        </button>
      </div>
    </>
  );
}

function  CartLines({ layout = 'drawer' }: { layout: Layouts }) {
  const { editCartItem, deleteCartItem } = useCartFetcher();
  const cart = useCartStore((state) => state.cart);
  const currentLines: any = cart?.lines || [];
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page' ? 'grow md:translate-y-4' : 'sm-max:pt-2 px-6 pb-6 transition md:px-12',
  ]);

  return (
    <section ref={scrollRef} aria-labelledby="cart-contents" className={className}>
      <ul className="mt-10 grid gap-6 md:gap-10">
        {currentLines.map((line: CartLine) => (
          <CartLineItem
            key={line.id}
            line={line}
            adjustItemQuantity={(action) => editCartItem({ action: action, item: line })}
            deleteItem={() => deleteCartItem({ item: line })}
          />
        ))}
      </ul>
    </section>
  );
}

function CartCheckoutActions({ checkoutUrl }: { checkoutUrl: string }) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col my-2 pb-10">
      <a href={checkoutUrl} target="_self">
        <Button as="span">Continue to Checkout</Button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({
  cost,
  layout,
  children = null,
}: {
  children?: React.ReactNode;
  cost: CartCost;
  layout: Layouts;
}) {
  const summary = {
    drawer: 'grid gap-4 p-6 border-t md:px-12',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-gray-200 rounded w-full',
  };

  return (
    <section aria-labelledby="summary-heading" className={summary[layout]}>
      <h2 id="summary-heading" className="sr-only">
        Order summary
      </h2>
      <dl className="grid">
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Subtotal</Text>
          <Text as="dd" data-test="subtotal">
            {cost?.subtotalAmount?.amount ? <Money data={cost?.subtotalAmount} /> : '-'}
          </Text>
        </div>
      </dl>
      {children}
    </section>
  );
}

export function CartEmpty({ layout = 'drawer' }: { layout?: Layouts }) {
  const cart = useCartStore((state) => state.cart);
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);
  const router = useRouter();
  const hidden = Boolean(cart?.lines?.length || 0);

  const container = {
    drawer: clsx([
      'h-screen content-start gap-4 overflow-y-scroll px-6 pb-8 transition md:gap-12 md:px-12 md:pb-12',
      y > 0 ? 'border-t' : '',
    ]),
    page: clsx([hidden ? '' : 'grid', `w-full gap-4 pb-5 md:items-start md:gap-8 lg:gap-12`]),
  };

  return (
    <div ref={scrollRef} className={container[layout]} hidden={hidden}>
      <section className="flex flex-col justify-center w-full items-center gap-6 py-12 text-center">
        <Text format>Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you started!</Text>
        <div>
          <Button
            onClick={() => {
              useAppStore.setState({ openCartDrawer: false });
              if (router.pathname === '/cart') {
                router.replace('/');
              }
            }}
          >
            Continue shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
