import AddressCard from '@site/components/AddressCard';
import { Text } from '@site/components/Text';
import { Customer, MailingAddress } from '@site/lib/shopify/types';
import { convertObjectToQueryString } from '@site/lib/utils';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default function AccountBook({ customer, addresses }: { customer: Customer; addresses: MailingAddress[] }) {
  const router =useRouter()
  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="text-lead text-xl font-bold bg-yellow-200 p-3 text-center">Address Book</h3>
        <div>
          {!addresses?.length && (
            <Text className="mb-1" width="narrow" as="p" size="copy">
              You haven&apos;t saved any addresses yet.
            </Text>
          )}
          <div className="w-48">
            <Button
            gradientMonochrome="success"
              onClick={()=>router.push(`account?${convertObjectToQueryString({
                modal: 'address-add',
              })}`)}
              className="  text-primary mb-6 mt-2 w-full rounded-sm items-center text-sm font-medium text-white"
            >
              Add an Address
            </Button>
          </div>
          {Boolean(addresses?.length) && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {customer.defaultAddress && <AddressCard address={customer.defaultAddress} defaultAddress />}
              {addresses
                .filter((address) => address.id !== customer.defaultAddress?.id)
                .map((address) => (
                  <AddressCard key={address.id} address={address} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
