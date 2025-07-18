import Playground from '@/layouts/Playground';

import Footer from '../components/Footer';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `예시 코드를 작성해주세요.`;

export default function FooterDoc() {
  return (
    <>
      <DocTemplate
        description={`
# Footer 컴포넌트

간단한 설명을 작성해주세요.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
`}
        title='Footer'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code={`<Footer variant="primary">Click me</Footer>`} />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Footer }} />
      </div>
      <Footer />
    </>
  );
}
