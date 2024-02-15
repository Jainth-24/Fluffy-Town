import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';
import FormButton from '../../../components/FormButton';
import Cookies from 'js-cookie';
import AuthLayout from '../../../components/AuthLayout';
import { loginCustomer } from '@site/lib/shopify';
import { useRouter } from 'next/router';
import { StoreLayout } from '@site/layouts/StoreLayout';

let emailError: string | null = null;
let passwordError: string | null = null;
let unidentifiedUserError: string | null = null;
export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(data: FormData) {
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

      Cookies.set('customerAccessToken', accessToken, {
        expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
      });

      router.replace('/account');
    }

    if (loginRes.body.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
      loginRes.body.data.customerAccessTokenCreate.customerUserErrors.forEach((error: any) => {
        if (error.field) {
          if (error.field.includes('email')) {
            emailError = error.message;
          }
          if (error.field.includes('password')) {
            passwordError = error.message;
          }
        } else {
          if (error.code === 'UNIDENTIFIED_CUSTOMER') {
            unidentifiedUserError = error.message;
          }
        }
      });
    }

    // router.replace('/account/login');
  }

  return (
    <StoreLayout>
      <AuthLayout>
        {unidentifiedUserError && <p className="mt-4 text-red-500">{unidentifiedUserError}</p>}
        <form action={handleSubmit} className="w-full max-w-md rounded bg-white p-8 shadow-md">
          <FormHeader title="Sign in" />
          <div className="my-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
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
              Password
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
          <FormButton btnText="Sign in" />
          <FormFooter page="login" />
        </form>
      </AuthLayout>
    </StoreLayout>
  );
}
