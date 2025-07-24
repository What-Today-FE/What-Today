import { twMerge } from 'tailwind-merge';

import type { ModalActionsProps } from './types';

/**
 * @component ModalActions
 * @description Modal 하단의 버튼들을 배치하는 컨테이너 컴포넌트입니다.
 * 버튼들을 우측 정렬하고 적절한 간격을 제공합니다.
 *
 * Modal에서 제공하는 버튼 컴포넌트(ConfirmButton, CancelButton)뿐만 아니라
 * 사용자가 직접 작성한 버튼 컴포넌트도 자유롭게 배치할 수 있습니다.
 *
 * @param {ModalActionsProps} props - ModalActions 컴포넌트의 Props
 * @param {ReactNode} props.children - Actions 영역에 렌더링될 버튼들
 * @param {string} [props.className] - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Modal.Actions>
 *   <Modal.CancelButton>취소</Modal.CancelButton>
 *   <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 * </Modal.Actions>
 *
 * // 커스텀 버튼과 조합
 * <Modal.Actions>
 *   <button className="custom-btn">커스텀</button>
 *   <Modal.CancelButton>닫기</Modal.CancelButton>
 * </Modal.Actions>
 *
 * // 버튼 하나만 사용
 * <Modal.Actions>
 *   <Modal.CancelButton>확인</Modal.CancelButton>
 * </Modal.Actions>
 * ```
 */
function ModalActions({ children, className }: ModalActionsProps) {
  return <div className={twMerge('mt-24 flex w-full justify-between gap-12', className)}>{children}</div>;
}

export const Actions = ModalActions;
