import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { useInputContext } from './context';
import type { InputSubComponentProps } from './type';

/** InputLabel
 * @description Label 컴포넌트로, input과 label을 id로 연결합니다.
 * @param {InputSubComponentProps} props
 */
function InputLabel({ className, children }: InputSubComponentProps) {
  const { id } = useInputContext();
  return (
    <label className={twMerge('mb-4 block', className)} htmlFor={id}>
      {children}
    </label>
  );
}
export const Label = memo(InputLabel);
