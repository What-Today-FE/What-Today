import { useNavigate } from 'react-router-dom';

import Playground from '@/layouts/Playground';

import NoResult from '../components/NoResult';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<NoResult buttonMessage='예약하러 가기' dataName='예약 내역이' onRedirect={() => navigate('/mypage')} />`;

export default function NoResultDoc() {
  const navigate = useNavigate();

  return (
    <>
      <DocTemplate
        description={`
데이터가 없을 때 보여질 컴포넌트입니다.  
고정적으로 \`로고 이미지\` / \`데이터 없음 문구\` / \`버튼\`으로 구성되어 있으며, 버튼을 누르면 다른 페이지로 리다이렉트합니다.  

디자인 시스템에서 제작한 컴포넌트 내부에서는 라우터 변경이 불가능하기 때문에, **외부에서 리다이렉트 콜백 함수를 prop으로 넘겨주어야 합니다.**  
=> \`onRedirect={() => navigate('/mypage')}\`

단순한 UI라서 스타일 확장은 고려하지 않았습니다.  
그래서 간단하게 데스크탑/태블릿과 모바일에서 이미지 크기를 다르게 설정해두었습니다. (차이가 크지는 않습니다..ㅎㅎ)


`}
        propsDescription={`
| 이름 | 타입 | 설명 | 기본 값 |
|------|------|------|----|
| dataName  | \`string?\`     |    \`앗, 아직 {dataName} 없습니다\`에 해당하는 문구 (데이터 종류)      |\`데이터가\`|
| buttonMessage   | \`string?\`  | 리다이렉트 버튼에 나타날 문구             |\`둘러보기\`|
| onRedirect   | \`() => void\`  | 버튼 클릭 시 이동할 라우터 경로가 담긴 콜백 함수 (예: \`onClick={() => navigate('/mypage')}\`) |-|
`}
        title='NoResult'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <div className='my-12'>
        <NoResult buttonMessage='예약하러 가기' dataName='예약 내역이' onRedirect={() => navigate('/mypage')} />
      </div>
      <DocCode
        code={`<NoResult buttonMessage='예약하러 가기' dataName='예약 내역이' onRedirect={() => navigate('/mypage')} />`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ NoResult }} />
      </div>
    </>
  );
}
