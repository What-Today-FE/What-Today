import { twMerge } from 'tailwind-merge';

import type { ColorIconProps } from './types';

/**
 * 🔄 SpinIcon (스피닝 아이콘)
 *
 * - 이 아이콘은 로딩 상태를 나타내는 스피닝 애니메이션을 포함합니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 현재 텍스트 색상(`currentColor`)으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='currentColor'] - 아이콘의 색상 (기본값: 'currentColor')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (24px 크기)
 * <SpinIcon />
 *
 * @example
 * // 크기 변경
 * <SpinIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <SpinIcon color='var(--color-blue)' />
 */

export default function SpinIcon({ color = 'currentColor', className, ...rest }: ColorIconProps) {
  return (
    <svg
      className={twMerge('animate-spin', className)}
      fill='none'
      height='24'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='3'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
}

SpinIcon.displayName = 'SpinIcon';
