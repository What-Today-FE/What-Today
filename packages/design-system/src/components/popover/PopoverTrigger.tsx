import { usePopoverContext } from './PopoverContext';
import type { ChildrenProp } from './types';

function PopoverTrigger({ children }: ChildrenProp) {
  const ctx = usePopoverContext();

  return (
    <div ref={ctx.buttonRef} className='relative z-50 w-full'>
      <button className='w-full cursor-pointer' onClick={() => ctx.setOpen(!ctx.open)}>
        {children}
      </button>
    </div>
  );
}

export const Trigger = PopoverTrigger;
