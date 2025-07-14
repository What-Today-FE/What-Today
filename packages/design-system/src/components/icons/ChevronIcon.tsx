import type { DirectionIconProps } from './types';
import { getRotationOffset } from './utils/getRotationOffset';

/**
 * `∨` ChevronIcon (페이지네이션 `<`,`>` 아이콘)
 *
 * - 이 아이콘은 페이지네이션에서 다음, 이전 페이지로 이동하는 버튼에 사용됩니다.
 * - `direction` 속성을 통해 아이콘의 방향을 지정할 수 있으며, 기본값은 'right'입니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [direction='right'] - 아이콘의 방향 (기본값: 'right')
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (오른쪽 방향, 12px 크기)
 * <ChevronIcon />
 *
 * @example
 * // 왼쪽 방향으로 변경
 * <ChevronIcon direction='left' />
 *
 * @example
 * // 색상 변경
 * <ChevronIcon color='var(--color-blue)' />
 */

export default function ChevronIcon({ direction = 'right', color = 'black', ...rest }: DirectionIconProps) {
  const baseDirection = 'bottom';
  const rotation = getRotationOffset(baseDirection, direction);
  return (
    <svg
      fill='none'
      height='7'
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox='0 0 12 7'
      width='12'
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.3689 0.224375C10.7617 -0.0959754 11.3407 -0.0733816 11.7068 0.292734C12.0729 0.65885 12.0955 1.23785 11.7752 1.63063L11.7068 1.7068L7.41383 5.99977C6.6328 6.78071 5.36673 6.78071 4.5857 5.99977L0.292734 1.7068L0.224375 1.63063C-0.0959754 1.23785 -0.0733816 0.65885 0.292734 0.292734C0.65885 -0.0733816 1.23785 -0.0959754 1.63063 0.224375L1.7068 0.292734L5.99977 4.5857L10.2927 0.292734L10.3689 0.224375Z'
        fill={color}
      />
    </svg>
  );
}

ChevronIcon.displayName = 'ChevronIcon';
