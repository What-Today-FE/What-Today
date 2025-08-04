export default function ReservationCalendarSkeleton() {
  return (
    <div className='flex h-906 animate-pulse flex-col gap-8 rounded-2xl pt-20 pb-10 md:gap-30 md:border md:border-gray-50'>
      <div className='flex justify-center'>
        <div className='my-6 flex h-32 w-200 gap-30'>
          <div className='h-full w-12 rounded-xl bg-gray-100' />
          <div className='h-full w-116 rounded-xl bg-gray-100' />
          <div className='h-full w-12 rounded-xl bg-gray-100' />
        </div>
      </div>
      <div className='w-full'>
        <div className='grid grid-cols-7 justify-items-center border-b border-gray-100'>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className='m-12 h-26 w-40 rounded-xl bg-gray-100' />
          ))}
        </div>
        <div className='divide-y divide-solid divide-gray-50'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='align-center grid h-104 grid-cols-7 justify-items-center md:h-124'>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className='mt-6 size-28 rounded-full bg-gray-100' />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
