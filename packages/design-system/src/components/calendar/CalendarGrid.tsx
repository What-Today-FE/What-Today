import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { twMerge } from 'tailwind-merge';

import { useCalendarContext } from './CalendarContext';

interface CalendarGridProps {
  /**
   * 요일 이름 포맷 (`long`: 'Mon', 'Tue', ..., `short`: 'M', 'T', ...)
   */
  weekdayType: 'long' | 'short';
  /**
   * 요일 칼럼에 적용될 클래스
   */
  weekdayClass?: string;
  /**
   * 주간 행 구분선 여부
   */
  divider: boolean;
  /**
   * 날짜 셀 렌더 함수
   */
  children: (day: Dayjs) => React.ReactNode;
}
// dayjs 확장 및 로케일 설정
dayjs.extend(localeData);
dayjs.locale('en');

/**
 * CalendarGrid 컴포넌트
 *
 * - 주간 요일 표시와 날짜 셀을 그리드 형태로 렌더링합니다.
 * - `CalendarContext`로부터 현재 월(`currentMonth`)을 받아 해당 월의 달력을 구성합니다.
 * - 자식으로 렌더링할 각 날짜 셀을 `children(day: Dayjs)` 함수 형태로 받습니다.
 *
 * @component
 * @param {CalendarGridProps} props - 달력 격자 설정
 * @returns {JSX.Element} 달력 그리드 UI
 *
 * @example
 * ```tsx
 * <CalendarGrid
 *   weekdayType="short"
 *   divider={true}
 *   children={(day) => <DayCell day={day} />}
 * />
 * ```
 */
export default function CalendarGrid({ weekdayType, weekdayClass, divider, children }: CalendarGridProps) {
  const { currentMonth } = useCalendarContext();
  const weekdays = {
    long: dayjs.weekdaysShort(),
    short: dayjs.weekdaysShort().map((d) => d[0]),
  };

  const weekdayColorMap: Record<string, string> = {
    0: 'text-red-500',
    6: 'text-blue-500',
  };

  const startDate = dayjs(currentMonth).startOf('month').startOf('week');
  const endDate = dayjs(currentMonth).endOf('month').endOf('week');

  const calendarDays = [];
  let current = startDate;
  while (!current.isAfter(endDate)) {
    calendarDays.push(current);
    current = current.add(1, 'day');
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className='w-full'>
      <div className='grid grid-cols-7 border-b border-gray-100'>
        {weekdays[weekdayType].map((day, idx) => {
          const textColor = weekdayColorMap[idx] ?? 'text-gray-950';
          return (
            <div
              key={day}
              className={twMerge('flex justify-center p-12 text-lg font-semibold', textColor, weekdayClass)}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className={divider ? 'divide-y divide-solid divide-gray-50' : ''}>
        {weeks.map((week, idx) => (
          <div key={idx} className='grid grid-cols-7'>
            {week.map((day) => {
              return children(day);
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
