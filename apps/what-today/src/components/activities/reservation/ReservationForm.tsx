import { useQueryClient } from '@tanstack/react-query';
import { Button, useToast } from '@what-today/design-system';

import Divider from '@/components/activities/Divider';

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
  const queryClient = useQueryClient();

  const reservation = useReservation(schedules, price, {
    onReservationChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservations'],
      });

      toast({
        title: '예약 완료',
        description: '마이페이지에서 예약을 확인해보세요!',
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
      {/* <p className='text-xl text-[#79747E]'>
        <span className='font-bold text-gray-950'>₩ {price.toLocaleString()}</span> / 인
      </p> */}

      {/* 캘린더 */}
      <CalendarSelector reservableDates={reservableDates} selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {/* 시간 선택 */}
      {selectedDate && (
        <>
          <p className='section-text'>예약 가능한 시간</p>
          <div className='max-h-350 overflow-y-auto pr-4'>
            <TimeSelector
              availableTimes={availableTimes}
              selectedScheduleId={selectedScheduleId}
              onSelect={setSelectedScheduleId}
            />
          </div>
        </>
      )}

      {/* 인원 선택 */}
      <HeadCountSelector headCount={headCount} onDecrease={decreaseHeadCount} onIncrease={increaseHeadCount} />
      <Divider />
      {/* 총 합계 */}
      <div className='flex items-center justify-between'>
        <p className='section-text flex max-w-155 flex-col'>
          총 합계 <span className='inline-block max-w-full truncate'>₩ {totalPrice.toLocaleString()}</span>
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

  return <section className='flex flex-col justify-between rounded-xl border border-gray-50 p-20'>{content}</section>;
}
