import { createContext, useContext } from 'react';

import type { SelectContextType } from '../types';

export const SelectContext = createContext<SelectContextType | null>(null);

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) throw new Error('Select components must be used inside <Select>');
  return context;
}
