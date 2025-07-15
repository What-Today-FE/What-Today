import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { Portal } from '../Portal';
import { usePopoverContext } from './PopoverContext';
import type { ChildrenProp } from './types';

function PopoverContent({
  children,
  className,
  preventInteraction = false,
  overlay = false,
}: ChildrenProp & { preventInteraction?: boolean; className?: string; overlay?: boolean }) {
  const ctx = usePopoverContext();

  useEffect(() => {
    if (ctx.open && preventInteraction) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [ctx.open, preventInteraction]);

  if (!ctx.open) return null;

  return (
    <Portal>
      {overlay && <div className='fixed inset-0 z-40 bg-black/30' />}
      <div
        ref={ctx.dropdownRef}
        className={twMerge('absolute top-0 left-0 z-50', className)}
        style={{
          position: ctx.direction.startsWith('fixed-') ? 'fixed' : 'absolute',
          top: `${ctx.coords.top}px`,
          left: `${ctx.coords.left}px`,
          width: ctx.triggerWidth ?? 'auto',
          visibility: ctx.dropdownSize.width ? 'visible' : 'hidden',
        }}
      >
        <div className='cursor-pointer'>{children}</div>
      </div>
    </Portal>
  );
}

export const Content = PopoverContent;
