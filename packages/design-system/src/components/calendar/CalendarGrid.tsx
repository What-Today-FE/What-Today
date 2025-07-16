import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { twMerge } from 'tailwind-merge';

import { useCalendarContext } from './CalendarContext';

interface CalendarGridProps {
  weekdayType: 'long' | 'short';
  weekdayClass?: string;
  divider: boolean;
  children: (day: Dayjs) => React.ReactNode;
}
// dayjs 확장 및 로케일 설정
dayjs.extend(localeData);
dayjs.locale('en');

/**
 * CalendarGrid 컴포넌트
 *
 * - 전달받은 currentMonth를 기준으로 달력 형태의 날짜 그리드를 구성합니다.
 * - 주 단위 배열로 분할하여 렌더링하며, 해당 월이 아닌 날짜는 흐리게 표시합니다.
 *
 * @component
 * @param {CalendarGridProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <CalendarGrid currentMonth={dayjs()} />
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
