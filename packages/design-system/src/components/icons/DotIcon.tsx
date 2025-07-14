import type { ColorIconProps } from './types';

/**
 * 🔴 DotIcon (점 아이콘)
 *
 * - 이 아이콘은 상태 표시나 알림 유무를 위해 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 빨간색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-8`, `size-12` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#FF2727'] - 아이콘의 색상 (기본값: '#FF2727')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (8px 크기)
 * <DotIcon />
 *
 * @example
 * // 크기 변경
 * <DotIcon className='size-12' />
 *
 * @example
 * // 색상 변경
 * <DotIcon color='var(--color-blue)' />
 */

export default function DotIcon({ color = '#FF2727', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='8' viewBox='0 0 8 8' width='8' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <rect fill={color} height='6' rx='3' width='6' x='1' y='1' />
      <rect height='6' rx='3' stroke='white' width='6' x='1' y='1' />
    </svg>
  );
}

DotIcon.displayName = 'DotIcon';
