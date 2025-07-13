import { useCallback, useEffect, useRef, useState } from 'react';

import { DropdownContext } from '@/components/dropdown/DropdownContext';

interface DropdownProps {
  children: React.ReactNode;
}

export default function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // dropdown 상태 반전
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // dropdown 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 외부 영역 클릭하면 dropdown 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [close]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
}
