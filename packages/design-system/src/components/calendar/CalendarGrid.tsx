import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

interface CalendarGridProps {
  currentMonth: Dayjs;
}
dayjs.extend(localeData);
dayjs.locale('en');

export default function CalendarGrid({ currentMonth }: CalendarGridProps) {
  // 요일 계산(일~토)
  const Weekdays = dayjs.weekdays();
  const oneLetterWeekdays = Weekdays.map((day) => day.charAt(0));

  // 날짜 계산(..1~31..)
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
    <div className='text-lg'>
      <div className='flex border-b border-gray-100 pb-12 font-bold'>
        {oneLetterWeekdays.map((day, idx) => (
          <div key={idx} className='flex w-92 justify-center p-12'>
            {day}
          </div>
        ))}
      </div>
      <div className='divide-y divide-solid divide-gray-50'>
        {weeks.map((week, i) => (
          <div key={i} className='flex'>
            {week.map((day, j) => {
              const isOtherMonth = day.month() !== currentMonth.month();
              return (
                <div
                  key={j}
                  className={`flex h-124 w-92 items-stretch justify-center p-12 ${
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
