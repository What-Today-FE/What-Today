import { NoResult, StarIcon } from '@what-today/design-system';

import { ReviewCardSkeleton } from '@/components/skeletons/activities';
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
  const { allReviews, averageRating, totalCount, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useActivityReviews(activityId, 10);

  // 무한스크롤 트리거
  const observerRef = useIntersectionObserver(() => fetchNextPage(), isFetchingNextPage, !hasNextPage);

  if (isError) {
    return (
      <section className='w-full'>
        <div className='mb-8 flex gap-8'>
          <h2 className='section-text'>체험 후기</h2>
        </div>
        <p className='py-8 text-center text-red-500'>
          후기를 불러오는 중 오류가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}
        </p>
      </section>
    );
  }

  return (
    <section className='w-full'>
      <div className='mb-8 flex items-center gap-8'>
        <h2 className='section-text'>체험 후기</h2>
        <span className='body-text text-gray-400'>{totalCount.toLocaleString()}개</span>
      </div>

      {totalCount > 0 && (
        <div className='mb-34 flex flex-col items-center'>
          <div className='title-text'>{averageRating.toFixed(1)}</div>
          <div className='section-text'>{getSatisfactionText(averageRating)}</div>
          <div className='body-text flex items-center gap-4 text-gray-400'>
            <StarIcon filled className='size-16' />
            <span>{totalCount.toLocaleString()}개 후기</span>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-12'>
        {allReviews.length > 0 ? (
          allReviews.map((review: ActivityReview) => <ActivitiesReview key={review.id} review={review} />)
        ) : (
          <div className='mt-20 flex items-center justify-center'>
            <NoResult dataName='후기가' />
          </div>
        )}
      </div>

      {/* 무한스크롤 트리거 */}
      <div ref={observerRef} className='h-4' />

      {isFetchingNextPage && (
        <div className='flex flex-col gap-16'>
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>
      )}
    </section>
  );
}
