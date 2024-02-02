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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Header(props: any) {
  const { shop, menu } = props;
  const router = useRouter();
  const token = Cookies.get('customerAccessToken') as string;
  const [customerData, setCustomerData] = useState<any>(null);
  const signOut = () => {
    Cookies.remove('customerAccessToken');
    router.push('/account/login');
  };

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

  console.log(router.pathname);
  return (
    <Navbar className="border-b-8 border-b-yellow-200">
      <NavbarBrand href={shop.primaryDomain.url} className="ml-5">
        <Image
          width={50}
          height={100}
          src={shop.brand.logo.image.url}
          className="mr-3 max-md:h-10 sm:h-9 lg:h-12"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{shop.name}</span>
      </NavbarBrand>
      <div className="mr-5 flex md:order-2">
        {customerData ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmvQC3LHKi9a9CSMiGjh5V92IMXHI_t8wpYa7mEW4ADw&s"
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">
                  {customerData.firstName} {customerData.lastName}
                </span>
                <span className="block truncate text-sm font-medium">{customerData.email}</span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => signOut()}>Sign out</DropdownItem>
            </Dropdown>
          </>
        ) : (
          <Button gradientMonochrome="success" href='/account'>Login</Button>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {menu.items.map((item:any) =>
          !item.items[0] ? (
            <NavbarLink key={item.title} href={item.url} >
              {item.title}
            </NavbarLink>
          ) : (
            <NavbarLink key={item.id}>
              <Dropdown label={item.title} inline>
                {item.items.map((subitem:any) => (
                  <Dropdown.Item key={subitem.id} href={subitem.url}>{subitem.title}</Dropdown.Item>
                ))}
              </Dropdown>
            </NavbarLink>
          )
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
