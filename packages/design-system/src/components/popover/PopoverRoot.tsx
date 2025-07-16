import { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { PopoverContext } from './PopoverContext';
import type { BaseProp, Coords, Position } from './types';
import { getPopoverPosition } from './utils/popoverPosition';

interface PopoverRootProps extends BaseProp {
  direction?: Position; // Popover가 뜰 위치 (ex. Trigger 기준 => 'bottom' / 뷰포트 기준 => 'fixed-top-center')
}

function PopoverRoot({ children, direction = 'bottom', className }: PopoverRootProps) {
  const [open, setOpen] = useState(false); // Popover 열고 닫힘 상태
  const [contentCoords, setContentCoords] = useState<Coords>({ top: 0, left: 0 }); // ? Popover.Content의 좌표
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null); // Popover.Trigger의 크기
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 }); // Popover.Content의 크기

  const triggerRef = useRef<HTMLDivElement | null>(null); // Popover.Trigger의 Ref
  const contentElementRef = useRef<HTMLDivElement | null>(null); // ? Popover.Content의 Ref
  /** handleContentRef
   * useCallback: open 값이 변경되지 않으면 리렌더링 되지 않도록.
   * ref가 DOM에 연결될 때 React가 이 함수에 해당 DOM 노드를 넘긴다. => 여기에서는 Popover.Content의 크기를 계산합니다.
   * DOM 노드를 ref에 담아 저장하며, DOM 요소의 렌더링된 실제 크기와 위치를 계산한다. (getBoundingClientRect())
   * 측정한 크기를 setContentSize에 저장합니다.
   *
   * 즉, contentRef는 popover로 화면에 content가 나타났을 때 크기를 측정하기 위한 용도이고,
   * contentElementRef는 그 DOM을 나중에 참조하기 위한 것.
   */
  const handleContentRef = useCallback(
    (node: HTMLDivElement | null) => {
      contentElementRef.current = node;
      if (node && open) {
        const { width, height } = node.getBoundingClientRect(); // 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환
        setContentSize({ width, height });
      }
    },
    [open],
  );

  useEffect(() => {
    if (!open || !triggerRef.current || !contentSize.width || !contentSize.height) return; // popover가 닫혀있거나, Trigger 혹은 Content의 내용이 없으면 생략

    const updateContentPosition = () => {
      const triggerPosition = triggerRef.current!.getBoundingClientRect(); // triggerRef의 DOM 위치 및 크기 정보를 가져옴
      const nextContentCoords = getPopoverPosition(triggerPosition, direction, contentSize); // Popover가 어디에 위치할지 계산 (triggerRef, contentSize 기반 혹은 뷰포트 기준 direction)

      // 계산된 Popover.Content 좌표 업데이트
      setContentCoords((prev) => {
        // Popover의 위치는 스크롤, 창 크기 변화 등으로 자주 변경될 수 있어서, isSame으로 불필요한 렌더링 방지
        const isSame = prev.top === nextContentCoords.top && prev.left === nextContentCoords.left;
        return isSame ? prev : nextContentCoords;
      });
    };

    updateContentPosition(); // Popover.Content의 최초 위치 계산

    const resizeObserver = new ResizeObserver(updateContentPosition); // DOM 요소의 크기 변화를 감지하는 브라우저 API
    resizeObserver.observe(triggerRef.current); // resizeObserver.observe() : DOM 요소의 크기 변화에 따라서 콜백을 실행해주는 브라우저 API

    // 스크롤하거나 브라우저 창 사이즈가 변경되었을 때 Popover.Content의 위치 업데이트
    window.addEventListener('scroll', updateContentPosition, true);
    window.addEventListener('resize', updateContentPosition);

    // 컴포넌트가 언마운트될 때 cleanup : observer 감시를 종료하고 이벤트 리스너 제거
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateContentPosition, true);
      window.removeEventListener('resize', updateContentPosition);
    };
  }, [open, direction, contentSize]);

  /**
   * 만약 useEffect로 바꿔서 오류가 생기면 useLayoutEffect로 변경할 예정
   * useLayoutEffect() : 브라우저 페인팅 전에 동기적으로 실행으로 권장되지 않음 (useEffect는 브라우저 페인팅 후 비동기적으로 실행)
   */
  useEffect(() => {
    if (!triggerRef.current) return; // triggerRef가 없다면 생략

    // entries는 ResizeObserver 콜백의 첫 매개변수로, 크기 변화가 감지된 모든 요소들의 정보를 담고 있음
    const triggerObserver = new ResizeObserver((entries) => {
      // 크기 변화가 감지된 첫 번째 요소의 width를 추출 => Popover.Trigger로 한정지었기 때문에 크기 변화 감지는 trigger만 가능 => 추가 필터링 X
      const width = entries[0].contentRect.width;
      // 바뀐 Popover.Trigger의 크기 저장 (ex. 반응형으로 Popover.Trigger의 크기가 줄어들었을 때)
      setTriggerWidth(width);
    });

    // triggerRef 감시
    triggerObserver.observe(triggerRef.current);

    // 컴포넌트가 언마운트될 때 cleanup : observer 감시를 종료
    return () => triggerObserver.disconnect();
  }, []);

  // Popover가 열려있을 때 닫힘 관련 설정
  useEffect(() => {
    if (!open) return;

    // esc 키를 누르면 Popover 닫힘
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    // Popover 외부 영역을 누르면 Popover 닫힘 (Popover에서는 스크롤 방지 제외)
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentElementRef.current &&
        !contentElementRef.current.contains(target) && // Popover.Content 외부 영역 클릭
        triggerRef.current &&
        !triggerRef.current.contains(target) // Popover.Trigger 외부 영역 클릭
      ) {
        setOpen(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    // 이벤트 리스너 cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        handleContentRef,
        contentCoords,
        contentSize,
        direction,
        triggerWidth,
      }}
    >
      <div className={twMerge('relative', className)}>{children}</div>
    </PopoverContext.Provider>
  );
}

export const Root = PopoverRoot;
