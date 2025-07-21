import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { useSelectContext } from './context';
import type { BaseProps } from './types';

/** SelectItem
 * @description Select 컴포넌트에서 선택 가능한 항목을 나타내는 컴포넌트입니다.
 * 클릭 시 상위 Select 컨텍스트로 선택한 `value`와 `label(children)`을 전달합니다.
 *
 * @param {string} props.value - 선택 항목의 고유한 값 (value)
 * @param {ReactNode} props.children - 화면에 표시될 항목의 라벨
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Select.Item value="apple">Apple</Select.Item>
 * <Select.Item value="banana" className="text-red-500">Banana</Select.Item>
 * ```
 */
function SelectItem({ value, children, className }: BaseProps & { value: string }) {
  const { handleClickItem } = useSelectContext();

  return (
    <div
      className={twMerge('hover:bg-primary-100 rounded-xl p-10 break-words', className)}
      role='option'
      tabIndex={0}
      onClick={() => handleClickItem(value, children)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClickItem(value, children);
        }
      }}
    >
      {children}
    </div>
  );
}

export const Item = memo(SelectItem);
