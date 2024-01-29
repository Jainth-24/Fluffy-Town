import FormButton from '@site/pages/account/component/FormButton';
import FormHeader from '@site/pages/account/component/FormHeader';
import { resetCustomersPassword } from '@site/lib/shopify';
import { getInputStyleClasses } from '@site/lib/utils';
import AuthLayout from '@site/pages/account/component/AuthLayout';
import { revalidatePath } from 'next/cache';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

let errorMessage: string | null = null;
let passwordError: string | null = null;
let passwordConfirmError: string | null = null;

export default function ResetPassword({ params }: { params: { id: string; resetToken: string } }) {
  const handleSubmit = async (data: FormData) => {
    const id = params.id;
    const resetToken = params.resetToken;

    const password = data.get('password') as string;
    const passwordConfirm = data.get('passwordConfirm') as string;

    if (
      !password ||
      !passwordConfirm ||
      typeof password !== 'string' ||
      typeof passwordConfirm !== 'string' ||
      password !== passwordConfirm
    ) {
      passwordConfirmError = 'The two passwords entered did not match.';
    } else {
      const res = await resetCustomersPassword({
        variables: {
          id: `gid://shopify/Customer/${id}`,
          input: {
            password,
            resetToken,
          },
        },
      });

      const customerAccessToken = res.body.data.customerReset.customerAccessToken;

      if (customerAccessToken) {
        const accessToken = customerAccessToken?.accessToken;
        Cookies.set('customerAccessToken', accessToken, {
          httpOnly: true,
          path: '/',
          expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
        });

        redirect('/account');
      }

      if (res.body.data.customerReset.customerUserErrors.length > 0) {
        res.body.data.customerReset.customerUserErrors.forEach((error: any) => {
          if (error.field) {
            if (error.field.includes('password')) {
              passwordError = error.message;
            } else if (error.field.includes('passwordConfirm')) {
              passwordConfirmError = error.message;
            }
          }

          if (error.code === 'TOKEN_INVALID') {
            errorMessage = error.message;
          }
        });
      }
    }
    revalidatePath('/account/reset');
  };

  return (
    <AuthLayout>
      <FormHeader title="Reset Password." />
      <p className="mt-4">Enter a new password for your account.</p>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      <form action={handleSubmit} noValidate className="my-4 space-y-3 pb-8 pt-6">
        <div>
          <input
            className={`mb-1 ${getInputStyleClasses(passwordError)}`}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            minLength={8}
            required
            autoFocus
          />
          {passwordError && <p className="text-xs text-red-500"> {passwordError} &nbsp;</p>}
        </div>

        <div>
          <input
            className={`mb-1 ${getInputStyleClasses(passwordConfirmError)}`}
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autoComplete="current-password"
            placeholder="Re-enter password"
            aria-label="Re-enter password"
            minLength={8}
            required
            autoFocus
          />
          {passwordConfirmError && <p className="text-xs text-red-500"> {passwordConfirmError} &nbsp;</p>}
        </div>
        <FormButton btnText={'Save'} />
      </form>
    </AuthLayout>
  );
}
