import { Actions } from './ModalActions';
import { CancelButton } from './ModalCancelButton';
import { CloseButton } from './ModalCloseButton';
import { ConfirmButton } from './ModalConfirmButton';
import { Content } from './ModalContent';
import { Root } from './ModalRoot';

/**
 * @description Modal 합성 컴포넌트
 *
 * Modal은 사용자의 주의를 끌고 중요한 정보를 표시하거나 작업 확인을 요청할 때 사용하는 오버레이 컴포넌트입니다.
 * 합성 컴포넌트 패턴을 사용하여 필요한 부분만 조합해서 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>모달 열기</button>
 *
 *       <Modal.Root
 *         open={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         onConfirm={() => console.log('확인!')}
 *       >
 *         <Modal.Content>
 *           <Modal.CloseButton />
 *           <h2>제목</h2>
 *           <p>내용</p>
 *
 *           <Modal.Actions>
 *             <Modal.CancelButton>취소</Modal.CancelButton>
 *             <Modal.ConfirmButton>확인</Modal.ConfirmButton>
 *           </Modal.Actions>
 *         </Modal.Content>
 *       </Modal.Root>
 *     </>
 *   );
 * }
 * ```
 */
export const Modal = {
  Root,
  Content,
  Actions,
  CloseButton,
  ConfirmButton,
  CancelButton,
};

export default Modal;
