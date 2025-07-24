import { useRef } from 'react';

import { useClickOutside } from './hooks/useClickOutside';
import { useEscToClose } from './hooks/useEscToClose';
import { useLockBodyScroll } from './hooks/useLockBodyScroll';
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
function ModalRoot({ children, open, onClose }: ModalRootProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  useEscToClose(open, onClose);
  useClickOutside(modalRef, open, onClose);

  return <ModalContext.Provider value={{ open, onClose, modalRef }}>{children}</ModalContext.Provider>;
}

export const Root = ModalRoot;
