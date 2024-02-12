import OrderHistory from '@site/components/OrderHistory'
import { StoreLayout } from '@site/layouts/StoreLayout'
import { flattenConnection } from '@site/lib/flattenConnection';
import { getCustomer } from '@site/lib/shopify';
import { Order } from '@site/lib/shopify/types';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

const Myorders = () => {
    const [customer, setCustomer] = useState<any | null>(null);


  useEffect(() => {
    const fetchData = async () => {
        const token = Cookies.get('customerAccessToken') as string;
        const customerData = await getCustomer(token);
        setCustomer(customerData);

    
    }
    fetchData();
  }, []);

  if (!customer) {
    // Render loading state or return null
    return <div className='flex h-screen items-center justify-center'>
    <Spinner className='text-center' color="warning" aria-label="Warning spinner example" size={"lg"}/>
</div>
;

  }

  const { orders } = customer;
  const customerOrders = flattenConnection(orders) as Order[];
  return (
    <StoreLayout>

       {customerOrders && <OrderHistory orders={customerOrders} />}
    </StoreLayout>
  )
}

export default Myorders