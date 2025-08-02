import { twMerge } from 'tailwind-merge';

import Button from './button';
import { EmptyLogo } from './logos';

interface OngoingExperienceCardProps {
  className?: string;
  activities: Record<string, any>[];
  onClickActivity: (id: number) => void;
  onClick: () => void;
}

export default function OngoingExperienceCard({
  className,
  activities,
  onClickActivity,
  onClick,
}: OngoingExperienceCardProps) {
  const flex = activities.length === 0 ? 'justify-center' : '';
  return (
    <div className={twMerge('flex gap-12', flex, className)}>
      {activities.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-20 pt-32'>
          <EmptyLogo size={80} />
          <Button className='text-md w-auto font-semibold' variant='outline' onClick={onClick}>
            체험 등록하러 가기
          </Button>
        </div>
      ) : (
        activities.map((act) => {
          return (
            <div key={act.id} className='relative h-170 w-150 cursor-pointer' onClick={() => onClickActivity(act.id)}>
              <img className='h-full w-full rounded-t-2xl rounded-b-3xl object-cover' src={act.bannerImageUrl} />
              <div className='absolute bottom-0 w-full translate-y-[40px] cursor-pointer rounded-2xl border border-gray-50 bg-white px-12 py-12'>
                <p className='text-md line-clamp-1 font-semibold'>{act.title}</p>
                <p className='text-md text-gray-500'>₩{act.price.toLocaleString()} / 인</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
