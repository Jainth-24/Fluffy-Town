import { FeaturedSection } from '@site/components/FeaturedSection';
import { Section, Text } from '@site/components/Text';
import { Product, Collection } from '@site/lib/shopify/types';

interface INoSearchResults {
	featuredProducts: Product[];
	featuredCollections: Collection[];
	noResult: boolean;
}
const NoSearchResults = ({
	featuredProducts,
	featuredCollections,
	noResult,
}: INoSearchResults) => {
	return (
		<>
			{noResult && (
				<Section padding="x">
					<Text className="opacity-50">
						No results, try a different search.
					</Text>
				</Section>
			)}

			<FeaturedSection
				featuredCollections={featuredCollections}
				featuredProducts={featuredProducts}
			/>
		</>
	);
};

export default NoSearchResults;
