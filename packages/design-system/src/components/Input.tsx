import {
  Children,
  createContext,
  type InputHTMLAttributes,
  isValidElement,
  memo,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

/** INPUT_SIZE
 * @description Input의 사이즈를 조정하는 유틸리티 클래스입니다. 이외에도 Root에서 className 확장을 통해 크기를 조정할 수 있습니다.
 * @description 기본 사이즈는 'md'입니다.
 */
const INPUT_SIZE = {
  xl: 'w-740',
  lg: 'w-700',
  md: 'w-640',
  sm: 'w-470',
  xs: 'w-320',
  full: 'w-full',
};

/** ComponentWithDisplayName
 * @description displayName을 가지는 React 컴포넌트 타입을 위한 인터페이스입니다. React.Element.type에 접근할 때 displayName을 검사하기 위해 사용됩니다.
 *
 * @example
 * const MyIcon = () => <svg />;
 * MyIcon.displayName = "MyIcon";
 */
interface ComponentWithDisplayName {
  displayName?: string;
}

/** InputContextType
 * @description Input 컴포넌트의 Context에서 공유되는 속성들을 정의합니다.
 */
interface InputContextType {
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
interface InputRootProps extends InputContextType {
  children: React.ReactNode;
}

/** InputSubComponentProps
 * @description Input 서브 컴포넌트(Label, Wrapper, Icon 등)의 공통 props입니다.
 */
interface InputSubComponentProps {
  className?: string;
  children: React.ReactNode;
}

/** InputFieldProps
 * @description Input.Field 컴포넌트의 props입니다. 기본 HTML input 속성을 대부분 상속하며, ref는 명시적으로 정의합니다.
 */
interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  ref?: React.Ref<HTMLInputElement>;
}

/** InputContext
 * @description Input 컴포넌트 전체에서 공유되는 컨텍스트입니다.
 */
const InputContext = createContext<InputContextType | null>(null);

/** useInputContext
 * @description InputContext를 사용하는 커스텀 훅입니다. 외부에서 사용 시 오류가 발생합니다.
 */
function useInputContext() {
  const context = useContext(InputContext);
  if (!context) throw new Error('Input components must be used inside <Input>');
  return context;
}

/** InputRoot
 * @description Input 컴포넌트의 Root로, 합성 컴포넌트로 구현했습니다.
 * @param {InputRootProps} props - id, size, className, disabled, error, children
 *
 * @example
 * <Input.Root size="sm" error="에러입니다.">
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Wrapper>
 *     <Input.Field />
 *   </Input.Wrapper>
 *   <Input.ErrorMessage />
 * </Input.Root>
 */
function InputRoot({ id, size = 'md', className, disabled, error, children }: InputRootProps) {
  const randomId = useId();
  id = id ?? randomId;
  const [isFocused, setIsFocused] = useState(false);

  const contextValue = useMemo(
    () => ({
      id,
      size,
      className,
      isFocused,
      setIsFocused,
      disabled,
      error,
    }),
    [id, size, className, isFocused, disabled, error],
  );

  return (
    <InputContext.Provider value={contextValue}>
      <div className={twMerge(twJoin('flex flex-col', INPUT_SIZE[size]), className)}>{children}</div>
    </InputContext.Provider>
  );
}
const Root = memo(InputRoot);

/** InputLabel
 * @description Label 컴포넌트로, input과 label을 id로 연결합니다.
 * @param {InputSubComponentProps} props
 */
function InputLabel({ className, children }: InputSubComponentProps) {
  const { id } = useInputContext();
  return (
    <label className={twMerge('mb-4 block', className)} htmlFor={id}>
      {children}
    </label>
  );
}
const Label = memo(InputLabel);

/** InputWrapper
 * @description Wrapper 컴포넌트로, 내부에서 Field와 Icon을 자유롭게 조합해서 사용할 수 있습니다.
 * @description ⚠️ Field만 사용하더라도 필수적으로 사용해야 합니다.
 * @param {InputSubComponentProps} props - className, children
 */
function InputWrapper({ className, children }: InputSubComponentProps) {
  const { error, isFocused, disabled } = useInputContext();

  const BASE_CLASSNAME = twJoin(
    'flex items-center gap-8 rounded-xl border px-20 py-10 bg-white',
    error ? 'border-red-500' : 'border-gray-100',
    isFocused && 'border-gray-400',
    disabled && 'cursor-not-allowed',
  );

  return <div className={twMerge(BASE_CLASSNAME, className)}>{children}</div>;
}
const Wrapper = memo(InputWrapper);

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
const Icon = memo(InputIcon);

/** InputField
 * @description ⚠️ 실제 input 태그로, Wrapper 안에서 사용할 수 있습니다.
 * @param {InputFieldProps} props - HTML input 속성 + ref
 *
 * @example
 * <Input.Field value={value} onChange={onChange} placeholder="이메일 입력" />
 */
function InputField({ value, onChange, ref, type = 'text', className, ...props }: InputFieldProps) {
  const { error, id, setIsFocused, disabled } = useInputContext();
  return (
    <input
      ref={ref}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={!!error}
      className={twMerge('flex-1 placeholder:text-gray-400 focus:outline-none', className)}
      disabled={disabled}
      id={id}
      type={type}
      value={value}
      onBlur={() => setIsFocused?.(false)}
      onChange={onChange}
      onFocus={() => setIsFocused?.(true)}
      {...props}
    />
  );
}
const Field = memo(InputField);

/** InputErrorMessage
 * @description 에러 메시지 출력 컴포넌트로, error가 없으면 null 반환.
 * @param {{ className?: string }} props - className
 */
function InputErrorMessage({ className }: { className?: string }) {
  const { id, error } = useInputContext();
  if (!error) return null;
  return (
    <p className={twMerge('text-md text-red-500', className)} id={`${id}-error`} role='alert'>
      {error}
    </p>
  );
}
const ErrorMessage = memo(InputErrorMessage);

export const Input = { Root, Label, Wrapper, Icon, Field, ErrorMessage };
