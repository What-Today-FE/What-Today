import { twMerge } from 'tailwind-merge';

import type { BottomSheetHeaderProps } from './types';

/**
 * @component BottomSheet.Header
 * @description
 * 바텀시트 상단에 위치한 iOS 스타일의 핸들을 표시합니다.
 * 사용자가 드래그할 수 있는 영역으로, 상단 여백과 함께 시각적 힌트를 제공합니다.
 * 헤더 영역에서의 드래그는 콘텐츠 스크롤 위치와 관계없이 바텀시트를 닫을 수 있습니다.
 *
 * @param className - 추가적인 스타일을 위한 Tailwind 클래스
 *
 * @example
 * ```tsx
 * <BottomSheet.Header />
 * ```
 */

export function BottomSheetHeader({ className }: BottomSheetHeaderProps) {
  return (
    <div className={twMerge('relative h-24 rounded-t-2xl pt-12 pb-4', className)} data-bottomsheet-header='true'>
      <div className='mx-auto h-4 w-40 rounded bg-gray-300' />
    </div>
  );
}
