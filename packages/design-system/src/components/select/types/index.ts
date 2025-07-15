import type { ReactNode } from 'react';

export type SelectItem = {
  value: string;
  label: ReactNode;
} | null;

export interface SelectContextType {
  handleClickItem: (value: string, label: ReactNode) => void;
  selectedItem: SelectItem;
}
