import { twMerge } from 'tailwind-merge';

import type { BottomSheetOverlayProps } from './types';

/**
 * @component BottomSheetOverlay
 * @description 바텀시트 배경 오버레이입니다. 클릭하면 바텀시트가 닫힙니다.
 */
export function BottomSheetOverlay({ onClick, className }: BottomSheetOverlayProps) {
  return (
    <div className={twMerge('fixed inset-0 z-60 bg-black/5 backdrop-brightness-50', className)} onClick={onClick} />
  );
}
