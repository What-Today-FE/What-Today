import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { CalendarContext } from './CalendarContext';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';

/**
 * Calendar 컴포넌트 (월 단위의 달력을 렌더링하는 최상위 UI 컴포넌트)
 *
 * - 현재 월 상태를 관리하며, 이전/다음 달로 이동할 수 있습니다.
 * - 상단에는 월 이동을 위한 헤더(`CalendarHeader`)가 있고,
 * - 하단에는 날짜 그리드(`CalendarGrid`)가 표시됩니다.
 *
 * @component
 * @example
 * ```tsx
 * <Calendar />
 * ```
 */
export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  };
  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, 'month'));
  };

  return (
    <CalendarContext.Provider value={{ selectedDate, onSelectDate: setSelectedDate }}>
      <div
        aria-label='예약 캘린더'
        className='flex max-w-640 flex-col gap-8 rounded-3xl pt-20 pb-10 md:gap-30 md:shadow-[0px_4px_24px_rgba(156,180,202,0.2)]'
      >
        <CalendarHeader currentMonth={currentMonth} onNext={handleNextMonth} onPrev={handlePrevMonth} />
        <CalendarGrid currentMonth={currentMonth} />
      </div>
    </CalendarContext.Provider>
  );
}
