import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import CalendarHeader from './CalendarHeader';

export default function Calendar() {
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
    </div>
  );
}
