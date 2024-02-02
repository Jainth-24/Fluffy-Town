import Link from 'next/link';

interface IFormFooter {
  page: 'login' | 'register' | 'recover';
}

export default function FormFooter({ page }: IFormFooter) {
  const data = {
    login: {
      linkText: 'Create an account',
      phrase: 'New to Fluffy Town?',
      href: '/account/register',
    },
    register: {
      linkText: 'Sign In',
      phrase: 'Already have an account?',
      href: '/account/login',
    },
    recover: {
      linkText: 'Login',
      phrase: 'Return to',
      href: '/account/login',
    },
  };

  return (
    <div className="mt-8 flex items-center justify-between gap-5 border-t border-gray-300">
      <p className="mt-6 align-baseline text-sm">
        {data[page]?.phrase}
        &nbsp;
        <Link className="inline underline text-blue-500" href={data[page]?.href}>
          {data[page]?.linkText}
        </Link>
      </p>
      {page === 'login' && (
        <Link className="mt-6 inline-block align-baseline text-sm" href="/account/recover">
          Forgot Password
        </Link>
      )}
    </div>
  );
}
