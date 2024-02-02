import { Grid } from '@site/components/Grid';
import { ProductCard } from '@site/components/ProductCard';
import { PageHeader, Section } from '@site/components/Text';
import { getAllProducts } from '@site/lib/shopify';
import LoadMoreProducts from './components/LoadMoreProducts';
import { PAGE_BY } from '@site/lib/const';

export default async function ProductsPage() {
  const data = await getAllProducts({
    variables: {
      first: PAGE_BY,
    },
  });

  return (
    <>
      <PageHeader heading="All Products" variant="allCollections" />
      <Section>
        <Grid>
          {data.body.data.products.nodes.map((product, i) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        {data.body.data.products.pageInfo.hasNextPage && (
          <LoadMoreProducts startCursor={data.body.data.products.pageInfo.endCursor} />
        )}
      </Section>
    </>
  );
}
