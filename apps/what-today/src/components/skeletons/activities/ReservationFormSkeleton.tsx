export default function ReservationFormSkeleton() {
  return (
    <section className='flex flex-col justify-between rounded-xl border border-gray-50 p-20'>
      <div className='flex flex-col gap-24'>
        {/* 캘린더 스켈레톤 */}
        <div className='flex flex-col gap-8'>
          {/* 캘린더 헤더 */}
          <div className='flex items-center justify-between'>
            <div className='h-20 w-16 animate-pulse rounded bg-gray-100' />
            <div className='h-20 w-100 animate-pulse rounded bg-gray-100' />
            <div className='h-20 w-16 animate-pulse rounded bg-gray-100' />
          </div>

          {/* 캘린더 그리드 */}
          <div className='grid grid-cols-7 gap-4'>
            {Array.from({ length: 35 }).map((_, index) => (
              <div key={`calendar-${index}`} className='h-32 w-32 animate-pulse rounded bg-gray-200' />
            ))}
          </div>
        </div>

        {/* 인원 선택 스켈레톤 */}
        <div className='flex items-center justify-between'>
          <div className='h-20 w-60 animate-pulse rounded bg-gray-100' />
          <div className='flex items-center gap-12'>
            <div className='h-32 w-32 animate-pulse rounded bg-gray-100' />
            <div className='h-20 w-20 animate-pulse rounded bg-gray-100' />
            <div className='h-32 w-32 animate-pulse rounded bg-gray-100' />
          </div>
        </div>

        {/* 구분선 */}
        <div className='h-1 w-full animate-pulse rounded bg-gray-100' />

        {/* 총 합계 */}
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-4'>
            <div className='h-20 w-60 animate-pulse rounded bg-gray-100' />
            <div className='h-20 w-100 animate-pulse rounded bg-gray-100' />
          </div>
          <div className='h-40 w-80 animate-pulse rounded bg-gray-100' />
        </div>
      </div>
    </section>
  );
}
