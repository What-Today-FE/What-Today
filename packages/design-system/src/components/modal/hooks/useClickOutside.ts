import { useEffect } from 'react';

/**
 * @hook useClickOutside
 * @description 모달 외부를 클릭했을 때 모달을 닫는 훅입니다.
 * @param ref 모달 콘텐츠의 ref 객체
 * @param open 모달이 열려 있는 상태
 * @param onClose 외부 클릭 시 실행할 닫기 함수
 */
export function useClickOutside(ref: React.RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose, ref]);
}
