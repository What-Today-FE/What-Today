import { Button } from '@what-today/design-system';

interface ReservationBottomBarProps {
  price: number;
  onSelectDate: () => void;
}

/**
 * @description 모바일/태블릿 전용 예약 하단 고정 바 컴포넌트
 */
export default function ReservationBottomBar({ price, onSelectDate }: ReservationBottomBarProps) {
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t border-[#E6E6E6] bg-white px-48 pt-18 pb-18 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'>
      <div className='mb-12 flex items-center justify-between'>
        <p className='text-2lg font-bold'>
          ₩ {price.toLocaleString()} <span className='text-lg font-normal'>/ 1명</span>
        </p>
        <Button
          className='text-primary-500 h-fit w-fit p-0 text-lg font-bold underline'
          variant='none'
          onClick={onSelectDate}
        >
          날짜 선택하기
        </Button>
      </div>

      <Button disabled className='w-full' size='lg' variant='fill'>
        예약하기
      </Button>
    </div>
  );
}
