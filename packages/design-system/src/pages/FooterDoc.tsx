import Playground from '@/layouts/Playground';

import Footer from '../components/Footer';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Footer />`;

export default function FooterDoc() {
  return (
    <>
      <DocTemplate
        description={`
# Footer 컴포넌트

페이지 하단에 고정되는 공통 푸터입니다.  
로고, GitHub 링크 등을 포함합니다.
반응형 레이아웃을 지원하며, 3열 그리드 구조로 되어 있습니다.
`}
        propsDescription={`
**현재 Footer 컴포넌트는 별도의 props를 받지 않습니다.**


`}
        title='Footer'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code='<Footer />' />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Footer }} />
      </div>
    </>
  );
}
