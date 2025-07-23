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
            'relative mx-4 flex flex-shrink-0 cursor-pointer flex-col transition-transform duration-300 md:mx-12',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </MainCardContext.Provider>
  );
}
