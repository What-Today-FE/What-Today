import type { ColorIconProps } from './types';

/**
 * 🏢 TourIcon (빌딩 아이콘)
 *
 * - 이 아이콘은 투어 라벨에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (18px 크기)
 * <TourIcon />
 *
 * @example
 * // 크기 변경
 * <TourIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <TourIcon color='var(--color-red)' />
 */

export default function TourIcon({ color = 'black', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='18' viewBox='0 0 20 18' width='20' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19 4H13C12.7348 4 12.4804 4.10536 12.2929 4.29289C12.1054 4.48043 12 4.73478 12 5V8H10V1C10 0.734784 9.89464 0.48043 9.70711 0.292893C9.51957 0.105357 9.26522 0 9 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM6 3H8V5H6V3ZM4 13H2V11H4V13ZM4 9H2V7H4V9ZM4 5H2V3H4V5ZM8 13H6V11H8V13ZM8 9H6V7H8V9ZM17 13H15V11H17V13ZM17 9H15V7H17V9Z'
        fill={color}
      />
    </svg>
  );
}

TourIcon.displayName = 'TourIcon';
