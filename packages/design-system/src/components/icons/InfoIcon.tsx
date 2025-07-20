import type { ColorIconProps } from './types';

/**
 * ℹ️ InfoIcon (정보 아이콘)
 *
 * - 이 아이콘은 정보 상태를 나타내는 데 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 파란색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#2196F3'] - 아이콘의 색상 (기본값: '#2196F3')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (60px 크기)
 * <InfoIcon />
 *
 * @example
 * // 크기 변경
 * <InfoIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <InfoIcon color='var(--color-blue)' />
 */

export default function InfoIcon({ color = '#2196F3', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='60' viewBox='0 0 60 60' width='60' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M29.9999 56.6673C44.7275 56.6673 56.6666 44.7282 56.6666 30.0007C56.6666 15.2731 44.7275 3.33398 29.9999 3.33398C15.2723 3.33398 3.33325 15.2731 3.33325 30.0007C3.33325 44.7282 15.2723 56.6673 29.9999 56.6673Z'
        stroke={color}
        strokeWidth='5.33333'
      />
      <path
        d='M30 21C32.2091 21 34 19.2091 34 17C34 14.7909 32.2091 13 30 13C27.7909 13 26 14.7909 26 17C26 19.2091 27.7909 21 30 21Z'
        fill={color}
      />
      <path d='M30 29V45' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
    </svg>
  );
}

InfoIcon.displayName = 'InfoIcon';
