import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @hook useBodyScrollLock
 * @description 바텀시트가 열릴 때 배경 페이지의 스크롤을 방지하는 훅입니다.
 *
 * @param isLocked - true일 때 스크롤 잠금, false일 때 스크롤 해제
 *
 * @example
 * ```tsx
 * function BottomSheet({ isOpen }) {
 *   useBodyScrollLock(isOpen);
 *   // ...
 * }
 * ```
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // 현재 스크롤 위치 저장 (iOS에서 위치 변화 방지)
      const scrollY = window.scrollY;

      // body 스크롤 방지
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // 이전 스크롤 위치로 복원
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // cleanup: 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isLocked]);
}

/**
 * @hook useDynamicHeight
 * @description 바텀시트의 높이를 콘텐츠에 따라 동적으로 조절하는 훅입니다.
 *
 * @param contentRef - 콘텐츠 영역 ref
 * @param isOpen - 바텀시트 열림 상태
 * @param maxHeight - 최대 높이 비율 (0-1, 기본값: 0.9 = 90%)
 *
 * @example
 * ```tsx
 * function BottomSheet({ isOpen }) {
 *   const contentRef = useRef(null);
 *   const { contentHeight, isScrollable } = useDynamicHeight(contentRef, isOpen);
 *   // ...
 * }
 * ```
 */
export function useDynamicHeight(
  contentRef: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  maxHeight: number = 0.9,
) {
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const calculateHeight = useCallback(() => {
    if (!contentRef.current || !isOpen) return;

    // 콘텐츠의 실제 높이 측정
    const contentScrollHeight = contentRef.current.scrollHeight;

    // 뷰포트 높이와 최대 허용 높이 계산
    const viewportHeight = window.innerHeight;
    const maxAllowedHeight = viewportHeight * maxHeight;

    // 헤더 높이 고려 (대략 64px)
    const headerHeight = 24;
    const availableHeight = maxAllowedHeight - headerHeight;

    if (contentScrollHeight <= availableHeight) {
      // 콘텐츠가 최대 높이보다 작으면 콘텐츠 크기에 맞춤
      setContentHeight(contentScrollHeight);
      setIsScrollable(false);
    } else {
      // 콘텐츠가 최대 높이보다 크면 최대 높이로 제한하고 스크롤 허용
      setContentHeight(availableHeight);
      setIsScrollable(true);
    }
  }, [contentRef, isOpen, maxHeight]);

  // 바텀시트가 열릴 때 높이 계산
  useEffect(() => {
    if (isOpen) {
      // DOM 업데이트 후 높이 계산을 위해 약간의 지연
      const timer = setTimeout(calculateHeight, 50);
      return () => clearTimeout(timer);
    } else {
      // 닫힐 때 애니메이션 시간만큼 딜레이 후 상태 초기화 (깜빡임 방지)
      const timer = setTimeout(() => {
        setContentHeight(null);
        setIsScrollable(false);
      }, 300); // CSS transition duration과 동일하게 설정
      return () => clearTimeout(timer);
    }
  }, [isOpen, calculateHeight]);

  // 윈도우 리사이즈 시 높이 재계산
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      calculateHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, calculateHeight]);

  return {
    contentHeight,
    isScrollable,
    recalculateHeight: calculateHeight,
  };
}

/**
 * @hook useDragToClose
 * @description 바텀시트를 드래그해서 닫을 수 있는 기능을 제공하는 훅입니다.
 * 헤더에서 드래그할 때는 스크롤 위치와 관계없이, 콘텐츠에서 드래그할 때는 스크롤이 맨 위에 있을 때만 닫기가 가능합니다.
 *
 * @param sheetRef - 바텀시트 DOM 요소 ref
 * @param contentRef - 콘텐츠 영역 ref (스크롤 위치 확인용)
 * @param onClose - 바텀시트 닫기 함수
 * @param isOpen - 바텀시트 열림 상태
 *
 * @example
 * ```tsx
 * function BottomSheet({ isOpen, onClose }) {
 *   const sheetRef = useRef(null);
 *   const contentRef = useRef(null);
 *   const { dragHandlers } = useDragToClose(sheetRef, contentRef, onClose, isOpen);
 *
 *   return (
 *     <div ref={sheetRef} {...dragHandlers}>
 *       // ...
 *     </div>
 *   );
 * }
 * ```
 */
export function useDragToClose(
  sheetRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
  isOpen: boolean,
) {
  const dragData = useRef({
    isDragging: false,
    startY: 0,
    currentY: 0,
    sheetHeight: 0,
    canDragToClose: false, // 드래그로 닫기가 가능한지 여부
  });

  // 바텀시트가 열릴 때 transform 상태 초기화
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      // 이전 드래그 상태 제거
      sheetRef.current.style.transform = '';
      sheetRef.current.style.transition = '';
    }
  }, [isOpen, sheetRef]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!sheetRef.current || !isOpen) return;

      const touch = e.touches[0];
      const rect = sheetRef.current.getBoundingClientRect();

      // 터치 시작 위치가 헤더 영역인지 확인
      const target = e.target as Element;
      const isHeaderTouch = target.closest('[data-bottomsheet-header]') !== null;

      // 드래그 닫기 허용 조건:
      // 1. 헤더에서 터치: 항상 허용 (스크롤 위치 무관)
      // 2. 콘텐츠에서 터치: 스크롤이 맨 위에 있을 때만 허용
      let canDragToClose = false;
      if (isHeaderTouch) {
        canDragToClose = true; // 헤더에서는 항상 허용
      } else {
        // 콘텐츠에서는 스크롤 위치 확인
        canDragToClose = !contentRef.current || contentRef.current.scrollTop === 0;
      }

      dragData.current = {
        isDragging: true,
        startY: touch.clientY,
        currentY: touch.clientY,
        sheetHeight: rect.height,
        canDragToClose,
      };

      // 드래그 중 CSS transition 제거
      sheetRef.current.style.transition = 'none';
    },
    [isOpen, sheetRef, contentRef],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragData.current.isDragging || !sheetRef.current) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - dragData.current.startY;

      // 아래쪽으로만 드래그 허용 (위로는 차단)
      if (deltaY < 0) return;

      // 헤더에서 시작했거나 스크롤이 맨 위에 있을 때만 바텀시트 드래그 허용
      if (!dragData.current.canDragToClose) return;

      dragData.current.currentY = touch.clientY;

      // 드래그에 따라 바텀시트 위치 변경
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;

      // 브라우저 기본 동작 방지 (스크롤 등)
      e.preventDefault();
    },
    [sheetRef],
  );

  const handleTouchEnd = useCallback(() => {
    if (!dragData.current.isDragging || !sheetRef.current) return;

    const deltaY = dragData.current.currentY - dragData.current.startY;
    const threshold = dragData.current.sheetHeight * 0.3; // 30% 이상 드래그하면 닫기

    // CSS transition 복원
    sheetRef.current.style.transition = '';

    // 헤더에서 시작했거나 스크롤이 맨 위에 있고 충분히 드래그했을 때만 닫기
    if (dragData.current.canDragToClose && deltaY > threshold) {
      // 충분히 드래그했으면 닫기
      // ✅ 중요: 닫기 전에 transform 초기화
      sheetRef.current.style.transform = '';
      onClose();
    } else {
      // 아니면 원래 위치로 복원
      sheetRef.current.style.transform = '';
    }

    // 드래그 상태 초기화
    dragData.current.isDragging = false;
  }, [onClose, sheetRef]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet || !isOpen) return;

    // 터치 이벤트 등록
    sheet.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      // 이벤트 정리
      sheet.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);

      // ✅ cleanup 시에도 transform 초기화
      if (sheet) {
        sheet.style.transform = '';
        sheet.style.transition = '';
      }
    };
  }, [isOpen, handleTouchStart, handleTouchMove, handleTouchEnd, sheetRef]);

  return {
    dragHandlers: {
      // React 이벤트로도 지원 (추가 호환성)
      onTouchStart: (e: React.TouchEvent) => {
        handleTouchStart(e.nativeEvent);
      },
    },
  };
}
