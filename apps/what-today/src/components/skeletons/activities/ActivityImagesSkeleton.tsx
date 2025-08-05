export default function ActivityImagesSkeleton() {
  return (
    <section className='grid h-400 grid-cols-2 gap-8'>
      {/* 왼쪽 메인 이미지 스켈레톤 */}
      <div className='h-full w-full overflow-hidden rounded-xl border border-gray-50'>
        <div className='h-full w-full animate-pulse bg-gray-100' />
      </div>

      {/* 오른쪽 서브 이미지들 스켈레톤 */}
      <div className='h-full w-full'>
        <div className='grid h-400 w-full grid-cols-2 grid-rows-[196px_196px] gap-8'>
          {/* 서브 이미지 1 */}
          <div className='overflow-hidden rounded-xl border border-gray-50'>
            <div className='h-full w-full animate-pulse bg-gray-100' />
          </div>

          {/* 서브 이미지 2 */}
          <div className='overflow-hidden rounded-xl border border-gray-50'>
            <div className='h-full w-full animate-pulse bg-gray-100' />
          </div>

          {/* 서브 이미지 3 - col-span-2 */}
          <div className='col-span-2 overflow-hidden rounded-xl border border-gray-50'>
            <div className='h-full w-full animate-pulse bg-gray-100' />
          </div>
        </div>
      </div>
    </section>
  );
}
