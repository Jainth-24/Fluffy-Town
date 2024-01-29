import { Product } from '@site/lib/shopify/types';
import { ProductCard } from './ProductCard';
import { Section } from './Text';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}: {
  title?: string;
  products?: Product[];
  count?: number;
}) {
  return (
    <Section heading={title} padding="y" {...props}>
      <div className="swimlane hiddenScroll md:scroll-px-8 md:px-8 md:pb-8 lg:scroll-px-12 lg:px-12">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} className="w-80 snap-start" />
        ))}
      </div>
    </Section>
  );
}
