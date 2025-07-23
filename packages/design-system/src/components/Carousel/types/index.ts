/**
 * Carousel 컴포넌트에 전달되는 제네릭 props 타입입니다.
 *
 * @template T - 아이템의 타입 (예: CarouselProps)
 * @property {T[]} items - 렌더링할 카드 아이템 배열
 * @property {number} itemsPerPage - 한 번에 보여줄 카드 개수
 */
export interface Props<T> {
  items: T[];
  itemsPerPage: number;
}

/**
 * Carousel 카드에 사용되는 기본 아이템 타입입니다.
 *
 * @property {number} id - 고유 식별자
 * @property {string} title - 카드 제목
 * @property {number} price - 가격 (₩ 단위)
 * @property {number} rating - 평점 (예: 4.5)
 * @property {number} reviewCount - 리뷰 개수
 * @property {string} bannerImageUrl - 배너 이미지 URL
 */
export interface CarouselProps {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  bannerImageUrl: string;
}
