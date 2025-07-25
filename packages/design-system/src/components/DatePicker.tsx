import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';

import { Calendar } from './calendar';
import DayCell from './calendar/DayCell';
import { CalendarIcon } from './icons';
import { Popover } from './popover';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const formattedDate = selectedDate ? selectedDate.format('YY/MM/DD') : '';
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className='relative flex w-full flex-col gap-12 md:flex-row'>
      <div className='relative w-full'>
        <input
          readOnly
          aria-describedby='date-picker-help'
          aria-label='선택된 날짜'
          className='w-full rounded-2xl border px-8 py-13 text-sm md:px-20 md:py-13 md:text-lg'
          placeholder='yy/mm/dd'
          type='text'
          value={formattedDate}
        />
        <div className='sr-only' id='date-picker-help'>
          + 달력 아이콘을 클릭하여 날짜를 선택하세요 +{' '}
        </div>

        <Popover.Root className='absolute top-1/2 right-20 -translate-y-1/2 cursor-pointer' direction='left'>
          <Popover.Trigger className='flex items-center'>
            <CalendarIcon className='size-15 md:size-20' />
          </Popover.Trigger>

          <Popover.Content className='mt-50 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm'>
            <Calendar.Root
              className='w-250 md:w-300'
              initialDate={today}
              onDateChange={(newDate) => setSelectedDate(dayjs(newDate))}
            >
              <Calendar.Header />
              <Calendar.Grid divider weekdayType='short'>
                {(day) => <DayCell day={day} />}
              </Calendar.Grid>
            </Calendar.Root>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}
