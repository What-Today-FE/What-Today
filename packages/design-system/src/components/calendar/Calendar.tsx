import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  return <div className='flex w-640 flex-col gap-30 rounded-3xl pt-20 pb-10 shadow-sm'>calendar</div>;
}
