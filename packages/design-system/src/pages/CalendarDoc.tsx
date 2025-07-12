import Playground from '@/layouts/Playground';

import Calendar from '../components/calendar/Calendar';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Calendar />`;

export default function CalendarDoc() {
  return (
    <>
      <DocTemplate
        description={`
현재 월을 기준으로 월간 캘린더를 렌더링하는 UI 컴포넌트입니다.  
날짜 그리드, 월 이동 버튼 등을 포함하며, 추후 예약이나 일정 관련 기능을 확장할 예정입니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import { Calendar } from '@what-today/design-system';

<Calendar />
\`\`\`
`}
        propsDescription={`
| 이름         | 타입           | 설명                                      |
|--------------|----------------|-------------------------------------------|
| currentMonth | \`Dayjs\`      | 현재 렌더링할 달의 날짜 객체입니다.       |
| onPrev       | \`() => void\` | 이전 달로 이동할 때 호출되는 콜백입니다. |
| onNext       | \`() => void\` | 다음 달로 이동할 때 호출되는 콜백입니다. |
`}
        title='Calendar'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code='<Calendar />' />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Calendar }} />
      </div>
    </>
  );
}
