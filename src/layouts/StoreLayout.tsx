import { ReactNode, useEffect, useState } from '@site/utilities/deps';
import { useRouter } from 'next/router';
import { getLayoutData } from '@site/lib/shopify';
import Header from '@site/sections/Navbar';
import FooterSection from '@site/sections/Footer';

interface Props {
  children: ReactNode;
}

export function StoreLayout(props: Props) {
  const [data, setData] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const layoutData = await getLayoutData();
      setData(layoutData);
    };

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  // Define an array of paths where you want to apply the background image
  const bgPaths = ['/account/login', '/account/register', '/account/recover'];

  // Check if the current route pathname is in the array of paths
  const isBackgroundNeeded = bgPaths.includes(router.pathname);

  return (
    <>
      <Header menu={data.body.data.headerMenu} shop={data.body.data.shop} />
      <main
        className={`mx-auto ${isBackgroundNeeded ? '' : 'max-w-7xl '}p-6 lg:px-8`}
        style={isBackgroundNeeded ? { backgroundImage: "url('/AuthBg.jpg')", backgroundSize: 'cover' } : {}}
      >
        {props.children}
      </main>
      <FooterSection menu={data.body.data.footerMenu} shop={data.body.data.shop} />
    </>
  );
}
