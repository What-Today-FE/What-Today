import { Button } from '@what-today/design-system';

import type { ReservationBottomBarProps } from './reservation/types';

/**
 * @description 모바일/태블릿 전용 예약 하단 고정 바 컴포넌트
 */
export default function ReservationBottomBar({
  price,
  reservation,
  onSelectDate,
  onReserve,
  isSubmitting = false,
  isAuthor = false,
  isLoggedIn = true,
}: ReservationBottomBarProps) {
  const totalPrice = reservation ? price * reservation.headCount : price;
  const formattedDateTime = reservation ? `${reservation.date} ${reservation.startTime} ~ ${reservation.endTime}` : '';

  // 버튼 텍스트 결정
  let buttonText = '';
  if (isSubmitting) buttonText = '예약 중...';
  else if (!isLoggedIn) buttonText = '로그인 필요';
  else if (isAuthor) buttonText = '예약 불가';
  else buttonText = '예약하기';

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t border-[#E6E6E6] bg-white px-48 pt-18 pb-18 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'>
      <div className='mb-12 flex items-center justify-between'>
        <div>
          <p className='text-2lg font-bold'>
            ₩ {totalPrice.toLocaleString()}
            <span className='text-lg font-normal'> / {reservation?.headCount ?? 1}명</span>
          </p>
          {reservation && <p className='mt-4 text-sm text-gray-500'>{formattedDateTime}</p>}
        </div>

        <Button
          className='text-primary-500 h-fit w-fit p-0 text-lg font-bold underline'
          variant='none'
          onClick={onSelectDate}
        >
          {reservation ? '수정하기' : '날짜 선택하기'}
        </Button>
      </div>

      <Button
        className='w-full'
        disabled={!reservation || isSubmitting || isAuthor || !isLoggedIn}
        size='lg'
        variant='fill'
        onClick={onReserve}
      >
        {buttonText}
      </Button>
    </div>
  );
}
