import { PAGE_BY } from '@site/lib/const';
import { flattenConnection } from '@site/lib/flattenConnection';
import { handleCollectionProductsSearchParams } from '@site/lib/handleCollectionProductsSearchParams';
import { getCollectionProducts } from '@site/lib/shopify';
import { truncate } from '@site/lib/truncate';
import { useRouter } from 'next/router';
import { Collection as CollectionType, Collection } from '@site/lib/shopify/types';
import { SortFilter } from '@site/components/SortFilter';
import Head from 'next/head';
import { PageHeader, Section, Text } from '@site/components/Text';
import ProductGrid from '@site/components/ProductGrid';
import { StoreLayout } from '@site/layouts/StoreLayout';

interface CollectionProps {
  slug: string;
  data: any;
  appliedFilters: any;
}
type VariantFilterParam = Record<string, string | boolean>;
type PriceFiltersQueryParam = Record<'price', { max?: number; min?: number }>;
type VariantOptionFiltersQueryParam = Record<'variantOption', { name: string; value: string }>;
export type FiltersQueryParams = Array<VariantFilterParam | PriceFiltersQueryParam | VariantOptionFiltersQueryParam>;

const Collection: React.FC<CollectionProps> = ({ slug, data, appliedFilters }) => {
  const router = useRouter();
  console.log({ data });
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const collection = data.body.data.collection;
  const collections = flattenConnection(data.body.data.collections);

  const seo = {
    title: collection?.seo?.title,
    description: truncate(collection?.seo?.description ?? collection?.description ?? ''),
    openGraph: {
      title: collection?.seo?.title,
      description: truncate(collection?.seo?.description ?? collection?.description ?? ''),
      type: 'website',
      url: `/collections/${collection.handle}`,
      images: collection?.image
        ? [
            {
              url: collection?.image?.url,
              width: collection?.image?.width,
              height: collection?.image?.height,
              alt: collection?.image?.altText,
            },
          ]
        : [],
    },
  };

  const itemListElement: CollectionType[] = collections.map((collection: CollectionType, index: number) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: `/collections/${collection.handle}`,
    };
  });

  const seoStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Collections',
    description: 'All collections',
    url: seo.openGraph?.url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement,
    },
  };

  return (
    <StoreLayout>
      <PageHeader heading={collection.title}>
        {collection?.description && (
          <div className="flex w-full items-baseline justify-between">
            <div>
              <Text format width="narrow" as="p" className="inline-block">
                {collection.description}
              </Text>
            </div>
          </div>
        )}
      </PageHeader>
      <Section>
        <SortFilter
          filters={collection.products.filters}
          appliedFilters={appliedFilters}
          collections={collections as Collection[]}
        >
          <ProductGrid key={collection.id} data-test="product-grid" handle={slug} />
        </SortFilter>
      </Section>
    </StoreLayout>
  );
};

export async function getServerSideProps({ params }: any): Promise<{ props: CollectionProps }> {
  const { slug } = params || { slug: null };

  const { sortKey, reverse, cursor, filters, appliedFilters } = handleCollectionProductsSearchParams(slug);

  const data = await getCollectionProducts({
    variables: {
      handle: slug,
      pageBy: PAGE_BY,
      filters,
      sortKey,
      cursor,
      reverse,
    },
  });

  return {
    props: { slug, data, appliedFilters },
  };
}

export default Collection;
