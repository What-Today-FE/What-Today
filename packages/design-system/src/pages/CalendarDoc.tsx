import { Calendar } from '@/components';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Calendar.Root className='gap-8 rounded-3xl pt-20 pb-10 md:gap-30 md:shadow-[0px_4px_24px_rgba(156,180,202,0.2)]'>
        <Calendar.Header headerClass='py-6' titleClass='md:text-xl' />
        <Calendar.Grid weekdayType='long' weekdayClass='text-sm font-bold md:text-lg' divider>
          {(day) => <Calendar.DayCell day={day} dayCellClass='h-104 items-start md:h-124' dateClass='size-28 flex m-4 md:m-9' />}
        </Calendar.Grid>
      </Calendar.Root>`;

export default function CalendarDoc() {
  return (
    <>
      <DocTemplate
        description={`
현재 월을 기준으로 월간 캘린더를 렌더링하는 UI 컴포넌트입니다.  
날짜 그리드, 월 이동 버튼 등을 포함하며, 추후 예약이나 일정 관련 기능을 확장할 예정입니다.

아래는 기본적인 사용 예시입니다:

// \`\`\`tsx
// import { Calendar } from '@what-today/design-system';

// <Calendar />
// \`\`\`
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
      <Calendar.Root>
        <Calendar.Header />
        <Calendar.Grid divider={false} weekdayType='short'>
          {(day) => <Calendar.DayCell day={day} reservableDates={new Set(['2025-07-18', '2025-07-25'])} />}
        </Calendar.Grid>
      </Calendar.Root>
      <DocCode code='<Calendar />' />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Calendar }} />
      </div>
    </>
  );
}
