import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/** SelectLabel
 * @description Select 그룹 내에서 항목들을 구분하거나 섹션의 제목 역할을 하는 Label 컴포넌트입니다.
 * 기본적으로 회색 글씨 스타일로 렌더링되며, `className`을 통해 스타일 확장이 가능합니다.
 *
 * @param {ReactNode} props.children - 레이블로 표시할 내용
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Select.Label>과일</Select.Label>
 * ```
 */
function SelectLabel({ children, className }: BaseProps) {
  return <p className={twMerge('px-10 py-4 text-sm text-gray-300', className)}>{children}</p>;
}

export const Label = SelectLabel;
