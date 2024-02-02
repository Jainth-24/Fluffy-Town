import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductGallery from '@site/components/ProductGallery';
import { ProductSwimlane } from '@site/components/ProductSwimlane';
import { Heading, Section, Text } from '@site/components/Text';
import ProductDetail from '../components/ProductDetails';
import { getExcerpt } from '@site/lib/utils';
import { truncate } from '@site/lib/truncate';
import { getProduct, getProductRecommendations } from '@site/lib/shopify';
import ProductForm from './components/ProductForm';
import { Product, ProductVariant, ShopType } from '@site/lib/shopify/types';
import { StoreLayout } from '@site/layouts/StoreLayout';

interface ProductPageProps {
  product: Product & { selectedVariant: ProductVariant };
  shop: ShopType;
  relatedProducts: Product[];
  searchParams: any;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, shop, relatedProducts, searchParams }) => {
  const { media, title, vendor, descriptionHtml, id } = product;
  const { shippingPolicy, refundPolicy } = shop;

  const selectedVariant = product.selectedVariant ?? product.variants.nodes[0];
  const search = new URLSearchParams(searchParams);
  const url = `/products/${product.handle}`;
  const description = truncate(product?.seo?.description ?? product?.description ?? '');
  const STORE_DOMAIN = `${process.env.PUBLIC_STORE_DOMAIN!}`;
  const variants = product.variants.nodes;
  const offers: any[] = (variants || []).map((variant: any) => {
    for (const option of variant.selectedOptions) {
      search.set(option.name, option.value);
    }
    const availability = variant.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

    return {
      '@type': 'Offer',
      availability,
      price: parseFloat(variant.price.amount),
      priceCurrency: variant.price.currencyCode,
      sku: variant?.sku ?? '',
      url,
    };
  });
  const seo = {
    openGraph: {
      title: product?.seo?.title ?? product?.title,
      description,
      type: 'website',
      url,
      image: selectedVariant?.image,
    },
    title: product?.seo?.title ?? product?.title,
    description,
    media: selectedVariant?.image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Products',
            item: `${STORE_DOMAIN}/products`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: product.title,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        brand: {
          '@type': 'Brand',
          name: product.vendor,
        },
        description,
        image: [selectedVariant?.image?.url ?? ''],
        name: product.title,
        offers,
        sku: selectedVariant?.sku ?? '',
        url,
      },
    ],
  };

  return (
    <StoreLayout>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.openGraph?.title && <meta property="og:title" content={seo.openGraph.title} />}
        {seo.openGraph?.description && <meta property="og:description" content={seo.openGraph.description} />}
        {seo.openGraph?.type && <meta property="og:type" content={seo.openGraph.type} />}
        {seo.openGraph?.url && <meta property="og:url" content={seo.openGraph.url} />}
        {seo.openGraph?.image && <meta property="og:image" content={seo.openGraph?.image.url} />}
        <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
      </Head>
      <Section className="px-0 md:px-8 lg:px-12">
        <div className="grid items-start md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-20">
          <ProductGallery media={media.nodes} className="w-full lg:col-span-2" />
          <div className="md:-mb-nav md:top-nav md:-translate-y-nav md:pt-nav hiddenScroll sticky md:h-screen md:overflow-y-scroll">
            <section className="flex w-full max-w-xl flex-col gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
              <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal">
                  {title}
                </Heading>
                {vendor && <Text className={'font-medium opacity-50'}>{vendor}</Text>}
              </div>
              {product && <ProductForm product={product} />}
              <div className="grid gap-4 py-4">
                {descriptionHtml && <ProductDetail title="Product Details" content={descriptionHtml} />}
                {shippingPolicy?.body && (
                  <ProductDetail
                    title="Shipping"
                    content={getExcerpt(shippingPolicy.body)}
                    learnMore={`/policies/${shippingPolicy.handle}`}
                  />
                )}
                {refundPolicy?.body && (
                  <ProductDetail
                    title="Returns"
                    content={getExcerpt(refundPolicy.body)}
                    learnMore={`/policies/${refundPolicy.handle}`}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </Section>
      {relatedProducts && <ProductSwimlane title="Related Products" products={relatedProducts} />}
    </StoreLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const { productHandle } = params!;
  const searchParams = query as Record<string, string>;

  const selectedOptions: Record<string, string>[] = [];
  new URLSearchParams(searchParams)?.forEach((value, name) => {
    selectedOptions.push({ name, value });
  });

  const { shop, product } = await getProduct(productHandle as string, selectedOptions);
  const relatedProducts = await getProductRecommendations(product.id);

  return {
    props: {
      product,
      shop,
      relatedProducts,
      searchParams,
    },
  };
};

export default ProductPage;
