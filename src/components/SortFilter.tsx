'use client';
import { SyntheticEvent, useState } from 'react';
import { Menu, Disclosure } from '@headlessui/react';
import { useDebounce, useLocation } from 'react-use';
import { IconCaret, IconFilters, IconXMark } from './Icon';
import { Heading, Text } from './Text';
import { Link } from './Link';
import { Filter, Collection, FilterType } from '@site/lib/shopify/types';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Button } from 'flowbite-react';

export type AppliedFilter = {
  label: string;
  urlParam: {
    key: string;
    value: string;
  };
};

export type SortParam = 'price-low-high' | 'price-high-low' | 'best-selling' | 'newest' | 'featured';

type Props = {
  filters: Filter[];
  appliedFilters?: AppliedFilter[];
  children: React.ReactNode;
  collections?: Collection[];
};

export function SortFilter({ filters, appliedFilters = [], children, collections = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className={'relative flex size-8 items-center justify-center'}>
          <IconFilters />
        </button>
        <SortMenu />
      </div>
      <div className="flex flex-col flex-wrap md:flex-row">
        <div
          className={clsx('transition-all duration-200', {
            'opacity-100 min-w-full md:min-w-[240px] md:w-[240px] md:pr-8 max-h-full': isOpen,
            'opacity-0 md:min-w-[0px] md:w-[0px] pr-0 max-h-0 md:max-h-full': !isOpen,
          })}
        >
          <FiltersDrawer collections={collections} filters={filters} appliedFilters={appliedFilters} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export function FiltersDrawer({
  filters = [],
  appliedFilters = [],
}: {
  filters: Filter[];
  appliedFilters: AppliedFilter[];
  collections: Collection[];
}) {
  const pathname = usePathname();
  const location = pathname || '';
  const params = new URLSearchParams(location);
  const filterMarkup = (filter: Filter, option: Filter['values'][0]) => {
    if (filter.type === 'PRICE_RANGE') {
      const min =
        params.has('minPrice') && !isNaN(Number(params.get('minPrice'))) ? Number(params.get('minPrice')) : undefined;

      const max =
        params.has('maxPrice') && !isNaN(Number(params.get('maxPrice'))) ? Number(params.get('maxPrice')) : undefined;
      return <PriceRangeFilter min={min} max={max} />;
    } else {
      const to = getFilterLink(filter, option.input as string, params, location);
      return (
        <Link className="hover:underline focus:underline" href={to}>
          {option.label}
        </Link>
      );
    }
  };

  return (
    <>
      <nav className="py-8">
        {appliedFilters.length > 0 ? (
          <div className="pb-8">
            <AppliedFilters filters={appliedFilters} />
          </div>
        ) : null}

        <Heading as="h4" size="lead" className="pb-4">
          Filter By
        </Heading>
        <div className="divide-y">
          {filters.map(
            (filter: Filter) =>
              filter.values.length > 0 && (
                <Disclosure as="div" key={filter.id} className="w-full">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between py-4">
                        <Text size="lead">{filter.label}</Text>
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </Disclosure.Button>
                      <Disclosure.Panel key={filter.id}>
                        <ul key={filter.id} className="py-2">
                          {filter.values?.map((option) => {
                            return (
                              <li key={option.id} className="pb-4">
                                {filterMarkup(filter, option)}
                              </li>
                            );
                          })}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )
          )}
        </div>
      </nav>
    </>
  );
}

function AppliedFilters({ filters = [] }: { filters: AppliedFilter[] }) {
  const pathname = usePathname();
  const location = pathname;
  const params = new URLSearchParams(location);
  return (
    <>
      <Heading as="h4" size="lead" className="pb-4">
        Applied filters
      </Heading>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter: AppliedFilter) => {
          return (
            <Link
              href={getAppliedFilterLink(filter, params, location)}
              className="flex rounded-full border px-2"
              key={`${filter.label}-${filter.urlParam}`}
            >
              <span className="grow">{filter.label}</span>
              <span>
                <IconXMark />
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function getAppliedFilterLink(filter: AppliedFilter, params: URLSearchParams, location: string) {
  const paramsClone = new URLSearchParams(params);
  if (filter.urlParam.key === 'variantOption') {
    const variantOptions = paramsClone.getAll('variantOption');
    const filteredVariantOptions = variantOptions.filter((options) => !options.includes(filter.urlParam.value));
    paramsClone.delete(filter.urlParam.key);
    for (const filteredVariantOption of filteredVariantOptions) {
      paramsClone.append(filter.urlParam.key, filteredVariantOption);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location}?${paramsClone.toString()}`;
}

function getSortLink(sort: SortParam, params: URLSearchParams, location: Location) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}

function getFilterLink(
  filter: Filter,
  rawInput: string | Record<string, any>,
  params: URLSearchParams,
  location: string
) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location}?${newParams.toString()}`;
}

const PRICE_RANGE_FILTER_DEBOUNCE = 500;

function PriceRangeFilter({ max, min }: { max?: number; min?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(pathname.split('?')[1] || '');

  const [minPrice, setMinPrice] = useState(min ? String(min) : '');
  const [maxPrice, setMaxPrice] = useState(max ? String(max) : '');

  useDebounce(
    () => {
      if ((minPrice === '' || minPrice === String(min)) && (maxPrice === '' || maxPrice === String(max))) return;

      const price: { min?: string; max?: string } = {};
      if (minPrice !== '') price.min = minPrice;
      if (maxPrice !== '') price.max = maxPrice;

      const newParams = filterInputToParams('PRICE_RANGE', { price }, params);
      router.push(`${location}?${newParams.toString()}`);
    },
    PRICE_RANGE_FILTER_DEBOUNCE,
    [minPrice, maxPrice]
  );

  const onChangeMax = (event: SyntheticEvent) => {
    const newMaxPrice = (event.target as HTMLInputElement).value;
    setMaxPrice(newMaxPrice);
  };

  const onChangeMin = (event: SyntheticEvent) => {
    const newMinPrice = (event.target as HTMLInputElement).value;
    setMinPrice(newMinPrice);
  };

  const clearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push(`${location.pathname}`);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-4">
        <span>From</span>
        <input
          name="maxPrice"
          className="text-black"
          type="text"
          defaultValue={min}
          placeholder={'Rs.'}
          onChange={onChangeMin}
        />
      </label>
      <label>
        <span>To</span>
        <input
          name="minPrice"
          className="text-black"
          type="number"
          defaultValue={max}
          placeholder={'Rs.'}
          onChange={onChangeMax}
        />
      </label>
      <Button className="mt-5" color='warning' onClick={() => clearFilter()}>
        Clear
      </Button>
    </div>
  );
}

function filterInputToParams(type: FilterType, rawInput: string | Record<string, any>, params: URLSearchParams) {
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case 'PRICE_RANGE':
      if (input.price.min) params.set('minPrice', input.price.min);
      if (input.price.max) params.set('maxPrice', input.price.max);
      break;
    case 'LIST':
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string') {
          params.set(key, value);
        } else if (typeof value === 'boolean') {
          params.set(key, value.toString());
        } else {
          const { name, value: val } = value as { name: string; value: string };
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;
          if (!allVariants.includes(newVariant)) {
            params.append('variantOption', newVariant);
          }
        }
      });
      break;
  }

  return params;
}

function SortMenu() {
  const items: { label: string; key: SortParam }[] = [
    { label: 'Featured', key: 'featured' },
    {
      label: 'Price: Low - High',
      key: 'price-low-high',
    },
    {
      label: 'Price: High - Low',
      key: 'price-high-low',
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
    },
    {
      label: 'Newest',
      key: 'newest',
    },
  ];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeItem = items.find((item) => item.key === params.get('sort'));

  return (
    <Menu as="div" className="relative z-40 rounded-md border bg-gray-200 max-md:p-1 sm:p-1 lg:p-2">
      <Menu.Button className="flex items-center">
        <span className="px-2">
          <span className="px-2 font-medium">Sort by:</span>
          <span>{(activeItem ?? items[0]).label}</span>
        </span>
        <IconCaret />
      </Menu.Button>

      <Menu.Items
        as="nav"
        className=" absolute mt-2 flex w-[95%] flex-col rounded-sm bg-white p-2 text-right shadow-md"
      >
        {items.map((item, index) => (
          <Menu.Item key={item.label}>
            {() => (
              <>
                <Link
                  className={clsx('block p-1 text-sm  hover:bg-gray-200', {
                    'font-bold': activeItem?.key === item.key,
                    'font-normal': activeItem?.key !== item.key,
                  })}
                  href={getSortLink(item.key, params, window.location)}
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && <hr className="my-2 w-full" />}
              </>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
