import { StarIcon } from '@what-today/design-system';
import { Pagination } from '@what-today/design-system';
import { useState } from 'react';

import ActivitiesReview from './ActivitiesReview';
import { mockReviews } from './mockReviews';

export default function ReviewSection() {
  const { totalCount, averageRating, reviews } = mockReviews;

  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const slicedReviews = reviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(reviews.length / pageSize);

  return (
    <section className='w-full'>
      <div className='mb-8 flex gap-8'>
        <h2 className='text-2lg font-bold text-gray-900'>체험 후기</h2>
        <span className='text-lg font-bold text-[#79747E]'>{totalCount.toLocaleString()}개</span>
      </div>

      <div className='mb-34 flex flex-col items-center'>
        <div className='text-3xl font-bold text-gray-950'>{averageRating.toFixed(1)}</div>
        <div className='text-lg font-bold text-gray-950'>매우 만족</div>
        <div className='text-md flex items-center gap-2 text-[#79747E]'>
          <StarIcon filled className='size-16' />
          <span>{totalCount.toLocaleString()}개 후기</span>
        </div>
      </div>

      <div className='mb-24'>
        {slicedReviews.map((review) => (
          <ActivitiesReview key={review.id} review={review} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </section>
  );
}
