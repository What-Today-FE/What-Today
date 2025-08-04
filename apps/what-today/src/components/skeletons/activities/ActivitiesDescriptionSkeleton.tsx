export default function ActivitiesDescriptionSkeleton() {
  return (
    <section className='flex h-fit w-full flex-col justify-start gap-8'>
      {/* 섹션 제목 */}
      <div className='h-20 w-80 animate-pulse rounded bg-gray-200' />

      {/* 설명 텍스트 라인들 */}
      <div className='flex flex-col gap-4'>
        <div className='h-16 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-16 w-4/5 animate-pulse rounded bg-gray-200' />
        <div className='h-16 w-3/4 animate-pulse rounded bg-gray-200' />
        <div className='h-16 w-5/6 animate-pulse rounded bg-gray-200' />
      </div>
    </section>
  );
}
