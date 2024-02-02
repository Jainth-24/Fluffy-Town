'use client';
import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { NextLink } from '@site/utilities/deps';
import Image from 'next/image';
import Logo from '../../public/logo.png';

// Import statements...

const profileMenuItems = [
  {
    label: 'My Profile',
    icon: UserCircleIcon,
  },
  {
    label: 'Inbox',
    icon: InboxArrowDownIcon,
  },
  {
    label: 'Help',
    icon: LifebuoyIcon,
  },
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

function ProfileMenu(props: any) {
  const { name } = props;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const token = Cookies.get('customerAccessToken') as string;
  const router = useRouter();

  return (
    <>
      {token ? (
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className=" p-2"
                src="https://cdn-icons-png.flaticon.com/512/5509/5509636.png"
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`size-4 transition-transform${isMenuOpen ? ' rotate-180' : ''}`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-2">
            <Typography as="span" variant="small" className="p-2 text-center font-normal">
              Hello, {name}
            </Typography>
            <hr className="my-1 border-gray-300" />
            {profileMenuItems.map(({ label, icon }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded ${
                    isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-5 w-5 ${isLastItem ? 'text-red-500' : ''}`,
                    strokeWidth: 2,
                  })}
                  <Typography as="span" variant="small" className="font-normal" color={isLastItem ? 'red' : 'inherit'}>
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      ) : (
        <Button size="sm" variant="text" onClick={() => router.push('/account')}>
          <span>Log In</span>
        </Button>
      )}
    </>
  );
}

function NavListMenu(props: any) {
  const { name, dropDownList } = props;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = dropDownList.map((item: any) => (
    <a href={item.url} key={item.id}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {item.title}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-3 font-medium text-blue-gray-900 lg:flex lg:rounded">
              {name}{' '}
              <ChevronDownIcon
                strokeWidth={2}
                className={`size-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[20rem] overflow-visible lg:grid">
          <ul className="col-span-4 flex w-full flex-col gap-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-3 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="size-5 text-blue-gray-500" /> Pages{' '}
      </MenuItem>
      <ul className="flex w-full flex-col gap-2 lg:hidden">{renderItems}</ul>
    </React.Fragment>
  );
}

function NavList(props: any) {
  const { menu } = props;
  console.log({ menu });
  return (
    <ul className="flex flex-col gap-2 lg:my-0 lg:flex-row lg:items-center ">
      {menu.items.map((item: any) =>
        item.items[0] ? (
          <NavListMenu key={item.id} name={item.title} dropDownList={item.items} />
        ) : (
          <Typography
            key={item.id}
            as="a"
            href={item.url}
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-3 lg:rounded">
              <span className="text-gray-900"> {item.title}</span>
            </MenuItem>
          </Typography>
        )
      )}
    </ul>
  );
}

export function ComplexNavbar(props: any) {
  const { menu, title } = props;
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setIsNavOpen(false));
  }, []);

  return (
    <Navbar fullWidth className="mx-auto w-full border-b-8 border-yellow-200 p-4 lg:pl-6">
      <div className="relative mx-10 flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" variant="h5" className="flex cursor-pointer items-center gap-3 font-medium">
          <NextLink href="/">
            <span className="sr-only">Fluffy Town</span>
            <Image src={Logo} height={50} width={42} alt={''} className="object-cover" />
          </NextLink>
          Fluffy Town
        </Typography>
        <div className="mx-auto hidden lg:block">
          <NavList menu={menu} />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="size-6" />
        </IconButton>
        <ProfileMenu name={title} />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList menu={menu} />
      </MobileNav>
    </Navbar>
  );
}
