import MainCard from '../MainCard';
import type { CarouselProps, Props } from './types';

export default function MobileCarousel({ items }: Props<CarouselProps>) {
  return (
    <div
      className='scrollbar-hide flex w-full touch-pan-x snap-x gap-4 overflow-x-auto px-4 md:hidden'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      {items.map((item) => (
        <MainCard
          key={item.id}
          bannerImageUrl={item.bannerImageUrl}
          className='w-265 shrink-0'
          price={item.price}
          rating={item.rating}
          reviewCount={item.reviewCount}
          title={item.title}
        >
          <MainCard.Image className='h-260 rounded-t-3xl object-cover brightness-90 contrast-125' />
          <MainCard.Content />
        </MainCard>
      ))}
    </div>
  );
}
