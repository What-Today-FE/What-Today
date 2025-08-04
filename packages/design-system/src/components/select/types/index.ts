import type { ReactNode } from 'react';

export type SelectItem = {
  value: string;
  label: ReactNode;
} | null;

export interface SelectContextType {
  handleClickItem: (value: string, label: ReactNode) => void;
  selectedItem: SelectItem | null;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  disabled?: boolean;
}

export interface BaseProps {
  className?: string;
  children: ReactNode;
}
