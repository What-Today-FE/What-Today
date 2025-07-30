import type { ColorIconProps } from './types';

/**
 * ➕ PlusIcon (더하기 아이콘)
 *
 * - 이 아이콘은 추가 작업을 나타내는 버튼에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-12`, `size-16` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#4b4b4b'] - 아이콘의 색상 (기본값: '#4b4b4b')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (12px 크기)
 * <PlusIcon />
 *
 * @example
 * // 크기 변경
 * <PlusIcon className='size-16' />
 *
 * @example
 * // 색상 변경
 * <PlusIcon color='var(--color-blue)' />
 */

export default function PlusIcon({ color = '#4b4b4b', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='12' viewBox='0 0 12 12' width='12' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 5L11.1025 5.00488C11.6067 5.05621 12 5.48232 12 6C12 6.51768 11.6067 6.94379 11.1025 6.99512L11 7H1C0.447715 7 0 6.55228 0 6C0 5.44772 0.447715 5 1 5H11Z'
        fill={color}
      />
      <path
        d='M7 11L6.99512 11.1025C6.94379 11.6067 6.51768 12 6 12C5.48232 12 5.05621 11.6067 5.00488 11.1025L5 11L5 1C5 0.447715 5.44772 -2.41375e-08 6 0C6.55228 2.41448e-08 7 0.447715 7 1L7 11Z'
        fill={color}
      />
    </svg>
  );
}

PlusIcon.displayName = 'PlusIcon';
