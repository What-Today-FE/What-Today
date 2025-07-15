import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

function SelectLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={twMerge('px-10 py-4 text-sm text-gray-300', className)}>{children}</p>;
}

export const Label = SelectLabel;
