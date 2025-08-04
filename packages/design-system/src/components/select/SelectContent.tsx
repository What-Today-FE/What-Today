import { Popover } from '@components/popover';
import { twMerge } from 'tailwind-merge';

import type { BaseProps } from './types';

/** SelectContent
 * @description 필수 구성 요소로, Select 컴포넌트의 옵션 목록을 보여주는 영역입니다.
 * 내부적으로 `Popover.Content`를 확장하여 사용하며, 옵션들을 스크롤 가능한 드롭다운 형태로 렌더링합니다. (Popover.Content로 렌더링됩니다.)
 *
 * @param {ReactNode} props.children - 옵션 항목(`Select.Item`)들을 자식 요소로 받습니다. (혹은 `Select.Group`, `Select.Label`으로 그룹화 및 라벨링 가능)
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Select.Content>
 *   <Select.Item value="apple">Apple</Select.Item>
 *   <Select.Item value="banana">Banana</Select.Item>
 * </Select.Content>
 * ```
 */
function SelectContent({ className, children }: BaseProps) {
  return (
    <Popover.Content
      matchTriggerWidth
      className={twMerge(
        'select-content mt-4 max-h-300 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-10',
        className,
      )}
    >
      {children}
    </Popover.Content>
  );
}

export const Content = SelectContent;
