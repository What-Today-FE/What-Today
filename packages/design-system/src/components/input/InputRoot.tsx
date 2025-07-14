import { memo, useId, useMemo, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { InputContext } from './context';
import type { InputRootProps } from './type';

const INPUT_SIZE = {
  xl: 'w-740',
  lg: 'w-700',
  md: 'w-640',
  sm: 'w-470',
  xs: 'w-320',
  full: 'w-full',
};

/** InputRoot
 * @description Input 컴포넌트의 Root로, 합성 컴포넌트로 구현했습니다.
 * @param {InputRootProps} props - id, size, className, disabled, error, children
 *
 * @example
 * <Input.Root size="sm" error="에러입니다.">
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Wrapper>
 *     <Input.Field />
 *   </Input.Wrapper>
 *   <Input.ErrorMessage />
 * </Input.Root>
 */
function InputRoot({ id, size = 'md', className, disabled, error, children }: InputRootProps) {
  const randomId = useId();
  id = id ?? randomId;
  const [isFocused, setIsFocused] = useState(false);

  const contextValue = useMemo(
    () => ({
      id,
      size,
      className,
      isFocused,
      setIsFocused,
      disabled,
      error,
    }),
    [id, size, className, isFocused, disabled, error],
  );

  return (
    <InputContext.Provider value={contextValue}>
      <div className={twMerge(twJoin('relative flex flex-col', INPUT_SIZE[size]), className)}>{children}</div>
    </InputContext.Provider>
  );
}
export const Root = memo(InputRoot);
