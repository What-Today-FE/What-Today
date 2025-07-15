import { createContext, useContext } from 'react';
import { cloneElement, isValidElement, type ReactElement } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

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
 * @property {string} [selectedColor] - 선택된 라디오 버튼의 아이콘 색상 (기본값: 'white')
 * @property {string} [selectedClassName] - 선택된 라디오 버튼에 적용할 커스텀 클래스
 * @property {string} [unSelectedClassName] - 비선택된 라디오 버튼에 적용할 커스텀 클래스
 */

interface RadioContextType {
  title?: string;
  titleClassName?: string;
  radioGroupClassName?: string;
  selectedValue?: string | number;
  onSelect?: (value: string | number) => void;
  children?: React.ReactNode;
  selectedColor?: string;
  selectedClassName?: string;
  unSelectedClassName?: string;
}

/**
 * Radio 버튼 컴포넌트의 props 정의입니다.
 *
 * @property {string | number} value - 고유 식별자. 이 값이 selectedValue와 일치하면 선택 상태로 간주됩니다.
 * @property {string} [name='radioGroup'] - input의 name 속성 (기본: 'radioGroup')
 * @property {React.ReactNode} [children] - 버튼 안에 들어갈 내용 (텍스트, 아이콘 등)
 * @property {string} [selectedColor] - 선택된 경우 아이콘에 적용할 색상
 * @property {string} [selectedClassName] - 선택된 상태에서의 커스텀 클래스
 * @property {string} [unSelectedClassName] - 비선택 상태에서의 커스텀 클래스
 *
 */

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | string;
  name?: string;
  children?: React.ReactNode;
  selectedColor?: string;
  selectedClassName?: string;
  unSelectedClassName?: string;
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
 *   <RadioGroup
           radioGroupClassName='gap-6'
           selectedValue={selectedCategory1}
           titleClassName='text-lg font-semibold mb-2'
           onSelect={setSelectedCategory1}
           unSelectedClassName='bg-purple-200 text-gray-500'
           selectedClassName='bg-red-400 text-green-300'
           selectedColor='red'
         >
           <div className='flex gap-12'>
             <RadioGroup.Radio value='Art' className='flex gap-8'>
               <ArtIcon />
               문화 예술
             </RadioGroup.Radio>
             <RadioGroup.Radio className='flex gap-8' value='Food'>
               <FoodIcon className='size-20' />
               음식
             </RadioGroup.Radio>
           </div>
         </RadioGroup>
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
  selectedColor,
  selectedClassName,
  unSelectedClassName,
}: RadioContextType) {
  return (
    <RadioContext.Provider
      value={{
        title,
        titleClassName,
        radioGroupClassName,
        selectedValue,
        onSelect,
        selectedColor,
        selectedClassName,
        unSelectedClassName,
      }}
    >
      {title && <RadioGroup.Title />}
      <div className={twMerge('flex flex-col gap-2', radioGroupClassName)}>{children}</div>
    </RadioContext.Provider>
  );
}

RadioGroup.Title = function Title() {
  const { title, titleClassName } = useRadioContext();

  return <h2 className={`title-text ${titleClassName ?? ''}`}>{title}</h2>;
};

RadioGroup.Radio = function Radio({ value, children, className = '', name = 'radioGroup', ...props }: RadioProps) {
  const {
    selectedValue,
    onSelect,
    selectedColor: groupSelectedColor,
    selectedClassName: groupSelectedClassName,
    unSelectedClassName: groupUnselectedClassName,
  } = useRadioContext();

  const resolvedSelectedColor = props.selectedColor ?? groupSelectedColor ?? 'white';
  const resolvedSelectedClassName = props.selectedClassName ?? groupSelectedClassName ?? '';
  const resolvedUnselectedClassName = props.unSelectedClassName ?? groupUnselectedClassName ?? '';

  const isSelected = selectedValue === value;
  const id = `radio-${value}`;

  const styledChildren = Array.isArray(children)
    ? React.Children.map(children, (child) =>
        isValidElement(child) && typeof child.type === 'function'
          ? cloneElement(child as ReactElement<{ color?: string }>, {
              color: isSelected ? resolvedSelectedColor : 'black',
            })
          : child,
      )
    : isValidElement(children) && typeof children.type === 'function'
      ? cloneElement(children as ReactElement<{ color?: string }>, {
          color: isSelected ? resolvedSelectedColor : 'black',
        })
      : children;

  const handleChange = () => {
    onSelect?.(isSelected ? '' : value);
  };

  const BASE_STYLE =
    'flex gap-8 text-md md:text-lg  cursor-pointer items-center rounded-full border  px-12 py-6 md:px-18 md:py-9 font-bold whitespace-nowrap transition-all duration-300 ease-in-out';
  const SELECTED_STYLE = 'bg-black text-white hover:scale-110 active:scale-95';
  const UNSELECTED_STYLE = 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100';

  const mergedClassName = twMerge(
    BASE_STYLE,
    isSelected ? SELECTED_STYLE : UNSELECTED_STYLE,
    className,
    isSelected ? resolvedSelectedClassName : resolvedUnselectedClassName,
  );

  return (
    <label className='cursor-pointer select-none' htmlFor={id}>
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
      <span className={mergedClassName}>{styledChildren}</span>
    </label>
  );
};
