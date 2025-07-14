import { Children, isValidElement, memo } from 'react';

import type { ComponentWithDisplayName, InputSubComponentProps } from './type';

/** InputIcon
 * @description ⚠️ Wrapper 안에서 사용할 수 있습니다.
 * @description ⚠️ 컴포넌트 이름에 'Icon'이 포함되어 있거나, 단순 텍스트만 렌더링합니다.
 * @param {InputSubComponentProps} props - className, children
 */
function InputIcon({ className, children }: InputSubComponentProps) {
  const childrenArray = Children.toArray(children);
  const validChildren = childrenArray.filter(
    (child) =>
      typeof child === 'string' ||
      (isValidElement(child) &&
        typeof child.type === 'function' &&
        (child.type as ComponentWithDisplayName).displayName?.includes('Icon')),
  );

  return <div className={className}>{validChildren}</div>;
}
export const Icon = memo(InputIcon);
