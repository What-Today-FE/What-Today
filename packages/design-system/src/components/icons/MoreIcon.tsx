import type { DirectionIconProps } from './types';
import { getRotationOffset } from './utils/getRotationOffset';

/**
 * `⫶` MoreIcon (더보기 아이콘)
 *
 * - 이 아이콘은 추가 옵션이나 기능을 나타내는 데 사용됩니다.
 * - `direction` 속성을 통해 아이콘의 방향을 지정할 수 있으며, 기본값은 'right'입니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-16`, `size-20` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [direction='right'] - 아이콘의 방향 (기본값: 'right')
 * @param {string} [color='#1f1f22'] - 아이콘의 색상 (기본값: '#1f1f22')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (오른쪽(세로) 방향, 16px 크기)
 * <MoreIcon />
 *
 * @example
 * // 아래쪽(가로) 방향으로 변경
 * <MoreIcon direction='bottom' />
 *
 * @example
 * // 색상 변경
 * <MoreIcon color='var(--color-blue)' />
 */

export default function MoreIcon({ direction = 'right', color = '#1f1f22', ...rest }: DirectionIconProps) {
  const baseDirection = 'right';
  const rotation = getRotationOffset(baseDirection, direction);
  return (
    <svg
      fill='none'
      height='16'
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox='0 0 4 16'
      width='4'
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2Z'
        fill={color}
      />
      <path
        d='M3.5 8C3.5 8.82843 2.82843 9.5 2 9.5C1.17157 9.5 0.5 8.82843 0.5 8C0.5 7.17157 1.17157 6.5 2 6.5C2.82843 6.5 3.5 7.17157 3.5 8Z'
        fill={color}
      />
      <path
        d='M3.5 14C3.5 14.8284 2.82843 15.5 2 15.5C1.17157 15.5 0.5 14.8284 0.5 14C0.5 13.1716 1.17157 12.5 2 12.5C2.82843 12.5 3.5 13.1716 3.5 14Z'
        fill={color}
      />
    </svg>
  );
}

MoreIcon.displayName = 'MoreIcon';
