import { ChevronIcon } from '@components/icons';
import { Popover } from '@components/popover';
import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/**
 * Renders a styled trigger element for a Select component that toggles an associated Popover when clicked.
 *
 * Displays the provided content and a downward chevron icon inside a customizable container. The trigger behavior is delegated to a `<div>` using `Popover.Trigger` with `asChild`.
 *
 * @param children - Content to display inside the trigger, typically the selected value
 * @param className - Optional additional class names for custom styling
 *
 * @example
 * <Select.Trigger>
 *   <Select.Value />
 * </Select.Trigger>
 */
function SelectTrigger({ className, children }: BaseProps) {
  return (
    <Popover.Trigger asChild>
      <div
        className={twMerge(
          'flex items-center justify-between rounded-xl border border-gray-100 bg-white px-15 py-10',
          className,
        )}
      >
        {children}
        <ChevronIcon direction='bottom' />
      </div>
    </Popover.Trigger>
  );
}

export const Trigger = SelectTrigger;
