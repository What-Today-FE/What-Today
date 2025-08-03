import { BottomSheet, Button } from '@what-today/design-system';

import CalendarSelector from '@/components/activities/reservation/CalendarSelector';
import HeadCountSelector from '@/components/activities/reservation/HeadCountSelector';
import { useReservation } from '@/components/activities/reservation/hooks/useReservation';
import TimeSelector from '@/components/activities/reservation/TimeSelector';
import type { TabletReservationSheetProps } from '@/components/activities/reservation/types';

interface ExtendedTabletReservationSheetProps extends Omit<TabletReservationSheetProps, 'onConfirm'> {
  activityId: number;
  onReservationSuccess?: () => void;
  onReservationError?: (error: Error) => void;
}

export default function TabletReservationSheet({
  schedules,
  price,
  isOpen,
  onClose,
  activityId,
  onReservationSuccess,
  onReservationError,
  isAuthor = false,
  isLoggedIn = true,
}: ExtendedTabletReservationSheetProps) {
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
    submitReservation,
    isSubmitting,
  } = useReservation(schedules, price, {
    onSuccess: () => {
      onClose(); // 시트 닫기
      onReservationSuccess?.(); // 성공 콜백 호출
    },
    onError: (error) => {
      onReservationError?.(error); // 에러 콜백 호출
    },
  });

  // 버튼 텍스트 결정
  let buttonText = '';
  if (isSubmitting) buttonText = '예약 중...';
  else if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else buttonText = '예약하기';

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
            disabled={!isReadyToReserve || isAuthor || !isLoggedIn || isSubmitting}
            size='lg'
            variant='fill'
            onClick={async () => {
              if (selectedScheduleId) {
                await submitReservation(activityId);
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
