export default function ReviewCardSkeleton() {
  return (
    <div className='flex flex-col gap-12 rounded-xl border border-gray-50 p-16'>
      {/* 리뷰 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-8'>
          <div className='h-40 w-40 animate-pulse rounded-full bg-gray-200' />
          <div className='flex flex-col gap-4'>
            <div className='h-16 w-80 animate-pulse rounded bg-gray-200' />
            <div className='flex gap-2'>
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <div key={`star-${starIndex}`} className='h-16 w-16 animate-pulse rounded bg-gray-200' />
              ))}
            </div>
          </div>
        </div>
        <div className='h-14 w-80 animate-pulse rounded bg-gray-200' />
      </div>

      {/* 리뷰 내용 */}
      <div className='flex flex-col gap-4'>
        <div className='h-16 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-16 w-4/5 animate-pulse rounded bg-gray-200' />
      </div>
    </div>
  );
}
