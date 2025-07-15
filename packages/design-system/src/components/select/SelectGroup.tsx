import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

function SelectGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={(twMerge('my-4'), className)}>{children}</div>;
}

export const Group = SelectGroup;
