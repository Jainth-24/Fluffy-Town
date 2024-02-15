import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  ID?: number;
  title: string;
  description: string;
  image: { url: string };
  handle: string;
  metafields: any;
}

const Slide: React.FC<Props> = ({ handle, metafields }) => {
  return (
    <Link href={`/collections/${handle}`} >
        {metafields[0]?.reference.image && (
          <Image
            src={metafields[0].reference.image.originalSrc}
            alt="Hero Banner"
            width={1000}
            height={1000}
            className='max-md:h-56 h-full w-full'
          />
        )}
    </Link>
  );
};

export default Slide;
