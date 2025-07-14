import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { useInputContext } from './context';

/** InputErrorMessage
 * @description 에러 메시지 출력 컴포넌트로, error가 없으면 null 반환.
 * @param {{ className?: string }} props - className
 */
function InputErrorMessage({ className }: { className?: string }) {
  const { id, error } = useInputContext();
  if (!error) return null;
  return (
    <p className={twMerge('text-md text-red-500', className)} id={`${id}-error`} role='alert'>
      {error}
    </p>
  );
}
export const ErrorMessage = memo(InputErrorMessage);
