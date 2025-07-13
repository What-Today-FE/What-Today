import type { DirectionIconProps } from './types';
import { getRotationOffset } from './utils/getRotationOffset';

/**
 * `←` ArrowIcon (화살표 아이콘)
 *
 * - 이 아이콘은 일반적인 화살표 기능을 수행하는 버튼에 사용됩니다.
 * - `direction` 속성을 통해 아이콘의 방향을 지정할 수 있으며, 기본값은 'left'입니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [direction='left'] - 아이콘의 방향 (기본값: 'left')
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (왼쪽 방향, 12px 크기)
 * <ArrowIcon />
 *
 * @example
 * // 오른쪽 방향으로 변경
 * <ArrowIcon direction='right' />
 *
 * @example
 * // 색상 변경
 * <ArrowIcon color='var(--color-blue)' />
 */

export default function ArrowIcon({ direction = 'left', color = 'black', ...rest }: DirectionIconProps) {
  const baseDirection = 'left';
  const rotation = getRotationOffset(baseDirection, direction);
  return (
    <svg
      fill='none'
      height='12'
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox='0 0 17 12'
      width='17'
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.71582 5.1246L1.61426 5.12949C1.1098 5.18051 0.71582 5.6067 0.71582 6.1246C0.71582 6.64251 1.1098 7.0687 1.61426 7.11972L1.71582 7.1246L15.2344 7.1246C15.7867 7.1246 16.2344 6.67689 16.2344 6.1246C16.2344 5.57232 15.7867 5.1246 15.2344 5.1246L1.71582 5.1246Z'
        fill={color}
      />
      <path
        d='M4.71766 11.6383C5.08437 12.0512 5.7168 12.089 6.12977 11.7223C6.5425 11.3557 6.58004 10.7241 6.21375 10.3111L4.71766 11.6383ZM6.15614 0.550383C5.78174 0.192735 5.20261 0.183037 4.81727 0.512297L4.74305 0.58261L0.278206 5.25644C-0.0587749 5.60924 -0.0899086 6.14897 0.192268 6.53573L0.252815 6.61093L4.71766 11.6383L6.21375 10.3111L2.36121 5.97128L6.18836 1.96347L6.25574 1.88632C6.56701 1.48634 6.53048 0.908032 6.15614 0.550383Z'
        fill={color}
      />
    </svg>
  );
}

ArrowIcon.displayName = 'ArrowIcon';
