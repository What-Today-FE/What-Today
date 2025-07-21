import { Popover } from '@/components/popover';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const code = `
      <Popover.Root direction='fixed-center-center' className="w-400">
        <Popover.Trigger className="bg-gray-100 px-4 py-2 rounded">클릭</Popover.Trigger>
          <Popover.Content overlay preventInteraction className="p-4 h-300 rounded-2xl border border-gray-300 bg-white shadow flex items-center justify-center">
            Popover로 띄워진 내용입니다!
        </Popover.Content>
      </Popover.Root>
`;

export default function PopoverDoc() {
  return (
    <>
      <DocTemplate
        description={`
\`Popover\`은 사용자 인터랙션(보통 클릭)에 따라 특정 콘텐츠를 띄우는 컴포넌트입니다.  
**합성 컴포넌트 패턴**으로 구성되어 있어, \`Popover.Trigger\`, \`Popover.Content\` 등 서브 컴포넌트를 자유롭게 조합할 수 있습니다.

### 👉🏻 구성 요소

- \`<Popover.Root>\` : 전체 컨텍스트와 상태를 제공하는 루트 컴포넌트입니다. **(필수)**
- \`<Popover.Trigger>\` : 콘텐츠를 열기 위한 트리거 요소입니다. **(필수)**
- \`<Popover.Content>\` : 실제 드롭다운 등의 UI가 렌더링되는 부분입니다. **(필수)**

---
### 💬 작동 방식 요약
- 내부적으로 \`useState\`로 열림 여부(\`open\`)를 관리합니다.
- 위치 계산은 \`getPopoverPosition\` 유틸을 사용하여 수행됩니다.
- \`direction\`을 통해 콘텐츠의 위치를 제어할 수 있습니다. (예: 'top', 'bottom', 'left', 'right')

---

### 🪄 Slot + asChild

**Slot은 외부에서 전달한 컴포넌트를 감싸지 않고 그대로 렌더링하면서도, 내부에서 필요한 props를 주입할 수 있도록 해주는 유틸리티 컴포넌트입니다.**  
Slot을 사용하기 위해서는 asChild로 명시적으로 활성화해주어야 하며, 이 경우 하위 자식 요소는 반드시 하나의 유효한 React 엘리먼트여야 합니다.  
기본적으로 Popover.Trigger는 \`<button>\`으로 감싸 렌더링 되는데, 이때 asChild로 Slot을 사용하지 않은 채로 내부에 버튼을 사용하게 되면 “중첩된 버튼”이라는 오류가 발생합니다.  
(예를 들어 Popover.Trigger 안에 \`<button>확인</button>\`을 넣으면, 결과적으로 \`<button><button>확인</button></button>\`이 되어 HTML 구조상 유효하지 않기 때문입니다.)  
이는 \`<button>\`뿐만 아니라 \`<a>\`, \`<label>\` 등 **인터랙션을 가지는 다른 시맨틱 태그들도 마찬가지로 중첩될 경우 문제가 발생할 수 있으므로,**
이런 경우 반드시 \`asChild\`를 사용하여 Slot을 통해 렌더링해야 합니다:
\`\`\`tsx
<Popover.Trigger asChild>
  <button>열기</button>
</Popover.Trigger>
\`\`\`


        `}
        propsDescription={`
### Popover.Root
| 이름         | 타입                            | 설명                                              |
|--------------|----------------------------------|---------------------------------------------------|
| children     | \`ReactNode\`                    | \`Trigger\`, \`Content\` 등의 하위 요소를 포함해야 합니다. |
| direction    | \`'top', 'bottom', 'left', 'right', 'fixed-top-left', 'fixed-top-center' , 'fixed-top-right' , 'fixed-center-left' , 'fixed-center-center' , 'fixed-center-right' , 'fixed-bottom-left' , 'fixed-bottom-center' , 'fixed-bottom-right'\` | 콘텐츠가 나타날 방향으로, 기본값은 \`bottom\`입니다. \`fixed-\`가 붙으면 현재 뷰포트 기준(절대적), 없으면 Trigger 기준(상대적)으로 위치합니다.           |
| className    | \`string?\`                      | 스타일 확장용 className으로, Popover의 전체적인 크기를 조정합니다. (ex. Popover가 w-300이라면 Trigger의 크기도 w-300이며, Content의 matchTriggerWidth=true시 Content도 w-300입니다.)               |

---

### Popover.Trigger
| 이름        | 타입           | 설명                              |
|-------------|----------------|-----------------------------------|
| children    | \`ReactNode\`   | 버튼 등 트리거 역할의 요소로, 기본적으로 children은 \`<button>\`으로 감싸 렌더링됩니다.       |
| className   | \`string?\`     | 스타일 확장용 className입니다. **하지만 일관성을 위해 Trigger의 \`width\`만 Popover(Root)에서 조정해주세요.**         |
| asChild     | \`boolean\`     | 기본 값은 false이며, true일 경우 children을 직접 렌더링하고, Slot을 통해 prop을 주입합니다. |

---

### Popover.Content
| 이름         | 타입             | 설명                                                           |
|--------------|------------------|----------------------------------------------------------------|
| children     | \`ReactNode\`     | 실제 보여질 콘텐츠                                             |
| className    | \`string?\`       | Tailwind 기반 스타일 확장용                                    |
| overlay        | \`boolean?\`| true시, Popover 뒷 배경에 반투명 검은색 레이어가 추가됩니다. (default: false)                             |
| preventInteraction  | \`boolean?\`  | true시, Popover 뒷 배경의 스크롤이 금지됩니다. (default: false)        |
| matchTriggerWidth  | \`boolean?\`  | true시, Popover의 크기를 Trigger 크기와 일치시킵니다. (default: false)        |

---
`}
        title='Popover'
      />

      <Popover.Root className='w-300' direction='top'>
        <Popover.Trigger className='rounded bg-gray-100 px-4 py-2'>클릭하면 위로!</Popover.Trigger>
        <Popover.Content className='rounded bg-white p-4 shadow'>위쪽에 위치한 Popover입니다.</Popover.Content>
      </Popover.Root>
      <DocCode
        code={`<Popover.Root className='w-300' direction='top'>
  <Popover.Trigger className='bg-gray-100 px-4 py-2 rounded'>클릭하면 위로!</Popover.Trigger>
  <Popover.Content>
    <div>
      위쪽에 위치한 Popover입니다.
    </div>
  </Popover.Content>
</Popover.Root>`}
      />

      {/* direction 각각 예시 */}
      <div className='my-24 flex flex-wrap gap-6'>
        {(['top', 'right', 'bottom', 'left'] as const).map((dir) => (
          <Popover.Root key={dir} className='w-200' direction={dir}>
            <Popover.Trigger className='rounded border border-gray-300 px-4 py-2'>{dir} 방향</Popover.Trigger>
            <Popover.Content>
              <div className='h-100 rounded-2xl border border-gray-100 bg-white p-10 shadow-md'>
                {dir}에서 나타나는 Popover
              </div>
            </Popover.Content>
          </Popover.Root>
        ))}
      </div>

      {/* Playground */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Popover }} />
      </div>
    </>
  );
}
