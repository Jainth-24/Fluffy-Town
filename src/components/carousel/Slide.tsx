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

  console.log({metafields})
  return (
    <Link legacyBehavior href={`/collections/${handle}`} >
        {metafields[0]?.reference.image && (
          <Image
            src={metafields[0].reference.image.originalSrc}
            alt="Hero Banner"
            width={1200}
            height={370}
            
          />
        )}
    </Link>
  );
};

export default Slide;
