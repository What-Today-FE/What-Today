import { createContext, useContext } from 'react';

//////////////////////////////////////////
// Context 타입 정의
//////////////////////////////////////////

interface RadioContextType {
  title?: string;
  titleClassName?: string;
  radioGroupClassName?: string;
  selectedValue?: string | number;
  onSelect?: (value: string | number) => void;
  children?: React.ReactNode;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | string;
  name?: string;
  children?: React.ReactNode;
}

//////////////////////////////////////////
// Context 및 훅
//////////////////////////////////////////

const RadioContext = createContext<RadioContextType | null>(null);

function useRadioContext() {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('<Radio> 내부에서 사용되어야 합니다.');
  }
  return context;
}

//////////////////////////////////////////
// RadioGroup 컴포넌트
//////////////////////////////////////////

export default function RadioGroup({
  title,
  titleClassName,
  radioGroupClassName,
  selectedValue,
  onSelect,
  children,
}: RadioContextType) {
  return (
    <RadioContext.Provider
      value={{
        title,
        titleClassName,
        radioGroupClassName,
        selectedValue,
        onSelect,
      }}
    >
      {title && <RadioGroup.Title />}
      <div className={`flex flex-col gap-2 ${radioGroupClassName ?? ''}`}>{children}</div>
    </RadioContext.Provider>
  );
}

RadioGroup.Title = function Title() {
  const { title, titleClassName } = useRadioContext();

  return <h2 className={`title-text ${titleClassName ?? ''}`}>{title}</h2>;
};

RadioGroup.Radio = function Radio({ value, children, className = '', name = 'radioGroup', ...props }: RadioProps) {
  const { selectedValue, onSelect } = useRadioContext();

  const isSelected = selectedValue === value;
  const id = `radio-${value}`;

  const handleChange = () => {
    onSelect?.(isSelected ? '' : value);
  };

  const baseStyle =
    'flex cursor-pointer items-center gap-10 rounded-full border px-14 py-8 font-bold whitespace-nowrap transition-all duration-300 ease-in-out';
  const selectedStyle = 'bg-gradient-to-r from-indigo-400 to-cyan-500 text-white hover:scale-110 active:scale-95';
  const unselectedStyle = 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100';

  return (
    <label className='content-text flex w-fit cursor-pointer items-center gap-4' htmlFor={id}>
      <input
        checked={isSelected}
        className='sr-only'
        id={id}
        name={name || 'radioGroup'}
        role='radio'
        type='checkbox'
        value={value}
        onChange={handleChange}
        {...props}
      />
      <span className={`${baseStyle} ${isSelected ? selectedStyle : unselectedStyle} ${className}`}>{children}</span>
    </label>
  );
};
