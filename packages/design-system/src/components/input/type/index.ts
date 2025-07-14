import type { InputHTMLAttributes } from 'react';

/** ComponentWithDisplayName
 * @description displayName을 가지는 React 컴포넌트 타입을 위한 인터페이스입니다. React.Element.type에 접근할 때 displayName을 검사하기 위해 사용됩니다.
 *
 * @example
 * const MyIcon = () => <svg />;
 * MyIcon.displayName = "MyIcon";
 */
export interface ComponentWithDisplayName {
  displayName?: string;
}

/** InputContextType
 * @description Input 컴포넌트의 Context에서 공유되는 속성들을 정의합니다.
 */
export interface InputContextType {
  /** Input id */
  id?: string;

  /** 사이즈 유틸리티 클래스 */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'full';

  /** Input Root에 대한 스타일 확장용 (사이즈 조정용) */
  className?: string;

  /** 포커스 상태 유무 */
  isFocused?: boolean;

  /** 포커스 상태 변경 함수 */
  setIsFocused?: (focused: boolean) => void;

  /** 비활성화 유무 */
  disabled?: boolean;

  /** 유효성 검사 대비 에러 메시지 */
  error?: string;
}

/** InputRootProps
 * @description Input 루트 컴포넌트의 props입니다.
 */
export interface InputRootProps extends InputContextType {
  children: React.ReactNode;
}

/** InputSubComponentProps
 * @description Input 서브 컴포넌트(Label, Wrapper, Icon 등)의 공통 props입니다.
 */
export interface InputSubComponentProps {
  className?: string;
  children: React.ReactNode;
}

/** InputFieldProps
 * @description Input.Field 컴포넌트의 props입니다. 기본 HTML input 속성을 대부분 상속하며, ref는 명시적으로 정의합니다.
 */
export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  ref?: React.Ref<HTMLInputElement>;
}
