import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Link } from '@site/components/Link';
import { Money } from '@site/components/MoneyComponent';
import { PageHeader, Heading, Text } from '@site/components/Text';
import { flattenConnection } from '@site/lib/flattenConnection';
import { getCustomerOrder } from '@site/lib/shopify';
import { OrderLineItem } from '@site/lib/shopify/types';
import { statusMessage } from '@site/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { Button } from 'flowbite-react';

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const orderToken = query.key as string;
  const orderId = `gid://shopify/Order/${params?.id}?key=${orderToken}`;

  try {
    const response = await getCustomerOrder(orderId);
    const order = response.body.data.node;

    if (!order) {
      throw new Error('Order not found');
    }

    const lineItems = flattenConnection(order.lineItems) as Array<OrderLineItem>;

    const discountApplications = flattenConnection(order.discountApplications);

    const firstDiscount = discountApplications[0]?.value;

    const discountValue = firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

    const discountPercentage = firstDiscount?.__typename === 'PricingPercentageValue' && firstDiscount?.percentage;

    return {
      props: {
        order,
        lineItems,
        discountValue,
        discountPercentage,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Orders = ({
  order,
  lineItems,
  discountValue,
  discountPercentage,
}: {
  order: any;
  lineItems: OrderLineItem[];
  discountValue: any;
  discountPercentage: any;
}) => {

  return (
	<StoreLayout>
    <div>
      <PageHeader heading="Order detail">
        <Link href="/account">
          <Button gradientMonochrome={"success"}>Return to Account Overview</Button>
        </Link>
      </PageHeader>
      <div className="w-full p-6 sm:grid-cols-1 md:p-8 lg:p-12 lg:py-6">
        <div>
          <Text as="h3" size="lead">
            Order No. {order.name}
          </Text>
          <Text className="mt-2" as="p">
            Placed on {new Date(order.processedAt).toDateString()}
          </Text>
          <div className="grid  items-start gap-12 sm:grid-cols-1 sm:divide-y sm:divide-gray-200 md:grid-cols-4 md:gap-16 ">
            <table className="my-8 min-w-full divide-y divide-gray-300 md:col-span-3 ">
              <thead>
                <tr className="align-baseline ">
                  <th scope="col" className="pb-4 pl-0 pr-3 text-left font-semibold">
                    Product
                  </th>
                  <th scope="col" className="hidden px-4 pb-4 text-right font-semibold sm:table-cell md:table-cell">
                    Price
                  </th>
                  <th scope="col" className="hidden px-4 pb-4 text-right font-semibold sm:table-cell md:table-cell">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 pb-4 text-right font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lineItems.map((lineItem: OrderLineItem) => (
                  <tr key={lineItem.variant!.id}>
                    <td className="w-full py-4 pl-0 pr-3 align-top sm:align-middle max-w-0 sm:w-auto sm:max-w-none">
                      <div className="flex gap-6">
                        <Link href={`/products/${lineItem.variant!.product.handle}`}>
                          {lineItem?.variant?.image && (
                            <div className="w-24 card-image aspect-square">
                              <Image
                                width={lineItem.variant.image.width || 96}
                                height={lineItem.variant.image.height || 96}
                                //@ts-expect-error the Image type is wrong also in the remix hydrogen project, we receive src instead of url inside lineItem.variant.image object
                                src={lineItem.variant.image.src}
                                alt={lineItem.variant.image.altText}
                              />
                            </div>
                          )}
                        </Link>
                        <div className="flex-col justify-center hidden lg:flex">
                          <Text as="p">{lineItem.title}</Text>
                          <Text size="fine" className="mt-1" as="p">
                            {lineItem.variant!.title}
                          </Text>
                        </div>
                        <dl className="grid">
                          <dt className="sr-only">Product</dt>
                          <dd className="truncate lg:hidden">
                            <Heading size="copy" format as="h3">
                              {lineItem.title}
                            </Heading>
                            <Text size="fine" className="mt-1">
                              {lineItem.variant!.title}
                            </Text>
                          </dd>
                          <dt className="sr-only">Price</dt>
                          <dd className="truncate sm:hidden">
                            <Text size="fine" className="mt-4">
                              <Money data={lineItem.variant!.price} />
                            </Text>
                          </dd>
                          <dt className="sr-only">Quantity</dt>
                          <dd className="truncate sm:hidden">
                            <Text className="mt-1" size="fine">
                              Qty: {lineItem.quantity}
                            </Text>
                          </dd>
                        </dl>
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      <Money data={lineItem.variant!.price} />
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      {lineItem.quantity}
                    </td>
                    <td className="px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      <Text>
                        <Money data={lineItem.discountedTotalPrice} />
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {(discountValue?.amount || discountPercentage) && (
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-6 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0"
                    >
                      <Text>Discounts</Text>
                    </th>
                    <th scope="row" className="pt-6 pr-3 font-normal text-left sm:hidden">
                      <Text>Discounts</Text>
                    </th>
                    <td className="pt-6 pl-3 pr-4 font-medium text-right text-green-700 md:pr-3">
                      {discountPercentage ? (
                        <span className="text-sm">-{discountPercentage}% OFF</span>
                      ) : (
                        discountValue && <Money data={discountValue} />
                      )}
                    </td>
                  </tr>
                )}
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-6 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0"
                  >
                    <Text>Subtotal</Text>
                  </th>
                  <th scope="row" className="pt-6 pr-3 font-normal text-left sm:hidden">
                    <Text>Subtotal</Text>
                  </th>
                  <td className="pt-6 pl-3 pr-4 text-right md:pr-3">
                    {order.subtotalPrice && <Money data={order.subtotalPrice} />}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0"
                  >
                    Tax
                  </th>
                  <th scope="row" className="pt-4 pr-3 font-normal text-left sm:hidden">
                    <Text>Tax</Text>
                  </th>
                  <td className="pt-4 pl-3 pr-4 text-right md:pr-3">
                    {order.totalTax && <Money data={order.totalTax} />}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 pl-6 pr-3 font-semibold text-right sm:table-cell md:pl-0"
                  >
                    Total
                  </th>
                  <th scope="row" className="pt-4 pr-3 font-semibold text-left sm:hidden">
                    <Text>Total</Text>
                  </th>
                  <td className="pt-4 pl-3 pr-4 font-semibold text-right md:pr-3">
                    <Money data={order.totalPrice} />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="sticky border-none top-nav md:my-8">
              <Heading size="copy" className="font-semibold" as="h3">
                Shipping Address
              </Heading>
              {order?.shippingAddress ? (
                <ul className="mt-6">
                  <li>
                    <Text>
                      {order.shippingAddress.firstName && order.shippingAddress.firstName + ' '}
                      {order.shippingAddress.lastName}
                    </Text>
                  </li>
                  {order?.shippingAddress?.formatted ? (
                    order.shippingAddress.formatted.map((line: string) => (
                      <li key={line}>
                        <Text>{line}</Text>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <p className="mt-3">No shipping address defined</p>
              )}
              <Heading size="copy" className="mt-8 font-semibold" as="h3">
                Status
              </Heading>
              <div
                className={clsx(
                  `mt-3 inline-block w-auto rounded-full px-3 py-1 text-xs font-medium`,
                  order.fulfillmentStatus === 'FULFILLED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-200'
                )}
              >
                <Text size="fine">{statusMessage(order.fulfillmentStatus)}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</StoreLayout>
  );
};

export default Orders;
