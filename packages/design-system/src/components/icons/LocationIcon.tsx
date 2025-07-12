import type { ColorIconProps } from './types';

/**
 * 📍 LocationIcon (위치 아이콘)
 *
 * - 이 아이콘은 위치 정보를 나타내는 데 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (20px 크기)
 * <LocationIcon />
 *
 * @example
 * // 크기 변경
 * <LocationIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <LocationIcon color='var(--color-blue)' />
 */

export default function LocationIcon({ color = 'black', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='20' viewBox='0 0 16 20' width='16' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.00008 0C3.58908 0 8.14446e-05 3.589 8.14446e-05 7.995C-0.0289186 14.44 7.69608 19.784 8.00008 20C8.00008 20 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00008 0ZM8.00008 12C5.79008 12 4.00008 10.21 4.00008 8C4.00008 5.79 5.79008 4 8.00008 4C10.2101 4 12.0001 5.79 12.0001 8C12.0001 10.21 10.2101 12 8.00008 12Z'
        fill={color}
      />
    </svg>
  );
}

LocationIcon.displayName = 'LocationIcon';
