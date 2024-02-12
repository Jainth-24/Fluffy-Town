import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { getCustomer } from '@site/lib/shopify';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAppStore from '@site/store/app-store';
import { Drawer } from '@site/components/Drawer';
import { Cart } from '@site/components/Cart';
import CartCount from './CartCount';
import { usePathname } from 'next/navigation';
import { Input } from '@site/components/Input';
import { IconSearch } from '@site/components/Icon';
import { useSearchParam } from 'react-use';

export default function Header(props: any) {
  const { shop, menu } = props;
  const router = useRouter();
  const token = Cookies.get('customerAccessToken') as string;
  const [customerData, setCustomerData] = useState<any>(null);
  const signOut = () => {
    Cookies.remove('customerAccessToken');
    router.push('/account/login');
  };
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Fetch customer data if there is a valid access token in the cookie
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (token && !customerData) {
          const data = await getCustomer(token);
          setCustomerData(data);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [token, customerData]);

  const searchTerm = useSearchParam('q');
  return (
    <Navbar className="border-b-8 border-b-yellow-200 sticky top-0 z-50 bg-white">
      <CartDrawer />
      <NavbarBrand href={shop.primaryDomain.url}>
        <Image
          width={50}
          height={100}
          src={shop.brand.logo.image.url}
          className="mr-3 max-md:h-10 sm:h-9 lg:h-12"
          alt="Profile Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{shop.name}</span>
      </NavbarBrand>
      <div className="mr-2 flex md:order-2">
        <NavbarToggle className="mx-2" />
        <form method="get" action={'/search'} className="flex items-center gap-2 max-md:hidden">
          <Input
            defaultValue={searchTerm}
            className={isHome ? 'focus:border-contrast/20 dark:focus:border-primary/20' : 'focus:border-primary/20'}
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button type="submit" className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5">
            <IconSearch />
          </button>
        </form>
        <CartCount isHome={isHome} />
        {customerData ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://cdn.icon-icons.com/icons2/2622/PNG/512/gui_user_settings_icon_158346.png"
                  rounded
                  size="sm"
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">
                  {customerData.firstName} {customerData.lastName}
                </span>
                <span className="block truncate text-sm font-medium">{customerData.email}</span>
              </DropdownHeader>
              <DropdownItem href="/account">Dashboard</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => signOut()}>Sign out</DropdownItem>
            </Dropdown>
          </>
        ) : (
          <Button gradientMonochrome="success" href="/account">
            Login
          </Button>
        )}
        <form method="get" action="/search" className="flex items-center gap-2 sm:hidden ml-5">
          <input
            className="p-2 border-b border-gray-300 rounded-md w-28 placeholder:opacity-20"
            type="search"
            placeholder="Search"
            name="q"
          />
          <button type="submit" className="w-8 h-8 border-gray-300 focus:outline-none focus:ring">
            <IconSearch />
          </button>
        </form>
      </div>
      <NavbarCollapse>
        {menu.items.map((item: any) =>
          !item.items[0] ? (
            <NavbarLink key={item.title} href={item.url}>
              {item.title}
            </NavbarLink>
          ) : (
            <NavbarLink key={item.id}>
              <Dropdown label={item.title} inline>
                {item.items.map((subitem: any, index: number) => (
                  <React.Fragment key={subitem.id}>
                    <Dropdown.Item href={subitem.url} className=' w-48 text-center'>{subitem.title}</Dropdown.Item>
                    {index !== item.items.length - 1 && <Dropdown.Divider />}{' '}
                  </React.Fragment>
                ))}
              </Dropdown>
            </NavbarLink>
          )
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
function CartDrawer() {
  const openCartDrawer = useAppStore((state) => state.openCartDrawer);
  return (
    <Drawer
      open={openCartDrawer}
      onClose={() => useAppStore.setState({ openCartDrawer: false })}
      heading="Cart"
      openFrom="right"
    >
      <div className="grid ">
        <Cart layout="drawer" />
      </div>
    </Drawer>
  );
}
