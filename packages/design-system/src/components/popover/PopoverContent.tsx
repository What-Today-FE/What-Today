import { Portal } from '@components/Portal';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { usePopoverContext } from './PopoverContext';
import type { BaseProp } from './types';

export interface PopoverContentProps extends BaseProp {
  preventInteraction?: boolean; // 스크롤 방지 여부
  overlay?: boolean; // 배경 오버레이 표시 여부
  matchTriggerWidth?: boolean;
}

/**
 * @component PopoverContent
 * @description Popover의 실제 콘텐츠를 렌더링하는 컴포넌트입니다. `Portal`을 통해 루트 DOM에 렌더링되며, 트리거 요소(PopoverTrigger)의 위치에 따라 위치가 동적으로 계산됩니다.
 * - `open` 상태에 따라 렌더링 여부가 결정됩니다.
 * - `preventInteraction`이 true일 경우, 뒷 배경의 스크롤이 금지됩니다.
 * - `overlay`가 true일 경우, Popover 아래 검은 레이어가 추가됩니다.
 *
 * @param {React.ReactNode} props.children - Popover 내부에 표시할 콘텐츠
 * @param {boolean} [props.preventInteraction=false] - true일 경우 Popover 뒷 배경의 스크롤이 금지됩니다.
 * @param {boolean} [props.overlay=false] - true일 경우 Popover 아래 검은 레이어가 추가됩니다.
 * @param {boolean} [props.matchTriggerWidth=false] - Popover는 기본적으로 내부 콘텐츠 크기만큼 커집니다. 만약 true일 경우 Trigger 사이즈가 max-width로 설정됩니다.
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>열기</PopoverTrigger>
 *   <PopoverContent overlay preventInteraction>
 *     <div className="p-4">내용</div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function PopoverContent({
  children,
  className,
  style,
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
      {overlay && <div className='fixed inset-0 z-99 bg-black/30' />}
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

          ...style, // 각 컴퍼넌트별 커스텀 Style
        }}
      >
        {children}
      </div>
    </Portal>
    // Trigger도 Overlay 위쪽으로 올라와야 하면 아래 내용 사용 + 상대적 popoverPosition 수정 (relative div가 바뀜)
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
