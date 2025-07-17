import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/** SelectGroup
 * @description Select 내에서 여러 항목들을 시각적으로 그룹화할 때 사용하는 Wrapper 컴포넌트입니다.
 *
 * @param {ReactNode} props.children - 그룹에 포함될 Select.Item, Select.Label 또는 기타 컴포넌트
 * @param {string} [props.className] - 스타일 확장용 className
 */
function SelectGroup({ children, className }: BaseProps) {
  return <div className={twMerge('my-4', className)}>{children}</div>;
}

export const Group = SelectGroup;
