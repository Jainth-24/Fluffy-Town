import { Link } from '@site/components/Link';
import { PageHeader, Section, Heading } from '@site/components/Text';
import { getPolicies } from '@site/lib/shopify';

export default async function Policies() {
  const data = await getPolicies();
  const policies = Object.values(data.body.data.shop || {});

  return (
    <>
      <PageHeader heading="Policies" />
      <Section padding="x" className="mb-24">
        {policies.map((policy) => {
          return (
            policy && (
              <Heading className="text-heading font-normal" key={policy.id}>
                <Link href={`/policies/${policy.handle}`}>{policy.title}</Link>
              </Heading>
            )
          );
        })}
      </Section>
    </>
  );
}
