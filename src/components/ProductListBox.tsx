'use client';

import { Listbox } from '@headlessui/react';
import { useRef } from 'react';

import clsx from 'clsx';
import ProductOptionLink from './ProductOptionLink';
import useProductOption from '@site/hooks/useProductOption';
import { IconCaret, IconCheck } from './Icon';

interface IOption {
  name: string;
  values: string[];
}

function ProductListBox(option: IOption) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { isChecked, searchDefaultOption, searchParamExists } = useProductOption();

  return (
    <div className="relative w-full">
      <Listbox>
        {({ open }) => (
          <>
            <Listbox.Button
              ref={closeRef}
              className={clsx('border-primary flex w-full items-center justify-between rounded border px-4 py-3', {
                'rounded-b md:rounded-t md:rounded-b-none': open,
              })}
            >
              <span>{searchParamExists(option.name) || option.values[0]}</span>
              <IconCaret direction={open ? 'up' : 'down'} />
            </Listbox.Button>
            <Listbox.Options
              className={clsx(
                'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 max-h-0 w-full overflow-y-scroll rounded-t border p-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-b md:border-t-0',
                { 'max-h-48': open }
              )}
            >
              {option.values.map((value, index) => {
                const checked = isChecked(option.name, value);
                const id = `option-${index}-${value}`;
                return (
                  <Listbox.Option key={id} value={value}>
                    {({ active }) => (
                      <ProductOptionLink
                        optionName={option.name}
                        optionValue={value}
                        className={clsx(
                          'text-primary flex w-full cursor-pointer items-center justify-start rounded p-2 text-left transition',
                          { 'bg-primary/10': active }
                        )}
                        onClick={() => {
                          if (!closeRef?.current) return;
                          closeRef.current.click();
                        }}
                      >
                        {value}
                        {(checked || searchDefaultOption(option.name, value, option.values[0])) && (
                          <span className="ml-2">
                            <IconCheck />
                          </span>
                        )}
                      </ProductOptionLink>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default ProductListBox;
