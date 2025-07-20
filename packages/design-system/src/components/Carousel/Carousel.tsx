import { useState } from 'react';

import DesktopCarousel from './DesktopCarousel';
import MobileCarousel from './MobileCarousel';
import NavigationButton from './NavigationButton';

interface Props<T> {
  items: T[];
  itemsPerPage: number;
}

export default function Carousel<
  T extends {
    id: number;
    title: string;
    price: number;
    rating: number;
    reviewCount: number;
    bannerImageUrl: string;
  },
>({ items, itemsPerPage }: Props<T>) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (dir: number) => {
    const nextPage = page + dir;
    if (nextPage >= 0 && nextPage < totalPages) {
      setPage([nextPage, dir]);
    }
  };

  const startIdx = page * itemsPerPage;
  const currentItems = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className='relative mx-auto w-full overflow-visible'>
      <div className='relative mx-auto flex max-w-6xl items-center justify-center'>
        <NavigationButton direction='left' disabled={page === 0} onClick={() => paginate(-1)} />
        <DesktopCarousel direction={direction} items={currentItems} itemsPerPage={itemsPerPage} page={page} />
        <MobileCarousel items={items} />
        <NavigationButton direction='right' disabled={page === totalPages - 1} onClick={() => paginate(1)} />
      </div>
    </div>
  );
}
