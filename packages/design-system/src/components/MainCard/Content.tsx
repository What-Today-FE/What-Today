import { twMerge } from 'tailwind-merge';

import { StarIcon } from '../icons';
import { useMainCardContext } from './context';

interface Props {
  className?: string;
  titleClassName?: string;
  ratingClassName?: string;
  priceClassName?: string;
  iconColor?: string;
}

export default function MainCardContent({
  className,
  titleClassName,
  ratingClassName,
  priceClassName,
  iconColor = '#FFC23D',
}: Props) {
  const { title, price, rating, reviewCount, category } = useMainCardContext();

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div
        className={twMerge(
          'flex flex-col gap-8 rounded-xl border border-gray-50 bg-white px-20 py-12 md:px-20 md:py-30 lg:py-15',
          className,
        )}
      >
        <div className='flex flex-col gap-20'>
          <div className='flex flex-col gap-2'>
            <span className='caption-text text-gray-400'>{category}</span>
            <h3 className={twMerge('body-text line-clamp-1 truncate font-bold', titleClassName)}>{title}</h3>
            <div className='caption-text flex items-center gap-2'>
              <StarIcon filled className='size-15' color={iconColor} />
              <span className={twMerge('', ratingClassName)}>{rating}</span>
              <div className='text-gray-400'>({reviewCount.toLocaleString()})</div>
            </div>
          </div>
          <div>
            <p className={twMerge('body-text font-bold', priceClassName)}>
              ₩ {price.toLocaleString()}
              <span className='font-normal text-gray-400'> /인</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
