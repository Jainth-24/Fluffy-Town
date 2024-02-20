import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPage } from '@site/lib/shopify';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { Spinner } from 'flowbite-react';

const About = () => {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const slug = 'about-us';
    const fetchData = async () => {
      try {
        const data = await getPage(slug);
        setPageData(data);
      } catch (error) {
        console.error('Error fetching page data:', error);
        // Handle error appropriately
      }
    };
    if (slug) {
      fetchData();
    }
  }, []);

  const page = pageData?.page?.pageByHandle;
  return (
    <div>
      {page ? (
        <StoreLayout>
          <h1 className="mb-10 text-center text-3xl font-medium">Welcome to Fluffy Town - Where Style Meets Comfort</h1>
          <div dangerouslySetInnerHTML={{ __html: page.body }} />
        </StoreLayout>
      ) : (
        <Spinner color="warning" aria-label="Warning spinner example" size="lg"/>
      )}
    </div>
  );
};

export default About;
