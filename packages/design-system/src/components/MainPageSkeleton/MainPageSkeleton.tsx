import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
}
export function Skeleton({ className }: SkeletonProps) {
  return <div className={twMerge('animate-pulse rounded-lg bg-gray-100', className)} />;
}

// 단일 카드 스켈레톤
export function ActivityCardSkeleton() {
  return (
    <div className='relative w-full'>
      <Skeleton className='h-260 w-full rounded-xl border border-gray-50 md:h-366 lg:h-340' />
      <div className='absolute bottom-0 left-0 w-full'>
        <div
          className={twMerge(
            'flex flex-col gap-8 rounded-xl border border-gray-50 bg-white',
            'px-20 py-12 md:px-20 md:py-30 lg:py-15',
          )}
        >
          <Skeleton className='h-16 w-1/3' />
          <Skeleton className='h-16 w-3/4' />
          <div className='flex items-center gap-8'>
            <Skeleton className='h-14 w-14 rounded-full' />
            <Skeleton className='h-14 w-12' />
            <Skeleton className='h-14 w-12' />
          </div>
          <Skeleton className='h-16 w-1/2' />
        </div>
      </div>
    </div>
  );
}

// 반응형 스켈레톤 개수 계산
const getResponsiveCount = () => {
  const w = window.innerWidth;
  if (w < 768) return 6; // 모바일
  if (w < 1280) return 4; // 태블릿
  return 8; // 데스크탑
};

export function ActivityCardGridSkeleton() {
  const [count, setCount] = useState(() => getResponsiveCount());

  useEffect(() => {
    const onResize = () => setCount(getResponsiveCount());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ActivityCardSkeleton key={i} />
      ))}
    </>
  );
}

// Carousel용 스켈레톤 (인기 체험 반응형)

interface CarouselSkeletonProps {
  count?: number;
}
export function CarouselSkeleton({ count = 4 }: CarouselSkeletonProps) {
  const MOBILE_BREAK = 768;
  const TABLET_BREAK = 1280;

  const getInitial = () => {
    const w = window.innerWidth;
    if (w < MOBILE_BREAK) return count;
    if (w < TABLET_BREAK) return 2;
    return count;
  };

  const [perPage, setPerPage] = useState(() => getInitial());

  useEffect(() => {
    const onResize = () => setPerPage(getInitial());
    // 마운트 시 한 번 실행
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [count]);

  return (
    <div className='relative w-full overflow-visible'>
      <div className='relative mx-auto'>
        {/* 태블릿·데스크탑 */}
        <div className='relative hidden w-full overflow-hidden md:block'>
          <div className='flex'>
            {Array.from({ length: perPage }).map((_, i) => (
              <div
                key={i}
                className={twMerge('box-border shrink-0', i !== perPage - 1 ? 'pr-10' : '')}
                style={{ width: `${100 / perPage}%` }}
              >
                <ActivityCardSkeleton />
              </div>
            ))}
          </div>
        </div>
        {/* 모바일 */}
        <div
          className='flex w-full gap-6 overflow-x-auto px-4 md:hidden'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className='w-265 shrink-0'>
              <ActivityCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
