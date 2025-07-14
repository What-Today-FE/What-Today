import { type ChangeEvent, memo, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useInputContext } from './context';
import type { InputTextareaProps } from './type';

/** InputTextarea
 * @description ⚠️ 실제 textarea 태그로, Input.Wrapper 안에서 사용됩니다.
 * @description autoHeight 옵션을 사용하면 입력 내용에 따라 높이가 자동으로 조절됩니다.
 *
 * @param {InputTextareaProps} props - HTML textarea 속성 + ref + autoHeight 옵션
 * @param {boolean} autoHeight - true인 경우 입력 내용에 따라 높이가 자동으로 조절됩니다.
 *
 * @example
 * <Input.Textarea
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="자기소개를 입력해주세요"
 *   autoHeight
 * />
 */
function InputTextarea({ autoHeight = false, value, onChange, ref, className, ...props }: InputTextareaProps) {
  const { error, id, setIsFocused, disabled } = useInputContext();
  // 내부 ref를 생성
  const innerRef = useRef<HTMLTextAreaElement>(null);
  // 외부 ref와 내부 ref를 연결
  useImperativeHandle(ref, () => innerRef.current!, []);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // 입력에 따른 textarea 크기 조정
    if (autoHeight && innerRef.current) {
      innerRef.current.style.height = 'auto';
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    }

    onChange?.(event);
  };

  return (
    <textarea
      ref={innerRef}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={!!error}
      className={twMerge('min-h-[40px] flex-1 resize-none placeholder:text-gray-400 focus:outline-none', className)}
      disabled={disabled}
      id={id}
      value={value}
      onBlur={() => setIsFocused?.(false)}
      {...(autoHeight ? { onChange: handleInputChange } : { onChange })}
      onFocus={() => setIsFocused?.(true)}
      {...props}
    />
  );
}
export const Textarea = memo(InputTextarea);
