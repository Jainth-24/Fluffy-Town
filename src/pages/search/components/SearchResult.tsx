import { Grid } from '@site/components/Grid';
import { ProductCard } from '@site/components/ProductCard';
import { Section } from '@site/components/Text';
import { PageInfo, Product } from '@site/lib/shopify/types';
import LoadMoreSearchProducts from './LoadMoreSearchProducts';

interface ISearchResult {
	products: Product[];
	pageInfo: PageInfo;
}
const SearchResult = ({ products, pageInfo }: ISearchResult) => {
	return (
		<Section>
			<Grid>
				{products?.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			{pageInfo?.hasNextPage && (
				<LoadMoreSearchProducts startCursor={pageInfo?.endCursor} />
			)}
		</Section>
	);
};

export default SearchResult;
