import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

function SelectTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={twMerge('text-xl font-bold', className)}>{children}</p>;
}

export const Title = SelectTitle;
