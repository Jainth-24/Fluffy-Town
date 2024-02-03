import { GetStaticProps } from 'next';
import { Grid } from '@site/components/Grid';
import { ProductCard } from '@site/components/ProductCard';
import { PageHeader, Section } from '@site/components/Text';
import { getAllProducts } from '@site/lib/shopify';
import LoadMoreProducts from './components/LoadMoreProducts'; // Update the path as needed
import { PAGE_BY } from '@site/lib/const';
import { StoreLayout } from '@site/layouts/StoreLayout';

type ProductsPageProps = {
  products: Array<any>;
  pageInfo: any; // Adjust the type based on your actual product type
};

const ProductsPage: React.FC<ProductsPageProps> = ({ products, pageInfo }) => {
  return (
    <StoreLayout>
      <PageHeader heading="Explore Our Products" variant="allCollections" className='text-4xl'/>
      <Section>
        <Grid>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        {pageInfo.hasNextPage && <LoadMoreProducts startCursor={pageInfo.endCursor} />}
      </Section>
    </StoreLayout>
  );
};

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  const data = await getAllProducts({
    variables: {
      first: PAGE_BY,
    },
  });

  const products = data.body.data.products.nodes || [];
  const pageInfo = data.body.data.products.pageInfo || [];

  return {
    props: {
      products,
      pageInfo,
    },
  };
};

export default ProductsPage;
