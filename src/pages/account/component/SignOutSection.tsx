import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function SignOutSection() {
  const router = useRouter();
  const signOut = () => {
    Cookies.set('customerAccessToken', '');
    router.replace('/account/login');
  };
  return (
    <form action={signOut} noValidate>
      <button type="submit" className="btn btn--secondary">
        Sign out
      </button>
    </form>
  );
}
