import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { useSelectContext } from './context';
import type { BaseProps } from './types';

/**
 * Represents a selectable item within a Select component.
 *
 * When clicked, notifies the parent Select component of the selected value and label.
 *
 * @param value - The unique identifier for this selectable item.
 * @param children - The label to display for this item.
 * @param className - Optional additional CSS classes for styling.
 *
 * @example
 * <Select.Item value="apple">Apple</Select.Item>
 * <Select.Item value="banana" className="text-red-500">Banana</Select.Item>
 */
function SelectItem({ value, children, className }: BaseProps & { value: string }) {
  const { handleClickItem } = useSelectContext();

  return (
    <div
      className={twMerge('hover:bg-primary-100 rounded-xl p-10 break-words', className)}
      onClick={() => handleClickItem(value, children)}
    >
      {children}
    </div>
  );
}

export const Item = memo(SelectItem);
