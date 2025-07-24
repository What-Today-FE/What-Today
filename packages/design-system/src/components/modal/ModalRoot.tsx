import { useEffect, useRef } from 'react';

import { ModalContext } from './ModalContext';
import type { ModalRootProps } from './types';

/**
 * @component ModalRoot
 * @description Modal의 상태와 모든 상호작용을 관리하는 루트 컴포넌트입니다.
 *
 * **관리하는 기능:**
 * - ESC 키로 모달 닫기
 * - 외부 클릭으로 모달 닫기
 * - 배경 스크롤 방지
 * - Context를 통한 상태 전달
 *
 * @param {ModalRootProps} props - ModalRoot 컴포넌트의 Props
 * @param {ReactNode} props.children - Modal 내부에 렌더링될 컴포넌트들
 * @param {boolean} props.open - 모달의 열림/닫힘 상태
 * @param {() => void} props.onClose - 모달을 닫을 때 호출되는 함수
 * @param {() => void} [props.onConfirm] - 확인 버튼 클릭 시 호출되는 함수 (선택적)
 *
 * @example
 * ```tsx
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <Modal.Root
 *       open={isOpen}
 *       onClose={() => setIsOpen(false)}
 *       onConfirm={() => console.log('확인!')}
 *     >
 *       <Modal.Content>
 *         // Modal 내용
 *       </Modal.Content>
 *     </Modal.Root>
 *   );
 * }
 * ```
 */
function ModalRoot({ children, open, onClose, onConfirm }: ModalRootProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 배경 스크롤 방지
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // 외부 클릭으로 모달 닫기
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // 모달 내용 영역 밖을 클릭했을 때만 모달 닫기
      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  return <ModalContext.Provider value={{ open, onClose, onConfirm, modalRef }}>{children}</ModalContext.Provider>;
}

export const Root = ModalRoot;
