import { Popover } from '@components/popover';
import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/**
 * Renders the dropdown list of selectable options for a Select component.
 *
 * Displays its children inside a scrollable popover container, extending `Popover.Content`. The dropdown matches the trigger width and supports additional styling via the `className` prop.
 *
 * @param children - The selectable items or groups to display within the dropdown.
 * @param className - Optional additional class names for custom styling.
 *
 * @example
 * <Select.Content>
 *   <Select.Item value="apple">Apple</Select.Item>
 *   <Select.Item value="banana">Banana</Select.Item>
 * </Select.Content>
 */
function SelectContent({ className, children }: BaseProps) {
  return (
    <Popover.Content
      matchTriggerWidth
      className={twMerge(
        'mt-4 max-h-300 overflow-y-scroll rounded-2xl border border-gray-100 bg-white p-10',
        className,
      )}
    >
      {children}
    </Popover.Content>
  );
}

export const Content = SelectContent;
