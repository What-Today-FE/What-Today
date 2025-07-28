import { Button, Calendar } from '@what-today/design-system';
import { MinusIcon, PlusIcon } from '@what-today/design-system';
import { useMemo, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { createReservation } from '@/apis/activityDetail';

import Divider from './Divider';

interface ActivityReservationProps {
  activityId: number;
  price: number;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export default function ActivityReservation({ activityId, price, schedules }: ActivityReservationProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [headCount, setHeadCount] = useState<number>(1);

  const reservableDates = useMemo(() => {
    return new Set(schedules.map((s) => s.date));
  }, [schedules]);

  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    return schedules.filter((s) => s.date === selectedDate);
  }, [selectedDate, schedules]);

  const totalPrice = useMemo(() => headCount * price, [headCount, price]);

  const handleReservation = async () => {
    if (!selectedScheduleId) return;

    try {
      const reservation = await createReservation(activityId, {
        scheduleId: selectedScheduleId,
        headCount,
      });
      alert(`예약이 완료되었습니다! (예약 ID: ${reservation.id})`);
    } catch (error) {
      console.error(error);
      alert('예약 중 오류가 발생했습니다.');
    }
  };

  return (
    <section className='flex flex-col justify-between rounded-3xl border border-[#DDDDDD] p-30 shadow-sm'>
      <div className='flex flex-col gap-24'>
        <p className='text-xl text-[#79747E]'>
          <span className='font-bold text-gray-950'>₩ {price.toLocaleString()}</span> / 인
        </p>

        {/* 날짜 선택 */}
        <div className='space-y-2'>
          <Calendar.Root
            initialDate={selectedDate ?? undefined}
            onDateChange={(date) => {
              setSelectedDate(date);
              setSelectedScheduleId(null);
            }}
          >
            <Calendar.Header />
            <Calendar.Grid divider={false} weekdayType='short'>
              {(day) => <Calendar.DayCell day={day} reservableDates={reservableDates} />}
            </Calendar.Grid>
          </Calendar.Root>
        </div>

        {/* 인원 수 선택 */}
        <div className='flex items-center justify-between'>
          <p className='text-lg font-bold text-gray-950'>참여 인원 수</p>

          <div className='flex items-center gap-23 rounded-3xl border border-[#EEEEEE] px-15'>
            <Button
              className='h-fit w-fit p-0'
              size='sm'
              variant='none'
              onClick={() => setHeadCount(Math.max(1, headCount - 1))}
            >
              <MinusIcon className='size-20' color='#4B4B4B' />
            </Button>

            <span className='p-8 text-center text-lg font-bold text-gray-950'>{headCount}</span>

            <Button className='h-fit w-fit p-0' size='sm' variant='none' onClick={() => setHeadCount(headCount + 1)}>
              <PlusIcon className='size-20' color='#4B4B4B' />
            </Button>
          </div>
        </div>

        {/* 시간 선택 */}
        {selectedDate && (
          <div className='space-y-14'>
            <p className='text-lg font-bold text-gray-950'>예약 가능한 시간</p>
            <div className='flex flex-col gap-2'>
              {availableTimes.map((s) => (
                <Button
                  key={s.id}
                  className={twJoin(
                    'w-full px-4 py-2 text-center',
                    'hover:text-primary-500 hover:bg-[#E5F3FF] hover:ring-2 hover:ring-blue-300 hover:ring-offset-0',
                    selectedScheduleId === s.id
                      ? 'text-primary-500 bg-blue-100 font-semibold ring-2 ring-blue-300'
                      : 'bg-white text-gray-900',
                  )}
                  size='lg'
                  variant='outline'
                  onClick={() => setSelectedScheduleId(s.id)}
                >
                  {s.startTime} ~ {s.endTime}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Divider className='my-24' />

      {/* 총 합계 및 예약 버튼 */}
      <div className='flex items-center justify-between'>
        <p className='text-xl font-medium text-[#79747E]'>
          총 합계 <span className='font-bold text-gray-950'>₩ {totalPrice.toLocaleString()}</span>
        </p>
        <Button disabled={!selectedScheduleId} size='sm' variant='fill' onClick={handleReservation}>
          예약하기
        </Button>
      </div>
    </section>
  );
}
