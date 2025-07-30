import { LocationIcon, StarIcon } from '@what-today/design-system';
import { twMerge } from 'tailwind-merge';

interface ActivitiesInformationProps {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  className?: string;
}

/**
 * @description 체험 상세 페이지 상단의 체험 정보 요약 박스 컴포넌트입니다.
 */
export default function ActivitiesInformation({
  category,
  title,
  rating,
  reviewCount,
  address,
  className,
}: ActivitiesInformationProps) {
  return (
    <section className={twMerge('flex h-fit w-full flex-col items-start gap-8', className)}>
      <p className='text-md text-gray-950'>{category}</p>
      <p className='text-2xl font-bold'>{title}</p>
      <div className='mt-9 flex items-center gap-6 text-base text-gray-700'>
        <StarIcon filled />
        <span>
          {rating.toFixed(1)} ({reviewCount})
        </span>
      </div>
      <div className='mt-2 ml-2 flex items-center gap-4 text-base text-gray-700'>
        <LocationIcon />
        <span>{address}</span>
      </div>
    </section>
  );
}
