import CollectionCard from '@site/components/CollectionCard';
import { Grid } from '@site/components/Grid';
import { PageHeader, Section } from '@site/components/Text';
import { PAGE_BY } from '@site/lib/const';
import { getAllCollections } from '@site/lib/shopify';
import LoadMoreCollections from './components/LoadMoreCollections';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { Collection } from '@site/lib/shopify/types';

const Collections = ({ collections }:any) => (
   
  <StoreLayout>
    <PageHeader heading="Explore Our Collections" variant="allCollections" className="text-lead text-xl font-bold bg-yellow-200 p-3 text-center uppercase"/>
    <Section>
      <Grid items={collections.nodes.length === 3 ? 3 : 2}>
        {collections.nodes.map((collection: Collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </Grid>
      {/* Adjust the props accordingly based on your LoadMoreCollections component */}
      {collections.pageInfo.hasNextPage && (
        <LoadMoreCollections startCursor={collections.pageInfo.endCursor} />
      )}
    </Section>
  </StoreLayout>
);

export default Collections;

export async function getServerSideProps() {
  const data = await getAllCollections({
    variables: {
      first: PAGE_BY,
      metafieldIdentifiers: [
        { namespace: 'custom', key: 'hero_Image' },
        { namespace: 'custom', key: 'category' },
      ],
    },
  });


  return {
    props: {
      collections: data.body.data.collections,
    },
  };
}
