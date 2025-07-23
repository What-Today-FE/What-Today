import { twMerge } from 'tailwind-merge';

import { useMainCardContext } from './context';

export default function MainCardImage({ className }: { className?: string }) {
  const { bannerImageUrl, title } = useMainCardContext();
  return (
    <div className={twMerge('w-full', className)}>
      <img
        alt={`${title} 체험 이미지`}
        className='h-260 w-full rounded-3xl object-cover md:h-366 lg:h-300'
        src={bannerImageUrl}
      />
    </div>
  );
}
