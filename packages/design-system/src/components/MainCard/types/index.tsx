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
 * 📝 MainCard.Content의 Props 타입입니다.
 * 각 텍스트와 아이콘에 적용할 커스텀 클래스를 정의할 수 있습니다.
 *
 * @property {string} [className] - content wrapper(card 안 하얀 박스)에 적용할 클래스
 * @property {string} [titleClassName] - 제목 텍스트 클래스
 * @property {string} [ratingClassName] - 평점 숫자 텍스트 클래스
 * @property {string} [priceClassName] - 가격 텍스트 클래스
 * @property {string} [iconColor='#FFC23D'] - 별 아이콘 색상
 */
export interface MainCardContentProps {
  className?: string;
  titleClassName?: string;
  ratingClassName?: string;
  priceClassName?: string;
  iconColor?: string;
}
