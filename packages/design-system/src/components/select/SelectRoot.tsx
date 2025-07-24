import { Popover } from '@components/popover';
import { type ReactNode, useEffect, useState } from 'react';

import { SelectContext } from './context';
import type { SelectItem } from './types';

export interface RootProps {
  className?: string;
  onChangeValue?: (selected: SelectItem) => void;
  value: SelectItem;
  children?: ReactNode;
}

/** SelectRoot
 * @description Select 컴포넌트의 루트 역할을 하며, `Select.Trigger`, `Select.Content`, `Select.Item`과 같은 하위 컴포넌트들을 context로 연결해줍니다.
 * 선택된 아이템을 관리하고, 선택 시 외부로 선택된 값을 반환합니다.
 * 내부적으로는 Popover 기반으로 작동합니다.
 *
 * @property {string} [className] - Popover에 전달할 사용자 정의 클래스명
 * @property {(selectedValue: string) => void} [onChangeValue] - 아이템 선택 시 호출되는 콜백 함수 (생략하면 외부에서는 Select 내부에서 선택된 값만 받아오게 됨)
 * @property {string} value - 현재 선택된 값 ({value: string; label: ReactNode;}) 타입
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
function SelectRoot({ children, onChangeValue, value, className }: RootProps) {
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(value ?? null);
  const [open, setOpen] = useState(false);

  // Select 내부에서는 값을 {value, label}로 관리 + 외부에서는 value만 관리. 외부에서도 default value로 {value, label} 형태가 필요하면 이 부분을 수정할 예정.
  const handleClickItem = (value: string, label: ReactNode) => {
    onChangeValue?.({ value, label });
    setSelectedItem({ value, label });
    setOpen(false);
  };

  useEffect(() => {
    if (value?.value !== selectedItem?.value) {
      setSelectedItem(value);
    }
  }, [selectedItem?.value, value]);

  return (
    <SelectContext.Provider value={{ handleClickItem, selectedItem, open, setOpen }}>
      <Popover.Root className={className} direction='bottom' open={open} onOpenChange={setOpen}>
        {children}
      </Popover.Root>
    </SelectContext.Provider>
  );
}

export const Root = SelectRoot;
