// components/CollectionSection.js
import { PAGE_BY } from '@site/lib/const';
import { getAllCollections } from '@site/lib/shopify';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Collection {
  nodes: any;
  pageInfo: Object;
}

const CollectionSection = () => {
  const [data, setData] = useState<Collection | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCollections({
          variables: {
            first: 10,
          },
        });
        setData(result.body.data.collections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="mb-4 text-center text-2xl font-bold uppercase">Collections</h2>
      <div className="-mx-4 flex flex-wrap">
        {data?.nodes?.map((item: any) => (
          <div
            key={item.id}
            className="w-full cursor-pointer p-4 md:w-1/3"
            onClick={() => router.push(`collections/${item.handle}`)}
          >
            <div
              className="relative h-96 overflow-hidden rounded-md bg-gray-200"
              style={{ backgroundImage: `url(${item.image?.url})`, backgroundSize: 'cover' }}
            >
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-4 text-white">
                <h3 className="text-center text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionSection;
