import { useToast } from '@components/Toast';

import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `예시 코드를 작성해주세요.`;

export default function ToastDoc() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: '토스트 테스트',
      description: '정상적으로 동작 중입니다!',
    });
  };
  return (
    <>
      <button onClick={handleClick}>토스트 테스트 버튼</button>
      <DocTemplate
        description={`
# Toast 컴포넌트

간단한 설명을 작성해주세요.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
`}
        title='Toast'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code={`<Toast variant="primary">Click me</Toast>`} />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ toast }} />
      </div>
    </>
  );
}
