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
