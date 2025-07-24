import { Children, isValidElement } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import SpinIcon from '@/components/icons/SpinIcon';

import type { ButtonProps } from './types';

const BUTTON_VARIANTS = {
  fill: 'bg-primary-500 text-white hover:brightness-95 active:brightness-90',
  outline: 'bg-white border border-gray-200 text-gray-700 hover:brightness-95 active:brightness-90',
  ghost: 'bg-white text-gray-600 hover:brightness-95 active:brightness-90',
  none: '',
};

const BUTTON_SIZE = {
  xl: 'w-640 h-54 px-40 py-14 text-lg font-bold rounded-2xl',
  lg: 'w-410 h-51 px-12 py-16 text-lg rounded-xl',
  md: 'w-232 h-37 px-10 py-10 text-md rounded-lg',
  sm: 'w-138 h-47 px-40 py-14 text-lg rounded-[14px]',
  xs: 'w-120 h-41 px-40 py-12 text-md font-bold rounded-xl',
};

function LoadingButton({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className='inline-flex items-center gap-6'>
      <SpinIcon className={className} />
      <span className='inline-flex items-center gap-6'>{children}</span>
    </span>
  );
}

export default function Button({
  type = 'button',
  variant = 'fill',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const buttonClassNames = twMerge(
    'inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap gap-6',
    'disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-200 disabled:text-gray-50',
    BUTTON_VARIANTS[variant],
    BUTTON_SIZE[size],
    className,
  );

  const loadingClassNames = twJoin(size === 'xl' ? 'size-24' : 'size-20');

  const validChildren = Children.toArray(children).filter((child) => {
    return (
      typeof child === 'string' ||
      (isValidElement(child) &&
        typeof child.type === 'function' &&
        (child.type as { displayName?: string }).displayName?.includes('Icon'))
    );
  });

  return (
    <button className={buttonClassNames} disabled={disabled || loading} type={type} onClick={handleClick} {...rest}>
      {loading ? <LoadingButton className={loadingClassNames}>{children}</LoadingButton> : validChildren}
    </button>
  );
}
