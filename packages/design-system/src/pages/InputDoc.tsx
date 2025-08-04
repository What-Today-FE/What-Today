import { memo, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { Input } from '@/components/input';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const EmailInput = memo(function EmailInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root disabled>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder='이메일 형식으로 작성해주세요'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

const EmailInputError = memo(function EmailInputError() {
  return (
    <Input.Root error='이메일 형식으로 작성해주세요.'>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field placeholder='이메일 형식으로 작성해주세요' value='email.email' onChange={() => {}} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

const TitleInput = memo(function TitleInput() {
  const [_, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label className='font-bold'>제목</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder='제목을 작성해주세요.'
          value='함께 배우면 더 재밌는 스트릿 댄스'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

const NicknameEditInput = memo(function NicknameEditInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label>닉네임</Input.Label>
      <Input.Wrapper>
        <Input.Field placeholder='정만철' value={value} onChange={(e) => setValue(e.target.value)} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

const PasswordInput = memo(function PasswordInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label>비밀번호</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder='8자 이상 입력해주세요'
          type='password'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input.Icon className='cursor-pointer'>👀</Input.Icon>
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

const SearchInput = memo(function SearchInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Wrapper className='rounded-3xl border-none shadow-sm'>
        <Input.Icon className='cursor-pointer'>🔎</Input.Icon>
        <Input.Field placeholder='내가 원하는 체험은...' value={value} onChange={(e) => setValue(e.target.value)} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

const CustomInput = memo(function CustomInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root className='bg-primary-100' size='full'>
      <Input.Label className='text-primary-500'>마음대로 꾸며보세요!</Input.Label>
      <Input.Wrapper className='border-green-500 focus-within:bg-amber-300 focus-within:text-orange-600'>
        <Input.Field placeholder='마음대로 꾸며보세요!' value={value} onChange={(e) => setValue(e.target.value)} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `function Example() {
  const [value, setValue] = React.useState('');

  return (
    <Input.Root>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder="이메일 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

render(<Example />);`;

export default function InputDoc() {
  return (
    <>
      <DocTemplate
        description={`

Input은 합성 컴포넌트 패턴으로 구현되어 있으며, 다음과 같은 구성 요소로 이루어져 있습니다:

- \`<Input.Root>\`: 컨텍스트 및 전체 레이아웃 제공 **(필수)**
  - props : id, size = 'md', className, disabled, error (에러 메시지)
- \`<Input.Label>\`: \`htmlFor\` 속성으로 \`Field\`와 연결되는 레이블
- \`<Input.Wrapper>\`: 필드와 아이콘 등을 감싸는 레이아웃 박스로 **(필수)**
- \`<Input.Field>\`: 실제 input 태그 **(필수)**
  - props : value, onChange, ref, type = 'text', className, ...
- \`<Input.Icon>\`: 좌/우 아이콘을 렌더링하는 요소 (단순 텍스트, displayName이 'Icon'인 컴포넌트만 허용)
- \`<Input.TextCounter>\`: 글자 수 카운터 UI
  - props : length, maxLength(생략 가능), className
- \`<Input.ErrorMessage>\`: 에러 메시지를 표시하는 요소

---

### 💡 커스텀 스타일 적용 팁

- 모든 구성 요소(ex. \`<Input.Root>\`, \`<Input.Label> \`...)은 외부에서 \`className\`을 통해 스타일 확장이 가능합니다.
- **크기 조절**은 \`<Input.Root>\`에서 \`size\` 또는 \`className\`으로 조정하세요.   
(\`<Input.Wrapper>\` 혹은 \`<Input.Field>\`에서 크기를 조정하면 빈 공간이 생길 수 있습니다.)
- **테두리 포커스 스타일**을 조절하려면 \`focus-within:\` 유틸리티를 \`<Input.Wrapper>\`에 적용해야 합니다.
- \`<Input.Icon>\`은 Wrapper 내부에서만 사용해야 하며, 내부 children 조건을 만족하지 않으면 렌더링되지 않습니다. 조건은 아래와 같습니다.
    1. 단순 텍스트
    2. 컴포넌트 이름 내 'Icon' 포함
- \`<Input.Wrapper>\` 내부에서, \`<Input.Field>\`와 \`<Input.Icon>\`의 순서는 작성한 코드 순서와 동일합니다.

---

### ⚠️ 주의 사항

- Context 기반으로 구성되어 있어, 컴포넌트는 반드시 \`<Input.Root>\` 안에서 사용되어야 합니다.
- \`<Input.Root>\`,  \`<Input.Wrapper>\`,  \`<Input.Field>\`은 필수 요소입니다.

---

### 💬 TextCounter 컴포넌트

- \`<Input.TextCounter>\`는 \`<Input.Wrapper>\` 외부에서 사용합니다. \`<Input.ErrorMessage>\`와 순서는 상관 없습니다.
- \`<Input.TextCounter>\`는 단순히 글자수를 계산하여 보여주는 UI 컴포넌트입니다.  
  따라서 maxLength를 설정하더라도 실제 값에는 영향이 없으므로, \`<Input.Field>\`에서 설정해주세요.

---

### 🪄 성능 최적화

- Input의 모든 구성 요소는 memo로 메모이제이션 처리하였습니다.
- 성능 최적화를 위해 입력 목적(도메인)에 따라 Input 컴포넌트를 별도로 정의하고 memoization(memo)을 적용하는 방식도 고려해볼 수 있습니다.
  - 불필요한 리렌더링 최소화
  - 각 Input이 사용 목적별로 분리되어 있어, 도메인 특화 로직(검증, 스타일, ...)을 캡슐화하기 쉬워짐 -> 내부에서 zod 등 유효성 검사 가능
  \`\`\`tsx
  // Email 도메인으로 분리
  const EmailInput = memo(function EmailInput() {  // memo로 메모이제이션
    const [value, setValue] = useState('');

    return (
      <Input.Root>
        <Input.Label>이메일</Input.Label>
        <Input.Wrapper>
          <Input.Field
            placeholder='이메일 형식으로 작성해주세요'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Input.Wrapper>
        <Input.ErrorMessage />
      </Input.Root>
    );
  });
  \`\`\`


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

### Input.Icon
| 이름        | 타입         | 설명                                                                 |
|-------------|--------------|----------------------------------------------------------------------|
| className   | \`string?\`     | 외부에서 스타일을 확장하거나 덮어쓰기 위한 TailwindCSS 클래스         |
| children    | \`ReactNode\`   | 렌더링할 아이콘 또는 문자열                                           |

### Input.Field
| 이름        | 타입                                         | 설명                                                                 |
|-------------|----------------------------------------------|----------------------------------------------------------------------|
| value       | \`string, number, readonly string[]\`     | 현재 입력된 값                                                       |
| onChange    | \`(e: ChangeEvent<HTMLInputElement>) => void\` | 입력 변경 핸들러 함수                                                |
| type        | \`string\`                                    | \`input\`의 타입 (기본값: \`'text'\`)                                   |
| className   | \`string?\`                                   | 외부에서 스타일을 확장하거나 덮어쓰기 위한 TailwindCSS 클래스         |
| ref         | \`React.Ref<HTMLInputElement>\`               | input DOM에 대한 참조                                                |
| ...props    | \`InputHTMLAttributes<HTMLInputElement>\`     | 기본 HTML input 속성을 모두 지원                                    |


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
        title='Input'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <div className='flex flex-col gap-12'>
        <EmailInput />
        <DocCode
          code={`const EmailInput = memo(function EmailInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder='이메일 형식으로 작성해주세요'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

      <div className='mt-24 flex flex-col gap-12'>
        <EmailInputError />
        <DocCode
          code={`const EmailInputError = memo(function EmailInput() {
  return (
    <Input.Root error='이메일 형식으로 작성해주세요.'>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field placeholder='이메일 형식으로 작성해주세요' value='email.email' onChange={(e) => {}} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

      <div className='mt-24 flex flex-col gap-12'>
        <TitleInput />
        <DocCode
          code={`const TitleInput = memo(function TitleInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label className='font-bold'>제목</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder='제목을 작성해주세요.'
          value='함께 배우면 더 재밌는 스트릿 댄스'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

      <div className='mt-24 flex flex-col gap-12'>
        <NicknameEditInput />
        <DocCode
          code={`const NicknameEditInput = memo(function NicknameEditInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label>닉네임</Input.Label>
      <Input.Wrapper>
        <Input.Field placeholder='정만철' value={value} onChange={(e) => setValue(e.target.value)} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

      <div className='mt-24 flex flex-col gap-12'>
        <PasswordInput />
        <DocCode
          code={`const PasswordInput = memo(function PasswordInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Label>비밀번호</Input.Label>
      <Input.Wrapper>
        <Input.Field
          placeholder='8자 이상 입력해주세요'
          type='password'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input.Icon className='cursor-pointer'>👀</Input.Icon>
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

      <div className='mt-24 flex flex-col gap-12'>
        <SearchInput />
        <DocCode
          code={`const SearchInput = memo(function SearchInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root>
      <Input.Wrapper className='rounded-3xl border-none shadow-sm'>
        <Input.Icon className='cursor-pointer'>🔎</Input.Icon>
        <Input.Field placeholder='내가 원하는 체험은...' value={value} onChange={(e) => setValue(e.target.value)} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

      <div className='mt-24 flex flex-col gap-12'>
        <CustomInput />
        <DocCode
          code={`const CustomInput = memo(function CustomInput() {
  const [value, setValue] = useState('');

  return (
    <Input.Root className='bg-primary-100' size='full'>
      <Input.Label className='text-primary-500'>마음대로 꾸며보세요!</Input.Label>
      <Input.Wrapper className='border-green-500 focus-within:bg-amber-300 focus-within:text-orange-600'>
        <Input.Field placeholder='마음대로 꾸며보세요!' value={value} onChange={(e) => setValue(e.target.value)} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
});`}
        />
      </div>

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
