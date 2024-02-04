import React, { useEffect, useState } from 'react';
import { FeaturedSection } from '@site/components/FeaturedSection';
import { getFeaturedProducts, getFeaturedCollections, getCustomer } from '@site/lib/shopify';
import OrderHistory from '../../components/OrderHistory';
import AccountDetails from '../../components/AccountDetails';
import AccountBook from '../../components/AccountBook';
import Cookies from 'js-cookie';
import { PageHeader } from '@site/components/Text';
import { flattenConnection } from '@site/lib/flattenConnection';
import { MailingAddress, Order } from '@site/lib/shopify/types';
import AccountForm from '@site/components/AccountForm';
import { getIdFromURL } from '@site/lib/utils';
import AddressForm from '@site/components/AddressForm';
import { useRouter } from 'next/router';
import { StoreLayout } from '@site/layouts/StoreLayout';

function AccountPage() {
  const router = useRouter();
  const searchParams = router.query;
  const [customer, setCustomer] = useState<any | null>(null);
  const [featuredProductsResponse, setFeaturedProductsResponse] = useState<any | null>(null);
  const [featuredCollectionsResponse, setFeaturedCollectionsResponse] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('customerAccessToken') as string;
        const customerData = await getCustomer(token);
        setCustomer(customerData);

        if (customerData) {
          const productsResponse = await getFeaturedProducts();
          const collectionsResponse = await getFeaturedCollections();

          setFeaturedProductsResponse(productsResponse);
          setFeaturedCollectionsResponse(collectionsResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams]);

  if (!customer) {
    // Render loading state or return null
    return null;
  }

  const { orders } = customer;
  const customerOrders = flattenConnection(orders) as Order[];
  const addresses = flattenConnection(customer.addresses) as MailingAddress[];
  const address =
    (searchParams &&
      typeof searchParams.id === 'string' && // Check if searchParams.id is a string
      addresses.find((res) => {
        // @ts-ignore
        const editId = decodeURIComponent(searchParams?.id);
        const { id: editMailingId } = getIdFromURL(editId);
        const { id: mailingId } = getIdFromURL(res.id);
        return mailingId === editMailingId && searchParams?.id;
      })) ||
    undefined;

  return (
    <StoreLayout>
      <PageHeader className="my-1 text-center text-4xl font-semibold">Account Details</PageHeader>
      {customerOrders && <OrderHistory orders={customerOrders} />}
      <AccountDetails customer={customer} />
      <AccountBook addresses={addresses} customer={customer} />
      {!customerOrders.length && featuredProductsResponse && featuredCollectionsResponse && (
        <FeaturedSection
          featuredProducts={featuredProductsResponse.body.data.products.nodes}
          featuredCollections={featuredCollectionsResponse.body.data.collections.nodes}
        />
      )}
      {searchParams?.modal === 'address-edit' && (
        <AddressForm isNewAddress={false} address={address} defaultAddress={customer.defaultAddress} />
      )}
      {searchParams?.modal === 'address-add' && (
        <AddressForm isNewAddress={true} address={address} defaultAddress={customer.defaultAddress} />
      )}
      {searchParams?.modal === 'account-edit' && <AccountForm customer={customer} />}
    </StoreLayout>
  );
}

export default AccountPage;
