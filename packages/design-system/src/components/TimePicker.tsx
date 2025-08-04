import { Select, type SelectItem } from '@components/select';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface TimePickerProps {
  /**
   * 현재 선택된 시간 값입니다.
   */
  value: { hour: string; minute: string } | null;
  /**
   * 시간 변경 시 호출되는 콜백 함수입니다.
   */
  onChange: (time: { hour: string; minute: string } | null) => void;
  /**
   * 외부에서 TimePicker 전체의 스타일을 조정할 수 있는 클래스입니다.
   */
  className?: string;
  disabled?: boolean;
}

/**
 * @description TimePicker 컴포넌트는 사용자로부터 시(hour)와 분(minute)을 선택받는 UI를 제공합니다.
 * @description Select 컴포넌트를 기반으로 구현되며, 외부 상태로 시간 값을 제어합니다.
 *
 * @param {TimePickerProps} props - 컴포넌트에 전달되는 props
 * @returns 시/분 선택 UI
 */
export default function TimePicker({ value, onChange, className, disabled = false }: TimePickerProps) {
  /**
   * Select.Item이 선택되었을 때 호출되는 핸들러입니다.
   * 선택된 값이 'hour' 또는 'minute'에 해당하는지 판별한 후, 상태를 업데이트합니다.
   *
   * @param {SelectItem} item - 선택된 SelectItem
   */
  const setTime = (item: SelectItem) => {
    if (item?.value.includes('hour')) {
      const hour = item.value.split('-')[1];
      onChange({
        hour,
        minute: value?.minute ?? '00',
      });
    } else if (item?.value.includes('minute')) {
      const minute = item.value.split('-')[1];
      onChange({
        hour: value?.hour ?? '00',
        minute,
      });
    }
  };

  const selectedItem: SelectItem | null = useMemo(() => {
    if (!value) return null;
    if (value.hour && !value.minute) return { value: `hour-${value.hour}`, label: value.hour };
    if (!value.hour && value.minute) return { value: `minute-${value.minute}`, label: value.minute };
    return null;
  }, [value]);

  return (
    <div>
      <Select.Root
        className={twMerge('w-120', className)}
        disabled={disabled}
        value={selectedItem}
        onChangeValue={setTime}
      >
        <Select.Trigger className='flex items-center gap-6 rounded-xl border bg-white px-20 py-10'>
          <div className={twMerge('flex gap-8', disabled && 'opacity-60')}>
            {value?.hour ? <span>{value?.hour}</span> : <span className='text-gray-300'>시</span>} :
            {value?.minute ? <span>{value.minute}</span> : <span className='text-gray-300'>분</span>}
          </div>
        </Select.Trigger>

        <Select.Content className='flex gap-4 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm'>
          {/* 시 선택 */}
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto pr-4'>
            {Array.from({ length: 24 }).map((_, i) => {
              const hour = String(i).padStart(2, '0');
              const isSelected = value?.hour === hour;
              return (
                <Select.Item
                  key={hour}
                  className={`flex cursor-pointer justify-center rounded-md px-8 py-4 ${
                    isSelected ? 'bg-primary-100' : 'hover:bg-gray-25'
                  }`}
                  value={`hour-${hour}`}
                >
                  {hour}
                </Select.Item>
              );
            })}
          </div>

          {/* 분 선택 */}
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto pr-4'>
            {Array.from({ length: 12 }).map((_, i) => {
              const minute = String(i * 5).padStart(2, '0');
              const isSelected = value?.minute === minute;
              return (
                <Select.Item
                  key={minute}
                  className={`flex cursor-pointer justify-center rounded-md px-8 py-4 ${
                    isSelected ? 'bg-primary-100' : 'hover:bg-gray-25'
                  }`}
                  value={`minute-${minute}`}
                >
                  {minute}
                </Select.Item>
              );
            })}
          </div>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
