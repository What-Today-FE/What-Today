import { BottomSheet, Button } from '@what-today/design-system';
import { ArrowIcon } from '@what-today/design-system';
import { useState } from 'react';

import CalendarSelector from './CalendarSelector';
import HeadCountSelector from './HeadCountSelector';
import { useReservation } from './hooks/useReservation';
import TimeSelector from './TimeSelector';
import type { TabletReservationSheetProps } from './types';

type MobileStep = 'dateTime' | 'headCount';

interface MobileReservationSheetProps extends Omit<TabletReservationSheetProps, 'onConfirm'> {
  activityId: number;
  onReservationSuccess?: () => void;
  onReservationError?: (error: Error) => void;
}

export default function MobileReservationSheet({
  schedules,
  price,
  isOpen,
  onClose,
  activityId,
  onReservationSuccess,
  onReservationError,
  isAuthor = false,
  isLoggedIn = true,
}: MobileReservationSheetProps) {
  const [currentStep, setCurrentStep] = useState<MobileStep>('dateTime');

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
      setCurrentStep('dateTime'); // 첫 번째 단계로 리셋
      onClose(); // 시트 닫기
      onReservationSuccess?.(); // 성공 콜백 호출
    },
    onError: (error) => {
      onReservationError?.(error); // 에러 콜백 호출
    },
  });

  const handleClose = () => {
    setCurrentStep('dateTime');
    onClose();
  };

  const handleNextStep = () => {
    if (selectedScheduleId) {
      setCurrentStep('headCount');
    }
  };

  const handleBackToDateTime = () => {
    setCurrentStep('dateTime');
  };

  const handleConfirm = async () => {
    if (selectedScheduleId) {
      await submitReservation(activityId);
    }
  };

  // 버튼 텍스트 결정 (1단계, 2단계 공통)
  let buttonText = '';
  if (isSubmitting) buttonText = '예약 중...';
  else if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else if (currentStep === 'dateTime') buttonText = '다음';
  else buttonText = '예약하기';

  return (
    <BottomSheet.Root isOpen={isOpen} onClose={handleClose}>
      {/* 1단계: 날짜/시간 선택 */}
      {currentStep === 'dateTime' && (
        <BottomSheet.Content>
          <div className='flex flex-col gap-24 px-20 py-24'>
            <div className='mb-20'>
              <h2 className='text-xl font-bold text-gray-950'>날짜 및 시간 선택</h2>
            </div>

            <div className='flex flex-col gap-20'>
              {/* 캘린더 */}
              <CalendarSelector
                reservableDates={reservableDates}
                selectedDate={selectedDate}
                onDateChange={(date) => {
                  setSelectedDate(date);
                  setSelectedScheduleId(null); // 날짜 바뀌면 시간 초기화
                }}
              />

              {/* 시간 선택 */}
              {selectedDate && (
                <div className='flex flex-col gap-12'>
                  <p className='text-lg font-bold text-gray-950'>예약 가능한 시간</p>
                  <TimeSelector
                    availableTimes={availableTimes}
                    selectedScheduleId={selectedScheduleId}
                    onSelect={setSelectedScheduleId}
                  />
                </div>
              )}
            </div>

            {/* 확인 버튼 */}
            <div className='pt-8'>
              <Button
                className='w-full'
                disabled={!selectedScheduleId || isAuthor || !isLoggedIn || isSubmitting}
                size='lg'
                variant='fill'
                onClick={handleNextStep}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </BottomSheet.Content>
      )}

      {/* 2단계: 인원 선택 */}
      {currentStep === 'headCount' && (
        <BottomSheet.Content>
          <div className='flex flex-col gap-24 px-20 py-24'>
            <div className='mb-20'>
              <div className='flex items-center gap-12'>
                <Button className='h-fit w-fit p-0' variant='none' onClick={handleBackToDateTime}>
                  <ArrowIcon />
                </Button>
                <h2 className='text-xl font-bold text-gray-950'>참여 인원 선택</h2>
              </div>
            </div>

            <div className='flex flex-col gap-20'>
              {/* 선택된 날짜/시간 요약 */}
              {selectedDate && selectedScheduleId && (
                <div className='rounded-lg bg-gray-50 p-16'>
                  <p className='text-sm text-gray-600'>선택된 날짜/시간</p>
                  <p className='text-lg font-medium text-gray-950'>
                    {selectedDate.replace(/-/g, '/')}{' '}
                    {availableTimes.find((t) => t.id === selectedScheduleId)?.startTime} ~{' '}
                    {availableTimes.find((t) => t.id === selectedScheduleId)?.endTime}
                  </p>
                </div>
              )}

              {/* 인원 선택 */}
              <HeadCountSelector headCount={headCount} onDecrease={decreaseHeadCount} onIncrease={increaseHeadCount} />

              {/* 총 금액 */}
              <div className='bg-primary-50 rounded-lg p-16'>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-medium text-gray-700'>총 금액</span>
                  <span className='text-primary-600 text-xl font-bold'>₩ {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 확인 버튼 */}
            <div className='pt-8'>
              <Button
                className='w-full'
                disabled={!isReadyToReserve || isAuthor || !isLoggedIn || isSubmitting}
                size='lg'
                variant='fill'
                onClick={handleConfirm}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </BottomSheet.Content>
      )}
    </BottomSheet.Root>
  );
}
