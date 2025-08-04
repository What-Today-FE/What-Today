import { twMerge } from 'tailwind-merge';

import { useMainCardContext } from './context';

export default function MainCardImage({ className }: { className?: string }) {
  const { bannerImageUrl, title } = useMainCardContext();
  return (
    <div className={twMerge('w-full rounded-xl border border-gray-50', className)}>
      <img
        alt={`${title} 체험 이미지`}
        className='h-260 w-full rounded-xl object-cover md:h-366 xl:h-340'
        loading='lazy'
        src={bannerImageUrl}
      />
    </div>
  );
}
