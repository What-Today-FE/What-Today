import { isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slot } from '../Slot';
import { usePopoverContext } from './PopoverContext';
import type { BaseProp } from './types';

interface PopoverTriggerProps extends BaseProp {
  asChild?: boolean;
}

/**
 * Renders a trigger element that toggles the open state of a Popover when clicked.
 *
 * By default, renders a `<button>` that toggles the Popover. If `asChild` is true, expects a single valid React element as a child and injects trigger behavior using a Slot.
 *
 * @param asChild - If true, renders the child element directly and injects trigger behavior; otherwise, renders a `<button>`.
 * @param children - The content or element to use as the trigger. Must be a single valid React element when `asChild` is true.
 * @param className - Additional class names to apply to the trigger element.
 * @returns The trigger element for the Popover, or `null` if `asChild` is true and the child is not a valid React element.
 */
function PopoverTrigger({ children, className, asChild = false }: PopoverTriggerProps) {
  const { triggerRef, open, setOpen } = usePopoverContext();
  // Trigger도 Overlay 위쪽으로 올라와야 하면 아래 overlayClass 사용
  // const zIndex = open && 'z-[910]';
  // const overlayClass = twMerge('relative w-full', zIndex);

  const handleClick = () => setOpen(!open);

  // asChild가 true면 Slot을 사용, false면 button 사용
  if (asChild) {
    if (!isValidElement(children)) {
      console.warn(
        'PopoverTrigger에서 asChild를 사용할 경우, 자식으로는 반드시 하나의 React Element만 전달되어야 합니다.',
      );
      return null;
    }

    return (
      <div ref={triggerRef} className='relative w-full'>
        <Slot className={twMerge('w-full cursor-pointer', className)} onClick={handleClick}>
          {children as React.ReactElement<React.HTMLAttributes<HTMLElement>>}
        </Slot>
      </div>
    );
  }

  return (
    <div ref={triggerRef} className='relative w-full'>
      <button className={twMerge('w-full cursor-pointer', className)} onClick={() => setOpen(!open)}>
        {children}
      </button>
    </div>
  );
}

export const Trigger = PopoverTrigger;
