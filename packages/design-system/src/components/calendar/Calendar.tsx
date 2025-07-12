import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';

// Calendar 최상위 컴포넌트
export default function Calendar() {
  // 현재 월 상태관리
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  };
  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, 'month'));
  };

  return (
    <div className='flex w-640 flex-col gap-30 rounded-3xl pt-20 pb-10 shadow-sm'>
      <CalendarHeader currentMonth={currentMonth} onNext={handleNextMonth} onPrev={handlePrevMonth} />
      <CalendarGrid currentMonth={currentMonth} />
    </div>
  );
}
