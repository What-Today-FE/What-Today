import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { dummyBanners } from './dummyBanners';

export default function MainBanner() {
  const bannerCount = dummyBanners.length;

  const extended = [dummyBanners[bannerCount - 1], ...dummyBanners, dummyBanners[0]];

  const [currentSlide, setCurrentSlide] = useState(1); // 시작은 첫 번째 진짜 배너
  const [isJumping, setIsJumping] = useState(false);

  // 자동 슬라이드
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // 슬라이드 끝에서 점프
  useEffect(() => {
    if (currentSlide === bannerCount + 1) {
      const timer = setTimeout(() => {
        setIsJumping(true);
        setCurrentSlide(1);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (currentSlide === 0) {
      const timer = setTimeout(() => {
        setIsJumping(true);
        setCurrentSlide(bannerCount);
      }, 500);
      return () => clearTimeout(timer);
    }

    setIsJumping(false);
  }, [currentSlide, bannerCount]);

  return (
    <div className='relative h-500 w-full overflow-hidden'>
      <div className='relative h-full w-full overflow-hidden rounded-xl'>
        <motion.div
          animate={{ x: `-${currentSlide * 100}%` }}
          className='flex h-full w-full'
          transition={{
            duration: isJumping ? 0 : 0.5,
            ease: 'easeInOut',
          }}
        >
          {extended.map((banner, i) => (
            <div key={i} className='relative h-full w-full flex-shrink-0'>
              <img
                alt={banner.title}
                className='h-full w-full object-cover'
                fetchPriority='high'
                loading='eager'
                src={banner.imageUrl}
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black/30 text-white'>
                <div className='px-6 text-center'>
                  <h2 className='text-xl font-semibold drop-shadow-md sm:text-3xl'>{banner.title}</h2>
                  <p className='mt-2 text-sm text-white/80 sm:text-base'>이달의 인기 체험 BEST 🔥</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className='absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-4'>
        {dummyBanners.map((_, i) => (
          <button
            key={i}
            className={`size-8 rounded-full ${currentSlide === i + 1 ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setCurrentSlide(i + 1)}
          />
        ))}
      </div>
    </div>
  );
}
