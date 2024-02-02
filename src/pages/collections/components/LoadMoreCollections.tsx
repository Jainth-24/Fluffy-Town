import { Collection } from '@site/lib/shopify/types';
import { Button } from '@site/components/Button';
import CollectionCard from '@site/components/CollectionCard';
import { Grid } from '@site/components/Grid';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreCollectionsProps {
	startCursor?: string | null;
  }
  
  const LoadMoreCollections: React.FC<LoadMoreCollectionsProps> = ({ startCursor }) => {
	const [cursor, setCursor] = useState<string | null | undefined>(startCursor);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [localCollections, setLocalCollections] = useState<Collection[]>([]);
	const { ref: nextLinkRef, inView } = useInView();
  
	useEffect(() => {
		if (inView && !isLoading) {
		  setIsLoading(true);
		  fetch(`/api/collections?cursor=${cursor}`).then((res) => {
			res.json().then((data) => {
			  const newCollections = data?.collections;
			  if (Array.isArray(newCollections)) {
				setLocalCollections((prev) => [...prev, ...newCollections]);
			  }
			  setCursor(data?.endCursor);
			  setIsLoading(false);
			});
		  });
		}
	  }, []);
	  
  
	return (
	  <>
		<Grid items={3}>
		  {localCollections.map((collection) => (
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
  };
  
  export default LoadMoreCollections;