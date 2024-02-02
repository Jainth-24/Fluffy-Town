import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Section, PageHeader } from '@site/components/Text';
import { GetServerSideProps } from 'next';
import { getPolicyContent } from '@site/lib/shopify';
import { Button } from 'flowbite-react';
import { StoreLayout } from '@site/layouts/StoreLayout';

interface PolicyProps {
  policy?: {
    title: string;
    body: string;
  };
}

const Policy: React.FC<PolicyProps> = ({ policy }) => {
  const router = useRouter();

  useEffect(() => {
    if (!policy) {
      // Handle case where policy data is not available
      router.push('/policies');
    }
  }, [policy, router]);

  if (!policy) {
    // You can render a loading state or handle the case where policy data is not available
    return <div>Loading...</div>;
  }

  return (
	<StoreLayout>
    <Section
      display="flex"
      className="flex-col items-baseline w-full gap-8 md:flex-row justify-center"
    >
      <PageHeader
        heading={policy.title}
        className=" md:sticky top-48 md:w-5/12 text-5xl"
      >
        <Button
          onClick={() => router.push('/')}
		  gradientMonochrome="success"
		  className=''
        >
          &larr; Back to Home
        </Button>
      </PageHeader>
      <div className="flex-grow w-full md:w-7/12">
        <div
          dangerouslySetInnerHTML={{ __html: policy.body || '' }}
          className="prose dark:prose-invert"
        />
      </div>
    </Section>
	</StoreLayout>
  );
};

export default Policy;

export const getServerSideProps: GetServerSideProps<PolicyProps> = async ({ params }) => {
  const handle = params?.policyHandle as string;
  const policyName = handle.replace(/-([a-z])/g, (_, m1) => m1.toUpperCase());

  const data = await getPolicyContent({ policyName });
  const policy = data.body.data.shop?.[policyName];

  return {
    props: {
      policy,
    },
  };
};
