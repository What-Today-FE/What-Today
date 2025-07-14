import { memo, useRef, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { Input } from '@/components';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';

const TextareaExample = memo(function TextareaExample() {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const logCurrentValue = () => {
    console.log('[Ref] 현재 값:', textareaRef.current?.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Input.Root error='입력되지 않았습니다.' size='xs'>
        <Input.Label className='font-bold'>소중한 경험을 들려주세요</Input.Label>
        <Input.Wrapper>
          <Input.Textarea
            ref={textareaRef}
            className='h-50'
            maxLength={300}
            placeholder='크기 조정이 불가능한 textarea입니다.'
            value={value}
            onChange={handleChange}
          />
        </Input.Wrapper>
        <Input.ErrorMessage />
        <Input.TextCounter length={value.length} maxLength={300} />
      </Input.Root>

      <button className='text-md my-4 cursor-pointer rounded bg-black px-8 py-2 text-white' onClick={logCurrentValue}>
        콘솔창에 현재 값 출력
      </button>
    </>
  );
});

const AutoResizeTextareaExample = memo(function AutoResizeTextareaExample() {
  const [value, setValue] = useState('');

  const logCurrentValue = () => {
    console.log('[State] 현재 값:', value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Input.Root size='md'>
        <Input.Label>입력 폼에서 사용</Input.Label>
        <Input.Wrapper>
          <Input.Textarea
            autoHeight
            className='h-50'
            placeholder='크기 조정이 가능한 textarea입니다.'
            value={value}
            onChange={handleChange}
          />
        </Input.Wrapper>
        <Input.ErrorMessage />
      </Input.Root>

      <button className='text-md my-4 cursor-pointer rounded bg-black px-8 py-2 text-white' onClick={logCurrentValue}>
        콘솔창에 현재 값 출력
      </button>
    </>
  );
});

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `function Example() {
  const [value, setValue] = React.useState('');

  return (
    <Input.Root>
      <Input.Label>내용</Input.Label>
      <Input.Wrapper>
        <Input.Textarea
          autoHeight={true}
          placeholder="내용을 입력해주세요."
          value={value}
          maxLength={300}
          onChange={(e) => setValue(e.target.value)}
        />
      </Input.Wrapper>
      <Input.TextCounter length={value.length} maxLength={300} />
      <Input.ErrorMessage />
    </Input.Root>
  );
}

render(<Example />);`;

export default function TextareaDoc() {
  return (
    <>
      <DocTemplate
        description={`
Textarea는 Input 공통 컴포넌트에서 지원하기 때문에, \`import { Input } from '@/components';\`하여 사용하며, 사용법도 비슷합니다.  
[🔗 Input 디자인 문서 바로가기](/docs/Input)


Textarea는 다음과 같은 구성 요소로 이루어져 있습니다.

- \`<Input.Root>\`: 컨텍스트 및 전체 레이아웃 제공 **(필수)**
  - props : id, size = 'md', className, disabled, error (에러 메시지)
- \`<Input.Label>\`: \`htmlFor\` 속성으로 \`Field\`와 연결되는 레이블
- \`<Input.Wrapper>\`: 필드와 아이콘 등을 감싸는 레이아웃 박스로 **(필수)**
- \`<Input.Textarea>\`: 실제 input 태그 **(필수)**
  - props : value, onChange, ref, type = 'text', className, ...
- \`<Input.TextCounter>\`: 글자 수 카운터 UI
  - props : length, maxLength(생략 가능), className
- \`<Input.ErrorMessage>\`: 에러 메시지를 표시하는 요소

---

### 🪄 autoHeight 옵션

- \`<Input.Textarea>\`의 \`autoHeight\` 옵션을 통해 Textarea의 높이를 자동으로 조정할 수 있습니다. (생략 가능)  
  default는 false이며, 옵션이 false인 경우에는 입력에 따라 크기가 자동 조정되지 않습니다.

---

### 💬 TextCounter 컴포넌트

- \`<Input.TextCounter>\`는 \`<Input.Wrapper>\` 외부에서 사용합니다. \`<Input.ErrorMessage>\`와 순서는 상관 없습니다.
- \`<Input.TextCounter>\`는 단순히 글자수를 계산하여 보여주는 UI 컴포넌트입니다.  
  따라서 **maxLength를 설정하더라도 실제 값에는 영향이 없으므로, \`<Input.TextArea>\`에서 설정해주세요.**


`}
        propsDescription={`
### Input.Root
| 이름      | 타입                                     | 설명                              |
|-----------|------------------------------------------|-----------------------------------|
| size      | \`'xl', 'lg, 'md, 'sm', 'xs', 'full'\` | Root 기준 사이즈 클래스 지정       |
| className | \`string\`                                | 외부에서 레이아웃 확장용 스타일   |
| id        | \`string\`                                | Field/Label/Aria 연결용 ID        |
| disabled  | \`boolean\`                               | 비활성화 여부                     |
| error     | \`string\`                                | 에러 메시지 (존재 시 invalid 처리) |

### Input.Label
| 이름       | 타입         | 설명                                         |
|------------|--------------|----------------------------------------------|
| className  | \`string\`     | 외부에서 레이아웃 확장용 스타일              |
| children   | \`ReactNode\`  | 라벨로 렌더링할 텍스트 또는 노드              |

### Input.Wrapper
| 이름       | 타입         | 설명                                                                 |
|------------|--------------|----------------------------------------------------------------------|
| className  | \`string\`     | 외부에서 스타일을 확장하거나 덮어쓰기 위한 TailwindCSS 클래스         |
| children   | \`ReactNode\`  | 내부에 렌더링할 컴포넌트들 (예: \`Input.Field\`, \`Input.Textarea\`, \`Input.Icon\`)       |

### Input.Textarea
Textarea의 높이 조정은 \`Input.Textarea\`의 \`className\`을 확장해야 합니다.
| 이름        | 타입                                     | 설명                                                              |
|-------------|------------------------------------------|-------------------------------------------------------------------|
| autoHeight  | \`boolean\`                                | \`true\`일 경우, 입력 내용에 따라 textarea의 높이를 자동 조절합니다. |
| value       | \`string, number, readonly string[]\`  | 현재 textarea에 입력된 값입니다.                                  |
| onChange    | \`(event: ChangeEvent<HTMLTextAreaElement>) => void\` | 입력 변경 핸들러 함수입니다.                              |
| className   | \`string\`                                 | 외부에서 스타일을 확장하거나 덮어쓰기 위한 TailwindCSS 클래스입니다. |
| ref         | \`React.Ref<HTMLTextAreaElement>\`         | textarea DOM에 대한 참조입니다.                                   |
| ...props    | \`TextareaHTMLAttributes<HTMLTextAreaElement>\` | 기본 HTML textarea 속성을 모두 지원합니다.                  |

### Input.TextCounter
| 이름        | 타입       | 설명                                                                 |
|-------------|------------|----------------------------------------------------------------------|
| length      | \`number\`   | 현재 입력된 글자 수 (필수)                                           |
| maxLength   | \`number?\`  | 최대 입력 가능 글자 수 (생략 가능)                                   |
| className   | \`string?\`  | 외부에서 스타일을 확장하거나 덮어쓰기 위한 TailwindCSS 클래스         |

### Input.ErrorMessage
| 이름        | 타입       | 설명                                                              |
|-------------|------------|-------------------------------------------------------------------|
| className   | \`string?\`  | 외부에서 스타일을 확장하거나 덮어쓰기 위한 TailwindCSS 클래스      |
`}
        title='Textarea'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <TextareaExample />
      <DocCode
        code={` <Input.Root error='입력되지 않았습니다.' size='xs'>
  <Input.Label className='font-bold'>소중한 경험을 들려주세요</Input.Label>
  <Input.Wrapper>
    <Input.Textarea
      ref={textareaRef}
      className='h-50'
      maxLength={300}
      placeholder='크기 조정이 불가능한 textarea입니다.'
      value={value}
      onChange={handleChange}
    />
  </Input.Wrapper>
  <Input.ErrorMessage />
  <Input.TextCounter length={value.length} maxLength={300} />
</Input.Root>`}
      />

      <AutoResizeTextareaExample />
      <DocCode
        code={`<Input.Root size='md'>
  <Input.Label>입력 폼에서 사용</Input.Label>
  <Input.Wrapper>
    <Input.Textarea
      autoHeight
      className='h-50'
      placeholder='크기 조정이 가능한 textarea입니다.'
      value={value}
      onChange={handleChange}
    />
  </Input.Wrapper>
  <Input.ErrorMessage />
</Input.Root>`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <LiveProvider noInline code={code} language='tsx' scope={{ Input }}>
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
