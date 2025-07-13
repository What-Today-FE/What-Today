import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from '@/components/dropdown/DropdownContext';

export default function DropdownItem({ onClick, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { close } = useDropdownContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    close();
  };

  return (
    <div
      className={twMerge('cursor-pointer px-20 py-14 text-center text-lg font-medium text-gray-950', props.className)}
      onClick={handleClick}
      {...props}
    />
  );
}
