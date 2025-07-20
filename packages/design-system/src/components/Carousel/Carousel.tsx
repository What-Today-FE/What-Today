import { useState } from 'react';

import DesktopCarousel from './DesktopCarousel';
import MobileCarousel from './MobileCarousel';
import NavigationButton from './NavigationButton';
import type { CarouselProps, Props } from './types';

/**
 * Carousel 컴포넌트
 *
 * - 데스크탑과 태블릿에서는 좌우 버튼으로 페이지네이션되는 캐러셀을 보여줍니다.
 * - 모바일에서는 수평 스크롤 가능한 캐러셀을 보여줍니다.
 *
 * @template T - Carousel에 렌더링할 아이템 타입 (기본값: CarouselProps)
 * @param {Props<T>} props - Carousel에 필요한 props
 * @param {T[]} props.items - 전체 아이템 배열
 * @param {number} props.itemsPerPage - 한 페이지당 표시할 아이템 개수
 *
 * @returns {JSX.Element} Carousel UI
 */

export default function Carousel<T extends CarouselProps = CarouselProps>({ items, itemsPerPage }: Props<T>) {
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
        <MobileCarousel items={items} itemsPerPage={itemsPerPage} />
        <NavigationButton direction='right' disabled={page === totalPages - 1} onClick={() => paginate(1)} />
      </div>
    </div>
  );
}
