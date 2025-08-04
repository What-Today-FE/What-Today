import { BottomSheet, Button, ChevronIcon, ClockIcon } from '@what-today/design-system';
import { useState } from 'react';

import CalendarSelector from './CalendarSelector';
import HeadCountSelector from './HeadCountSelector';
import { useReservation } from './hooks/useReservation';
import TimeSelector from './TimeSelector';
import type { TabletReservationSheetProps } from './types';

type MobileStep = 'dateTime' | 'headCount';

type MobileReservationSheetProps = TabletReservationSheetProps;

export default function MobileReservationSheet({
  schedules,
  price,
  isOpen,
  onClose,
  onConfirm,
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
  } = useReservation(schedules, price);

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

  const handleConfirm = () => {
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
        setCurrentStep('dateTime'); // 첫 번째 단계로 리셋
        onClose(); // 시트 닫기
      }
    }
  };

  // 버튼 텍스트 결정 (1단계, 2단계 공통)
  let buttonText = '';
  if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else if (currentStep === 'dateTime') buttonText = '다음';
  else buttonText = '다음';

  return (
    <BottomSheet.Root isOpen={isOpen} onClose={handleClose}>
      {/* 1단계: 날짜/시간 선택 */}
      {currentStep === 'dateTime' && (
        <BottomSheet.Content>
          <div className='flex flex-col gap-24 px-10 py-14'>
            <h2 className='subtitle-text'>날짜 및 시간 선택</h2>

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
                  <p className='section-text'>예약 가능한 시간</p>
                  <div className='max-h-290 overflow-y-auto pr-4'>
                    <TimeSelector
                      availableTimes={availableTimes}
                      selectedScheduleId={selectedScheduleId}
                      onSelect={setSelectedScheduleId}
                    />
                  </div>

                  {/* 확인 버튼*/}
                  <Button
                    className='w-full'
                    disabled={!selectedScheduleId || isAuthor || !isLoggedIn}
                    size='lg'
                    variant='fill'
                    onClick={handleNextStep}
                  >
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </BottomSheet.Content>
      )}

      {/* 2단계: 인원 선택 */}
      {currentStep === 'headCount' && (
        <BottomSheet.Content>
          <div className='flex flex-col gap-24 px-10 py-14'>
            <div className='mb-20'>
              <div className='flex items-center gap-12'>
                <Button className='h-fit w-fit p-0' variant='none' onClick={handleBackToDateTime}>
                  <ChevronIcon color='var(--color-gray-400)' direction='left' />
                </Button>
                <h2 className='subtitle-text text-gray-950'>참여 인원 선택</h2>
              </div>
            </div>

            <div className='flex flex-col gap-20'>
              {/* 선택된 날짜/시간 요약 */}
              {selectedDate && selectedScheduleId && (
                <div className='bg-gray-25 rounded-lg p-16'>
                  <p className='caption-text flex items-center gap-4 text-gray-600'>
                    <ClockIcon className='size-14' color='var(--color-gray-600)' />
                    선택된 날짜/시간
                  </p>
                  <p className='body-text font-bold'>
                    {selectedDate.replace(/-/g, '/')}{' '}
                    {availableTimes.find((t) => t.id === selectedScheduleId)?.startTime} ~{' '}
                    {availableTimes.find((t) => t.id === selectedScheduleId)?.endTime}
                  </p>
                </div>
              )}

              {/* 인원 선택 */}
              <HeadCountSelector headCount={headCount} onDecrease={decreaseHeadCount} onIncrease={increaseHeadCount} />

              {/* 총 금액 */}

              <div className='flex items-center justify-between'>
                <span className='body-text font-bold'>총 금액</span>
                <span className='section-text'>₩ {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* 확인 버튼 */}
            <div className='pt-8'>
              <Button
                className='w-full'
                disabled={!isReadyToReserve || isAuthor || !isLoggedIn}
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
