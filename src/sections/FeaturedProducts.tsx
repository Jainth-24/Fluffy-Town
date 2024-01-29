import { getFeaturedProducts } from '@site/lib/shopify';
import React, { useEffect, useState } from 'react';

const FeaturedProducts = () => {
  const [featuredCollections, setFeaturedCollections] = useState<any>([]);

  useEffect(() => {
    const fetchFeaturedCollections = async () => {
      try {
        const data = await getFeaturedProducts();
        setFeaturedCollections(data.body.data.products.nodes);
      } catch (error) {
        console.error('Error fetching featured collections:', error);
      }
    };

    fetchFeaturedCollections();
  }, []);

  console.log({featuredCollections})
  return (
    <div className="container mx-auto my-8">
      <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
      <div className="-mx-4 flex flex-wrap">
        {featuredCollections.map((item:any) => (
          <div key={item?.id} className="w-full p-4 md:w-1/3">
            <div className="relative h-96 overflow-hidden rounded-md bg-gray-200">
              <img
                src={item?.variants?.nodes[0].image?.url}
                alt={item.title}
                className="h-full w-full transform object-cover transition-transform hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 p-4 text-white">
                <h3 className="text-center text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
