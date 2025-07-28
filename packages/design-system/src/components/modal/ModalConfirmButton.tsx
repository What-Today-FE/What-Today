import { twMerge } from 'tailwind-merge';

import Button from '@/components/button';

import { useModalContext } from './ModalContext';
import type { ModalConfirmButtonProps } from './types';

/**
 * @component ModalConfirmButton
 * @description Modal에서 확인/삭제 등의 주요 액션을 수행하는 버튼 컴포넌트입니다.
 *
 * **🎯 주요 액션 버튼 (거의 필수 사용)**
 * - 확인, 저장, 삭제, 작성하기 등의 주요 액션을 담당합니다
 * - 대부분의 모달에서 필수적으로 사용됩니다
 * - 모달의 주요 목적을 달성하는 버튼입니다
 *
 * **실행 순서:**
 * 1. props.onClick (있는 경우)
 * 2. Modal.Root의 onConfirm (있는 경우)
 * 3. Modal 닫기 (onClose)
 *
 * @param {ModalConfirmButtonProps} props - ModalConfirmButton 컴포넌트의 Props
 * @param {ReactNode} props.children - 버튼에 표시될 텍스트
 * @param {string} [props.className] - 추가 CSS 클래스명
 * @param {() => void} [props.onClick] - 버튼 클릭 시 추가로 실행될 함수 (onConfirm보다 먼저 실행됨)
 *
 * @example
 * ```tsx
 * // 기본 사용법 (권장)
 * <Modal.Actions>
 *   <Modal.CancelButton>취소</Modal.CancelButton>
 *   <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 * </Modal.Actions>
 *
 * // ConfirmButton만 사용 (가능)
 * <Modal.Actions>
 *   <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 * </Modal.Actions>
 *
 * // 추가 로직과 함께 사용
 * <Modal.ConfirmButton
 *   onClick={() => console.log('추가 로직 실행')}
 * >
 *   작성하기
 * </Modal.ConfirmButton>
 *
 * // 위험한 액션 (삭제 등)
 * <Modal.ConfirmButton className="bg-red-500 hover:bg-red-600">
 *   삭제
 * </Modal.ConfirmButton>
 * ```
 */
function ModalConfirmButton({ children, className, onClick, disabled }: ModalConfirmButtonProps) {
  const { onClose } = useModalContext();

  const handleClick = () => {
    onClick?.();
    onClose();
  };

  return (
    <Button className={twMerge('w-full', className)} disabled={disabled} size='sm' variant='fill' onClick={handleClick}>
      {children}
    </Button>
  );
}

export const ConfirmButton = ModalConfirmButton;
