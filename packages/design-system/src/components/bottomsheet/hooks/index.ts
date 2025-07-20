import { useEffect, useRef } from 'react';

import type { BottomSheetMetrics } from '../types';

// 바텀시트가 최대로 올라 갔을 때의 Y좌표 값
const MIN_Y = 60;
// 바텀시트가 최대로 내려갔을 때의 Y좌표 값 (초기값은 window 기준)
const MAX_Y = typeof window !== 'undefined' ? window.innerHeight - 100 : 800;

export function useBottomSheet() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  // 바텀시트 드래그 동작 제어
  useEffect(() => {
    // 콘텐츠 스크롤 여부와 드래그 방향에 따라 바텀시트 이동 가능 여부 결정
    const canUserMoveSheet = () => {
      const { isContentAreaTouched, touchMove } = metrics.current;

      // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 바텀시트를 이동합니다.
      if (!isContentAreaTouched) {
        return true;
      }

      // 바텀 시트가 최대로 올라와 있는 상태가 아니라면 바텀 시트는 움직일 수 있습니다.
      if (sheetRef.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      // 드래그(터치) 하는 상태에서 아래로 스크롤 했을 때 더 이상 스크롤이 불가능한 경우 바텀시트를 내립니다.
      if (touchMove.movingDirection === 'down') {
        return contentRef.current!.scrollTop <= 0;
      }

      // 위의 내용에 해당하지 않는 경우 바텀시트는 움직이지 않습니다.
      return false;
    };

    // 드래그(터치) 시작 시 불려지는 함수
    const handleTouchStart = (e: TouchEvent) => {
      // metrics 객체로부터 touchStart 정보를 가져옵니다.
      const { touchStart } = metrics.current;

      // 현재 바텀시트의 최상단 Y 좌표를 가져와 touchStart에 저장합니다.
      touchStart.sheetY = sheetRef.current!.getBoundingClientRect().y;
      // 터치한 위치의 Y 좌표를 touchStart에 저장합니다.
      touchStart.touchY = e.touches[0].clientY;
    };

    // 드래그(터치)를 유지한 채로 이동할 때 불려지는 함수
    const handleTouchMove = (e: TouchEvent) => {
      // metrics 객체로부터 touchStart와 touchMove 정보를 가져옵니다.
      const { touchStart, touchMove } = metrics.current;
      // 현재 터치 위치를 가져옵니다.
      const currentTouch = e.touches[0];

      // 이전 프레임의 터치 위치가 없을 경우, 터치 시작 위치를 초기값으로 설정합니다.
      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      // 이전 터치 위치와 현재 터치 위치를 비교하여 이동 방향을 결정합니다.
      touchMove.movingDirection = touchMove.prevTouchY < currentTouch.clientY ? 'down' : 'up';

      // 바텀시트를 움직일 수 있을 경우
      if (canUserMoveSheet()) {
        // 브라우저 기본 동작 방지
        e.preventDefault();

        // 손가락이 움직인 거리 = 현재 터치 위치 - 터치 시작 위치
        const offset = currentTouch.clientY - touchStart.touchY;
        // 바텀시트의 다음 위치를 계산: 시작 위치 + 이동 거리
        let nextY = touchStart.sheetY + offset;

        // 바텀시트의 높이는 최소 MIN_Y와 최대 MAX_Y 사이로 제한합니다.
        if (nextY < MIN_Y) {
          nextY = MIN_Y;
        }
        if (nextY > MAX_Y) {
          nextY = MAX_Y;
        }

        // 바텀시트의 실제 위치를 변경하는 부분
        // nextY는 화면 기준 Y 좌표이며, translateY는 기준점이 0이므로
        // 바닥 위치(MAX_Y)에서 상대 이동거리만큼 빼서 translateY로 적용
        // 즉: translateY는 시트를 "아래로 얼마나 이동할지"를 지정하는 값이므로
        // 화면 상의 위치 Y (nextY) - 최대 Y (MAX_Y) = 실제 이동 거리
        sheetRef.current!.style.transform = `translateY(${nextY - MAX_Y}px)`;
      } else {
        // 컨텐츠를 스크롤하는 동안에는 body가 스크롤 되는 것을 막는다.
        document.body.style.overflowY = 'hidden';
      }
    };

    // 드래그(터치) 종료 시 불려지는 함수
    const handleTouchEnd = () => {
      // 콘텐츠가 스크롤 가능하도록 다시 body의 스크롤을 복구
      document.body.style.overflowY = 'auto';

      // 사용자가 손가락을 위로 뗐는지, 아래로 뗐는지 방향 정보 가져오기
      const { movingDirection } = metrics.current.touchMove;

      // 드래그(터치)가 끝난 후 바텀시트의 최상단 모서리 Y 좌표를 가져옵니다.
      const currentY = sheetRef.current!.getBoundingClientRect().y;

      // 바텀시트가 최대로 올라간 상태가 아니라면, 드래그 방향에 따라 바텀시트를 올리거나 내립니다.
      if (currentY !== MIN_Y) {
        // 아래로 스크롤 하는 경우 바텀시트가 가장 작은 크기로 축소됩니다.(원래 크기)
        if (movingDirection === 'down') {
          sheetRef.current!.style.transform = 'translateY(0)';
        } else if (movingDirection === 'up') {
          // 위로 스크롤 하는 경우 바텀시트가 최대로 올라갑니다.
          sheetRef.current!.style.transform = `translateY(${MIN_Y - MAX_Y}px)`;
        }
      }

      // 드래그(터치)에 사용된 내부 상태값 초기화
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };

    // sheet 요소 참조를 가져와 이벤트 리스너를 등록합니다.
    const sheetEl = sheetRef.current;
    // sheetEl이 존재하지 않으면 이벤트 리스너를 등록하지 않습니다. (예: 컴포넌트가 마운트되지 않은 경우)
    if (!sheetEl) return;

    // 바텀시트에 터치 이벤트 리스너 등록
    sheetEl.addEventListener('touchstart', handleTouchStart); // 터치 시작 시 로직 실행
    sheetEl.addEventListener('touchmove', handleTouchMove); // 터치 이동 중 로직 실행
    sheetEl.addEventListener('touchend', handleTouchEnd); // 터치 종료 시 로직 실행

    // 컴포넌트 언마운트 시 또는 리렌더링 시 이전 이벤트 리스너 정리(clean-up)
    return () => {
      sheetEl.removeEventListener('touchstart', handleTouchStart);
      sheetEl.removeEventListener('touchmove', handleTouchMove);
      sheetEl.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // 콘텐츠 영역에서 터치 시작 여부 추적
  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };
    contentRef.current?.addEventListener('touchstart', handleTouchStart);
  }, []);

  // 바텀시트 wrapper와 content 영역 ref 반환
  return { sheetRef, contentRef };
}
