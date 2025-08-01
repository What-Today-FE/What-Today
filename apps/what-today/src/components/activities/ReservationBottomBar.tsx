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
}: ReservationBottomBarProps) {
  const totalPrice = reservation ? price * reservation.headCount : price;
  const formattedDateTime = reservation ? `${reservation.date} ${reservation.startTime} ~ ${reservation.endTime}` : '';

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
        disabled={!reservation || isSubmitting || isAuthor}
        size='lg'
        variant='fill'
        onClick={onReserve}
      >
        {isSubmitting ? '예약 중...' : isAuthor ? '예약 불가' : '예약하기'}
      </Button>
    </div>
  );
}
