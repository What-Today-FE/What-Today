import type { Position } from '../types';

export function getPopoverPosition(rect: DOMRect, position: Position, dropdownSize: { width: number; height: number }) {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (position) {
    case 'top':
      return {
        top: rect.top + scrollY - dropdownSize.height,
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
        left: rect.left + scrollX - dropdownSize.width,
      };
    case 'right':
      return {
        top: rect.top + scrollY,
        left: rect.right + scrollX,
      };
    case 'fixed-top-left':
      return {
        top: scrollY,
        left: 0,
      };
    case 'fixed-top-center':
      return {
        top: scrollY,
        left: scrollX + (viewportWidth - dropdownSize.width) / 2,
      };
    case 'fixed-top-right':
      return {
        top: scrollY,
        left: window.innerWidth - dropdownSize.width,
      };
    case 'fixed-center-left':
      return {
        top: scrollY + (viewportHeight - dropdownSize.height) / 2,
        left: 0,
      };
    case 'fixed-center-center':
      return {
        top: scrollY + (viewportHeight - dropdownSize.height) / 2,
        left: scrollX + (viewportWidth - dropdownSize.width) / 2,
      };
    case 'fixed-center-right':
      return {
        top: scrollY + (viewportHeight - dropdownSize.height) / 2,
        left: scrollX + viewportWidth - dropdownSize.width,
      };
    case 'fixed-bottom-left':
      return {
        top: scrollY + viewportHeight - dropdownSize.height,
        left: 0,
      };
    case 'fixed-bottom-center':
      return {
        top: scrollY + viewportHeight - dropdownSize.height,
        left: scrollX + (viewportWidth - dropdownSize.width) / 2,
      };
    case 'fixed-bottom-right':
      return {
        top: scrollY + viewportHeight - dropdownSize.height,
        left: scrollX + viewportWidth - dropdownSize.width,
      };
  }
}
