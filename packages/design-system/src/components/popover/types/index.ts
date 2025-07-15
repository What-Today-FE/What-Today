import type { ReactNode, RefObject } from 'react';

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
  | 'fixed-bottom-right';

export type Coords = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export interface PopoverContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
  buttonRef: RefObject<HTMLDivElement | null>;
  dropdownRef: (node: HTMLDivElement | null) => void;
  coords: Coords;
  dropdownSize: { width: number; height: number };
  direction: Position;
  triggerWidth: number | null;
}

export interface ChildrenProp {
  children: ReactNode;
}
