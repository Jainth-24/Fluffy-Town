'use client';

import clsx from 'clsx';
import ProductOptionLink from './ProductOptionLink';
import { Text } from './Text';
import useProductOption from '@site/hooks/useProductOption';

interface IOption {
  name: string;
  values: string[];
}

const ItemTabHeading = (option: IOption) => {
  const { isChecked, searchDefaultOption } = useProductOption();

  return (
    <>
      {option.values.map((value, index) => {
        const checked = isChecked(option.name, value);
		console.log({})
        const id = `option-${index}-${value}`;
        return (
          <Text key={id}>
            <ProductOptionLink
              optionName={option.name}
              optionValue={value}
              className={clsx(
                'cursor-pointer rounded-full bg-gray-100 px-3 py-2 transition-all duration-200 text-sm shadow-sm',
                {
                  'bg-green-200 rounded-full px-3 py-2': checked || searchDefaultOption(option.name, value, option.values[0]),
                }
              )}
            />
          </Text>
        );
      })}
    </>
  );
};

export default ItemTabHeading;
