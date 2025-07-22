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
  const { title, price, rating, reviewCount } = useMainCardContext();

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div
        className={twMerge(
          'flex flex-col gap-16 rounded-3xl bg-white px-20 py-12 md:gap-8 md:px-20 md:py-30 lg:py-15',
          className,
        )}
      >
        <div className='flex flex-col md:gap-1'>
          <h3
            className={twMerge(
              'text-md md:text-2lg lg:text-md line-clamp-1 truncate font-semibold text-gray-950',
              titleClassName,
            )}
          >
            {title}
          </h3>
          <div className='flex items-center gap-2 text-sm text-gray-700'>
            <StarIcon filled className='size-20 lg:size-15' color='#FFC23D' />
            <span className={twMerge('text-gray-950', ratingClassName)}>{rating}</span>
            <div className='text-gray-400'>({reviewCount.toLocaleString()})</div>
          </div>
        </div>
        <p className={twMerge('text-md lg:text-md md:text-2lg font-bold text-gray-950', priceClassName)}>
          ₩ {price}
          <span className='font-normal text-gray-400 sm:text-sm'> /인</span>
        </p>
      </div>
    </div>
  );
}
