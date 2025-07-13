import { createContext, useContext } from 'react';

//////////////////////////////////////////
// Context 타입 정의
//////////////////////////////////////////

/**
 * RadioGroup 컨텍스트의 타입 정의입니다.
 *
 * @property {string} [title] - 라디오 그룹 상단의 제목 (선택 사항)
 * @property {string} [titleClassName] - 제목의 커스텀 클래스명
 * @property {string} [radioGroupClassName] - 라디오 그룹(wrapper)의 커스텀 클래스명
 * @property {string | number} [selectedValue] - 현재 선택된 라디오의 값
 * @property {(value: string | number) => void} onSelect - 라디오 선택 시 호출되는 콜백
 * @property {React.ReactNode} [children] - 하위 라디오 버튼 요소들
 */

interface RadioContextType {
  title?: string;
  titleClassName?: string;
  radioGroupClassName?: string;
  selectedValue?: string | number;
  onSelect?: (value: string | number) => void;
  children?: React.ReactNode;
}

/**
 * Radio 버튼 컴포넌트의 props 정의입니다.
 *
 * @property {string | number} value - 라디오 버튼의 고유 값
 * @property {React.ReactNode} [children] - 라벨에 들어갈 내용 (텍스트 또는 아이콘 등)
 */

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | string;
  children?: React.ReactNode;
}

//////////////////////////////////////////
// Context 및 훅
//////////////////////////////////////////

const RadioContext = createContext<RadioContextType | null>(null);

/**
 * RadioGroup 내부에서만 사용할 수 있는 커스텀 훅입니다.
 * 컨텍스트가 없으면 에러를 throw 합니다.
 *
 * @returns {RadioContextType} 라디오 그룹 컨텍스트 값
 * @throws {Error} 컨텍스트 외부에서 사용 시 에러 발생
 */

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

/**
 * RadioGroup 컴포넌트는 여러 개의 라디오 버튼을 그룹으로 묶는 컨테이너입니다.
 *
 * @component
 * @example
 * ```tsx
 * import { useState } from 'react';
 *
 * export default function exam() {
 * const [selectedCategory, setSelectedCategory] = useState()
 *
 * <RadioGroup selectedValue={value} onSelect={setValue}>
 *   <RadioGroup.Radio value="one">Option 1</RadioGroup.Radio>
 *   <RadioGroup.Radio value="two">Option 2</RadioGroup.Radio>
 * </RadioGroup>
 * ```
 *
 * @param {RadioContextType} props - 컴포넌트 속성
 * @returns {JSX.Element}
 */

export default function RadioGroup({
  title,
  titleClassName,
  radioGroupClassName,
  selectedValue,
  onSelect,
  children,
}: RadioContextType) {
  return (
    <RadioContext.Provider value={{ title, selectedValue, onSelect, titleClassName }}>
      {title && <RadioGroup.Title />}
      <div className={`flex flex-col gap-2 ${radioGroupClassName ?? ''}`}>{children}</div>
    </RadioContext.Provider>
  );
}

RadioGroup.Title = function Title() {
  const { title, titleClassName } = useRadioContext();

  return <h2 className={`title-text ${titleClassName ?? ''}`}>{title}</h2>;
};

RadioGroup.Radio = function Radio({ value, children, ...props }: RadioProps) {
  const { selectedValue, onSelect } = useRadioContext();

  const handleChange = () => {
    onSelect?.(isSelected ? '' : value);
  };

  const isSelected = selectedValue === value;

  return (
    <label className='content-text flex w-fit cursor-pointer items-center gap-4'>
      <input
        checked={isSelected}
        className='sr-only'
        name='radioGroup'
        type='radio'
        value={value}
        onChange={handleChange}
        onClick={handleChange}
        {...props}
      />

      <span className={'text-gray-700' + (isSelected ? ' text-primary-100' : '')}>{children}</span>
    </label>
  );
};
