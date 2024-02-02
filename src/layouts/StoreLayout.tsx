import { ReactNode, useEffect, useState } from '@site/utilities/deps';
import { HeaderSection } from '@site/sections/HeaderSection';
import { getLayoutData } from '@site/lib/shopify';
import Header from '@site/sections/Navbar';
import FooterSection from '@site/sections/Footer';

interface Props {
  children: ReactNode;
}

export function StoreLayout(props: Props) {
  const [data, setData] = useState<any | null>(null);

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
  console.log({ data });
  return (
    <>
      <Header menu={data.body.data.headerMenu} shop={data.body.data.shop}/>
      <main className="mx-auto max-w-7xl p-6 lg:px-8">{props.children}</main>
      <FooterSection menu={data.body.data.footerMenu} shop={data.body.data.shop} />
    </>
  );
}
