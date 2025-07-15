import { Children, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

import SpinIcon from '@/components/icons/SpinIcon';

import type { ButtonProps } from './types';

const BUTTON_VARIANTS = {
  fill: 'bg-primary-500 text-white hover:bg-blue-500 active:bg-blue-600',
  outline: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'bg-white text-gray-600 hover:bg-gray-100 active:bg-gray-200',
  none: '',
};

const BUTTON_SIZE = {
  xl: 'h-54 px-40 py-14 text-lg font-bold rounded-2xl',
  lg: 'h-51 px-12 py-16 text-lg rounded-xl',
  md: 'h-37 px-10 py-10 text-md rounded-lg',
  sm: 'h-47 px-40 py-14 text-lg rounded-[14px]',
  xs: 'h-41 px-40 py-12 text-md font-bold rounded-xl',
};

const SPIN_ICON_SIZE = {
  xl: 'size-24',
  lg: 'size-20',
  md: 'size-20',
  sm: 'size-20',
  xs: 'size-20',
};

function LoadingButton({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className='inline-flex items-center gap-6'>
      <SpinIcon className={className} />
      <span>{children}</span>
    </span>
  );
}

export default function Button<T extends React.ElementType = 'button'>({
  as,
  type = 'button',
  variant = 'fill',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = as || 'button';

  const buttonClassNames = twMerge(
    'inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap',
    'disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-200 disabled:text-gray-50',
    BUTTON_VARIANTS[variant],
    BUTTON_SIZE[size],
    className,
  );

  const loadingClassNames = SPIN_ICON_SIZE[size];

  const validChildren = Children.toArray(children).filter((child) => {
    return (
      typeof child === 'string' ||
      (isValidElement(child) &&
        typeof child.type === 'function' &&
        (child.type as { displayName?: string }).displayName?.includes('Icon'))
    );
  });

  return (
    <Component className={buttonClassNames} disabled={disabled || loading} type={type} {...rest}>
      {loading ? <LoadingButton className={loadingClassNames}>{children}</LoadingButton> : validChildren}
    </Component>
  );
}
