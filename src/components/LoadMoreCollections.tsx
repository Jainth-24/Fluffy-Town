'use client';
import { Button } from '@site/components/Button';
import CollectionCard from '@site/components/CollectionCard';
import { Grid } from '@site/components/Grid';
import { Collection } from '@site/lib/shopify/types';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  startCursor?: string | null;
}

function LoadMoreCollections({ startCursor }: Props) {
  const [cursor, setCursor] = useState<string | null | undefined>(startCursor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [collections, setCollections] = useState<Collection[]>([]);
  const { ref: nextLinkRef, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      setIsLoading(true);
      fetch(`/api/collections?cursor=${cursor}`).then((res) => {
        res.json().then((data) => {
          setCollections((prev) => [...prev, ...data.collections]);
          setHasNextPage(data.pageInfo.hasNextPage);
          setCursor(data.endCursor);
          setIsLoading(false);
        });
      });
    }
  }, [inView, hasNextPage, isLoading]);

  return (
    <>
      <Grid items={3}>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
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

export default LoadMoreCollections;
