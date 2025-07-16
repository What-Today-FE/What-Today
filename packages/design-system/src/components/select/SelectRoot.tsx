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

/** SelectRoot
 * @description Select 컴포넌트의 루트 역할을 하며, `Select.Trigger`, `Select.Content`, `Select.Item`과 같은 하위 컴포넌트들을 context로 연결해줍니다.
 * 선택된 아이템을 관리하고, 선택 시 외부로 선택된 값을 반환합니다.
 * 내부적으로는 Popover 기반으로 작동합니다.
 *
 * @property {string} [className] - Popover에 전달할 사용자 정의 클래스명
 * @property {(selectedValue: string) => void} [onChangeValue] - 아이템 선택 시 호출되는 콜백 함수 (생략하면 외부에서는 Select 내부에서 선택된 값만 받아오게 됨)
 * @property {string} value - 현재 선택된 값
 * @property {ReactNode} [children] - Select 하위 컴포넌트들 (Trigger, Content, Item 등)
 *
 * @example
 * ```tsx
 * <Select.Root value={selected} onChangeValue={setSelected}>
 *   <Select.Trigger>
 *      <Select.Value />
 *   <Select.Trigger>
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
