import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from './DropdownContext';

interface DropdownItemProps {
  /**
   * DropdownItem 스타일 커스텀 가능
   */
  className?: string;
  /**
   * DropdownItem 내부에 포함될 자식 요소들
   */
  children: React.ReactNode;
  /**
   * DropdownItem 선택시 실행될 함수
   */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * DropdownItem 컴포넌트
 *
 * - 드롭다운 메뉴 내 개별 항목을 표현합니다.
 * - 클릭 시 사용자 정의 `onClick` 핸들러를 호출한 후 자동으로 드롭다운을 닫습니다.
 * - `div`의 기본 HTML 속성을 확장하여 스타일, 이벤트 등 자유롭게 지정할 수 있습니다.
 *
 * @component
 * @param {DropdownItemProps} props - div 요소에 전달할 속성들 (`onClick`, `className`, `children` 등)
 * @returns {JSX.Element} 드롭다운 메뉴 항목
 *
 * @example
 * ```tsx
 * <DropdownItem onClick={(e) => alert('선택됨')}>
 *   항목 1
 * </DropdownItem>
 * ```
 */
export default function DropdownItem({ className, children, onClick }: DropdownItemProps) {
  const { close } = useDropdownContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    close();
  };
  const baseClass =
    'cursor-pointer px-20 py-14 text-center text-lg font-medium text-gray-950 hover:bg-primary-100 first:rounded-t-lg last:rounded-b-lg';

  return (
    <div className={twMerge(baseClass, className)} onClick={handleClick}>
      {children}
    </div>
  );
}
