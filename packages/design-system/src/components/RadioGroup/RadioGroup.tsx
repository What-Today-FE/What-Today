import { motion } from 'motion/react';
import { createContext, useContext } from 'react';
import { cloneElement, isValidElement, type ReactElement } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RadioContextType, RadioProps } from './types';

//////////////////////////////////////////
// Context 타입 정의
//////////////////////////////////////////

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
           selectedIconColor='red'
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
  selectedIconColor,
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
        selectedIconColor,
        selectedClassName,
        unSelectedClassName,
      }}
    >
      {title && <RadioGroup.Title />}
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        className={twMerge('no-scrollbar flex flex-nowrap gap-4 overflow-x-auto scroll-smooth', radioGroupClassName)}
        initial={{ x: -20, opacity: 0 }}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollPaddingLeft: '1rem', // 첫 아이템 여백
        }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
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
    selectedIconColor: groupSelectedIconColor,
    selectedClassName: groupSelectedClassName,
    unSelectedClassName: groupUnselectedClassName,
  } = useRadioContext();

  const resolvedSelectedColor = props.selectedIconColor ?? groupSelectedIconColor ?? 'white';
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
    'flex gap-8 caption-text cursor-pointer items-center rounded-full border px-10 py-6 md:px-14 md:py-6 font-bold whitespace-nowrap transition-all duration-300 ease-in-out';
  const SELECTED_STYLE = 'bg-black text-white ';
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
