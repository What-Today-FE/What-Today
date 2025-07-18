import { twMerge } from 'tailwind-merge';

import { useMainCardContext } from './context';

export default function MainCardImage({ className }: { className?: string }) {
  const { bannerImageUrl, title } = useMainCardContext();
  return (
    <img
      alt={`${title} 체험 이미지`}
      className={twMerge('h-176 w-full rounded-3xl object-cover md:h-347 lg:h-290', className)}
      src={bannerImageUrl}
    />
  );
}
