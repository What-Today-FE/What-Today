import { twMerge } from 'tailwind-merge';

function ScheduleDateLabel({ date }: { date: string }) {
  return <p className='text-gray-500'>{date}</p>;
}

function ScheduleItem({
  title,
  price,
  headCount,
  time,
  src,
}: {
  title: string;
  price: number;
  headCount: string;
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
      <img className='h-full w-140 rounded-l-none rounded-r-2xl object-cover' src={src} />
    </div>
  );
}

interface UpcomingScheduleProps {
  className?: string;
  reservation: Record<string, any>[];
}
export default function UpcomingSchedule({ className, reservation }: UpcomingScheduleProps) {
  return (
    <div className={twMerge('flex gap-16', className)}>
      {/* <div className='flex flex-col items-center'>
        <div className='size-12 shrink-0 rounded-full bg-gray-300' />
        <div className='h-full w-3 bg-gray-300' />
      </div> */}
      <div className='flex flex-col gap-8'>
        {(() => {
          let prevDate: string | null = null;
          return reservation.map((res, idx) => {
            const showDateLabel = res.date !== prevDate;
            const isLast = idx === reservation.length - 1;
            prevDate = res.date;
            return (
              <div key={res.id} className={twMerge('flex flex-col gap-4', isLast && 'pb-32')}>
                {showDateLabel && <ScheduleDateLabel date={res.date} />}
                <ScheduleItem
                  headCount={res.headCount}
                  price={res.totalPrice}
                  src={res.activity.bannerImageUrl}
                  time={`${res.startTime}~${res.endTime}`}
                  title={res.activity.title}
                />
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
