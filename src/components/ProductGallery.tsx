import cn from 'clsx';
import Image from 'next/image';

const ProductGallery = ({ media, className }: { media: any['node'][]; className?: string }) => {
  if (!media?.length) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ${className}`}>
      {media.map((med, i) => {
        const isFirst = i === 0;
        const isFourth = i === 3;
        const isFullWidth = i % 3 === 0;

        const data = {
          ...med,
          image: {
            ...med.image,
            altText: med.alt || 'Product image',
          },
        };

        const colSpanClass = isFullWidth ? 'md:col-span-2' : 'md:col-span-1';
        const aspectRatioClass = isFirst || isFourth ? '' : 'md:aspect-[4/5]';
        const containerStyle = `${colSpanClass} ${aspectRatioClass} aspect-square overflow-hidden bg-white dark:bg-contrast/10 rounded-md`;

        return (
          <div className={containerStyle} key={med.id || med.image.id}>
            {med.image && (
              <Image
                alt={med.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                src={data.image.url!}
                width={data.image.width}
                height={data.image.height}
                sizes={isFirst || isFourth ? '(min-width: 48em) 60vw, 90vw' : '(min-width: 48em) 30vw, 90vw'}
                className={cn('object-cover w-full h-full transition-opacity duration-300', {
                  'aspect-[4/5]': !isFirst && !isFourth,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductGallery;
