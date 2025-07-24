import { twMerge } from 'tailwind-merge';

import Button from '@/components/button';

import { useModalContext } from './ModalContext';
import type { ModalCancelButtonProps } from './types';

/**
 * @component ModalCancelButton
 * @description Modal에서 취소/닫기 등의 보조 액션을 수행하는 버튼 컴포넌트입니다.
 *
 * **🔄 선택적 버튼**
 * - 취소, 닫기, 아니오 등의 보조 액션을 담당합니다
 * - 필요에 따라 선택적으로 사용합니다
 * - 모달을 닫는 기능만 수행합니다 (추가 로직 없음)
 *
 * **참고:**
 * - ConfirmButton과 달리 단순히 모달만 닫습니다
 * - ESC 키나 배경 클릭과 동일한 기능입니다
 *
 * @param {ModalCancelButtonProps} props - ModalCancelButton 컴포넌트의 Props
 * @param {ReactNode} props.children - 버튼에 표시될 텍스트
 * @param {string} [props.className] - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 사용법 (ConfirmButton과 함께)
 * <Modal.Actions>
 *   <Modal.CancelButton>취소</Modal.CancelButton>
 *   <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 * </Modal.Actions>
 *
 * // 다양한 텍스트로 사용
 * <Modal.CancelButton>닫기</Modal.CancelButton>
 * <Modal.CancelButton>아니오</Modal.CancelButton>
 * <Modal.CancelButton>나중에</Modal.CancelButton>
 *
 * // 커스텀 스타일링
 * <Modal.CancelButton className="bg-gray-500 text-white">
 *   취소
 * </Modal.CancelButton>
 *
 * // ConfirmButton 없이 단독 사용 (권장하지 않음)
 * <Modal.Actions>
 *   <Modal.CancelButton>확인</Modal.CancelButton>
 * </Modal.Actions>
 * ```
 */
function ModalCancelButton({ children, className }: ModalCancelButtonProps) {
  const { onClose } = useModalContext();

  return (
    <Button className={twMerge('w-full', className)} size='sm' variant='outline' onClick={onClose}>
      {children}
    </Button>
  );
}

export const CancelButton = ModalCancelButton;
