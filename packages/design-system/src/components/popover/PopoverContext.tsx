import { createContext, useContext } from 'react';

import type { PopoverContextType } from './types';

export const PopoverContext = createContext<PopoverContextType | null>(null);

/**
 * Retrieves the current Popover context.
 *
 * Throws an error if called outside of a `<Popover>` provider, ensuring that popover components are used within the correct context.
 * 
 * @returns The current PopoverContextType value from the nearest `<Popover>` provider
 */
export function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('Popover components must be used inside <Popover>');
  return context;
}
