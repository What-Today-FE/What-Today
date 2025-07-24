import type { FillIconProps } from './types';

/**
 * ⭐ StarIcon (별 아이콘)
 *
 * - 아이콘은 기본적으로 빈 별 모양으로 렌더링되며, `filled` 속성을 통해 채워진 상태로 변경할 수 있습니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색(#E0E0E5)으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#FFCB02'] - 아이콘의 색상 (기본값: '#FFCB02')
 * @param {boolean} [filled=false] - 아이콘이 채워진 상태인지 여부 (기본값: false)
 * @param {boolean} [hover=false] - 아이콘이 hover 상태인지 여부 (기본값: false)
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (채워지지 않은 상태)
 * <StarIcon />
 *
 * @example
 * // 채워진 상태로 사용
 * <StarIcon filled />
 *
 * @example
 * // hover 상태로 사용
 * <StarIcon hover />
 *
 * @example
 * // 색상 변경
 * <StarIcon color='var(--color-yellow)' />
 */

interface StarIconProps extends FillIconProps {
  /** 아이콘이 hover 상태인지 여부 */
  hover?: boolean;
}

export default function StarIcon({ color = '#FFCB02', filled = false, hover = false, ...rest }: StarIconProps) {
  const fillColor = hover || filled ? color : '#E0E0E5';
  const opacity = hover ? 0.5 : 1;

  return (
    <svg fill='none' height='20' viewBox='0 0 22 20' width='22' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.72717 1.05173C10.3141 0.107757 11.688 0.107757 12.2749 1.05173L14.6994 4.95124C14.9059 5.28337 15.234 5.52171 15.6136 5.61547L20.0715 6.71632C21.1507 6.98281 21.5752 8.28944 20.8588 9.13934L17.8994 12.6502C17.6473 12.9492 17.522 13.3349 17.5502 13.725L17.8808 18.3048C17.9608 19.4135 16.8493 20.2211 15.8196 19.8023L11.566 18.0727C11.2038 17.9254 10.7983 17.9254 10.436 18.0727L6.18243 19.8023C5.15275 20.2211 4.04126 19.4135 4.12129 18.3048L4.45188 13.725C4.48004 13.3349 4.35473 12.9492 4.10267 12.6502L1.14324 9.13934C0.426832 8.28944 0.851382 6.98281 1.93052 6.71632L6.3884 5.61547C6.76808 5.52171 7.09614 5.28337 7.30264 4.95124L9.72717 1.05173Z'
        fill={fillColor}
        opacity={opacity}
      />
    </svg>
  );
}

StarIcon.displayName = 'StarIcon';
