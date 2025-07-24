import type { RefObject } from 'react';

/**
 * @description Modal Context에서 관리하는 상태와 함수들
 */
export interface ModalContextType {
  /** 모달의 열림/닫힘 상태 */
  open: boolean;
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void;
  /** 확인 버튼 클릭 시 호출되는 함수 (선택적) */
  onConfirm?: () => void;
  /** 모달 내용 영역 참조 (외부 클릭 감지용) */
  modalRef: RefObject<HTMLDivElement | null>;
}
