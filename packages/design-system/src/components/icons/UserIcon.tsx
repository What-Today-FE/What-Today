import type { ColorIconProps } from './types';

/**
 * 👤 UserIcon (사용자 아이콘)
 *
 * - 이 아이콘은 마이페이지 내 정보 라벨에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#707177'] - 아이콘의 색상 (기본값: '#707177')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (19px 크기)
 * <UserIcon />
 *
 * @example
 * // 크기 변경
 * <UserIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <UserIcon color='var(--color-red-500)' />
 */

export default function UserIcon({ color = '#707177', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='19' viewBox='0 0 18 19' width='18' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.5 4.5C4.5 6.981 6.519 9 9 9C11.481 9 13.5 6.981 13.5 4.5C13.5 2.019 11.481 0 9 0C6.519 0 4.5 2.019 4.5 4.5ZM17 19H18V18C18 14.141 14.859 11 11 11H7C3.14 11 0 14.141 0 18V19H17Z'
        fill={color}
      />
    </svg>
  );
}

UserIcon.displayName = 'UserIcon';
