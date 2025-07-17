import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/**
 * Renders a styled label for grouping or titling sections within a Select component.
 *
 * Displays its children inside a paragraph element with default gray text and padding, allowing additional styling via the `className` prop.
 *
 * @param children - The content to display as the label
 * @param className - Optional additional class names for custom styling
 *
 * @example
 * <Select.Label>Fruits</Select.Label>
 */
function SelectLabel({ children, className }: BaseProps) {
  return <p className={twMerge('px-10 py-4 text-sm text-gray-300', className)}>{children}</p>;
}

export const Label = SelectLabel;
