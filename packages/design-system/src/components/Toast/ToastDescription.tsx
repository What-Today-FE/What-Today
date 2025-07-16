import { twMerge } from 'tailwind-merge';

import type { ToastComponentProps } from './types';

export default function ToastDescription({ children, className }: ToastComponentProps) {
  return <p className={twMerge('text-md mt-4', className)}>{children}</p>;
}
