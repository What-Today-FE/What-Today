import { AnimatePresence, motion } from 'motion/react';

import MainCard from '../MainCard';

interface Props<T> {
  items: T[];
  itemsPerPage: number;
  direction: number;
  page: number;
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

export default function DesktopCarousel<T>({ items, itemsPerPage, direction, page }: Props<T>) {
  return (
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
          {items.map((item: any) => (
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
  );
}
