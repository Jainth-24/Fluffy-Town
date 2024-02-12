import { getInputStyleClasses } from '@site/lib/utils';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';
import FormButton from '../../../components/FormButton';
import { revalidatePath } from 'next/cache';
import { recoverCustomersPassword } from '@site/lib/shopify';
import AuthLayout from '../../../components/AuthLayout';
import { useRouter } from 'next/router';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { Button } from 'flowbite-react';

let emailError: string | null = null;
let isSubmitted: boolean = false;
const headings = {
  submited: {
    title: 'Request Sent.',
    description:
      'If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.',
  },
  default: {
    title: 'Forgot Password.',
    description: 'Enter the email address associated with your account to receive a link to reset your password.',
  },
};

export default function RecoverPassword() {
  const router = useRouter();
  async function handleSubmit(data: FormData) {
    try {
      const response = await recoverCustomersPassword({
        variables: {
          email: data.get('email') as string,
        },
      });

      if (response.body.data.customerRecover.customerUserErrors.length > 0) {
        response.body.data.customerRecover.customerUserErrors.forEach((error: any) => {
          if (error.field?.includes('email')) {
            emailError = error.message;
          }
        });
      } else {
        isSubmitted = true;
      }
    } catch (error) {
      interface ERROR {
        message: string;
      }
      const err = error as { error: ERROR };
      emailError = err.error.message;
    }

    router.replace('/account/recover');
  }

  return (
    <StoreLayout>
      <AuthLayout>
        <div className="text-center">
          <FormHeader title={headings[isSubmitted ? 'submited' : 'default'].title} />
          <p className="mt-4">{headings[isSubmitted ? 'submited' : 'default'].description}</p>
          {!isSubmitted && (
            <form action={handleSubmit} noValidate className="my-4 space-y-3 pb-8 pt-6">
              <div>
                <input
                  className={`w-full rounded border px-4 py-2 ${getInputStyleClasses(emailError)}`}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  aria-label="Email address"
                  autoFocus
                />
                {emailError && <p className="mt-1 text-xs text-red-500">{emailError} &nbsp;</p>}
              </div>
              <FormButton btnText={'Request Reset Link'} />
              <FormFooter page="recover" />
            </form>
          )}
          {isSubmitted && (
            <div className="mt-8 justify-center flex">
              <Button
                gradientMonochrome="success"
                onClick={() => router.replace('/')} // Navigate to the home page
                className=""
              >
                Go to Home
              </Button>
            </div>
          )}
        </div>
      </AuthLayout>
    </StoreLayout>
  );
}
