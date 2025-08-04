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
  isLoggedIn = true,
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

  // 버튼 텍스트 결정
  let buttonText = '';
  if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else buttonText = '다음';

  return (
    <BottomSheet.Root isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Content>
        <div className='grid min-h-[500px] grid-cols-2 gap-32 px-10 pt-24'>
          {/* 좌측: 캘린더 */}
          <CalendarSelector
            reservableDates={reservableDates}
            selectedDate={selectedDate}
            onDateChange={(date) => {
              setSelectedDate(date);
              setSelectedScheduleId(null);
            }}
          />

          {/* 우측: 시간 & 인원 */}
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col gap-20'>
              <p className='body-text font-bold'>예약 가능한 시간</p>
              {selectedDate ? (
                <div className='max-h-290 overflow-y-auto pr-4'>
                  <TimeSelector
                    availableTimes={availableTimes}
                    selectedScheduleId={selectedScheduleId}
                    onSelect={setSelectedScheduleId}
                  />
                </div>
              ) : (
                <div className='caption-text text-gray-400'>날짜를 선택해주세요.</div>
              )}

              <HeadCountSelector headCount={headCount} onDecrease={decreaseHeadCount} onIncrease={increaseHeadCount} />

              <p className='section-text flex items-center gap-6'>
                <span className='body-text font-bold'>총 합계</span> <span>₩ {totalPrice.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='px-10 pt-10 pb-10'>
          <Button
            className='w-full'
            disabled={!isReadyToReserve || isAuthor || !isLoggedIn}
            size='lg'
            variant='fill'
            onClick={() => {
              if (selectedScheduleId && selectedDate) {
                const selectedTime = availableTimes.find((t) => t.id === selectedScheduleId);
                if (selectedTime) {
                  onConfirm({
                    date: selectedDate,
                    startTime: selectedTime.startTime,
                    endTime: selectedTime.endTime,
                    headCount,
                    scheduleId: selectedScheduleId,
                  });
                  onClose(); // 시트 닫기
                }
              }
            }}
          >
            {buttonText}
          </Button>
        </div>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
