export default function ActivitiesInformationSkeleton() {
  return (
    <section className='flex h-fit w-full flex-col items-start gap-8 rounded-xl border border-gray-50 p-20'>
      {/* 카테고리 */}
      <div className='h-16 w-60 animate-pulse rounded bg-gray-100' />

      {/* 제목 */}
      <div className='h-28 w-full animate-pulse rounded bg-gray-100' />

      {/* 평점 */}
      <div className='mt-9 flex items-center gap-6'>
        <div className='h-16 w-16 animate-pulse rounded bg-gray-100' />
        <div className='h-16 w-80 animate-pulse rounded bg-gray-100' />
      </div>

      {/* 주소 */}
      <div className='mt-2 ml-2 flex items-center gap-4'>
        <div className='h-16 w-16 animate-pulse rounded bg-gray-100' />
        <div className='h-16 w-200 animate-pulse rounded bg-gray-100' />
      </div>

      {/* 가격 */}
      <div className='mt-2 ml-2 flex items-center gap-4'>
        <div className='h-16 w-120 animate-pulse rounded bg-gray-100' />
      </div>
    </section>
  );
}
