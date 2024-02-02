import { GetServerSideProps, NextPage } from 'next';
import { Button } from '@site/components/Button';
import { Section, PageHeader } from '@site/components/Text';
import { getPolicyContent } from '@site/lib/shopify';
import { ParsedUrlQuery } from 'querystring';

interface PolicyProps {
  title?: string;
  body?: string;
}

interface PolicyPageProps {
  policy: PolicyProps | null;
}

const Policy: NextPage<PolicyPageProps> = ({ policy }) => {
  return (
    <Section padding="all" display="flex" className="w-full flex-col items-baseline gap-8 md:flex-row">
      <PageHeader heading={policy?.title} className="top-36 grid grow items-start gap-4 md:sticky md:w-5/12">
        <Button className="justify-self-start" variant="inline" href="/policies">
          &larr; Back to Policies
        </Button>
      </PageHeader>
      <div className="w-full grow md:w-7/12">
        <div dangerouslySetInnerHTML={{ __html: policy?.body || '' }} className="prose dark:prose-invert" />
      </div>
    </Section>
  );
};

export const getServerSideProps: GetServerSideProps<PolicyPageProps, ParsedUrlQuery> = async (context) => {
  const { query } = context;
  const handle = query.policyHandle as string;

  const policyName = handle.replace(/-([a-z])/g, (_: unknown, m1: string) => m1.toUpperCase());

  const data = await getPolicyContent({ policyName });
  const policy = data.body.data.shop?.[policyName];

  return {
    props: {
      policy: policy || null,
    },
  };
};

export default Policy;
