import { twJoin, twMerge } from 'tailwind-merge';

import { useInputContext } from './context';
import type { TextCounterProps } from './type';

/** TextCounter
 * @description 현재 입력된 글자 수와 최대 글자 수를 표시하는 UI 컴포넌트입니다.
 * error 상태일 경우 absolute 위치(`bottom-0 right-0`) 스타일이 자동 적용됩니다.
 * @description ⚠️ Input.Wrapper 외부에서 사용합니다. Input.ErrorMessage와 순서는 상관 없습니다.
 * @description ⚠️ 단순 UI용으로, 실제 maxLength는 Input.Field나 Input.Textarea에 설정합니다.
 *
 * @param {TextCounterProps} props
 * @param {number} props.length - 현재 입력된 글자 수 (필수)
 * @param {number} props.maxLength - 최대 입력 가능 글자 수 (생략 가능)
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * <Input.TextCounter length={value.length} maxLength={100} />
 */
export function TextCounter({ length = 0, maxLength, className }: TextCounterProps) {
  const { error } = useInputContext();
  return (
    <p className={twMerge(twJoin('text-md ml-auto text-gray-400', error && 'absolute right-0 bottom-0'), className)}>
      {length}
      {maxLength !== undefined && <span> / {maxLength}</span>}
    </p>
  );
}
