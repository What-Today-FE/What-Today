import { createContext, useContext } from 'react';

import type { BottomSheetContextType } from './types';

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export function useBottomSheetContext() {
  const context = useContext(BottomSheetContext);
  if (!context) throw new Error('BottomSheet 내부에서만 사용 가능합니다.');
  return context;
}
