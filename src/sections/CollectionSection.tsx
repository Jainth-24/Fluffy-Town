// components/CollectionSection.js
import { PAGE_BY } from '@site/lib/const';
import { getAllCollections } from '@site/lib/shopify';
import React, { useEffect, useState } from 'react';

const dummyData = [
  {
    id: 1,
    title: 'Collection 1',
    imageUrl: 'https://placekitten.com/400/300', // Replace with your actual image URL
  },
  {
    id: 2,
    title: 'Collection 2',
    imageUrl: 'https://placekitten.com/401/300', // Replace with your actual image URL
  },
  {
    id: 3,
    title: 'Collection 3',
    imageUrl: 'https://placekitten.com/402/300', // Replace with your actual image URL
  },
  // Add more dummy data as needed
];
interface Collection {
  nodes: any;
  pageInfo: Object;
}

const CollectionSection = () => {

  const [data, setData] = useState<Collection | null>(null);

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
      <h2 className="mb-4 text-2xl font-bold text-center uppercase">Collections</h2>
      <div className="-mx-4 flex flex-wrap">
        {data?.nodes?.map((item:any) => (
          <div key={item.id} className="w-full p-4 md:w-1/3">
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
