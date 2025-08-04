import { twMerge } from 'tailwind-merge';

import { useSelectContext } from './context';

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

/** SelectValue
 * @description Select.Trigger 내부에서 Select에서 현재 선택된 항목의 label을 렌더링하는 컴포넌트입니다.
 * 선택된 항목이 없을 경우, `placeholder` 텍스트를 표시하며, `className`으로 스타일 확장이 가능합니다.
 *
 * <Select> 외부로 관리하는 값을 직접 사용하면 Select.Value를 생략할 수도 있습니다.
 *
 * @param {string} [placeholder="값을 선택해주세요"] - 선택된 값이 없을 때 표시할 텍스트
 * @param {string} [className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Select.Trigger>
 *   <Select.Value placeholder="선택하세요" />
 * </Select.Trigger>
 * ```
 */
function SelectValue({ placeholder = '값을 선택해주세요', className }: SelectValueProps) {
  const { selectedItem } = useSelectContext();

  return selectedItem?.label ? (
    <p>{selectedItem.label}</p>
  ) : (
    <p className={twMerge('text-gray-400', className)}>{placeholder}</p>
  );
}

export const Value = SelectValue;
