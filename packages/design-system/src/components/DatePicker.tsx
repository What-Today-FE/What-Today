import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
  const [isOpen, setIsOpen] = useState(false);
  const formattedDate = value ? value.format('YY/MM/DD') : '';
  const today = dayjs().format('YYYY-MM-DD');

  const handleDateChange = (newDate: string) => {
    onChange(dayjs(newDate));
    setIsOpen(false); // 날짜 선택 시 팝오버 닫기
  };

  return (
    <div className='relative flex flex-col gap-12 md:flex-row'>
      <div className='relative w-full'>
        <Popover.Root direction='bottom-right' disabled={disabled} open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <div className='w-full cursor-pointer' onClick={() => !disabled && setIsOpen(true)}>
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
            </div>
          </Popover.Trigger>

          <Popover.Content className='date-picker mt-8 flex justify-end shadow-[0_4px_24px_rgba(156,180,202,0.2)]'>
            <div className='w-300 rounded-xl border border-gray-100 bg-white p-12'>
              <Calendar.Root initialDate={today} onDateChange={handleDateChange}>
                <Calendar.Header headerClass='my-12' />
                <Calendar.Grid divider weekdayType='short'>
                  {(day) => {
                    const isBeforeToday = day.isBefore(dayjs(), 'day');
                    const isSelected = value && day.isSame(value, 'day');
                    const isToday = day.isSame(dayjs(), 'day');

                    return (
                      <Calendar.DayCell
                        dateClass={twMerge(
                          !isBeforeToday && 'hover:bg-gray-50',
                          isToday && 'bg-transparent text-gray-800 hover:bg-gray-50',
                          isSelected && 'bg-primary-500 text-white',
                        )}
                        day={day}
                        dayCellClass={isBeforeToday ? 'opacity-30 pointer-events-none cursor-not-allowed' : undefined}
                      />
                    );
                  }}
                </Calendar.Grid>
              </Calendar.Root>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}
