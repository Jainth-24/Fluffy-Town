import { getInputStyleClasses } from '@site/lib/utils';
import { createCustomer, loginCustomer } from '@site/lib/shopify';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import FormButton from '../component/FormButton';
import FormFooter from '../component/FormFooter';
import FormHeader from '../component/FormHeader';
import AuthLayout from '../component/AuthLayout';
import { StoreLayout } from '@site/layouts/StoreLayout';

let emailError: string | null = null;
let passwordError: string | null = null;

export default function RegisterPage() {
  const router = useRouter();
  async function handleSubmit(data: FormData) {
    const res = await createCustomer({
      variables: {
        input: {
          email: data.get('email') as string,
          password: data.get('password') as string,
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
        router.replace('/account');
      }

      router.replace('/account/login');
    }

    if (res.body.data.customerCreate.customerUserErrors.length > 0) {
      res.body.data.customerCreate.customerUserErrors.forEach((error: any) => {
        if (error.field.includes('email')) {
          emailError = error.message;
        }
        if (error.field.includes('password')) {
          passwordError = error.message;
        }
      });
    }

    router.replace('/account/register');
  }

  return (
    <StoreLayout>
      <AuthLayout>
        
        <form action={handleSubmit} noValidate className="my-4 space-y-4 p-8 shadow-md">
		<FormHeader title="Create an Account" />
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${
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
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${
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
            {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
          </div>
          <FormButton btnText="Create Account" />
          <FormFooter page="register" />
        </form>
      </AuthLayout>
    </StoreLayout>
  );
}
