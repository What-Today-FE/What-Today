import type { Position, Size } from '../types';

/**
 * Calculates the absolute top and left coordinates for positioning a popover content element relative to a trigger element or the viewport.
 *
 * For trigger-relative positions (`top`, `bottom`, `left`, `right`), the coordinates are based on the trigger's bounding rectangle and current scroll offsets. For fixed positions (prefixed with `fixed-`), the coordinates are calculated relative to the viewport, centering or aligning the popover content as specified.
 *
 * @param rect - The bounding rectangle of the trigger element
 * @param position - Desired popover position, either relative to the trigger or fixed within the viewport
 * @param contentSize - The dimensions of the popover content element
 * @returns An object containing the computed `top` and `left` coordinates for the popover content
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
  }
}
