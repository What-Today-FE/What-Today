interface ReservationCardProps {
  title: string;
  bannerImageUrl: string;
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  totalPrice: number;
  headCount: number;
  startTime: string;
  endTime: string;
}

export default function ReservationCard({
  title,
  bannerImageUrl,
  status,
  totalPrice,
  headCount,
  startTime,
  endTime,
}: ReservationCardProps) {
  const formatPrice = (value: number) => value.toLocaleString('ko');
  const reservationStatus = {
    pending: { badge: '체험 완료', style: 'bg-[#DAF0FF] text-[#0D6CD1]' },
    confirmed: { badge: '예약 승인', style: 'bg-[#DDF9F9] text-[#1790A0]' },
    declined: { badge: '예약 거절', style: 'bg-[#FCECEA] text-[#F96767]' },
    canceled: { badge: '예약 취소', style: 'bg-[#E0E0E5] text-[#707177]' },
    completed: { badge: '예약 완료', style: 'bg-[#E9FBE4] text-[#2BA90D]' },
  };
  const { badge, style } = reservationStatus[status];

  return (
    <div className='flex -space-x-38 rounded-3xl shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:-space-x-20 xl:max-w-640 xl:-space-x-26'>
      <div className='z-10 flex h-136 w-full flex-col justify-between rounded-3xl bg-white p-20 shadow-[0px_-8px_20px_0px_rgba(0,0,0,0.05)] xl:h-181 xl:px-40 xl:py-30'>
        <div className='flex flex-col xl:gap-4'>
          <div className='flex flex-col gap-4 xl:gap-8'>
            {/* badge 컴포넌트로 수정 예정 */}
            <div className={`z-10 w-63 rounded-full px-6 py-1 text-center text-sm font-bold ${style}`}>{badge}</div>
            <div className='xl:text-2lg text-sm font-bold text-gray-950'>{title}</div>
          </div>
          <div className='text-sm font-medium text-gray-500 xl:text-lg'>
            {startTime}-{endTime}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='xl:text-2lg text-lg font-bold text-gray-950'>₩{formatPrice(totalPrice)}</div>
          <div className='text-md font-medium text-gray-400 xl:text-lg'>{headCount}명</div>
        </div>
      </div>
      <img className='size-136 rounded-r-3xl xl:size-181' src={bannerImageUrl} />
    </div>
  );
}
