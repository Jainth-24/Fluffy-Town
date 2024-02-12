import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../hooks/useLanguage';
import { benefitContent } from '../../mock/benefits';

const Benefits = () => {
  const { t } = useLanguage();
  return (
    <div className="mx-auto my-12 grid grid-cols-12 gap-4 pt-4 xl:max-w-[2100px]">
      {benefitContent.map((benefitItem) => {
        return (
          <div className="col-span-6 flex flex-col items-center lg:col-span-3 " key={benefitItem.title}>
            <Image height={58} width={58} src={benefitItem.imgSrc} alt={benefitItem.title} className="bg-yellow-200 p-2 rounded-full" />
            <p className="py-2 text-center text-sm font-semibold text-palette-base/90 md:text-base">{t[`${benefitItem.title}`]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Benefits;
