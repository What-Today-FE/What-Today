import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { Portal } from '../Portal';
import { usePopoverContext } from './PopoverContext';
import type { BaseProp } from './types';

interface PopoverContentProps extends BaseProp {
  preventInteraction?: boolean; // 스크롤 방지 여부
  overlay?: boolean; // 배경 오버레이 표시 여부
}

function PopoverContent({ children, className, preventInteraction = false, overlay = false }: PopoverContentProps) {
  const { open, handleContentRef, direction, contentCoords, triggerWidth, contentSize } = usePopoverContext();

  // preventInteraction 필요한 상황에서는 스크롤 방지 (ex. Modal)
  useEffect(() => {
    if (open && preventInteraction) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open, preventInteraction]);

  if (!open) return null;

  return (
    <Portal>
      {/* overlay : Popover 아래 검은 배경 */}
      {overlay && <div className='fixed inset-0 z-40 bg-black/30' />}
      <div
        ref={handleContentRef}
        className={twMerge('absolute top-0 left-0 z-50', className)}
        style={{
          position: direction.startsWith('fixed-') ? 'fixed' : 'absolute', // Trigger의 위치에 따르지 않고, 뷰포트가 기준인 경우에는 fixed로 고정 (ex. Modal은 화면 정중앙에)
          top: `${contentCoords.top}px`,
          left: `${contentCoords.left}px`,
          width: triggerWidth ?? 'auto', // 기본적으로 Popover.Trigger의 크기에 맞추기 위한 용도
          visibility: contentSize.width ? 'visible' : 'hidden', // Popover.Content의 위치가 계산되기 전에는 화면에 보이지 않도록
        }}
      >
        <div className='cursor-pointer'>{children}</div>
      </div>
    </Portal>
  );
}

export const Content = PopoverContent;
