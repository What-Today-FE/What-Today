import { ChevronIcon } from '@components/icons';
import { Popover } from '@components/popover';
import { twMerge } from 'tailwind-merge';

import { useSelectContext } from './context';
import type { BaseProps } from './types';

/**
 * @component SelectTrigger
 * @description Select 컴포넌트의 트리거 역할을 하는 버튼 UI입니다. 사용자가 클릭하면 연결된 Popover가 열리거나 닫히도록 합니다.
 * 내부적으로 `Popover.Trigger`의 `asChild`를 사용하여, `<div>` 요소에 Popover 관련 동작을 전달합니다.
 *
 * @param {ReactNode} props.children - 트리거 내부에 표시할 내용 (예: 선택된 값)
 * @param {string} [props.className] - 스타일 확장용 className
 *
 * @example
 * ```tsx
 * <Select.Trigger>
 *   <Select.Value />
 * </Select.Trigger>
 * ```
 */
function SelectTrigger({ className, children }: BaseProps) {
  const { open, setOpen } = useSelectContext();
  return (
    <Popover.Trigger asChild>
      <div
        className={twMerge(
          'flex items-center justify-between rounded-xl border border-gray-100 bg-white px-15 py-10',
          className,
        )}
        role='button'
        tabIndex={0}
        onClick={() => setOpen?.(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.currentTarget.click(); // asChild로 위임된 Popover 동작 트리거
          }
        }}
      >
        {children}
        <ChevronIcon direction='bottom' />
      </div>
    </Popover.Trigger>
  );
}

export const Trigger = SelectTrigger;
