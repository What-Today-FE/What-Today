export default function UpcomingScheduleItemSkeleton() {
  return (
    <div aria-hidden className='flex flex-col gap-8'>
      {/* 날짜 라벨 스켈레톤 */}
      <div className='h-18 w-80 animate-pulse rounded bg-gray-100 md:h-21' />

      {/* 카드 스켈레톤 (UpcomingSchedule 레이아웃 매칭) */}
      <div className='flex h-120 w-full items-center justify-between'>
        {/* 좌측 텍스트 영역 */}
        <div className='flex h-full flex-1 flex-col justify-center rounded-l-2xl rounded-r-none border border-r-0 border-gray-100 p-16 px-24'>
          {/* 제목 */}
          <div className='mb-6 h-24 w-2/3 rounded bg-gray-100' />
          {/* 시간 */}
          <div className='mb-8 h-20 w-1/3 rounded bg-gray-100' />
          {/* 가격/인원 */}
          <div className='flex items-center gap-6'>
            <div className='h-20 w-60 rounded bg-gray-100' />
            <div className='h-20 w-30 rounded bg-gray-100' />
          </div>
        </div>

        {/* 우측 이미지 영역 */}
        <div className='h-full w-140 rounded-l-none rounded-r-2xl bg-gray-100' />
      </div>
    </div>
  );
}
