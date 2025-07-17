import { Slot } from '@components/Slot';
import { isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { usePopoverContext } from './PopoverContext';
import type { BaseProp } from './types';

export interface PopoverTriggerProps extends BaseProp {
  asChild?: boolean;
}

/**
 * @component PopoverTrigger
 * @description Popover를 여닫기 위한 트리거 역할을 하는 컴포넌트입니다. 클릭 시 Popover의 open 상태를 토글합니다.
 * 기본적으로 `<button>` 요소로 렌더링되며, `asChild` 옵션을 통해 Trigger를 커스텀하여 사용할 수 있습니다.
 *
 * @param {ReactNode} props.children - Trigger에 들어갈 내용. `asChild`가 true일 경우 단일 React 엘리먼트만 허용됩니다.
 * @param {boolean} [props.asChild=false] - true일 경우 children을 직접 렌더링하고, Slot을 통해 prop을 주입합니다. (직접 렌더링시 Trigger는 <button>입니다.)
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```
 * <Trigger asChild>
 *    <div className='px-4 py-2 text-white bg-blue-500'>
 *      커스텀 트리거
 *    </div>
 * </Trigger>
 * ```
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
