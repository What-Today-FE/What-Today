import { twMerge } from 'tailwind-merge';

import type { ToastComponentProps } from './types';

export default function ToastTitle({ children, className }: ToastComponentProps) {
  return <h2 className={twMerge('text-lg font-bold', className)}>{children}</h2>;
}
