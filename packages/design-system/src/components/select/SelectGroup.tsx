import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/**
 * Visually groups multiple items within a Select component.
 *
 * Renders a wrapper for grouping elements such as `Select.Item`, `Select.Label`, or other components inside a Select, allowing for additional styling via the `className` prop.
 *
 * @param children - The elements to be grouped within the Select component
 * @param className - Optional additional class names for custom styling
 */
function SelectGroup({ children, className }: BaseProps) {
  return <div className={(twMerge('my-4'), className)}>{children}</div>;
}

export const Group = SelectGroup;
