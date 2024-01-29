import { ReactNode, useEffect, useState } from '@site/utilities/deps';
import { HeaderSection } from '@site/sections/HeaderSection';
import { getLayoutData } from '@site/lib/shopify';

interface Props {
  children: ReactNode;
}

export function StoreLayout(props: Props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const layoutData = await getLayoutData();
      setData(layoutData);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  if (!data) {
    // You may want to render a loading state or handle the case where data is not yet available
    return null;
  }
  console.log({ data });
  return (
    <>
      <HeaderSection menu={data.body.data.headerMenu} title={data.body.data.shop.name} />
      <main className="mx-auto max-w-7xl p-6 lg:px-8 ">{props.children}</main>
    </>
  );
}
