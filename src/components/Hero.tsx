import clsx from 'clsx';
import { Link } from './Link';
import { Heading, Text } from './Text';
import { Image as ImageType, Metafield } from '@site/lib/shopify/types';
import Image from 'next/image';

export interface CollectionHero {
  byline: Metafield;
  cta: Metafield;
  handle: string;
  heading: Metafield;
  height?: 'full';
  spread: any;
  spreadSecondary: any;
  top?: boolean;
}

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({ byline, cta, handle, heading, height, spread, spreadSecondary, top }: CollectionHero) {
  return (
    <Link href={`/collections/${handle}`}>
      <section
        className={clsx(
          'relative flex w-full flex-col justify-end',
          top && '-mt-nav',
          height === 'full'
            ? 'h-screen'
            : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]'
        )}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 grid grow auto-cols-fr grid-flow-col content-stretch text-clip">
          {spread?.reference && (
            <div>
              <SpreadMedia
                sizes={spreadSecondary?.reference ? '(min-width: 48em) 50vw, 100vw' : '100vw'}
                data={spread.reference.image}
              />
            </div>
          )}
          {spreadSecondary?.reference && (
            <div className="hidden md:block">
              <SpreadMedia sizes="50vw" data={spreadSecondary.reference.image} />
            </div>
          )}
        </div>
        <div className="dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast flex flex-col items-baseline justify-between gap-4 bg-gradient-to-t px-6 py-8 sm:px-8 md:px-12">
          {heading?.value && (
            <Heading format as="h2" size="display" className="max-w-md">
              {heading.value}
            </Heading>
          )}
          {byline?.value && (
            <Text format width="narrow" as="p" size="lead">
              {byline.value}
            </Text>
          )}
          {cta?.value && <Text size="lead">{cta.value}</Text>}
        </div>
      </section>
    </Link>
  );
}

function SpreadMedia({ data, sizes }: { data: ImageType; sizes: string }) {
  return (
    <Image
      src={data.url}
      alt={data.altText}
      className="block size-full object-cover"
      sizes={sizes}
      width={100}
      height={100}
    />
  );
}
