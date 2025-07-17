import { twMerge } from 'tailwind-merge';

import { useSelectContext } from './context';

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

/**
 * Displays the label of the currently selected item within a select component, or a placeholder if no selection is made.
 *
 * Renders the selected item's label when present; otherwise, shows the provided `placeholder` text with default gray styling. Additional styles can be applied via the `className` prop. Intended for use inside `Select.Trigger` to reflect the current selection state.
 *
 * @param placeholder - Text to display when no item is selected (defaults to "값을 선택해주세요")
 * @param className - Additional CSS classes for styling the placeholder
 *
 * @example
 * <Select.Trigger>
 *   <Select.Value placeholder="선택하세요" />
 * </Select.Trigger>
 */
function SelectValue({ placeholder = '값을 선택해주세요', className }: SelectValueProps) {
  const { selectedItem } = useSelectContext();

  return selectedItem?.label ? (
    <p>{selectedItem.label}</p>
  ) : (
    <p className={twMerge('text-gray-300', className)}>{placeholder}</p>
  );
}

export const Value = SelectValue;
