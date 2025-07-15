import { useState } from 'react';

import { ArtIcon, BusIcon, FoodIcon, SportIcon, TourIcon, WellbeingIcon } from '../components/icons';
import RadioGroup from '../components/RadioGroup';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

export default function RadioGroupDoc() {
  const [selectedCategory1, setSelectedCategory1] = useState<string | number>('');
  const [selectedCategory2, setSelectedCategory2] = useState<string | number>('');

  return (
    <>
      <DocTemplate
        description={`
# RadioGroup 컴포넌트

RadioGroup 컴포넌트는 여러 개의 라디오 버튼 중 하나를 선택하여 원하는 카테고리를 선택할 수 있습니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import RadioGroup from '@what-today/design-system';

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

      <p className='mb-20 text-2xl'>기본 라디오 입니다</p>

      <div className='mb-20 flex'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory1}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory1}
        >
          <div className='flex gap-12'>
            <RadioGroup.Radio className='flex gap-8' value='Art'>
              <ArtIcon />
              문화 예술
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Food'>
              <FoodIcon />
              음식
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Sport'>
              <SportIcon />
              스포츠
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Wellbeing'>
              <WellbeingIcon />
              웰빙
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Bus'>
              <BusIcon />
              버스
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Tour'>
              <TourIcon />
              여행
            </RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>

      <p className='mb-20 text-2xl'>커스텀 라디오 입니다</p>

      <div className='mb-20 flex'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedClassName='bg-gradient-to-r from-indigo-400 to-cyan-500 text-white hover:scale-110 active:scale-95'
          selectedColor='white'
          selectedValue={selectedCategory1}
          titleClassName='text-lg font-semibold mb-2'
          unSelectedClassName='bg-indigo-50 '
          onSelect={setSelectedCategory1}
        >
          <div className='flex gap-12'>
            <RadioGroup.Radio className='flex gap-8' value='Art'>
              <ArtIcon />
              문화 예술
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Food'>
              <FoodIcon />
              음식
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Sport'>
              <SportIcon />
              스포츠
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Wellbeing'>
              <WellbeingIcon />
              웰빙
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Bus'>
              <BusIcon />
              버스
            </RadioGroup.Radio>
            <RadioGroup.Radio value='Tour'>
              <TourIcon />
              여행
            </RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>

      <p className='mb-20 text-2xl'>예약 라디오 입니다</p>

      <div>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory2}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory2}
        >
          <div className='flex gap-12'>
            <RadioGroup.Radio value='승인'>예약 승인</RadioGroup.Radio>
            <RadioGroup.Radio value='체험'>체험 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='완료'>예약 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='취소'>예약 취소</RadioGroup.Radio>
            <RadioGroup.Radio value='거절'>예약 거절</RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>

      <p className='mt-20 mb-20 text-2xl'>예약 라디오 커스텀 입니다</p>

      <div>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedClassName='bg-gradient-to-r from-indigo-400 to-cyan-500 text-white hover:scale-110 active:scale-95'
          selectedValue={selectedCategory2}
          titleClassName='text-lg font-semibold mb-2'
          unSelectedClassName='bg-indigo-50'
          onSelect={setSelectedCategory2}
        >
          <div className='flex gap-12'>
            <RadioGroup.Radio value='승인'>예약 승인</RadioGroup.Radio>
            <RadioGroup.Radio value='체험'>체험 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='완료'>예약 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='취소'>예약 취소</RadioGroup.Radio>
            <RadioGroup.Radio value='거절'>예약 거절</RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>

      <h2 className='mt-40 text-2xl'>라디오 예시 입니다</h2>
      <DocCode
        code={`    

          import { useState } from 'react';
          import RadioGroup from '../components/RadioGroup';
          import { ArtIcon, BusIcon, FoodIcon, SportIcon, TourIcon, WellbeingIcon } from '../components/icons';
          const [selectedCategory1, setSelectedCategory1] = useState<string | number>('');

   
         <div className='mb-20 flex'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory1}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory1}
        >
          아이콘 기본 size=20입니다. size 조절 시 아이콘 컴포넌트 안에서 className="size="" 조절가능합니다
          <div className='flex gap-12'>
            <RadioGroup.Radio value='Art'>
              <ArtIcon />
              문화 예술
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Food'>
              <FoodIcon/>
              음식
            </RadioGroup.Radio>
            <RadioGroup.Radio ' value='Sport'>
              <SportIcon/>
              스포츠
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Wellbeing'>
              <WellbeingIcon/>
              웰빙
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Bus'>
              <BusIcon/>
              버스
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Tour'>
              <TourIcon/>
              여행
            </RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>`}
        language='tsx'
      />

      <h2 className='mt-40 text-2xl'>라디오 커스텀 예시 입니다</h2>
      <DocCode
        code={`    

          import { useState } from 'react';
          import RadioGroup from '../components/RadioGroup';

          const [selectedCategory1, setSelectedCategory1] = useState<string | number>('');

       <div className='mb-20 flex'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory1}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory1}
          unSelectedClassName='bg-indigo-50 '    추가
          selectedClassName='bg-gradient-to-r from-indigo-400 to-cyan-500 text-white hover:scale-110 active:scale-95' 추가
          selectedColor='white'                  추가
        >
          아이콘 기본 size=20입니다. size 조절 시 아이콘 컴포넌트 안에서 className="size="" 조절가능합니다
          <div className='flex gap-12'>
            <RadioGroup.Radio value='Art'>
              <ArtIcon />
              문화 예술
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Food'>
              <FoodIcon/>
              음식
            </RadioGroup.Radio>
            <RadioGroup.Radio ' value='Sport'>
              <SportIcon/>
              스포츠
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Wellbeing'>
              <WellbeingIcon/>
              웰빙
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Bus'>
              <BusIcon/>
              버스
            </RadioGroup.Radio>
            <RadioGroup.Radio  value='Tour'>
              <TourIcon/>
              여행
            </RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>`}
        language='tsx'
      />

      <h2 className='mt-40 text-2xl'>예약 라디오 예시 입니다</h2>
      <DocCode
        code={`    
          import { useState } from 'react';
          import RadioGroup from '../components/RadioGroup';

          const [selectedCategory2, setSelectedCategory2] = useState<string | number>('');

    <div>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory2}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory2}
        >
          <div className='flex gap-12'>
            <RadioGroup.Radio value='승인'>예약 승인</RadioGroup.Radio>
            <RadioGroup.Radio value='체험'>체험 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='완료'>예약 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='취소'>예약 취소</RadioGroup.Radio>
            <RadioGroup.Radio value='거절'>예약 거절</RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>`}
        language='tsx'
      />

      <h2 className='mt-40 text-2xl'>예약 라디오 커스텀 입니다</h2>
      <DocCode
        code={`    
          import { useState } from 'react';
          import RadioGroup from '../components/RadioGroup';

          const [selectedCategory2, setSelectedCategory2] = useState<string | number>('');

    <div>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedCategory2}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={setSelectedCategory2}
          unSelectedClassName='bg-indigo-50'                추가
          selectedClassName='bg-gradient-to-r from-indigo-400 to-cyan-500 text-white hover:scale-110 active:scale-95'  추가
        >
          <div className='flex gap-12'>
            <RadioGroup.Radio value='승인'>예약 승인</RadioGroup.Radio>
            <RadioGroup.Radio value='체험'>체험 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='완료'>예약 완료</RadioGroup.Radio>
            <RadioGroup.Radio value='취소'>예약 취소</RadioGroup.Radio>
            <RadioGroup.Radio value='거절'>예약 거절</RadioGroup.Radio>
          </div>
        </RadioGroup>
      </div>`}
        language='tsx'
      />
    </>
  );
}
