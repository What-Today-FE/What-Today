import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { MainCard } from '../MainCard';
import NavigationButton from './NavigationButton';
import type { CarouselProps, Props } from './types';

export default function Carousel({ items, itemsPerPage: initialItemsPerPage = 4 }: Props<CarouselProps>) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) return;
      else if (width < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const itemWidthPercent = 100 / itemsPerPage;

  const handlePrev = () => page > 0 && setPage((prev) => prev - 1);
  const handleNext = () => page < totalPages - 1 && setPage((prev) => prev + 1);

  return (
    <div className='relative w-full overflow-visible'>
      <div className='relative mx-auto flex max-w-6xl items-center justify-center'>
        {/* 왼쪽 버튼 */}
        <NavigationButton direction='left' disabled={page === 0} onClick={handlePrev} />

        {/* 데스크탑/태블릿 캐러셀 */}
        <div className='relative hidden w-full overflow-hidden md:block'>
          <motion.div
            animate={{ x: `-${page * 100}%` }}
            className='flex'
            transition={{ duration: 0.5, ease: [0.45, 0.05, 0.55, 0.95] }}
          >
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`box-border shrink-0 ${idx % itemsPerPage !== itemsPerPage - 1 ? 'pr-10' : ''}`}
                style={{ width: `${itemWidthPercent}%` }}
              >
                <MainCard.Root
                  bannerImageUrl={item.bannerImageUrl}
                  price={item.price}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  title={item.title}
                >
                  <MainCard.Image className='rounded-t-3xl object-cover' />
                  <MainCard.Content />
                </MainCard.Root>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 모바일 캐러셀 */}
        <div
          className='flex w-full gap-6 overflow-x-auto px-4 md:hidden'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {items.map((item) => (
            <MainCard.Root
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
            </MainCard.Root>
          ))}
        </div>

        {/* 오른쪽 버튼 */}
        <NavigationButton direction='right' disabled={page === totalPages - 1} onClick={handleNext} />
      </div>
    </div>
  );
}
