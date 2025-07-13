import { useState } from 'react';

import RadioGroup from '../components/RadioGroup';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const categories = [
  { value: 'music', icon: '🎵', label: '문화 · 예술' },
  { value: 'tour', icon: '🏙️', label: '투어' },
  { value: 'food', icon: '🍜', label: '식음료' },
  { value: 'sightseeing', icon: '🌿', label: '관광' },
  { value: 'wellness', icon: '☘️', label: '웰빙' },
];

const options = [
  { value: '승인', label: '예약 승인' },
  { value: '체험', label: '체험 완료' },
  { value: '완료', label: '예약 완료' },
  { value: '취소', label: '예약 취소' },
  { value: '거절', label: '예약 거절' },
];

export default function RadioGroupDoc() {
  const [selectedCategory, setSelectedCategory] = useState<string | number>('');
  return (
    <>
      <DocTemplate
        description={`
# RadioGroup 컴포넌트

RadioGroup 컴포넌트는 여러 개의 라디오 버튼 중 하나를 선택하여 원하는 카테고리를 선택할 수 있습니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import RadioGroup from '../components/RadioGroup';

return (
    <RadioGroup
      title="카테고리를 선택하세요"                     
      selectedValue={selectedCategory}              
      onSelect={setSelectedCategory}                
      titleClassName="text-lg font-semibold mb-4"   
      radioGroupClassName="gap-4"                    
    >
      <RadioGroup.Radio value="music">음악</RadioGroup.Radio>
      <RadioGroup.Radio value="food">음식</RadioGroup.Radio>
      <RadioGroup.Radio value="tour">여행</RadioGroup.Radio>
    </RadioGroup>
  );

\`\`\`



`}
        propsDescription={`
  | Prop                | Type                                         | Required | Description                                   |
  |---------------------|----------------------------------------------|----------|-----------------------------------------------|
  | title               | string                                       | No       | 라디오 그룹 상단에 표시할 제목               |
  | titleClassName      | string                                       | No       | 제목 텍스트에 적용할 Tailwind 클래스         |
  | radioGroupClassName | string                                       | No       | 라디오 버튼 그룹(wrapper)에 적용할 클래스    |
  | selectedValue       | string \\| number                            | Yes      | 현재 선택된 라디오 버튼의 값                 |
  | onSelect            | (value :string \\| number) => void           | Yes      | 라디오 버튼 선택 시 호출되는 콜백 함수       |
  | children            | React.ReactNode                              | Yes      | <RadioGroup.Radio> 등 하위 요소               |
  `}
        title='RadioGroup'
      />

      <p className='mb-20 text-2xl'>라디오 버튼입니다</p>

      <div className='mb-20 flex'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory}
        >
          <div className='flex gap-12'>
            {categories.map(({ value, icon, label }) => (
              <RadioGroup.Radio key={value} value={value}>
                <span className='flex gap-12'>
                  <span aria-label={value} role='img'>
                    {icon}
                  </span>
                  <span className='select-none'>{label}</span>
                </span>
              </RadioGroup.Radio>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className='mb-20 flex'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory}
        >
          <div className='flex gap-12'>
            {options.map(({ value, label }) => (
              <RadioGroup.Radio key={value} value={value}>
                <span>
                  <span className='select-none'>{label}</span>
                </span>
              </RadioGroup.Radio>
            ))}
          </div>
        </RadioGroup>
      </div>

      <DocCode
        code={`<RadioGroup
          titleClassName='text-lg font-semibold mb-2'
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory}
          onSelect={setSelectedCategory}
        >
          <div className='flex gap-12'>
            {options.map(({ value, label }) => (
              <RadioGroup.Radio key={value} value={value}>
                <span
                  className={
                    'flex cursor-pointer items-center gap-10 rounded-full border from-indigo-100 to-cyan-200 px-14 py-8 font-bold whitespace-nowrap transition-colors hover:bg-gray-100 ' +
                    (selectedCategory === value
                      ? 'bg-gradient-to-r from-indigo-400 to-cyan-500 text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-95'
                      : 'border-gray-300 bg-white text-gray-700')
                  }
                >
                  <span className='select-none'>{label}</span>
                </span>
              </RadioGroup.Radio>
            ))}
          </div>
        </RadioGroup>`}
        language='tsx'
      />
    </>
  );
}
