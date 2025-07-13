import Dropdown from '@/components/dropdown/Dropdown';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `예시 코드를 작성해주세요.`;

export default function DropdownDoc() {
  return (
    <>
      <DocTemplate
        description={`
# Dropdown 컴포넌트

간단한 설명을 작성해주세요.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
`}
        title='Dropdown'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code={`<Dropdown variant="primary">Click me</Dropdown>`} />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Dropdown }} />
      </div>
    </>
  );
}
