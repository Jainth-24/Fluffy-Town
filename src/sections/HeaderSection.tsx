import { useState, NextLink, useRouter, clsx, useEffect } from '@site/utilities/deps';
import { Dialog, Popover } from '@headlessui/react';
import { useCart } from '@shopify/hydrogen-react';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import AccountLink from '@site/components/AccountLink';
import Cookies from 'js-cookie';

const mainMenuItems: { text: string; href: string }[] = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Products',
    href: '/products',
  },
];

export function HeaderSection(props: any) {
  const { menu, title } = props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { totalQuantity } = useCart();
  const [scrolled, setScrolled] = useState(false);

  function isMenuItemActive(href: string) {
    const { pathname } = router;
    return pathname === href;
  }
  const token = Cookies.get('customerAccessToken') as string;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? 'bg-white' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NextLink href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Fluffy Town</span>
            <Image src={Logo} height={50} width={42} alt={''} className="object-cover" />
          </NextLink>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {menu.items.map((item: any) => (
            <NextLink
              className={clsx(
                'text-sm font-semibold leading-6 text-gray-900',
                isMenuItemActive(item.url) && 'text-primary-600'
              )}
              key={item.id}
              href={item.url}
            >
              {item.title}
            </NextLink>
          ))}
        </Popover.Group>

        <div className="flex flex-1 justify-end gap-5">
          <AccountLink
            className="focus:ring-primary/5 relative flex size-6 items-center justify-center"
            isUser={Boolean(token)}
          />
          <NextLink href="/cart">
            <span className="sr-only">Cart</span>
            <span className="relative inline-block">
              <ShoppingCartIcon className="size-6"></ShoppingCartIcon>
              {!!totalQuantity && (
                <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
                  {totalQuantity}
                </span>
              )}
            </span>
          </NextLink>

          <button
            type="button"
            className="ml-5 inline-flex items-center justify-center rounded-md text-gray-700 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <span className="relative inline-block">
              <Bars3Icon className="-mt-1 size-6" aria-hidden="true" />
            </span>
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {mainMenuItems.map(({ text, href }) => (
                  <NextLink
                    className={clsx(
                      '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50',
                      isMenuItemActive(href) && 'text-primary-600'
                    )}
                    key={href}
                    href={href}
                  >
                    {text}
                  </NextLink>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
