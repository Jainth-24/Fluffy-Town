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
        const id = `option-${index}-${value}`;
        return (
          <Text key={id}>
            <ProductOptionLink
              optionName={option.name}
              optionValue={value}
              className={clsx(
                'border-primary/0 cursor-pointer border-b-[1.5px] py-1 leading-none transition-all duration-200',
                {
                  'border-primary/50': checked || searchDefaultOption(option.name, value, option.values[0]),
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
