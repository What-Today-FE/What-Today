import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from '@/components/dropdown/DropdownContext';

export default function DropdownMenu(props: HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useDropdownContext();
  return isOpen ? (
    <div className={twMerge('h-110 w-95 rounded-lg border border-gray-100', props.className)} {...props} />
  ) : null;
}
