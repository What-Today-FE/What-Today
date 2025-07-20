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

/**
 * 바텀시트 드래그 동작 시 내부에서 관리되는 상태 인터페이스
 */
export interface BottomSheetMetrics {
  /**
   * 드래그(터치) 시작 시점의 위치 정보
   * - sheetY: 바텀시트 최상단의 Y 좌표 (getBoundingClientRect 기준)
   * - touchY: 사용자가 화면을 터치한 Y 좌표
   */
  touchStart: {
    sheetY: number;
    touchY: number;
  };

  /**
   * 드래그(터치) 중 계산되는 정보
   * - prevTouchY: 이전 프레임의 터치 위치 (이동 방향 계산용)
   * - movingDirection: 사용자가 손가락을 위로/아래로 움직이는지 방향 정보
   */
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'up' | 'down';
  };

  /**
   * 콘텐츠 영역에서 터치가 시작되었는지 여부
   * → 콘텐츠가 스크롤 가능한 영역인지 판단하는 기준
   */
  isContentAreaTouched: boolean;
}
