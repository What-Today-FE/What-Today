import { Button, useToast } from '@what-today/design-system';

import CalendarSelector from './CalendarSelector';
import HeadCountSelector from './HeadCountSelector';
import { useReservation } from './hooks/useReservation';
import TimeSelector from './TimeSelector';
import type { ReservationFormProps } from './types';

export default function ReservationForm({
  activityId,
  schedules,
  price,
  onReservationChange,
  onSubmit,
  showSubmitButton = true,
  isSubmitting: externalIsSubmitting,
  isAuthor = false,
  isLoggedIn = true,
}: ReservationFormProps) {
  const { toast } = useToast();

  const reservation = useReservation(schedules, price, {
    onReservationChange,
    onSuccess: (data) => {
      toast({
        title: '예약 완료',
        description: `예약 ID: ${data.id}`,
        type: 'success',
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : '예약 중 오류가 발생했습니다.';
      toast({
        title: '예약 실패',
        description: errorMessage,
        type: 'error',
      });
    },
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
    submitReservation,
  } = reservation;

  // 외부에서 전달받은 isSubmitting을 우선시
  const isSubmitting = externalIsSubmitting ?? internalIsSubmitting;

  const handleSubmit = async () => {
    if (!selectedScheduleId) return;

    // onSubmit이 있으면 기존 방식 사용 (하위 호환성)
    if (onSubmit) {
      await onSubmit({
        scheduleId: selectedScheduleId,
        headCount,
      });
    } else {
      // 기본 방식: submitReservation 사용 (자동 초기화)
      await submitReservation(activityId);
    }
  };

  // 버튼 텍스트 결정
  let buttonText = '';
  if (isSubmitting) buttonText = '예약 중...';
  else if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else buttonText = '예약하기';

  const content = (
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

  return (
    <section className='flex flex-col justify-between rounded-3xl border border-[#DDDDDD] p-30 shadow-sm'>
      {content}
    </section>
  );
}
