import { getInputStyleClasses } from '@site/lib/utils';
import FormModal from './FormModal';
import { MailingAddress, MailingAddressInput, Maybe } from '@site/lib/shopify/types';
import Cookies from 'js-cookie';
import { addAddress, updateAddress, updateDefaultAddress } from '@site/lib/shopify';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Button } from './Button';
import FormButton from '@site/components/FormButton';
import { useRouter } from 'next/router';

interface IAddressForm {
  isNewAddress: boolean;
  address?: MailingAddress;
  defaultAddress?: Maybe<MailingAddress>;
}

let formError: string | null = null;

function AddressForm({ isNewAddress, address, defaultAddress }: IAddressForm) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    formError = null;

    const token = Cookies.get('customerAccessToken') as string;
    const addressInput: MailingAddressInput = {};

    const keys: (keyof MailingAddressInput)[] = [
      'lastName',
      'firstName',
      'address1',
      'address2',
      'city',
      'province',
      'country',
      'zip',
      'phone',
      'company',
    ];

    keys.forEach((key) => {
      const value = formData.get(key);
      if (typeof value === 'string') {
        addressInput[key] = value;
      }
    });

    const defaultAddress = formData.get('defaultAddress') as string;

    if (isNewAddress) {
      try {
        const addAddressResponse = await addAddress({
          variables: {
            address: addressInput,
            customerAccessToken: token,
          },
        });
        const customerAddressCreate = addAddressResponse.body.data.customerAddressCreate;
        const customerAddress = customerAddressCreate.customerAddress;
        const customerUserErrors = customerAddressCreate.customerUserErrors;

        if (customerAddress && defaultAddress) {
          await updateDefaultAddress({
            variables: {
              addressId: customerAddress.id,
              customerAccessToken: token,
            },
          });
        }

        customerUserErrors.forEach(({ message }) => {
          formError = message;
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updateAddressResponse = await updateAddress({
          variables: {
            address: addressInput,
            customerAccessToken: token,
            id: decodeURIComponent(address?.id as any),
          },
        });
        const customerAddressCreate = updateAddressResponse.body.data.customerAddressUpdate;
        const customerAddress = customerAddressCreate.customerAddress;
        const customerUserErrors = customerAddressCreate.customerUserErrors;

        if (customerAddress && defaultAddress) {
          await updateDefaultAddress({
            variables: {
              addressId: customerAddress.id,
              customerAccessToken: token,
            },
          });
        }

        customerUserErrors.forEach(({ message }) => {
          formError = message;
        });
      } catch (error) {
        console.log(error);
      }
    }

    router.replace('/account');

    if (!formError) {
      router.push('/account');
    }
  };

  async function handleCleanError() {
    formError = null;
    router.replace(`/account/address/${isNewAddress ? 'add' : address?.id}`);
    router.push('/account');
  }

  return (
    <FormModal heading={isNewAddress ? 'Add address' : 'Edit address'} action={handleCleanError}>
      <form action={handleSubmit}>
        {formError && (
          <div className="mb-6 flex items-center justify-center rounded bg-red-100">
            <p className="m-4 text-sm text-red-900">{formError}</p>
          </div>
        )}
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="firstName"
            name="firstName"
            required
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
            defaultValue={address?.firstName ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="lastName"
            name="lastName"
            required
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            aria-label="Last name"
            defaultValue={address?.lastName ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company"
            aria-label="Company"
            defaultValue={address?.company ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="address1"
            name="address1"
            type="text"
            autoComplete="address-line1"
            placeholder="Address line 1*"
            required
            aria-label="Address line 1"
            defaultValue={address?.address1 ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="address2"
            name="address2"
            type="text"
            autoComplete="address-line2"
            placeholder="Address line 2"
            aria-label="Address line 2"
            defaultValue={address?.address2 ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="City"
            aria-label="City"
            defaultValue={address?.city ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="province"
            name="province"
            type="text"
            autoComplete="address-level1"
            placeholder="State / Province"
            required
            aria-label="State"
            defaultValue={address?.province ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="zip"
            name="zip"
            type="text"
            autoComplete="postal-code"
            placeholder="Zip / Postal Code"
            required
            aria-label="Zip"
            defaultValue={address?.zip ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="Country"
            required
            aria-label="Country"
            defaultValue={address?.country ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone"
            aria-label="Phone"
            defaultValue={address?.phone ?? ''}
          />
        </div>
        <div className="mt-4">
          <input
            type="checkbox"
            name="defaultAddress"
            id="defaultAddress"
            defaultChecked={!isNewAddress && defaultAddress?.id === address?.id}
            className="border-1 cursor-pointer rounded-sm border-gray-500"
          />
          <label className="ml-2 inline-block cursor-pointer text-sm" htmlFor="defaultAddress">
            Set as default address
          </label>
        </div>
        <div className="mt-8">
          <FormButton btnText="Save" />
        </div>
        <div>
          <Button to="/account" className="focus:shadow-outline mt-2 w-full rounded" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </FormModal>
  );
}

export default AddressForm;
