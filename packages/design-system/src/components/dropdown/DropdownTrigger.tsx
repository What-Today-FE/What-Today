import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from '@/components/dropdown/DropdownContext';

export default function DropdownTrigger(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useDropdownContext();
  return (
    <button className={twMerge('cursor-pointer text-2xl', props.className)} type='button' onClick={toggle} {...props}>
      :
    </button>
  );
}
