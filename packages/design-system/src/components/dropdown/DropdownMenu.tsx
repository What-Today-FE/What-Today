import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from '@/components/dropdown/DropdownContext';

interface DropdownMenuProps {
  /**
   * DropdownMenu 스타일 커스텀 가능
   */
  className?: string;
  /**
   * DropdownMenu 내부에 포함될 자식 요소들
   */
  children: React.ReactNode;
}

/**
 * DropdownMenu 컴포넌트
 *
 * 드롭다운 메뉴를 렌더링합니다.
 * - 드롭다운이 열려 있을 때(`isOpen`이 `true`)에만 메뉴를 보여줍니다.
 * - 외부 영역을 클릭하면 자동으로 닫히는 기능을 내장하고 있습니다.
 * - 기본 위치는 `absolute top-10 right-10`이며, `className`으로 위치나 스타일을 조정할 수 있습니다.
 *
 * @component
 * @param {DropdownMenuProps} props
 * @returns {JSX.Element | null} 드롭다운이 열릴 경우 메뉴를 렌더링, 아니면 null 반환
 *
 * @example
 * ```tsx
 * <DropdownMenu className="p-4 shadow-lg">
 *   <p>옵션 1</p>
 *   <p>옵션 2</p>
 * </DropdownMenu>
 * ```
 */
export default function DropdownMenu({ className, children }: DropdownMenuProps) {
  const { isOpen, close } = useDropdownContext();
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 영역 클릭하면 dropdown 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [close]);

  const baseClass = 'absolute top-10 right-10 w-95 rounded-lg border border-gray-100 bg-white';

  return isOpen ? (
    <div ref={menuRef} className={twMerge(baseClass, className)}>
      {children}
    </div>
  ) : null;
}
