import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { dummyBanners } from './dummyBanners';

export default function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerCount = dummyBanners.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerCount]);

  return (
    <div className='relative h-500 w-full overflow-hidden'>
      <div className='relative h-full w-full overflow-hidden rounded-xl'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={dummyBanners[currentSlide].id}
            animate={{ opacity: 1, x: 0 }}
            className='absolute inset-0'
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            exit={{ opacity: 0, x: -100 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) {
                setCurrentSlide((prev) => (prev + 1) % bannerCount);
              } else if (info.offset.x > 50) {
                setCurrentSlide((prev) => (prev - 1 + bannerCount) % bannerCount);
              }
            }}
          >
            <img
              alt={dummyBanners[currentSlide].title}
              className='h-full w-full object-cover'
              fetchPriority='high'
              loading='eager'
              src={dummyBanners[currentSlide].imageUrl}
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/30 text-white'>
              <div className='px-6 text-center'>
                <h2 className='text-xl font-semibold drop-shadow-md sm:text-3xl'>{dummyBanners[currentSlide].title}</h2>
                <p className='mt-2 text-sm text-white/80 sm:text-base'>이달의 인기 체험 BEST 🔥</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className='absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-4'>
        {dummyBanners.map((banner, i) => (
          <button
            key={banner.id}
            className={`size-8 rounded-full ${currentSlide === i ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
