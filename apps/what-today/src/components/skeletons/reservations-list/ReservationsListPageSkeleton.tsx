import ReservationCardSkeleton from './ReservationCardSkeleton';

export default function ReservationsListPageSkeleton() {
  return (
    <div className='space-y-10'>
      {/* 날짜 그룹 1 */}
      <section className='space-y-12 pt-20 pb-30'>
        {/* 날짜 헤더 */}
        <div className='h-28 w-140 animate-pulse rounded bg-gray-100' />

        {/* 예약 카드들 */}
        <div>
          <ReservationCardSkeleton />
          <ReservationCardSkeleton />
        </div>
      </section>

      {/* 날짜 그룹 2 */}
      <section className='space-y-12 border-t border-gray-50 pt-20 pb-30'>
        {/* 날짜 헤더 */}
        <div className='h-28 w-140 animate-pulse rounded bg-gray-100' />

        {/* 예약 카드들 */}
        <div>
          <ReservationCardSkeleton />
        </div>
      </section>

      {/* 날짜 그룹 3 */}
      <section className='space-y-12 border-t border-gray-50 pt-20 pb-30'>
        {/* 날짜 헤더 */}
        <div className='h-28 w-140 animate-pulse rounded bg-gray-100' />

        {/* 예약 카드들 */}
        <div>
          <ReservationCardSkeleton />
          <ReservationCardSkeleton />
          <ReservationCardSkeleton />
        </div>
      </section>
    </div>
  );
}
