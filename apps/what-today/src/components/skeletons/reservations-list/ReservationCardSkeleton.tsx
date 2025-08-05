export default function ReservationCardSkeleton() {
  return (
    <div className='mb-24'>
      {/* 메인 예약 카드 */}
      <div className='flex gap-16 rounded-xl border border-gray-50 p-16'>
        {/* 왼쪽: 정보 영역 */}
        <div className='flex flex-1 flex-col gap-8'>
          {/* 상태 뱃지 */}
          <div className='h-24 w-80 animate-pulse rounded-full bg-gray-100' />

          {/* 체험 제목 */}
          <div className='h-20 w-full animate-pulse rounded bg-gray-100' />
          <div className='h-20 w-4/5 animate-pulse rounded bg-gray-100' />

          {/* 시간 */}
          <div className='h-16 w-2/3 animate-pulse rounded bg-gray-100' />

          {/* 가격과 인원수 */}
          <div className='flex items-center gap-8'>
            <div className='h-18 w-100 animate-pulse rounded bg-gray-100' />
            <div className='h-16 w-40 animate-pulse rounded bg-gray-100' />
          </div>
        </div>

        {/* 오른쪽: 체험 이미지 */}
        <div className='h-120 w-120 animate-pulse rounded-lg bg-gray-100' />
      </div>

      {/* 액션 버튼 */}
      <div className='mt-8 h-44 w-full animate-pulse rounded-lg bg-gray-100' />
    </div>
  );
}
