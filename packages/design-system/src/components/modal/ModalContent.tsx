import { Portal } from '@components/Portal';
import { twMerge } from 'tailwind-merge';

import { useModalContext } from './ModalContext';
import type { ModalContentProps } from './types';

/**
 * @component ModalContent
 * @description Modal의 실제 콘텐츠를 렌더링하는 컴포넌트입니다.
 * Portal을 통해 DOM 트리의 최상위에 렌더링되며, 오버레이와 함께 화면 중앙에 표시됩니다.
 *
 * **역할:**
 * - 순수한 UI 렌더링만 담당
 * - Portal을 통한 DOM 트리 외부 렌더링
 * - 화면 중앙 정렬 및 스타일링
 * - 반응형 지원
 *
 * **참고:**
 * 모든 상호작용(ESC, 외부 클릭, 스크롤 방지)은 Modal.Root에서 관리됩니다.
 *
 * @param {ModalContentProps} props - ModalContent 컴포넌트의 Props
 * @param {ReactNode} props.children - Modal Content 내부에 렌더링될 컴포넌트들
 * @param {string} [props.className] - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <Modal.Content className="max-w-lg">
 *   <h2>제목</h2>
 *   <p>내용</p>
 *   <Modal.Actions>
 *     <Modal.CancelButton>취소</Modal.CancelButton>
 *     <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 *   </Modal.Actions>
 * </Modal.Content>
 * ```
 */
function ModalContent({ children, className }: ModalContentProps) {
  const { open, modalRef } = useModalContext();

  if (!open) return null;

  return (
    <Portal>
      {/* 오버레이 */}
      <div className='fixed inset-0 z-40 bg-black/30' />

      {/* 모달 컨텐츠 */}
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div
          ref={modalRef}
          aria-modal='true'
          className={twMerge('relative mx-16 w-full max-w-md rounded-[30px] bg-white p-30 shadow-lg', className)}
          role='dialog'
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

export const Content = ModalContent;
