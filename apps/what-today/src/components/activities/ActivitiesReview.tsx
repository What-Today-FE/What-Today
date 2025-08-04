import { StarIcon } from '@what-today/design-system';

import { type ActivityReview } from '@/schemas/activityReview';
interface ActivitiesReviewProps {
  review: ActivityReview;
}

const STARS = [1, 2, 3, 4, 5];

/**
 * @description 후기 개별 카드 컴포넌트
 */
export default function ActivitiesReview({ review }: ActivitiesReviewProps) {
  const { user, content, createdAt, rating } = review;

  const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className='rounded-xl border border-gray-50 px-20 py-20'>
      <div className='mb-4 flex items-center gap-8'>
        <div className='body-text font-bold'>{user.nickname}</div>
        <div className='caption-text text-gray-400'>{formattedDate}</div>
      </div>
      <div className='mb-12'>
        <RatingStars rating={rating} />
      </div>
      <p className='body-text whitespace-pre-wrap'>{content}</p>
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-2'>
      {STARS.map((star) => (
        <StarIcon key={`star-${star}`} filled={star <= rating} />
      ))}
    </div>
  );
}
