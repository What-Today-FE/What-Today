import { createContext, type ReactNode, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { StarIcon } from '../icons';

// ---------------------- Context ----------------------
interface MainCardContextType {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const MainCardContext = createContext<MainCardContextType | null>(null);

function useMainCardContext() {
  const context = useContext(MainCardContext);
  if (!context) throw new Error('<MainCard.*> 컴포넌트는 <MainCard> 내부에서 사용되어야 합니다.');
  return context;
}

// ---------------------- Root ----------------------
interface MainCardProps extends MainCardContextType {
  children: ReactNode;
  className?: string;
}

function MainCardRoot({ title, price, bannerImageUrl, rating, reviewCount, children, className }: MainCardProps) {
  return (
    <MainCardContext.Provider value={{ title, price, bannerImageUrl, rating, reviewCount }}>
      <div className=''>
        <div className={twMerge('relative h-[360px] w-full cursor-pointer overflow-visible', className)}>
          {children}
        </div>
      </div>
    </MainCardContext.Provider>
  );
}

// ---------------------- Subcomponents ----------------------

function MainCardImage({ className }: { className?: string }) {
  const { bannerImageUrl } = useMainCardContext();
  return (
    <img alt='' className={twMerge('h-[260px] w-full rounded-3xl object-cover', className)} src={bannerImageUrl} />
  );
}

function MainCardContent({
  className,
  titleClassName,
  ratingClassName,
  priceClassName,
  iconColor = '#FFC23D',
}: {
  className?: string;
  titleClassName?: string;
  priceClassName?: string;
  ratingClassName?: string;
  iconColor?: string;
}) {
  const { title, price, rating, reviewCount } = useMainCardContext();

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div className={twMerge('flex flex-col gap-16 rounded-3xl bg-white p-30 shadow-md', className)}>
        <div className='flex flex-col gap-2'>
          <h3 className={twMerge('text-2lg truncate font-semibold text-gray-950', titleClassName)}>{title}</h3>
          <div className='flex gap-6 text-sm text-gray-700'>
            <span>
              <StarIcon filled className='' color={iconColor} />
            </span>
            <span className={twMerge('text-gray-950', ratingClassName)}>{rating}</span>
            <div className='text-gray-400'>({reviewCount.toLocaleString()})</div>
          </div>
        </div>
        <p className={twMerge('text-2lg font-bold text-gray-950', priceClassName)}>
          ₩ {price.toLocaleString()}
          <span className='font-normal text-gray-400'> /인</span>
        </p>
      </div>
    </div>
  );
}

// ---------------------- Export ----------------------

export const MainCard = Object.assign(MainCardRoot, {
  Image: MainCardImage,
  Content: MainCardContent,
});
