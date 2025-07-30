import { Calendar } from '@/components';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Calendar.Root>
        <Calendar.Header />
        <Calendar.Grid weekdayType='long' divider>
          {(day) => <Calendar.DayCell day={day} />}
        </Calendar.Grid>
      </Calendar.Root>`;

export default function CalendarDoc() {
  return (
    <>
      <DocTemplate
        description={`**Calendar 컴포넌트**는 월간 날짜 선택 UI를 구성할 수 있도록 설계된 합성 컴포넌트입니다.

- \`CalendarRoot\`: 컨텍스트 제공자 역할을 하며 선택 날짜와 현재 월을 관리합니다.
- \`CalendarHeader\`: 현재 월을 표시하고, 이전/다음 달로 이동하는 버튼을 제공합니다.
- \`CalendarGrid\`: 요일과 날짜 셀을 그리드 형태로 렌더링합니다.
- \`DayCell\`: 날짜 셀을 표현하며 선택/예약 가능 여부에 따라 스타일이 다르게 적용됩니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import {
  CalendarRoot,
  CalendarHeader,
  CalendarGrid,
  DayCell
} from '@what-today/design-system';

<Calendar.Root initialDate="2025-07-15">
  <Calendar.Header />
  <Calendar.Grid weekdayType="short" divider>
    {(day) => <DayCell day={day} />}
  </Calendar.Grid>
</Calendar.Root>
\`\`\`
`}
        propsDescription={`
### CalendarRoot
| Prop         | Type           | Required | Description                      |
|--------------|----------------|----------|----------------------------------|
| children    | React.ReactNode         | Yes       | 캘린더 하위 컴포넌트들                  |
| initialDate    | string         | No       | 선택된 날짜의 초기값                  |
| onDateChange    | (date: string) => void         | No       | 날짜 선택 시 상위로 선택된 날짜(ISO 문자열)를 알려주는 콜백                  |
| className    | string         | No       | 외부 스타일 지정                  |

### CalendarHeader
| Prop         | Type           | Required | Description                      |
|--------------|----------------|----------|----------------------------------|
| headerClass  | string         | No       | 헤더 wrapper 스타일               |
| titleClass   | string         | No       | 날짜 타이틀 스타일                |

### CalendarGrid
| Prop         | Type                           | Required | Description                          |
|--------------|----------------------------------|----------|--------------------------------------|
| weekdayType  | 'long' or 'short'              | Yes      | 요일 표기 방식                       |
| weekdayClass | string                          | No       | 요일 텍스트 스타일 지정              |
| divider      | boolean                         | No       | 주차 사이에 선을 넣을지 여부         |
| children     | (day: Dayjs) => React.ReactNode | Yes      | 날짜 셀 렌더링 함수                   |

### DayCell
| Prop             | Type           | Required | Description                             |
|------------------|----------------|----------|-----------------------------------------|
| day              | Dayjs          | Yes      | 날짜 객체                                 |
| reservableDates  | Set<string>    | No       | 예약 가능 날짜 (YYYY-MM-DD)              |
| dayCellClass     | string         | No       | 셀 wrapper 스타일                         |
| dateClass        | string         | No       | 날짜 숫자 텍스트 스타일                  |
`}
        title='Calendar'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-8 text-base font-semibold text-gray-600'>기본 캘린더</h3>
      <Calendar.Root onDateChange={(date) => alert(date)}>
        <Calendar.Header />
        <Calendar.Grid divider={false} weekdayType='short'>
          {(day) => <Calendar.DayCell day={day} reservableDates={new Set(['2025-07-18', '2025-07-25'])} />}
        </Calendar.Grid>
      </Calendar.Root>
      <DocCode
        code='<Calendar.Root>
        <Calendar.Header />
        <Calendar.Grid divider={false} weekdayType="short">
          {(day) => <Calendar.DayCell day={day} reservableDates={new Set(["2025-07-18", "2025-07-25"])} />}
        </Calendar.Grid>
      </Calendar.Root>'
      />

      <h3 className='mb-8 text-base font-semibold text-gray-600'>커스텀 캘린더</h3>

      <Calendar.Root
        className='gap-8 rounded-3xl pt-20 pb-10 md:gap-30 md:shadow-[0px_4px_24px_rgba(156,180,202,0.2)]'
        initialDate='2025-07-20'
        onDateChange={(date) => alert(date)}
      >
        <Calendar.Header headerClass='py-6' titleClass='md:text-xl' />
        <Calendar.Grid divider weekdayClass='text-sm font-bold md:text-lg' weekdayType='long'>
          {(day) => (
            <Calendar.DayCell dateClass='size-28 flex m-4 md:m-9' day={day} dayCellClass='h-104 items-start md:h-124' />
          )}
        </Calendar.Grid>
      </Calendar.Root>
      <DocCode
        code='<Calendar.Root className="gap-8 rounded-3xl pt-20 pb-10 md:gap-30 md:shadow-[0px_4px_24px_rgba(156,180,202,0.2)]">
        <Calendar.Header headerClass="py-6" titleClass="md:text-xl" />
        <Calendar.Grid weekdayType="long" weekdayClass="text-sm font-bold md:text-lg" divider>
          {(day) => <Calendar.DayCell day={day} dayCellClass="h-104 items-start md:h-124" dateClass="size-28 flex m-4 md:m-9" />}
        </Calendar.Grid>
      </Calendar.Root>'
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Calendar }} />
      </div>
    </>
  );
}
