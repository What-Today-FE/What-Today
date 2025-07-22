import { motion } from 'motion/react';

import MainCard from '../MainCard';
import type { CarouselProps } from './types';

interface Props<T> {
  items: T[];
  itemsPerPage: number;
  page: number;
}

const gridColsMap: Record<number, string> = {
  2: 'w-1/2',
  3: 'w-1/3',
  4: 'w-1/4',
};

export default function DesktopCarousel<T extends CarouselProps>({ items, itemsPerPage, page }: Props<T>) {
  const itemWidthClass = gridColsMap[itemsPerPage] ?? 'w-1/2';

  return (
    <div className='hidden h-full w-full overflow-hidden md:block'>
      <motion.div
        animate={{ x: `-${page * 100}%` }}
        className='flex'
        transition={{ duration: 0.3, ease: [0.45, 0.05, 0.55, 0.95] }} // 요걸로만 제어
      >
        {items.map((item) => (
          <div key={item.id} className={`${itemWidthClass} shrink-0`}>
            <MainCard
              bannerImageUrl={item.bannerImageUrl}
              className='w-full'
              price={item.price}
              rating={item.rating}
              reviewCount={item.reviewCount}
              title={item.title}
            >
              <MainCard.Image className='w-full rounded-t-3xl object-cover' />
              <MainCard.Content />
            </MainCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
