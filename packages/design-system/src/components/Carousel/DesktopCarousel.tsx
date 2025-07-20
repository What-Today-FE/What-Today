import { AnimatePresence, motion } from 'motion/react';

import MainCard from '../MainCard';
import type { CarouselProps } from './types';

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

/**
 * DesktopCarousel 컴포넌트
 *
 * - 데스크탑 환경에서 사용되는 캐러셀로, AnimatePresence를 통해 페이지 전환 시 애니메이션을 처리합니다.
 *
 * @template T - Carousel 아이템 타입 (보통 CarouselProps 상속)
 * @param {Props<T>} props - 컴포넌트 props
 * @param {T[]} props.items - 현재 페이지에 표시할 아이템 배열
 * @param {number} props.itemsPerPage - 한 페이지당 보여줄 아이템 개수
 * @param {number} props.direction - 슬라이드 방향 (왼쪽: -1, 오른쪽: 1)
 * @param {number} props.page - 현재 페이지 번호 (슬라이드 키용)
 *
 * @returns {JSX.Element} 애니메이션 그리드 캐러셀
 */

export default function DesktopCarousel<T extends CarouselProps>({ items, itemsPerPage, direction, page }: Props<T>) {
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
          {items.map((item) => (
            <MainCard
              key={item.id}
              bannerImageUrl={item.bannerImageUrl}
              className='w-265'
              price={item.price}
              rating={item.rating}
              reviewCount={item.reviewCount}
              title={item.title}
            >
              <MainCard.Image className='h-260 rounded-t-3xl object-cover brightness-90 contrast-125' />
              <MainCard.Content />
            </MainCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
