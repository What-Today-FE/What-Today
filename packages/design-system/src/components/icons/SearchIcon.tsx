import type { ColorIconProps } from './types';

/**
 * 🔍 SearchIcon (돋보기 아이콘)
 *
 * - 이 아이콘은 돋보기 모양을 나타내며 검색 기능을 나타냅니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색(#000000)으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (19px 크기)
 * <SearchIcon />
 *
 * @example
 * // 크기 변경
 * <SearchIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <SearchIcon color='var(--color-blue)' />
 */

export default function SearchIcon({ color = 'black', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='19' viewBox='0 0 19 19' width='19' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z'
        fill={color}
      />
    </svg>
  );
}

SearchIcon.displayName = 'SearchIcon';
