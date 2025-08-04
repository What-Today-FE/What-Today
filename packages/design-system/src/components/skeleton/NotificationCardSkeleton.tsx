export default function NotificationCardSkeleton() {
  return (
    <div className='text-md flex animate-pulse cursor-pointer flex-col gap-8 p-16'>
      {/* 상단: 상태 뱃지 + 문구 + 삭제 버튼 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-8'>
          <div className='h-26 w-60 rounded-full bg-gray-100' />
          <div className='my-2 h-22 w-100 rounded bg-gray-100' />
        </div>
        <div className='size-22 animate-pulse rounded-full bg-gray-100' />
      </div>

      {/* 제목 (아이콘 + 텍스트) */}
      <div className='my-2 flex items-center gap-4'>
        <div className='size-16 rounded-full bg-gray-100' />
        <div className='h-20 w-full max-w-[200px] rounded bg-gray-100' />
      </div>

      {/* 날짜 및 시간 (아이콘 + 텍스트) */}
      <div className='my-2 flex items-center gap-4'>
        <div className='size-16 rounded-full bg-gray-100' />
        <div className='h-20 w-full max-w-[170px] rounded bg-gray-100' />
      </div>
    </div>
  );
}
