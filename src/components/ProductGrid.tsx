// Import necessary modules and components
import { Product } from '@site/lib/shopify/types';
import { Grid } from './Grid';
import { ProductCard } from './ProductCard';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { handleCollectionProductsSearchParams } from '@site/lib/handleCollectionProductsSearchParams';
import { Link } from './Link';
import { useSearchParams } from 'next/navigation';

export default function ProductGrid({ handle }: { handle: string }) {
  const router = useRouter();
  const [cursor, setCursor] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const { ref: nextLinkRef, inView } = useInView();
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      const { sortKey, reverse, filters } = handleCollectionProductsSearchParams(Object.fromEntries(searchParams));
      const apiSearchParams = new URLSearchParams();
      if (filters) {
        apiSearchParams.set('filters', JSON.stringify(filters));
      }
      if (sortKey) {
        apiSearchParams.set('sort', sortKey);
      }
      if (reverse) {
        apiSearchParams.set('reverse', reverse.toString());
      }
      apiSearchParams.set('handle', handle);
      if (cursor) apiSearchParams.set('cursor', cursor);
      setIsLoading(true);
      fetch(`/api/collectionProducts?${apiSearchParams.toString()}`).then((res) => {
        res.json().then((data) => {
          setProducts((prev) => [...prev, ...data.products]);
          setHasNextPage(data.pageInfo.hasNextPage);
          setCursor(data.pageInfo.endCursor);
          setIsLoading(false);
        });
      });
    }
  }, [inView, hasNextPage, isLoading, searchParams, handle]);
  useEffect(() => {
    setProducts([]);
    setHasNextPage(false);
    setCursor(undefined);
    const { sortKey, reverse, filters } = handleCollectionProductsSearchParams(Object.fromEntries(searchParams));
    const apiSearchParams = new URLSearchParams();
    if (filters) {
      apiSearchParams.set('filters', JSON.stringify(filters));
    }
    if (sortKey) {
      apiSearchParams.set('sort', sortKey);
    }
    if (reverse) {
      apiSearchParams.set('reverse', reverse.toString());
    }
    apiSearchParams.set('handle', handle);
    setIsLoading(true);
    fetch(`/api/collectionProducts?${apiSearchParams.toString()}`).then((res) => {
      res.json().then((data) => {
        setProducts((prev) => [...prev, ...data.products]);
        setHasNextPage(data.pageInfo.hasNextPage);
        setCursor(data.pageInfo.endCursor);
        setIsLoading(false);
      });
    });
  }, [handle, searchParams]);

  const haveProducts = products.length > 0;

  if (!haveProducts && !isLoading) {
    return (
      <>
        <p>No products found on this collection</p>
        <Link href="/products">
          <p className="underline">Browse catalog</p>
        </Link>
      </>
    );
  }

  return (
    <>
      <Grid layout="products" handle={handle}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <div className="mt-6 flex items-center justify-center" ref={nextLinkRef}>
        {isLoading && (
          <Button variant="secondary" width="full">
            Loading
          </Button>
        )}
      </div>
    </>
  );
}
