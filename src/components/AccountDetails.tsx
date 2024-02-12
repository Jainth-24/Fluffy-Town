import { Link } from '@site/components/Link';
import { Customer } from '@site/lib/shopify/types';
import { convertObjectToQueryString } from '@site/lib/utils';
function AccountDetails({ customer }: { customer: Customer }) {
  const { firstName, lastName, email, phone } = customer;
  const formattedFirstName = firstName ? firstName + ' ' : '';

  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="text-lead text-xl font-bold bg-yellow-200 p-3 text-center">Account Details</h3>
        <div  className="rounded-md p-6 shadow-sm lg:p-8 bg-gray-50">
          <div className="flex">
            <h3 className="flex-1 text-base font-bold">Profile & Security</h3>
            <Link
              className="text-sm font-semibold underline"
              href={`/account?${convertObjectToQueryString({
                modal: 'account-edit',
              })}`}
            >
              Edit
            </Link>
          </div>
          
          <div className="font-semibold mt-4 text-md">Name</div>
          <p className="mt-1">{firstName || lastName ? formattedFirstName + lastName : 'Add name'} </p>

          <div className="font-semibold mt-4 text-sm">Contact</div>
          <p className="mt-1">{phone ?? 'Add mobile'}</p>

          <div className="font-semibold mt-4 text-sm">Email address</div>
          <p className="mt-1">{email}</p>

          <div className="font-semibold mt-4 text-sm">Password</div>
          <p className="mt-1">**************</p>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
