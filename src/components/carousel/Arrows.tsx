import React from 'react';

interface Props {
  className?: string;
  style?: any;
  onClick?: () => void;
  to: string;
}
export const NextArrow: React.FC<Props> = ({ className, style, onClick, to }) => {
  return (
    <div
      className={`${className} z-10 !flex h-full w-12 items-center justify-center pt-10 drop-shadow-lg before:content-[''] hover:bg-palette-card/10 md:w-16 lg:w-28 ltr:left-auto  ltr:right-0 rtl:left-0 rtl:right-auto`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={to}
    />
  );
};
export const PrevArrow: React.FC<Props> = ({ className, style, onClick, to }) => {
  return (
    <div
      className={`${className} z-10 !flex h-full w-12 items-center justify-center pt-10 drop-shadow-lg before:text-[20px] before:content-[''] hover:bg-palette-card/10 md:w-16 lg:w-28 lg:before:text-[30px] ltr:left-0 ltr:right-auto rtl:left-auto rtl:right-0`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={to}
    />
  );
};
