import { twMerge } from 'tailwind-merge';

import type { ToastComponentProps } from './types';

export default function ToastDescription({ children, className }: ToastComponentProps) {
  return <p className={twMerge('text-md', className)}>{children}</p>;
}
