import { twMerge } from 'tailwind-merge';

import { usePopoverContext } from './PopoverContext';
import type { BaseProp } from './types';

function PopoverTrigger({ children, className }: BaseProp) {
  const { triggerRef, open, setOpen } = usePopoverContext();

  return (
    <div ref={triggerRef} className='relative z-50 w-full'>
      <button className={twMerge('w-full cursor-pointer', className)} onClick={() => setOpen(!open)}>
        {children}
      </button>
    </div>
  );
}

export const Trigger = PopoverTrigger;
