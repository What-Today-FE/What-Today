import ReviewCardSkeleton from './ReviewCardSkeleton';

export default function ReviewSectionSkeleton() {
  return (
    <section className='w-full'>
      {/* 섹션 헤더 */}
      <div className='mb-8 flex items-center gap-8'>
        <div className='h-20 w-80 animate-pulse rounded bg-gray-100' />
        <div className='h-16 w-40 animate-pulse rounded bg-gray-100' />
      </div>

      {/* 평점 통계 */}
      <div className='mb-34 flex flex-col items-center'>
        <div className='mb-4 h-32 w-60 animate-pulse rounded bg-gray-100' />
        <div className='mb-4 h-20 w-80 animate-pulse rounded bg-gray-100' />
        <div className='flex items-center gap-4'>
          <div className='h-16 w-16 animate-pulse rounded bg-gray-100' />
          <div className='h-16 w-80 animate-pulse rounded bg-gray-100' />
        </div>
      </div>

      {/* 리뷰 카드들 */}
      <div className='mb-24 flex flex-col gap-16'>
        {Array.from({ length: 3 }).map((_, index) => (
          <ReviewCardSkeleton key={`review-${index}`} />
        ))}
      </div>
    </section>
  );
}
