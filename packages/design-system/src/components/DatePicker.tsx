import dayjs, { type Dayjs } from 'dayjs';

import { Calendar } from './calendar';
import DayCell from './calendar/DayCell';
import { CalendarIcon } from './icons';
import { Input } from './input';
import { Popover } from './popover';

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newDate: Dayjs) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const formattedDate = value ? value.format('YY/MM/DD') : '';
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className='relative mt-200 mb-400 flex flex-col gap-12 md:flex-row'>
      <div className='relative w-full'>
        <Input.Root className='w-full'>
          <Input.Label className='font-bold'>날짜</Input.Label>
          <Input.Wrapper className='relative'>
            <Input.Field
              readOnly
              aria-describedby='date-picker-help'
              aria-label='선택된 날짜'
              className='md:text-md text-sm text-gray-950'
              placeholder='yy/mm/dd'
              value={formattedDate}
            />

            <Popover.Root direction='left'>
              <Popover.Trigger className='absolute top-1/2 right-16 -translate-y-1/2 cursor-pointer'>
                <CalendarIcon className='size-15 md:size-20' />
              </Popover.Trigger>

              <Popover.Content className='mt-50 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm'>
                <Calendar.Root
                  className='w-250 md:w-300'
                  initialDate={today}
                  onDateChange={(newDate) => onChange(dayjs(newDate))}
                >
                  <Calendar.Header />
                  <Calendar.Grid divider weekdayType='short'>
                    {(day) => <DayCell day={day} />}
                  </Calendar.Grid>
                </Calendar.Root>
              </Popover.Content>
            </Popover.Root>
          </Input.Wrapper>
          <Input.ErrorMessage />
        </Input.Root>
      </div>
    </div>
  );
}
