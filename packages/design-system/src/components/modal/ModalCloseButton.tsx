import { twMerge } from 'tailwind-merge';

import Button from '@/components/button';
import { DeleteIcon } from '@/components/icons';

import { useModalContext } from './ModalContext';
import type { ModalCloseButtonProps } from './types';

/**
 * @component ModalCloseButton
 * @description Modal 우측 상단에 위치하는 X 닫기 버튼 컴포넌트입니다.
 * 클릭 시 모달을 닫는 기능을 제공합니다.
 *
 * 이 컴포넌트는 선택적으로 사용할 수 있으며, 없어도 ESC 키나 배경 클릭으로 모달을 닫을 수 있습니다.
 *
 * @param {ModalCloseButtonProps} props - ModalCloseButton 컴포넌트의 Props
 * @param {string} [props.className] - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * <Modal.Content>
 *   <Modal.CloseButton />
 *   <h2>제목</h2>
 *   <p>내용</p>
 * </Modal.Content>
 *
 * // 커스텀 스타일링
 * <Modal.CloseButton className="text-red-500 hover:text-red-700" />
 * ```
 */
function ModalCloseButton({ className }: ModalCloseButtonProps) {
  const { onClose } = useModalContext();

  return (
    <Button className={twMerge('absolute top-30 right-30 h-fit w-fit p-0', className)} variant='none' onClick={onClose}>
      <DeleteIcon color='black' />
    </Button>
  );
}

export const CloseButton = ModalCloseButton;
