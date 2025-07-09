import Button from '@components/Button';

import DocTemplate, { DocCode } from '@/layouts/DocTemplate';

export default function ButtonDocs() {
  return (
    <>
      <DocTemplate
        description={`
버튼 컴포넌트는 사용자와의 상호작용을 위한 기본 요소입니다. 다양한 **variant**와 상태를 제공하며, 클릭 이벤트를 처리할 수 있습니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import { Button } from '@what-today/design-system';

<Button variant="primary">확인</Button>
<Button variant="secondary" disabled>취소</Button>
\`\`\`
        `}
        propsDescription={`
| Prop       | Type                         | Required | Description            |
|------------|------------------------------|----------|------------------------|
| variant    | "primary" \\| "secondary"    | No       | 버튼 스타일 지정       |
| disabled   | boolean                      | No       | 비활성화 여부           |
| onClick    | () => void                   | No       | 클릭 이벤트 핸들러      |
| children   | React.ReactNode              | Yes      | 버튼 내부에 들어갈 내용 |
        `}
        title='Button (Example Doc)'
      />

      <div>
        <h3 className='mb-8 text-base font-semibold text-gray-600'>기본 버튼</h3>
        <Button variant='primary'>확인</Button>
        <Button className='ml-8' variant='secondary'>
          취소
        </Button>
        <DocCode
          code={`import { Button } from '@what-today/design-system';

<Button variant="primary">확인</Button>
<Button variant="secondary">취소</Button>`}
          language='tsx'
        />
      </div>

      <div className='mt-24'>
        <h3 className='mb-8 text-base font-semibold text-gray-600'>비활성화 버튼</h3>
        <Button disabled variant='primary'>
          제출
        </Button>
        <DocCode code={`<Button variant="primary" disabled>제출</Button>`} language='tsx' />
      </div>

      <div className='mt-24'>
        <h3 className='mb-8 text-base font-semibold text-gray-600'>클릭 이벤트</h3>
        <Button variant='primary' onClick={() => alert('클릭됨!')}>
          클릭
        </Button>
        <DocCode
          code={`<Button variant="primary" onClick={() => alert('클릭됨!')}>
  클릭
</Button>`}
          language='tsx'
        />
      </div>
    </>
  );
}
