import { twMerge } from 'tailwind-merge';

interface OngoingExperienceCardProps {
  activities: Record<string, any>[];
  className: string;
}

export default function OngoingExperienceCard({ activities, className }: OngoingExperienceCardProps) {
  return (
    <div className={twMerge('flex gap-12', className)}>
      {activities.map((act) => {
        return (
          <div key={act.id} className='relative h-170 w-150 cursor-pointer'>
            <img className='h-full w-full rounded-t-2xl rounded-b-3xl object-cover' src={act.bannerImageUrl} />
            <div className='absolute bottom-0 w-full translate-y-[40px] cursor-pointer rounded-2xl border border-gray-50 bg-white px-12 py-12'>
              <p className='text-md line-clamp-1 font-semibold'>{act.title}</p>
              <p className='text-md text-gray-500'>₩{act.price.toLocaleString()} / 인</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
