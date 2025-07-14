import { createContext, useContext } from 'react';

import type { InputContextType } from '../type';

/** InputContext
 * @description Input 컴포넌트 전체에서 공유되는 컨텍스트입니다.
 */
export const InputContext = createContext<InputContextType | null>(null);

/** useInputContext
 * @description InputContext를 사용하는 커스텀 훅입니다. 외부에서 사용 시 오류가 발생합니다.
 */
export function useInputContext() {
  const context = useContext(InputContext);
  if (!context) throw new Error('Input components must be used inside <Input>');
  return context;
}
