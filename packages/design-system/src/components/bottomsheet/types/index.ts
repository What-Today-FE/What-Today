export interface BottomSheetContextType {
  /** BottomSheet가 열려 있는지 상태 여부 */
  isOpen: boolean;
  /** BottomSheet의 열림 상태를 제어하는 함수 */
  onClose: () => void;
  /** BottomSheet의 전체(wrapper) 요소에 대한 ref */
  sheetRef: React.RefObject<HTMLDivElement | null>;
  /** BottomSheet의 내부 콘텐츠(scroll 영역)에 대한 ref */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** BottomSheet의 높이를 재계산하는 함수 */
  recalculateHeight?: () => void;
}

export interface BottomSheetRootProps {
  /** BottomSheet의 열림 상태 */
  isOpen: boolean;
  /** BottomSheet의 열림 상태를 제어하는 함수 */
  onClose: () => void;
  /** BottomSheet 내부 children */
  children: React.ReactNode;
  /** Tailwind CSS 클래스 */
  className?: string;
}

export interface BottomSheetHeaderProps {
  /** 추가적인 스타일을 위한 Tailwind 클래스 */
  className?: string;
}

export interface BottomSheetContentProps {
  /** 바텀시트에 표시할 콘텐츠 */
  children: React.ReactNode;
  /** 추가적인 스타일을 위한 Tailwind 클래스 */
  className?: string;
}

export interface BottomSheetOverlayProps {
  /** 오버레이 클릭 시 실행되는 함수 */
  onClick: () => void;
  /** Tailwind CSS 클래스 */
  className?: string;
}
