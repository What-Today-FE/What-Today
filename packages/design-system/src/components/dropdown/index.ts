import DropdownItem from '@/components/dropdown//DropdownItem';
import DropdownMenu from '@/components/dropdown//DropdownMenu';
import DropdownTrigger from '@/components/dropdown//DropdownTrigger';
import DropdownRoot from '@/components/dropdown/Dropdown';

/**
 * @description Dropdown 합성 컴포넌트
 *
 * @example
 * <Dropdown.Root>
 *   <Dropdown.Trigger />
 *   <Dropdown.Menu>
 *     <Dropdown.Item onClick={() => alert('선택됨')}>선택</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown.Root>
 */
export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
};
