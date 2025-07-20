import MainCard from '../MainCard';

interface Props<T> {
  items: T[];
}

export default function MobileCarousel<T>({ items }: Props<T>) {
  return (
    <div
      className='scrollbar-hide flex w-full touch-pan-x snap-x gap-4 overflow-x-auto px-4 md:hidden'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      {items.map((item: any) => (
        <MainCard
          key={item.id}
          bannerImageUrl={item.bannerImageUrl}
          className='w-[265px] shrink-0'
          price={item.price}
          rating={item.rating}
          reviewCount={item.reviewCount}
          title={item.title}
        >
          <MainCard.Image className='h-[260px] rounded-t-3xl object-cover brightness-90 contrast-125' />
          <MainCard.Content />
        </MainCard>
      ))}
    </div>
  );
}
