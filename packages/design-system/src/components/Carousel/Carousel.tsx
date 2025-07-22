import { motion } from 'motion/react';
import { useEffect, useState } from 'react'; // useEffect 추가

import MainCard from '../MainCard';
import NavigationButton from './NavigationButton';

interface CardItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  bannerImageUrl: string;
}

interface Props {
  items: CardItem[];
  itemsPerPage?: number; // optional로 변경
}

export default function Carousel({ items, itemsPerPage: initialItemsPerPage = 4 }: Props) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // 👉 화면 너비에 따라 itemsPerPage 자동 조절
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768)
        return; // 모바일은 그대로
      else if (width < 1024)
        setItemsPerPage(2); // 태블릿
      else setItemsPerPage(4); // 데스크탑
    };

    handleResize(); // mount 시 실행
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
            {items.map((item) => (
              <div key={item.id} className='shrink-0' style={{ width: `${itemWidthPercent}%` }}>
                <MainCard
                  bannerImageUrl={item.bannerImageUrl}
                  price={item.price}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  title={item.title}
                >
                  <MainCard.Image className='rounded-t-3xl object-cover' />
                  <MainCard.Content />
                </MainCard>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 모바일 캐러셀 */}
        <div
          className='flex w-full gap-4 overflow-x-auto px-4 md:hidden'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
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
        <NavigationButton direction='right' disabled={page === totalPages - 1} onClick={handleNext} />
      </div>
    </div>
  );
}
