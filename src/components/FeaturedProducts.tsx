// pages/featured-products.tsx

import { GetStaticProps, NextPage } from 'next';
import { Product } from '@site/lib/shopify/types';
import { Heading } from '../components/Text';
import { ProductCard } from '../components/ProductCard';
import { Skeleton } from '../components/Skeleton';

const FeaturedProducts: NextPage<any & { products: Product[] }> = ({
  count = 4,
  heading = 'Shop Best Sellers',
  layout = 'drawer',
  products,
}) => {
  if (!products) {
    return (
      <>
        {[...new Array(count)].map((_, i) => (
          <div key={`skeleton-${i}`} className="grid gap-2">
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Heading format size="copy" className="t-4">
        {heading}
      </Heading>
      <div className={`grid grid-cols-2 gap-x-6 gap-y-8 ${layout === 'page' ? 'md:grid-cols-4 sm:grid-col-4' : ''}`}>
        {products.map((product:any) => (
          <ProductCard product={product} key={product.id} quickAdd />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch data from your API endpoint
    const res = await fetch(`/api/products/cart`);
    const data = await res.json();

    return {
      props: {
        count: 4,
        heading: 'Shop Best Sellers',
        layout: 'drawer',
        products: data.products || [],
      },
      revalidate: 60, // Adjust revalidate as needed
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        count: 4,
        heading: 'Shop Best Sellers',
        layout: 'drawer',
        products: [],
      },
      revalidate: 60, // Adjust revalidate as needed
    };
  }
};

export default FeaturedProducts;
