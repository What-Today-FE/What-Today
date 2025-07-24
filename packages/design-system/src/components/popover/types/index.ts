import type { ReactNode, RefObject } from 'react';

/**
 * @description Popover의 방향을 지정하는 값
 * - 기본 위치: Trigger를 기준으로 한 상대 위치 (top, bottom, left, right)
 * - fixed-* 위치: 뷰포트를 기준으로 고정된 위치
 */
export type Position =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'fixed-top-left'
  | 'fixed-top-center'
  | 'fixed-top-right'
  | 'fixed-center-left'
  | 'fixed-center-center'
  | 'fixed-center-right'
  | 'fixed-bottom-left'
  | 'fixed-bottom-center'
  | 'fixed-bottom-right'
  | 'corner-bottom-left'
  | 'bottom-right'
  | 'bottom-center';

/**
 * @description Popover.Content의 크기 (px 단위)
 */
export type Size = { width: number; height: number };

/**
 * @description Popover.Content의 위치 좌표 (top, left는 px 단위)
 */
export type Coords = {
  top?: number;
  left?: number;
};

export interface PopoverContextType {
  /** Popover가 열려 있는지 여부 */
  open: boolean;
  /** Popover의 열림 상태를 제어하는 함수 */
  setOpen: (v: boolean) => void;
  /** Popover.Trigger의 DOM 참조 */
  triggerRef: RefObject<HTMLDivElement | null>;
  /** Popover.Content의 DOM 노드를 감지하고 크기를 계산하는 ref 콜백 */
  handleContentRef: (node: HTMLDivElement | null) => void;
  /** Popover.Content가 화면에서 렌더링될 위치 (top/left) */
  contentCoords: Coords;
  /** Popover.Content의 실제 렌더링된 크기 */
  contentSize: { width: number; height: number };
  /** Popover가 렌더링될 방향 또는 위치 */
  direction: Position;
  /** Trigger 요소의 너비 값 */
  triggerWidth: number | null;
}

/**
 * @description 공통 props 타입
 */
export interface BaseProp {
  children: ReactNode;
  className?: string;
}
