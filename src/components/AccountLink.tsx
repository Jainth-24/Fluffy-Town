import { useState } from 'react';
import { IconAccount, IconLogin } from './Icon';
import { Link } from './Link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function SignOutSection() {
  const router = useRouter();
  const handleSignOut = () => {
    Cookies.set('customerAccessToken', '');
    router.replace('/account/login');
  };

  return (
    <div className="w-full p-3">
      <Link href="/account" className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-200">
        My Account
      </Link>
      <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

function AccountLink({ className, isUser }: { className?: string; isUser: boolean }) {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    if (!isUser) {
      // If isUser is true, navigate to /account
      router.push('/account');
    } else {
      // If isUser is false, toggle the dropdown
      setDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="relative inline-block">
      <div className={className} onClick={handleDropdownToggle}>
        {isUser ? <IconAccount /> : <IconLogin />}
      </div>

      {isUser && isDropdownOpen && (
        <div className="absolute left-[-70px] mt-2 w-40 overflow-hidden rounded-md bg-white shadow-md">
          <SignOutSection />
        </div>
      )}
    </div>
  );
}

export default AccountLink;
