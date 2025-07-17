import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { StarIcon } from '../icons';
import type { MainCardContextType, MainCardProps } from './types/index';

/**
 * 📦 MainCard 컴포넌트
 *
 * 체험 카드 UI를 구성하는 루트 컴포넌트입니다. 내부에서 Image와 Content를 포함합니다.
 *
 * @component
 *
 * @example
 * 현재 하드코딩 , api 데이터 값 필요
 * <MainCard
 *   title="스카이다이빙"
 *   price={200000}
 *   bannerImageUrl="https://..."
 *   rating={4.8}
 *   reviewCount={121}
 * >
 *   <MainCard.Image />
 *   <MainCard.Content />
 * </MainCard>
 *
 * @prop {string} title - 체험 제목
 * @prop {number} price - 체험 가격
 * @prop {string} bannerImageUrl - 카드 상단 이미지 URL
 * @prop {number} rating - 평균 평점
 * @prop {number} reviewCount - 리뷰 수
 * @prop {string} [className] - 카드 wrapper에 적용할 Tailwind 클래스
 * @prop {ReactNode} children - 내부에 MainCard.Image, MainCard.Content 포함
 */

const MainCardContext = createContext<MainCardContextType | null>(null);

function useMainCardContext() {
  const context = useContext(MainCardContext);
  if (!context) throw new Error('<MainCard.*> 컴포넌트는 <MainCard> 내부에서 사용되어야 합니다.');
  return context;
}

function MainCardRoot({ title, price, bannerImageUrl, rating, reviewCount, children, className }: MainCardProps) {
  return (
    <MainCardContext.Provider value={{ title, price, bannerImageUrl, rating, reviewCount }}>
      <div className=''>
        <div
          className={twMerge(
            'relative h-[242px] w-full cursor-pointer overflow-visible transition-transform duration-300 hover:scale-105 md:h-[423px] lg:h-[366px]',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </MainCardContext.Provider>
  );
}

function MainCardImage({ className }: { className?: string }) {
  const { bannerImageUrl } = useMainCardContext();
  return (
    <img
      alt=''
      className={twMerge('h-[176px] w-full rounded-3xl object-cover md:h-[347px] lg:h-[290px]', className)}
      src={bannerImageUrl}
    />
  );
}
/**

📝 MainCard.Content

체험 카드 하단의 제목, 평점, 가격 정보를 보여주는 영역입니다.

@component

@example

<MainCard.Content

className="bg-white"

titleClassName="text-indigo-500"

ratingClassName="text-yellow-500"

priceClassName="text-red-500"

iconColor="#FACC15"

/>

@prop {string} [className] - content wrapper(card 안 하얀 박스)에 적용할 클래스

@prop {string} [titleClassName] - 제목 텍스트 클래스

@prop {string} [ratingClassName] - 평점 숫자 텍스트 클래스

@prop {string} [priceClassName] - 가격 텍스트 클래스

@prop {string} [iconColor='#FFC23D'] - 별 아이콘 색상
*/

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
      <div className={twMerge('flex flex-col gap-16 rounded-3xl bg-white px-16 py-8 shadow-md md:p-30', className)}>
        <div className='flex flex-col md:gap-2'>
          <h3 className={twMerge('text-md md:text-2lg truncate font-semibold text-gray-950', titleClassName)}>
            {title}
          </h3>
          <div className='flex gap-6 text-sm text-gray-700'>
            <StarIcon filled className='' color={iconColor} />
            <span className={twMerge('text-gray-950', ratingClassName)}>{rating}</span>
            <div className='text-gray-400'>({reviewCount.toLocaleString()})</div>
          </div>
        </div>
        <p className={twMerge('text-md md:text-2lg font-bold text-gray-950', priceClassName)}>
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
