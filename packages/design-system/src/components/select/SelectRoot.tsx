import { Popover } from '@components/popover';
import { type ReactNode, useState } from 'react';

import { SelectContext } from './context';
import type { SelectItem } from './types';

export interface RootProps {
  className?: string;
  onChangeValue?: (selectedValue: string) => void;
  value: string;
  children?: ReactNode;
}

/**
 * Serves as the root container for the Select component, managing selection state and providing context to child components.
 *
 * Shares the current selected item and selection handler with descendant components such as `Select.Trigger`, `Select.Content`, and `Select.Item` via context. Invokes an optional callback when an item is selected and renders its children within a Popover dropdown.
 *
 * @param value - The currently selected value.
 * @param className - Optional CSS class for customizing the Popover.
 * @param onChangeValue - Optional callback invoked with the selected value when an item is chosen.
 * @param children - Optional nested Select subcomponents.
 *
 * @example
 * ```tsx
 * <Select.Root value={selected} onChangeValue={setSelected}>
 *   <Select.Trigger>
 *     <Select.Value />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="apple">Apple</Select.Item>
 *     <Select.Item value="banana">Banana</Select.Item>
 *   </Select.Content>
 * </Select.Root>
 * ```
 */
function SelectRoot({ children, onChangeValue, value: _value, className }: RootProps) {
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);

  const handleClickItem = (value: string, label: ReactNode) => {
    onChangeValue?.(value);
    setSelectedItem({ value, label });
  };

  return (
    <SelectContext.Provider value={{ handleClickItem, selectedItem }}>
      <Popover className={className} direction='bottom'>
        {children}
      </Popover>
    </SelectContext.Provider>
  );
}

export const Root = SelectRoot;
