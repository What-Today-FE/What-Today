import { useCallback, useState } from 'react';

import { DropdownContext } from './DropdownContext';

interface DropdownProps {
  /**
   * Dropdown 내부에 포함될 자식 요소들 (Trigger, Menu 등)
   */
  children: React.ReactNode;
}

/**
 * Dropdown 컴포넌트
 *
 * - 드롭다운 메뉴의 열림/닫힘 상태를 관리하며, 관련 컨텍스트를 하위 트리에 제공합니다.
 * - `DropdownContext`를 통해 toggle, close 함수와 triggerRef를 공유합니다.
 *
 * @component
 * @example
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>메뉴 열기</DropdownTrigger>
 *   <DropdownMenu>...</DropdownMenu>
 * </Dropdown>
 * ```
 */
export default function DropdownRoot({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null);

  // dropdown 상태 반전
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // dropdown 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef, setTriggerRef }}>
      <div className='relative inline-block'>{children}</div>
    </DropdownContext.Provider>
  );
}
