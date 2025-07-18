import { twMerge } from 'tailwind-merge';

import MainCardContext from './context';
import type { MainCardProps } from './types';

export default function MainCardRoot({
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
  children,
  className,
}: MainCardProps) {
  return (
    <MainCardContext.Provider value={{ title, price, bannerImageUrl, rating, reviewCount }}>
      <div className=''>
        <div
          className={twMerge(
            'relative h-242 w-full cursor-pointer overflow-visible transition-transform duration-300 hover:scale-105 md:h-423 lg:h-366',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </MainCardContext.Provider>
  );
}
