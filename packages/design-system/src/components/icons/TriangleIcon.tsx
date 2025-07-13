import type { DirectionIconProps } from './types';
import { getRotationOffset } from './utils/getRotationOffset';

/**
 * ▼ TriangleIcon (삼각형 아이콘)
 *
 * - 이 아이콘은 일반적으로 드롭다운 메뉴나 선택 옵션을 나타내는 데 사용됩니다.
 * - `direction` 속성을 통해 아이콘의 방향을 지정할 수 있으며, 기본값은 'bottom'입니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [direction='bottom'] - 아이콘의 방향 (기본값: 'bottom')
 * @param {string} [color='var(--color-gray-950)'] - 아이콘의 색상 (기본값: 'var(--color-gray-950)')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (아래 방향, 8px 크기)
 * <TriangleIcon />
 *
 * @example
 * // 위 방향으로 변경
 * <TriangleIcon direction='top' />
 *
 * @example
 * // 색상 변경
 * <TriangleIcon color='var(--color-blue)' />
 */

export default function TriangleIcon({
  direction = 'bottom',
  color = 'var(--color-gray-950)',
  ...rest
}: DirectionIconProps) {
  const baseDirection = 'bottom';
  const rotation = getRotationOffset(baseDirection, direction);
  return (
    <svg
      fill='none'
      height='8'
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox='0 0 12 8'
      width='12'
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.27884 6.97303C5.64024 7.37357 6.3626 7.37357 6.724 6.97303L11.2734 1.9307C11.7204 1.43527 11.2955 0.727983 10.5509 0.727983H1.45198C0.707337 0.727983 0.282405 1.43527 0.729401 1.9307L5.27884 6.97303Z'
        fill={color}
      />
    </svg>
  );
}

TriangleIcon.displayName = 'TriangleIcon';
