import type { ColorIconProps } from './types';

/**
 * ➖ MinusIcon (빼기 아이콘)
 *
 * - 이 아이콘은 항목을 제거하거나 감소시키는 기능에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-12`, `size-16` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#4b4b4b'] - 아이콘의 색상 (기본값: '#4b4b4b')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (12px 크기)
 * <MinusIcon />
 *
 * @example
 * // 크기 변경
 * <MinusIcon className='size-16' />
 *
 * @example
 * // 색상 변경
 * <MinusIcon color='var(--color-red)' />
 */

export default function MinusIcon({ color = '#4b4b4b', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='2' viewBox='0 0 12 2' width='12' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 0L11.1025 0.00488281C11.6067 0.0562144 12 0.482323 12 1C12 1.51768 11.6067 1.94379 11.1025 1.99512L11 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H11Z'
        fill={color}
      />
    </svg>
  );
}

MinusIcon.displayName = 'MinusIcon';
