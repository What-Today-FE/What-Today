import { Button } from '@what-today/design-system';

import CalendarSelector from './CalendarSelector';
import HeadCountSelector from './HeadCountSelector';
import { useReservation } from './hooks/useReservation';
import TimeSelector from './TimeSelector';
import type { ReservationFormProps } from './types';

export default function ReservationForm({
  schedules,
  price,
  onReservationChange,
  onSubmit,
  showSubmitButton = false,
  isSubmitting: externalIsSubmitting,
  isAuthor = false,
  isLoggedIn = true,
}: ReservationFormProps) {
  const reservation = useReservation(schedules, price, {
    onReservationChange,
  });

  const {
    selectedDate,
    setSelectedDate,
    selectedScheduleId,
    setSelectedScheduleId,
    headCount,
    increaseHeadCount,
    decreaseHeadCount,
    reservableDates,
    availableTimes,
    totalPrice,
    isReadyToReserve,
    isSubmitting: internalIsSubmitting,
  } = reservation;

  // 외부에서 전달받은 isSubmitting을 우선시
  const isSubmitting = externalIsSubmitting ?? internalIsSubmitting;

  const handleSubmit = async () => {
    if (!onSubmit || !selectedScheduleId) return;

    await onSubmit({
      scheduleId: selectedScheduleId,
      headCount,
    });
  };

  // 버튼 텍스트 결정
  let buttonText = '';
  if (isSubmitting) buttonText = '예약 중...';
  else if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else buttonText = '예약하기';

  return (
    <div className='flex flex-col gap-24'>
      {/* 가격 표시 */}
      <p className='text-xl text-[#79747E]'>
        <span className='font-bold text-gray-950'>₩ {price.toLocaleString()}</span> / 인
      </p>

      {/* 캘린더 */}
      <CalendarSelector reservableDates={reservableDates} selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {/* 시간 선택 */}
      {selectedDate && (
        <>
          <p className='text-lg font-bold text-gray-950'>예약 가능한 시간</p>
          <TimeSelector
            availableTimes={availableTimes}
            selectedScheduleId={selectedScheduleId}
            onSelect={setSelectedScheduleId}
          />
        </>
      )}

      {/* 인원 선택 */}
      <HeadCountSelector headCount={headCount} onDecrease={decreaseHeadCount} onIncrease={increaseHeadCount} />

      {/* 총 합계 */}
      <div className='flex items-center justify-between'>
        <p className='text-xl font-medium text-[#79747E]'>
          총 합계 <span className='font-bold text-gray-950'>₩ {totalPrice.toLocaleString()}</span>
        </p>

        {showSubmitButton && (
          <Button
            disabled={!isReadyToReserve || isSubmitting || isAuthor || !isLoggedIn}
            size='sm'
            variant='fill'
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
