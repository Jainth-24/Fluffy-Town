import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../hooks/useLanguage';

interface Props {
  ID?: number;
  title: string;
  description: string;
  image: { url: string };
  handle: string;
}
const Slide: React.FC<Props> = ({ title, description, image, handle }) => {
  return (
    <>
      <div
        className={`relative h-[50vh] w-[100%] bg-cover bg-center bg-no-repeat md:h-[70vh]`}
        style={{ backgroundImage: `url('${image?.url}')` }}
      >
        <Link legacyBehavior href={`/${handle}`}>
          <a className="block">
            <div
              className={`absolute bottom-0 rounded-md bg-palette-card/60 p-3 shadow-lg backdrop-blur-[12px] md:bottom-auto md:right-[25%] md:top-[45%] md:mt-auto md:w-[60%] md:overflow-hidden md:p-8 lg:w-[50%] lg:p-10 ltr:text-left rtl:text-right`}
            >
              <h3 className="text-lg font-medium md:text-2xl lg:text-3xl">{title}</h3>
              <p className="mt-2 text-[13px] md:mt-4 md:text-lg lg:mt-8">{description}</p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Slide;
