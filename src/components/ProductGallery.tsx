import cn from 'clsx';
import { Carousel } from 'flowbite-react';
import Image from 'next/image';

const ProductGallery = ({ media, className }: { media: any['node'][]; className?: string }) => {
  console.log({ media });
  if (!media?.length) {
    return null;
  }

  return (
    <div className={` ${className}`}>
       <div className="h-[600px] ">
        <Carousel pauseOnHover slide={false}>
          {media.map((med, i) => (
            <Image
              key={i}
              src={med.image.url}
              width={med.image.width}
              height={med.image.height}
              alt={med.altText || `Product image number ${i + 1}`}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductGallery;
