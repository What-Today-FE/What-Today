import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { ArrowIcon } from './icons';
import MainCard from './MainCard';

interface Props<T> {
  items: T[];
  itemsPerPage: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const transition = {
  duration: 0.3,
  ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
};

export default function Carousel<
  T extends {
    id: number;
    title: string;
    price: number;
    rating: number;
    reviewCount: number;
    bannerImageUrl: string;
  },
>({ items, itemsPerPage }: Props<T>) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (dir: number) => {
    const nextPage = page + dir;
    if (nextPage >= 0 && nextPage < totalPages) {
      setPage([nextPage, dir]);
    }
  };

  const startIdx = page * itemsPerPage;
  const currentItems = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className='relative mx-auto w-full overflow-visible'>
      <div className='relative mx-auto flex max-w-6xl items-center justify-center'>
        {/* 왼쪽 버튼 */}
        <button
          className='z-10 -mr-20 hidden size-40 items-center justify-center rounded-full bg-white text-xl hover:bg-gray-100 disabled:opacity-0 md:flex'
          disabled={page === 0}
          onClick={() => paginate(-1)}
        >
          <ArrowIcon />
        </button>

        {/* 데스크탑/태블릿: 슬라이드 */}
        <div className='hidden overflow-hidden md:block'>
          <AnimatePresence custom={direction} initial={false} mode='wait'>
            <motion.div
              key={page}
              animate='center'
              className={`grid gap-8 ${
                itemsPerPage === 4 ? 'grid-cols-4' : itemsPerPage === 3 ? 'grid-cols-3' : 'grid-cols-2'
              }`}
              custom={direction}
              exit='exit'
              initial='enter'
              transition={transition}
              variants={variants}
            >
              {currentItems.map((item) => (
                <MainCard
                  key={item.id}
                  bannerImageUrl={item.bannerImageUrl}
                  className='w-[265px]'
                  price={item.price}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  title={item.title}
                >
                  <MainCard.Image className='h-[260px] rounded-t-3xl object-cover brightness-90 contrast-125' />
                  <MainCard.Content />
                </MainCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 모바일: 수평 스크롤 */}
        <div
          className='scrollbar-hide flex w-full touch-pan-x snap-x gap-4 overflow-x-auto px-4 md:hidden'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {items.map((item) => (
            <MainCard
              key={item.id}
              bannerImageUrl={item.bannerImageUrl}
              className='w-[265px] shrink-0'
              price={item.price}
              rating={item.rating}
              reviewCount={item.reviewCount}
              title={item.title}
            >
              <MainCard.Image className='h-[260px] rounded-t-3xl object-cover brightness-90 contrast-125' />
              <MainCard.Content />
            </MainCard>
          ))}
        </div>

        {/* 오른쪽 버튼 */}
        <button
          className='z-10 -ml-20 hidden size-40 items-center justify-center rounded-full bg-white text-xl hover:bg-gray-100 disabled:opacity-30 md:flex'
          disabled={page === totalPages - 1}
          onClick={() => paginate(1)}
        >
          <ArrowIcon direction='right' />
        </button>
      </div>
    </div>
  );
}
