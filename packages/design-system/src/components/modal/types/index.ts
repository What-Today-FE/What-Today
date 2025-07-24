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
  modalRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * @description Modal.Root 컴포넌트의 Props
 */
export interface ModalRootProps {
  /** Modal 내부에 렌더링될 컴포넌트들 */
  children: React.ReactNode;
  /** 모달의 열림/닫힘 상태 */
  open: boolean;
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void;
}

/**
 * @description Modal.Content 컴포넌트의 Props
 */
export interface ModalContentProps {
  /** Modal Content 내부에 렌더링될 컴포넌트들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @description Modal.Actions 컴포넌트의 Props
 *
 * **권장 사용법:**
 * - ConfirmButton은 거의 필수적으로 사용 (확인, 저장, 삭제 등의 주요 액션)
 * - CancelButton은 선택적으로 사용 (취소가 필요한 경우에만)
 *
 * @example
 * ```tsx
 * // 권장: ConfirmButton 필수 사용
 * <Modal.Actions>
 *   <Modal.CancelButton>취소</Modal.CancelButton>
 *   <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 * </Modal.Actions>
 *
 * // 가능: ConfirmButton만 사용
 * <Modal.Actions>
 *   <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 * </Modal.Actions>
 * ```
 */
export interface ModalActionsProps {
  /** Actions 영역에 렌더링될 버튼들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @description Modal.CloseButton 컴포넌트의 Props
 */
export interface ModalCloseButtonProps {
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @description Modal.ConfirmButton 컴포넌트의 Props
 *
 * **주요 액션 버튼 (거의 필수)**
 * - 확인, 저장, 삭제, 작성하기 등의 주요 액션을 담당
 * - 대부분의 모달에서 필수적으로 사용됨
 */
export interface ModalConfirmButtonProps {
  /** 버튼에 표시될 텍스트 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 버튼 클릭 시 추가로 실행될 함수 (onConfirm보다 먼저 실행됨) */
  onClick?: () => void;
}

/**
 * @description Modal.CancelButton 컴포넌트의 Props
 *
 * **선택적 버튼**
 * - 취소, 닫기 등의 보조 액션을 담당
 * - 필요에 따라 선택적으로 사용
 */
export interface ModalCancelButtonProps {
  /** 버튼에 표시될 텍스트 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}
