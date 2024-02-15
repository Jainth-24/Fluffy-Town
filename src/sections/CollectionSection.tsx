import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

interface Collection {
  nodes: any;
  pageInfo: Object;
}

const CollectionSection = () => {
  const router = useRouter();

  const mockData = {
    nodes: [
      {
        id: 1,
        handle: 'mens',
        title: 'Mens',
        image: { url: 'https://cdn.shopify.com/s/files/1/0759/8342/1732/files/mens-card-image.jpg?v=1707741170' },
      },
      {
        id: 2,
        handle: 'women',
        title: 'Women',
        image: { url: 'https://cdn.shopify.com/s/files/1/0759/8342/1732/files/womens-card-image.jpg' },
      },
      {
        id: 3,
        handle: 'kids',
        title: 'Kids',
        image: { url: 'https://cdn.shopify.com/s/files/1/0759/8342/1732/files/kids-card-image.jpg' },
      },
    ],
  };

  return (
    <div className="container mx-auto my-16">
      <h2 className="text-lead text-xl font-bold bg-yellow-200 p-3 text-center uppercase">Categories</h2>
      <div className="-mx-4 flex flex-wrap">
        {mockData?.nodes?.map((item: any) => (
          <div
            key={item.id}
            className="w-full cursor-pointer p-4 md:w-1/3"
            onClick={() => router.push(`categories/${item.handle}`)}
          >
            <div className="relative h-96 overflow-hidden rounded-md bg-gray-200 transform transition-transform hover:scale-105">
              <Image
                src={item.image?.url}
                alt={item.title}
                width={1000}
                height={1000}
                className='h-full'
              />
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
