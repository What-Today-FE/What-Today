import type { ColorIconProps } from './types';

/**
 * 📋 ListIcon (메세지? 아이콘)
 *
 * - 이 아이콘은 마이페이지 예약내역 라벨에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#707177'] - 아이콘의 색상 (기본값: '#707177')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (20px 크기)
 * <ListIcon />
 *
 * @example
 * // 크기 변경
 * <ListIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <ListIcon color='var(--color-red)' />
 */

export default function ListIcon({ color = '#707177', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='20' viewBox='0 0 20 20' width='20' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18 1.01148e-06H2C0.897 1.01148e-06 0 0.894001 0 1.992V14.008C0 15.106 0.897 16 2 16H5V20L11.351 16H18C19.103 16 20 15.106 20 14.008V1.992C19.9984 1.46279 19.7869 0.95583 19.412 0.582372C19.037 0.208914 18.5292 -0.000531115 18 1.01148e-06ZM12 11H5V9H12V11ZM15 7H5V5H15V7Z'
        fill={color}
      />
    </svg>
  );
}

ListIcon.displayName = 'ListIcon';
