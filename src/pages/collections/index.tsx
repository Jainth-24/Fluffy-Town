import CollectionCard from '@site/components/CollectionCard';
import { Grid } from '@site/components/Grid';
import { PageHeader, Section } from '@site/components/Text';
import { PAGE_BY } from '@site/lib/const';
import { getAllCollections } from '@site/lib/shopify';
import LoadMoreCollections from './components/LoadMoreCollections';

export default async function Collections() {
	const data = await getAllCollections({
		variables: {
			first: PAGE_BY,
		},
	});

	return (
		<>
			<PageHeader heading="Collections" />
			<Section>
				<Grid items={data.body.data.collections.nodes.length === 3 ? 3 : 2}>
					{data.body.data.collections.nodes.map(collection => (
						<CollectionCard collection={collection} key={collection.id} />
					))}
				</Grid>
				{data.body.data.collections.pageInfo.hasNextPage && (
					<LoadMoreCollections
						startCursor={data.body.data.collections.pageInfo.endCursor}
					/>
				)}
			</Section>
		</>
	);
}
