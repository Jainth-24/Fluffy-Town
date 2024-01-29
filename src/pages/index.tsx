import Benefits from '@site/components/Benefits';
import { StoreLayout } from '@site/layouts/StoreLayout';
import CollectionSection from '@site/sections/CollectionSection';
import FeaturedProducts from '@site/sections/FeaturedProducts';
import { HeroSection } from '@site/sections/HeroSection';

export default function Page() {
  return (
    <StoreLayout>
      <HeroSection />
      <Benefits />
      <CollectionSection />
      <FeaturedProducts />
    </StoreLayout>
  );
}
