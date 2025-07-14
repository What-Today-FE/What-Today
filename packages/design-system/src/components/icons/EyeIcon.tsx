import type { ColorIconProps } from './types';

/**
 * 👁️ EyeIcon (눈 아이콘)
 *
 * - 이 아이콘은 눈 모양을 나타내며, 주로 비밀번호 입력 필드에서 비밀번호 표시/숨기기 기능을 나타냅니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색(#9FA0A7)으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#9FA0A7'] - 아이콘의 색상 (기본값: '#9FA0A7')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용
 * <EyeIcon />
 *
 * @example
 * // 크기 조정
 * <EyeIcon className='size-50' />
 *
 * @example
 * // 색상 변경
 * <EyeIcon color='var(--color-blue)' />
 */

export default function EyeIcon({ color = '#9FA0A7', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='12' viewBox='0 0 18 12' {...rest} width='18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 0C4.90909 0 1.41545 2.4258 0 5.85C1.41545 9.2742 4.90909 11.7 9 11.7C13.0909 11.7 16.5845 9.2742 18 5.85C16.5845 2.4258 13.0909 0 9 0ZM9 9.75C6.74182 9.75 4.90909 8.0028 4.90909 5.85C4.90909 3.6972 6.74182 1.95 9 1.95C11.2582 1.95 13.0909 3.6972 13.0909 5.85C13.0909 8.0028 11.2582 9.75 9 9.75ZM9 3.51C7.64182 3.51 6.54545 4.5552 6.54545 5.85C6.54545 7.1448 7.64182 8.19 9 8.19C10.3582 8.19 11.4545 7.1448 11.4545 5.85C11.4545 4.5552 10.3582 3.51 9 3.51Z'
        fill={color}
      />
    </svg>
  );
}

EyeIcon.displayName = 'EyeIcon';
