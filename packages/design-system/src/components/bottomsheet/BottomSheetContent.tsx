import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { BottomSheetContext } from './BottomSheetContext';
import { useDynamicHeight } from './hooks';
import type { BottomSheetContentProps } from './types';

/**
 * @component BottomSheet.Content
 * @description 바텀시트의 콘텐츠 영역을 담당하는 컴포넌트입니다.
 * 동적 높이 조절과 스크롤 처리를 자동으로 관리합니다.
 *
 * @param children - 바텀시트에 표시할 콘텐츠
 * @param className - 추가적인 스타일을 위한 Tailwind 클래스
 *
 * @example
 * ```tsx
 * <BottomSheet.Root isOpen={isOpen} onClose={onClose}>
 *   <BottomSheet.Content>
 *     <h2>제목</h2>
 *     <p>내용</p>
 *   </BottomSheet.Content>
 * </BottomSheet.Root>
 * ```
 */
export function BottomSheetContent({ children, className }: BottomSheetContentProps) {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('BottomSheetContent는 BottomSheet.Root 안에서 사용되어야 합니다.');
  }

  const { isOpen, contentRef } = context;

  // 동적 높이 조절
  const { contentHeight, isScrollable } = useDynamicHeight(contentRef, isOpen);

  return (
    <div
      ref={contentRef}
      className={twMerge('px-4 pb-4', className)}
      style={{
        height: contentHeight ? `${contentHeight}px` : 'auto',
        overflowY: isScrollable ? 'auto' : 'visible',
        maxHeight: contentHeight ? `${contentHeight}px` : 'none',
      }}
    >
      {children}
    </div>
  );
}
