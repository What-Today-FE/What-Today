import { createContext, useContext } from 'react';

import type { PopoverContextType } from './types';

export const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('Popover components must be used inside <Popover>');
  return context;
}
