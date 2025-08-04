export default function OngoingExperienceCardSkeleton() {
  return (
    <div aria-hidden className='relative h-170 w-150 shrink-0 animate-pulse'>
      {/* 이미지 영역 스켈레톤 */}
      <div className='h-full w-full animate-pulse rounded-t-2xl rounded-b-3xl bg-gray-100' />

      {/* 하단 정보 카드 스켈레톤 */}
      <div className='absolute bottom-0 h-89 w-full translate-y-[40px] rounded-2xl border border-gray-50 bg-white px-12 py-12'>
        {/* 타이틀 두 줄 가짜 라인 */}
        <div className='mb-8 space-y-6'>
          <div className='h-16 w-5/6 animate-pulse rounded bg-gray-100' />
          <div className='h-16 w-3/4 animate-pulse rounded bg-gray-100' />
        </div>
        {/* 가격 라인 */}
        <div className='h-16 w-1/2 animate-pulse rounded bg-gray-100' />
      </div>
    </div>
  );
}
