import { memo } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { useInputContext } from './context';
import type { InputSubComponentProps } from './type';

/** InputWrapper
 * @description Wrapper 컴포넌트로, 내부에서 Field와 Icon을 자유롭게 조합해서 사용할 수 있습니다.
 * @description ⚠️ Field만 사용하더라도 필수적으로 사용해야 합니다.
 * @param {InputSubComponentProps} props - className, children
 */
function InputWrapper({ className, children }: InputSubComponentProps) {
  const { error, isFocused, disabled } = useInputContext();

  const BASE_CLASSNAME = twJoin(
    'flex items-center gap-8 rounded-xl border px-20 py-10 bg-white',
    error ? 'border-red-500' : 'border-gray-100',
    isFocused && 'border-gray-400',
    disabled && 'cursor-not-allowed',
  );

  return <div className={twMerge(BASE_CLASSNAME, className)}>{children}</div>;
}
export const Wrapper = memo(InputWrapper);
