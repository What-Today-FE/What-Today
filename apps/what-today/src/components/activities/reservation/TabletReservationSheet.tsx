import { BottomSheet, Button } from '@what-today/design-system';

import CalendarSelector from '@/components/activities/reservation/CalendarSelector';
import HeadCountSelector from '@/components/activities/reservation/HeadCountSelector';
import { useReservation } from '@/components/activities/reservation/hooks/useReservation';
import TimeSelector from '@/components/activities/reservation/TimeSelector';
import type { TabletReservationSheetProps } from '@/components/activities/reservation/types';

export default function TabletReservationSheet({
  schedules,
  price,
  isOpen,
  onClose,
  onConfirm,
  isAuthor = false,
}: TabletReservationSheetProps) {
  const {
    selectedDate,
    setSelectedDate,
    selectedScheduleId,
    setSelectedScheduleId,
    headCount,
    increaseHeadCount,
    decreaseHeadCount,
    isReadyToReserve,
    availableTimes,
    totalPrice,
    reservableDates,
  } = useReservation(schedules, price);

  return (
    <BottomSheet.Root isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Content>
        <div className='grid min-h-[500px] grid-cols-2 gap-32 px-20 py-24'>
          {/* 좌측: 캘린더 */}
          <CalendarSelector
            reservableDates={reservableDates}
            selectedDate={selectedDate}
            onDateChange={(date) => {
              setSelectedDate(date);
              setSelectedScheduleId(null); // 날짜 바뀌면 시간 초기화
            }}
          />

          {/* 우측: 시간 & 인원 */}
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col gap-20'>
              <p className='text-lg font-bold text-gray-950'>예약 가능한 시간</p>
              {selectedDate ? (
                <TimeSelector
                  availableTimes={availableTimes}
                  selectedScheduleId={selectedScheduleId}
                  onSelect={setSelectedScheduleId}
                />
              ) : (
                <div className='text-sm text-gray-400'>날짜를 선택해주세요.</div>
              )}

              <HeadCountSelector headCount={headCount} onDecrease={decreaseHeadCount} onIncrease={increaseHeadCount} />

              <p className='text-xl font-medium text-[#79747E]'>
                총 합계 <span className='font-bold text-gray-950'>₩ {totalPrice.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='px-20 pt-8 pb-24'>
          <Button
            className='w-full'
            disabled={!isReadyToReserve || isAuthor}
            size='lg'
            variant='fill'
            onClick={() => {
              if (selectedScheduleId && selectedDate) {
                const selectedSchedule = schedules.find((s) => s.id === selectedScheduleId);
                if (selectedSchedule) {
                  onConfirm({
                    date: selectedSchedule.date,
                    startTime: selectedSchedule.startTime,
                    endTime: selectedSchedule.endTime,
                    headCount,
                    scheduleId: selectedScheduleId,
                  });
                }
              }
            }}
          >
            {isAuthor ? '예약 불가' : '확인'}
          </Button>
        </div>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
