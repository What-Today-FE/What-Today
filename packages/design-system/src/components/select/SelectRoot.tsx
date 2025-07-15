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

export interface PopoverRefProps {
  close: () => void;
}

function SelectRoot({ children, onChangeValue, value: _value, className }: RootProps) {
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);

  const handleClickItem = (value: string, label: ReactNode) => {
    onChangeValue?.(value);
    setSelectedItem({ value, label });
  };

  return (
    <SelectContext.Provider value={{ handleClickItem, selectedItem }}>
      <Popover className={className}>{children}</Popover>
    </SelectContext.Provider>
  );
}

export const Root = SelectRoot;
