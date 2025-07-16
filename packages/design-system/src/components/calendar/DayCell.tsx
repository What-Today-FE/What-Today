import type { Dayjs } from 'dayjs';
import { twJoin, twMerge } from 'tailwind-merge';

import { useCalendarContext } from './CalendarContext';

interface DayCellProps {
  day: Dayjs;
  reservableDates?: Set<string>;
  dayCellClass?: string;
  dateClass?: string;
}

export default function DayCell({ day, reservableDates, dayCellClass, dateClass }: DayCellProps) {
  const { currentMonth, selectedDate, onSelectDate } = useCalendarContext();
  const handleClick = () => {
    onSelectDate(day.format('YYYY-MM-DD'));
  };

  const isReservable = reservableDates && reservableDates.has(day.format('YYYY-MM-DD'));
  const isOtherMonth = day.month() !== currentMonth.month();
  const isSelected = selectedDate === day.format('YYYY-MM-DD');
  const dayCellBaseClass = 'flex w-full aspect-square items-center justify-center cursor-pointer p-1';
  const dateBaseClass = twJoin(
    'text-lg font-medium rounded-full size-42 flex justify-center items-center',
    isOtherMonth ? 'text-gray-300' : 'text-gray-800',
    isReservable && 'bg-primary-100 text-primary-500',
    isSelected && 'bg-primary-500 text-white',
  );
  return (
    <div className={twMerge(dayCellBaseClass, dayCellClass)} onClick={handleClick}>
      <span className={twMerge(dateBaseClass, dateClass)}>{day.date()}</span>
    </div>
  );
}
