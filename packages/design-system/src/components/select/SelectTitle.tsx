import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/**
 * Renders a styled title for a Select component.
 *
 * Displays its children as the title content and allows additional styling through the `className` prop, which is merged with default styles.
 *
 * @param children - The content to display as the title
 * @param className - Optional additional CSS classes for custom styling
 *
 * @example
 * <Select.Title>Choose a fruit</Select.Title>
 */
function SelectTitle({ children, className }: BaseProps) {
  return <p className={twMerge('text-xl font-bold', className)}>{children}</p>;
}

export const Title = SelectTitle;
