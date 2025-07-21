import type { ColorIconProps } from './types';

/**
 * ✅ SuccessIcon (성공 아이콘)
 *
 * - 이 아이콘은 성공 상태를 나타내는 데 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 녹색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#4CAF50'] - 아이콘의 색상 (기본값: '#4CAF50')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (59px 크기)
 * <SuccessIcon />
 *
 * @example
 * // 크기 변경
 * <SuccessIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <SuccessIcon color='var(--color-green)' />
 */

export default function SuccessIcon({ color = '#4CAF50', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='59' viewBox='0 0 59 59' width='59' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19 30L27 38L40.3333 22'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='5.33333'
      />
      <path
        d='M29.6667 56.3333C44.3943 56.3333 56.3333 44.3943 56.3333 29.6667C56.3333 14.9391 44.3943 3 29.6667 3C14.9391 3 3 14.9391 3 29.6667C3 44.3943 14.9391 56.3333 29.6667 56.3333Z'
        stroke={color}
        strokeWidth='5.33333'
      />
    </svg>
  );
}

SuccessIcon.displayName = 'SuccessIcon';
