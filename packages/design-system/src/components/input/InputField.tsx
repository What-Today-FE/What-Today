import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { useInputContext } from './context';
import type { InputFieldProps } from './type';

/** InputField
 * @description ⚠️ 실제 input 태그로, Wrapper 안에서 사용할 수 있습니다.
 * @param {InputFieldProps} props - HTML input 속성 + ref
 *
 * @example
 * <Input.Field value={value} onChange={onChange} placeholder="이메일 입력" />
 */
function InputField({ value, onChange, ref, type = 'text', className, ...props }: InputFieldProps) {
  const { error, id, setIsFocused, disabled } = useInputContext();
  return (
    <input
      ref={ref}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={!!error}
      className={twMerge('flex-1 placeholder:text-gray-400 focus:outline-none', className)}
      disabled={disabled}
      id={id}
      type={type}
      value={value}
      onBlur={() => setIsFocused?.(false)}
      onChange={onChange}
      onFocus={() => setIsFocused?.(true)}
      {...props}
    />
  );
}
export const Field = memo(InputField);
