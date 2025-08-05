export default function ActivitiesMapSkeleton() {
  return (
    <section className='section-text flex h-511 w-full flex-col justify-start gap-8'>
      {/* 섹션 제목 */}
      <div className='h-20 w-80 animate-pulse rounded bg-gray-100' />

      {/* 주소 */}
      <div className='h-16 w-200 animate-pulse rounded bg-gray-100' />

      {/* 지도 영역 */}
      <div className='h-full w-full overflow-hidden rounded-3xl'>
        <div className='h-full w-full animate-pulse bg-gray-100' />
      </div>
    </section>
  );
}
