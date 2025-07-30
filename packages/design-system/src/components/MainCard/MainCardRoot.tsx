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
  onClick,
}: MainCardProps) {
  return (
    <MainCardContext.Provider value={{ title, price, bannerImageUrl, rating, reviewCount, onClick }}>
      <div className=''>
        <div
          className={twMerge(
            'relative flex flex-shrink-0 cursor-pointer flex-col transition-transform duration-300',
            className,
          )}
          onClick={onClick}
        >
          {children}
        </div>
      </div>
    </MainCardContext.Provider>
  );
}
