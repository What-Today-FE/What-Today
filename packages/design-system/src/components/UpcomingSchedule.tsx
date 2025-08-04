export default function UpcomingSchedule({
  title,
  price,
  headCount,
  time,
  src,
}: {
  title: string;
  price: number;
  headCount: number;
  time: string;
  src?: string;
}) {
  return (
    <div className='flex h-120 w-full cursor-pointer items-center justify-between'>
      <div className='flex h-full flex-1 flex-col justify-center rounded-l-2xl rounded-r-none border border-r-0 border-gray-100 p-16 px-24'>
        <p className='mb-4 line-clamp-1 font-bold'>{title}</p>

        <p className='text-md text-gray-500'>{time}</p>
        <div className='flex gap-6'>
          <p className='text-md font-bold'>₩{price.toLocaleString()}</p>
          <p className='text-md text-gray-500'>{headCount}명</p>
        </div>
      </div>
      <img alt='체험 베너 이미지' className='h-full w-140 rounded-l-none rounded-r-2xl object-cover' src={src} />
    </div>
  );
}
