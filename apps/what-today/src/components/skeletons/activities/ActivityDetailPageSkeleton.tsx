import { useResponsive } from '@/hooks/useResponsive';

import ActivitiesDescriptionSkeleton from './ActivitiesDescriptionSkeleton';
import ActivitiesInformationSkeleton from './ActivitiesInformationSkeleton';
import ActivitiesMapSkeleton from './ActivitiesMapSkeleton';
import ActivityImagesSkeleton from './ActivityImagesSkeleton';
import DividerSkeleton from './DividerSkeleton';
import ReservationFormSkeleton from './ReservationFormSkeleton';
import ReviewSectionSkeleton from './ReviewSectionSkeleton';

export default function ActivityDetailPageSkeleton() {
  const { isDesktop } = useResponsive();

  return (
    <>
      <main className='p-4'>
        {isDesktop ? (
          <div className='grid grid-cols-[1fr_350px] gap-40'>
            {/* 왼쪽 컬럼 */}
            <div className='flex flex-col gap-40'>
              <ActivityImagesSkeleton />
              <ActivitiesDescriptionSkeleton />
              <DividerSkeleton />
              <ActivitiesMapSkeleton />
              <DividerSkeleton />
              <ReviewSectionSkeleton />
            </div>

            {/* 오른쪽 사이드바 */}
            <div className='sticky top-16 flex h-fit flex-col gap-38'>
              <ActivitiesInformationSkeleton />
              <ReservationFormSkeleton />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-30'>
            <ActivityImagesSkeleton />
            <DividerSkeleton />
            <ActivitiesInformationSkeleton />
            <DividerSkeleton />
            <ActivitiesDescriptionSkeleton />
            <DividerSkeleton />
            <ActivitiesMapSkeleton />
            <DividerSkeleton />
            <ReviewSectionSkeleton />
          </div>
        )}
      </main>

      {/* 모바일/태블릿 하단바 스켈레톤 */}
      {!isDesktop && (
        <div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white p-16'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-4'>
              <div className='h-16 w-80 animate-pulse rounded bg-gray-200' />
              <div className='h-20 w-100 animate-pulse rounded bg-gray-200' />
            </div>
            <div className='h-48 w-120 animate-pulse rounded bg-gray-200' />
          </div>
        </div>
      )}
    </>
  );
}
