'use client';

import { Link } from '@site/components/Link';
import { Text } from '@site/components/Text';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { IconClose } from '@site/components/Icon';

function ProductDetail({ title, content, learnMore }: { title: string; content: string; learnMore?: string }) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx('transform-gpu transition-transform duration-200', !open && 'rotate-[45deg]')}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'grid gap-2 pb-4 pt-2'}>
            <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
            {learnMore && (
              <div className="">
                <Link className="border-primary/30 text-primary/50 border-b pb-px" href={learnMore}>
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default ProductDetail;
