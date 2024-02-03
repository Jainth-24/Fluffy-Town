import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  ID?: number;
  title: string;
  description: string;
  image: { url: string };
  handle: string;
  metafield: { reference: { image: { originalSrc: string } } };
}

const Slide: React.FC<Props> = ({ handle, metafield }) => {
  console.log({ metafield });

  return (
    <Link legacyBehavior href={`/${handle}`}>
        {metafield?.reference.image && (
          <Image
            src={metafield.reference.image.originalSrc}
            alt=""
            width={1200}
            height={500}
            layout="responsive"
          />
        )}
    </Link>
  );
};

export default Slide;
