import { Button, StarIcon } from '@what-today/design-system';

import { useActivityReviews } from '@/hooks/activityDetail';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import type { ActivityReview } from '@/schemas/activityReview';

import ActivitiesReview from './ActivitiesReview';

interface ReviewSectionProps {
  activityId: number;
}

const getSatisfactionText = (rating: number) => {
  if (rating >= 4.5) return '매우 만족';
  if (rating >= 4.0) return '만족';
  if (rating >= 3.5) return '보통';
  if (rating >= 3.0) return '아쉬움';
  return '불만족';
};

export default function ReviewSection({ activityId }: ReviewSectionProps) {
  const {
    allReviews,
    averageRating,
    totalCount,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useActivityReviews(activityId, 10);

  // 무한스크롤 트리거
  const observerRef = useIntersectionObserver(() => fetchNextPage(), isFetchingNextPage, !hasNextPage);

  if (isLoading) {
    return (
      <section className='w-full'>
        <div className='mb-8 flex gap-8'>
          <h2 className='text-2lg font-bold text-gray-900'>체험 후기</h2>
        </div>
        <p className='py-8 text-center'>후기를 불러오는 중...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='w-full'>
        <div className='mb-8 flex gap-8'>
          <h2 className='text-2lg font-bold text-gray-900'>체험 후기</h2>
        </div>
        <p className='py-8 text-center text-red-500'>
          후기를 불러오는 중 오류가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}
        </p>
      </section>
    );
  }

  return (
    <section className='w-full'>
      <div className='mb-8 flex gap-8'>
        <h2 className='text-2lg font-bold text-gray-900'>체험 후기</h2>
        <span className='text-lg font-bold text-[#79747E]'>{totalCount.toLocaleString()}개</span>
      </div>

      {totalCount > 0 && (
        <div className='mb-34 flex flex-col items-center'>
          <div className='text-3xl font-bold text-gray-950'>{averageRating.toFixed(1)}</div>
          <div className='text-lg font-bold text-gray-950'>{getSatisfactionText(averageRating)}</div>
          <div className='text-md flex items-center gap-2 text-[#79747E]'>
            <StarIcon filled className='size-16' />
            <span>{totalCount.toLocaleString()}개 후기</span>
          </div>
        </div>
      )}

      <div className='mb-24'>
        {allReviews.length > 0 ? (
          allReviews.map((review: ActivityReview) => <ActivitiesReview key={review.id} review={review} />)
        ) : (
          <p className='py-8 text-center text-gray-500'>아직 등록된 후기가 없습니다.</p>
        )}
      </div>

      {/* 무한스크롤 트리거 */}
      <div ref={observerRef} className='h-4' />

      {/* 더보기 버튼 (옵션) */}
      {hasNextPage && (
        <div className='flex justify-center'>
          <Button className='px-6 py-2' disabled={isFetchingNextPage} variant='outline' onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? '로딩 중...' : '더 많은 후기 보기'}
          </Button>
        </div>
      )}

      {isFetchingNextPage && (
        <div className='py-4 text-center'>
          <p className='text-gray-500'>후기를 더 불러오는 중...</p>
        </div>
      )}
    </section>
  );
}
