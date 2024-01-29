import { Order } from '@site/lib/shopify/types';
import { OrderCard } from './OrderCard';

export default function Orders({ orders }: { orders: Order[] }) {
  return (
    <ul className="false grid grid-flow-row grid-cols-1 gap-2 gap-y-6 sm:grid-cols-3 md:gap-4 lg:gap-6">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
