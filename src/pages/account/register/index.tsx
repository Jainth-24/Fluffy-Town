import { getInputStyleClasses } from '@site/lib/utils';
import { createCustomer, loginCustomer } from '@site/lib/shopify';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import FormButton from '../../../components/FormButton';
import FormFooter from '../../../components/FormFooter';
import FormHeader from '../../../components/FormHeader';
import AuthLayout from '../../../components/AuthLayout';
import { StoreLayout } from '@site/layouts/StoreLayout';

let emailError: string | null = null;
let passwordError: string | null = null;
let firstnameError: string | null = null;
let lastNameError: string | null = null;

export default function RegisterPage() {
  const router = useRouter();
  async function handleSubmit(data: FormData) {
    const res = await createCustomer({
      variables: {
        input: {
          email: data.get('email') as string,
          password: data.get('password') as string,
          firstName: data.get('firstname') as string,
          lastName: data.get('lastName') as string,
        },
      },
    });

    if (res.body.data.customerCreate.customer) {
      const loginRes = await loginCustomer({
        variables: {
          input: {
            email: data.get('email') as string,
            password: data.get('password') as string,
          },
        },
      });

      if (loginRes.body.data.customerAccessTokenCreate.customerAccessToken?.accessToken) {
        const accessToken = loginRes.body.data.customerAccessTokenCreate.customerAccessToken.accessToken;

        // Set the 'customerAccessToken' cookie with the extracted access token and expiration time
        Cookies.set('customerAccessToken', accessToken, {
          httpOnly: true,
          path: '/',
          expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
        });
        router.push('/account');
      }

      router.push('/account/login');
    }

    if (res.body.data.customerCreate.customerUserErrors.length > 0) {
      res.body.data.customerCreate.customerUserErrors.forEach((error: any) => {
        if (error.field.includes('email')) {
          emailError = error.message;
        }
        if (error.field.includes('password')) {
          passwordError = error.message;
        }
        if (error.field.includes('firstname')) {
          firstnameError = error.message;
        }
        if (error.field.includes('lastName')) {
          lastNameError = error.message;
        }
      });
    }

    router.replace('/account/register');
  }

  return (
    <StoreLayout>
      <AuthLayout>
        <form action={handleSubmit} className="p-8 shadow-md">
          <FormHeader title="Create an Account" />

          <div className="mb-4 mt-8">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              className={`w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none ${
                firstnameError ? 'border-red-500' : 'border-gray-300'
              }`}
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="firstname"
              required
              placeholder="Enter your firstname"
              aria-label="firstname"
            />
            {firstnameError && <p className="mt-1 text-xs text-red-500">{firstnameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              className={`w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none ${
                lastNameError ? 'border-red-500' : 'border-gray-300'
              }`}
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="lastName"
              placeholder="Enter your last Name"
              aria-label="lastName"
            />
            {lastNameError && <p className="mt-1 text-xs text-red-500">{lastNameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              className={`w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none ${
                emailError ? 'border-red-500' : 'border-gray-300'
              }`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              autoFocus
            />
            {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              className={`w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-label="Password"
              minLength={8}
              required
            />
            {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
          </div>
          <FormButton btnText="Create Account" />
          <FormFooter page="register" />
        </form>
      </AuthLayout>
    </StoreLayout>
  );
}
