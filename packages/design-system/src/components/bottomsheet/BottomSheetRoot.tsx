import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { Portal } from '../Portal';
import { BottomSheetContext } from './BottomSheetContext';
import { BottomSheetHeader } from './BottomSheetHeader';
import { BottomSheetOverlay } from './BottomSheetOverlay';
import { useBodyScrollLock, useDragToClose } from './hooks';
import type { BottomSheetRootProps } from './types';

/**
 * @component BottomSheet.Root
 * @description Portal을 사용한 바텀시트 기본 구조를 제공합니다.
 * 배경 스크롤이 방지되고 헤더와 콘텐츠 영역을 구분하여 스마트하게 드래그로 닫을 수 있습니다.
 * 동적 높이 조절은 BottomSheet.Content 컴포넌트에서 담당합니다.
 */
export function BottomSheetRoot({ isOpen, onClose, children, className }: BottomSheetRootProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 바텀시트가 열릴 때 배경 스크롤 방지
  useBodyScrollLock(isOpen);

  // 드래그로 닫기 기능 (스크롤 위치 고려)
  const { dragHandlers } = useDragToClose(sheetRef, contentRef, onClose, isOpen);

  return (
    <BottomSheetContext.Provider value={{ isOpen, onClose, sheetRef, contentRef }}>
      <Portal>
        <BottomSheetOverlay
          className={twMerge(
            'transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={onClose}
        />

        <div
          ref={sheetRef}
          className={twMerge(
            'fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl bg-white',
            'transition-transform duration-300 ease-out',
            isOpen ? 'translate-y-0' : 'translate-y-full',
            className,
          )}
          {...dragHandlers}
        >
          <BottomSheetHeader />
          {children}
        </div>
      </Portal>
    </BottomSheetContext.Provider>
  );
}
