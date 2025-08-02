import dayjs, { type Dayjs } from 'dayjs';

import { Calendar } from './calendar';
import { CalendarIcon } from './icons';
import { Input } from './input';
import { Popover } from './popover';

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newDate: Dayjs) => void;
  disabled?: boolean;
}

export default function DatePicker({ value, onChange, disabled }: DatePickerProps) {
  const formattedDate = value ? value.format('YY/MM/DD') : '';
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className='relative flex flex-col gap-12 md:flex-row'>
      <div className='relative w-full'>
        <Popover.Root direction='bottom' disabled={disabled}>
          <Popover.Trigger>
            <Input.Root className='w-full' disabled={disabled}>
              <Input.Wrapper>
                <Input.Field readOnly placeholder='년 / 월 / 일' value={formattedDate} />
                <span className='cursor-pointer'>
                  <Input.Icon>
                    <CalendarIcon className='size-20' />
                  </Input.Icon>
                </span>
              </Input.Wrapper>
              <Input.ErrorMessage />
            </Input.Root>
          </Popover.Trigger>

          <Popover.Content className='date-picker mt-8 w-fit rounded-xl border border-gray-100 bg-white p-12'>
            <Calendar.Root initialDate={today} onDateChange={(newDate) => onChange(dayjs(newDate))}>
              <Calendar.Header headerClass='my-12' />
              <Calendar.Grid divider weekdayType='short'>
                {(day) => {
                  const isBeforeToday = day.isBefore(dayjs(), 'day');

                  return (
                    <Calendar.DayCell
                      dateClass={!isBeforeToday ? 'hover:bg-gray-50' : undefined}
                      day={day}
                      dayCellClass={isBeforeToday ? 'opacity-30 pointer-events-none cursor-not-allowed' : undefined}
                    />
                  );
                }}
              </Calendar.Grid>
            </Calendar.Root>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}
