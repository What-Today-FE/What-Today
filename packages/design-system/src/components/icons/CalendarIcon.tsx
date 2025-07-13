import type { ColorIconProps } from './types';

/**
 * 📅 CalendarIcon (달력 아이콘)
 *
 * - 이 아이콘은 캘린더와 마이페이지 예약 현황 라벨에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='var(--color-gray-600)'] - 아이콘의 색상 (기본값: 'var(--color-gray-600)')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (24px 크기)
 * <CalendarIcon />
 *
 * @example
 * // 크기 변경
 * <CalendarIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <CalendarIcon color='var(--color-red)' />
 */

export default function CalendarIcon({ color = 'var(--color-gray-600)', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='24' viewBox='0 0 24 24' width='24' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z'
        fill={color}
      />
      <path
        d='M5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z'
        fill={color}
      />
    </svg>
  );
}

CalendarIcon.displayName = 'CalendarIcon';
