/**
 * 💡 MainCard 내부에서 Context로 전달되는 값의 타입입니다.
 *
 * MainCard.Image, MainCard.Content에서 공통으로 사용하는 데이터를 포함합니다.
 *
 * @property {string} title - 체험 제목
 * @property {number} price - 체험 가격
 * @property {string} bannerImageUrl - 카드 상단 이미지 URL
 * @property {number} rating - 평균 평점
 * @property {number} reviewCount - 리뷰 수
 */
export interface MainCardContextType {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  onClick?: () => void;
}

/**
 * 📦 MainCard 루트 컴포넌트의 Props 타입입니다.
 *
 * context value에 필요한 정보와 추가적으로 className, children을 포함합니다.
 *
 * @extends MainCardContextType
 *
 * @property {ReactNode} children - 내부에 MainCard.Image, MainCard.Content 포함
 * @property {string} [className] - 카드 wrapper에 적용할 Tailwind 클래스
 */
export interface MainCardProps extends MainCardContextType {
  children: React.ReactNode;
  className?: string;
}

/**
 * 🖼️ MainCard.Image의 Props 타입입니다.
 *
 * @property {string} [className] - 이미지에 적용할 Tailwind 클래스
 */
export interface MainCardImageProps {
  className?: string;
}

/**
 * 📝 MainCard.Content
 *
 * 체험 카드 하단의 제목, 평점, 가격 정보를 보여주는 영역입니다.
 *
 * @component
 *
 * @example
 * ```tsx
 * <MainCard.Content
 *   className="bg-white"
 *   titleClassName="text-indigo-500"
 *   ratingClassName="text-yellow-500"
 *   priceClassName="text-red-500"
 *   iconColor="#FACC15"
 * />
 * ```
 *
 * @param {string} [className] - content wrapper(card 안 하얀 박스)에 적용할 클래스
 * @param {string} [titleClassName] - 제목 텍스트 클래스
 * @param {string} [ratingClassName] - 평점 숫자 텍스트 클래스
 * @param {string} [priceClassName] - 가격 텍스트 클래스
 * @param {string} [iconColor='#FFC23D'] - 별 아이콘 색상
 */

export interface MainCardContentProps {
  className?: string;
  titleClassName?: string;
  ratingClassName?: string;
  priceClassName?: string;
  iconColor?: string;
}
