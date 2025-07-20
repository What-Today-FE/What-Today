import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/** SelectTitle
 * @description Select 컴포넌트 상단에 제목을 나타내기 위한 컴포넌트입니다. `className`으로 스타일 확장이 가능합니다.
 *
 * @param {ReactNode} props.children - 제목으로 표시할 내용
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Select.Title>과일을 선택하세요</Select.Title>
 * ```
 */
function SelectTitle({ children, className }: BaseProps) {
  return <p className={twMerge('text-18 mb-4 font-bold text-gray-950', className)}>{children}</p>;
}

export const Title = SelectTitle;
