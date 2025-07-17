import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { Portal } from '../Portal';
import { usePopoverContext } from './PopoverContext';
import type { BaseProp } from './types';

interface PopoverContentProps extends BaseProp {
  preventInteraction?: boolean; // 스크롤 방지 여부
  overlay?: boolean; // 배경 오버레이 표시 여부
  matchTriggerWidth?: boolean;
}

/**
 * Renders the content of a popover, positioned relative to its trigger and optionally displaying an overlay and disabling background scrolling.
 *
 * The popover content is rendered in a portal to the root DOM node and is only visible when open. Position and size are dynamically calculated based on the trigger element. An optional semi-transparent overlay can be displayed behind the popover, and background scrolling can be prevented while the popover is open.
 *
 * @param children - The content to display inside the popover.
 * @param preventInteraction - If true, disables background scrolling while the popover is open.
 * @param overlay - If true, displays a semi-transparent black overlay behind the popover.
 * @param matchTriggerWidth - If true, sets the popover width to match the trigger element's width.
 * @param className - Additional class names for custom styling.
 */
function PopoverContent({
  children,
  className,
  preventInteraction = false,
  overlay = false,
  matchTriggerWidth = false,
}: PopoverContentProps) {
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
      {overlay && <div className='fixed inset-0 z-40 bg-black/30' />}
      <div
        ref={handleContentRef}
        className={twMerge('absolute top-0 left-0 z-50', className)}
        style={{
          position: direction.startsWith('fixed-') ? 'fixed' : 'absolute', // Trigger의 위치에 따르지 않고, 뷰포트가 기준인 경우에는 fixed로 고정 (ex. Modal은 화면 정중앙에)
          top: `${contentCoords.top}px`,
          left: `${contentCoords.left}px`,
          ...(matchTriggerWidth
            ? {
                width: triggerWidth ?? 'auto',
              }
            : {
                minWidth: triggerWidth ?? 'auto',
                width: 'fit-content',
              }),
          visibility: contentSize.width ? 'visible' : 'hidden', // Popover.Content의 위치가 계산되기 전에는 화면에 보이지 않도록
        }}
      >
        <div className='cursor-pointer'>{children}</div>
      </div>
    </Portal>
    // Trigger도 Overlay 위쪽으로 올라와야 하면 아래 내용 사용 + 상대적 popoverPostion 수정 (relative div가 바뀜)
    // <Portal>
    //   {open && (
    //     <div className='pointer-events-none fixed inset-0 z-[900]'>
    //       {/* Overlay */}
    //       {overlay && <div className='pointer-events-auto absolute inset-0 bg-black/30' />}

    //       {/* Popover 콘텐츠 */}
    //       <div
    //         ref={handleContentRef}
    //         className={twMerge('absolute', className)}
    //         style={{
    //           position: direction.startsWith('fixed-') ? 'fixed' : 'absolute',
    //           top: `${contentCoords.top}px`,
    //           left: `${contentCoords.left}px`,
    //           width: triggerWidth ?? 'auto',
    //           visibility: contentSize.width ? 'visible' : 'hidden',
    //         }}
    //       >
    //         <div className='pointer-events-auto cursor-pointer'>{children}</div>
    //       </div>
    //     </div>
    //   )}
    // </Portal>
  );
}

export const Content = PopoverContent;
