import { Link } from './Link';
import { revalidatePath } from 'next/cache';
import Cookies from 'js-cookie';
import { MailingAddress } from '@site/lib/shopify/types';
import { deleteAddress } from '@site/lib/shopify';
import FormButton from '@site/pages/account/component/FormButton';
import { convertObjectToQueryString } from '@site/lib/utils';
import { useRouter } from 'next/router';

function AddressCard({ address, defaultAddress }: { address: MailingAddress; defaultAddress?: boolean }) {
	const router=useRouter();
  const removeAddress = async (formData: FormData) => {
    const token = Cookies.get('customerAccessToken') as string;
    const id = formData.get('id') as string;
    await deleteAddress({
      variables: {
        customerAccessToken: token,
        id,
      },
    });
    router.replace('/account');
  };
  return (
    <div className="flex flex-col rounded border border-gray-200 p-6 lg:p-8">
      {defaultAddress && (
        <div className="mb-3 flex flex-row">
          <span className="bg-primary/20 text-primary/50 rounded-full px-3 py-1 text-xs font-medium">Default</span>
        </div>
      )}
      <ul className="flex-1 flex-row">
        {(address.firstName || address.lastName) && (
          <li>{'' + (address.firstName && address.firstName + ' ') + address?.lastName}</li>
        )}
        {address.formatted?.map((line: string) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="mt-6 flex flex-row items-baseline font-medium justify-between">
        <Link
          href={`/account?${convertObjectToQueryString({
            modal: 'address-edit',
            id: encodeURIComponent(address.id),
          })}`}
          className="text-left text-sm underline"
        >
          Edit
        </Link>
        <form action={removeAddress}>
          <input type="hidden" name="id" value={address.id} />
          <FormButton btnText="Remove" state="Removing" variant="outline" />
        </form>
      </div>
    </div>
  );
}

export default AddressCard;
