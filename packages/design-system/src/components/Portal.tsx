import { type HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = HTMLAttributes<HTMLDivElement> & {
  container?: Element | DocumentFragment | null;
  ref?: React.Ref<HTMLDivElement>;
};

/**
 * @component Portal
 * @description
 * React Portal을 생성하는 컴포넌트입니다. 지정한 DOM 노드(container)에 자식 요소를 렌더링합니다.
 *
 * @param {Element | DocumentFragment | null} [container] - 포탈이 렌더링될 DOM 노드. 생략 시 document.body를 기본 사용.
 * @param {React.Ref<HTMLDivElement>} [ref] - div 요소에 전달할 ref
 * @param {HTMLAttributes<HTMLDivElement>} props - div에 적용될 HTML 속성들 (className, style 등)
 *
 * @example
 * ```tsx
 * <Portal>
 *   <div className="modal">내용</div>
 * </Portal>
 *
 * <Portal container={document.getElementById('custom-root')}>
 *   <div>커스텀 위치에 렌더링</div>
 * </Portal>
 * ```
 */
const Portal = ({ container, ref, ...props }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 컨테이너가 없다면 document.body에 렌더링
  const target = container ?? (mounted ? document.body : null);

  return target ? ReactDOM.createPortal(<div {...props} ref={ref} />, target) : null;
};

export { Portal };
export type { PortalProps };
