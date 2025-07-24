import { useState } from 'react';

import Playground from '@/layouts/Playground';

import StarRating from '../components/StarRating';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground에서 사용할 예시 코드 */
const code = `
function Example() {
  const [rating, setRating] = React.useState(0);

  return (
    <div>
      <StarRating value={rating} onChange={setRating} className="text-[28px]" />
      <button
        onClick={() => alert(\`선택한 별점: \${rating}점\`)}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        제출하기
      </button>
    </div>
  );
}
render(<Example />);
`;

export default function StarRatingDoc() {
  const [rating, setRating] = useState(0);

  return (
    <>
      <DocTemplate
        description={`
# StarRating 컴포넌트

별점을 선택할 수 있는 UI 컴포넌트입니다.
사용자는 마우스를 이용해 별점을 미리보기하고, 클릭하여 값을 설정할 수 있습니다.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| value | number | 현재 선택된 별점 값입니다. |
| onChange | (value: number) => void | 별을 클릭했을 때 선택된 값을 반환합니다. |
| max | number \\| undefined | 별의 최대 개수입니다. 기본값은 5입니다. |
| className | string \\| undefined | 외부에서 스타일을 적용할 수 있는 Tailwind 클래스입니다. |
`}
        title='StarRating'
      />

      {/* 코드 예시 */}
      <DocCode code='<StarRating value={rating} onChange={setRating} />' />

      {/* 페이지에 바로 보이는 인터랙티브 예시 */}
      <div className='mt-6'>
        <StarRating value={rating} onChange={setRating} />
        <button
          className='mt-4 rounded bg-black px-4 py-2 text-white'
          onClick={() => alert(`선택한 별점: ${rating}점`)}
        >
          제출하기
        </button>
      </div>

      {/* Playground에서 실시간 편집 */}
      <div className='mt-24'>
        <Playground code={code} scope={{ StarRating }} />
      </div>
    </>
  );
}
