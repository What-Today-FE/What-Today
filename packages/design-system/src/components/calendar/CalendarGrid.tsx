import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

interface CalendarGridProps {
  /**
   * 현재 표시 중인 월 (Dayjs 객체)
   */
  currentMonth: Dayjs;
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
export default function CalendarGrid({ currentMonth }: CalendarGridProps) {
  const Weekdays = dayjs.weekdays();
  const oneLetterWeekdays = Weekdays.map((day) => day.charAt(0));

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
      <div className='grid grid-cols-7 border-b border-gray-100 pb-12'>
        {oneLetterWeekdays.map((day, idx) => (
          <div key={idx} className='flex justify-center p-12 text-sm font-bold text-gray-900 md:text-lg'>
            {day}
          </div>
        ))}
      </div>
      <div className='divide-y divide-solid divide-gray-50'>
        {weeks.map((week, idx) => (
          <div key={idx} className='grid grid-cols-7'>
            {week.map((day) => {
              const isOtherMonth = day.month() !== currentMonth.month();
              return (
                <div
                  key={day.format('MM/DD')}
                  className={`flex h-104 items-start justify-center p-12 text-xs font-medium md:h-124 md:text-lg ${
                    isOtherMonth ? 'text-gray-300' : 'text-gray-800'
                  }`}
                >
                  {day.date()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
