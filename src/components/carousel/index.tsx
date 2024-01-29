import React, { useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import Slide from './Slide';
import { getAllCollections, getHomepageSeo } from '@site/lib/shopify';
import { PAGE_BY } from '@site/lib/const';

interface Collection {
  nodes: Object;
  pageInfo: Object;
}

const Carousel: React.FC = () => {
  const [data, setData] = useState<Collection | null>(null);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const primaryHero = await getHomepageSeo();
        setHomeData(primaryHero);
        const result = await getAllCollections({
          variables: {
            first: PAGE_BY,
          },
        });
        setData(result.body.data.collections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const collectionData = data?.nodes;
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    appendDots: (dots: string) => (
      <div className="bg-transparent !pb-[40px]">
        <ul> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {collectionData?.map((slideContent: any) => (
          <Slide key={slideContent.ID} {...slideContent} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;