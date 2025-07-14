import type { ColorIconProps } from './types';

/**
 * ✏️ EditIcon (연필 수정 아이콘)
 *
 * - 이 아이콘은 사용자 프로필 편집하는 버튼에 사용됩니다.)
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (20px 크기)
 * <EditIcon />
 *
 * @example
 * // 크기 변경
 * <EditIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <EditIcon color='var(--color-blue)' />
 */

export default function EditIcon({ color = 'black', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='20' viewBox='0 0 16 20' width='16' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12 0.0117188L15 3.01172L12.713 5.29972L9.713 2.29972L12 0.0117188ZM0 11.9997V14.9997H3L11.299 6.71272L8.299 3.71272L0 11.9997ZM0 17.9997H16V19.9997H0V17.9997Z'
        fill={color}
      />
    </svg>
  );
}

EditIcon.displayName = 'EditIcon';
