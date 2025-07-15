import type { Dayjs } from 'dayjs';
import { twJoin } from 'tailwind-merge';

import { useCalendarContext } from './CalendarContext';

interface DayCellProps {
  day: Dayjs;
  currentMonth: Dayjs;
}

export default function DayCell({ day, currentMonth }: DayCellProps) {
  const { selectedDate, onSelectDate } = useCalendarContext();
  const handleClick = () => {
    onSelectDate(day.format('YYYY-MM-DD'));
  };

  const isOtherMonth = day.month() !== currentMonth.month();
  const isSelected = selectedDate === day.format('YYYY-MM-DD');
  const dayCellClass = twJoin(
    'flex h-104 items-start justify-center cursor-pointer md:h-124',
    isOtherMonth ? 'text-gray-300' : 'text-gray-800',
  );
  const dateClass = twJoin(
    'text-xs font-medium md:text-lg',
    isSelected
      ? 'bg-primary-100 rounded-full size-20 md:size-32 flex justify-center items-center m-4 md:m-9'
      : 'p-4 md:p-12',
  );
  return (
    <div className={`${dayCellClass}`} onClick={handleClick}>
      <span className={`${dateClass}`}>{day.date()}</span>
    </div>
  );
}
