import type { Position, Size } from '../types';

/** getPopoverPosition
 * @description Popover.Trigger 위치 기반  or 뷰포트 기반 Popover.Content의 위치 계산
 *
 * @param rect : Popover.Trigger 위치 (triggerPosition)
 * @param position : top | bottom | left | right : Popover.Trigger 기반 & fixed- : 뷰포트 기반
 * @param contentSize : Popover.Content의 크기
 * @returns Popover.Content의 좌표 위치 (top, left)
 */
export function getPopoverPosition(rect: DOMRect, position: Position, contentSize: Size) {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (position) {
    case 'top':
      return {
        top: rect.top + scrollY - contentSize.height,
        left: rect.left + scrollX,
      };
    case 'bottom':
      return {
        top: rect.bottom + scrollY,
        left: rect.left + scrollX,
      };
    case 'left':
      return {
        top: rect.top + scrollY,
        left: rect.left + scrollX - contentSize.width,
      };
    case 'right':
      return {
        top: rect.top + scrollY,
        left: rect.right + scrollX,
      };
    case 'fixed-top-left':
      return {
        top: 0,
        left: 0,
      };
    case 'fixed-top-center':
      return {
        top: 0,
        left: (viewportWidth - contentSize.width) / 2,
      };
    case 'fixed-top-right':
      return {
        top: 0,
        left: viewportWidth - contentSize.width,
      };
    case 'fixed-center-left':
      return {
        top: (viewportHeight - contentSize.height) / 2,
        left: 0,
      };
    case 'fixed-center-center':
      return {
        top: (viewportHeight - contentSize.height) / 2,
        left: (viewportWidth - contentSize.width) / 2,
      };
    case 'fixed-center-right':
      return {
        top: (viewportHeight - contentSize.height) / 2,
        left: viewportWidth - contentSize.width,
      };
    case 'fixed-bottom-left':
      return {
        top: viewportHeight - contentSize.height,
        left: 0,
      };
    case 'fixed-bottom-center':
      return {
        top: viewportHeight - contentSize.height,
        left: (viewportWidth - contentSize.width) / 2,
      };
    case 'fixed-bottom-right':
      return {
        top: viewportHeight - contentSize.height,
        left: viewportWidth - contentSize.width,
      };
    case 'corner-bottom-left':
      return {
        top: rect.bottom + scrollY,
        left: rect.left + scrollX - contentSize.width,
      };
    case 'bottom-right':
      return {
        top: rect.bottom + scrollY,
        left: rect.right + scrollX - contentSize.width,
      };
    case 'bottom-center':
      return {
        top: rect.bottom + scrollY,
        left: (window.innerWidth - contentSize.width) / 2,
      };
    default:
      return {
        top: rect.bottom + scrollY,
        left: rect.left + scrollX,
      };
  }
}
