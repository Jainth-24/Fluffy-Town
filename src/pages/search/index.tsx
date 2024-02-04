'use client';
import { Input } from '@site/components/Input';
import { PageHeader, Heading } from '@site/components/Text';
import useLoadSearchData from '@site/hooks/useLoadSearchData';
import NoSearchResults from './components/NoSearchResults';
import SearchResult from './components/SearchResult';
import { Grid } from '@site/components/Grid';
import CardLoader from './components/CardLoader';
import { useRouter } from 'next/router';
import { StoreLayout } from '@site/layouts/StoreLayout';

export default function SearchPage() {
	const router = useRouter();
	const searchTerm = router.query.q ? router.query.q.toString() : '';
  
	const { products, pageInfo, featuredProducts, featuredCollections, loadingSearchedProducts } = useLoadSearchData();
  
	return (
	  <StoreLayout>
		{loadingSearchedProducts ? (
		  <div className="m-8">
			<Grid>
			  {[1, 2, 3, 4].map((res) => (
				<CardLoader key={res} />
			  ))}
			</Grid>
		  </div>
		) : (
		  <>
			{!searchTerm || products.length === 0 ? (
			  <NoSearchResults
				noResult={products.length === 0}
				featuredProducts={featuredProducts}
				featuredCollections={featuredCollections}
			  />
			) : (
			  <SearchResult products={products} pageInfo={pageInfo} />
			)}
		  </>
		)}
	  </StoreLayout>
	);
  }
