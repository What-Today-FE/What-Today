import { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { Select } from '@/components';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const code = `function Example() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Select.Root className='w-300 md:w-500 xl:w-700' value={selectedValue} onChangeValue={(value) => setSelectedValue(value)}>
      <Select.Trigger className='py-10 bg-white border w-300 rounded-2xl px-15'>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>과일</Select.Label>
          <Select.Item value="apple">🍎 사과</Select.Item>
          <Select.Item value="banana">🍌 바나나</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

render(<Example />);`;

export default function SelectDoc() {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');

  return (
    <>
      <DocTemplate
        description={`
\`Select\`는 사용자로부터 옵션을 선택받기 위한 컴포넌트입니다.  
**합성 컴포넌트 패턴**으로 구성되어 있어, \`Select.Trigger\`, \`Select.Content\`, \`Select.Item\` 등 서브 컴포넌트를 자유롭게 조합할 수 있습니다.

### 👉🏻 구성 요소

- \`<Select.Root>\`: 전체 상태 및 컨텍스트를 관리하는 루트 컴포넌트입니다. **(필수)**
- \`<Select.Trigger>\`: 현재 선택된 값을 보여주며, 클릭 시 옵션 목록을 보여줍니다. **(필수)**
- \`<Select.Content>\`: 옵션 목록을 감싸는 컴포넌트로, 포지셔닝 및 오버레이 처리를 담당합니다. **(필수)**
- \`<Select.Group>\`, \`<Select.Label>\`: 항목을 그룹화하고, 그룹의 라벨을 제공합니다.
- \`<Select.Item>\`: 개별 선택 항목입니다. **(필수)**
- \`<Select.Value>\`: Trigger 내부에서 현재 선택된 값을 커스텀 렌더링할 때 사용합니다.
  - \`<Select.Value>\`을 생략하면 외부에서 직접 값을 사용해 Trigger 내부를 커스텀해야 합니다.
- \`<Select.Title>\`: Content 영역 최상단에 들어갈 타이틀 영역입니다.


        `}
        propsDescription={`
### Select.Root

| 이름           | 타입                                   | 설명                                                                 |
|----------------|----------------------------------------|----------------------------------------------------------------------|
| value          | \`string\`                               | 현재 선택된 값을 나타내며, 외부에서 상태를 제어하는 데 사용됩니다.   |
| onChangeValue  | \`(selectedValue: string) => void\`      | 항목이 선택될 때 호출되는 콜백 함수입니다. 선택된 값이 인자로 전달됩니다. |
| className      | \`string?\`                              | 전체 Select 컴포넌트(Popover)의 스타일을 확장할 수 있는 클래스입니다.  |
| children       | \`ReactNode\`                            | \`<Select.Trigger>\`, \`<Select.Content>\` 등을 포함해야 합니다.          |

---

### Select.Trigger
| 이름         | 타입         | 설명                                       |
|--------------|--------------|--------------------------------------------|
| className    | \`string?\`   | 스타일 확장용 클래스입니다.               |
| children      | \`ReactNode\`  | 트리거 내부에 표시할 내용으로, 일반적으로 \`<Select.Value />\`를 렌더링합니다. |

---

### Select.Content
| 이름        | 타입         | 설명                                                                 |
|-------------|--------------|----------------------------------------------------------------------|
| className   | \`string?\`    | 옵션 목록 wrapper(\`Popover.Content\`)에 적용할 Tailwind 클래스입니다.   |
| children    | \`ReactNode\`  | 옵션 항목(\`<Select.Item>\`), 혹은 \`<Select.Group>\`, \`<Select.Label>\` 등을 자식으로 포함합니다. |

---

### Select.Item
\`<Select.Content>\` 내부에서 사용됩니다.
| 이름         | 타입         | 설명                                       |
|--------------|--------------|--------------------------------------------|
| value        | \`string\`    | 선택될 고유한 값입니다.                  |
| children     | \`ReactNode\` | 화면에 표시될 텍스트 또는 요소입니다.       |
| className    | \`string?\`   | 스타일 확장용 클래스입니다.               |

---

### Select.Value
\`<Select.Trigger>\` 내부에서 사용됩니다.
| 이름         | 타입         | 설명                                                                 |
|--------------|--------------|----------------------------------------------------------------------|
| placeholder  | \`string?\`    | 선택된 값이 없을 경우 표시할 텍스트입니다. 기본값은 \`"값을 선택해주세요"\`입니다.  |
| className    | \`string?\`    | placeholder 텍스트에 적용할 Tailwind 클래스입니다.                  |

---

### Selct.Title
\`<Select.Trigger>\` 위에서 사용됩니다.
| 이름         | 타입         | 설명                                       |
|--------------|--------------|--------------------------------------------|
| children     | \`ReactNode\` | 레이블 또는 타이틀 텍스트                 |
| className    | \`string?\`   | 스타일 확장용 클래스입니다.               |

---

### Select.Label / Select.Group
\`<Select.Content>\` 내부에서 사용됩니다.
| 이름         | 타입         | 설명                                       |
|--------------|--------------|--------------------------------------------|
| children     | \`ReactNode\` | 레이블 또는 타이틀 텍스트                 |
| className    | \`string?\`   | 스타일 확장용 클래스입니다.               |
        `}
        title='Select'
      />

      {/* 1. 기본 예시 */}
      <div className='mb-12'>
        <Select.Root
          className='w-300 md:w-500 xl:w-700'
          value={selectedValue}
          onChangeValue={(value) => setSelectedValue(value)}
        >
          <Select.Trigger className='w-300 rounded-2xl border bg-white px-15 py-10'>
            <Select.Value placeholder='좋아하는 과일은 무엇인가요?' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>과일</Select.Label>
              <Select.Item value='apple'>🍎 사과</Select.Item>
              <Select.Item value='banana'>🍌 바나나</Select.Item>
              <Select.Item value='watermelon'>🍉 수박</Select.Item>
              <Select.Item value='peach'>🍑 복숭아</Select.Item>
              <Select.Item value='grape'>🍇 포도</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <p className='text-md text-gray-500'>선택된 값: {selectedValue}</p>
      </div>
      <DocCode
        code={`<Select.Root value={selectedValue} onChangeValue={(value) => setSelectedValue(value)}>
  <Select.Trigger className='py-10 bg-white border w-300 rounded-2xl px-15'>
    <Select.Value placeholder='좋아하는 과일은 무엇인가요?' />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>과일</Select.Label>
      <Select.Item value='apple'>🍎 사과</Select.Item>
      <Select.Item value='banana'>🍌 바나나</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>`}
      />

      <div className='my-24 space-y-20'>
        <div>
          <Select.Root className='w-300' value={selectedValue2} onChangeValue={(value) => setSelectedValue2(value)}>
            <Select.Trigger className='w-300 rounded-2xl border bg-white px-15 py-10'>
              <Select.Value />
            </Select.Trigger>
            <Select.Content className='w-300'>
              <Select.Group>
                <Select.Label>언어</Select.Label>
                <Select.Item value='js'>JavaScript</Select.Item>
                <Select.Item value='ts'>TypeScript</Select.Item>
                <Select.Item value='py'>Python</Select.Item>
                <Select.Item value='go'>Go</Select.Item>
              </Select.Group>

              <Select.Group>
                <Select.Label>프레임워크</Select.Label>
                <Select.Item value='react'>React</Select.Item>
                <Select.Item value='next'>Next.js</Select.Item>
                <Select.Item value='svelte'>Svelte</Select.Item>
                <Select.Item value='nuxt'>Nuxt.js</Select.Item>
              </Select.Group>

              <Select.Group>
                <Select.Label>스타일링</Select.Label>
                <Select.Item value='tailwind'>Tailwind CSS</Select.Item>
                <Select.Item value='emotion'>Emotion</Select.Item>
                <Select.Item value='styled'>styled-components</Select.Item>
              </Select.Group>

              <Select.Group>
                <Select.Label>테스트</Select.Label>
                <Select.Item value='text'>
                  안녕하세요. 의도적으로 길게 쓴 텍스트입니다. 자동으로 줄바꿈합니다.
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <p className='text-md text-gray-500'>선택된 값: {selectedValue2}</p>
        </div>
        <DocCode
          code={`<Select.Root className='w-300' value={selectedValue2} onChangeValue={(value) => setSelectedValue2(value)}>
  <Select.Trigger className='py-10 bg-white border w-300 rounded-2xl px-15'>
    <Select.Value />
  </Select.Trigger>
  <Select.Content className='w-300'>
    <Select.Group>
      <Select.Label>언어</Select.Label>
      <Select.Item value='js'>JavaScript</Select.Item>
      <Select.Item value='ts'>TypeScript</Select.Item>
    </Select.Group>

    <Select.Group>
      <Select.Label>프레임워크</Select.Label>
      <Select.Item value='react'>React</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>`}
        />
      </div>

      {/* Playground */}
      <div className='mt-24'>
        <LiveProvider noInline code={code} language='tsx' scope={{ Select, useState }}>
          <p className='mb-8 font-light text-gray-400'>4. Playground</p>
          <div className='rounded p-4'>
            <div className='mb-4'>
              <LiveEditor className='rounded-2xl bg-[#0B1522] p-10 font-mono text-sm' />
              <LiveError className='mt-2 text-sm text-red-500' />
            </div>
            <div className='mt-4 pt-4'>
              <p className='mb-8 font-light text-gray-400'>Output</p>
              <LivePreview />
            </div>
          </div>
        </LiveProvider>
      </div>
    </>
  );
}
