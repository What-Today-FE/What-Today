import type { ColorIconProps } from './types';

/**
 * ❌ ErrorIcon (오류 아이콘)
 *
 * - 이 아이콘은 오류 상태를 나타내는 데 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 빨간색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#F44336'] - 아이콘의 색상 (기본값: '#F44336')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (60px 크기)
 * <ErrorIcon />
 *
 * @example
 * // 크기 변경
 * <ErrorIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <ErrorIcon color='var(--color-red)' />
 */

export default function ErrorIcon({ color = '#F44336', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='60' viewBox='0 0 60 60' width='60' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M29.9999 56.6673C44.7275 56.6673 56.6666 44.7282 56.6666 30.0007C56.6666 15.2731 44.7275 3.33398 29.9999 3.33398C15.2723 3.33398 3.33325 15.2731 3.33325 30.0007C3.33325 44.7282 15.2723 56.6673 29.9999 56.6673Z'
        stroke={color}
        strokeWidth='5.33333'
      />
      <path d='M19.3333 19.334L40.6666 40.6673' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
      <path d='M40.6666 19.334L19.3333 40.6673' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
    </svg>
  );
}

ErrorIcon.displayName = 'ErrorIcon';
