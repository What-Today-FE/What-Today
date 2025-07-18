import { createContext, useContext } from 'react';

import type { MainCardContextType } from './types';

const MainCardContext = createContext<MainCardContextType | null>(null);

export function useMainCardContext() {
  const context = useContext(MainCardContext);
  if (!context) throw new Error('<MainCard.*> 컴포넌트는 <MainCard> 내부에서 사용되어야 합니다.');
  return context;
}

export default MainCardContext;
