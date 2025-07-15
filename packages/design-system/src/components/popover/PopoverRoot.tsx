import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { PopoverContext } from './PopoverContext';
import type { Coords, Position } from './types';
import { getPopoverPosition } from './utils/popoverPosition';

function PopoverRoot({
  children,
  direction = 'bottom',
  className,
}: {
  children: ReactNode;
  direction?: Position;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const [dropdownSize, setDropdownSize] = useState({ width: 0, height: 0 });
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownElementRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useCallback(
    (node: HTMLDivElement | null) => {
      dropdownElementRef.current = node;
      if (node && open) {
        const { width, height } = node.getBoundingClientRect();
        setDropdownSize({ width, height });
      }
    },
    [open],
  );

  useEffect(() => {
    if (!open || !buttonRef.current || !dropdownSize.width || !dropdownSize.height) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const nextCoords = getPopoverPosition(rect, direction, dropdownSize);

      setCoords((prev) => {
        const isSame = prev.top === nextCoords.top && prev.left === nextCoords.left;
        return isSame ? prev : nextCoords;
      });
    };

    updatePosition(); // 최초 위치 계산

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(buttonRef.current);

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, direction, dropdownSize]);

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setTriggerWidth(width);
    });

    observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownElementRef.current &&
        !dropdownElementRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

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
        buttonRef,
        dropdownRef,
        coords,
        dropdownSize,
        direction,
        triggerWidth,
      }}
    >
      <div className={twMerge('relative', className)}>{children}</div>
    </PopoverContext.Provider>
  );
}

export const Root = PopoverRoot;
