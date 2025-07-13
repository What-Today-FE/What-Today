import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from '@/components/dropdown/DropdownContext';

interface DropdownTriggerProps {
  /**
   * DropdownTrigger 스타일 커스텀 가능
   */
  className?: string;
  /**
   * DropdownTrigger 내부에 포함될 자식 요소들
   */
  children?: React.ReactNode;
}

/**
 * DropdownTrigger 컴포넌트
 *
 * - 드롭다운을 여닫는 트리거 역할의 버튼입니다.
 * - 클릭 시 `toggle()` 함수를 호출하여 드롭다운을 열거나 닫습니다.
 * - 버튼 요소의 ref를 `DropdownContext`에 등록해 외부 클릭 감지 등에 사용합니다.
 * - 기본 스타일에 추가로 `className`으로 커스터마이징 가능합니다.
 *
 * @component
 * @param {DropdownTriggerProps} props - 스타일과 자식 요소 포함
 * @returns {JSX.Element} 드롭다운 토글 버튼
 *
 * @example
 * ```tsx
 * <DropdownTrigger className="px-4 py-2 bg-blue-500 text-white">
 *   메뉴 열기
 * </DropdownTrigger>
 * ```
 */
export default function DropdownTrigger({ className, children }: DropdownTriggerProps) {
  const { toggle, setTriggerRef } = useDropdownContext();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerRef(triggerRef.current);
    }
  }, [setTriggerRef]);

  return (
    <button ref={triggerRef} className={twMerge('cursor-pointer text-2xl', className)} type='button' onClick={toggle}>
      {/* 아이콘으로 수정 예정 */}
      {children || ':'}
    </button>
  );
}
