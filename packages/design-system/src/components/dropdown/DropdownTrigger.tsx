import { type ButtonHTMLAttributes, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDropdownContext } from '@/components/dropdown/DropdownContext';

/**
 * DropdownTrigger 컴포넌트
 *
 * - 드롭다운을 여닫는 트리거 역할의 버튼입니다.
 * - 클릭 시 `toggle()` 함수를 호출하여 드롭다운을 열거나 닫습니다.
 * - 버튼 요소의 ref를 `DropdownContext`에 등록해 외부 클릭 감지 등에 사용합니다.
 * - 기본 버튼 속성을 확장하여 자유롭게 커스터마이징 가능합니다.
 *
 * @component
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - 버튼에 전달할 HTML 속성들
 * @returns {JSX.Element} 드롭다운 토글 버튼
 *
 * @example
 * ```tsx
 * <DropdownTrigger className="px-4 py-2 bg-blue-500 text-white">
 *   메뉴 열기
 * </DropdownTrigger>
 * ```
 */
export default function DropdownTrigger(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle, setTriggerRef } = useDropdownContext();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerRef(triggerRef.current);
    }
  }, [setTriggerRef]);

  return (
    <button
      ref={triggerRef}
      className={twMerge('cursor-pointer text-2xl', props.className)}
      type='button'
      onClick={toggle}
      {...props}
    >
      {props.children || ':'}
    </button>
  );
}
