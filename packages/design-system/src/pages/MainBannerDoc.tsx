import Playground from '@/layouts/Playground';

import MainBanner from '../components/MainBanner/MainBanner';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const code = `

<MainBanner />`;

export default function MainBannerDoc() {
  return (
    <>
      <DocTemplate
        description={`
# MainBanner 컴포넌트

풀 화면 배너 슬라이드 컴포넌트입니다. 
자동 슬라이딩, 드래그 이동, 페이드 애니메이션, 이미지와 텍스트 오버레이를 포함합니다.
이미지는 외부 URL로 받아오며, 각각의 배너는 title 및 subtitle을 포함할 수 있습니다.
`}
        propsDescription={`
| 이름     | 타입         | 설명                             |
|----------|--------------|----------------------------------|
| 없음     | -            | props 없이 사용됩니다.           |
`}
        title='MainBanner'
      />

      <DocCode
        code={`import { MainBanner } from '@what-today/design-system';
          

      export default function Example() {
        return <MainBanner />;
      }`}
      />

      <div className='mt-24'>
        <Playground code={code} scope={{ MainBanner }} />
      </div>
    </>
  );
}
