export interface BottomSheetContextType {
  /** BottomSheet가 열려 있는지 상태 여부 */
  isOpen: boolean;
  /** BottomSheet의 열림 상태를 제어하는 함수 */
  onClose: () => void;
  /** BottomSheet의 전체(wrapper) 요소에 대한 ref */
  sheetRef: React.RefObject<HTMLDivElement>;
  /** BottomSheet의 내부 콘텐츠(scroll 영역)에 대한 ref */
  contentRef: React.RefObject<HTMLDivElement>;
}
