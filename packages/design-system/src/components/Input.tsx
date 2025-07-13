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

const INPUT_SIZE = {
  xl: 'w-740',
  lg: 'w-700',
  md: 'w-640',
  sm: 'w-470',
  xs: 'w-320',
  full: 'w-full',
};

interface DisplayNameType {
  displayName?: string;
}

interface InputContextType {
  id?: string;
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'full';
  className?: string;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
  disabled?: boolean;
  error?: string;
}

interface InputRootProps extends InputContextType {
  children: React.ReactNode;
}

interface InputSubComponentProps {
  className?: string;
  children: React.ReactNode;
}

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  ref?: React.Ref<HTMLInputElement>;
}

const InputContext = createContext<InputContextType | null>(null);

function useInputContext() {
  const context = useContext(InputContext);
  if (!context) throw new Error('Input components must be used inside <Input>');
  return context;
}

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

function InputLabel({ className, children }: InputSubComponentProps) {
  const { id } = useInputContext();
  return (
    <label className={twMerge('mb-4 block', className)} htmlFor={id}>
      {children}
    </label>
  );
}
const Label = memo(InputLabel);

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

function InputIcon({ className, children }: InputSubComponentProps) {
  const childrenArray = Children.toArray(children);
  const validChildren = childrenArray.filter(
    (child) =>
      typeof child === 'string' ||
      (isValidElement(child) &&
        typeof child.type === 'function' &&
        (child.type as DisplayNameType).displayName?.includes('Icon')),
  );

  return <div className={className}>{validChildren}</div>;
}
const Icon = memo(InputIcon);

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
