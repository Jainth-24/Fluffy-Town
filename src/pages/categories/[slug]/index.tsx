import { Text } from '@site/components/Text';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { getAllCollections } from '@site/lib/shopify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';



const Category = () => {
  const router = useRouter(); // Get the router object
  const { slug } = router.query as { slug: string };
  console.log({ slug });
  
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCollections({
          variables: {
            first: 10,
            metafieldIdentifiers: [
              { namespace: 'custom', key: 'hero_Image' },
              { namespace: 'custom', key: 'category' },
            ],
          },
        });
        setData(result.body.data.collections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const selectedCategory = data?.nodes.filter(
    (item:any) => item.metafields[1].key === 'category' && item.metafields[1].value.toLowerCase() === slug.toLowerCase()
  );

  console.log({ data });
  console.log({ selectedCategory });

  return (
    <StoreLayout>
      <div className="mx-auto my-8">
        <h2 className="text-lead text-xl font-bold bg-yellow-200 p-3 text-center uppercase">{slug ? slug.toUpperCase() : ''}</h2>
        <div className=" flex flex-wrap">
          {selectedCategory?.length ? (
            selectedCategory.map((item: any) => (
              <Link
                key={item.id}
                className="w-full cursor-pointer p-5 md:w-1/3"
                href={`/collections/${item.handle}`}>
                <div
                  className="relative h-96 overflow-hidden rounded-md bg-gray-200"
                  style={{ backgroundImage: `url(${item.image?.url})`, backgroundSize: 'cover' }}
                >
                  <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-4 text-white">
                    <h3 className="text-center text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full h-24">
                <Text className='my-auto'>No items found</Text>
            </div>
          )}
        </div>
      </div>
    </StoreLayout>
  );
  
};

export default Category;
