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
    <div className='mb-20 rounded-3xl bg-white px-20 py-20 shadow-[0_2px_12px_rgba(0,0,0,0.1)]'>
      <div className='mb-4 flex items-center gap-8'>
        <div className='text-lg font-bold text-gray-950'>{user.nickname}</div>
        <div className='text-md text-[#A4A1AA]'>{formattedDate}</div>
      </div>
      <div className='mb-12'>
        <RatingStars rating={rating} />
      </div>
      <p className='text-lg whitespace-pre-wrap text-gray-950'>{content}</p>
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
