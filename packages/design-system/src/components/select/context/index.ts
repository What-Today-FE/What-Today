import { createContext, useContext } from 'react';

import type { SelectContextType } from '../types';

export const SelectContext = createContext<SelectContextType | null>(null);

/**
 * Retrieves the current Select context value.
 *
 * Throws an error if used outside of a `<Select>` component that provides the context.
 * @returns The current Select context object
 */
export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) throw new Error('Select components must be used inside <Select>');
  return context;
}
