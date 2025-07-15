import { createContext, useContext } from 'react';

export interface DropdownContextType {
  /**
   * 드롭다운 열림 여부
   */
  isOpen: boolean;
  /**
   * 드롭다운 상태를 반전시키는 함수
   */
  toggle: () => void;
  /**
   * 드롭다운을 닫는 함수
   */
  close: () => void;
  /**
   * 드롭다운을 여는 트리거 요소의 참조
   */
  triggerRef?: HTMLButtonElement | null;
  /**
   * 트리거 요소의 참조를 설정하는 함수
   */
  setTriggerRef: (ref: HTMLButtonElement | null) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

/**
 * DropdownContext에 접근하기 위한 커스텀 훅
 *
 * @throws 사용 위치가 `<Dropdown>` 컴포넌트 내부가 아닐 경우 에러를 발생시킴
 * @returns {DropdownContextType} 드롭다운 상태와 제어 함수
 *
 * @example
 * ```tsx
 * const { isOpen, toggle } = useDropdownContext();
 * ```
 */
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 내부에서만 사용 가능합니다.');
  }
  return context;
};
