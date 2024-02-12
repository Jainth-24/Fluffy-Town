import React, { useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import Slide from './Slide';
import { getAllCollections, getHomepageSeo } from '@site/lib/shopify';
import { PAGE_BY } from '@site/lib/const';
import { Spinner } from 'flowbite-react';

interface Collection {
  nodes: Object;
  pageInfo: Object;
}

const Carousel: React.FC = () => {
  const [data, setData] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCollections({
          variables: {
            first: PAGE_BY,
            metafieldIdentifiers: [
              { namespace: 'custom', key: 'hero_Image' },
              { namespace: 'custom', key: 'category' },
            ],
          },
        });
        setData(result.body.data.collections);
        setLoading(false); // Set loading to false after data fetching is done
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchData();
  }, []);

  const collectionData = ((data?.nodes as any[]) || []).filter((slideContent) => slideContent.metafields[0] !== null);
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
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

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner className='text-center' color="warning" aria-label="Loading spinner" size={'lg'}/>
      </div>
    );
  }

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
